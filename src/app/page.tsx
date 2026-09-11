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
import { EntidadesCarousel } from '@/components/EntidadesCarousel';

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
        {/* Carrusel de 5 Fondos Panorámicos Oficiales en Alta Definición 16:9 */}
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

          {/* Viñeta cinematográfica dual con tonos profundos para máximo contraste y nitidez visual */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001427] via-black/30 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001427]/95 via-[#001427]/45 to-transparent" />
        </div>

        {/* Contenido Principal Hero en Container 1440px */}
        <div className="relative z-10 w-full max-w-portal mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col justify-between">
          
          <div className="max-w-3xl space-y-5">
            {/* Destino Recomendado Badge Dinámico según slide actual */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-xl border border-amber-400/30 text-white shadow-xl transition-all duration-300">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_#f59e0b]" />
              <span className="tracking-wider text-amber-300 text-xs font-black uppercase">
                {HERO_SLIDES[currentSlide].badge}
              </span>
              <span className="text-white/30">|</span>
              <span className="text-xs text-white/95 font-medium">
                {HERO_SLIDES[currentSlide].season}
              </span>
            </div>

            {/* Titular Editorial de Alto Impacto */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
              Viajar, en busca <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-200 to-white">
                de uno mismo y de nuestra tierra.
              </span>
            </h1>

            {/* Bajada institucional y turística */}
            <p className="text-base sm:text-lg text-white/95 font-normal leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              La Red Federal que articula a más de <strong>30 millones de asociados</strong> de mutuales y cooperativas con servicios de hotelería de excelencia y tarifas bonificadas en las 24 provincias argentinas.
            </p>

            {/* Controles interactivos del carrusel: selector de 5 destinos y flechas (Touch targets >= 44px) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 shadow-xl">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Anterior destino turístico"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-white/20 text-white/90 hover:text-white active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1 px-1">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Ver destino ${slide.title}`}
                      className="min-w-[28px] min-h-[44px] flex items-center justify-center px-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded-lg"
                    >
                      <span
                        className={`h-2 rounded-full transition-all duration-300 block ${
                          idx === currentSlide
                            ? 'w-8 bg-amber-400 shadow-[0_0_12px_#f59e0b]'
                            : 'w-2.5 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Siguiente destino turístico"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-white/20 text-white/90 hover:text-white active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Selector directo de región con texto (Toque accesible) */}
              <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                      idx === currentSlide
                        ? 'bg-amber-400 text-slate-950 border border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] font-black'
                        : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70 border border-white/15 backdrop-blur-md'
                    }`}
                  >
                    {slide.region}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats Pills en el Hero con distintivos cromáticos */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-sky-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-sky-400/40 text-sky-100 shadow-sm">
                <HotelIcon className="w-4 h-4 text-sky-300" />
                <span><strong>+480</strong> Hoteles Adheridos</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-amber-400/50 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                <Percent className="w-4 h-4 text-amber-300" />
                <span>Hasta <strong>30% de Ahorro</strong> Directo</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-400/40 text-emerald-100 shadow-sm">
                <CreditCard className="w-4 h-4 text-emerald-300" />
                <span><strong>6 cuotas</strong> con MercadoPago</span>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* CONSOLA FLOTANTE MULTICAMPO DE BÚSQUEDA (BLANCO SÓLIDO ALTO CONTRASTE) */}
          {/* ===================================================================== */}
          <div
            className="mt-10 lg:mt-14 w-full bg-white rounded-3xl p-6 lg:p-7 shadow-[0_30px_70px_rgba(0,0,0,0.5)] border-2 border-slate-200/90 relative overflow-hidden z-20"
            style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
          >
            {/* Barra superior de acento radiante */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 via-amber-400 to-[#003561]" />
            
            {/* Pestañas superiores de la consola de búsqueda (Toque táctil min 44px) */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-200 flex-wrap gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveSearchTab('hoteles')}
                  className={`min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#003561] focus-visible:outline-none ${
                    activeSearchTab === 'hoteles'
                      ? 'bg-gradient-to-r from-[#001D38] to-[#003561] text-white shadow-lg border border-sky-400/40'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200'
                  }`}
                >
                  <Bed className="w-4 h-4 text-sky-400 stroke-[2.5]" />
                  <span>Hoteles & Complejos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSearchTab('paquetes')}
                  className={`min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#003561] focus-visible:outline-none ${
                    activeSearchTab === 'paquetes'
                      ? 'bg-gradient-to-r from-[#001D38] to-[#003561] text-white shadow-lg border border-sky-400/40'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200'
                  }`}
                >
                  <Compass className="w-4 h-4 text-sky-400 stroke-[2.5]" />
                  <span>Paquetes Federales</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSearchTab('excursiones')}
                  className={`min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#003561] focus-visible:outline-none ${
                    activeSearchTab === 'excursiones'
                      ? 'bg-gradient-to-r from-[#001D38] to-[#003561] text-white shadow-lg border border-sky-400/40'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200'
                  }`}
                >
                  <Mountain className="w-4 h-4 text-sky-400 stroke-[2.5]" />
                  <span>Excursiones Solidarias</span>
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 font-black text-xs shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 stroke-[2.5]" />
                <span>Convenios Activos INAES · Con Vouchers Inmediatos</span>
              </div>
            </div>

            {/* Campos de búsqueda en grilla horizontal */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              
              {/* Campo 1: Destino o Región */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="search-region" className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5" style={{ color: '#0f172a' }}>
                  <MapPin className="w-3.5 h-3.5 text-[#003561] stroke-[2.5]" />
                  <span>Destino / Región</span>
                </label>
                <select
                  id="search-region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  style={{ backgroundColor: '#ffffff', color: '#020617' }}
                  className="w-full h-12 px-3.5 rounded-xl bg-white border-2 border-slate-300 text-slate-950 font-black text-xs focus:ring-2 focus:ring-[#003561] focus:border-[#003561] focus:outline-none hover:border-slate-400 transition-all cursor-pointer shadow-xs"
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
                <label htmlFor="search-stay-type" className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5" style={{ color: '#0f172a' }}>
                  <Building className="w-3.5 h-3.5 text-[#003561] stroke-[2.5]" />
                  <span>Tipo de Alojamiento</span>
                </label>
                <select
                  id="search-stay-type"
                  value={stayType}
                  onChange={(e) => setStayType(e.target.value)}
                  style={{ backgroundColor: '#ffffff', color: '#020617' }}
                  className="w-full h-12 px-3.5 rounded-xl bg-white border-2 border-slate-300 text-slate-950 font-black text-xs focus:ring-2 focus:ring-[#003561] focus:border-[#003561] focus:outline-none hover:border-slate-400 transition-all cursor-pointer shadow-xs"
                >
                  <option value="todos">Hoteles y Hosterías Mutuas</option>
                  <option value="resort">Resorts de Campo & Sierras</option>
                  <option value="cabanas">Cabañas & Apart Hoteles</option>
                  <option value="spa">Hoteles Termales & Spa</option>
                </select>
              </div>

              {/* Campo 3: Fechas */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="search-checkin-date" className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5" style={{ color: '#0f172a' }}>
                  <Calendar className="w-3.5 h-3.5 text-[#003561] stroke-[2.5]" />
                  <span>Fechas de Estadía</span>
                </label>
                <input
                  id="search-checkin-date"
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  style={{ backgroundColor: '#ffffff', color: '#020617' }}
                  className="w-full h-12 px-3.5 rounded-xl bg-white border-2 border-slate-300 text-slate-950 font-black text-xs focus:ring-2 focus:ring-[#003561] focus:border-[#003561] focus:outline-none hover:border-slate-400 transition-all cursor-pointer shadow-xs"
                />
              </div>

              {/* Campo 4: Huéspedes / Tarifa Mutual */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="search-guests-count" className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5" style={{ color: '#0f172a' }}>
                  <Users className="w-3.5 h-3.5 text-[#003561] stroke-[2.5]" />
                  <span>Pasajeros / Mutual</span>
                </label>
                <select
                  id="search-guests-count"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  style={{ backgroundColor: '#ffffff', color: '#020617' }}
                  className="w-full h-12 px-3.5 rounded-xl bg-white border-2 border-slate-300 text-slate-950 font-black text-xs focus:ring-2 focus:ring-[#003561] focus:border-[#003561] focus:outline-none hover:border-slate-400 transition-all cursor-pointer shadow-xs"
                >
                  <option value="1">1 Adulto · Afiliado</option>
                  <option value="2">2 Adultos (Tarifa Bonificada)</option>
                  <option value="3">Familia (2 Adultos + Menores)</option>
                  <option value="5">Grupo Cooperativo (5+ pers.)</option>
                </select>
              </div>

              {/* Campo 5: Botón de Búsqueda con Solar Gold y Resplandor */}
              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  <Search className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>Buscar Alojamientos</span>
                </button>
              </div>

            </form>

            {/* Checkbox de beneficio mutual con alto contraste garantizado */}
            <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <label htmlFor="apply-mutual-discount" className="flex items-center gap-2.5 cursor-pointer select-none py-1">
                <input
                  id="apply-mutual-discount"
                  type="checkbox"
                  checked={applyMutualDiscount}
                  onChange={(e) => setApplyMutualDiscount(e.target.checked)}
                  className="w-4 h-4 rounded text-[#003561] focus:ring-[#003561] border-slate-400 cursor-pointer"
                />
                <span className="font-extrabold text-slate-950 text-xs sm:text-sm" style={{ color: '#020617' }}>
                  Aplicar tarifa institucional de Mutual / Cooperativa asociada
                </span>
                <span className="text-[#003561] font-black bg-sky-100 border border-sky-300 px-2.5 py-0.5 rounded-lg text-xs" style={{ color: '#003561', backgroundColor: '#e0f2fe' }}>
                  Hasta 30% OFF directo
                </span>
              </label>

              <div className="flex items-center gap-5 text-xs font-bold" style={{ color: '#334155' }}>
                <span className="inline-flex items-center gap-1.5 text-slate-800">
                  <Lock className="w-3.5 h-3.5 text-emerald-700 stroke-[2.5]" /> Cancelación flexible
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-800">
                  <QrCode className="w-3.5 h-3.5 text-[#003561] stroke-[2.5]" /> Canje con Carnet Digital
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
          
          {/* Card 1: Para Huéspedes y Afiliados con Micro-resplandor */}
          <div className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-sky-50/50 p-8 shadow-xl border border-sky-200/70 flex flex-col justify-between gap-6 group hover:border-[#00A3E0]/70 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
            {/* Orbe ambiental decorativo */}
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-sky-400/10 blur-2xl pointer-events-none group-hover:bg-sky-400/20 transition-all" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#003561] flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-[#00A3E0]" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs tracking-wider uppercase shadow-xs">
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

            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between relative z-10">
              <Link
                href="/hoteles"
                className="inline-flex items-center gap-2 text-[#003561] hover:text-[#00A3E0] font-black text-xs transition-colors group/link"
              >
                <span>Explorar catálogo de alojamientos</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/afiliado/dashboard"
                className="px-4 py-2 rounded-xl bg-[#003561] hover:bg-[#004C87] text-white text-xs font-black transition-all shadow-md hover:shadow-lg hover:shadow-[#003561]/25"
              >
                Mi Carnet Digital
              </Link>
            </div>
          </div>

          {/* Card 2: Para Hoteleros & Dueños de Complejos (Deep Navy Luxury) */}
          <div className="rounded-3xl bg-gradient-to-br from-[#001427] via-[#002244] to-[#003561] p-8 shadow-2xl text-white flex flex-col justify-between gap-6 relative overflow-hidden border border-sky-400/30 hover:border-sky-300/60 hover:shadow-sky-950/50 hover:-translate-y-1.5 transition-all duration-300 group">
            {/* Orbe decorativo */}
            <div className="absolute -right-8 -bottom-8 w-52 h-52 rounded-full bg-sky-400/20 blur-3xl pointer-events-none group-hover:bg-sky-400/30 transition-all" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold backdrop-blur-md border border-white/15 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6 text-sky-300" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-sky-400/20 text-sky-200 border border-sky-400/40 font-black text-xs tracking-wider uppercase shadow-xs">
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
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Sin comisiones abusivas de agencias OTA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Cobro asegurado y liquidación transparente</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Sello de Calidad y Sostenibilidad INAES</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Alta directa en 48 horas hábiles</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between relative z-10">
              <span className="text-xs text-sky-200/80 font-medium">
                Red Federal de Prestadores Oficiales
              </span>
              <Link
                href="/hotel/portal"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all inline-flex items-center gap-2 group/btn"
              >
                <span>Inscribir mi Hotel</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LA RED HOTELERA SOLIDARIA: FILTROS & SHOWCASE                          */}
      {/* ========================================================================= */}
      <section className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full" id="hoteles-red">
        
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
                className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#003561] focus-visible:outline-none flex items-center justify-center ${
                  activeCatalogFilter === tab.id
                    ? 'bg-[#003561] text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
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
      {/* 4. BENTO GRID DE IMPACTO FEDERAL MUTUAL (DEEP FEDERAL NAVY AMBIENT)       */}
      {/* ========================================================================= */}
      <section className="w-full bg-gradient-to-b from-[#001222] via-[#001D38] to-[#001427] text-white py-24 relative overflow-hidden mt-8">
        {/* Orbes ambientales de resplandor */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-sky-300 font-extrabold text-xs uppercase tracking-wider mb-2 bg-sky-950/80 border border-sky-400/30 px-3 py-1 rounded-full">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>Economía Social & Solidaria en Acción</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                El mayor entramado de turismo asociativo del país
              </h2>
              <p className="text-sm sm:text-base text-sky-100/80 mt-2 leading-relaxed">
                Coordinamos la capacidad hotelera y los programas de turismo de entidades mutualistas con presencia real en cada una de las 24 jurisdicciones argentinas.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-sky-200 text-xs font-bold border border-white/15 backdrop-blur-md">
                Resolución INAES 25450
              </span>
              <span className="px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold border border-amber-400/30 backdrop-blur-md">
                Auditado Período 2025/2026
              </span>
            </div>
          </div>

          {/* Bento Grid 4 columnas en Cristal Ahumado con Resplandor */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-sky-400/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-sky-300" />
              </div>
              <div>
                <span className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-sky-300 tracking-tight">+30M</span>
                <h3 className="text-base font-bold text-white mt-1">Asociados en la Red</h3>
                <p className="text-xs text-sky-200/70 mt-1">Familias beneficiarias en cooperativas y mutuales de todo el país.</p>
              </div>
              <span className="text-xs font-extrabold text-sky-300 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> Cobertura familiar plena
              </span>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-sky-400/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <span className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-sky-300 tracking-tight">+20.000</span>
                <h3 className="text-base font-bold text-white mt-1">Cooperativas Productivas</h3>
                <p className="text-xs text-sky-200/70 mt-1">Organizaciones de trabajo, servicios y producción regional vinculadas.</p>
              </div>
              <span className="text-xs font-extrabold text-cyan-300 flex items-center gap-1">
                <Handshake className="w-4 h-4" /> Integración productiva
              </span>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-200 tracking-tight">+10.000</span>
                <h3 className="text-base font-bold text-white mt-1">Mutuales Asistenciales</h3>
                <p className="text-xs text-sky-200/70 mt-1">Entidades de salud, crédito y ayuda mutua con convenios homologados.</p>
              </div>
              <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1">
                <Verified className="w-4 h-4" /> Respaldo solidario
              </span>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <span className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-sky-200 tracking-tight">100%</span>
                <h3 className="text-base font-bold text-white mt-1">Presencia Federal</h3>
                <p className="text-xs text-sky-200/70 mt-1">Las 6 grandes regiones argentinas activas con convenios homologados.</p>
              </div>
              <span className="text-xs font-extrabold text-emerald-300 flex items-center gap-1">
                <Compass className="w-4 h-4" /> De La Quiaca a Ushuaia
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. REGIONALIZACIÓN INAES: 6 REGIONES EN CARDS TEMÁTICAS INTERACTIVAS      */}
      {/* ========================================================================= */}
      <section className="w-full bg-gradient-to-b from-[#F3F6FA] via-[#E8F0F8] to-[#F3F6FA] py-24 border-y border-slate-200" id="regionalizacion">
        <div className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 text-sky-800 font-black text-xs uppercase tracking-wider mb-2 bg-sky-100/90 border border-sky-300 px-3.5 py-1 rounded-full shadow-xs">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>Estructura Territorial Homologada</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#003561] tracking-tight">
              Presencia Federal en las 6 Regiones Argentinas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Cada nodo regional cuenta con una coordinación territorial que fiscaliza los establecimientos hoteleros, garantiza las tarifas acordadas y brinda asistencia presencial a los contingentes mutualistas.
            </p>
          </div>

          {/* 6 Regiones en Grid Desktop 3x2 con Identidad Temática Única */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            
            {/* Región 1: NOA (Ocre & Ámbar Andino) */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-amber-50/50 to-orange-50/30 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-amber-300/80 hover:border-amber-500 flex flex-col justify-between gap-5 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-amber-400/20 transition-all" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300/80 text-amber-800 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Mountain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región NOA</h3>
                    <span className="text-[11px] text-amber-900/70 font-semibold">Salta · Jujuy · Tucumán · Catamarca · Sgo.</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-900 text-[10px] font-black border border-amber-400/50 shadow-xs">
                  +2.8M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium relative z-10">
                Circuitos de altura, Quebrada de Humahuaca, Salinas Grandes y Valles Calchaquíes. Gran red de hosterías cooperativas y turismo comunitario.
              </p>
              <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs relative z-10">
                <span className="text-slate-600 font-semibold text-[11px]">Coord: Dr. Carlos Albarracín</span>
                <Link href="/hoteles?region=NOA" className="text-amber-800 hover:text-amber-950 font-black flex items-center gap-1 group/btn">
                  <span>Ver Hoteles NOA</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Región 2: NEA (Selva Esmeralda Subtropical) */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/30 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-emerald-300/80 hover:border-emerald-500 flex flex-col justify-between gap-5 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-400/20 transition-all" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300/80 text-emerald-800 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Trees className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región NEA</h3>
                    <span className="text-[11px] text-emerald-900/70 font-semibold">Misiones · Corrientes · Chaco · Formosa</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-900 text-[10px] font-black border border-emerald-400/50 shadow-xs">
                  +2.2M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium relative z-10">
                Cataratas del Iguazú, Esteros del Iberá, Saltos del Moconá y el Impenetrable Chaqueño. Alojamientos en entornos de selva y ecoturismo.
              </p>
              <div className="pt-3 border-t border-emerald-200/60 flex items-center justify-between text-xs relative z-10">
                <span className="text-slate-600 font-semibold text-[11px]">Coord: Lic. Marina Godoy</span>
                <Link href="/hoteles?region=NEA" className="text-emerald-800 hover:text-emerald-950 font-black flex items-center gap-1 group/btn">
                  <span>Ver Hoteles NEA</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Región 3: Centro (Sierras & Cielo Azul) */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-sky-50/50 to-blue-50/30 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-sky-300/80 hover:border-sky-500 flex flex-col justify-between gap-5 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-sky-400/20 transition-all" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-300/80 text-sky-800 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región Centro</h3>
                    <span className="text-[11px] text-sky-950/70 font-semibold">Córdoba · Santa Fe · Entre Ríos</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-950 text-[10px] font-black border border-sky-400/50 shadow-xs">
                  +5.0M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium relative z-10">
                Sierras de Punilla y Calamuchita, termas entrerrianas y corredor de la ribera del Paraná. Máxima concentración de complejos familiares.
              </p>
              <div className="pt-3 border-t border-sky-200/60 flex items-center justify-between text-xs relative z-10">
                <span className="text-slate-600 font-semibold text-[11px]">Coord: Ing. Fernando Rossi</span>
                <Link href="/hoteles?region=Centro" className="text-sky-800 hover:text-sky-950 font-black flex items-center gap-1 group/btn">
                  <span>Ver Hoteles Centro</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Región 4: Cuyo (Vino & Cordillera Andes) */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-purple-50/50 to-rose-50/30 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-purple-300/80 hover:border-purple-500 flex flex-col justify-between gap-5 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-purple-400/20 transition-all" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-300/80 text-purple-800 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Wine className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región Cuyo</h3>
                    <span className="text-[11px] text-purple-950/70 font-semibold">Mendoza · San Juan · San Luis</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-950 text-[10px] font-black border border-purple-400/50 shadow-xs">
                  +1.8M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium relative z-10">
                Rutas del vino al pie de la Cordillera de los Andes, Cañón del Atuel, Talampaya y Merlo. Posadas rurales y cabañas de montaña.
              </p>
              <div className="pt-3 border-t border-purple-200/60 flex items-center justify-between text-xs relative z-10">
                <span className="text-slate-600 font-semibold text-[11px]">Coord: Cra. Laura Morales</span>
                <Link href="/hoteles?region=Cuyo" className="text-purple-800 hover:text-purple-950 font-black flex items-center gap-1 group/btn">
                  <span>Ver Hoteles Cuyo</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Región 5: Buenos Aires & CABA (Atlántica & Metropolitana) */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-blue-300/80 hover:border-blue-500 flex flex-col justify-between gap-5 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-blue-400/20 transition-all" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300/80 text-[#003561] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región Buenos Aires</h3>
                    <span className="text-[11px] text-blue-950/70 font-semibold">CABA · Costa Atlántica · Tandil · Sierras</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-950 text-[10px] font-black border border-blue-400/50 shadow-xs">
                  +12.0M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium relative z-10">
                Mar del Plata, Villa Gesell, Pinamar y escapadas serranas. Hotelería sindical histórica y hoteles urbanos con tarifas asociativas.
              </p>
              <div className="pt-3 border-t border-blue-200/60 flex items-center justify-between text-xs relative z-10">
                <span className="text-slate-600 font-semibold text-[11px]">Coord: Osvaldo Peirano</span>
                <Link href="/hoteles?region=Buenos%20Aires" className="text-blue-800 hover:text-blue-950 font-black flex items-center gap-1 group/btn">
                  <span>Ver Hoteles Bs. As.</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Región 6: Patagonia (Glaciares & Lagos Azules) */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-white via-cyan-50/50 to-sky-50/30 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-cyan-300/80 hover:border-cyan-500 flex flex-col justify-between gap-5 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-400/20 transition-all" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-300/80 text-cyan-800 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Waves className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#003561]">Región Patagonia</h3>
                    <span className="text-[11px] text-cyan-950/70 font-semibold">Río Negro · Neuquén · Chubut · Santa Cruz · TDF</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-950 text-[10px] font-black border border-cyan-400/50 shadow-xs">
                  +3.2M Socios
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium relative z-10">
                Bariloche, San Martín de los Andes, Puerto Madryn, El Calafate y Ushuaia. Hosterías con vistas lacustres y glaciares.
              </p>
              <div className="pt-3 border-t border-cyan-200/60 flex items-center justify-between text-xs relative z-10">
                <span className="text-slate-600 font-semibold text-[11px]">Coord: Héctor Mansilla</span>
                <Link href="/hoteles?region=Patagonia" className="text-cyan-800 hover:text-cyan-950 font-black flex items-center gap-1 group/btn">
                  <span>Ver Hoteles Patagonia</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COMPARATIVA DE BENEFICIOS & CARNET DIGITAL 3D                           */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 6. COMPARATIVA DE BENEFICIOS & CARNET DIGITAL 3D                           */}
      {/* ========================================================================= */}
      <section className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full" id="beneficios">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Tabla comparativa de beneficios */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-xs font-black text-[#00658D] tracking-wider uppercase bg-sky-100/90 border border-sky-300 px-3.5 py-1 rounded-full shadow-xs">
                Transparencia Mutualista
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-[#003561] tracking-tight mt-3">
                ¿Por qué planificar tus viajes por medio de FEDETUR?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                Eliminamos intermediarios y comisiones abusivas para trasladar todo el beneficio al trabajador y a la familia asociada, manteniendo estándares hoteleros de primer nivel.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/90 overflow-hidden shadow-xl bg-white">
              <div className="grid grid-cols-12 bg-[#001D38] text-white p-4.5 text-xs font-black uppercase tracking-wider border-b border-white/10">
                <div className="col-span-6 text-sky-200">Beneficio / Característica</div>
                <div className="col-span-3 text-center text-slate-300">Público General</div>
                <div className="col-span-3 text-center text-amber-300 font-black">Afiliado FEDETUR</div>
              </div>

              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                
                <div className="grid grid-cols-12 p-4 items-center hover:bg-sky-50/40 transition-colors">
                  <div className="col-span-6 font-bold text-slate-800 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-[#00A3E0]" />
                    <span>Tarifa bonificada en hospedaje</span>
                  </div>
                  <div className="col-span-3 text-center text-slate-600 font-medium">Tarifa 100%</div>
                  <div className="col-span-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-xl bg-amber-400/20 text-amber-950 font-black border border-amber-400/50 shadow-xs">
                      Hasta 30% OFF
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 items-center hover:bg-sky-50/40 transition-colors">
                  <div className="col-span-6 font-bold text-slate-800 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#00A3E0]" />
                    <span>Financiación con MercadoPago</span>
                  </div>
                  <div className="col-span-3 text-center text-slate-600 font-medium">Con recargo estándar</div>
                  <div className="col-span-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-xl bg-sky-500/15 text-[#003561] font-black border border-sky-400/40 shadow-xs">
                      Cuotas Bonificadas
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 items-center hover:bg-sky-50/40 transition-colors">
                  <div className="col-span-6 font-bold text-slate-800 flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#00A3E0]" />
                    <span>Carnet Digital Oficial y Voucher</span>
                  </div>
                  <div className="col-span-3 text-center text-slate-600 font-medium">No disponible</div>
                  <div className="col-span-3 text-center text-emerald-800 font-black flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instantáneo
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4 items-center hover:bg-sky-50/40 transition-colors">
                  <div className="col-span-6 font-bold text-slate-800 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#00A3E0]" />
                    <span>Mesa de Ayuda Federal 24/7</span>
                  </div>
                  <div className="col-span-3 text-center text-slate-600 font-medium">Autogestión Web</div>
                  <div className="col-span-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-900 font-black border border-emerald-400/40 shadow-xs">
                      Asesor Directo
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Columna Derecha: Mockup Carnet Digital Afiliado con Resplandor Backlight */}
          <div className="lg:col-span-5 flex flex-col items-center relative" id="carnet-seccion">
            {/* Resplandor ambiental de fondo */}
            <div className="absolute -inset-6 bg-gradient-to-r from-sky-400/25 via-amber-400/20 to-sky-500/25 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
            
            <DigitalCarnet profile={demoProfile} />
            <p className="text-xs text-slate-500 mt-4 text-center font-medium">
              Presentá tu credencial digital desde tu smartphone al momento del check-in.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ENTIDADES ADHERIDAS: CARRUSEL OFICIAL CON LOGOS REALES                 */}
      {/* ========================================================================= */}
      <EntidadesCarousel />

      {/* ========================================================================= */}
      {/* 8. MESA FEDERAL DE CONTACTO & ADHESIÓN                                    */}
      {/* ========================================================================= */}
      <section className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full" id="contacto-portal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Información Institucional en Deep Federal Navy */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#001427] via-[#001D38] to-[#002244] p-8 lg:p-10 text-white shadow-2xl border border-sky-400/30 relative overflow-hidden flex flex-col justify-between gap-8">
            {/* Orbe decorativo */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-sky-300 font-black text-xs uppercase tracking-wider mb-2 bg-sky-950/80 border border-sky-400/30 px-3 py-1 rounded-full shadow-xs">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Atención Directa & Adhesión</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight mt-2">
                Contactate con la Mesa Federal FEDETUR
              </h2>
              <p className="text-xs sm:text-sm text-sky-100/85 mt-3 leading-relaxed font-medium">
                Ya sea para sumar tu complejo hotelero a la Red, homologar un convenio con tu mutual o cooperativa, o resolver dudas sobre tu reserva turística, nuestro equipo está a tu disposición.
              </p>
            </div>

            {/* Canales de comunicación directa en cristal */}
            <div className="flex flex-col gap-3.5 text-xs sm:text-sm relative z-10">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-xs text-white hover:bg-white/15 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-sky-300/80 font-bold uppercase">Correo Electrónico Institucional</span>
                  <span className="font-bold text-white">info@fedetur.ar · convenios@fedetur.ar</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-xs text-white hover:bg-white/15 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-sky-300/80 font-bold uppercase">Mesa Federal de Atención</span>
                  <span className="font-bold text-white">+54 (11) 4382-9000 (Líneas Rotativas)</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-xs text-white hover:bg-white/15 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-amber-300/80 font-bold uppercase">Sede Central de la Federación</span>
                  <span className="font-bold text-white">Av. de Mayo 822, 4° Piso, CABA, Argentina</span>
                </div>
              </div>
            </div>

            {/* Sellos de confianza institucional INAES, CONAM, ODEMA */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3 relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300">
                Avales y Homologaciones Oficiales
              </span>
              <div className="flex items-center justify-between gap-3 text-xs font-black text-white flex-wrap">
                <span className="px-3 py-1.5 bg-white/10 rounded-xl border border-white/15 shadow-xs">
                  INAES 25450
                </span>
                <span className="px-3 py-1.5 bg-white/10 rounded-xl border border-white/15 shadow-xs">
                  MIEMBRO CONAM
                </span>
                <span className="px-3 py-1.5 bg-white/10 rounded-xl border border-white/15 shadow-xs">
                  ODEMA INTERNACIONAL
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Contacto Editorial */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-2xl border border-slate-200 relative overflow-hidden">
            <h3 className="text-2xl font-black text-[#003561] mb-2">
              Enviar Solicitud / Consulta
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 font-medium">
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
                    <label htmlFor="contact-name" className="text-xs font-bold text-slate-700">Nombre y Apellido *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Ej: Roberto Sánchez"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold text-slate-700">Correo Electrónico *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="ejemplo@entidad.ar"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-bold text-slate-700">Teléfono / WhatsApp</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+54 9 11 ..."
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-role" className="text-xs font-bold text-slate-700">Motivo de Contacto / Rol *</label>
                    <select
                      id="contact-role"
                      value={contactForm.role}
                      onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus:outline-none transition-all"
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
                  <label htmlFor="contact-message" className="text-xs font-bold text-slate-700">Detalle de la Consulta o Establecimiento *</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Ingresá los datos de tu hotel (localidad, cantidad de plazas) o tu consulta institucional..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus:outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    defaultChecked
                    className="w-4 h-4 rounded text-[#0EA5E9] focus-visible:ring-2 focus-visible:ring-[#0EA5E9] border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-[11px] text-slate-600 font-medium cursor-pointer select-none">
                    Acepto el tratamiento de mis datos de conformidad con la política de privacidad de FEDETUR.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full h-14 mt-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus:outline-none transition-all"
                >
                  <Send className="w-4 h-4 text-slate-950 stroke-[2.5]" />
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
