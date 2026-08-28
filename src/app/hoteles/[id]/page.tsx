'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, 
  Star, 
  Wifi, 
  Coffee, 
  Car, 
  Waves, 
  UtensilsCrossed, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ArrowLeft,
  CheckCircle2,
  Users,
  Bed,
  ArrowRight
} from 'lucide-react';
import { INITIAL_HOTELS } from '@/lib/mockData';
import { RegionBadge } from '@/components/RegionBadge';
import { formatCurrency } from '@/lib/utils';

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idOrSlug = params.id as string;

  const hotel = INITIAL_HOTELS.find(h => h.id === idOrSlug || h.slug === idOrSlug) || INITIAL_HOTELS[0];
  const [activeImage, setActiveImage] = useState(hotel.images[0] || '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Botón Volver */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-fedetur-dark mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Catálogo de Hoteles</span>
      </button>

      {/* Cabecera del Hotel */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <RegionBadge region={hotel.region} />
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{hotel.star_rating} Estrellas</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Convenio Oficial FEDETUR</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {hotel.name}
          </h1>

          <div className="flex items-center gap-2 text-slate-600 text-xs font-medium mt-1">
            <MapPin className="w-4 h-4 text-fedetur-dark shrink-0" />
            <span>{hotel.address}, {hotel.city}, {hotel.province}</span>
          </div>
        </div>

        {/* Contacto Directo */}
        <div className="flex items-center gap-2">
          {hotel.whatsapp && (
            <a
              href={`https://wa.me/${hotel.whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Consultar WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {/* Galería de Fotos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
        <div className="lg:col-span-2 h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-lg bg-slate-900">
          <img
            src={activeImage}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {hotel.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`h-[180px] lg:h-[215px] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                activeImage === img ? 'border-fedetur-lime scale-[0.98]' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Contenido Principal: Descripción, Comodidades y Habitaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Columna Izquierda: Información Detallada */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Descripción */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Sobre este Establecimiento</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {hotel.description}
            </p>

            {/* Políticas y Horarios */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-fedetur-dark" />
                <div>
                  <span className="font-bold block">Check-in</span>
                  <span className="text-slate-500">{hotel.check_in_time} hs</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-fedetur-dark" />
                <div>
                  <span className="font-bold block">Check-out</span>
                  <span className="text-slate-500">{hotel.check_out_time} hs</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-700 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold block">Cancelación</span>
                  <span className="text-slate-500">Hasta 48hs antes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Listado de Habitaciones Disponibles para Reservar */}
          <div className="space-y-4" id="habitaciones">
            <h2 className="text-2xl font-black text-slate-900">
              Habitaciones Disponibles & Tarifas
            </h2>

            {hotel.room_types && hotel.room_types.length > 0 ? (
              hotel.room_types.map((room) => {
                const affiliatePrice = room.base_price_night * (1 - room.fedetur_discount_percentage / 100);

                return (
                  <div
                    key={room.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-fedetur-lime hover:shadow-md transition-all flex flex-col sm:flex-row gap-6"
                  >
                    {/* Imagen de la habitación */}
                    <div className="sm:w-1/3 h-48 sm:h-auto rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={room.images[0] || hotel.images[0]}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Datos de la habitación */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold text-slate-900">{room.name}</h3>
                          <span className="bg-fedetur-lime text-fedetur-dark px-2.5 py-0.5 rounded-full text-xs font-black shrink-0">
                            -{room.fedetur_discount_percentage}% Mutual
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-1">
                          {room.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 my-3 text-xs text-slate-600 font-medium">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-fedetur-dark" />
                            <span>Hasta {room.capacity_adults} Adultos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5 text-fedetur-dark" />
                            <span>{room.bed_configuration}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {room.amenities.map((amenity, i) => (
                            <span
                              key={i}
                              className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                            >
                              ✓ {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Precios y Botón de Reserva */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-[11px] text-slate-400 line-through block">
                            Público general: {formatCurrency(room.base_price_night)}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-fedetur-dark">
                              {formatCurrency(affiliatePrice)}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">/ noche</span>
                          </div>
                        </div>

                        <Link
                          href={`/reservar/${room.id}`}
                          className="px-6 py-3 rounded-2xl bg-fedetur-lime hover:bg-fedetur-lime-dark text-fedetur-dark font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                        >
                          <span>Reservar Habitación</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>

                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-6 rounded-2xl text-center text-slate-500 text-xs">
                No hay habitaciones publicadas temporalmente.
              </div>
            )}
          </div>

        </div>

        {/* Columna Derecha: Resumen de Beneficios Mutuales & Garantía */}
        <div className="space-y-6">
          <div className="bg-fedetur-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-fedetur-lime/30 space-y-4 sticky top-28">
            <div className="inline-flex items-center gap-1.5 bg-fedetur-lime text-fedetur-dark px-3 py-1 rounded-full text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Garantía FEDETUR</span>
            </div>

            <h3 className="text-xl font-bold">Ventajas para Asociados</h3>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-fedetur-lime shrink-0 mt-0.5" />
                <span><strong>Tarifa Congelada:</strong> El valor abonado al momento de la reserva queda protegido contra variaciones de temporada.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-fedetur-lime shrink-0 mt-0.5" />
                <span><strong>Pago con MercadoPago:</strong> Hasta 12 cuotas fijas o en cuenta con tarjeta de débito/crédito.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-fedetur-lime shrink-0 mt-0.5" />
                <span><strong>Voucher Digital con QR:</strong> Confirmación al instante sin necesidad de imprimir papel.</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-[11px] text-slate-400">
                Consultas sobre tu afiliación o convenios mutuales:
              </p>
              <a
                href="mailto:info@fedetur.ar"
                className="text-xs font-bold text-fedetur-lime hover:underline block mt-1"
              >
                info@fedetur.ar
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
