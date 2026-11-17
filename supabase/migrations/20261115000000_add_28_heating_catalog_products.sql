-- Insert 28 new heating catalog products (bringing total published catalog to 50 products)
begin;

insert into public.braviko_categories (slug, name) values ('buches', 'buches') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000001-0000-4000-8000-000000000001', 'bois-de-chauffage-chene-hetre-25-cm-palette-2-steres', 'published', false, 23, c.id
from public.braviko_categories c where c.slug = 'buches'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Legna da ardere Quercia & Faggio 25 cm – Essiccata in forno', 'Miscela nobile 100% Quercia e Faggio in taglio corto da 25 cm, essiccata in forno con umidità inferiore al 18%. Progettata per stufe compatte, stufe scandinave e caminetti moderni ad alto rendimento.', 'Pensata specificamente per le camere di combustione compatte delle stufe a legna moderne e degli inserti di ultima generazione, questa miscela di quercia e faggio in taglio da 25 cm unisce la rapidità di accensione e la fiamma luminosa del faggio alla brace longeva e densa della quercia.

Grazie all’essiccazione controllata in forno a biomassa che porta l’umidità interna sotto il 18%, ogni ceppo sviluppa un potere calorifico di 4,3 kWh/kg senza annerire il vetro ceramico né incrostare la canna fumaria. Il bancale è accatastato a mano per garantire la massima densità di legna utile e uno stoccaggio ordinato in spazi ridotti.', 'Bancale da 2 steri (disponibile anche da 3 steri)', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-hetre-25-cm-palette-2-steres'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000001-0000-4000-8000-000000000101', p.id, 'BRV-BOIS-QH-2S-25', 'Bancale da 2 steri – ceppi da 25 cm', 219, 25
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-hetre-25-cm-palette-2-steres'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000001-0000-4000-8000-000000000102', p.id, 'BRV-BOIS-QH-3S-25', 'Bancale da 3 steri – ceppi da 25 cm', 309, 25
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-hetre-25-cm-palette-2-steres'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-chene-hetre-25-cm-palette-2-steres-1.jpg', 'Legna da ardere Quercia & Faggio 25 cm – Essiccata in forno', 1, true
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-hetre-25-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-chene-hetre-25-cm-palette-2-steres-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-chene-hetre-25-cm-palette-2-steres-2.jpg', 'Legna da ardere Quercia & Faggio 25 cm – Essiccata in forno', 2, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-hetre-25-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-chene-hetre-25-cm-palette-2-steres-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-chene-hetre-25-cm-palette-2-steres-3.jpg', 'Legna da ardere Quercia & Faggio 25 cm – Essiccata in forno', 3, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-hetre-25-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-chene-hetre-25-cm-palette-2-steres-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-chene-hetre-25-cm-palette-2-steres-4.jpg', 'Legna da ardere Quercia & Faggio 25 cm – Essiccata in forno', 4, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-hetre-25-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-chene-hetre-25-cm-palette-2-steres-4.jpg');

insert into public.braviko_categories (slug, name) values ('buches', 'buches') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000002-0000-4000-8000-000000000002', 'bois-de-chauffage-charme-chene-40-cm-palette-2-steres', 'published', false, 24, c.id
from public.braviko_categories c where c.slug = 'buches'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Legna da ardere Carpino & Quercia 40 cm – Bancale essiccato < 18%', 'Combinazione ad altissima densità di Carpino bianco e Quercia rovere in ceppi da 40 cm essiccati sotto il 18%. Progettata per inserti da 60–70 cm e stufe di media e grande taglia per una brace incandescente a lunga tenuta.', 'Il carpino bianco e la quercia rovere rappresentano l’eccellenza assoluta tra le latifoglie dure da riscaldamento per massa volumica e durata della brace. Il formato intermedio da 40 cm sfrutta appieno la larghezza degli inserti da 60–70 cm e delle stufe a legna spaziose, riducendo la frequenza di ricarica.

Con un tasso di umidità inferiore al 18% ottenuto tramite essiccazione controllata, il carpino sviluppa una fiamma calma, luminosa e priva di scintille, mentre la quercia rovere costruisce un letto di braci ad altissima densità con un potere calorifico di 4,3 kWh/kg.', 'Bancale da 2 steri (disponibile anche da 3 steri)', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'bois-de-chauffage-charme-chene-40-cm-palette-2-steres'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000002-0000-4000-8000-000000000101', p.id, 'BRV-BOIS-CQ-2S-40', 'Bancale da 2 steri – ceppi da 40 cm', 205, 25
from public.braviko_products p where p.slug = 'bois-de-chauffage-charme-chene-40-cm-palette-2-steres'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000002-0000-4000-8000-000000000102', p.id, 'BRV-BOIS-CQ-3S-40', 'Bancale da 3 steri – ceppi da 40 cm', 289, 25
from public.braviko_products p where p.slug = 'bois-de-chauffage-charme-chene-40-cm-palette-2-steres'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-charme-chene-40-cm-palette-2-steres-1.jpg', 'Legna da ardere Carpino & Quercia 40 cm – Bancale essiccato < 18%', 1, true
from public.braviko_products p where p.slug = 'bois-de-chauffage-charme-chene-40-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-charme-chene-40-cm-palette-2-steres-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-charme-chene-40-cm-palette-2-steres-2.jpg', 'Legna da ardere Carpino & Quercia 40 cm – Bancale essiccato < 18%', 2, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-charme-chene-40-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-charme-chene-40-cm-palette-2-steres-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-charme-chene-40-cm-palette-2-steres-3.jpg', 'Legna da ardere Carpino & Quercia 40 cm – Bancale essiccato < 18%', 3, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-charme-chene-40-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-charme-chene-40-cm-palette-2-steres-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-charme-chene-40-cm-palette-2-steres-4.jpg', 'Legna da ardere Carpino & Quercia 40 cm – Bancale essiccato < 18%', 4, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-charme-chene-40-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-charme-chene-40-cm-palette-2-steres-4.jpg');

insert into public.braviko_categories (slug, name) values ('buches', 'buches') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000003-0000-4000-8000-000000000003', 'bois-de-chauffage-hetre-pur-33-cm-palette-2-steres', 'published', true, 25, c.id
from public.braviko_categories c where c.slug = 'buches'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Legna da ardere Faggio Puro 33 cm – Stufa, Camino e Forno Pizza', '100% Faggio europeo (Fagus sylvatica) spaccato, spazzolato ed essiccato in forno sotto il 17% di umidità. Combustione pulita di grado alimentare senza resine né scintille, ideale per stufe, camini, forni pizza e bracieri OFYR.', 'Il faggio puro (Fagus sylvatica) è il legno più apprezzato tanto per il riscaldamento domestico quanto per la cottura a legna. Naturalmente privo di resine e tannini amari, brucia con una fiamma viva, lunga e regolarissima senza scoppiettare né produrre fumo acre.

Ogni ceppo da 33 cm viene spaccato, spazzolato in tamburo per eliminare schegge e impurità e infine essiccato in forno fino a un tasso di umidità inferiore al 17%. È la scelta d’elezione per stufe a legna moderne, caminetti aperti, forni per pizza tradizionali e bracieri-plancha da esterno come OFYR e Le Bigorneau.', 'Bancale da 2 steri (disponibile anche da 3 steri)', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'bois-de-chauffage-hetre-pur-33-cm-palette-2-steres'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000003-0000-4000-8000-000000000101', p.id, 'BRV-BOIS-FAG-2S-33', 'Bancale da 2 steri – ceppi da 33 cm', 215, 25
from public.braviko_products p where p.slug = 'bois-de-chauffage-hetre-pur-33-cm-palette-2-steres'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000003-0000-4000-8000-000000000102', p.id, 'BRV-BOIS-FAG-3S-33', 'Bancale da 3 steri – ceppi da 33 cm', 299, 25
from public.braviko_products p where p.slug = 'bois-de-chauffage-hetre-pur-33-cm-palette-2-steres'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-hetre-pur-33-cm-palette-2-steres-1.jpg', 'Legna da ardere Faggio Puro 33 cm – Stufa, Camino e Forno Pizza', 1, true
from public.braviko_products p where p.slug = 'bois-de-chauffage-hetre-pur-33-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-hetre-pur-33-cm-palette-2-steres-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-hetre-pur-33-cm-palette-2-steres-2.jpg', 'Legna da ardere Faggio Puro 33 cm – Stufa, Camino e Forno Pizza', 2, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-hetre-pur-33-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-hetre-pur-33-cm-palette-2-steres-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-hetre-pur-33-cm-palette-2-steres-3.jpg', 'Legna da ardere Faggio Puro 33 cm – Stufa, Camino e Forno Pizza', 3, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-hetre-pur-33-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-hetre-pur-33-cm-palette-2-steres-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-hetre-pur-33-cm-palette-2-steres-4.jpg', 'Legna da ardere Faggio Puro 33 cm – Stufa, Camino e Forno Pizza', 4, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-hetre-pur-33-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-hetre-pur-33-cm-palette-2-steres-4.jpg');

insert into public.braviko_categories (slug, name) values ('buches', 'buches') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000004-0000-4000-8000-000000000004', 'bois-de-chauffage-chene-massif-50-cm-palette-2-steres', 'published', false, 26, c.id
from public.braviko_categories c where c.slug = 'buches'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Legna da ardere Quercia Massiccia 50 cm – Grandi Focolari e Caldaie', '100% Quercia massiccia stagionata 24 mesi sotto tettoia con finitura in essiccatoio (< 19%). Ceppi grandi da 50 cm a combustione extra-lenta per grandi camini, inserti da 70–100 cm e caldaie a fiamma inversa.', 'Dedicata a chi possiede grandi camini tradizionali, focolari panoramici, inserti da 70–100 cm o caldaie a legna a fiamma inversa, questa quercia massiccia da 50 cm offre un’autonomia di riscaldamento impareggiabile.

Prima di passare alla finitura in essiccatoio che stabilizza l’umidità al cuore sotto il 19%, la quercia viene stagionata naturalmente per 24 mesi in modo da dilavare i tannini naturali. Il risultato è un ceppo denso e pesante a combustione extra-lenta che mantiene un letto di braci ardenti per molte ore consecutive.', 'Bancale da 2 steri (disponibile anche da 3 steri)', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-massif-50-cm-palette-2-steres'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000004-0000-4000-8000-000000000101', p.id, 'BRV-BOIS-QUE-2S-50', 'Bancale da 2 steri – ceppi da 50 cm', 199, 25
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-massif-50-cm-palette-2-steres'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000004-0000-4000-8000-000000000102', p.id, 'BRV-BOIS-QUE-3S-50', 'Bancale da 3 steri – ceppi da 50 cm', 279, 25
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-massif-50-cm-palette-2-steres'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-chene-massif-50-cm-palette-2-steres-1.jpg', 'Legna da ardere Quercia Massiccia 50 cm – Grandi Focolari e Caldaie', 1, true
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-massif-50-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-chene-massif-50-cm-palette-2-steres-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-chene-massif-50-cm-palette-2-steres-2.jpg', 'Legna da ardere Quercia Massiccia 50 cm – Grandi Focolari e Caldaie', 2, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-massif-50-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-chene-massif-50-cm-palette-2-steres-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-chene-massif-50-cm-palette-2-steres-3.jpg', 'Legna da ardere Quercia Massiccia 50 cm – Grandi Focolari e Caldaie', 3, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-massif-50-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-chene-massif-50-cm-palette-2-steres-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/bois-de-chauffage-chene-massif-50-cm-palette-2-steres-4.jpg', 'Legna da ardere Quercia Massiccia 50 cm – Grandi Focolari e Caldaie', 4, false
from public.braviko_products p where p.slug = 'bois-de-chauffage-chene-massif-50-cm-palette-2-steres'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/bois-de-chauffage-chene-massif-50-cm-palette-2-steres-4.jpg');

