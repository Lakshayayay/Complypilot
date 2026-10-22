-- FS-2 core: tables, privacy rules (RLS), guards, thread events and file storage.
-- Decisions: docs/versions/v1/build/tech.md, "FS-2 decisions" and "FS-2 tables and server actions".
-- Every child row carries firm_id and points at its parent with both ids (composite foreign keys),
-- so a row can never sit under another firm's client, even through a bug.
-- "Who did it" columns (created_by, done_by, ...) are plain uuids, not foreign keys, so deleting a
-- login later never breaks the history.

-- ============================================================================================
-- Tables
-- ============================================================================================

-- One list of filing codes, used by every table that names a filing (tech.md, FS-2 point a).
create domain public.filing_code as text check (value in (
  'gstr1', 'gstr3b', 'pmt06', 'cmp08', 'gstr4', 'gstr9',
  'tds_deposit', 'tds_return_salary', 'tds_return_other',
  'advance_tax', 'tax_audit', 'itr_audit', 'esic'
));

create table public.firms (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(name) between 1 and 200),
  city text,
  contact_email text,
  mobile text,
  default_state text,
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms (id),
  name text not null check (length(name) between 1 and 255),
  trade_name text,
  gstin text check (gstin ~ '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$'),
  pan text check (pan ~ '^[A-Z]{5}[0-9]{4}[A-Z]$'),
  state text not null,
  gst_scheme text not null check (gst_scheme in ('monthly', 'qrmp', 'composition', 'none')),
  contact_name text,
  contact_phone text check (contact_phone ~ '^[6-9][0-9]{9}$'),
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  unique (id, firm_id),
  unique (firm_id, gstin)
);

-- One row per login: one email = one firm + one role. Owners belong to exactly one client.
create table public.members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  firm_id uuid not null references public.firms (id),
  role text not null check (role in ('staff', 'owner')),
  client_id uuid,
  name text,
  email text not null,
  created_at timestamptz not null default now(),
  foreign key (client_id, firm_id) references public.clients (id, firm_id),
  check ((role = 'owner') = (client_id is not null))
);

create table public.invites (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms (id),
  email text not null,
  role text not null check (role in ('staff', 'owner')),
  client_id uuid,
  invited_by uuid not null,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  foreign key (client_id, firm_id) references public.clients (id, firm_id),
  check ((role = 'owner') = (client_id is not null))
);

-- Who accepted which privacy notice, and when (criterion 1). Never changed or deleted.
create table public.consents (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms (id),
  user_id uuid not null,
  notice_version text not null,
  accepted_at timestamptz not null default now()
);

create table public.client_filings (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null,
  client_id uuid not null,
  filing_code public.filing_code not null,
  created_at timestamptz not null default now(),
  foreign key (client_id, firm_id) references public.clients (id, firm_id),
  unique (client_id, filing_code)
);

-- A government extension, entered once per firm. Removing it keeps the row (removed_at).
create table public.due_date_changes (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms (id),
  filing_code public.filing_code not null,
  period_start date not null,
  state text,
  new_due_date date not null,
  source text not null,
  created_by uuid not null,
  created_at timestamptz not null default now(),
  removed_at timestamptz,
  removed_by uuid,
  unique (id, firm_id),
  check ((removed_at is null) = (removed_by is null))
);

-- Status (Valid, Renew soon, Expired, Details needed, Valid until cancelled) is worked out when shown.
create table public.licences (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null,
  client_id uuid not null,
  licence_type text not null,
  number text,
  office text,
  issued_on date,
  expires_on date,
  no_expiry boolean not null default false,
  apply_by_date date,
  certificate_file_id uuid,
  source text not null check (source in ('factory_rules', 'manual')),
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  foreign key (client_id, firm_id) references public.clients (id, firm_id),
  unique (id, client_id, firm_id),
  check (not (no_expiry and expires_on is not null))
);

