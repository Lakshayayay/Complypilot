-- Supabase's own rls_auto_enable() (behind the ensure_rls event trigger, kept at FS-1) could be called
-- by anyone through /rest/v1/rpc. Firing the event trigger never needs this permission, so only the
-- public API call is closed. The function exists on the cloud projects only, not on the local copy.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end $$;