insert into public.braviko_categories (slug, name) values ('granules', 'granules') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000005-0000-4000-8000-000000000005', 'granules-bois-piveteau-dinplus-palette-1080-kg', 'published', true, 27, c.id
from public.braviko_categories c where c.slug = 'granules'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Pellet Piveteau HPC DINplus / ENplus A1 – Bancale 72 sacchi (1.080 kg)', 'Pellet 100% conifera vergine ad alta prestazione calorifica (HPC) con doppia certificazione DINplus & ENplus A1. Confezionato in bancale completo da 72 sacchi da 15 kg (1.080 kg totali), con PCI ≥ 5,0 kWh/kg e residuo ceneri ≤ 0,3%.', 'Il pellet Piveteau HPC (High Performance Calorific) è prodotto esclusivamente da segatura fresca di conifera vergine decorticata ed essiccata a bassa temperatura, senza alcun additivo chimico né legante sintetico. Grazie al potere calorifico inferiore superiore o uguale a 5,0 kWh/kg e a un tasso di ceneri ultra-ridotto (≤ 0,3%), assicura una fiamma viva, costante e una combustione straordinariamente pulita.

Il bancale da 72 sacchi da 15 kg (1.080 kg complessivi) offre una scorta invernale maggiorata rispetto ai bancali standard, proteggendo il braciere e lo scambiatore termico di stufe, inserti canalizzati e caldaie a pellet di ultima generazione.', 'Bancale 1.080 kg – 72 sacchi da 15 kg', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'granules-bois-piveteau-dinplus-palette-1080-kg'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000005-0000-4000-8000-000000000101', p.id, 'BRV-PEL-PIV-1080', 'Bancale 1.080 kg – 72 sacchi da 15 kg', 419, 25
from public.braviko_products p where p.slug = 'granules-bois-piveteau-dinplus-palette-1080-kg'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/granules-bois-piveteau-dinplus-palette-1080-kg-1.jpg', 'Pellet Piveteau HPC DINplus / ENplus A1 – Bancale 72 sacchi (1.080 kg)', 1, true
from public.braviko_products p where p.slug = 'granules-bois-piveteau-dinplus-palette-1080-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/granules-bois-piveteau-dinplus-palette-1080-kg-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/granules-bois-piveteau-dinplus-palette-1080-kg-2.jpg', 'Pellet Piveteau HPC DINplus / ENplus A1 – Bancale 72 sacchi (1.080 kg)', 2, false
from public.braviko_products p where p.slug = 'granules-bois-piveteau-dinplus-palette-1080-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/granules-bois-piveteau-dinplus-palette-1080-kg-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/granules-bois-piveteau-dinplus-palette-1080-kg-3.jpg', 'Pellet Piveteau HPC DINplus / ENplus A1 – Bancale 72 sacchi (1.080 kg)', 3, false
from public.braviko_products p where p.slug = 'granules-bois-piveteau-dinplus-palette-1080-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/granules-bois-piveteau-dinplus-palette-1080-kg-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/granules-bois-piveteau-dinplus-palette-1080-kg-4.jpg', 'Pellet Piveteau HPC DINplus / ENplus A1 – Bancale 72 sacchi (1.080 kg)', 4, false
from public.braviko_products p where p.slug = 'granules-bois-piveteau-dinplus-palette-1080-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/granules-bois-piveteau-dinplus-palette-1080-kg-4.jpg');

insert into public.braviko_categories (slug, name) values ('granules', 'granules') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000006-0000-4000-8000-000000000006', 'granules-bois-cogra-enplus-a1-palette-975-kg', 'published', false, 28, c.id
from public.braviko_categories c where c.slug = 'granules'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Pellet Cogra 100% Resinoso ENplus A1 – Bancale 65 sacchi (975 kg)', 'Pellet storico Cogra ottenuto da 100% segatura di pino e abete senza additivi né collanti. Certificato ENplus A1 e DINplus, confezionato in bancale da 65 sacchi da 15 kg (975 kg totali) con PCI di 4,9 kWh/kg.', 'Punto di riferimento storico nella produzione di pellet europeo da oltre quarant’anni, Cogra realizza un combustibile 100% resinoso a partire da pura segatura selezionata di pino e abete. La pressatura naturale ad alta densità, priva di additivi o collanti chimici, assicura una lunghezza regolare dei cilindretti (3,15–40 mm) che favorisce uno scorrimento silenzioso e senza inceppamenti nella coclea.

Con un potere calorifico di 4,9 kWh/kg e un residuo ceneri contenuto (≤ 0,5%), il bancale da 65 sacchi da 15 kg (975 kg netti) rappresenta la scelta affidabile ed equilibrata per il riscaldamento domestico quotidiano con stufe e caldaie a pellet.', 'Bancale 975 kg – 65 sacchi da 15 kg', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'granules-bois-cogra-enplus-a1-palette-975-kg'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000006-0000-4000-8000-000000000101', p.id, 'BRV-PEL-COG-975', 'Bancale 975 kg – 65 sacchi da 15 kg', 379, 25
from public.braviko_products p where p.slug = 'granules-bois-cogra-enplus-a1-palette-975-kg'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/granules-bois-cogra-enplus-a1-palette-975-kg-1.jpg', 'Pellet Cogra 100% Resinoso ENplus A1 – Bancale 65 sacchi (975 kg)', 1, true
from public.braviko_products p where p.slug = 'granules-bois-cogra-enplus-a1-palette-975-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/granules-bois-cogra-enplus-a1-palette-975-kg-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/granules-bois-cogra-enplus-a1-palette-975-kg-2.jpg', 'Pellet Cogra 100% Resinoso ENplus A1 – Bancale 65 sacchi (975 kg)', 2, false
from public.braviko_products p where p.slug = 'granules-bois-cogra-enplus-a1-palette-975-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/granules-bois-cogra-enplus-a1-palette-975-kg-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/granules-bois-cogra-enplus-a1-palette-975-kg-3.jpg', 'Pellet Cogra 100% Resinoso ENplus A1 – Bancale 65 sacchi (975 kg)', 3, false
from public.braviko_products p where p.slug = 'granules-bois-cogra-enplus-a1-palette-975-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/granules-bois-cogra-enplus-a1-palette-975-kg-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/granules-bois-cogra-enplus-a1-palette-975-kg-4.jpg', 'Pellet Cogra 100% Resinoso ENplus A1 – Bancale 65 sacchi (975 kg)', 4, false
from public.braviko_products p where p.slug = 'granules-bois-cogra-enplus-a1-palette-975-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/granules-bois-cogra-enplus-a1-palette-975-kg-4.jpg');

insert into public.braviko_categories (slug, name) values ('bois-compresse', 'bois-compresse') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000007-0000-4000-8000-000000000007', 'buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg', 'published', false, 29, c.id
from public.braviko_categories c where c.slug = 'bois-compresse'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Mezzo Bancale Tronchetti Cilindrici Faggio & Quercia – 500 kg (50 pacchi)', 'Mezzo bancale salvaspazio da 500 kg composto da 50 pacchi da 5 tronchetti cilindrici (250 tronchetti totali) in pura segatura compressa di faggio e quercia non trattata. PCI 4,8 kWh/kg e umidità < 9%.', 'Pensato per chi desidera tutta la potenza del legno densificato ma dispone di spazio ridotto in garage, cantina o portico, questo mezzo bancale da 500 kg riunisce 50 pratiche confezioni termoretraibili da 10 kg (5 tronchetti cilindrici per pacco, 250 tronchetti in totale). Ogni cilindro è ottenuto comprimendo ad altissima pressione esclusivamente segatura e trucioli vergini di faggio e quercia non trattati.

Con un’umidità residua inferiore al 9% e un potere calorifico di 4,8 kWh/kg, un singolo tronchetto sviluppa il calore equivalente a 3–4 ceppi di legna tradizionale, azzerando sporco, insetti, muffe e residui di corteccia in casa.', 'Mezzo bancale 500 kg – 50 pacchi da 10 kg', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000007-0000-4000-8000-000000000101', p.id, 'BRV-BRI-500KG', 'Mezzo bancale 500 kg – 50 pacchi da 10 kg', 219, 25
from public.braviko_products p where p.slug = 'buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg-1.jpg', 'Mezzo Bancale Tronchetti Cilindrici Faggio & Quercia – 500 kg (50 pacchi)', 1, true
from public.braviko_products p where p.slug = 'buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg-2.jpg', 'Mezzo Bancale Tronchetti Cilindrici Faggio & Quercia – 500 kg (50 pacchi)', 2, false
from public.braviko_products p where p.slug = 'buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg-3.jpg', 'Mezzo Bancale Tronchetti Cilindrici Faggio & Quercia – 500 kg (50 pacchi)', 3, false
from public.braviko_products p where p.slug = 'buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg-4.jpg', 'Mezzo Bancale Tronchetti Cilindrici Faggio & Quercia – 500 kg (50 pacchi)', 4, false
from public.braviko_products p where p.slug = 'buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/buches-densifiees-cylindriques-hetre-chene-demi-palette-500-kg-4.jpg');

insert into public.braviko_categories (slug, name) values ('allumage', 'allumage') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000008-0000-4000-8000-000000000008', 'pack-allumage-hiver-bois-fagots-laine-de-bois-palette', 'published', false, 30, c.id
from public.braviko_categories c where c.slug = 'allumage'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Kit Scorta Accensione Invernale – 10 Casse Legnetti Faggio + 600 Accendifuoco', 'Kit completo per l’intera stagione invernale: 10 scatole da 40 L di legnetti di faggio spaccati fini ed essiccati in forno (< 12% umidità, 400 L totali) + 600 accendifuoco ecologici in lana di legno e cera vegetale FSC.', 'Dimentica la carta di giornale, i cubetti chimici maleodoranti e la fatica di spaccare listelli ogni sera: il Kit Scorta Accensione Invernale riunisce in un’unica fornitura tutto il necessario per avviare stufa, camino, braciere o forno a legna per oltre 300 accensioni.

