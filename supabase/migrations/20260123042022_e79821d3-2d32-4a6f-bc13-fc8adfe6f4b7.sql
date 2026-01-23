-- 1. Create app_role enum for future admin functionality
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. PROFILES (Extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  loyalty_points INT DEFAULT 0,
  consent_152fz BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- 3. USER ROLES TABLE (Separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- User roles policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- 4. DOCTORS (Static Content - Public Read)
CREATE TABLE public.doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  is_top_specialist BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view doctors"
ON public.doctors FOR SELECT
TO anon, authenticated
USING (true);

-- 5. SERVICES (Public Read)
CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  price_start INT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
ON public.services FOR SELECT
TO anon, authenticated
USING (true);

-- 6. APPOINTMENTS (Core Conversion Engine)
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  doctor_id UUID REFERENCES public.doctors(id),
  service_id UUID REFERENCES public.services(id),
  appointment_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending',
  guest_name TEXT,
  guest_phone TEXT,
  guest_email TEXT,
  consent_152fz BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own appointments
CREATE POLICY "Users can view their own appointments"
ON public.appointments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create appointments"
ON public.appointments FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their own appointments"
ON public.appointments FOR UPDATE
USING (auth.uid() = user_id);

-- 7. Insert initial doctors data
INSERT INTO public.doctors (name, specialty, bio, is_top_specialist) VALUES
('Павлюк Мария Олеговна', 'Главный врач, дерматолог, трихолог, Anti-Age эксперт', 'Главный врач клиники с многолетним опытом в дерматологии и косметологии. Специализируется на интегративном подходе к красоте и здоровью кожи.', true),
('Аллам Алиса Хусейновна', 'Заведующая отделением дерматологии', 'Опытный дерматолог, специализирующийся на лечении сложных кожных заболеваний.', false),
('Райкова Светлана Александровна', 'Дерматовенеролог', 'Специалист по диагностике и лечению кожных заболеваний.', false),
('Медведкова Наргиза Ахматиллаевна', 'Нутрициолог, терапевт', 'Специалист по интегративной медицине, связывающий питание и здоровье кожи.', false),
('Ковалев Игорь Петрович', 'Остеопат', 'Специалист по остеопатии, помогающий восстановить баланс организма.', false);

-- 8. Insert initial services data
INSERT INTO public.services (category, title, price_start, description) VALUES
('Косметология', 'Ботулинотерапия (Ботокс, Диспорт)', 3000, 'Инъекции для разглаживания мимических морщин'),
('Косметология', 'Биоревитализация', 5000, 'Инъекционное увлажнение кожи гиалуроновой кислотой'),
('Косметология', 'Контурная пластика', 8000, 'Моделирование овала лица и губ филлерами'),
('Дерматология', 'Лечение акне', 2500, 'Комплексный подход к лечению угревой болезни'),
('Дерматология', 'Удаление новообразований', 1500, 'Безопасное удаление родинок и папиллом'),
('Трихология', 'Лечение выпадения волос', 3000, 'Диагностика и лечение алопеции'),
('Трихология', 'Трихоскопия', 1500, 'Компьютерная диагностика волос и кожи головы'),
('Здоровье', 'Остеопатия', 4000, 'Мануальная терапия для восстановления здоровья'),
('Здоровье', 'Консультация нутрициолога', 3000, 'Разработка индивидуального плана питания');

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();