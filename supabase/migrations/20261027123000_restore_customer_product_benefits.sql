-- Restore concise, customer-facing benefits after the extraction cleanup.
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
    case r.category_slug
      when 'alimentazione' then 'Pensato per accompagnare la routine alimentare quotidiana del tuo animale.'
      when 'comfort' then 'Pensato per creare uno spazio confortevole per il riposo o l’attività in casa.'
      when 'passeggiata-trasporto' then 'Pensato per rendere passeggiate, spostamenti e viaggi più semplici.'
      else 'Scelto per accompagnare la vita quotidiana del tuo animale.'
    end,
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

