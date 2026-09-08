'use client';

import React from 'react';
import Link from 'next/link';
import { Hotel } from '@/types/database';
import { RegionBadge } from '@/components/RegionBadge';
import { formatCurrency } from '@/lib/utils';
import { 
  Star, 
  Wifi, 
  Coffee, 
  Car, 
  UtensilsCrossed, 
  Waves, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const primaryRoom = hotel.room_types && hotel.room_types.length > 0 ? hotel.room_types[0] : null;
  const basePrice = primaryRoom ? primaryRoom.base_price_night : 85000;
  const discountPercent = primaryRoom ? primaryRoom.fedetur_discount_percentage : 25;
  const affiliatePrice = basePrice * (1 - discountPercent / 100);

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return (
          <span title="WiFi Gratuito" className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs font-medium flex items-center gap-1">
            <Wifi className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>WiFi</span>
          </span>
        );
      case 'breakfast':
        return (
          <span title="Desayuno incluido" className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs font-medium flex items-center gap-1">
            <Coffee className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Desayuno</span>
          </span>
        );
      case 'parking':
        return (
          <span title="Estacionamiento" className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs font-medium flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Cochera</span>
          </span>
        );
      case 'pool':
        return (
          <span title="Piscina" className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs font-medium flex items-center gap-1">
            <Waves className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Piscina</span>
          </span>
        );
      case 'restaurant':
        return (
          <span title="Restaurante" className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs font-medium flex items-center gap-1">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Cocina</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-sky-400/40 transition-all duration-300 flex flex-col group">
      {/* Imagen Principal 16:10 con Badges de Alto Impacto */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-900">
        <img
          src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradiente cinemático */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        
        {/* Badges superiores Stitch */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <RegionBadge region={hotel.region} className="bg-white/90 backdrop-blur-md" />
          <div className="bg-[#F5A623] text-slate-950 px-3.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
            <span>-{discountPercent}% MUTUAL</span>
          </div>
        </div>

        {/* Ciudad y Rating en la base de la imagen */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-xl">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-extrabold text-sm">{hotel.star_rating}.0</span>
            <span className="text-white/70 text-[11px]">(Verificado)</span>
          </div>
          <span className="font-semibold text-white/90 drop-shadow-md text-xs">
            {hotel.city}, {hotel.province}
          </span>
        </div>
      </div>

      {/* Cuerpo de la Card */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">
            <span className="text-[#00658D]">Convenio Homologado</span>
            <span className="flex items-center gap-1 text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" /> INAES
            </span>
          </div>

          <h3 className="text-xl font-black text-[#003561] leading-tight group-hover:text-[#00A3E0] transition-colors line-clamp-1">
            {hotel.name}
          </h3>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed font-normal">
            {hotel.description || 'Alojamiento federado con servicios completos, atención familiar y descuentos directos para mutuales y cooperativas.'}
          </p>

          {/* Amenities en píldoras */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {hotel.amenities?.slice(0, 3).map((amenity) => (
              <React.Fragment key={amenity}>
                {renderAmenityIcon(amenity)}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Precios & Acciones */}
        <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-slate-400 line-through font-medium">
              Público: {formatCurrency(basePrice)}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#003561]">
                {formatCurrency(affiliatePrice)}
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ noche</span>
            </div>
            <div className="text-[10px] font-bold text-sky-700 flex items-center gap-1 mt-0.5">
              <CreditCard className="w-3 h-3 text-[#00A3E0]" />
              <span>Hasta 6 cuotas con MercadoPago</span>
            </div>
          </div>

          <Link
            href={`/hoteles/${hotel.id}`}
            className="px-4 py-2.5 rounded-xl bg-[#003561] hover:bg-[#004C87] text-white font-bold text-xs flex items-center gap-1.5 shadow-md group-hover:shadow-lg transition-all active:scale-95"
          >
            <span>Reservar</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-300" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default HotelCard;
