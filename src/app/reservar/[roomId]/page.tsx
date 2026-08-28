'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Info,
  Lock,
  Building2
} from 'lucide-react';
import { INITIAL_HOTELS, AFFILIATED_ENTITIES, MOCK_USER_PROFILE } from '@/lib/mockData';
import { formatCurrency, calculateNights } from '@/lib/utils';

export default function BookingCheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  // Encontrar la habitación y su hotel correspondiente
  let targetHotel = INITIAL_HOTELS[0];
  let targetRoom = targetHotel.room_types?.[0];

  for (const h of INITIAL_HOTELS) {
    const found = h.room_types?.find(r => r.id === roomId);
    if (found) {
      targetHotel = h;
      targetRoom = found;
      break;
    }
  }

  // Si no se encontró por roomId específico, fallback a la primera del primer hotel
  if (!targetRoom) {
    targetRoom = targetHotel.room_types?.[0] || {
      id: 'default-room',
      hotel_id: targetHotel.id,
      name: 'Habitación Matrimonial Estándar',
      description: 'Habitación confortable con baño privado',
      capacity_adults: 2,
      capacity_children: 0,
      bed_configuration: '1 Cama King',
      base_price_night: 75000,
      fedetur_discount_percentage: 25,
      total_inventory: 5,
      images: [targetHotel.images[0]],
      amenities: ['WiFi', 'Desayuno'],
      is_active: true,
    };
  }

  // Fechas por defecto: Mañana y 4 días después
  const defaultCheckIn = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const defaultCheckOut = new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guestsCount, setGuestsCount] = useState('2');
  const [fullName, setFullName] = useState(MOCK_USER_PROFILE.full_name);
  const [dni, setDni] = useState(MOCK_USER_PROFILE.dni_cuit || '');
  const [email, setEmail] = useState(MOCK_USER_PROFILE.email);
  const [phone, setPhone] = useState(MOCK_USER_PROFILE.phone || '');
  const [selectedEntity, setSelectedEntity] = useState(AFFILIATED_ENTITIES[0].name);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Cálculos de tarifa
  const nights = useMemo(() => calculateNights(checkIn, checkOut), [checkIn, checkOut]);
  const baseSubtotal = targetRoom.base_price_night * nights;
  const discountAmount = baseSubtotal * (targetRoom.fedetur_discount_percentage / 100);
  const totalPayable = baseSubtotal - discountAmount;
  const pricePerNightDiscounted = targetRoom.base_price_night * (1 - targetRoom.fedetur_discount_percentage / 100);

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const bookingCode = `FDT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: `bk-${Date.now()}`,
          bookingCode: bookingCode,
          hotelName: targetHotel.name,
          roomName: targetRoom.name,
          totalAmount: totalPayable,
          nights: nights,
          payerEmail: email,
          payerName: fullName,
        }),
      });

      const data = await response.json();

      if (data.initPoint) {
        // Redirigir a MercadoPago o al voucher de confirmación
        window.location.href = data.initPoint;
      } else {
        router.push(`/reserva/confirmacion/${bookingCode}?status=approved`);
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
      router.push(`/reserva/confirmacion/${bookingCode}?status=approved`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Botón Volver */}
      <Link
        href={`/hoteles/${targetHotel.slug || targetHotel.id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-fedetur-dark mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la ficha de {targetHotel.name}</span>
      </Link>

      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 bg-fedetur-lime text-fedetur-dark px-3 py-1 rounded-full text-xs font-black mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Descuento Mutual Aplicado</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Completar Reserva & Pago Seguro
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Paso 2 de 2: Verificá los datos de tus pasajeros y confirmá con MercadoPago.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formulario de Pasajeros y Fechas */}
        <div className="lg:col-span-2 space-y-6">
          
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            
            {/* Tarjeta 1: Fechas y Huéspedes */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-fedetur-dark" />
                <span>1. Fechas de Estadía</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Check-in</label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-fedetur-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Check-out</label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-fedetur-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Cantidad Pasajeros</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-fedetur-lime focus:outline-none"
                  >
                    <option value="1">1 Huésped</option>
                    <option value="2">2 Huéspedes</option>
                    <option value="3">3 Huéspedes</option>
                    <option value="4">4 Huéspedes</option>
                  </select>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                <span>Total de noches calculadas:</span>
                <strong className="text-fedetur-dark font-black text-xs">{nights} Noches</strong>
              </div>
            </div>

            {/* Tarjeta 2: Datos del Titular y Mutual */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-fedetur-dark" />
                <span>2. Datos del Afiliado Titular</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">DNI / CUIT</label>
                  <input
                    type="text"
                    required
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="38.492.019"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-lime focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Correo Electrónico (para voucher)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="afiliado@ejemplo.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 9 11 ..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-lime focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mutual o Cooperativa de Origen</label>
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-fedetur-lime focus:outline-none"
                >
                  {AFFILIATED_ENTITIES.map((ent) => (
                    <option key={ent.id} value={ent.name}>
                      {ent.name} ({ent.province} - {ent.region})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Solicitudes Especiales (Opcional)</label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Ej. Cuna de bebé, cama matrimonial en lugar de twin, piso alto..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-lime focus:outline-none"
                />
              </div>

            </div>

            {/* Botón MercadoPago */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-[#009EE3] hover:bg-[#0082ba] text-white font-black text-sm transition-all shadow-xl hover:shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CreditCard className="w-5 h-5" />
              <span>
                {isProcessing ? 'Conectando con MercadoPago...' : `Pagar con MercadoPago • ${formatCurrency(totalPayable)}`}
              </span>
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transacción cifrada y protegida por MercadoPago & FEDETUR (INAES 25450)</span>
            </div>

          </form>

        </div>

        {/* Resumen Lateral de la Reserva */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 sticky top-28">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Resumen de la Estadía
            </h3>

            {/* Hotel & Habitación */}
            <div className="flex gap-3 items-center">
              <img
                src={targetHotel.images[0]}
                alt={targetHotel.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{targetHotel.name}</h4>
                <p className="text-[11px] text-slate-500">{targetHotel.city}, {targetHotel.province}</p>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                  {targetRoom.name}
                </span>
              </div>
            </div>

            {/* Desglose de Precios */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Precio estándar por noche:</span>
                <span className="line-through text-slate-400">{formatCurrency(targetRoom.base_price_night)}</span>
              </div>

              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Tarifa Afiliado ({targetRoom.fedetur_discount_percentage}% OFF):</span>
                <span>{formatCurrency(pricePerNightDiscounted)} / noche</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Noches seleccionadas:</span>
                <span className="font-bold text-slate-800">{nights}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Subtotal estadía:</span>
                <span>{formatCurrency(baseSubtotal)}</span>
              </div>

              <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 p-2 rounded-xl">
                <span>Ahorro Mutual FEDETUR:</span>
                <span>- {formatCurrency(discountAmount)}</span>
              </div>
            </div>

            {/* Total Final */}
            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <span className="font-bold text-slate-900 text-sm">Total a Abonar:</span>
              <span className="text-2xl font-black text-fedetur-dark">
                {formatCurrency(totalPayable)}
              </span>
            </div>

            <div className="text-[10px] text-slate-400 leading-normal pt-2 border-t border-slate-100">
              * Tarifa final con impuestos incluidos en Pesos Argentinos ($ ARS). Sin gastos ocultos ni comisiones extra.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
