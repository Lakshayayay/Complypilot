// Made-up firms for the security tests (criterion 2). These tests run on GitHub against a
// throwaway Supabase (.github/workflows/checks.yml), never against a real project.
import { createClient } from "@supabase/supabase-js";

// Every table in public. coverage.test.ts fails if the database has a table missing here, and
// firms-apart.test.ts needs a case for each one, so a new table can't skip its cross-firm tests.
export const TABLES = [
  "firms",
  "clients",
  "members",
  "invites",
  "consents",
  "client_filings",
  "due_date_changes",
  "licences",
  "calendar_items",
  "files",
  "owner_tasks",
  "thread_entries",
] as const;
export type Table = (typeof TABLES)[number];

function env(...names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  throw new Error(`Missing ${names.join(" or ")}: the security tests need the throwaway Supabase that GitHub starts.`);
}

// The CLI's variable names differ between versions, so accept the new and the legacy ones.
export const url = env("API_URL", "SUPABASE_URL");
export const secretKey = env("SECRET_KEY", "SERVICE_ROLE_KEY");
const publishableKey = env("PUBLISHABLE_KEY", "ANON_KEY");
const noSession = { auth: { persistSession: false, autoRefreshToken: false } };

// The secret key skips RLS: used only to set up rows and to check what really happened.
export const admin = createClient(url, secretKey, noSession);
export const anonClient = () => createClient(url, publishableKey, noSession);

export const pdf = () => new Blob(["%PDF-1.4 test file"], { type: "application/pdf" });

type Row = { id: string } & Record<string, unknown>;

export async function put(table: Table, row: Record<string, unknown>): Promise<Row> {
  const { data, error } = await admin.from(table).insert(row).select().single();
  if (error) throw new Error(`seed ${table}: ${error.message}`);
  return data as Row;
}

/** A files row plus its stored object, as the uploader would make them. */
export async function putFile(
  f: { firm: Row; client: Row },
  uploadedBy: string,
  owner: { calendar_item_id?: string; licence_id?: string },
): Promise<Row> {
  const storagePath = `${f.firm.id}/${f.client.id}/${crypto.randomUUID()}.pdf`;
  const file = await put("files", {
    firm_id: f.firm.id,
    client_id: f.client.id,
    ...owner,
    storage_path: storagePath,
    file_name: "bills.pdf",
    mime_type: "application/pdf",
    size_bytes: 18,
    uploaded_by: uploadedBy,
  });
  const { error } = await admin.storage.from("files").upload(storagePath, pdf());
  if (error) throw new Error(`seed storage: ${error.message}`);
  return file;
}

async function login(email: string, password: string) {
  const client = anonClient();
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`login ${email}: ${error.message}`);
  return client;
}

export type Firm = Awaited<ReturnType<typeof seedFirm>>;

/** One firm with a staff login, a client with its owner login, and one row in every table. */
export async function seedFirm(label: string) {
  const tag = `${label}-${crypto.randomUUID().slice(0, 8)}`;
  const password = crypto.randomUUID();
  const makeUser = async (who: string) => {
    const email = `${who}-${tag}@example.test`;
    const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
    if (error) throw new Error(`create user: ${error.message}`);
    return { id: data.user.id, email };
  };
  const staffUser = await makeUser("staff");
  const ownerUser = await makeUser("owner");

  const firm = await put("firms", { name: `Firm ${tag}` });
  const firm_id = firm.id;
  const client = await put("clients", { firm_id, name: `Client ${tag}`, state: "Delhi", gst_scheme: "monthly" });
  const client_id = client.id;
  await put("members", { user_id: staffUser.id, firm_id, role: "staff", email: staffUser.email, name: "Staff" });
  await put("members", { user_id: ownerUser.id, firm_id, role: "owner", client_id, email: ownerUser.email, name: "Owner" });
  const invite = await put("invites", { firm_id, email: `new-${tag}@example.test`, role: "staff", invited_by: staffUser.id });
  const consent = await put("consents", { firm_id, user_id: staffUser.id, notice_version: "1.0" });
  const filing = await put("client_filings", { firm_id, client_id, filing_code: "gstr3b" });
  const change = await put("due_date_changes", {
    firm_id,
    filing_code: "gstr3b",
    period_start: "2026-09-01",
    new_due_date: "2026-10-25",
    source: "Test circular",
    created_by: staffUser.id,
  });
  const licence = await put("licences", {
    firm_id,
    client_id,
    licence_type: "factory_licence",
    number: "FL-1",
    expires_on: "2027-01-31",
    source: "manual",
  });
  const item = await put("calendar_items", {
    firm_id,
    client_id,
    kind: "filing",
    filing_code: "gstr3b",
    period_start: "2026-09-01",
    period_label: "September 2026",
    official_due_date: "2026-10-20",
    due_date: "2026-10-20",
  });
  const task = await put("owner_tasks", {
    firm_id,
    client_id,
    calendar_item_id: item.id,
    title: "Upload the purchase bills",
    created_by: staffUser.id,
  });
  const message = await put("thread_entries", {
    firm_id,
    client_id,
    calendar_item_id: item.id,
    kind: "message",
    author_id: staffUser.id,
    body: "Please send the purchase bills",
    tag: "need_document",
  });
  const note = await put("thread_entries", {
    firm_id,
    client_id,
    calendar_item_id: item.id,
    kind: "note",
    author_id: staffUser.id,
    body: "Client pays late, chase early",
  });

  const file = await putFile({ firm, client }, ownerUser.id, { calendar_item_id: item.id });
  return {
    firm,
    client,
    invite,
    consent,
    filing,
    change,
    licence,
    item,
    task,
    message,
    note,
    file,
    staffUser,
    ownerUser,
    staff: await login(staffUser.email, password),
    owner: await login(ownerUser.email, password),
  };
}
