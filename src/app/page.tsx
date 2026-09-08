'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Compass, 
  CreditCard, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  Send,
  Hotel as HotelIcon,
  Bed,
  CheckCircle,
  Building,
  QrCode,
  Globe,
  Trees,
  Mountain,
  Sun,
  Wine,
  Waves,
  Percent,
  TrendingUp,
  Handshake,
  Verified,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { INITIAL_HOTELS, REGIONAL_DATA, AFFILIATED_ENTITIES, FEDETUR_INFO } from '@/lib/mockData';
import { HotelCard } from '@/components/HotelCard';
import { RegionBadge } from '@/components/RegionBadge';
import { DigitalCarnet } from '@/components/DigitalCarnet';
import { FedeturLogo } from '@/components/FedeturLogo';

const HERO_SLIDES = [
  {
    id: 'hornocal',
    image: '/images/hero/hero-hornocal.webp',
    title: 'Serranía del Hornocal (14 Colores)',
    region: 'NOA · Jujuy',
    badge: 'Ruta Federal Destacada • Serranía del Hornocal (14 Colores)',
    season: 'Temporada 2025/2026',
    alt: 'Serranía del Hornocal de 14 Colores en Humahuaca, Jujuy',
    objectPosition: 'object-[center_35%]',
  },
  {
    id: 'carlospaz',
    image: '/images/hero/hero-carlospaz.webp',
    title: 'Reloj Cu-Cú & Sierras de Punilla',
    region: 'Centro · Córdoba',
    badge: 'Ruta Federal Destacada • Reloj Cu-Cú & Sierras de Córdoba',
    season: 'Temporada Todo el Año',
    alt: 'Reloj Cu-Cú y centro turístico de Villa Carlos Paz, Córdoba',
    objectPosition: 'object-center',
  },
  {
    id: 'potrerillos',
    image: '/images/hero/hero-potrerillos.webp',
    title: 'Dique Potrerillos & Cordillera de los Andes',
    region: 'Cuyo · Mendoza',
    badge: 'Ruta Federal Destacada • Rutas del Vino & Dique Potrerillos',
    season: 'Temporada Otoño / Primavera',
    alt: 'Túnel de Potrerillos hacia el lago y Cordillera de los Andes en Mendoza',
    objectPosition: 'object-center',
  },
  {
    id: 'fitzroy',
    image: '/images/hero/hero-fitzroy.webp',
    title: 'Monte Fitz Roy & Laguna de los Tres',
    region: 'Patagonia · Santa Cruz',
    badge: 'Ruta Federal Destacada • Glaciares & Senderos Patagónicos',
    season: 'Temporada Verano / Otoño',
    alt: 'Monte Fitz Roy y Laguna de los Tres en El Chaltén, Patagonia',
    objectPosition: 'object-[center_30%]',
  },
  {
    id: 'iguazu',
    image: '/images/hero/hero-iguazu.webp',
    title: 'Cataratas del Iguazú & Selva Paranaense',
    region: 'NEA · Misiones',
    badge: 'Ruta Federal Destacada • Maravilla del Mundo en Selva Subtropical',
    season: 'Temporada Todo el Año',
    alt: 'Pasarela y saltos majestuosos de las Cataratas del Iguazú, Misiones',
    objectPosition: 'object-[center_30%]',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSearchTab, setActiveSearchTab] = useState<'hoteles' | 'paquetes' | 'excursiones'>('hoteles');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [stayType, setStayType] = useState('todos');
  const [checkInDate, setCheckInDate] = useState('2025-05-15');
  const [guestsCount, setGuestsCount] = useState('2');
  const [applyMutualDiscount, setApplyMutualDiscount] = useState(true);
  const [activeCatalogFilter, setActiveCatalogFilter] = useState<'all' | 'NOA' | 'Patagonia' | 'NEA' | 'Centro' | 'Cuyo' | 'Buenos Aires'>('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Quiero inscribir mi Hotel como Prestador Oficial',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedRegion && selectedRegion !== 'all') params.set('region', selectedRegion);
    if (guestsCount) params.set('guests', guestsCount);
    if (checkInDate) params.set('checkIn', checkInDate);
    if (stayType && stayType !== 'todos') params.set('type', stayType);
    router.push(`/hoteles?${params.toString()}`);
  };

  const filteredHotels = activeCatalogFilter === 'all'
    ? INITIAL_HOTELS
    : INITIAL_HOTELS.filter(h => h.region === activeCatalogFilter);

  // Demo user for interactive Carnet preview
  const demoProfile: import('@/types/database').UserProfile = {
    id: 'fedetur-demo-01',
    email: 'fbenitez@decam.org.ar',
    full_name: 'Lic. Fernando M. Benítez',
    dni_cuit: '32.481.902',
    phone: '+54 11 5920-1100',
    entity_name: 'Mutual DECAM (Socio Nº 49.201)',
    role: 'afiliado',
    is_verified: true,
    created_at: '2024-01-10',
  };

  return (
    <main className="min-h-screen flex flex-col w-full selection:bg-sky-200 selection:text-[#003561]">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION CINEMÁTICO EDITORIAL HIGGSFIELD CON CARRUSEL              */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[740px] lg:min-h-[840px] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Carrusel de 5 Fondos Panorámicos Oficiales en Alta Definición */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                idx === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover ${slide.objectPosition}`}
              />
            </div>
          ))}

          {/* Sutil viñeta neutra cinematográfica sin tinte azul para disfrutar las fotos en su máxima calidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
        </div>

        {/* Contenido Principal Hero en Container 1440px */}
        <div className="relative z-10 w-full max-w-portal mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col justify-between">
          
          <div className="max-w-3xl space-y-5">
            {/* Destino Recomendado Badge Dinámico según slide actual */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-sm transition-all duration-300">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="tracking-wider text-sky-200 text-xs font-extrabold uppercase">
                {HERO_SLIDES[currentSlide].badge}
              </span>
              <span className="text-white/40">|</span>
              <span className="text-xs text-white/90 font-medium">
                {HERO_SLIDES[currentSlide].season}
              </span>
            </div>

            {/* Titular Editorial de Alto Impacto */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">
              Viajar, en busca <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-amber-200">
                de uno mismo y de nuestra tierra.
              </span>
            </h1>

            {/* Bajada institucional y turística */}
            <p className="text-base sm:text-lg text-white/95 font-normal leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              La Red Federal que articula a más de <strong>30 millones de asociados</strong> de mutuales y cooperativas con servicios de hotelería de excelencia y tarifas bonificadas en las 24 provincias argentinas.
            </p>

            {/* Controles interactivos del carrusel: selector de 5 destinos y flechas */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 shadow-lg">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Anterior destino"
                  className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'w-8 bg-amber-400 shadow-sm shadow-amber-400/50'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      title={slide.title}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Siguiente destino"
                  className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Selector directo de región con texto */}
              <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold tracking-wide transition-all ${
                      idx === currentSlide
                        ? 'bg-white/30 text-white border border-white/50 shadow-md backdrop-blur-md'
                        : 'bg-black/35 text-white/75 hover:text-white hover:bg-black/55 border border-white/10'
                    }`}
                  >
                    {slide.region}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats Pills en el Hero */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-white/90 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                <HotelIcon className="w-4 h-4 text-sky-300" />
                <span><strong>+480</strong> Hoteles Adheridos</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                <Percent className="w-4 h-4 text-amber-300" />
                <span>Hasta <strong>30% de Ahorro</strong> Directo</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                <CreditCard className="w-4 h-4 text-sky-300" />
                <span><strong>6 cuotas</strong> con MercadoPago</span>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* CONSOLA FLOTANTE MULTICAMPO DE BÚSQUEDA (GLASSMORPHISM 2.0)           */}
          {/* ===================================================================== */}
          <div className="mt-10 lg:mt-14 w-full bg-white/95 backdrop-blur-2xl rounded-3xl p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,28,56,0.4)] border border-white/70">
            
            {/* Pestañas superiores de la consola de búsqueda */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-200/70 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSearchTab('hoteles')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeSearchTab === 'hoteles'
                      ? 'bg-[#003561] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Bed className="w-4 h-4" />
                  <span>Hoteles & Complejos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSearchTab('paquetes')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeSearchTab === 'paquetes'
                      ? 'bg-[#003561] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Paquetes Federales</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSearchTab('excursiones')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeSearchTab === 'excursiones'
                      ? 'bg-[#003561] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Mountain className="w-4 h-4" />
                  <span>Excursiones Solidarias</span>
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Convenios Activos INAES · Con Vouchers Inmediatos</span>
              </div>
            </div>

            {/* Campos de búsqueda en grilla horizontal */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              
              {/* Campo 1: Destino o Región */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>Destino / Región</span>
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-800 font-bold text-xs focus:ring-2 focus:ring-[#00A3E0] focus:outline-none transition-all"
                >
                  <option value="all">Cualquier Región Federal</option>
                  <option value="NOA">NOA · Salta, Jujuy & Tucumán</option>
                  <option value="NEA">NEA · Iguazú & Esteros del Iberá</option>
                  <option value="Patagonia">Patagonia · Bariloche & Glaciares</option>
                  <option value="Cuyo">Cuyo · Mendoza & Valle de Uco</option>
                  <option value="Centro">Centro · Sierras de Córdoba</option>
                  <option value="Buenos Aires">Buenos Aires · Costa Atlántica & CABA</option>
                </select>
              </div>

              {/* Campo 2: Tipo de Estadía */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>Tipo de Alojamiento</span>
                </label>
                <select
                  value={stayType}
                  onChange={(e) => setStayType(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-800 font-bold text-xs focus:ring-2 focus:ring-[#00A3E0] focus:outline-none transition-all"
                >
                  <option value="todos">Hoteles y Hosterías Mutuas</option>
                  <option value="resort">Resorts de Campo & Sierras</option>
                  <option value="cabanas">Cabañas & Apart Hoteles</option>
                  <option value="spa">Hoteles Termales & Spa</option>
                </select>
              </div>

              {/* Campo 3: Fechas */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>Fechas de Estadía</span>
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-800 font-bold text-xs focus:ring-2 focus:ring-[#00A3E0] focus:outline-none transition-all"
                />
              </div>

              {/* Campo 4: Huéspedes / Tarifa Mutual */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>Pasajeros / Mutual</span>
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-800 font-bold text-xs focus:ring-2 focus:ring-[#00A3E0] focus:outline-none transition-all"
                >
                  <option value="1">1 Adulto · Afiliado</option>
                  <option value="2">2 Adultos (Tarifa Bonificada)</option>
                  <option value="3">Familia (2 Adultos + Menores)</option>
                  <option value="5">Grupo Cooperativo (5+ pers.)</option>
                </select>
              </div>

              {/* Campo 5: Botón de Búsqueda */}
              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#00A3E0] hover:bg-[#003561] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#00A3E0]/25 active:scale-[0.98] transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Buscar Alojamientos</span>
                </button>
              </div>

            </form>

            {/* Checkbox de beneficio mutual */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={applyMutualDiscount}
                  onChange={(e) => setApplyMutualDiscount(e.target.checked)}
                  className="w-4 h-4 rounded text-[#00A3E0] focus:ring-[#00A3E0] border-slate-300"
                />
                <span className="font-bold text-slate-800">
                  Aplicar tarifa institucional de Mutual / Cooperativa asociada
                </span>
                <span className="text-[#00A3E0] font-extrabold">
                  (Hasta 30% OFF directo)
                </span>
              </label>

              <div className="flex items-center gap-5 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" /> Cancelación flexible
                </span>
                <span className="inline-flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-[#003561]" /> Canje con Carnet Digital
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DUAL ENTRANCE CARDS: HUÉSPEDES VS PRESTADORES HOTELEROS                */}
      {/* ========================================================================= */}
      <section className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 w-full" id="portal-hoteleros">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Para Huéspedes y Afiliados */}
          <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200/70 flex flex-col justify-between gap-6 group hover:border-[#00A3E0]/40 transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#00658D] flex items-center justify-center font-bold">
                  <Users className="w-6 h-6 text-[#00A3E0]" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-extrabold text-xs tracking-wider uppercase">
                  Afiliados & Familias
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#003561]">
                  Para Afiliados a Mutuales y Cooperativas
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Accedé al beneficio federal de turismo social. Mostrando tu carnet digital obtenés descuentos exclusivos de hasta 30%, cuotas sin recargo y convenios en los mejores polos turísticos del país.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-semibold pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                  <span>Tarifas fijadas por convenio institucional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                  <span>Validación instantánea con código QR</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                  <span>6 cuotas sin interés con MercadoPago</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                  <span>Soporte y coordinación en destino</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/hoteles"
                className="inline-flex items-center gap-2 text-[#003561] hover:text-[#00A3E0] font-bold text-xs transition-colors"
              >
                <span>Explorar catálogo de alojamientos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/afiliado/dashboard"
                className="px-4 py-2 rounded-xl bg-[#003561] hover:bg-[#004C87] text-white text-xs font-bold transition-all shadow-md"
              >
                Mi Carnet Digital
              </Link>
            </div>
          </div>

          {/* Card 2: Para Hoteleros & Dueños de Complejos */}
          <div className="rounded-3xl bg-gradient-to-br from-[#001C38] via-[#003561] to-[#004C87] p-8 shadow-xl text-white flex flex-col justify-between gap-6 relative overflow-hidden">
            {/* Elemento decorativo */}
            <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-[#38B6FF]/15 blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold backdrop-blur-md">
                  <Building2 className="w-6 h-6 text-sky-300" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-sky-400/20 text-sky-200 border border-sky-400/30 font-extrabold text-xs tracking-wider uppercase">
                  Alta Directa de Prestadores
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">
                  ¿Sos dueño o administrador de un Hotel?
                </h2>
                <p className="text-xs sm:text-sm text-sky-100/90 mt-2 leading-relaxed">
                  Sumá tu establecimiento a la <strong>Red Federal FEDETUR</strong>. Ocupá plazas en baja y media temporada canalizando reservas directas de una comunidad de más de <strong>30 millones de asociados</strong> de mutuales y sindicatos.
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-sky-100 font-medium pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Sin comisiones abusivas de agencias OTA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Cobro asegurado y liquidación transparente</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Sello de Calidad y Sostenibilidad INAES</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Alta directa en 48 horas hábiles</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between relative z-10">
              <span className="text-xs text-white/70">
                Red Federal de Prestadores Oficiales
              </span>
              <Link
                href="/hotel/portal"
                className="px-5 py-2.5 rounded-xl bg-white text-[#003561] hover:bg-sky-50 font-bold text-xs shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <span>Inscribir mi Hotel</span>
                <ArrowUpRight className="w-4 h-4 text-[#00A3E0]" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BENTO GRID DE IMPACTO FEDERAL MUTUAL                                   */}
      {/* ========================================================================= */}
      <section className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[#00658D] font-bold text-xs uppercase tracking-wider mb-2">
              <Globe className="w-4 h-4 text-[#00A3E0]" />
              <span>Economía Social & Solidaria en Acción</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#003561] tracking-tight">
              El mayor entramado de turismo asociativo del país
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Coordinamos la capacidad hotelera y los programas de turismo de entidades mutualistas con presencia real en cada una de las 24 jurisdicciones argentinas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              Resolución INAES 25450
            </span>
            <span className="px-4 py-1.5 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">
              Auditado Período 2025/2026
            </span>
          </div>
        </div>

        {/* Bento Grid 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-8 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#00A3E0]/40 transition-all flex flex-col justify-between gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-[#003561]/10 text-[#003561] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-[#003561]" />
            </div>
            <div>
              <span className="text-4xl lg:text-5xl font-black text-[#003561] tracking-tight">+30M</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Asociados en la Red</h3>
              <p className="text-xs text-slate-500 mt-1">Familias beneficiarias en cooperativas y mutuales de todo el país.</p>
            </div>
            <span className="text-xs font-bold text-[#00A3E0] flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> Cobertura familiar plena
            </span>
          </div>

          <div className="p-8 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#00A3E0]/40 transition-all flex flex-col justify-between gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#00658D] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6 text-[#00A3E0]" />
            </div>
            <div>
              <span className="text-4xl lg:text-5xl font-black text-[#00658D] tracking-tight">+20.000</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Cooperativas Productivas</h3>
              <p className="text-xs text-slate-500 mt-1">Organizaciones de trabajo, servicios y producción regional vinculadas.</p>
            </div>
            <span className="text-xs font-bold text-[#00A3E0] flex items-center gap-1">
              <Handshake className="w-4 h-4" /> Integración productiva
            </span>
          </div>

          <div className="p-8 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#00A3E0]/40 transition-all flex flex-col justify-between gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="text-4xl lg:text-5xl font-black text-[#003561] tracking-tight">+10.000</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Mutuales Asistenciales</h3>
              <p className="text-xs text-slate-500 mt-1">Entidades de salud, crédito y ayuda mutua con convenios homologados.</p>
            </div>
            <span className="text-xs font-bold text-[#00A3E0] flex items-center gap-1">
              <Verified className="w-4 h-4" /> Respaldo solidario
            </span>
          </div>

          <div className="p-8 rounded-3xl bg-white shadow-sm border border-slate-200/80 hover:border-[#00A3E0]/40 transition-all flex flex-col justify-between gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-[#003561]" />
            </div>
            <div>
              <span className="text-4xl lg:text-5xl font-black text-[#00658D] tracking-tight">100%</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Presencia Federal</h3>
              <p className="text-xs text-slate-500 mt-1">Las 6 grandes regiones argentinas activas con convenios homologados.</p>
            </div>
            <span className="text-xs font-bold text-[#00A3E0] flex items-center gap-1">
              <Compass className="w-4 h-4" /> De La Quiaca a Ushuaia
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LA RED HOTELERA SOLIDARIA: FILTROS & SHOWCASE                          */}
      {/* ========================================================================= */}
      <section className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" id="hoteles-red">
        
        {/* Cabecera con filtros por región */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
          <div>
            <span className="text-xs font-extrabold text-[#00A3E0] tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Red Hotelera Oficial</span>
            </span>
            <h2 className="text-3xl font-black text-[#003561] tracking-tight mt-1">
              Alojamientos Destacados de la Temporada
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tarifas públicas comparadas vs. Tarifa Bonificada por Convenio Mutualista.
            </p>
          </div>

          {/* Filtros Rápidos en Tabs Desktop */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {[
              { id: 'all', label: 'Todas las Regiones' },
              { id: 'NOA', label: 'NOA & Valles' },
              { id: 'Patagonia', label: 'Patagonia Lagos' },
              { id: 'NEA', label: 'NEA & Selva' },
              { id: 'Centro', label: 'Sierras Centro' },
              { id: 'Cuyo', label: 'Cuyo & Vinos' },
              { id: 'Buenos Aires', label: 'Bs. As. Costa' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCatalogFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCatalogFilter === tab.id
                    ? 'bg-[#003561] text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Hoteles en 3 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredHotels.slice(0, 6).map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        {/* Banner inferior de catálogo completo */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-100 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00A3E0] text-white flex items-center justify-center shrink-0 shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#003561] text-base">
                ¿Buscás otra ciudad, provincia o temporada específica?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Contamos con más de 480 establecimientos homologados en convenio mutualista en toda la Argentina.
              </p>
            </div>
          </div>

          <Link
            href="/hoteles"
            className="px-6 py-3.5 rounded-xl bg-[#003561] hover:bg-[#004C87] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Consultar Buscador Completo
          </Link>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. REGIONALIZACIÓN INAES: 6 REGIONES EN CARDS INTERACTIVAS                */}
      {/* ========================================================================= */}
      <section className="w-full bg-slate-100/70 py-20 border-y border-slate-200/80" id="regionalizacion">
        <div className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 text-[#00658D] font-bold text-xs uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-[#00A3E0]" />
              <span>Estructura Territorial Homologada</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#003561] tracking-tight">
              Presencia Federal en las 6 Regiones Argentinas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Cada nodo regional cuenta con una coordinación territorial que fiscaliza los establecimientos hoteleros, garantiza las tarifas acordadas y brinda asistencia presencial a los contingentes mutualistas.
            </p>
          </div>

          {/* 6 Regiones en Grid Desktop 3x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Región 1: NOA */}
            <div className="p-6 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex flex-col justify-between gap-4 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Mountain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región NOA</h3>
                    <span className="text-[11px] text-slate-500">Salta · Jujuy · Tucumán · Catamarca · Sgo. del Estero</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                  +2.8M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Circuitos de altura, Quebrada de Humahuaca, Salinas Grandes y Valles Calchaquíes. Gran red de hosterías cooperativas y turismo comunitario.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium text-[11px]">Coord: Dr. Carlos Albarracín</span>
                <Link href="/hoteles?region=NOA" className="text-[#00A3E0] font-bold hover:underline flex items-center gap-1">
                  <span>Ver Hoteles NOA</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Región 2: NEA */}
            <div className="p-6 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex flex-col justify-between gap-4 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Trees className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región NEA</h3>
                    <span className="text-[11px] text-slate-500">Misiones · Corrientes · Chaco · Formosa</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  +2.2M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Cataratas del Iguazú, Esteros del Iberá, Saltos del Moconá y el Impenetrable Chaqueño. Alojamientos en entornos de selva y ecoturismo.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium text-[11px]">Coord: Lic. Marina Godoy</span>
                <Link href="/hoteles?region=NEA" className="text-[#00A3E0] font-bold hover:underline flex items-center gap-1">
                  <span>Ver Hoteles NEA</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Región 3: Centro */}
            <div className="p-6 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex flex-col justify-between gap-4 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región Centro</h3>
                    <span className="text-[11px] text-slate-500">Córdoba · Santa Fe · Entre Ríos</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-sky-50 text-[#00658D] text-[10px] font-bold border border-sky-200">
                  +5.0M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Sierras de Punilla y Calamuchita, termas entrerrianas y corredor de la ribera del Paraná. Máxima concentración de complejos familiares.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium text-[11px]">Coord: Ing. Fernando Rossi</span>
                <Link href="/hoteles?region=Centro" className="text-[#00A3E0] font-bold hover:underline flex items-center gap-1">
                  <span>Ver Hoteles Centro</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Región 4: Cuyo */}
            <div className="p-6 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex flex-col justify-between gap-4 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Wine className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región Cuyo</h3>
                    <span className="text-[11px] text-slate-500">Mendoza · San Juan · San Luis</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 text-[10px] font-bold border border-purple-200">
                  +1.8M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Rutas del vino al pie de la Cordillera de los Andes, Cañón del Atuel, Talampaya y Merlo. Posadas rurales y cabañas de montaña.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium text-[11px]">Coord: Cra. Laura Morales</span>
                <Link href="/hoteles?region=Cuyo" className="text-[#00A3E0] font-bold hover:underline flex items-center gap-1">
                  <span>Ver Hoteles Cuyo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Región 5: Buenos Aires & CABA */}
            <div className="p-6 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex flex-col justify-between gap-4 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#003561] flex items-center justify-center">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región Buenos Aires</h3>
                    <span className="text-[11px] text-slate-500">CABA · Costa Atlántica · Tandil · Sierra de la Ventana</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#003561] text-[10px] font-bold border border-blue-200">
                  +12.0M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Mar del Plata, Villa Gesell, Pinamar y escapadas serranas. Hotelería sindical histórica y hoteles urbanos con tarifas asociativas.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium text-[11px]">Coord: Osvaldo Peirano</span>
                <Link href="/hoteles?region=Buenos%20Aires" className="text-[#00A3E0] font-bold hover:underline flex items-center gap-1">
                  <span>Ver Hoteles Bs. As.</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Región 6: Patagonia */}
            <div className="p-6 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all border border-slate-200/80 flex flex-col justify-between gap-4 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-800 flex items-center justify-center">
                    <Waves className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región Patagonia</h3>
                    <span className="text-[11px] text-slate-500">Río Negro · Neuquén · Chubut · Santa Cruz · TDF</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 text-[10px] font-bold border border-cyan-200">
                  +3.2M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Bariloche, San Martín de los Andes, Puerto Madryn, El Calafate y Ushuaia. Hosterías con vistas lacustres y glaciares.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium text-[11px]">Coord: Héctor Mansilla</span>
                <Link href="/hoteles?region=Patagonia" className="text-[#00A3E0] font-bold hover:underline flex items-center gap-1">
                  <span>Ver Hoteles Patagonia</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COMPARATIVA DE BENEFICIOS & CARNET DIGITAL 3D                           */}
      {/* ========================================================================= */}
      <section className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full" id="beneficios">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Columna Izquierda: Tabla comparativa de beneficios */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-[#00A3E0] tracking-wider uppercase">
                Transparencia Mutualista
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-[#003561] tracking-tight mt-1">
                ¿Por qué planificar tus viajes por medio de FEDETUR?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Eliminamos comisiones abusivas para trasladar todo el beneficio al trabajador y a la familia asociada, manteniendo estándares hoteleros de primer nivel.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm bg-white">
              <div className="grid grid-cols-12 bg-slate-50 p-4 text-xs font-extrabold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                <div className="col-span-6">Beneficio / Característica</div>
                <div className="col-span-3 text-center text-slate-400">Público General</div>
                <div className="col-span-3 text-center text-[#003561]">Afiliado FEDETUR</div>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                
                <div className="grid grid-cols-12 p-4 items-center">
                  <div className="col-span-6 font-bold text-slate-800 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-[#00A3E0]" />
                    <span>Tarifa bonificada en hospedaje</span>
                  </div>
                  <div className="col-span-3 text-center text-slate-400 font-medium">Tarifa 100%</div>
                  <div className="col-span-3 text-center text-[#003561] font-black bg-sky-50 py-1 rounded-lg">
                    Hasta 30% OFF
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 items-center">
                  <div className="col-span-6 font-bold text-slate-800 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#00A3E0]" />
                    <span>Financiación con MercadoPago</span>
                  </div>
                  <div className="col-span-3 text-center text-slate-400 font-medium">Con recargo estándar</div>
                  <div className="col-span-3 text-center text-[#003561] font-black bg-sky-50 py-1 rounded-lg">
                    Cuotas Bonificadas
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 items-center">
                  <div className="col-span-6 font-bold text-slate-800 flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#00A3E0]" />
                    <span>Carnet Digital Oficial y Voucher</span>
                  </div>
                  <div className="col-span-3 text-center text-slate-400 font-medium">No disponible</div>
                  <div className="col-span-3 text-center text-emerald-700 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instantáneo
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 items-center">
                  <div className="col-span-6 font-bold text-slate-800 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#00A3E0]" />
                    <span>Mesa de Ayuda Federal 24/7</span>
                  </div>
                  <div className="col-span-3 text-center text-slate-400 font-medium">Autogestión Web</div>
                  <div className="col-span-3 text-center text-[#003561] font-black bg-sky-50 py-1 rounded-lg">
                    Asesor Directo
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Columna Derecha: Mockup Carnet Digital Afiliado */}
          <div className="lg:col-span-5 flex flex-col items-center" id="carnet-seccion">
            <DigitalCarnet profile={demoProfile} />
            <p className="text-xs text-slate-500 mt-3 text-center">
              Presentá tu credencial digital desde tu smartphone al momento del check-in.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ENTIDADES EN CONVENIO ACTIVO                                           */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-16 border-y border-slate-200/80" id="entidades">
        <div className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-[#00A3E0] uppercase tracking-wider">
              Red Solidaria e Interinstitucional
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-[#003561] mt-1">
              Entidades en Convenio Activo
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Mutuales, federaciones y confederaciones asociadas que garantizan el acceso al turismo federal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col items-center text-center gap-1 hover:border-[#00A3E0] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#00A3E0] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Waves className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#003561]">Mutual SAMEEP</span>
              <span className="text-[10px] text-slate-500">Chaco · NEA</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col items-center text-center gap-1 hover:border-[#00A3E0] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#003561]">Mutual Capital</span>
              <span className="text-[10px] text-slate-500">Santiago del Estero</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col items-center text-center gap-1 hover:border-[#00A3E0] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#003561] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#003561]">Coop. Fe.co.vi.ma</span>
              <span className="text-[10px] text-slate-500">Buenos Aires</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col items-center text-center gap-1 hover:border-[#00A3E0] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#003561]">Mutual DECAM</span>
              <span className="text-[10px] text-slate-500">CABA & Federal</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col items-center text-center gap-1 hover:border-[#00A3E0] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#003561]">FEMMEVI Vivienda</span>
              <span className="text-[10px] text-slate-500">Mendoza · Cuyo</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col items-center text-center gap-1 hover:border-[#00A3E0] transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Trees className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#003561]">Gas y Petróleo</span>
              <span className="text-[10px] text-slate-500">Santa Cruz · Patagonia</span>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. MESA FEDERAL DE CONTACTO & ADHESIÓN                                    */}
      {/* ========================================================================= */}
      <section className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full" id="contacto-portal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Información Institucional & Avales */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[#00A3E0] font-bold text-xs uppercase tracking-wider mb-2">
                <Phone className="w-4 h-4" />
                <span>Atención Directa & Adhesión</span>
              </div>
              <h2 className="text-3xl font-black text-[#003561] tracking-tight">
                Contactate con la Mesa Federal FEDETUR
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                Ya sea para sumar tu complejo hotelero a la Red, homologar un convenio con tu mutual o cooperativa, o resolver dudas sobre tu reserva turística, nuestro equipo está a tu disposición.
              </p>
            </div>

            {/* Canales de comunicación directa */}
            <div className="flex flex-col gap-3.5 text-xs sm:text-sm">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#003561]/10 text-[#003561] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Correo Electrónico Institucional</span>
                  <span className="font-bold text-[#003561]">info@fedetur.ar · convenios@fedetur.ar</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00A3E0] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Mesa Federal de Atención</span>
                  <span className="font-bold text-[#003561]">+54 (11) 4382-9000 (Líneas Rotativas)</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Sede Central de la Federación</span>
                  <span className="font-bold text-[#003561]">Av. de Mayo 822, 4° Piso, CABA, Argentina</span>
                </div>
              </div>
            </div>

            {/* Sellos de confianza institucional INAES, CONAM, ODEMA */}
            <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col gap-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Avales y Homologaciones Oficiales
              </span>
              <div className="flex items-center justify-between gap-3 text-xs font-black text-[#003561] flex-wrap">
                <span className="px-3 py-1.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                  INAES 25450
                </span>
                <span className="px-3 py-1.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                  MIEMBRO CONAM
                </span>
                <span className="px-3 py-1.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                  ODEMA INTERNACIONAL
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Contacto Editorial */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-slate-200/80">
            <h3 className="text-2xl font-black text-[#003561] mb-2">
              Enviar Solicitud / Consulta
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Completá el siguiente formulario y un asesor federal se contactará en menos de 24 hs hábiles.
            </p>

            {contactSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-base">¡Mensaje Recibido con Éxito!</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Tu solicitud fue registrada en el sistema federal de FEDETUR. Un coordinador regional se pondrá en contacto al teléfono o correo proporcionado.
                </p>
                <button
                  type="button"
                  onClick={() => setContactSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Nombre y Apellido *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Roberto Sánchez"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#00A3E0] focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@entidad.ar"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#00A3E0] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+54 9 11 ..."
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#00A3E0] focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">Motivo de Contacto / Rol *</label>
                    <select
                      value={contactForm.role}
                      onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#00A3E0] focus:outline-none transition-all"
                    >
                      <option>Quiero inscribir mi Hotel como Prestador Oficial</option>
                      <option>Convenio institucional para mi Mutual / Cooperativa</option>
                      <option>Consulta sobre mi Reserva de Alojamiento</option>
                      <option>Gestión de Carnet Digital de Afiliado</option>
                      <option>Otra consulta o propuesta institucional</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Detalle de la Consulta o Establecimiento *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ingresá los datos de tu hotel (localidad, cantidad de plazas) o tu consulta institucional..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#00A3E0] focus:outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    defaultChecked
                    className="w-4 h-4 rounded text-[#00A3E0] focus:ring-[#00A3E0] border-slate-300"
                  />
                  <label htmlFor="consent" className="text-[11px] text-slate-500">
                    Acepto el tratamiento de mis datos de conformidad con la política de privacidad de FEDETUR.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full h-14 mt-2 rounded-xl bg-[#003561] hover:bg-[#004C87] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#003561]/25 active:scale-[0.99] transition-all"
                >
                  <Send className="w-4 h-4 text-sky-300" />
                  <span>Enviar Consulta a la Mesa Federal</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

    </main>
  );
}
