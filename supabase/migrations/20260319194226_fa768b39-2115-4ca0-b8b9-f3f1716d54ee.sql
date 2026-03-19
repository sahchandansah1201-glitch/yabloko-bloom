
-- 1. Add CHECK constraint on status values
ALTER TABLE public.appointments
  ADD CONSTRAINT appointments_status_check
  CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'));

-- 2. Drop old INSERT policies and recreate with status enforcement
DROP POLICY IF EXISTS "Authenticated users can create their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Guests can create appointments with consent" ON public.appointments;

CREATE POLICY "Authenticated users can create their own appointments"
ON public.appointments FOR INSERT TO authenticated
WITH CHECK (
  ((user_id = auth.uid()) AND (consent_152fz = true) AND (status = 'pending'))
  OR
  ((user_id IS NULL) AND (consent_152fz = true) AND (guest_phone IS NOT NULL) AND (status = 'pending'))
);

CREATE POLICY "Guests can create appointments with consent"
ON public.appointments FOR INSERT TO anon
WITH CHECK (
  (user_id IS NULL) AND (consent_152fz = true) AND (guest_phone IS NOT NULL) AND (guest_name IS NOT NULL) AND (status = 'pending')
);

-- 3. Drop old UPDATE policy and recreate allowing only self-cancellation
DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;

CREATE POLICY "Users can update their own appointments"
ON public.appointments FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND status = 'cancelled');
