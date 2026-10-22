// Criterion 2: firm B (its staff and its owner) can't read, add, change or delete anything of firm A's,
// and anonymous visitors can't reach any table.
import { beforeAll, describe, expect, it } from "vitest";
import { admin, anonClient, seedFirm, TABLES, type Firm, type Table } from "./seed";

let a: Firm;
let b: Firm;

beforeAll(async () => {
  [a, b] = await Promise.all([seedFirm("a"), seedFirm("b")]);
}, 60_000);

type Case = {
  key: string; // the column that finds firm A's row
  id: string;
  change: Record<string, unknown>; // a harmless edit
  add: Record<string, unknown>; // a new row filed under firm A, otherwise valid
};

// Firm B's staff tries these. Every "who did it" column names B's staff, so only the firm check can stop it.
function cases(): Record<Table, Case> {
  const firm_id = a.firm.id;
  const client_id = a.client.id;
  const calendar_item_id = a.item.id;
  const me = b.staffUser.id;
  return {
    firms: { key: "id", id: firm_id, change: { name: "Taken over" }, add: { name: "Fake firm" } },
    clients: {
      key: "id",
      id: client_id,
      change: { name: "Renamed" },
      add: { firm_id, name: "Fake client", state: "Delhi", gst_scheme: "none" },
    },
    members: {
      key: "user_id",
      id: a.staffUser.id,
      change: { name: "Renamed" },
      add: { user_id: me, firm_id, role: "staff", email: "intruder@example.test" },
    },
    invites: {
      key: "id",
      id: a.invite.id,
      change: { email: "changed@example.test" },
      add: { firm_id, email: "intruder@example.test", role: "staff", invited_by: me },
    },
    consents: {
      key: "id",
      id: a.consent.id,
      change: { notice_version: "9.9" },
      add: { firm_id, user_id: me, notice_version: "1.0" },
    },
    client_filings: {
      key: "id",
      id: a.filing.id,
      change: { filing_code: "gstr1" },
      add: { firm_id, client_id, filing_code: "gstr1" },
    },
    due_date_changes: {
      key: "id",
      id: a.change.id,
      change: { new_due_date: "2026-12-31" },
      add: {
        firm_id,
        filing_code: "gstr1",
        period_start: "2026-09-01",
        new_due_date: "2026-10-30",
        source: "Fake",
        created_by: me,
      },
    },
    licences: {
      key: "id",
      id: a.licence.id,
      change: { number: "FAKE-1" },
      add: { firm_id, client_id, licence_type: "fire_noc", source: "manual" },
    },
    calendar_items: {
      key: "id",
      id: calendar_item_id,
      change: { due_date: "2026-12-31" },
      add: {
        firm_id,
        client_id,
        kind: "filing",
        filing_code: "gstr1",
        period_start: "2026-09-01",
        official_due_date: "2026-10-11",
        due_date: "2026-10-11",
      },
    },
    files: {
      key: "id",
      id: a.file.id,
      change: { deleted_at: new Date().toISOString() },
      add: {
        firm_id,
        client_id,
        calendar_item_id,
        storage_path: `${firm_id}/${client_id}/intruder.pdf`,
        file_name: "intruder.pdf",
        mime_type: "application/pdf",
        size_bytes: 1,
        uploaded_by: me,
      },
    },
    owner_tasks: {
      key: "id",
      id: a.task.id,
      change: { title: "Changed" },
      add: { firm_id, client_id, calendar_item_id, title: "Fake task", created_by: me },
    },
    thread_entries: {
      key: "id",
      id: a.message.id,
      change: { body: "Changed" },
      add: { firm_id, client_id, calendar_item_id, kind: "message", author_id: me, body: "Hello from firm B" },
    },
  };
}

describe.each(TABLES)("%s", (table) => {
  it("firm A's own staff can read the row (so an empty result below means blocked, not missing)", async () => {
    const c = cases()[table];
    const { data, error } = await a.staff.from(table).select("*").eq(c.key, c.id);
    expect(error).toBeNull();
    expect(data).toHaveLength(1);
  });

  it("firm B's staff and owner can't read it", async () => {
    const c = cases()[table];
    for (const intruder of [b.staff, b.owner]) {
      const { data, error } = await intruder.from(table).select("*").eq(c.key, c.id);
      expect(error).toBeNull();
      expect(data).toEqual([]);
    }
  });

  it("firm B's staff and owner can't add a row under firm A", async () => {
    const c = cases()[table];
    for (const intruder of [b.staff, b.owner]) {
      const { error } = await intruder.from(table).insert(c.add);
      expect(error?.code).toBe("42501");
    }
  });

  it("firm B's staff and owner can't change or delete it", async () => {
    const c = cases()[table];
    for (const intruder of [b.staff, b.owner]) {
      const changed = await intruder.from(table).update(c.change).eq(c.key, c.id).select();
      expect(changed.data ?? []).toEqual([]);
      const deleted = await intruder.from(table).delete().eq(c.key, c.id).select();
      expect(deleted.data ?? []).toEqual([]);
    }
    const { data } = await admin.from(table).select("*").eq(c.key, c.id).single();
    expect(data).not.toBeNull();
    for (const [column, value] of Object.entries(c.change)) {
      expect(data[column]).not.toEqual(value);
    }
  });

  it("anonymous visitors can't read the table at all", async () => {
    const { data, error } = await anonClient().from(table).select("*").limit(1);
    expect(data ?? []).toEqual([]);
    expect(error).not.toBeNull();
  });
});
