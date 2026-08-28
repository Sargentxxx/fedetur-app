'use client';

import React, { useState } from 'react';
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
  Phone,
  Mail,
  Send,
  Hotel as HotelIcon
} from 'lucide-react';
import { INITIAL_HOTELS, REGIONAL_DATA, AFFILIATED_ENTITIES, FEDETUR_INFO } from '@/lib/mockData';
import { HotelCard } from '@/components/HotelCard';
import { RegionBadge } from '@/components/RegionBadge';

export default function HomePage() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'NEA' | 'NOA' | 'Centro' | 'Cuyo' | 'Buenos Aires' | 'Patagonia'>('all');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedRegion) params.set('region', selectedRegion);
    if (guestsCount) params.set('guests', guestsCount);
    if (checkInDate) params.set('checkIn', checkInDate);
    if (checkOutDate) params.set('checkOut', checkOutDate);
    router.push(`/hoteles?${params.toString()}`);
  };

  const filteredHotels = activeTab === 'all' 
    ? INITIAL_HOTELS 
    : INITIAL_HOTELS.filter(h => h.region === activeTab);

  return (
    <main className="min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION INSTITUCIONAL                                            */}
      {/* ========================================================================= */}
      <section className="relative fedetur-gradient text-white pt-12 pb-24 lg:pt-20 lg:pb-36 overflow-hidden">
        {/* Background Decorative elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#AFED00_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-fedetur-lime/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-fedetur-pink/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* INAES Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-fedetur-lime shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Matrícula I.N.A.E.S. 25450 • Turismo Social & Solidario</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Viajar, en busca de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fedetur-lime via-yellow-300 to-fedetur-pink">
                uno mismo.
              </span>
            </h1>

            {/* Subhead text */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Somos la <strong>Red Federal</strong> que articula Entidades de la Economía Social y Solidaria (ESS) con servicios turísticos y hoteleros de calidad en toda la República Argentina. Tarifas bonificadas para asociados de mutuales y cooperativas.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/hoteles"
                className="px-6 py-3.5 rounded-2xl bg-fedetur-lime hover:bg-fedetur-lime-dark text-fedetur-dark font-black text-sm transition-all shadow-lg hover:shadow-fedetur-lime/20 flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explorar Hoteles & Destinos</span>
              </Link>
              <Link
                href="/afiliado/dashboard"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-fedetur-lime" />
                <span>Carnet Digital Afiliado</span>
              </Link>
              <Link
                href="/hotel/portal"
                className="px-4 py-3.5 rounded-2xl bg-transparent hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
              >
                ¿Sos Hotel? Registrate aquí &rarr;
              </Link>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* SEARCH BAR FLOTANTE (MOTOR DE RESERVAS)                              */}
          {/* ===================================================================== */}
          <div className="mt-12 lg:mt-16 bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 text-slate-900">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Selector de Región / Destino */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-fedetur-dark" />
                  <span>Destino / Región</span>
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-fedetur-lime focus:border-transparent"
                >
                  <option value="">Todas las Regiones del País</option>
                  <option value="NEA">Región NEA (Iguazú, Chaco, Misiones)</option>
                  <option value="NOA">Región NOA (Salta, Jujuy, Santiago del Estero)</option>
                  <option value="Centro">Región Centro (Córdoba, Santa Fe)</option>
                  <option value="Cuyo">Región Cuyo (Mendoza, San Juan)</option>
                  <option value="Buenos Aires">Región Buenos Aires (Costa Atlántica & CABA)</option>
                  <option value="Patagonia">Región Patagonia (Bariloche, Glaciares)</option>
                </select>
              </div>

              {/* Check-In */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-fedetur-dark" />
                  <span>Fecha de Ingreso</span>
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-fedetur-lime focus:border-transparent"
                />
              </div>

              {/* Check-Out & Huéspedes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-fedetur-dark" />
                  <span>Pasajeros</span>
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-fedetur-lime focus:border-transparent"
                >
                  <option value="1">1 Huésped</option>
                  <option value="2">2 Huéspedes (Pareja / Doble)</option>
                  <option value="3">3 Huéspedes</option>
                  <option value="4">4 Huéspedes (Grupo Familiar)</option>
                  <option value="5">5+ Huéspedes</option>
                </select>
              </div>

              {/* Botón Buscar */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-fedetur-dark hover:bg-fedetur-navy text-fedetur-lime font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Search className="w-4 h-4" />
                  <span>Buscar Disponibilidad</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS & ALCANCE FEDERAL DEL MUTUALISMO                                */}
      {/* ========================================================================= */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-3xl font-black text-fedetur-dark">{FEDETUR_INFO.stats.cooperativas}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Cooperativas</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-3xl font-black text-fedetur-dark">{FEDETUR_INFO.stats.mutuales}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Mutuales</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-3xl font-black text-emerald-700">{FEDETUR_INFO.stats.asociados}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Personas Asociadas</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-3xl font-black text-fedetur-dark">{FEDETUR_INFO.stats.cobertura}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Cobertura Nacional</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 col-span-2 md:col-span-1">
              <div className="text-3xl font-black text-fedetur-dark">{FEDETUR_INFO.stats.pbiContribution}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Aporte al PBI</div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CATÁLOGO DE HOTELES DESTACADOS CON DESCUENTO MUTUAL                   */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50" id="hoteles-destacados">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Red Hotelera Solidaria</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Alojamientos en todo el País
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Reservá online con hasta un 30% de descuento abonando con MercadoPago en cuotas.
              </p>
            </div>

            {/* Tabs de Filtro por Región */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {(['all', 'NEA', 'NOA', 'Centro', 'Cuyo', 'Buenos Aires', 'Patagonia'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-fedetur-dark text-fedetur-lime shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab === 'all' ? 'Ver Todos' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Hoteles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/hoteles"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-fedetur-dark hover:bg-fedetur-navy text-white font-black text-sm transition-all shadow-lg hover:shadow-xl"
            >
              <span>Ver Catálogo Completo de Hoteles</span>
              <ArrowRight className="w-4 h-4 text-fedetur-lime" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. REGIONALIZACIÓN INSTITUCIONAL FEDETUR                                 */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-y border-slate-200" id="regionales">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              🗺️ Presencia Federal en el 100% del Territorio
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Regionalización Institucional
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Aprobada por Resolución INAES para articular el turismo con las actividades y prestaciones comunitarias que generan las entidades en su zona de influencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONAL_DATA.map((reg) => (
              <div 
                key={reg.name}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:border-fedetur-lime hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <RegionBadge region={reg.name as any} />
                    <span className="text-[10px] font-bold text-slate-400">Coordinación Local</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    Región {reg.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mb-3">
                    {reg.provinces}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {reg.description}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-slate-500 bg-white p-3 rounded-2xl border border-slate-100 mb-4">
                    <div className="flex justify-between">
                      <span>Entidades estimadas:</span>
                      <strong className="text-slate-800">{reg.coops} / {reg.mutuales}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Asociados:</span>
                      <strong className="text-emerald-700">{reg.members}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Responsable Regional
                  </span>
                  <p className="text-xs font-bold text-fedetur-dark mt-0.5">
                    {reg.coordinator}
                  </p>
                  <Link
                    href={`/hoteles?region=${encodeURIComponent(reg.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-fedetur-dark hover:text-emerald-700 mt-3"
                  >
                    <span>Ver Hoteles en {reg.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ENTIDADES MUTUALES Y COOPERATIVAS ADHERIDAS                           */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white" id="entidades-adheridas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-fedetur-lime">
              La Fuerza de la Unión
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Entidades Adheridas a FEDETUR
            </h2>
            <p className="text-slate-300 text-sm">
              Mutuales y Cooperativas de todo el país articuladas en una sola red solidaria.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {AFFILIATED_ENTITIES.map((entity) => (
              <div
                key={entity.id}
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 transition-all text-center flex flex-col items-center justify-between"
              >
                <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center mb-3 shadow-md">
                  <img
                    src={entity.logo_url}
                    alt={entity.name}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      // Fallback icon si la imagen externa falla
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <Building2 className="w-8 h-8 text-fedetur-dark" />
                </div>
                <div className="font-bold text-xs text-white line-clamp-2">
                  {entity.name}
                </div>
                <div className="text-[10px] text-fedetur-lime mt-1 font-semibold">
                  {entity.province} • {entity.region}
                </div>
              </div>
            ))}
          </div>

          {/* Organismos Cooperativos Internacionales y Nacionales */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            <span className="font-bold text-white">Articulación con:</span>
            <span>I.N.A.E.S. (Instituto Nacional de Asociativismo)</span>
            <span>•</span>
            <span>C.O.N.A.M. (Confederación Nacional de Mutualidades)</span>
            <span>•</span>
            <span>O.D.E.M.A. (Organización de Entidades Mutuales de las Américas)</span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COMPARATIVA: AFILIADO VS NO AFILIADO                                  */}
      {/* ========================================================================= */}
      <section className="py-20 bg-fedetur-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-black text-slate-900">
              ¿Por qué viajar a través de FEDETUR?
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Transformamos el turismo en una herramienta accesible, transparente y con impacto comunitario directo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Visitante No Afiliado */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Público General
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Visitante / No Afiliado
                </h3>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Acceso al catálogo nacional de destinos y hoteles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Tarifas comerciales estándar de mostrador</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Consultas y soporte general</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/auth/registro"
                  className="w-full block text-center py-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-800 transition-colors"
                >
                  Afiliarme con mi Mutual o Cooperativa
                </Link>
              </div>
            </div>

            {/* Afiliado Mutual FEDETUR */}
            <div className="bg-fedetur-dark text-white rounded-3xl p-8 border-2 border-fedetur-lime shadow-2xl relative flex flex-col justify-between">
              <div className="absolute -top-3.5 right-6 bg-fedetur-lime text-fedetur-dark px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider">
                Exclusivo Afiliados
              </div>

              <div>
                <span className="text-xs font-bold text-fedetur-lime uppercase tracking-wider block mb-1">
                  Socios y Cooperativistas
                </span>
                <h3 className="text-xl font-bold text-white mb-4">
                  Afiliado Red FEDETUR
                </h3>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-fedetur-lime shrink-0" />
                    <strong className="text-white">Hasta un 30% de descuento</strong> en todos los hoteles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-fedetur-lime shrink-0" />
                    <span>Carnet Digital con QR oficial para check-in prioritario</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-fedetur-lime shrink-0" />
                    <span>Pagos protegidos con MercadoPago en cuotas sin interés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-fedetur-lime shrink-0" />
                    <span>Vouchers oficiales con confirmación inmediata</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/auth/registro"
                  className="w-full block text-center py-3 rounded-xl bg-fedetur-lime hover:bg-fedetur-lime-dark font-black text-xs text-fedetur-dark transition-all shadow-md"
                >
                  Ingresar como Afiliado
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FORMULARIO DE CONTACTO INSTITUCIONAL                                  */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white" id="contacto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-fedetur-sand rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-3xl font-black text-slate-900">
                Contacto Directo FEDETUR
              </h2>
              <p className="text-xs text-slate-700 mt-2">
                Escribinos para convenios institucionales, adhesión de hoteles o consultas sobre reservas a <strong>info@fedetur.ar</strong>
              </p>
            </div>

            {contactSubmitted ? (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-xs">
                  Tu consulta fue registrada por el equipo de FEDETUR. Nos comunicaremos a la brevedad.
                </p>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }} 
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Teléfono / Celular</label>
                    <input
                      type="tel"
                      placeholder="+54 9 11 ..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Entidad (Mutual o Cooperativa)</label>
                    <input
                      type="text"
                      placeholder="Nombre de tu entidad (opcional)"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mensaje o Consulta</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Escribe aquí tu consulta para el Consejo de FEDETUR..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-fedetur-dark hover:bg-fedetur-navy text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4 text-fedetur-lime" />
                  <span>Enviar Consulta a FEDETUR</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

    </main>
  );
}
