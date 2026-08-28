'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  CreditCard, 
  Calendar, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Clock, 
  ExternalLink, 
  Printer, 
  PlusCircle,
  FileText,
  Phone,
  AlertCircle
} from 'lucide-react';
import { MOCK_USER_PROFILE, MOCK_BOOKINGS, AFFILIATED_ENTITIES } from '@/lib/mockData';
import { DigitalCarnet } from '@/components/DigitalCarnet';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AffiliateDashboardPage() {
  const [userProfile, setUserProfile] = useState(MOCK_USER_PROFILE);
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [activeTab, setActiveTab] = useState<'carnet' | 'reservas' | 'beneficios'>('carnet');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header del Perfil */}
      <div className="bg-fedetur-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-fedetur-lime/20 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-fedetur-lime text-fedetur-dark font-black text-2xl flex items-center justify-center shadow-lg">
              {userProfile.full_name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  AFILIADO ACTIVO
                </span>
                <span className="text-[10px] text-slate-300">INAES 25450</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{userProfile.full_name}</h1>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-fedetur-lime" />
                <span>{userProfile.entity_name}</span>
                <span>• DNI: {userProfile.dni_cuit}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/hoteles"
              className="px-5 py-2.5 rounded-2xl bg-fedetur-lime hover:bg-fedetur-lime-dark text-fedetur-dark font-black text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nueva Reserva</span>
            </Link>
          </div>
        </div>

        {/* Pestañas de Navegación del Dashboard */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10">
          <button
            onClick={() => setActiveTab('carnet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'carnet' ? 'bg-white/20 text-fedetur-lime' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Mi Carnet Digital</span>
          </button>

          <button
            onClick={() => setActiveTab('reservas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'reservas' ? 'bg-white/20 text-fedetur-lime' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Mis Reservas ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('beneficios')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'beneficios' ? 'bg-white/20 text-fedetur-lime' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Beneficios Mutuales</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PESTAÑA 1: MI CARNET DIGITAL CON QR                                      */}
      {/* ========================================================================= */}
      {activeTab === 'carnet' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <DigitalCarnet profile={userProfile} />
            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 mt-6 max-w-md mx-auto flex items-start gap-2.5">
              <Info className="w-4 h-4 text-fedetur-dark shrink-0 mt-0.5" />
              <span>
                Presentá este carnet desde tu teléfono en cualquier hotel adherido a FEDETUR para acreditar tu condición de asociado y acceder a las tarifas con descuento.
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Datos de Afiliación
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Correo Electrónico</span>
                <p className="font-bold text-slate-800">{userProfile.email}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold">Teléfono de Contacto</span>
                <p className="font-bold text-slate-800">{userProfile.phone}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold">Mutual / Cooperativa</span>
                <p className="font-bold text-emerald-800">{userProfile.entity_name}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold">Estado de Cuota Social</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                  ✓ Al Día / Habilitado
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 2: HISTORIAL DE RESERVAS                                         */}
      {/* ========================================================================= */}
      {activeTab === 'reservas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Historial de Reservas y Estadías</h2>
            <Link
              href="/hoteles"
              className="text-xs font-bold text-fedetur-dark hover:underline"
            >
              + Buscar nuevo alojamiento
            </Link>
          </div>

          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-fedetur-lime transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex gap-4 items-start sm:items-center">
                  <img
                    src={booking.hotel_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80'}
                    alt={booking.hotel_name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-black text-fedetur-dark bg-fedetur-lime px-2 py-0.5 rounded">
                        {booking.booking_code}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {booking.status === 'confirmed' ? 'CONFIRMADA' : 'PENDIENTE DE PAGO'}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900">{booking.hotel_name}</h3>
                    <p className="text-xs text-slate-500">{booking.hotel_city}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-fedetur-dark" />
                        <span>{booking.check_in_date} al {booking.check_out_date} ({booking.nights_count} noches)</span>
                      </span>
                      <span>•</span>
                      <span>{booking.room_name}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end justify-between gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-400 block">Monto Abonado</span>
                    <span className="text-lg font-black text-fedetur-dark">
                      {formatCurrency(booking.total_amount)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/reserva/confirmacion/${booking.booking_code}?status=approved`}
                      className="px-4 py-2 rounded-xl bg-fedetur-dark hover:bg-fedetur-navy text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-fedetur-lime" />
                      <span>Ver Voucher</span>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 3: BENEFICIOS MUTUALES EXCLUSIVOS                                 */}
      {/* ========================================================================= */}
      {activeTab === 'beneficios' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Convenios y Beneficios Activos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
                %
              </div>
              <h3 className="font-bold text-base text-slate-900">Descuentos en Alojamiento</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Entre 20% y 30% de bonificación en toda la cadena de hoteles adheridos a FEDETUR en las 6 regiones del país.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-lg">
                💳
              </div>
              <h3 className="font-bold text-base text-slate-900">Financiación MercadoPago</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Facilidades de pago en cuotas con tarjeta de crédito o débito a través de la pasarela oficial.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-lg">
                🗺️
              </div>
              <h3 className="font-bold text-base text-slate-900">Excursiones y Circuitos</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tarifas preferenciales en paquetes turísticos solidarios en Cataratas, Bariloche, Mendoza y Norte Argentino.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function Info({ className }: { className?: string }) {
  return <AlertCircle className={className} />;
}
