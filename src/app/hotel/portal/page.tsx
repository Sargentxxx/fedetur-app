'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  PlusCircle, 
  Bed, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  QrCode, 
  Upload, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Clock,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';
import { INITIAL_HOTELS, MOCK_BOOKINGS } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Region } from '@/types/database';

export default function HotelPortalPage() {
  const [hotels, setHotels] = useState(INITIAL_HOTELS);
  const [activeTab, setActiveTab] = useState<'overview' | 'publish' | 'rooms' | 'validator'>('overview');
  
  // Formulario de nuevo hotel
  const [hotelName, setHotelName] = useState('');
  const [region, setRegion] = useState<Region>('NEA');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Validador de Voucher
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [validatedBooking, setValidatedBooking] = useState<any>(null);
  const [validatorError, setValidatorError] = useState(false);

  const handlePublishHotel = (e: React.FormEvent) => {
    e.preventDefault();
    const newHotel = {
      id: `hotel-${Date.now()}`,
      name: hotelName,
      slug: hotelName.toLowerCase().replace(/\s+/g, '-'),
      tagline: 'Nuevo establecimiento adherido a FEDETUR',
      description: description,
      region: region,
      province: province,
      city: city,
      address: address,
      contact_email: email,
      contact_phone: phone,
      amenities: ['wifi', 'breakfast', 'parking'],
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
      star_rating: 3,
      check_in_time: '14:00',
      check_out_time: '10:00',
      status: 'approved' as const,
      featured: false,
      created_at: new Date().toISOString(),
      room_types: [
        {
          id: `room-${Date.now()}`,
          hotel_id: `hotel-${Date.now()}`,
          name: 'Habitación Estándar',
          description: 'Habitación con baño privado y comodidades completas',
          capacity_adults: 2,
          capacity_children: 0,
          bed_configuration: '1 Cama King',
          base_price_night: 70000,
          fedetur_discount_percentage: 20,
          total_inventory: 10,
          images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
          amenities: ['WiFi', 'Desayuno'],
          is_active: true,
        },
      ],
    };

    setHotels([newHotel, ...hotels]);
    setPublishSuccess(true);
  };

  const handleValidateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setValidatorError(false);
    const found = MOCK_BOOKINGS.find(
      b => b.booking_code.toLowerCase() === voucherCodeInput.trim().toLowerCase()
    );

    if (found) {
      setValidatedBooking(found);
    } else {
      setValidatedBooking(null);
      setValidatorError(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Cabecera del Portal Hotel */}
      <div className="bg-fedetur-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/20 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white font-black text-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  PRESTADOR HOTELERO VERIFICADO
                </span>
                <span className="text-[10px] text-slate-300">FEDETUR Host Network</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Portal de Hoteles y Alojamientos</h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Publicá tus plazas, administrá tarifas mutuales y verificá vouchers de huéspedes en tiempo real.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('publish')}
              className="px-5 py-2.5 rounded-2xl bg-fedetur-lime hover:bg-fedetur-lime-dark text-fedetur-dark font-black text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Nuevo Hotel</span>
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-white/20 text-fedetur-lime' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Mis Alojamientos ({hotels.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('validator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'validator' ? 'bg-white/20 text-fedetur-lime' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Validador de Vouchers QR</span>
          </button>

          <button
            onClick={() => setActiveTab('publish')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'publish' ? 'bg-white/20 text-fedetur-lime' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Formulario de Publicación</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VISTA OVERVIEW: MIS HOTELES Y RESERVAS ENTRANTES                      */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Métricas del Prestador */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-bold uppercase mb-1">Establecimientos Activos</div>
              <div className="text-3xl font-black text-slate-900">{hotels.length}</div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">✓ 100% Verificados por FEDETUR</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-bold uppercase mb-1">Reservas Recibidas</div>
              <div className="text-3xl font-black text-blue-600">24</div>
              <span className="text-[10px] text-slate-500 mt-1 block">Últimos 30 días</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 font-bold uppercase mb-1">Total Liquidado ($ ARS)</div>
              <div className="text-3xl font-black text-fedetur-dark">$1.840.500</div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Acreditado en MercadoPago</span>
            </div>
          </div>

          {/* Listado de Hoteles Propios */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Alojamientos Publicados</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                        Habilitado FEDETUR
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Región {hotel.region}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1">{hotel.name}</h3>
                    <p className="text-xs text-slate-500 mb-3">{hotel.address}, {hotel.city}, {hotel.province}</p>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Habitaciones configuradas:</span>
                        <strong className="text-slate-800">{hotel.room_types?.length || 1} tipos</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Descuento Mutual:</span>
                        <strong className="text-emerald-700 font-bold">20% a 25% OFF</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/hoteles/${hotel.slug || hotel.id}`}
                      className="text-xs font-bold text-fedetur-dark hover:underline"
                    >
                      Ver Ficha Pública &rarr;
                    </Link>
                    <span className="text-[10px] text-slate-400">ID: {hotel.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VALIDADOR DE VOUCHERS QR (RECEPCIÓN DEL HOTEL)                        */}
      {/* ========================================================================= */}
      {activeTab === 'validator' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-fedetur-dark text-fedetur-lime flex items-center justify-center mx-auto shadow-md">
                <QrCode className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Validación de Voucher Huésped</h2>
              <p className="text-xs text-slate-500">
                Ingresá el código de reserva presentado por el afiliado para certificar su validez y habilitar el Check-In.
              </p>
            </div>

            <form onSubmit={handleValidateVoucher} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Código de Voucher FEDETUR</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={voucherCodeInput}
                    onChange={(e) => setVoucherCodeInput(e.target.value)}
                    placeholder="Ej. FDT-2026-8941"
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-3 text-sm font-mono font-bold text-slate-900 uppercase focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-fedetur-dark hover:bg-fedetur-navy text-white font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Check className="w-4 h-4 text-fedetur-lime" />
                <span>Verificar y Registrar Ingreso</span>
              </button>
            </form>

            {/* Resultado de Validación Exitosa */}
            {validatedBooking && (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-xs text-slate-800 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>¡VOUCHER VÁLIDO & PAGADO!</span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-emerald-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Titular</span>
                    <strong>{validatedBooking.affiliate_name}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">DNI</span>
                    <strong>{validatedBooking.affiliate_dni}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Estadía</span>
                    <span>{validatedBooking.check_in_date} al {validatedBooking.check_out_date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Habitación</span>
                    <span>{validatedBooking.room_name}</span>
                  </div>
                </div>

                <div className="pt-2 text-right">
                  <button
                    onClick={() => alert(`Check-in registrado exitosamente para ${validatedBooking.affiliate_name}`)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs"
                  >
                    Confirmar Check-In de Huéspedes
                  </button>
                </div>
              </div>
            )}

            {validatorError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>No se encontró ninguna reserva activa con ese código. Verificá los datos ingresados.</span>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FORMULARIO DE PUBLICACIÓN DE HOTEL                                    */}
      {/* ========================================================================= */}
      {activeTab === 'publish' && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Formulario de Alta de Hotel</h2>
              <p className="text-xs text-slate-500 mt-1">
                Completá los datos de tu establecimiento. Una vez enviado, el Consejo de FEDETUR habilitará tu publicación.
              </p>
            </div>

            {publishSuccess ? (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-lg">¡Hotel Publicado Exitosamente!</h3>
                <p className="text-xs text-slate-700">
                  Tu hotel <strong>{hotelName}</strong> fue registrado y ya está disponible en el catálogo con tarifas mutuales.
                </p>
                <button
                  onClick={() => {
                    setPublishSuccess(false);
                    setActiveTab('overview');
                  }}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-fedetur-dark text-white font-bold text-xs"
                >
                  Ir a Mis Alojamientos
                </button>
              </div>
            ) : (
              <form onSubmit={handlePublishHotel} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nombre del Establecimiento / Hotel</label>
                  <input
                    type="text"
                    required
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    placeholder="Ej. Hotel Gran Termas & Spa"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Región</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as Region)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                    >
                      <option value="NEA">Región NEA</option>
                      <option value="NOA">Región NOA</option>
                      <option value="Centro">Región Centro</option>
                      <option value="Cuyo">Región Cuyo</option>
                      <option value="Buenos Aires">Región Buenos Aires</option>
                      <option value="Patagonia">Región Patagonia</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Provincia</label>
                    <input
                      type="text"
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="Ej. Córdoba"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Ciudad</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ej. Villa Carlos Paz"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Dirección Exacta</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej. Av. San Martín 1500"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email de Reservas</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="reservas@tuhotel.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+54 9 ..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Descripción del Hotel y Servicios</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Contanos sobre las instalaciones, piscinas, desayuno, comodidades y servicios para las familias mutualistas..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-fedetur-dark hover:bg-fedetur-navy text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Upload className="w-4 h-4 text-fedetur-lime" />
                  <span>Publicar Establecimiento en FEDETUR</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
