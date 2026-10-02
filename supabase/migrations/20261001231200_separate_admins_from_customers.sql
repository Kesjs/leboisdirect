-- Keep the administration identity separate from the customer experience.
-- An administrator may share the same Auth user, but must not receive a
-- customer profile or appear in the customer dashboard.
create or replace function public.handle_new_braviko_customer()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if exists (
    select 1
    from public.braviko_admins admins
    where admins.user_id = new.id and admins.active
  ) then
    return new;
  end if;

  insert into public.braviko_customer_profiles (user_id, email, first_name, last_name)
  values (
    new.id,
    coalesce(new.email, ''),
    nullif(new.raw_user_meta_data ->> 'first_name', ''),
    nullif(new.raw_user_meta_data ->> 'last_name', '')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_braviko_customer() from public;

create or replace function public.remove_braviko_customer_profile_for_admin()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.active then
    delete from public.braviko_customer_profiles
    where user_id = new.user_id;
  end if;
  return new;
end;
$$;

revoke all on function public.remove_braviko_customer_profile_for_admin() from public;

drop trigger if exists on_braviko_admin_separate_customer_profile
  on public.braviko_admins;
create trigger on_braviko_admin_separate_customer_profile
  after insert or update of active on public.braviko_admins
  for each row execute procedure public.remove_braviko_customer_profile_for_admin();

-- Clean up an administrator that was created before this separation existed.
delete from public.braviko_customer_profiles profiles
where exists (
  select 1
  from public.braviko_admins admins
  where admins.user_id = profiles.user_id and admins.active
);