-- Saved rows, one per filing per period (FS-2 point 3). Only actions are saved; Late, Due soon and
-- Waiting on owner are worked out when shown (FS-2 point 2).
create table public.calendar_items (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references public.firms (id),
  client_id uuid,
  kind text not null check (kind in ('filing', 'licence', 'task')),
  filing_code public.filing_code,
  period_start date,
  period_label text,
  licence_id uuid,
  title text,
  official_due_date date not null,
  due_date date not null,
  due_date_change_id uuid,
  filed_at timestamptz,
  filed_by uuid,
  done_at timestamptz,
  done_by uuid,
  arn text,
  receipt_file_id uuid,
  created_at timestamptz not null default now(),
  foreign key (client_id, firm_id) references public.clients (id, firm_id),
  foreign key (licence_id, client_id, firm_id) references public.licences (id, client_id, firm_id),
  foreign key (due_date_change_id, firm_id) references public.due_date_changes (id, firm_id),
  unique (id, client_id, firm_id),
  unique (client_id, filing_code, period_start),
  unique (licence_id),
  check (kind = 'task' or client_id is not null),
  check ((kind = 'filing') = (filing_code is not null and period_start is not null)),
  check ((kind = 'licence') = (licence_id is not null)),
  check ((filed_at is null) = (filed_by is null)),
  check ((done_at is null) = (done_by is null)),
  -- A done filing always has its ARN and receipt (criterion 11).
  check (done_at is null or kind <> 'filing' or (arn is not null and receipt_file_id is not null))
);

-- Files sit in the private bucket "files" at firm_id/client_id/... and belong to one item or one licence.
create table public.files (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null,
  client_id uuid not null,
  calendar_item_id uuid,
  licence_id uuid,
  storage_path text not null unique,
  file_name text not null,
  mime_type text not null check (mime_type in ('application/pdf', 'image/jpeg', 'image/png')),
  size_bytes bigint not null check (size_bytes between 1 and 10485760),
  uploaded_by uuid not null,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  foreign key (client_id, firm_id) references public.clients (id, firm_id),
  foreign key (calendar_item_id, client_id, firm_id) references public.calendar_items (id, client_id, firm_id),
  foreign key (licence_id, client_id, firm_id) references public.licences (id, client_id, firm_id),
  unique (id, firm_id),
  unique (id, calendar_item_id, firm_id),
  unique (id, licence_id, firm_id),
  check (num_nonnulls(calendar_item_id, licence_id) = 1),
  check (storage_path like firm_id::text || '/' || client_id::text || '/%')
);

-- A receipt must be a file of the same item; a certificate must be a file of the same licence.
alter table public.calendar_items
  add foreign key (receipt_file_id, id, firm_id) references public.files (id, calendar_item_id, firm_id);
alter table public.licences
  add foreign key (certificate_file_id, id, firm_id) references public.files (id, licence_id, firm_id);

-- A to-do the CA gives the owner inside an item's thread (FS-2 point 1).
create table public.owner_tasks (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null,
  client_id uuid not null,
  calendar_item_id uuid not null,
  title text not null check (length(title) between 1 and 200),
  note text,
  created_by uuid not null,
  created_at timestamptz not null default now(),
  done_at timestamptz,
  done_by uuid,
  foreign key (calendar_item_id, client_id, firm_id) references public.calendar_items (id, client_id, firm_id),
  check ((done_at is null) = (done_by is null))
);

-- The thread: Messages, Notes (firm only) and Activity events. Append-only.
create table public.thread_entries (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null,
  client_id uuid,
  calendar_item_id uuid not null,
  kind text not null check (kind in ('message', 'note', 'event')),
  author_id uuid,
  body text,
  tag text check (tag in ('need_document', 'question', 'filed')),
  event_type text check (event_type in (
    'filed', 'done', 'undone', 'done_edited', 'task_given', 'task_done', 'file_removed'
  )),
  file_id uuid,
  created_at timestamptz not null default now(),
  foreign key (calendar_item_id, client_id, firm_id) references public.calendar_items (id, client_id, firm_id),
  foreign key (file_id, firm_id) references public.files (id, firm_id),
  check ((kind = 'event') = (event_type is not null)),
  check (kind = 'event' or author_id is not null),
  check (kind = 'message' or tag is null)
);

-- Indexes: the firm_id every policy filters on, foreign keys, and the calendar's month query.
-- (clients.firm_id and calendar_items.client_id are already led by a unique index.)
create index on public.members (firm_id);
create index on public.members (client_id);
create index on public.invites (firm_id);
create index on public.invites (client_id);
create index on public.consents (firm_id);
create index on public.client_filings (firm_id);
create index on public.due_date_changes (firm_id);
create index on public.licences (firm_id);
create index on public.licences (client_id);
create index on public.licences (certificate_file_id);
create index on public.calendar_items (firm_id, due_date);
create index on public.calendar_items (due_date_change_id);
create index on public.calendar_items (receipt_file_id);
create index on public.files (firm_id);
create index on public.files (client_id);
create index on public.files (calendar_item_id);
create index on public.files (licence_id);
create index on public.files (uploaded_by);
create index on public.owner_tasks (firm_id);
create index on public.owner_tasks (client_id);
create index on public.owner_tasks (calendar_item_id);
create index on public.thread_entries (calendar_item_id, created_at);
create index on public.thread_entries (firm_id);
create index on public.thread_entries (client_id);
create index on public.thread_entries (file_id);

