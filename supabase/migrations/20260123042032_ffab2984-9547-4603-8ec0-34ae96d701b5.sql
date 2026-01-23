-- Drop the permissive INSERT policy and create a more specific one
DROP POLICY "Users can create appointments" ON public.appointments;

-- Allow authenticated users to create appointments for themselves
-- And allow guest appointments (with null user_id) but require consent
CREATE POLICY "Authenticated users can create their own appointments"
ON public.appointments FOR INSERT
TO authenticated
WITH CHECK (
  (user_id = auth.uid() AND consent_152fz = true)
  OR 
  (user_id IS NULL AND consent_152fz = true AND guest_phone IS NOT NULL)
);

-- Allow anonymous users to create guest appointments with consent
CREATE POLICY "Guests can create appointments with consent"
ON public.appointments FOR INSERT
TO anon
WITH CHECK (
  user_id IS NULL 
  AND consent_152fz = true 
  AND guest_phone IS NOT NULL 
  AND guest_name IS NOT NULL
);