Le 10 robuste scatole in cartone (40 litri ciascuna, per 400 L complessivi) contengono legnetti di faggio puro spaccati sottili ed essiccati in forno a meno del 12% di umidità. In abbinamento, i 600 rotoli di lana di legno naturale impregnati di cera vegetale certificata FSC sviluppano una fiamma alta e inodore per 8–10 minuti, portando immediatamente in temperatura la canna fumaria senza fumo.', 'Kit 10 casse legnetti (400 L) + 600 rotoli lana di legno', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'pack-allumage-hiver-bois-fagots-laine-de-bois-palette'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000008-0000-4000-8000-000000000101', p.id, 'BRV-KIT-ALLUMAGE-10', 'Kit 10 casse legnetti (400 L) + 600 rotoli lana di legno', 179, 25
from public.braviko_products p where p.slug = 'pack-allumage-hiver-bois-fagots-laine-de-bois-palette'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/pack-allumage-hiver-bois-fagots-laine-de-bois-palette-1.jpg', 'Kit Scorta Accensione Invernale – 10 Casse Legnetti Faggio + 600 Accendifuoco', 1, true
from public.braviko_products p where p.slug = 'pack-allumage-hiver-bois-fagots-laine-de-bois-palette'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/pack-allumage-hiver-bois-fagots-laine-de-bois-palette-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/pack-allumage-hiver-bois-fagots-laine-de-bois-palette-2.jpg', 'Kit Scorta Accensione Invernale – 10 Casse Legnetti Faggio + 600 Accendifuoco', 2, false
from public.braviko_products p where p.slug = 'pack-allumage-hiver-bois-fagots-laine-de-bois-palette'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/pack-allumage-hiver-bois-fagots-laine-de-bois-palette-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/pack-allumage-hiver-bois-fagots-laine-de-bois-palette-3.jpg', 'Kit Scorta Accensione Invernale – 10 Casse Legnetti Faggio + 600 Accendifuoco', 3, false
from public.braviko_products p where p.slug = 'pack-allumage-hiver-bois-fagots-laine-de-bois-palette'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/pack-allumage-hiver-bois-fagots-laine-de-bois-palette-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/pack-allumage-hiver-bois-fagots-laine-de-bois-palette-4.jpg', 'Kit Scorta Accensione Invernale – 10 Casse Legnetti Faggio + 600 Accendifuoco', 4, false
from public.braviko_products p where p.slug = 'pack-allumage-hiver-bois-fagots-laine-de-bois-palette'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/pack-allumage-hiver-bois-fagots-laine-de-bois-palette-4.jpg');

insert into public.braviko_categories (slug, name) values ('poeles-a-bois', 'poeles-a-bois') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000009-0000-4000-8000-000000000009', 'poele-bois-fonte-invicta-chamane-10-kw', 'published', true, 31, c.id
from public.braviko_categories c where c.slug = 'poeles-a-bois'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Stufa a legna in ghisa Invicta Chamane – 10 kW', 'Stufa a legna monumentale dalla caratteristica silhouette conica a totem, fusa al 100% in ghisa nelle fonderie francesi Invicta di Donchery. Potenza nominale di 10 kW per riscaldare fino a 300 m³ (circa 120 m²), doppia combustione e certificazione Flamme Verte 7 stelle / Ecodesign 2022.', 'Icona del riscaldamento a legna contemporaneo, la stufa Invicta Chamane da 10 kW coniuga l’inerzia termica di 160 kg di pura ghisa francese a una linea slanciata a cono nervato alta 120 cm che ottimizza lo scambio di calore per convezione e irraggiamento.

Dotata di sistema di post-combustione a iniezione d’aria preriscaldata e barriera d’aria per il vetro pulito, raggiunge un rendimento del 78,7 % riducendo al minimo emissioni e depositi fuligginosi. Il focolare accoglie ceppi fino a 44 cm in orizzontale o verticale ed è certificato Flamme Verte 7 stelle ed Ecodesign 2022.', 'Stufa in ghisa su bancale rinforzato (160 kg)', 'Consegna in 6–10 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-chamane-10-kw'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000009-0000-4000-8000-000000000101', p.id, 'BRV-INV-CHAMANE-10', 'Stufa Invicta Chamane 10 kW – Ghisa Antracite', 749, 25
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-chamane-10-kw'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-fonte-invicta-chamane-10-kw-1.jpg', 'Stufa a legna in ghisa Invicta Chamane – 10 kW', 1, true
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-chamane-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-fonte-invicta-chamane-10-kw-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-fonte-invicta-chamane-10-kw-2.jpg', 'Stufa a legna in ghisa Invicta Chamane – 10 kW', 2, false
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-chamane-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-fonte-invicta-chamane-10-kw-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-fonte-invicta-chamane-10-kw-3.jpg', 'Stufa a legna in ghisa Invicta Chamane – 10 kW', 3, false
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-chamane-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-fonte-invicta-chamane-10-kw-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-fonte-invicta-chamane-10-kw-4.jpg', 'Stufa a legna in ghisa Invicta Chamane – 10 kW', 4, false
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-chamane-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-fonte-invicta-chamane-10-kw-4.jpg');

insert into public.braviko_categories (slug, name) values ('poeles-a-bois', 'poeles-a-bois') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000010-0000-4000-8000-000000000010', 'poele-bois-fonte-invicta-ove-design-10-kw', 'published', false, 32, c.id
from public.braviko_categories c where c.slug = 'poeles-a-bois'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Stufa a legna in ghisa Invicta Ove Design – 10 kW', 'Stufa a legna scultorea dal design iconico ovoidale firmato Jean-Philippe Dargenton per Invicta. Realizzata al 100% in ghisa massiccia (164 kg), eroga 10 kW con rendimento del 76 % e combustione prolungata fino a 8 ore.', 'Disegnata dal designer Jean-Philippe Dargenton per le fonderie francesi Invicta, la stufa a legna Ove trasforma il focolare domestico in una vera scultura contemporanea. La sua silhouette ovoidale nervata (H 1310 × L 550 × P 550 mm) occupa una pianta circolare compatta di soli 55 cm, rendendola ideale sia a parete sia al centro della zona living.

Fusa interamente in ghisa massiccia da 164 kg, sviluppa una potenza nominale di 10 kW capace di climatizzare ampi volumi con un rendimento del 76 %. La camera di combustione slanciata accoglie ceppi posizionati in verticale da 33 fino a 50 cm e consente un’autonomia in combustione prolungata fino a 8 ore.', 'Stufa di design in ghisa su bancale protetto (164 kg)', 'Consegna in 6–10 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-ove-design-10-kw'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000010-0000-4000-8000-000000000101', p.id, 'BRV-INV-OVE-10', 'Stufa Invicta Ove 10 kW – Ghisa Antracite', 890, 25
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-ove-design-10-kw'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-fonte-invicta-ove-design-10-kw-1.jpg', 'Stufa a legna in ghisa Invicta Ove Design – 10 kW', 1, true
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-ove-design-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-fonte-invicta-ove-design-10-kw-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-fonte-invicta-ove-design-10-kw-2.jpg', 'Stufa a legna in ghisa Invicta Ove Design – 10 kW', 2, false
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-ove-design-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-fonte-invicta-ove-design-10-kw-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-fonte-invicta-ove-design-10-kw-3.jpg', 'Stufa a legna in ghisa Invicta Ove Design – 10 kW', 3, false
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-ove-design-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-fonte-invicta-ove-design-10-kw-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-fonte-invicta-ove-design-10-kw-4.jpg', 'Stufa a legna in ghisa Invicta Ove Design – 10 kW', 4, false
from public.braviko_products p where p.slug = 'poele-bois-fonte-invicta-ove-design-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-fonte-invicta-ove-design-10-kw-4.jpg');

insert into public.braviko_categories (slug, name) values ('poeles-a-bois', 'poeles-a-bois') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000011-0000-4000-8000-000000000011', 'poele-bois-four-fonte-bronpi-tudela-9-kw', 'published', false, 33, c.id
from public.braviko_categories c where c.slug = 'poeles-a-bois'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Stufa a legna con forno superiore Bronpi Tudela – 9 kW', 'Stufa a legna multifunzione con forno di cottura superiore avvolgente da 500 mm dotato di termometro integrato e vassoio in acciaio inox. Potenza 9 kW (225 m³), rendimento dell’82 % in Classe A+, struttura in acciaio con porta e griglia in ghisa.', 'La Bronpi Tudela da 9 kW unisce il piacere di una stufa a legna ad alto rendimento (82 %, Classe energetica A+) alla praticità di un vero forno superiore da 500 mm di larghezza alimentato direttamente dal giro fumi del focolare. Il forno è equipaggiato di serie con termometro su vetro per monitorare la temperatura interna e vassoio in acciaio inox per arrosti, pizze, pane, lasagne e castagne senza consumare elettricità o gas.

Realizzata con corpo in acciaio ad alto spessore e porta, griglia focolare e piano superiore in ghisa, presenta una profondità contenuta di soli 38,5 cm (H 800 × L 586 × P 385 mm, peso 94 kg) pur ospitando ceppi lunghi fino a 47 cm.', 'Stufa a legna con forno su bancale protetto (94 kg)', 'Consegna in 6–10 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'poele-bois-four-fonte-bronpi-tudela-9-kw'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000011-0000-4000-8000-000000000101', p.id, 'BRV-BRO-TUDELA-9', 'Stufa con forno Bronpi Tudela 9 kW – Antracite', 849, 25
from public.braviko_products p where p.slug = 'poele-bois-four-fonte-bronpi-tudela-9-kw'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-four-fonte-bronpi-tudela-9-kw-1.jpg', 'Stufa a legna con forno superiore Bronpi Tudela – 9 kW', 1, true
from public.braviko_products p where p.slug = 'poele-bois-four-fonte-bronpi-tudela-9-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-four-fonte-bronpi-tudela-9-kw-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-four-fonte-bronpi-tudela-9-kw-2.jpg', 'Stufa a legna con forno superiore Bronpi Tudela – 9 kW', 2, false
from public.braviko_products p where p.slug = 'poele-bois-four-fonte-bronpi-tudela-9-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-four-fonte-bronpi-tudela-9-kw-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-four-fonte-bronpi-tudela-9-kw-3.jpg', 'Stufa a legna con forno superiore Bronpi Tudela – 9 kW', 3, false
from public.braviko_products p where p.slug = 'poele-bois-four-fonte-bronpi-tudela-9-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-four-fonte-bronpi-tudela-9-kw-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-bois-four-fonte-bronpi-tudela-9-kw-4.jpg', 'Stufa a legna con forno superiore Bronpi Tudela – 9 kW', 4, false
from public.braviko_products p where p.slug = 'poele-bois-four-fonte-bronpi-tudela-9-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-bois-four-fonte-bronpi-tudela-9-kw-4.jpg');

insert into public.braviko_categories (slug, name) values ('poeles-a-granules', 'poeles-a-granules') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000012-0000-4000-8000-000000000012', 'poele-granules-la-nordica-extraflame-teorema-10-kw', 'published', true, 34, c.id
from public.braviko_categories c where c.slug = 'poeles-a-granules'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Stufa a pellet ventilata La Nordica Extraflame Teorema – 10 kW', 'Stufa a pellet ventilata d’eccellenza italiana La Nordica-Extraflame con porta fuoco e braciere in ghisa, potenza termica modulabile 3,1–10,1 kW (fino a 287 m³ / 110 m²), rendimento del 91,7 % e serbatoio extra-capiente da 25 kg per un’autonomia fino a 31 ore.', 'Progettata e prodotta in Italia dal gruppo La Nordica-Extraflame, la stufa a pellet Teorema da 10 kW è pensata per chi desidera riscaldare superfici importanti (fino a 287 m³ / circa 110 m²) con la massima continuità di esercizio. Il grande serbatoio integrato da 25 kg accoglie oltre un sacco e mezzo di pellet garantendo fino a 31 ore di funzionamento continuo senza rabbocchi.

