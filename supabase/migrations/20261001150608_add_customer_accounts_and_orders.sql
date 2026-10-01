create table if not exists public.braviko_customer_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.braviko_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reference text not null unique,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  delivery_amount numeric(12, 2) not null default 0 check (delivery_amount >= 0),
  total numeric(12, 2) not null check (total >= 0),
  currency text not null default 'EUR' check (currency = 'EUR'),
  customer_email text not null,
  first_name text not null,
  last_name text not null,
  phone text not null,
  address text not null,
  postal_code text not null,
  city text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.braviko_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.braviko_orders(id) on delete cascade,
  product_id text,
  variant_id text,
  product_name text not null,
  variant_label text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  line_total numeric(12, 2) not null check (line_total >= 0),
  created_at timestamptz not null default now()
);

create index if not exists braviko_orders_user_created_idx
  on public.braviko_orders(user_id, created_at desc);

create index if not exists braviko_order_items_order_idx
  on public.braviko_order_items(order_id);

alter table public.braviko_customer_profiles enable row level security;
alter table public.braviko_orders enable row level security;
alter table public.braviko_order_items enable row level security;

create policy "Customers read their Braviko profile"
  on public.braviko_customer_profiles for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Customers create their Braviko profile"
  on public.braviko_customer_profiles for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Customers update their Braviko profile"
  on public.braviko_customer_profiles for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Customers read their Braviko orders"
  on public.braviko_orders for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Customers create their Braviko orders"
  on public.braviko_orders for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Customers read their Braviko order items"
  on public.braviko_order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.braviko_orders orders
      where orders.id = order_id and orders.user_id = (select auth.uid())
    )
  );

create policy "Customers create their Braviko order items"
  on public.braviko_order_items for insert
  to authenticated
  with check (
    exists (
      select 1 from public.braviko_orders orders
      where orders.id = order_id and orders.user_id = (select auth.uid())
    )
  );

create policy "Admins read all Braviko customer profiles"
  on public.braviko_customer_profiles for select
  to authenticated
  using (
    exists (
      select 1 from public.braviko_admins admins
      where admins.user_id = (select auth.uid()) and admins.active
    )
  );

create policy "Admins read all Braviko orders"
  on public.braviko_orders for select
  to authenticated
  using (
    exists (
      select 1 from public.braviko_admins admins
      where admins.user_id = (select auth.uid()) and admins.active
    )
  );

create policy "Admins update Braviko orders"
  on public.braviko_orders for update
  to authenticated
  using (
    exists (
      select 1 from public.braviko_admins admins
      where admins.user_id = (select auth.uid()) and admins.active
    )
  )
  with check (
    exists (
      select 1 from public.braviko_admins admins
      where admins.user_id = (select auth.uid()) and admins.active
    )
  );

create policy "Admins read all Braviko order items"
  on public.braviko_order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.braviko_admins admins
      where admins.user_id = (select auth.uid()) and admins.active
    )
  );

grant select, insert, update on public.braviko_customer_profiles to authenticated;
grant select, insert, update on public.braviko_orders to authenticated;
grant select, insert on public.braviko_order_items to authenticated;

create or replace function public.handle_new_braviko_customer()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
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

drop trigger if exists on_auth_user_created_create_braviko_profile on auth.users;
create trigger on_auth_user_created_create_braviko_profile
  after insert on auth.users
  for each row execute procedure public.handle_new_braviko_customer();

insert into public.braviko_customer_profiles (user_id, email)
select id, coalesce(email, '')
from auth.users
on conflict (user_id) do nothing;
