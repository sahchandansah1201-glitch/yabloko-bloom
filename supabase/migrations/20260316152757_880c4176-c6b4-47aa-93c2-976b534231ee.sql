
ALTER TABLE public.doctors ADD COLUMN slug text UNIQUE;

-- Set slugs for existing doctors
UPDATE public.doctors SET slug = 'pavlyuk' WHERE id = '5be37782-65c6-4b1c-8981-7a3432335035';
UPDATE public.doctors SET slug = 'allam' WHERE id = 'b9d1a8eb-1c52-4335-ac66-a91ff36b59b8';
UPDATE public.doctors SET slug = 'kovalev' WHERE id = '023cdc51-ed42-478c-b281-3cfb56f30317';
UPDATE public.doctors SET slug = 'medvedkova' WHERE id = 'b274bc11-d811-423b-9e15-67f7cfe8cb65';
UPDATE public.doctors SET slug = 'raykova' WHERE id = '132b5047-9d17-4231-b8cb-751d6547cedc';

-- Insert missing doctors
INSERT INTO public.doctors (name, specialty, bio, is_top_specialist, slug)
VALUES
  ('Павлюк Евгений Михайлович', 'Медицинский брат по массажу', 'Квалифицированный специалист по медицинскому массажу с большим опытом работы.', false, 'pavlyuk-evgeniy'),
  ('Игитханян Оксана Алексеевна', 'Врач-косметолог', 'Опытный косметолог, специализирующийся на инъекционных и аппаратных методах омоложения.', false, 'igithanyan'),
  ('Акопян Нарине Романовна', 'Медицинская сестра в косметологии', 'Квалифицированная медицинская сестра с опытом ассистирования в косметологических процедурах.', false, 'akopyan');