La porta fuoco, il focolare e il braciere in ghisa ad alto spessore assicurano silenziosità, stabilità termica e lunga durata nel tempo, mentre la ventilazione ambiente frontale con funzione Comfort distribuisce rapidamente il calore con un rendimento certificato del 91,7 %. Completa di cronotermostato settimanale su 4 fasce giornaliere, telecomando IR e certificazione ambientale Classe A+ / 5 Stelle Aria Pulita.', 'Stufa a pellet su bancale rinforzato (139 kg)', 'Consegna in 6–10 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'poele-granules-la-nordica-extraflame-teorema-10-kw'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000012-0000-4000-8000-000000000101', p.id, 'BRV-EXT-TEOREMA-N', 'Finitura Nero Opaco – 10 kW', 1190, 25
from public.braviko_products p where p.slug = 'poele-granules-la-nordica-extraflame-teorema-10-kw'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000012-0000-4000-8000-000000000102', p.id, 'BRV-EXT-TEOREMA-B', 'Finitura Bordeaux – 10 kW', 1230, 25
from public.braviko_products p where p.slug = 'poele-granules-la-nordica-extraflame-teorema-10-kw'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-granules-la-nordica-extraflame-teorema-10-kw-1.jpg', 'Stufa a pellet ventilata La Nordica Extraflame Teorema – 10 kW', 1, true
from public.braviko_products p where p.slug = 'poele-granules-la-nordica-extraflame-teorema-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-granules-la-nordica-extraflame-teorema-10-kw-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-granules-la-nordica-extraflame-teorema-10-kw-2.jpg', 'Stufa a pellet ventilata La Nordica Extraflame Teorema – 10 kW', 2, false
from public.braviko_products p where p.slug = 'poele-granules-la-nordica-extraflame-teorema-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-granules-la-nordica-extraflame-teorema-10-kw-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-granules-la-nordica-extraflame-teorema-10-kw-3.jpg', 'Stufa a pellet ventilata La Nordica Extraflame Teorema – 10 kW', 3, false
from public.braviko_products p where p.slug = 'poele-granules-la-nordica-extraflame-teorema-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-granules-la-nordica-extraflame-teorema-10-kw-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-granules-la-nordica-extraflame-teorema-10-kw-4.jpg', 'Stufa a pellet ventilata La Nordica Extraflame Teorema – 10 kW', 4, false
from public.braviko_products p where p.slug = 'poele-granules-la-nordica-extraflame-teorema-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-granules-la-nordica-extraflame-teorema-10-kw-4.jpg');

insert into public.braviko_categories (slug, name) values ('poeles-a-granules', 'poeles-a-granules') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000013-0000-4000-8000-000000000013', 'poele-granules-slim-eva-calor-slimmy-9-kw', 'published', false, 35, c.id
from public.braviko_categories c where c.slug = 'poeles-a-granules'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Stufa a pellet salvaspazio Eva Calor Slimmy – 9 kW Ultra-Sottile', 'Stufa a pellet ultra-sottile salvaspazio con profondità di soli 26,1 cm, ideale per corridoi, disimpegni e stanze strette. Potenza nominale di 8,0 kW (massima 9,0 kW per riscaldare fino a 200 m³) e rendimento del 90,1 % in Classe A+.', 'Progettata per offrire una potenza termica generosa anche dove lo spazio a parete è ridotto al minimo, la stufa a pellet Eva Calor Slimmy si distingue per un profilo ultra-piatto da soli 26,1 cm di profondità. Si installa comodamente in corridoi, ingressi o zone giorno compatte senza ostacolare il passaggio, grazie alla possibilità di configurare lo scarico fumi da Ø 80 mm sia superiormente sia posteriormente.

La camera di combustione in acciaio ad alto spessore con braciere in acciaio inox garantisce affidabilità e pulizia rapida, portando il rendimento fino al 90,1 % su 5 livelli di potenza selezionabili. Con una potenza nominale di 8,0 kW (9,0 kW massimi) riscalda agevolmente volumi fino a 200 m³, mentre il serbatoio integrato da 13,5 kg assicura un’ampia autonomia giornaliera.', 'Stufa a pellet salvaspazio su bancale protetto (82 kg)', 'Consegna in 6–10 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'poele-granules-slim-eva-calor-slimmy-9-kw'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000013-0000-4000-8000-000000000101', p.id, 'BRV-EVA-SLIMMY-N', 'Nero Goffrato – Profondità 26 cm – 9 kW', 980, 25
from public.braviko_products p where p.slug = 'poele-granules-slim-eva-calor-slimmy-9-kw'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000013-0000-4000-8000-000000000102', p.id, 'BRV-EVA-SLIMMY-B', 'Bianco Perla – Profondità 26 cm – 9 kW', 999, 25
from public.braviko_products p where p.slug = 'poele-granules-slim-eva-calor-slimmy-9-kw'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-granules-slim-eva-calor-slimmy-9-kw-1.jpg', 'Stufa a pellet salvaspazio Eva Calor Slimmy – 9 kW Ultra-Sottile', 1, true
from public.braviko_products p where p.slug = 'poele-granules-slim-eva-calor-slimmy-9-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-granules-slim-eva-calor-slimmy-9-kw-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-granules-slim-eva-calor-slimmy-9-kw-2.jpg', 'Stufa a pellet salvaspazio Eva Calor Slimmy – 9 kW Ultra-Sottile', 2, false
from public.braviko_products p where p.slug = 'poele-granules-slim-eva-calor-slimmy-9-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-granules-slim-eva-calor-slimmy-9-kw-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-granules-slim-eva-calor-slimmy-9-kw-3.jpg', 'Stufa a pellet salvaspazio Eva Calor Slimmy – 9 kW Ultra-Sottile', 3, false
from public.braviko_products p where p.slug = 'poele-granules-slim-eva-calor-slimmy-9-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-granules-slim-eva-calor-slimmy-9-kw-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/poele-granules-slim-eva-calor-slimmy-9-kw-4.jpg', 'Stufa a pellet salvaspazio Eva Calor Slimmy – 9 kW Ultra-Sottile', 4, false
from public.braviko_products p where p.slug = 'poele-granules-slim-eva-calor-slimmy-9-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/poele-granules-slim-eva-calor-slimmy-9-kw-4.jpg');

insert into public.braviko_categories (slug, name) values ('inserts-cheminees', 'inserts-cheminees') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000014-0000-4000-8000-000000000014', 'insert-granules-canalisable-extraflame-comfort-p70-air-10-kw', 'published', true, 36, c.id
from public.braviko_categories c where c.slug = 'inserts-cheminees'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Inserto a pellet canalizzabile Extraflame Comfort P70 Air – 10 kW', 'Inserto a pellet estraibile su guide con focolare e braciere in ghisa per riqualificare camini aperti esistenti. Potenza 3,0–10,0 kW (fino a 287 m³), doppia ventilazione con canalizzazione fino a 8 metri, cassetto pellet frontale e radiocomando termostatico.', 'L’inserto a pellet canalizzabile Extraflame Comfort P70 Air è progettato per trasformare un vecchio camino aperto poco efficiente in un vero impianto di riscaldamento automatizzato ad altissima resa (90,9 %). Montato su robuste guide scorrevoli per facilitare le operazioni di ispezione e manutenzione straordinaria, integra un pratico cassetto frontale che consente di caricare i 15 kg di pellet senza dover estrarre il corpo macchina.

Il focolare interamente in ghisa e il braciere in ghisa pesante assicurano longevità e ottima diffusione termica. Grazie alla doppia ventilazione indipendente — un ventilatore ambiente frontale e un motore dedicato alla canalizzazione fino a 8 metri — permette di riscaldare fino a 287 m³ distribuendo l’aria calda anche in una stanza adiacente o al piano superiore. Il radiocomando retroilluminato con funzione termostato ambiente è incluso di serie.', 'Inserto a pellet in ghisa su bancale rinforzato (136 kg)', 'Consegna in 6–10 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'insert-granules-canalisable-extraflame-comfort-p70-air-10-kw'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000014-0000-4000-8000-000000000101', p.id, 'BRV-EXT-P70-10', 'Inserto a pellet estraibile 10 kW – Vetro Nero', 1390, 25
from public.braviko_products p where p.slug = 'insert-granules-canalisable-extraflame-comfort-p70-air-10-kw'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/insert-granules-canalisable-extraflame-comfort-p70-air-10-kw-1.jpg', 'Inserto a pellet canalizzabile Extraflame Comfort P70 Air – 10 kW', 1, true
from public.braviko_products p where p.slug = 'insert-granules-canalisable-extraflame-comfort-p70-air-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/insert-granules-canalisable-extraflame-comfort-p70-air-10-kw-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/insert-granules-canalisable-extraflame-comfort-p70-air-10-kw-2.jpg', 'Inserto a pellet canalizzabile Extraflame Comfort P70 Air – 10 kW', 2, false
from public.braviko_products p where p.slug = 'insert-granules-canalisable-extraflame-comfort-p70-air-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/insert-granules-canalisable-extraflame-comfort-p70-air-10-kw-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/insert-granules-canalisable-extraflame-comfort-p70-air-10-kw-3.jpg', 'Inserto a pellet canalizzabile Extraflame Comfort P70 Air – 10 kW', 3, false
from public.braviko_products p where p.slug = 'insert-granules-canalisable-extraflame-comfort-p70-air-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/insert-granules-canalisable-extraflame-comfort-p70-air-10-kw-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/insert-granules-canalisable-extraflame-comfort-p70-air-10-kw-4.jpg', 'Inserto a pellet canalizzabile Extraflame Comfort P70 Air – 10 kW', 4, false
from public.braviko_products p where p.slug = 'insert-granules-canalisable-extraflame-comfort-p70-air-10-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/insert-granules-canalisable-extraflame-comfort-p70-air-10-kw-4.jpg');

insert into public.braviko_categories (slug, name) values ('chauffage-electrique-interieur', 'chauffage-electrique-interieur') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000015-0000-4000-8000-000000000015', 'radiateur-electrique-inertie-fonte-sauter-bolero-2000w', 'published', false, 37, c.id
from public.braviko_categories c where c.slug = 'chauffage-electrique-interieur'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Radiatore elettrico a inerzia in ghisa Sauter Boléro – 2000 W Connesso', 'Radiatore elettrico connesso a doppio elemento riscaldante (cuore in ghisa ad alta inerzia + facciata riscaldante reattiva) da 2000 W per ambienti fino a 22–25 m². Sensori automatici di presenza e finestra aperta, programmazione settimanale e gestione via app Cozytouch.', 'Il radiatore elettrico Sauter Boléro da 2000 W rappresenta il vertice del comfort termico domestico grazie alla tecnologia a doppio corpo riscaldante: la facciata radiante ultra-reattiva innalza rapidamente la temperatura percepita appena si entra nella stanza, mentre il massiccio cuore in ghisa accumula il calore e lo rilascia in modo dolce, omogeneo e prolungato senza seccare l’aria.

