// Files in the private bucket (decision 16): only the firm and that client's owner can open them,
// only the uploader can delete, and a done item's receipt can't be deleted.
import { beforeAll, describe, expect, it } from "vitest";
import { pdf, putFile, seedFirm, type Firm } from "./seed";

let a: Firm;
let b: Firm;

beforeAll(async () => {
  [a, b] = await Promise.all([seedFirm("files-a"), seedFirm("files-b")]);
}, 60_000);

const path = (f: Firm) => f.file.storage_path as string;
const now = () => new Date().toISOString();

describe("opening files", () => {
  it("the firm and the client's owner can download and get a link", async () => {
    for (const reader of [a.staff, a.owner]) {
      const download = await reader.storage.from("files").download(path(a));
      expect(download.error).toBeNull();
      const link = await reader.storage.from("files").createSignedUrl(path(a), 300);
      expect(link.error).toBeNull();
    }
  });

  it("another firm's staff and owner can't download it or get a link", async () => {
    for (const intruder of [b.staff, b.owner]) {
      const download = await intruder.storage.from("files").download(path(a));
      expect(download.data).toBeNull();
      const link = await intruder.storage.from("files").createSignedUrl(path(a), 300);
      expect(link.data).toBeNull();
    }
  });
});

describe("uploading", () => {
  it("needs the files row first, made by the uploader", async () => {
    const stray = `${a.firm.id}/${a.client.id}/no-row.pdf`;
    const { error } = await a.owner.storage.from("files").upload(stray, pdf());
    expect(error).not.toBeNull();
  });

  it("works for the owner once their row exists", async () => {
    const storagePath = `${a.firm.id}/${a.client.id}/${crypto.randomUUID()}.pdf`;
    const row = await a.owner.from("files").insert({
      firm_id: a.firm.id,
      client_id: a.client.id,
      calendar_item_id: a.item.id,
      storage_path: storagePath,
      file_name: "bills.pdf",
      mime_type: "application/pdf",
      size_bytes: 18,
      uploaded_by: a.ownerUser.id,
    });
    expect(row.error).toBeNull();
    const upload = await a.owner.storage.from("files").upload(storagePath, pdf());
    expect(upload.error).toBeNull();
  });

  it("refuses files over 10 MB and types other than PDF, JPG and PNG", async () => {
    // Rows that pass every rule, so only the bucket's own limits can refuse the uploads.
    const rowFor = async () => {
      const storagePath = `${a.firm.id}/${a.client.id}/${crypto.randomUUID()}.pdf`;
      const { error } = await a.staff.from("files").insert({
        firm_id: a.firm.id,
        client_id: a.client.id,
        calendar_item_id: a.item.id,
        storage_path: storagePath,
        file_name: "upload.pdf",
        mime_type: "application/pdf",
        size_bytes: 1000,
        uploaded_by: a.staffUser.id,
      });
      expect(error).toBeNull();
      return storagePath;
    };
    const tooBig = new Blob([new Uint8Array(11 * 1024 * 1024)], { type: "application/pdf" });
    const sized = await a.staff.storage.from("files").upload(await rowFor(), tooBig);
    expect(sized.error).not.toBeNull();
    const text = new Blob(["plain text"], { type: "text/plain" });
    const typed = await a.staff.storage.from("files").upload(await rowFor(), text, { contentType: "text/plain" });
    expect(typed.error).not.toBeNull();
  });
});

describe("deleting", () => {
  it("only the uploader can mark a file deleted, and the thread records it", async () => {
    const file = await putFile(a, a.ownerUser.id, { calendar_item_id: a.item.id });
    const byStaff = await a.staff.from("files").update({ deleted_at: now() }).eq("id", file.id).select();
    expect(byStaff.data ?? []).toEqual([]);

    const byOwner = await a.owner.from("files").update({ deleted_at: now() }).eq("id", file.id).select("id");
    expect(byOwner.error).toBeNull();
    expect(byOwner.data).toHaveLength(1);
    const removed = await a.owner.storage.from("files").remove([file.storage_path as string]);
    expect(removed.error).toBeNull();
    expect(removed.data).toHaveLength(1);

    const { data } = await a.staff
      .from("thread_entries")
      .select("event_type, file_id")
      .eq("calendar_item_id", a.item.id)
      .eq("event_type", "file_removed");
    expect(data).toContainEqual({ event_type: "file_removed", file_id: file.id });
  });

  it("the stored object can't be removed before its row is marked deleted", async () => {
    const file = await putFile(a, a.ownerUser.id, { calendar_item_id: a.item.id });
    const removed = await a.owner.storage.from("files").remove([file.storage_path as string]);
    expect(removed.data ?? []).toEqual([]);
    const stillThere = await a.owner.storage.from("files").download(file.storage_path as string);
    expect(stillThere.error).toBeNull();
  });

  it("a done item's receipt can't be deleted, even by its uploader", async () => {
    const receipt = await putFile(a, a.staffUser.id, { calendar_item_id: a.item.id });
    const done = await a.staff
      .from("calendar_items")
      .update({ done_at: now(), done_by: a.staffUser.id, arn: "AA0710260012345", receipt_file_id: receipt.id })
      .eq("id", a.item.id);
    expect(done.error).toBeNull();
    const { error } = await a.staff.from("files").update({ deleted_at: now() }).eq("id", receipt.id);
    expect(error?.code).toBe("42501");
  });
});
