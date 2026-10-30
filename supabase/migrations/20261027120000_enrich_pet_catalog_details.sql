-- Braviko pet catalogue enrichment.
-- The stock values below are catalogue availability values, not supplier stock
-- guarantees. The storefront intentionally does not expose a numeric scarcity
-- message until a live inventory source is connected.

alter table public.braviko_products
  add column if not exists product_attributes jsonb not null default '{}'::jsonb;

with pet_rows as (
  select
    p.id,
    c.slug as category_slug,
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
set product_attributes = jsonb_strip_nulls(jsonb_build_object(
  'brand', case
    when r.name ilike 'Natural Paradise %' then 'Natural Paradise'
    when r.name ilike 'Modern Living %' then 'Modern Living'
    when r.name ilike 'Nomad Tales %' then 'Nomad Tales'
    when r.name ilike 'Trixie %' then 'Trixie'
    when r.name ilike 'Ferplast %' then 'Ferplast'
    when r.name ilike 'Kerbl Pet %' then 'Kerbl Pet'
    when r.name ilike 'Kleinmetall %' then 'Kleinmetall'
    when r.name ilike 'HAFENBANDE %' then 'HAFENBANDE'
    when r.name ilike 'Royal Canin %' then 'Royal Canin'
    when r.name ilike 'Purina %' then 'Purina'
    when r.name ilike 'RINTI %' then 'RINTI'
    when r.name ilike 'Padovan %' then 'Padovan'
    when r.name ilike 'Vitakraft %' then 'Vitakraft'
    when r.name ilike 'Cat''s Flower %' then 'Cat''s Flower'
    when r.name ilike 'More %' then 'More'
    when r.name ilike 'Luna & Teo %' then 'Luna & Teo'
    when r.name ilike 'zooplus Basics %' then 'zooplus Basics'
    else null
  end,
  'product_type', case r.category_slug
    when 'alimentazione' then 'Alimento per animali'
    when 'comfort' then 'Comfort e riposo'
    when 'passeggiata-trasporto' then 'Trasporto e passeggiata'
    else null
  end,
  'format_or_weight', case
    when r.name ~* '[0-9]+([.,][0-9]+)?[[:space:]]*kg'
      then substring(r.name from '([0-9]+([.,][0-9]+)?[[:space:]]*kg)')
    when r.name ~* '[0-9]+[[:space:]]*cm'
      then substring(r.name from '([0-9]+[[:space:]]*cm)')
    else null
  end,
  'dimensions', case
    when r.name ~* '[0-9]+[[:space:]]*[×xX][[:space:]]*[0-9]+'
      then substring(r.name from '([0-9]+[[:space:]]*[×xX][[:space:]]*[0-9]+([[:space:]]*[×xX][[:space:]]*[0-9]+)?[[:space:]]*cm)')
    when r.name ~* 'H[[:space:]]*[0-9]+[[:space:]]*cm'
      then substring(r.name from '(H[[:space:]]*[0-9]+[[:space:]]*cm)')
    else null
  end,
  'size', case
    when r.name ~* '(XXS|XS|S|M/L|XXL|XL|M|L)'
      then substring(r.name from '((XXS|XS|S|M/L|XXL|XL|M|L))')
    else null
  end,
  'packaging', nullif(trim(r.conditioning), ''),
  'use', case r.category_slug
    when 'alimentazione' then 'Per la routine alimentare quotidiana.'
    when 'comfort' then 'Per organizzare uno spazio di riposo o di attività in casa.'
    when 'passeggiata-trasporto' then 'Per accompagnare spostamenti, viaggi e passeggiate.'
    else null
  end
))
from pet_rows r
where p.id = r.id;

with pet_rows as (
  select
    p.id,
    c.slug as category_slug,
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
set
  short_description = case r.category_slug
    when 'alimentazione' then 'Una scelta pratica per accompagnare ogni giorno l’alimentazione del tuo animale.'
    when 'comfort' then 'Una soluzione pensata per il riposo, il gioco e il benessere quotidiano in casa.'
    when 'passeggiata-trasporto' then 'Un accessorio affidabile per muoversi con più comfort e organizzazione.'
    else t.short_description
  end,
  description = concat(
    r.name,
    '. ',
    case r.category_slug
      when 'alimentazione' then 'Pensato per la routine alimentare quotidiana.'
      when 'comfort' then 'Pensato per creare uno spazio confortevole per il tuo animale.'
      when 'passeggiata-trasporto' then 'Pensato per passeggiate, spostamenti e viaggi più semplici.'
      else ''
    end,
    case when nullif(trim(r.conditioning), '') is not null
      then concat(' Confezione: ', trim(r.conditioning), '.')
      else ''
    end,
    ' Controlla formato e dimensioni nella scheda prima dell’ordine.'
  ),
  delivery_info = 'Spedizione gratuita in Italia. Tempi indicativi: 2–4 giorni per i prodotti disponibili.'
from pet_rows r
where t.product_id = r.id
  and t.locale = 'it';

with pet_variants as (
  select v.id,
         row_number() over (order by v.id) as position
  from public.braviko_product_variants v
  join public.braviko_products p on p.id = v.product_id
  join public.braviko_categories c on c.id = p.category_id
  where p.status = 'published'
    and v.active = true
    and c.slug in ('alimentazione', 'comfort', 'passeggiata-trasporto')
)
update public.braviko_product_variants v
set stock = case (pv.position % 6)
  when 0 then 8
  when 1 then 12
  when 2 then 18
  when 3 then 24
  when 4 then 31
  else 42
end
from pet_variants pv
where v.id = pv.id;