Ideale per soggiorni, saloni e grandi camere fino a 22–25 m², integra sensori intelligenti di presenza e di apertura finestre che adattano automaticamente i consumi alle abitudini quotidiane. Compatibile con l’ecosistema Sauter Cozytouch per il controllo da smartphone e l’abbinamento in coppia con altri radiatori della stessa zona, offre protezione IP24 Classe II e una linea orizzontale elegante disponibile in Bianco Satinato o Grigio Antracite.', 'Imballo rinforzato con staffa a parete e dima di foratura (27,5 kg)', 'Consegna in 4–7 giorni lavorativi con corriere espresso'
from public.braviko_products p where p.slug = 'radiateur-electrique-inertie-fonte-sauter-bolero-2000w'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000015-0000-4000-8000-000000000101', p.id, 'BRV-SAU-BOLERO-2000B', 'Orizzontale 2000 W – Bianco Satinato', 549, 25
from public.braviko_products p where p.slug = 'radiateur-electrique-inertie-fonte-sauter-bolero-2000w'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000015-0000-4000-8000-000000000102', p.id, 'BRV-SAU-BOLERO-2000A', 'Orizzontale 2000 W – Grigio Antracite', 569, 25
from public.braviko_products p where p.slug = 'radiateur-electrique-inertie-fonte-sauter-bolero-2000w'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/radiateur-electrique-inertie-fonte-sauter-bolero-2000w-1.jpg', 'Radiatore elettrico a inerzia in ghisa Sauter Boléro – 2000 W Connesso', 1, true
from public.braviko_products p where p.slug = 'radiateur-electrique-inertie-fonte-sauter-bolero-2000w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/radiateur-electrique-inertie-fonte-sauter-bolero-2000w-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/radiateur-electrique-inertie-fonte-sauter-bolero-2000w-2.jpg', 'Radiatore elettrico a inerzia in ghisa Sauter Boléro – 2000 W Connesso', 2, false
from public.braviko_products p where p.slug = 'radiateur-electrique-inertie-fonte-sauter-bolero-2000w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/radiateur-electrique-inertie-fonte-sauter-bolero-2000w-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/radiateur-electrique-inertie-fonte-sauter-bolero-2000w-3.jpg', 'Radiatore elettrico a inerzia in ghisa Sauter Boléro – 2000 W Connesso', 3, false
from public.braviko_products p where p.slug = 'radiateur-electrique-inertie-fonte-sauter-bolero-2000w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/radiateur-electrique-inertie-fonte-sauter-bolero-2000w-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/radiateur-electrique-inertie-fonte-sauter-bolero-2000w-4.jpg', 'Radiatore elettrico a inerzia in ghisa Sauter Boléro – 2000 W Connesso', 4, false
from public.braviko_products p where p.slug = 'radiateur-electrique-inertie-fonte-sauter-bolero-2000w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/radiateur-electrique-inertie-fonte-sauter-bolero-2000w-4.jpg');

insert into public.braviko_categories (slug, name) values ('braseros-cuisson-exterieure', 'braseros-cuisson-exterieure') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000016-0000-4000-8000-000000000016', 'brasero-plancha-ofyr-classic-100-acier-corten', 'published', true, 38, c.id
from public.braviko_categories c where c.slug = 'braseros-cuisson-exterieure'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Braciere Plancha OFYR Classic 100 in Acciaio Corten – Ø 100 cm', 'L’iconico braciere conico OFYR Classic 100 su piedistallo chiuso in acciaio Corten con piastra di cottura circolare in acciaio nero al carbonio da 12 mm (Ø 100 cm). Superficie di cottura da 0,55 m² per 15–20 coperti, progettato per restare all’aperto tutto l’anno.', 'Vero simbolo della cucina conviviale all’aperto, l’OFYR Classic 100 trasforma ogni grigliata in un momento condiviso attorno al fuoco. La sua scultura geometrica abbina un piedistallo chiuso in acciaio Corten (50 × 50 × 73 cm) a un cono focolare da Ø 95 cm sormontato dalla massiccia piastra circolare in acciaio nero al carbonio spessa 12 mm (diametro 100 cm, peso della sola piastra 55 kg).

Il calore irradiato dal fuoco a legna centrale crea un gradiente termico naturale lungo i 0,55 m² di superficie utile: più intenso verso il bordo interno per rosolare tagli di carne e pesce, più dolce verso l’esterno per cuocere lentamente verdure, uova o mantenere in caldo le portate per 15–20 ospiti. L’acciaio Corten autopatinante resiste agli agenti atmosferici 365 giorni l’anno senza necessità di copertura.', 'Spedizione su bancale in 3 elementi separati (Piedistallo + Cono + Piastra, 103 kg)', 'Consegna in 6–10 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-100-acier-corten'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000016-0000-4000-8000-000000000101', p.id, 'BRV-OFYR-CLASSIC-100', 'OFYR Classic 100 Corten – Piastra Ø 100 cm', 1490, 25
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-100-acier-corten'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-plancha-ofyr-classic-100-acier-corten-1.jpg', 'Braciere Plancha OFYR Classic 100 in Acciaio Corten – Ø 100 cm', 1, true
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-100-acier-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-plancha-ofyr-classic-100-acier-corten-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-plancha-ofyr-classic-100-acier-corten-2.jpg', 'Braciere Plancha OFYR Classic 100 in Acciaio Corten – Ø 100 cm', 2, false
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-100-acier-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-plancha-ofyr-classic-100-acier-corten-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-plancha-ofyr-classic-100-acier-corten-3.jpg', 'Braciere Plancha OFYR Classic 100 in Acciaio Corten – Ø 100 cm', 3, false
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-100-acier-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-plancha-ofyr-classic-100-acier-corten-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-plancha-ofyr-classic-100-acier-corten-4.jpg', 'Braciere Plancha OFYR Classic 100 in Acciaio Corten – Ø 100 cm', 4, false
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-100-acier-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-plancha-ofyr-classic-100-acier-corten-4.jpg');

insert into public.braviko_categories (slug, name) values ('braseros-cuisson-exterieure', 'braseros-cuisson-exterieure') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000017-0000-4000-8000-000000000017', 'brasero-plancha-ofyr-classic-storage-100-corten', 'published', false, 39, c.id
from public.braviko_categories c where c.slug = 'braseros-cuisson-exterieure'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Braciere Plancha con Portalegna OFYR Classic Storage 100 Corten', 'Versione con base portalegna integrata da 0,3 m³ dell’iconico OFYR 100 in acciaio Corten e piastra circolare in acciaio nero da 12 mm (Ø 100 cm).', 'L’OFYR Classic Storage 100 Corten unisce la scultura conviviale del celebre braciere olandese a una pratica base con vano portalegna integrato da 0,3 m³. La struttura in acciaio Corten ad alta resistenza agli agenti atmosferici ospita direttamente sotto al cono una scorta completa di ceppi da 33 cm, sempre ordinati e a portata di mano durante la cottura.

La piastra circolare di cottura in acciaio al carbonio nero da 12 mm di spessore (diametro 100 cm) accumula il calore del fuoco a legna e crea zone termiche differenziate, permettendo di rosolare tagli di carne, pesce, verdure e contorni contemporaneamente per 10–12 commensali.', 'In 3 elementi su bancale (base portalegna, cono, piastra Ø 100 cm)', 'Consegna su bancale in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-storage-100-corten'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000017-0000-4000-8000-000000000101', p.id, 'BRV-OFYR-STORAGE-100', 'OFYR Classic Storage 100 Corten – Ø 100 cm', 1690, 25
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-storage-100-corten'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-plancha-ofyr-classic-storage-100-corten-1.jpg', 'Braciere Plancha con Portalegna OFYR Classic Storage 100 Corten', 1, true
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-storage-100-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-plancha-ofyr-classic-storage-100-corten-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-plancha-ofyr-classic-storage-100-corten-2.jpg', 'Braciere Plancha con Portalegna OFYR Classic Storage 100 Corten', 2, false
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-storage-100-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-plancha-ofyr-classic-storage-100-corten-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-plancha-ofyr-classic-storage-100-corten-3.jpg', 'Braciere Plancha con Portalegna OFYR Classic Storage 100 Corten', 3, false
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-storage-100-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-plancha-ofyr-classic-storage-100-corten-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-plancha-ofyr-classic-storage-100-corten-4.jpg', 'Braciere Plancha con Portalegna OFYR Classic Storage 100 Corten', 4, false
from public.braviko_products p where p.slug = 'brasero-plancha-ofyr-classic-storage-100-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-plancha-ofyr-classic-storage-100-corten-4.jpg');

insert into public.braviko_categories (slug, name) values ('cuisine-au-feu', 'cuisine-au-feu') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000018-0000-4000-8000-000000000018', 'four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze', 'published', true, 40, c.id
from public.braviko_categories c where c.slug = 'cuisine-au-feu'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Forno per pizza a legna da esterno Alfa Forni Moderno 2 Pizze', 'Forno a legna da giardino prodotto in Italia da Alfa Forni con tecnologia Heat Genius™, piano cottura in mattoni refrattari HeatKeeper™ da 70 × 40 cm e volta in acciaio inox coibentata.', 'Progettato e costruito interamente in Italia da Alfa Forni, il modello Moderno 2 Pizze porta in giardino o in terrazza le prestazioni di una vera pizzeria napoletana. Grazie alla tecnologia brevettata Heat Genius™, il forno raggiunge i 500 °C in soli 30 minuti e cuoce 2 pizze contemporaneamente in 90 secondi con consumi di legna ridotti.

Il piano di cottura in mattoni refrattari ad alta densità HeatKeeper™ (70 × 40 cm) assorbe e rilascia il calore in modo progressivo per una base croccante e mai bruciata, mentre la cupola in acciaio inox rinforzato con doppio strato di isolamento in fibra ceramica DoubleDown Ceramic Superwool® mantiene il calore all’interno e la scocca esterna sicura.', 'Imballo protetto su bancale con canna fumaria e cappello inox inclusi', 'Consegna su bancale in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000018-0000-4000-8000-000000000101', p.id, 'BRV-ALFA-2P-AR', 'Colore Ardesia Black – Top da appoggio', 1290, 25
from public.braviko_products p where p.slug = 'four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000018-0000-4000-8000-000000000102', p.id, 'BRV-ALFA-2P-RU', 'Colore Antique Red – Con base su ruote', 1590, 25
from public.braviko_products p where p.slug = 'four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze-1.jpg', 'Forno per pizza a legna da esterno Alfa Forni Moderno 2 Pizze', 1, true
from public.braviko_products p where p.slug = 'four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze-2.jpg', 'Forno per pizza a legna da esterno Alfa Forni Moderno 2 Pizze', 2, false
from public.braviko_products p where p.slug = 'four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze-3.jpg', 'Forno per pizza a legna da esterno Alfa Forni Moderno 2 Pizze', 3, false
from public.braviko_products p where p.slug = 'four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze-4.jpg', 'Forno per pizza a legna da esterno Alfa Forni Moderno 2 Pizze', 4, false
from public.braviko_products p where p.slug = 'four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/four-pizza-bois-exterieur-alfa-forni-moderno-2-pizze-4.jpg');

insert into public.braviko_categories (slug, name) values ('barbecues-cuisine-exterieure', 'barbecues-cuisine-exterieure') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000019-0000-4000-8000-000000000019', 'barbecue-kamado-monolith-classic-pro-serie-2-ceramique', 'published', false, 41, c.id
from public.braviko_categories c where c.slug = 'barbecues-cuisine-exterieure'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Barbecue Kamado Monolith Classic Pro Serie 2.0 – Ø 46 cm con Carrello', 'Kamado in ceramica ai silicati ad altissima ritenzione termica con sistema Smart Grid Pro 2.0 a 4 mezze griglie inox, sportellino frontale per affumicatura e carrello con ripiani in bambù.', 'Il Monolith Classic Pro Serie 2.0 rappresenta il riferimento assoluto tra i barbecue Kamado in ceramica. La scocca in ceramica pesante ai silicati e il braciere segmentato a 5 elementi garantiscono una stabilità termica straordinaria da 70 °C fino a 400 °C, consentendo di grigliare direttamente, cuocere in low & slow per oltre 20 ore con un solo carico di carbone, affumicare o panificare.

