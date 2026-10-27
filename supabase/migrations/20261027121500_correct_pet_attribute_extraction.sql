-- Keep only explicit size tokens and avoid presenting the product name as packaging.
with pet_rows as (
  select
    p.id,
    t.name,
    t.conditioning
  from public.braviko_products p
  join public.braviko_categories c on c.id = p.category_id
  join public.braviko_product_translations t
    on t.product_id = p.id and t.locale = 'it'
  where p.status = 'published'
    and c.slug in ('alimentazione', 'comfort', 'passeggiata-trasporto')
)
update public.braviko_products p
set product_attributes = jsonb_set(
  jsonb_set(
    coalesce(p.product_attributes, '{}'::jsonb),
    '{size}',
    case
      when r.name ~* '(M/L)' then to_jsonb(substring(r.name from '(M/L)'))
      when r.name ~* '\\m(XXS|XXL|XL|XS|S|M|L)\\M' then to_jsonb(substring(r.name from '\\m(XXS|XXL|XL|XS|S|M|L)\\M'))
      else 'null'::jsonb
    end,
    true
  ),
  '{packaging}',
  case
    when nullif(trim(r.conditioning), '') is null then 'null'::jsonb
    when lower(trim(r.conditioning)) = lower(trim(r.name)) then 'null'::jsonb
    else to_jsonb(trim(r.conditioning))
  end,
  true
)
from pet_rows r
where p.id = r.id;

with pet_rows as (
  select
    p.id,
    t.name,
    t.conditioning
  from public.braviko_products p
  join public.braviko_categories c on c.id = p.category_id
  join public.braviko_product_translations t
    on t.product_id = p.id and t.locale = 'it'
  where p.status = 'published'
    and c.slug in ('alimentazione', 'comfort', 'passeggiata-trasporto')
)
update public.braviko_product_translations t
set description = concat(
  r.name,
  case when nullif(trim(r.conditioning), '') is not null
    and lower(trim(r.conditioning)) <> lower(trim(r.name))
    then concat(' Confezione: ', trim(r.conditioning), '.')
    else ''
  end,
  ' Controlla formato e dimensioni nella scheda prima dell’ordine.'
)
from pet_rows r
where t.product_id = r.id
  and t.locale = 'it';

