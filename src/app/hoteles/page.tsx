'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, MapPin, Filter, RotateCcw, Building2 } from 'lucide-react';
import { INITIAL_HOTELS } from '@/lib/mockData';
import { HotelCard } from '@/components/HotelCard';
import { Region } from '@/types/database';

function HotelsContent() {
  const searchParams = useSearchParams();
  const initialRegion = searchParams.get('region') || '';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(150000);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSelectedRating(null);
    setSelectedAmenities([]);
    setMaxPrice(150000);
  };

  const filteredHotels = useMemo(() => {
    return INITIAL_HOTELS.filter(hotel => {
      // Region filter
      if (selectedRegion && hotel.region !== selectedRegion) return false;

      // Rating filter
      if (selectedRating && hotel.star_rating < selectedRating) return false;

      // Text search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchName = hotel.name.toLowerCase().includes(query);
        const matchCity = hotel.city.toLowerCase().includes(query);
        const matchProv = hotel.province.toLowerCase().includes(query);
        if (!matchName && !matchCity && !matchProv) return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(a => hotel.amenities.includes(a));
        if (!hasAllAmenities) return false;
      }

      // Price filter
      const primaryRoom = hotel.room_types?.[0];
      const price = primaryRoom ? primaryRoom.base_price_night : 75000;
      if (price > maxPrice) return false;

      return true;
    });
  }, [searchTerm, selectedRegion, selectedRating, selectedAmenities, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Catálogo Federal de Hoteles y Alojamientos
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Explorá y reservá en la red de establecimientos con tarifas y beneficios exclusivos para afiliados mutuales y cooperativos.
        </p>
      </div>

      {/* Grid Principal con Sidebar de Filtros */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar de Filtros */}
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-fedetur-dark" />
              <span>Filtros de Búsqueda</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-slate-400 hover:text-fedetur-dark flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpiar</span>
            </button>
          </div>

          {/* Buscador de Texto */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Buscar por Nombre o Ciudad</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ej. Iguazú, Bariloche, Mendoza..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-fedetur-lime"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Filtro por Región */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Región Geográfica</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-fedetur-lime"
            >
              <option value="">Todas las Regiones</option>
              <option value="NEA">Región NEA</option>
              <option value="NOA">Región NOA</option>
              <option value="Centro">Región Centro</option>
              <option value="Cuyo">Región Cuyo</option>
              <option value="Buenos Aires">Región Buenos Aires</option>
              <option value="Patagonia">Región Patagonia</option>
            </select>
          </div>

          {/* Rango de Precio Máximo */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
              <span>Precio Máximo / Noche</span>
              <span className="text-fedetur-dark font-extrabold">${maxPrice.toLocaleString('es-AR')}</span>
            </div>
            <input
              type="range"
              min="40000"
              max="200000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-fedetur-dark cursor-pointer"
            />
          </div>

          {/* Comodidades / Amenities */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Comodidades</label>
            <div className="space-y-1.5">
              {[
                { id: 'wifi', label: 'WiFi Alta Velocidad' },
                { id: 'pool', label: 'Piscina / Solarium' },
                { id: 'breakfast', label: 'Desayuno Incluido' },
                { id: 'parking', label: 'Estacionamiento' },
                { id: 'ac', label: 'Aire Acondicionado' },
                { id: 'restaurant', label: 'Restaurante' },
                { id: 'spa', label: 'Spa / Relax' },
              ].map(item => (
                <label key={item.id} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(item.id)}
                    onChange={() => toggleAmenity(item.id)}
                    className="rounded border-slate-300 text-fedetur-dark focus:ring-fedetur-lime accent-fedetur-dark"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Listado de Resultados */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              Mostrando <strong className="text-slate-900">{filteredHotels.length}</strong> establecimientos encontrados
            </div>
            {selectedRegion && (
              <span className="font-bold text-fedetur-dark">
                Filtrado por: Región {selectedRegion}
              </span>
            )}
          </div>

          {filteredHotels.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No se encontraron hoteles</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No hay establecimientos que coincidan con los filtros seleccionados. Probá modificando el rango de precio o la región.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 rounded-xl bg-fedetur-dark text-fedetur-lime text-xs font-bold"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Cargando catálogo de hoteles FEDETUR...</div>}>
      <HotelsContent />
    </Suspense>
  );
}
