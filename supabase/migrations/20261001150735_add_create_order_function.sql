create or replace function public.create_braviko_order(
  p_reference text,
  p_customer jsonb,
  p_items jsonb
)
returns table (order_id uuid, order_total numeric)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_order_id uuid;
  calculated_total numeric(12, 2);
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_reference is null or length(trim(p_reference)) < 6 then
    raise exception 'Invalid order reference';
  end if;

  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'An order must contain at least one item';
  end if;

  select coalesce(sum(
    greatest(1, (item ->> 'quantity')::integer) *
    greatest(0, (item ->> 'unit_price')::numeric)
  ), 0)::numeric(12, 2)
  into calculated_total
  from jsonb_array_elements(p_items) item;

  insert into public.braviko_orders (
    user_id, reference, subtotal, total, customer_email,
    first_name, last_name, phone, address, postal_code, city
  ) values (
    auth.uid(),
    trim(p_reference),
    calculated_total,
    calculated_total,
    trim(coalesce(p_customer ->> 'email', '')),
    trim(coalesce(p_customer ->> 'first_name', '')),
    trim(coalesce(p_customer ->> 'last_name', '')),
    trim(coalesce(p_customer ->> 'phone', '')),
    trim(coalesce(p_customer ->> 'address', '')),
    trim(coalesce(p_customer ->> 'postal_code', '')),
    trim(coalesce(p_customer ->> 'city', ''))
  ) returning id into new_order_id;

  insert into public.braviko_order_items (
    order_id, product_id, variant_id, product_name, variant_label,
    quantity, unit_price, line_total
  )
  select
    new_order_id,
    nullif(item ->> 'product_id', ''),
    nullif(item ->> 'variant_id', ''),
    trim(coalesce(item ->> 'product_name', 'Produit')),
    nullif(item ->> 'variant_label', ''),
    greatest(1, (item ->> 'quantity')::integer),
    greatest(0, (item ->> 'unit_price')::numeric)::numeric(12, 2),
    (
      greatest(1, (item ->> 'quantity')::integer) *
      greatest(0, (item ->> 'unit_price')::numeric)
    )::numeric(12, 2)
  from jsonb_array_elements(p_items) item;

  return query select new_order_id, calculated_total;
end;
$$;

revoke all on function public.create_braviko_order(text, jsonb, jsonb) from public;
grant execute on function public.create_braviko_order(text, jsonb, jsonb) to authenticated;
