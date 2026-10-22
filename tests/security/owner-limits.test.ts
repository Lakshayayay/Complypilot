// What a client's owner may and may not do inside their own firm (FS-2 decisions 1b, 5, 7, 16),
// plus the Activity events the database writes by itself.
import { beforeAll, describe, expect, it } from "vitest";
import { admin, putFile, seedFirm, type Firm } from "./seed";

let a: Firm;

beforeAll(async () => {
  a = await seedFirm("owner");
}, 60_000);

const now = () => new Date().toISOString();

async function events(itemId: string) {
  const { data } = await admin
    .from("thread_entries")
    .select("event_type, author_id")
    .eq("calendar_item_id", itemId)
    .eq("kind", "event");
  return data ?? [];
}

describe("the owner's view of the thread", () => {
  it("sees messages but never the firm's notes", async () => {
    const { data, error } = await a.owner.from("thread_entries").select("id, kind").eq("calendar_item_id", a.item.id);
    expect(error).toBeNull();
    const ids = (data ?? []).map((row) => row.id);
    expect(ids).toContain(a.message.id);
    expect(ids).not.toContain(a.note.id);
  });

  it("can post a message as themselves, but not a note, an event, or as someone else", async () => {
    const base = { firm_id: a.firm.id, client_id: a.client.id, calendar_item_id: a.item.id };
    const ok = await a.owner
      .from("thread_entries")
      .insert({ ...base, kind: "message", author_id: a.ownerUser.id, body: "Bills attached" });
    expect(ok.error).toBeNull();

    const attempts: Record<string, unknown>[] = [
      { ...base, kind: "note", author_id: a.ownerUser.id, body: "Sneaky note" },
      { ...base, kind: "event", event_type: "done", author_id: a.ownerUser.id },
      { ...base, kind: "message", author_id: a.staffUser.id, body: "Pretending to be the CA" },
    ];
    for (const row of attempts) {
      const { error } = await a.owner.from("thread_entries").insert(row);
      expect(error?.code).toBe("42501");
    }
  });

  it("can't read the firm's due-date changes, invites or consents", async () => {
    for (const table of ["due_date_changes", "invites", "consents"] as const) {
      const { data } = await a.owner.from(table).select("id");
      expect(data).toEqual([]);
    }
  });
});

describe("what the owner can change", () => {
  it("can't edit licence facts (only the CA types them)", async () => {
    const { error } = await a.owner.from("licences").update({ number: "OWNER-TYPED" }).eq("id", a.licence.id);
    expect(error?.code).toBe("42501");
  });

  it("can attach a certificate they uploaded to their licence", async () => {
    const certificate = await putFile(a, a.ownerUser.id, { licence_id: a.licence.id });
    const { data, error } = await a.owner
      .from("licences")
      .update({ certificate_file_id: certificate.id })
      .eq("id", a.licence.id)
      .select("certificate_file_id");
    expect(error).toBeNull();
    expect(data).toEqual([{ certificate_file_id: certificate.id }]);
  });

  it("can't change a calendar item", async () => {
    const { data } = await a.owner.from("calendar_items").update({ due_date: "2027-01-01" }).eq("id", a.item.id).select();
    expect(data ?? []).toEqual([]);
  });

  it("can't rename a task or tick it in someone else's name", async () => {
    const renamed = await a.owner.from("owner_tasks").update({ title: "Changed" }).eq("id", a.task.id);
    expect(renamed.error?.code).toBe("42501");
    const asStaff = await a.owner
      .from("owner_tasks")
      .update({ done_at: now(), done_by: a.staffUser.id })
      .eq("id", a.task.id);
    expect(asStaff.error?.code).toBe("42501");
  });

  it("can tick their own task, and the thread records it", async () => {
    const { data, error } = await a.owner
      .from("owner_tasks")
      .update({ done_at: now(), done_by: a.ownerUser.id })
      .eq("id", a.task.id)
      .select("id");
    expect(error).toBeNull();
    expect(data).toHaveLength(1);
    expect(await events(a.item.id)).toContainEqual({ event_type: "task_done", author_id: a.ownerUser.id });
  });
});

describe("Mark done (criterion 11)", () => {
  it("a done filing needs its ARN and receipt", async () => {
    const { error } = await a.staff
      .from("calendar_items")
      .update({ done_at: now(), done_by: a.staffUser.id })
      .eq("id", a.item.id);
    expect(error?.code).toBe("23514");
  });

  it("staff mark it done; the thread records who, and the owner sees it", async () => {
    const { error } = await a.staff
      .from("calendar_items")
      .update({ done_at: now(), done_by: a.staffUser.id, arn: "AA0710260012345", receipt_file_id: a.file.id })
      .eq("id", a.item.id);
    expect(error).toBeNull();
    expect(await events(a.item.id)).toContainEqual({ event_type: "done", author_id: a.staffUser.id });
    const { data } = await a.owner.from("thread_entries").select("event_type").eq("calendar_item_id", a.item.id);
    expect((data ?? []).map((row) => row.event_type)).toContain("done");
  });
});

describe("archiving a client (decision 7)", () => {
  it("blocks the owner from everything, while the firm still sees the client", async () => {
    const c = await seedFirm("archived");
    await admin.from("clients").update({ archived_at: now() }).eq("id", c.client.id);

    for (const table of ["clients", "calendar_items", "thread_entries", "licences", "files"] as const) {
      const { data } = await c.owner.from(table).select("id");
      expect(data).toEqual([]);
    }
    const { data } = await c.staff.from("clients").select("id").eq("id", c.client.id);
    expect(data).toHaveLength(1);
  }, 60_000);
});