La Serie Pro 2.0 introduce la nuova cerniera a sollevamento assistito, la guarnizione indistruttibile in acciaio inox e fibra di vetro, la valvola superiore orientabile che non si sposta aprendo il coperchio e l’esclusivo sportellino frontale brevettato per inserire le chips di legno d’affumicatura direttamente sulle braci senza mai sollevare la cupola.', 'Consegnato su bancale con carrello, ripiani in bambù e Smart Grid System Pro 2.0 completo', 'Consegna su bancale in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'barbecue-kamado-monolith-classic-pro-serie-2-ceramique'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000019-0000-4000-8000-000000000101', p.id, 'BRV-MONO-CLASSIC-N', 'Monolith Classic Pro 2.0 Nero con carrello e ripiani bambù', 1150, 25
from public.braviko_products p where p.slug = 'barbecue-kamado-monolith-classic-pro-serie-2-ceramique'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/barbecue-kamado-monolith-classic-pro-serie-2-ceramique-1.jpg', 'Barbecue Kamado Monolith Classic Pro Serie 2.0 – Ø 46 cm con Carrello', 1, true
from public.braviko_products p where p.slug = 'barbecue-kamado-monolith-classic-pro-serie-2-ceramique'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/barbecue-kamado-monolith-classic-pro-serie-2-ceramique-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/barbecue-kamado-monolith-classic-pro-serie-2-ceramique-2.jpg', 'Barbecue Kamado Monolith Classic Pro Serie 2.0 – Ø 46 cm con Carrello', 2, false
from public.braviko_products p where p.slug = 'barbecue-kamado-monolith-classic-pro-serie-2-ceramique'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/barbecue-kamado-monolith-classic-pro-serie-2-ceramique-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/barbecue-kamado-monolith-classic-pro-serie-2-ceramique-3.jpg', 'Barbecue Kamado Monolith Classic Pro Serie 2.0 – Ø 46 cm con Carrello', 3, false
from public.braviko_products p where p.slug = 'barbecue-kamado-monolith-classic-pro-serie-2-ceramique'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/barbecue-kamado-monolith-classic-pro-serie-2-ceramique-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/barbecue-kamado-monolith-classic-pro-serie-2-ceramique-4.jpg', 'Barbecue Kamado Monolith Classic Pro Serie 2.0 – Ø 46 cm con Carrello', 4, false
from public.braviko_products p where p.slug = 'barbecue-kamado-monolith-classic-pro-serie-2-ceramique'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/barbecue-kamado-monolith-classic-pro-serie-2-ceramique-4.jpg');

insert into public.braviko_categories (slug, name) values ('chauffage-exterieur', 'chauffage-exterieur') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000020-0000-4000-8000-000000000020', 'chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw', 'published', false, 42, c.id
from public.braviko_categories c where c.slug = 'chauffage-exterieur'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Riscaldatore da esterno a gas piramidale Favex Santorini Inox – 13 kW', 'Riscaldatore piramidale a fiamma visibile in tubo centrale di vetro borosilicato, struttura in acciaio inox spazzolato e alluminio, potenza regolabile da 5 a 13 kW per riscaldare fino a 25 m².', 'Il riscaldatore piramidale a gas Favex Santorini Inox da 13 kW trasforma terrazze, porticati, giardini e dehors in ambienti caldi e accoglienti dalla primavera all’autunno inoltrato. La lunga colonna di fiamma viva racchiusa nel tubo centrale in vetro borosilicato diffonde una luce dorata suggestiva e un irraggiamento termico immediato a 360°.

Realizzato in acciaio inox spazzolato e alluminio resistente alla corrosione, integra nella base chiusa l’alloggiamento per una bombola standard fino a 13 kg (propano o butano). La manopola con accensione piezoelettrica consente di modulare la potenza da 5 a 13 kW in base alla temperatura esterna, mentre il sensore antiribaltamento e la termocoppia interrompono automaticamente il gas in caso di spegnimento della fiamma o urto.', 'Collo rinforzato con kit ruote, griglie protettive inox e tubo in vetro borosilicato protetto', 'Consegna tramite corriere espresso in 3–5 giorni lavorativi'
from public.braviko_products p where p.slug = 'chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000020-0000-4000-8000-000000000101', p.id, 'BRV-FAV-SANTORINI-13', 'Piramide Favex Santorini 13 kW – Acciaio Inox', 389, 25
from public.braviko_products p where p.slug = 'chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw-1.jpg', 'Riscaldatore da esterno a gas piramidale Favex Santorini Inox – 13 kW', 1, true
from public.braviko_products p where p.slug = 'chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw-2.jpg', 'Riscaldatore da esterno a gas piramidale Favex Santorini Inox – 13 kW', 2, false
from public.braviko_products p where p.slug = 'chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw-3.jpg', 'Riscaldatore da esterno a gas piramidale Favex Santorini Inox – 13 kW', 3, false
from public.braviko_products p where p.slug = 'chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw-4.jpg', 'Riscaldatore da esterno a gas piramidale Favex Santorini Inox – 13 kW', 4, false
from public.braviko_products p where p.slug = 'chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/chauffage-exterieur-gaz-pyramide-favex-santorini-inox-13-kw-4.jpg');

insert into public.braviko_categories (slug, name) values ('chauffage-exterieur', 'chauffage-exterieur') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000021-0000-4000-8000-000000000021', 'brasero-bioethanol-exterieur-planika-cabo-corten', 'published', false, 43, c.id
from public.braviko_categories c where c.slug = 'chauffage-exterieur'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Braciere da esterno a bioetanolo Planika Cabo Corten – Portatile IP65', 'Camino da tavolo e pavimento a bioetanolo con tecnologia brevettata Commerce™ (fibra ceramica assorbente anti-sversamento), cilindro paravento in vetro borosilicato e base in acciaio Corten. Potenza termica 2,5 kW e fino a 7 ore di autonomia senza fumo, odore né cenere.', 'Il braciere a bioetanolo Planika Cabo Corten unisce il fascino materico dell’acciaio Corten pre-ossidato alla sicurezza della tecnologia brevettata Commerce™. Il cuore del bruciatore è riempito con fibre ceramiche ad alta densità che trattengono il bioetanolo liquido all’interno del serbatoio da 3 litri, impedendo qualsiasi fuoriuscita accidentale di combustibile anche in caso di urto o ribaltamento.

Racchiusa da un robusto cilindro paravento in vetro borosilicato temperato, la fiamma danza stabile anche nelle serate ventilate, sprigionando una potenza termica fino a 2,5 kW con un’autonomia fino a 7 ore consecutive. Senza canna fumaria, senza cavi elettrici e completamente privo di fumo, odori o cenere, può essere posizionato liberamente su terrazze esterne, bordi piscina, verande coperte o tavoli lounge.', 'Imballo rinforzato con bruciatore Commerce™, cilindro in vetro e spegnifiamma (13,5 kg)', 'Consegna rapida in 4–6 giorni lavorativi con corriere espresso'
from public.braviko_products p where p.slug = 'brasero-bioethanol-exterieur-planika-cabo-corten'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000021-0000-4000-8000-000000000101', p.id, 'BRV-PLA-CABO-CORTEN', 'Planika Cabo – Acciaio Corten & Vetro Cilindrico', 690, 25
from public.braviko_products p where p.slug = 'brasero-bioethanol-exterieur-planika-cabo-corten'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-bioethanol-exterieur-planika-cabo-corten-1.jpg', 'Braciere da esterno a bioetanolo Planika Cabo Corten – Portatile IP65', 1, true
from public.braviko_products p where p.slug = 'brasero-bioethanol-exterieur-planika-cabo-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-bioethanol-exterieur-planika-cabo-corten-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-bioethanol-exterieur-planika-cabo-corten-2.jpg', 'Braciere da esterno a bioetanolo Planika Cabo Corten – Portatile IP65', 2, false
from public.braviko_products p where p.slug = 'brasero-bioethanol-exterieur-planika-cabo-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-bioethanol-exterieur-planika-cabo-corten-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-bioethanol-exterieur-planika-cabo-corten-3.jpg', 'Braciere da esterno a bioetanolo Planika Cabo Corten – Portatile IP65', 3, false
from public.braviko_products p where p.slug = 'brasero-bioethanol-exterieur-planika-cabo-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-bioethanol-exterieur-planika-cabo-corten-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/brasero-bioethanol-exterieur-planika-cabo-corten-4.jpg', 'Braciere da esterno a bioetanolo Planika Cabo Corten – Portatile IP65', 4, false
from public.braviko_products p where p.slug = 'brasero-bioethanol-exterieur-planika-cabo-corten'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/brasero-bioethanol-exterieur-planika-cabo-corten-4.jpg');

insert into public.braviko_categories (slug, name) values ('chauffage-exterieur', 'chauffage-exterieur') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000022-0000-4000-8000-000000000022', 'chauffage-infrarouge-mural-frico-infraluna-ip65-3000w', 'published', false, 44, c.id
from public.braviko_categories c where c.slug = 'chauffage-exterieur'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Riscaldatore a infrarossi da parete Frico Infraluna IP65 – 3000 W con Telecomando', 'Lampada riscaldante a infrarossi a onda corta da 3000 W con bulbo alogeno Gold low-glare anti-abbagliamento, 3 livelli di potenza regolabili da telecomando (1000 / 2000 / 3000 W) e scocca in alluminio anodizzato nero certificata IP65 per coprire fino a 16–20 m² all’aperto.', 'Il riscaldatore a infrarossi Frico Infraluna IP65 da 3000 W è progettato per prolungare il piacere di vivere terrazze, pergole bioclimatiche, porticati e dehors in ogni stagione. Grazie alla tecnologia a infrarossi a onda corta IR-A, il calore si trasmette istantaneamente alle persone e alle superfici entro un’area di 16–20 m² fin dal primo secondo di accensione, senza disperdersi nell’aria circostante anche in presenza di vento.

Equipaggiato con lampada alogena Gold low-glare di ultima generazione, emette una morbida luce ambrata priva di fastidiosi riflessi rossi. Il telecomando incluso consente di selezionare comodamente 3 gradini di potenza (1000 W, 2000 W o 3000 W), mentre la scocca in alluminio anodizzato nero certificata IP65 resiste perfettamente a pioggia battente, polvere e corrosione.', 'Confezione singola con telecomando e staffa orientabile a parete/soffitto (3,8 kg)', 'Consegna rapida in 4–6 giorni lavorativi con corriere espresso'
from public.braviko_products p where p.slug = 'chauffage-infrarouge-mural-frico-infraluna-ip65-3000w'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000022-0000-4000-8000-000000000101', p.id, 'BRV-FRI-LUNA-3000', 'Frico Infraluna 3000 W – Nero Anodizzato con Telecomando', 349, 25
from public.braviko_products p where p.slug = 'chauffage-infrarouge-mural-frico-infraluna-ip65-3000w'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/chauffage-infrarouge-mural-frico-infraluna-ip65-3000w-1.jpg', 'Riscaldatore a infrarossi da parete Frico Infraluna IP65 – 3000 W con Telecomando', 1, true
from public.braviko_products p where p.slug = 'chauffage-infrarouge-mural-frico-infraluna-ip65-3000w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/chauffage-infrarouge-mural-frico-infraluna-ip65-3000w-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/chauffage-infrarouge-mural-frico-infraluna-ip65-3000w-2.jpg', 'Riscaldatore a infrarossi da parete Frico Infraluna IP65 – 3000 W con Telecomando', 2, false
from public.braviko_products p where p.slug = 'chauffage-infrarouge-mural-frico-infraluna-ip65-3000w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/chauffage-infrarouge-mural-frico-infraluna-ip65-3000w-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/chauffage-infrarouge-mural-frico-infraluna-ip65-3000w-3.jpg', 'Riscaldatore a infrarossi da parete Frico Infraluna IP65 – 3000 W con Telecomando', 3, false
from public.braviko_products p where p.slug = 'chauffage-infrarouge-mural-frico-infraluna-ip65-3000w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/chauffage-infrarouge-mural-frico-infraluna-ip65-3000w-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/chauffage-infrarouge-mural-frico-infraluna-ip65-3000w-4.jpg', 'Riscaldatore a infrarossi da parete Frico Infraluna IP65 – 3000 W con Telecomando', 4, false
from public.braviko_products p where p.slug = 'chauffage-infrarouge-mural-frico-infraluna-ip65-3000w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/chauffage-infrarouge-mural-frico-infraluna-ip65-3000w-4.jpg');