-- RLS on every table, and explicit grants: logged-in users and the server only, never anonymous
-- visitors (Supabase stops granting new tables automatically on 2026-10-30).
do $$
declare
  t text;
begin
  foreach t in array array[
    'firms', 'clients', 'members', 'invites', 'consents', 'client_filings', 'due_date_changes',
    'licences', 'calendar_items', 'files', 'owner_tasks', 'thread_entries'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on table public.%I from anon, authenticated', t);
    execute format('grant select, insert, update, delete on table public.%I to authenticated', t);
    execute format('grant all on table public.%I to service_role', t);
  end loop;
end $$;

-- ============================================================================================
-- Helpers for the policies, in a schema the API never exposes. They read members as the
-- database owner (security definer), so a policy on members can use them without looping.
-- ============================================================================================
create schema if not exists private;
grant usage on schema private to authenticated, service_role;

-- The caller's firm, only if they are staff there.
create function private.my_staff_firm_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select m.firm_id
  from public.members m
  where m.user_id = (select auth.uid()) and m.role = 'staff'
$$;

-- The caller's client, only if they are its owner and the client isn't archived (FS-2 point 7).
create function private.my_client_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select m.client_id
  from public.members m
  join public.clients c on c.id = m.client_id and c.firm_id = m.firm_id
  where m.user_id = (select auth.uid()) and m.role = 'owner' and c.archived_at is null
$$;

revoke execute on function private.my_staff_firm_id(), private.my_client_id() from public, anon;
grant execute on function private.my_staff_firm_id(), private.my_client_id() to authenticated, service_role;

-- ============================================================================================
-- Policies. "Staff" = staff of that firm. "Owner" = the owner of that client.
-- No delete policies except client_filings and calendar_items: nothing else is deleted in v1.
-- ============================================================================================

-- firms (made only by the server on sign-up)
create policy "staff and owners read their firm" on public.firms for select to authenticated
  using (
    id = (select private.my_staff_firm_id())
    or id = (select c.firm_id from public.clients c where c.id = (select private.my_client_id()))
  );
create policy "staff edit their firm" on public.firms for update to authenticated
  using (id = (select private.my_staff_firm_id()))
  with check (id = (select private.my_staff_firm_id()));

-- members (written only by the server on sign-up and invite accept)
create policy "read own row, firm staff, or the firm's staff as an owner" on public.members for select to authenticated
  using (
    user_id = (select auth.uid())
    or firm_id = (select private.my_staff_firm_id())
    or (role = 'staff' and firm_id = (
      select c.firm_id from public.clients c where c.id = (select private.my_client_id())
    ))
  );

-- invites
create policy "staff read their firm's invites" on public.invites for select to authenticated
  using (firm_id = (select private.my_staff_firm_id()));
create policy "staff invite to their firm" on public.invites for insert to authenticated
  with check (firm_id = (select private.my_staff_firm_id()) and invited_by = (select auth.uid()));

-- consents (append-only)
create policy "staff read their firm's consents" on public.consents for select to authenticated
  using (firm_id = (select private.my_staff_firm_id()));
create policy "staff record their own consent" on public.consents for insert to authenticated
  with check (firm_id = (select private.my_staff_firm_id()) and user_id = (select auth.uid()));

-- clients
create policy "staff or the owner read a client" on public.clients for select to authenticated
  using (firm_id = (select private.my_staff_firm_id()) or id = (select private.my_client_id()));
create policy "staff add clients" on public.clients for insert to authenticated
  with check (firm_id = (select private.my_staff_firm_id()));
create policy "staff edit clients" on public.clients for update to authenticated
  using (firm_id = (select private.my_staff_firm_id()))
  with check (firm_id = (select private.my_staff_firm_id()));

-- client_filings
create policy "staff or the owner read filings" on public.client_filings for select to authenticated
  using (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()));
