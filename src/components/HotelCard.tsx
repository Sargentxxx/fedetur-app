'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hotel } from '@/types/database';
import { RegionBadge } from '@/components/RegionBadge';
import { formatCurrency } from '@/lib/utils';
import { Star, Wifi, Coffee, Car, UtensilsCrossed, Waves, Sparkles, ArrowRight } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const primaryRoom = hotel.room_types && hotel.room_types.length > 0 ? hotel.room_types[0] : null;
  const basePrice = primaryRoom ? primaryRoom.base_price_night : 75000;
  const discountPercent = primaryRoom ? primaryRoom.fedetur_discount_percentage : 20;
  const affiliatePrice = basePrice * (1 - discountPercent / 100);

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <span title="WiFi Gratuito" className="p-1.5 bg-slate-100 rounded text-slate-700"><Wifi className="w-3.5 h-3.5" /></span>;
      case 'breakfast':
        return <span title="Desayuno incluido" className="p-1.5 bg-slate-100 rounded text-slate-700"><Coffee className="w-3.5 h-3.5" /></span>;
      case 'parking':
        return <span title="Estacionamiento" className="p-1.5 bg-slate-100 rounded text-slate-700"><Car className="w-3.5 h-3.5" /></span>;
      case 'pool':
        return <span title="Piscina" className="p-1.5 bg-slate-100 rounded text-slate-700"><Waves className="w-3.5 h-3.5" /></span>;
      case 'restaurant':
        return <span title="Restaurante" className="p-1.5 bg-slate-100 rounded text-slate-700"><UtensilsCrossed className="w-3.5 h-3.5" /></span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-fedetur-lime hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Imagen Principal con Badges */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={hotel.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Badges superiores */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <RegionBadge region={hotel.region} />
          <div className="bg-fedetur-lime text-fedetur-dark px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>-{discountPercent}% Mutual</span>
          </div>
        </div>

        {/* Ciudad y Rating en la base de la imagen */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-sm">
          <span className="font-medium drop-shadow-md">
            {hotel.city}, {hotel.province}
          </span>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{hotel.star_rating} Estrellas</span>
          </div>
        </div>
      </div>

      {/* Cuerpo de la Card */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-fedetur-dark transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {hotel.tagline || hotel.description}
          </p>

          {/* Iconos de Servicios */}
          <div className="flex items-center gap-1.5 my-3 flex-wrap">
            {hotel.amenities.slice(0, 5).map((amenity) => (
              <React.Fragment key={amenity}>
                {renderAmenityIcon(amenity)}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Sección de Precios y Call to Action */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 line-through block">
                Público: {formatCurrency(basePrice)}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold text-fedetur-dark">
                  {formatCurrency(affiliatePrice)}
                </span>
                <span className="text-[10px] font-medium text-slate-500">/ noche</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                Tarifa Afiliado FEDETUR
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/hoteles/${hotel.slug || hotel.id}`}
              className="w-full text-center px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Ver Hotel
            </Link>
            <Link
              href={`/reservar/${primaryRoom ? primaryRoom.id : hotel.id}`}
              className="w-full text-center px-3 py-2 rounded-xl text-xs font-bold text-fedetur-dark bg-fedetur-lime hover:bg-fedetur-lime-dark transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Reservar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
