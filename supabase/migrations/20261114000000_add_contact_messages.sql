CREATE TABLE IF NOT EXISTS public.braviko_contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  order_ref text,
  subject text NOT NULL,
  message text NOT NULL,
  locale text NOT NULL DEFAULT 'fr',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.braviko_contact_messages ENABLE ROW LEVEL SECURITY;
