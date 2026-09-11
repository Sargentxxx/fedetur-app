'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

export interface EntidadLogoItem {
  name: string;
  acronym: string;
  region: string;
  logo: string;
}

export const ENTIDADES_LIST: EntidadLogoItem[] = [
  {
    name: 'Federación de Mutuales Neuquén y Río Negro (DE.MU.R)',
    acronym: 'DE.MU.R',
    region: 'Patagonia',
    logo: '/images/entidades/logo-demur.webp',
  },
  {
    name: 'Asociación Mutual de Gas y Petróleo (amgyp)',
    acronym: 'amgyp',
    region: 'Patagonia',
    logo: '/images/entidades/logo-amgyp.webp',
  },
  {
    name: 'Federación de Mutuales Regional La Plata (FMRLP)',
    acronym: 'FMRLP',
    region: 'Buenos Aires',
    logo: '/images/entidades/logo-fmrlp.webp',
  },
  {
    name: 'Federación de Mutuales Mendocinas de Vivienda (FEMMEVI)',
    acronym: 'FEMMEVI',
    region: 'Cuyo',
    logo: '/images/entidades/logo-femmevi.webp',
  },
  {
    name: 'Asociación Mutual 12 de Enero · Trabajadores Pasteleros',
    acronym: '12 de Enero',
    region: 'Federal',
    logo: '/images/entidades/logo-12enero.webp',
  },
  {
    name: 'Federación de Mutuales Riojanas',
    acronym: 'Fed. Riojanas',
    region: 'NOA',
    logo: '/images/entidades/logo-riojanas.webp',
  },
  {
    name: 'Mutual Personal SAMEEP (Mu.Pe.Sa Chaco)',
    acronym: 'SAMEEP',
    region: 'NEA',
    logo: '/images/entidades/logo-sameep.webp',
  },
  {
    name: 'Mutual Capital Santiago del Estero',
    acronym: 'Mutual Capital',
    region: 'NOA',
    logo: '/images/entidades/logo-capital.webp',
  },
  {
    name: 'Cooperativa de Vivienda FECOVIMA',
    acronym: 'FECOVIMA',
    region: 'Buenos Aires',
    logo: '/images/entidades/logo-fecovima.webp',
  },
  {
    name: 'Mutual 1° de Abril',
    acronym: '1° de Abril',
    region: 'NOA',
    logo: '/images/entidades/logo-1deabril.webp',
  },
  {
    name: 'Asociación Mutual DECAM',
    acronym: 'DECAM',
    region: 'Buenos Aires',
    logo: '/images/entidades/logo-decam.webp',
  },
  {
    name: 'Mutualidad Fondo Compensador FOCOMEJ',
    acronym: 'FOCOMEJ',
    region: 'CABA',
    logo: '/images/entidades/logo-focomej.webp',
  },
  {
    name: 'Federación de Mutuales de Ahorro y Crédito Santa Fe',
    acronym: 'Fed. Santa Fe',
    region: 'Centro',
    logo: '/images/entidades/logo-santafe.webp',
  },
];

export function EntidadesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const touchStartX = useRef<number | null>(null);

  // Ajustar cantidad de logos visibles según tamaño de pantalla
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(6);
      }
    };

    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, ENTIDADES_LIST.length - visibleCount);

  // Auto-slide cada 3.5 segundos con pausa al pasar el cursor
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch handlers para móviles
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      className="w-full bg-white py-20 border-y border-slate-200/80 relative overflow-hidden"
      id="entidades"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera idéntica a la oficial con toque moderno */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black text-[#003561] uppercase tracking-wider bg-sky-50 border border-sky-200 px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Red Solidaria e Interinstitucional</span>
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-[#001D38] mt-3 tracking-tight">
            Entidades Adheridas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
            Mutuales, federaciones y cooperativas asociadas con convenios de turismo activo y vouchers directos para sus afiliados.
          </p>
        </div>

        {/* Carrusel Contenedor con Flechas Laterales */}
        <div className="relative px-2 sm:px-12">
          
          {/* Botón Flecha Izquierda */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Entidad anterior"
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 shadow-lg text-[#003561] hover:text-[#00A3E0] hover:border-[#00A3E0] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#003561] focus-visible:outline-none"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Ventana de deslizamiento (Slider Track) */}
          <div
            className="overflow-hidden py-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex items-center transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {ENTIDADES_LIST.map((entidad, idx) => (
                <div
                  key={idx}
                  className="shrink-0 px-4 sm:px-6 flex flex-col items-center justify-center text-center group select-none"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* Contenedor del Logo Pirotécnicamente Limpio (sin tarjeta cuadrada) */}
                  <div className="h-20 sm:h-24 w-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <img
                      src={entidad.logo}
                      alt={entidad.name}
                      title={entidad.name}
                      className="max-h-16 sm:max-h-20 max-w-[130px] sm:max-w-[160px] w-auto object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all"
                      loading="lazy"
                    />
                  </div>

                  {/* Nombre y Región debajo del logo */}
                  <span className="text-xs font-extrabold text-slate-800 mt-3 group-hover:text-[#003561] transition-colors line-clamp-1">
                    {entidad.acronym}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wide">
                    {entidad.region}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Flecha Derecha */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Entidad siguiente"
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 shadow-lg text-[#003561] hover:text-[#00A3E0] hover:border-[#00A3E0] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#003561] focus-visible:outline-none"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

        </div>

        {/* Indicadores de Paginación (Dots como en la web oficial) */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Ir a diapositiva ${dotIdx + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer focus-visible:outline-none ${
                dotIdx === currentIndex
                  ? 'w-7 bg-[#00A3E0] shadow-sm'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Franja complementaria de avales institucionales superiores */}
        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 font-semibold">
          <span className="uppercase tracking-wider text-slate-400 font-bold text-[11px]">
            Organismos Fiscalizadores & Marco Legal:
          </span>
          <div className="flex items-center gap-6 grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
            <img
              src="/images/entidades/logo-inaes.webp"
              alt="INAES · Matrícula 25450"
              title="INAES · Matrícula Nacional 25450"
              className="h-8 w-auto object-contain"
            />
            <img
              src="/images/entidades/logo-conam.webp"
              alt="CONAM · Confederación Nacional de Mutualidades"
              title="CONAM · Miembro Oficial"
              className="h-8 w-auto object-contain"
            />
            <img
              src="/images/entidades/logo-odema.webp"
              alt="ODEMA · Organización de Entidades Mutuales de las Américas"
              title="ODEMA Internacional"
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default EntidadesCarousel;