insert into public.braviko_categories (slug, name) values ('accessoires-chauffage', 'accessoires-chauffage') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000023-0000-4000-8000-000000000023', 'fendeur-buches-vertical-scheppach-hl1460-compact-14t', 'published', true, 45, c.id
from public.braviko_categories c where c.slug = 'accessoires-chauffage'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Spaccalegna verticale elettrico Scheppach HL1460 Compact – 14 Tonnellate', 'Spaccalegna idraulico verticale per uso forestale e domestico intensivo con spinta reale di 14 tonnellate e motore a induzione da 4100 W. Spacca tronchi fino a 104 cm di lunghezza e 40 cm di diametro grazie alla base a raso terra e al sollevatore laterale integrato.', 'Progettato per chi prepara ogni anno grandi volumi di legna da ardere (faggio, quercia, carpino, rovere), lo spaccalegna verticale Scheppach HL1460 Compact sviluppa una forza idraulica reale di 14 tonnellate azionata da un potente motore a induzione da 4100 W. La piastra di base ribassata a raso terra e il sollevatore laterale integrato permettono di raddrizzare e posizionare senza sforzo anche ceppi nodosi e pesanti fino a 104 cm di lunghezza e 40 cm di diametro.

La tecnologia brevettata Vario consente di regolare con precisione il finecorsa del cilindro idraulico in base alla lunghezza effettiva dei tronchi lavorati, risparmiando tempo prezioso ad ogni ciclo. La colonna in acciaio antitorsione verniciata a polvere, i bracci fermaceppo regolabili con comando bimanuale di sicurezza e le grandi ruote di movimentazione garantiscono stabilità e affidabilità stagione dopo stagione.', 'Spedito su bancale rinforzato preassemblato con olio idraulico (185 kg)', 'Consegna in 5–8 giorni lavorativi su appuntamento con sponda idraulica'
from public.braviko_products p where p.slug = 'fendeur-buches-vertical-scheppach-hl1460-compact-14t'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000023-0000-4000-8000-000000000101', p.id, 'BRV-SCH-HL1460-14T', 'Scheppach HL1460 – 14 Tonnellate – Carico a terra', 790, 25
from public.braviko_products p where p.slug = 'fendeur-buches-vertical-scheppach-hl1460-compact-14t'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/fendeur-buches-vertical-scheppach-hl1460-compact-14t-1.jpg', 'Spaccalegna verticale elettrico Scheppach HL1460 Compact – 14 Tonnellate', 1, true
from public.braviko_products p where p.slug = 'fendeur-buches-vertical-scheppach-hl1460-compact-14t'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/fendeur-buches-vertical-scheppach-hl1460-compact-14t-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/fendeur-buches-vertical-scheppach-hl1460-compact-14t-2.jpg', 'Spaccalegna verticale elettrico Scheppach HL1460 Compact – 14 Tonnellate', 2, false
from public.braviko_products p where p.slug = 'fendeur-buches-vertical-scheppach-hl1460-compact-14t'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/fendeur-buches-vertical-scheppach-hl1460-compact-14t-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/fendeur-buches-vertical-scheppach-hl1460-compact-14t-3.jpg', 'Spaccalegna verticale elettrico Scheppach HL1460 Compact – 14 Tonnellate', 3, false
from public.braviko_products p where p.slug = 'fendeur-buches-vertical-scheppach-hl1460-compact-14t'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/fendeur-buches-vertical-scheppach-hl1460-compact-14t-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/fendeur-buches-vertical-scheppach-hl1460-compact-14t-4.jpg', 'Spaccalegna verticale elettrico Scheppach HL1460 Compact – 14 Tonnellate', 4, false
from public.braviko_products p where p.slug = 'fendeur-buches-vertical-scheppach-hl1460-compact-14t'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/fendeur-buches-vertical-scheppach-hl1460-compact-14t-4.jpg');

insert into public.braviko_categories (slug, name) values ('accessoires-chauffage', 'accessoires-chauffage') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000024-0000-4000-8000-000000000024', 'fendeur-buches-horizontal-support-scheppach-hl760ls-7t', 'published', false, 46, c.id
from public.braviko_categories c where c.slug = 'accessoires-chauffage'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Spaccalegna orizzontale con cavalletto Scheppach HL760LS – 7 Tonnellate 2200 W', 'Spaccalegna idraulico orizzontale da 7 tonnellate su cavalletto ergonomico ad altezza vita con ruote di trasporto. Motore elettrico 230V da 2200 W, fino a 100 cicli l’ora per ceppi da 20 a 52 cm (Ø fino a 25 cm) con gabbia di sicurezza normativa.', 'Lo spaccalegna orizzontale Scheppach HL760LS da 7 tonnellate è la soluzione ideale per preparare in totale autonomia e sicurezza la legna per stufe, inserti e camini domestici. Grazie al robusto cavalletto rialzato su ruote incluso di serie, il piano di lavoro si trova ad altezza vita: non dovrai più piegare la schiena per caricare i ceppi o raccogliere i ciocchi spaccati.

Alimentato da una normale presa domestica a 230 V, il motore da 2200 W garantisce fino a 100 cicli di spacco all’ora su legna stagionata o verde lunga da 20 a 52 cm e con diametro fino a 25 cm. Il comando bimanuale e la gabbia di protezione metallica integrale assicurano la massima sicurezza operativa secondo le più recenti normative europee.', 'Collo su mezzo bancale con cavalletto, ruote e gabbia di protezione inclusi (59 kg)', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'fendeur-buches-horizontal-support-scheppach-hl760ls-7t'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000024-0000-4000-8000-000000000101', p.id, 'BRV-SCH-HL760LS-7T', 'Scheppach HL760LS 7T con supporto rialzato su ruote', 329, 25
from public.braviko_products p where p.slug = 'fendeur-buches-horizontal-support-scheppach-hl760ls-7t'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/fendeur-buches-horizontal-support-scheppach-hl760ls-7t-1.jpg', 'Spaccalegna orizzontale con cavalletto Scheppach HL760LS – 7 Tonnellate 2200 W', 1, true
from public.braviko_products p where p.slug = 'fendeur-buches-horizontal-support-scheppach-hl760ls-7t'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/fendeur-buches-horizontal-support-scheppach-hl760ls-7t-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/fendeur-buches-horizontal-support-scheppach-hl760ls-7t-2.jpg', 'Spaccalegna orizzontale con cavalletto Scheppach HL760LS – 7 Tonnellate 2200 W', 2, false
from public.braviko_products p where p.slug = 'fendeur-buches-horizontal-support-scheppach-hl760ls-7t'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/fendeur-buches-horizontal-support-scheppach-hl760ls-7t-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/fendeur-buches-horizontal-support-scheppach-hl760ls-7t-3.jpg', 'Spaccalegna orizzontale con cavalletto Scheppach HL760LS – 7 Tonnellate 2200 W', 3, false
from public.braviko_products p where p.slug = 'fendeur-buches-horizontal-support-scheppach-hl760ls-7t'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/fendeur-buches-horizontal-support-scheppach-hl760ls-7t-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/fendeur-buches-horizontal-support-scheppach-hl760ls-7t-4.jpg', 'Spaccalegna orizzontale con cavalletto Scheppach HL760LS – 7 Tonnellate 2200 W', 4, false
from public.braviko_products p where p.slug = 'fendeur-buches-horizontal-support-scheppach-hl760ls-7t'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/fendeur-buches-horizontal-support-scheppach-hl760ls-7t-4.jpg');

insert into public.braviko_categories (slug, name) values ('rangement-stockage', 'rangement-stockage') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000025-0000-4000-8000-000000000025', 'abri-buches-double-pin-nordique-timbela-m983', 'published', false, 47, c.id
from public.braviko_categories c where c.slug = 'rangement-stockage'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Legnaia doppia da giardino in pino nordico Timbela M983 – 4,3 m³', 'Legnaia da esterno a doppio scomparto in pino nordico certificato FSC (spessore 19 mm) con capacità di 4,3 m³ (fino a 6 steri). Dotata di pavimento rialzato a listelli, pareti laterali grigliate per una ventilazione naturale ottimale e tetto spiovente impermeabile.', 'Progettata per organizzare e stagionare al meglio la scorta invernale di legna da ardere, la legnaia doppia Timbela M983 offre un volume utile di 4,3 m³ (pari a circa 6 steri di ceppi da 33 o 50 cm) suddiviso in due ampi scomparti indipendenti: la soluzione ideale per separare la legna pronta all’uso da quella in fase di essiccazione.

Realizzata in pino nordico massello certificato FSC con pannelli da 19 mm di spessore, include di serie un robusto pavimento a listelli rialzato che isola i ceppi dall’umidità di risalita del terreno. Le pareti laterali e posteriori a doghe distanziate favoriscono la circolazione costante dell’aria, mentre il tetto spiovente impermeabile protegge la catasta da pioggia e neve.', 'Kit di montaggio su bancale con pavimento incluso (108 kg)', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'abri-buches-double-pin-nordique-timbela-m983'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000025-0000-4000-8000-000000000101', p.id, 'BRV-TIM-M983-43', 'Legnaia doppia Timbela M983 – Capacità 4,3 m³ (circa 6 steri)', 349, 25
from public.braviko_products p where p.slug = 'abri-buches-double-pin-nordique-timbela-m983'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/abri-buches-double-pin-nordique-timbela-m983-1.jpg', 'Legnaia doppia da giardino in pino nordico Timbela M983 – 4,3 m³', 1, true
from public.braviko_products p where p.slug = 'abri-buches-double-pin-nordique-timbela-m983'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/abri-buches-double-pin-nordique-timbela-m983-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/abri-buches-double-pin-nordique-timbela-m983-2.jpg', 'Legnaia doppia da giardino in pino nordico Timbela M983 – 4,3 m³', 2, false
from public.braviko_products p where p.slug = 'abri-buches-double-pin-nordique-timbela-m983'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/abri-buches-double-pin-nordique-timbela-m983-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/abri-buches-double-pin-nordique-timbela-m983-3.jpg', 'Legnaia doppia da giardino in pino nordico Timbela M983 – 4,3 m³', 3, false
from public.braviko_products p where p.slug = 'abri-buches-double-pin-nordique-timbela-m983'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/abri-buches-double-pin-nordique-timbela-m983-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/abri-buches-double-pin-nordique-timbela-m983-4.jpg', 'Legnaia doppia da giardino in pino nordico Timbela M983 – 4,3 m³', 4, false
from public.braviko_products p where p.slug = 'abri-buches-double-pin-nordique-timbela-m983'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/abri-buches-double-pin-nordique-timbela-m983-4.jpg');

