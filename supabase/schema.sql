-- ====================================================================
-- FEDETUR - FEDERACIÓN DE COOPERATIVAS Y MUTUALES (MATRÍCULA INAES 25450)
-- ESQUEMA DE BASE DE DATOS Y SEGURIDAD ROW LEVEL SECURITY (RLS)
-- Motor: PostgreSQL 15+ / Supabase Cloud
-- Responsable: Escuadrón ALFA & BETA (Architect + Seguridad)
-- ====================================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------
-- 1. TABLA: ENTIDADES ADHERIDAS (Mutuales, Cooperativas, Federaciones)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.affiliated_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    acronym TEXT,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('mutual', 'cooperativa', 'federacion')),
    inaes_matricula TEXT,
    province TEXT NOT NULL,
    region TEXT NOT NULL CHECK (region IN ('NEA', 'NOA', 'Centro', 'Cuyo', 'Buenos Aires', 'Patagonia', 'Malvinas')),
    contact_email TEXT,
    contact_phone TEXT,
    logo_url TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 2. TABLA: PERFILES DE USUARIO (RBAC Multi-Rol)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    dni_cuit TEXT,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'afiliado' CHECK (role IN ('afiliado', 'hotel_admin', 'super_admin')),
    entity_id UUID REFERENCES public.affiliated_entities(id) ON DELETE SET NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 3. TABLA: HOTELES Y ALOJAMIENTOS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    region TEXT NOT NULL CHECK (region IN ('NEA', 'NOA', 'Centro', 'Cuyo', 'Buenos Aires', 'Patagonia', 'Malvinas')),
    province TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    whatsapp TEXT,
    website TEXT,
    amenities JSONB DEFAULT '[]'::jsonb, -- ['wifi', 'pool', 'parking', 'breakfast', 'ac', 'restaurant', 'spa']
    images TEXT[] DEFAULT '{}',
    star_rating INT DEFAULT 3 CHECK (star_rating BETWEEN 1 AND 5),
    check_in_time TEXT DEFAULT '14:00',
    check_out_time TEXT DEFAULT '10:00',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paused')),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 4. TABLA: TIPOS DE HABITACIONES
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.room_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES public.hotels(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    capacity_adults INT NOT NULL DEFAULT 2,
    capacity_children INT NOT NULL DEFAULT 0,
    bed_configuration TEXT DEFAULT '1 Cama King o 2 Camas Twin',
    base_price_night NUMERIC(12, 2) NOT NULL,
    fedetur_discount_percentage NUMERIC(5, 2) DEFAULT 20.00,
    total_inventory INT NOT NULL DEFAULT 1,
    images TEXT[] DEFAULT '{}',
    amenities JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 5. TABLA: RESERVAS
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code TEXT UNIQUE NOT NULL, -- ej: FDT-2026-9812
    affiliate_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    hotel_id UUID NOT NULL REFERENCES public.hotels(id) ON DELETE RESTRICT,
    room_type_id UUID NOT NULL REFERENCES public.room_types(id) ON DELETE RESTRICT,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    nights_count INT NOT NULL CHECK (nights_count > 0),
    guests_count INT NOT NULL DEFAULT 1,
    guest_details JSONB NOT NULL, -- Array de [{ full_name, dni, is_primary }]
    price_per_night NUMERIC(12, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL,
    discount_amount NUMERIC(12, 2) DEFAULT 0.00,
    total_amount NUMERIC(12, 2) NOT NULL,
    status TEXT DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'confirmed', 'checked_in', 'completed', 'cancelled')),
    special_requests TEXT,
    voucher_qr_data TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 6. TABLA: PAGOS (MERCADOPAGO)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    mp_preference_id TEXT,
    mp_payment_id TEXT UNIQUE,
    mp_status TEXT, -- 'approved', 'pending', 'in_process', 'rejected', 'refunded'
    mp_payment_type TEXT,
    mp_merchant_order_id TEXT,
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT DEFAULT 'ARS',
    raw_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 7. TABLA: AUDITORÍA INMUTABLE DE OPERACIONES
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- 'booking_created', 'payment_approved', 'hotel_approved', 'voucher_scanned', etc.
    entity_type TEXT NOT NULL, -- 'booking', 'payment', 'hotel', 'profile'
    entity_id UUID,
    ip_address TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- 8. POLÍTICAS ROW LEVEL SECURITY (RLS)