create policy "staff add filings" on public.client_filings for insert to authenticated
  with check (firm_id = (select private.my_staff_firm_id()));
create policy "staff remove filings" on public.client_filings for delete to authenticated
  using (firm_id = (select private.my_staff_firm_id()));

-- due_date_changes (staff only; owners just see the moved date on their items)
create policy "staff read changes" on public.due_date_changes for select to authenticated
  using (firm_id = (select private.my_staff_firm_id()));
create policy "staff add changes" on public.due_date_changes for insert to authenticated
  with check (firm_id = (select private.my_staff_firm_id()) and created_by = (select auth.uid()));
create policy "staff edit or remove changes" on public.due_date_changes for update to authenticated
  using (firm_id = (select private.my_staff_firm_id()))
  with check (firm_id = (select private.my_staff_firm_id()));

-- licences (owners may only attach a certificate: see the guard trigger below)
create policy "staff or the owner read licences" on public.licences for select to authenticated
  using (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()));
create policy "staff add licences" on public.licences for insert to authenticated
  with check (firm_id = (select private.my_staff_firm_id()));
create policy "staff or the owner edit licences" on public.licences for update to authenticated
  using (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()))
  with check (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()));

-- calendar_items (made and rebuilt by staff actions and server jobs; owners read only)
create policy "staff or the owner read items" on public.calendar_items for select to authenticated
  using (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()));
create policy "staff add items" on public.calendar_items for insert to authenticated
  with check (firm_id = (select private.my_staff_firm_id()));
create policy "staff edit items" on public.calendar_items for update to authenticated
  using (firm_id = (select private.my_staff_firm_id()))
  with check (firm_id = (select private.my_staff_firm_id()));
create policy "staff remove items" on public.calendar_items for delete to authenticated
  using (firm_id = (select private.my_staff_firm_id()));

-- files (the uploader may mark their own file deleted: see the guard trigger below)
create policy "staff or the owner read files" on public.files for select to authenticated
  using (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()));
create policy "staff or the owner add files" on public.files for insert to authenticated
  with check (
    uploaded_by = (select auth.uid())
    and (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()))
  );
create policy "the uploader marks a file deleted" on public.files for update to authenticated
  using (
    uploaded_by = (select auth.uid())
    and (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()))
  )
  with check (
    uploaded_by = (select auth.uid())
    and (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()))
  );

-- owner_tasks (the owner may only tick their own task, as themselves)
create policy "staff or the owner read tasks" on public.owner_tasks for select to authenticated
  using (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()));
create policy "staff give tasks" on public.owner_tasks for insert to authenticated
  with check (firm_id = (select private.my_staff_firm_id()) and created_by = (select auth.uid()));
create policy "staff edit tasks, the owner ticks them" on public.owner_tasks for update to authenticated
  using (firm_id = (select private.my_staff_firm_id()) or client_id = (select private.my_client_id()))
  with check (
    firm_id = (select private.my_staff_firm_id())
    or (client_id = (select private.my_client_id()) and (done_by is null or done_by = (select auth.uid())))
  );

-- thread_entries (owners never see notes; nobody types an event; nothing is edited or deleted)
create policy "staff read threads, the owner reads messages and events" on public.thread_entries for select to authenticated
  using (
    firm_id = (select private.my_staff_firm_id())
    or (client_id = (select private.my_client_id()) and kind <> 'note')
  );
create policy "staff write messages and notes, the owner writes messages" on public.thread_entries for insert to authenticated
  with check (
    author_id = (select auth.uid())
    and (
      (firm_id = (select private.my_staff_firm_id()) and kind in ('message', 'note'))
      or (client_id = (select private.my_client_id()) and kind = 'message')
    )
  );

-- ============================================================================================
-- Guards: column limits the policies above can't express.
-- ============================================================================================

-- Owners may change only the listed columns (licences: the certificate; tasks: the tick).
-- Staff and server jobs (no logged-in user) are not limited here.
create function private.owner_may_change_only()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if (select auth.uid()) is null or (select private.my_client_id()) is null then
    return new;
  end if;
  if (to_jsonb(new) - tg_argv) is distinct from (to_jsonb(old) - tg_argv) then
    raise exception 'Owners can only change: %', array_to_string(tg_argv, ', ')
      using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger owner_may_change_only_certificate
  before update on public.licences
  for each row execute function private.owner_may_change_only('certificate_file_id');
