'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Printer, 
  MapPin, 
  Calendar, 
  Users, 
  Download, 
  ShieldCheck, 
  Building2,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { MOCK_BOOKINGS, INITIAL_HOTELS, FEDETUR_INFO } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

function BookingConfirmationContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingCode = (params.bookingCode as string) || 'FDT-2026-8941';
  const paymentStatus = searchParams.get('status') || 'approved';

  // Buscar si existe en mock data o generar dinámico
  const existing = MOCK_BOOKINGS.find(b => b.booking_code === bookingCode);
  const hotel = INITIAL_HOTELS[0];
  const room = hotel.room_types?.[0];

  const booking = existing || {
    id: 'bk-new',
    booking_code: bookingCode,
    affiliate_name: 'Alberto Ezequiel García',
    affiliate_dni: '38.492.019',
    hotel_name: hotel.name,
    hotel_city: `${hotel.city}, ${hotel.province}`,
    hotel_image: hotel.images[0],
    room_name: room?.name || 'Habitación Doble Superior',
    check_in_date: '2026-09-15',
    check_out_date: '2026-09-20',
    nights_count: 5,
    guests_count: 2,
    guest_details: [
      { full_name: 'Alberto Ezequiel García', dni: '38.492.019', is_primary: true },
      { full_name: 'María Laura Gómez', dni: '39.102.394', is_primary: false },
    ],
    price_per_night: 63750,
    subtotal: 425000,
    discount_amount: 106250,
    total_amount: 318750,
    status: 'confirmed' as const,
    payment_id: 'MP-89402941',
    created_at: new Date().toISOString(),
  };

  useEffect(() => {
    if (paymentStatus === 'approved') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#AFED00', '#002323', '#FFA1CD', '#FFD602'],
        });
      } catch (err) {
        console.log('Confetti effect');
      }
    }
  }, [paymentStatus]);

  const handlePrint = () => {
    window.print();
  };

  const qrData = JSON.stringify({
    code: booking.booking_code,
    affiliate: booking.affiliate_name,
    dni: booking.affiliate_dni,
    hotel: booking.hotel_name,
    in: booking.check_in_date,
    out: booking.check_out_date,
    status: 'CONFIRMED_PAID',
    inaes: '25450',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Banner de Éxito */}
      <div className="text-center mb-8 space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          ¡Reserva Confirmada & Pago Aprobado!
        </h1>
        <p className="text-sm text-slate-600">
          Tu pago con MercadoPago fue procesado exitosamente. Te enviamos una copia a tu correo electrónico.
        </p>
      </div>

      {/* Acciones de Impresión y Descarga */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Código de Voucher:</span>
          <span className="font-mono text-xs font-black text-fedetur-dark bg-fedetur-lime px-2 py-0.5 rounded">
            {booking.booking_code}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Voucher</span>
          </button>
          <Link
            href="/afiliado/dashboard"
            className="px-4 py-2 rounded-xl bg-fedetur-dark hover:bg-fedetur-navy text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span>Mis Reservas</span>
            <ArrowRight className="w-4 h-4 text-fedetur-lime" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VOUCHER OFICIAL FEDETUR (IMPRIMIBLE)                                      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-xl print:border print:shadow-none print:m-0 print:p-6 relative overflow-hidden">
        
        {/* Marca de agua institucional */}
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-48 h-48 bg-fedetur-lime/10 rounded-full blur-2xl pointer-events-none" />

        {/* Cabecera del Voucher */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-slate-100 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-fedetur-lime flex items-center justify-center text-fedetur-dark font-black text-xl shadow-md">
              FD
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                VOUCHER OFICIAL DE RESERVA
              </span>
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                FEDETUR TURISMO SOCIAL
              </h2>
              <p className="text-xs text-slate-500">
                Matrícula I.N.A.E.S. 25450 • Sede Central CABA
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full inline-block mb-1">
              ESTADO: CONFIRMADA
            </span>
            <div className="font-mono text-xs font-bold text-slate-700">
              Código: <strong className="text-fedetur-dark">{booking.booking_code}</strong>
            </div>
            <div className="text-[10px] text-slate-400">
              Emitido: {formatDate(booking.created_at)}
            </div>
          </div>
        </div>

        {/* Cuerpo del Voucher en 2 Columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 my-8 items-center">
          
          {/* Detalles del Alojamiento & Fechas */}
          <div className="sm:col-span-2 space-y-4">
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                Establecimiento Hotelero
              </span>
              <h3 className="text-lg font-bold text-slate-900">{booking.hotel_name}</h3>
              <p className="text-xs text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-fedetur-dark shrink-0" />
                <span>{booking.hotel_city}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Check-In</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{booking.check_in_date}</p>
                <span className="text-[10px] text-slate-500">Desde las 14:00 hs</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Check-Out</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{booking.check_out_date}</p>
                <span className="text-[10px] text-slate-500">Hasta las 10:00 hs</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Habitación Contratada:</span>
                <strong className="text-slate-900">{booking.room_name}</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Pasajeros Habilitados:</span>
                <strong className="text-slate-900">{booking.guests_count} Personas</strong>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Titular Responsable:</span>
                <strong className="text-fedetur-dark">{booking.affiliate_name} (DNI: {booking.affiliate_dni})</strong>
              </div>
            </div>

          </div>

          {/* QR de Validación en Recepción */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center">
            <QRCodeSVG value={qrData} size={130} level="H" />
            <span className="font-mono text-xs font-black text-fedetur-dark mt-3 block">
              {booking.booking_code}
            </span>
            <p className="text-[10px] text-slate-500 mt-1">
              Presentar este código QR al recepcionista en el mostrador del hotel.
            </p>
          </div>

        </div>

        {/* Desglose de Pago & MercadoPago */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Pago Total Registrado mediante MercadoPago</span>
            </div>
            <span className="text-[11px] text-emerald-800">
              Comprobante de transacción: {booking.payment_id || 'MP-89402941'}
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-emerald-700 block">Monto Total Cancelado</span>
            <strong className="text-lg font-black text-emerald-950">
              {formatCurrency(booking.total_amount)}
            </strong>
          </div>
        </div>

        {/* Instrucciones de Check-In */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
          <div className="font-bold text-slate-700">Instrucciones para el Huésped:</div>
          <p>1. Presentar DNI de los pasajeros y este voucher (en pantalla de celular o impreso) en el check-in.</p>
          <p>2. En caso de requerir modificaciones o traslados, contactarse con FEDETUR a <strong>info@fedetur.ar</strong> o directamente con el hotel.</p>
        </div>

      </div>

    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Cargando Voucher de Reserva...</div>}>
      <BookingConfirmationContent />
    </Suspense>
  );
}