-- --------------------------------------------------------------------

-- Habilitar RLS en todas las tablas
ALTER TABLE public.affiliated_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Regla de lectura pública para Entidades Adheridas
CREATE POLICY "Public Read Entities" ON public.affiliated_entities
    FOR SELECT USING (true);

-- Regla de lectura pública para Hoteles Aprobados
CREATE POLICY "Public Read Approved Hotels" ON public.hotels
    FOR SELECT USING (status = 'approved' OR auth.uid() = owner_id);

CREATE POLICY "Hotel Owner Insert/Update Hotel" ON public.hotels
    FOR ALL USING (auth.uid() = owner_id);

-- Regla de lectura pública para Habitaciones de Hoteles Aprobados
CREATE POLICY "Public Read Room Types" ON public.room_types
    FOR SELECT USING (true);

-- Reglas para Perfiles
CREATE POLICY "Users can read their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Reglas para Reservas
CREATE POLICY "Affiliates can see their bookings" ON public.bookings
    FOR SELECT USING (auth.uid() = affiliate_id);

CREATE POLICY "Hotels can see bookings for their hotels" ON public.bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.hotels h
            WHERE h.id = bookings.hotel_id AND h.owner_id = auth.uid()
        )
    );

CREATE POLICY "Affiliates can insert bookings" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = affiliate_id);

-- Reglas para Auditoría: Sólo Super Admins pueden ver logs
CREATE POLICY "Super Admins can read audit logs" ON public.audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'super_admin'
        )
    );

-- --------------------------------------------------------------------
-- 9. DATOS SEMILLA INICIALES (ENTIDADES, REGIONES Y HOTELES DEMO)
-- --------------------------------------------------------------------
INSERT INTO public.affiliated_entities (name, acronym, entity_type, inaes_matricula, province, region, contact_email) VALUES
('Mutual Personal SAMEEP', 'Mu.Pe.Sa', 'mutual', 'MAT-10293', 'Chaco', 'NEA', 'mupesa@fedetur.ar'),
('Mutual Capital', 'Mutual Capital', 'mutual', 'MAT-11234', 'Santiago del Estero', 'NOA', 'capital@fedetur.ar'),
('Cooperativa de Vivienda FECOVIMA', 'FECOVIMA', 'cooperativa', 'MAT-12498', 'Buenos Aires', 'Buenos Aires', 'fecovima@fedetur.ar'),
('Mutual 1° de Abril', '1° de Abril', 'mutual', 'MAT-13490', 'Santiago del Estero', 'NOA', 'primeroabril@fedetur.ar'),
('Asociación Mutual DECAM', 'DECAM', 'mutual', 'MAT-14981', 'Buenos Aires', 'Buenos Aires', 'decam@fedetur.ar'),
('Mutualidad Fondo Compensador FOCOMEJ', 'FOCOMEJ', 'mutual', 'MAT-15022', 'CABA', 'Buenos Aires', 'focomej@fedetur.ar'),
('Federación de Mutuales de La Rioja', 'Fed. Riojanas', 'federacion', 'MAT-16291', 'La Rioja', 'NOA', 'larioja@fedetur.ar'),
('Federación de Mutuales de Vivienda FEMMEVI', 'FEMMEVI', 'federacion', 'MAT-17822', 'Mendoza', 'Cuyo', 'femmevi@fedetur.ar'),
('Mutual del Gas y Petróleo', 'Gas y Petróleo', 'mutual', 'MAT-18933', 'Santa Cruz', 'Patagonia', 'petroleo@fedetur.ar'),
('Federación Mutuales de Ahorro y Crédito Santa Fe', 'Fed. Santa Fe', 'federacion', 'MAT-19401', 'Santa Fe', 'Centro', 'santafe@fedetur.ar');