create trigger owner_may_change_only_tick
  before update on public.owner_tasks
  for each row execute function private.owner_may_change_only('done_at', 'done_by');

-- A file can only be marked deleted, once, and never while it is a done item's receipt
-- (FS-2 point 16: Edit on Mark done replaces a receipt instead).
create function private.file_delete_rules()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then
    return new;
  end if;
  if (to_jsonb(new) - 'deleted_at') is distinct from (to_jsonb(old) - 'deleted_at')
     or old.deleted_at is not null or new.deleted_at is null then
    raise exception 'A file can only be marked deleted, once' using errcode = '42501';
  end if;
  if exists (
    select 1 from public.calendar_items i
    where i.receipt_file_id = old.id and i.done_at is not null
  ) then
    raise exception 'This file is the receipt of a done item. Use Edit on Mark done to replace it.'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger file_delete_rules
  before update on public.files
  for each row execute function private.file_delete_rules();

-- ============================================================================================
-- Activity events, written by the database when the real change happens (FS-2 point c).
-- Security definer because owners may not insert events themselves.
-- ============================================================================================
create function private.add_event(item public.calendar_items, p_event text, p_body text, p_file uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.thread_entries (firm_id, client_id, calendar_item_id, kind, author_id, event_type, body, file_id)
  values (item.firm_id, item.client_id, item.id, 'event', (select auth.uid()), p_event, p_body, p_file);
$$;

create function private.calendar_item_events()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.filed_at is null and new.filed_at is not null then
    perform private.add_event(new, 'filed', null, null);
  end if;
  if old.done_at is null and new.done_at is not null then
    perform private.add_event(new, 'done', new.arn, new.receipt_file_id);
  elsif old.done_at is not null and new.done_at is null then
    perform private.add_event(new, 'undone', null, null);
  elsif new.done_at is not null
     and (old.arn is distinct from new.arn or old.receipt_file_id is distinct from new.receipt_file_id) then
    perform private.add_event(new, 'done_edited', new.arn, new.receipt_file_id);
  end if;
  return null;
end;
$$;

create trigger calendar_item_events
  after update on public.calendar_items
  for each row execute function private.calendar_item_events();

create function private.owner_task_events()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  item public.calendar_items;
begin
  select * into item from public.calendar_items where id = new.calendar_item_id;
  if tg_op = 'INSERT' then
    perform private.add_event(item, 'task_given', new.title, null);
  elsif old.done_at is null and new.done_at is not null then
    perform private.add_event(item, 'task_done', new.title, null);
  end if;
  return null;
end;
$$;

create trigger owner_task_events
  after insert or update on public.owner_tasks
  for each row execute function private.owner_task_events();

create function private.file_events()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  item public.calendar_items;
begin
  if old.deleted_at is null and new.deleted_at is not null and new.calendar_item_id is not null then
    select * into item from public.calendar_items where id = new.calendar_item_id;
    perform private.add_event(item, 'file_removed', new.file_name, new.id);
  end if;
  return null;
end;
$$;

create trigger file_events
  after update on public.files
  for each row execute function private.file_events();

revoke execute on function
  private.owner_may_change_only(), private.file_delete_rules(),
  private.add_event(public.calendar_items, text, text, uuid),
  private.calendar_item_events(), private.owner_task_events(), private.file_events()
from public, anon, authenticated;

-- ============================================================================================
-- File storage: one private bucket. Access follows the files table, so the same rules apply.
-- ============================================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('files', 'files', false, 10485760, array['application/pdf', 'image/jpeg', 'image/png']);

create policy "files: read when its row is visible" on storage.objects for select to authenticated
  using (
    bucket_id = 'files'
    and exists (
      select 1 from public.files f where f.storage_path = objects.name and f.deleted_at is null
    )
  );

create policy "files: upload only after adding its row" on storage.objects for insert to authenticated
  with check (
    bucket_id = 'files'
    and exists (
      select 1 from public.files f
      where f.storage_path = objects.name and f.uploaded_by = (select auth.uid()) and f.deleted_at is null
    )
  );

create policy "files: the uploader removes it after marking it deleted" on storage.objects for delete to authenticated
  using (
    bucket_id = 'files'
    and exists (
      select 1 from public.files f
      where f.storage_path = objects.name and f.uploaded_by = (select auth.uid()) and f.deleted_at is not null
    )
  );