insert into public.braviko_categories (slug, name) values ('stockage-exterieur', 'stockage-exterieur') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000026-0000-4000-8000-000000000026', 'abri-buches-metal-anthracite-biohort-woodstock-230', 'published', true, 48, c.id
from public.braviko_categories c where c.slug = 'stockage-exterieur'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Legnaia da esterno in acciaio antracite Biohort Woodstock 230 – 3,1 m³', 'Legnaia metallica di fascia alta Biohort Woodstock 230 in lamiera d’acciaio zincata a caldo e verniciata a forno con poliammide antracite metallizzato. Zero manutenzione, profili in alluminio massiccio, grondaia integrata e capacità di 3,1 m³ (circa 4,5 steri).', 'Riferimento assoluto per chi cerca una legnaia dal design contemporaneo e indistruttibile nel tempo, la Biohort Woodstock 230 unisce l’eleganza della finitura antracite metallizzato a una qualità costruttiva superiore. La struttura in lamiera d’acciaio zincata a caldo e verniciata a forno con poliammide, rinforzata da montanti angolari in alluminio massiccio, non richiede alcuna riverniciatura ed è coperta da 20 anni di garanzia contro la corrosione.

Con una profondità generosa di 102 cm consente di stoccare fino a 3,1 m³ di legna (circa 4,5 steri disposti su due file parallele di ceppi da 33 cm). Il tetto inclinato con grondaia integrata sul lato anteriore convoglia l’acqua piovana lateralmente, mantenendo la facciata della catasta sempre asciutta; grazie agli accessori opzionali Biohort può inoltre trasformarsi in un pratico armadio portattrezzi da giardino.', 'Confezione rinforzata su bancale (62 kg)', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'abri-buches-metal-anthracite-biohort-woodstock-230'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000026-0000-4000-8000-000000000101', p.id, 'BRV-BIO-WS230-A', 'Grigio Quarzo / Antracite Metallizzato – 229 × 102 × 199 cm', 449, 25
from public.braviko_products p where p.slug = 'abri-buches-metal-anthracite-biohort-woodstock-230'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/abri-buches-metal-anthracite-biohort-woodstock-230-1.jpg', 'Legnaia da esterno in acciaio antracite Biohort Woodstock 230 – 3,1 m³', 1, true
from public.braviko_products p where p.slug = 'abri-buches-metal-anthracite-biohort-woodstock-230'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/abri-buches-metal-anthracite-biohort-woodstock-230-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/abri-buches-metal-anthracite-biohort-woodstock-230-2.jpg', 'Legnaia da esterno in acciaio antracite Biohort Woodstock 230 – 3,1 m³', 2, false
from public.braviko_products p where p.slug = 'abri-buches-metal-anthracite-biohort-woodstock-230'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/abri-buches-metal-anthracite-biohort-woodstock-230-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/abri-buches-metal-anthracite-biohort-woodstock-230-3.jpg', 'Legnaia da esterno in acciaio antracite Biohort Woodstock 230 – 3,1 m³', 3, false
from public.braviko_products p where p.slug = 'abri-buches-metal-anthracite-biohort-woodstock-230'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/abri-buches-metal-anthracite-biohort-woodstock-230-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/abri-buches-metal-anthracite-biohort-woodstock-230-4.jpg', 'Legnaia da esterno in acciaio antracite Biohort Woodstock 230 – 3,1 m³', 4, false
from public.braviko_products p where p.slug = 'abri-buches-metal-anthracite-biohort-woodstock-230'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/abri-buches-metal-anthracite-biohort-woodstock-230-4.jpg');

insert into public.braviko_categories (slug, name) values ('rangement-transport-bois', 'rangement-transport-bois') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000027-0000-4000-8000-000000000027', 'range-buches-vertical-interieur-acier-noir-le-marquier-xl', 'published', false, 49, c.id
from public.braviko_categories c where c.slug = 'rangement-transport-bois'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Portalegna verticale da interno in acciaio nero Le Marquier XL – H 150 cm', 'Portalegna verticale salvaspazio da salotto Le Marquier XL (H 150 cm) in acciaio verniciato a polvere epossidica nero opaco. Dotato di 2 scomparti con ripiano superiore per legnetti da accensione, base chiusa raccogli-residui e piedini antirigatura.', 'Pensato per arredare con stile la zona camino o l’angolo stufa occupando pochissimo spazio a terra (solo 45 × 35 cm di impronta), il portalegna a colonna Le Marquier XL sviluppa la capienza in verticale fino a 150 cm di altezza, assicurando fino a 4 giorni di autonomia di legna sempre asciutta e a portata di mano in salotto.

La struttura in acciaio ad alta resistenza con finitura epossidica nero opaco integra un pratico ripiano divisorio superiore per tenere separati i legnetti d’accensione e gli accendifuoco dai ceppi principali da 25, 33 o 40 cm. La base inferiore chiusa trattiene frammenti di corteccia e polvere di legno preservando la pulizia del parquet o del gres, mentre i piedini antirigatura proteggono le superfici più delicate.', 'Collo singolo rinforzato (18 kg)', 'Consegna rapida con corriere espresso in 3–5 giorni lavorativi'
from public.braviko_products p where p.slug = 'range-buches-vertical-interieur-acier-noir-le-marquier-xl'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000027-0000-4000-8000-000000000101', p.id, 'BRV-LMQ-RACK-150', 'Portalegna colonna XL H 150 × L 45 × P 35 cm – Nero Opaco', 219, 25
from public.braviko_products p where p.slug = 'range-buches-vertical-interieur-acier-noir-le-marquier-xl'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/range-buches-vertical-interieur-acier-noir-le-marquier-xl-1.jpg', 'Portalegna verticale da interno in acciaio nero Le Marquier XL – H 150 cm', 1, true
from public.braviko_products p where p.slug = 'range-buches-vertical-interieur-acier-noir-le-marquier-xl'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/range-buches-vertical-interieur-acier-noir-le-marquier-xl-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/range-buches-vertical-interieur-acier-noir-le-marquier-xl-2.jpg', 'Portalegna verticale da interno in acciaio nero Le Marquier XL – H 150 cm', 2, false
from public.braviko_products p where p.slug = 'range-buches-vertical-interieur-acier-noir-le-marquier-xl'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/range-buches-vertical-interieur-acier-noir-le-marquier-xl-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/range-buches-vertical-interieur-acier-noir-le-marquier-xl-3.jpg', 'Portalegna verticale da interno in acciaio nero Le Marquier XL – H 150 cm', 3, false
from public.braviko_products p where p.slug = 'range-buches-vertical-interieur-acier-noir-le-marquier-xl'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/range-buches-vertical-interieur-acier-noir-le-marquier-xl-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/range-buches-vertical-interieur-acier-noir-le-marquier-xl-4.jpg', 'Portalegna verticale da interno in acciaio nero Le Marquier XL – H 150 cm', 4, false
from public.braviko_products p where p.slug = 'range-buches-vertical-interieur-acier-noir-le-marquier-xl'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/range-buches-vertical-interieur-acier-noir-le-marquier-xl-4.jpg');

insert into public.braviko_categories (slug, name) values ('accessoires-chauffage', 'accessoires-chauffage') on conflict (slug) do nothing;
insert into public.braviko_products (id, slug, status, featured, sort_order, category_id)
select 'b1000028-0000-4000-8000-000000000028', 'scie-a-buches-bascule-scheppach-hs520-505-mm-2600w', 'published', false, 50, c.id
from public.braviko_categories c where c.slug = 'accessoires-chauffage'
on conflict (slug) do update set status = 'published', featured = excluded.featured, sort_order = excluded.sort_order;
insert into public.braviko_product_translations (product_id, locale, name, short_description, description, conditioning, delivery_info)
select p.id, 'it', 'Sega circolare a dondolo per tronchi Scheppach HS520 – Ø 505 mm 2600 W', 'Sega circolare a culla basculante Scheppach HS520 con motore monofase 230V da 2600 W e lama in metallo duro Widia Ø 505 mm inclusa. Taglia rapidamente rami e tronchi fino a Ø 170 mm in totale sicurezza grazie alla culla chiusa con ritorno a molla.', 'La sega circolare a dondolo Scheppach HS520 è la macchina ideale per trasformare in modo rapido, ergonomico e sicuro grandi quantità di rami, stanghe e tronchi in ceppi calibrati pronti per la stufa o il camino. Alimentata da una normale presa domestica da 230V, monta un potente motore a induzione da 2600 W abbinato a una lama professionale in metallo duro HW (Widia) da 505 mm di diametro capace di sezionare legni duri e nodosi fino a 170 mm di spessore.

A differenza della motosega tradizionale, la culla basculante chiusa di sicurezza protegge integralmente l’operatore dall’accesso alla lama durante il taglio e ritorna automaticamente in posizione di riposo tramite una robusta molla di richiamo. La battuta di misura laterale regolabile permette di eseguire tagli seriali tutti identici a 25, 33, 40 o 50 cm senza dover mai misurare i tronchi uno per uno.', 'Cassa rinforzata su bancale (73 kg) – Preassemblata', 'Consegna in 5–8 giorni lavorativi su appuntamento'
from public.braviko_products p where p.slug = 'scie-a-buches-bascule-scheppach-hs520-505-mm-2600w'
on conflict (product_id, locale) do update set name = excluded.name, short_description = excluded.short_description, description = excluded.description, conditioning = excluded.conditioning, delivery_info = excluded.delivery_info;
insert into public.braviko_product_variants (id, product_id, sku, label, price, stock)
select 'b1000028-0000-4000-8000-000000000101', p.id, 'BRV-SCH-HS520-2600', 'Scheppach HS520 – Lama Widia Ø 505 mm – 230V 2600 W', 549, 25
from public.braviko_products p where p.slug = 'scie-a-buches-bascule-scheppach-hs520-505-mm-2600w'
on conflict (id) do update set sku = excluded.sku, label = excluded.label, price = excluded.price;
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/scie-a-buches-bascule-scheppach-hs520-505-mm-2600w-1.jpg', 'Sega circolare a dondolo per tronchi Scheppach HS520 – Ø 505 mm 2600 W', 1, true
from public.braviko_products p where p.slug = 'scie-a-buches-bascule-scheppach-hs520-505-mm-2600w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/scie-a-buches-bascule-scheppach-hs520-505-mm-2600w-1.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/scie-a-buches-bascule-scheppach-hs520-505-mm-2600w-2.jpg', 'Sega circolare a dondolo per tronchi Scheppach HS520 – Ø 505 mm 2600 W', 2, false
from public.braviko_products p where p.slug = 'scie-a-buches-bascule-scheppach-hs520-505-mm-2600w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/scie-a-buches-bascule-scheppach-hs520-505-mm-2600w-2.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/scie-a-buches-bascule-scheppach-hs520-505-mm-2600w-3.jpg', 'Sega circolare a dondolo per tronchi Scheppach HS520 – Ø 505 mm 2600 W', 3, false
from public.braviko_products p where p.slug = 'scie-a-buches-bascule-scheppach-hs520-505-mm-2600w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/scie-a-buches-bascule-scheppach-hs520-505-mm-2600w-3.jpg');
insert into public.braviko_product_images (product_id, storage_path, alt_text, sort_order, is_primary)
select p.id, '/images/products/scie-a-buches-bascule-scheppach-hs520-505-mm-2600w-4.jpg', 'Sega circolare a dondolo per tronchi Scheppach HS520 – Ø 505 mm 2600 W', 4, false
from public.braviko_products p where p.slug = 'scie-a-buches-bascule-scheppach-hs520-505-mm-2600w'
and not exists (select 1 from public.braviko_product_images i where i.product_id = p.id and i.storage_path = '/images/products/scie-a-buches-bascule-scheppach-hs520-505-mm-2600w-4.jpg');

commit;