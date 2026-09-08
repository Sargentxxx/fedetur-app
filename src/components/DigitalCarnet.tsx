'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { UserProfile } from '@/types/database';
import { ShieldCheck, Sparkles, Building2, User, CreditCard, Award } from 'lucide-react';
import { FedeturLogo } from '@/components/FedeturLogo';

interface DigitalCarnetProps {
  profile: UserProfile;
}

export function DigitalCarnet({ profile }: DigitalCarnetProps) {
  const qrData = JSON.stringify({
    fedetur_id: profile.id,
    dni: profile.dni_cuit,
    entity: profile.entity_name || 'FEDETUR Afiliado',
    verified: profile.is_verified,
    valid_until: '2027-12-31',
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="carnet-hologram rounded-3xl p-7 text-white border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,30,60,0.6)] relative overflow-hidden backdrop-blur-xl">
        
        {/* Marca de agua decorativa de fondo */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

        {/* Cabecera del Carnet con Logo Oficial */}
        <div className="flex items-start justify-between border-b border-white/15 pb-5 relative z-10">
          <div className="flex items-center gap-3">
            <FedeturLogo variant="white" size="sm" showBadge={false} />
            <div className="flex flex-col border-l border-white/20 pl-2.5">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300">
                INAES 25450
              </span>
              <span className="text-[9px] text-white/70 uppercase tracking-widest font-medium">
                Red Federal
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              BENEFICIO ACTIVO
            </span>
          </div>
        </div>

        {/* Cuerpo del Carnet */}
        <div className="my-6 grid grid-cols-3 gap-4 items-center relative z-10">
          <div className="col-span-2 space-y-3.5">
            <div>
              <span className="text-[10px] text-sky-200/70 uppercase font-bold block tracking-wider">
                Titular Afiliado
              </span>
              <p className="font-extrabold text-lg text-white tracking-tight leading-snug">
                {profile.full_name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[9px] text-sky-200/70 uppercase font-bold block">
                  D.N.I. / CUIT
                </span>
                <p className="font-bold text-xs text-white/90">
                  {profile.dni_cuit}
                </p>
              </div>
              <div>
                <span className="text-[9px] text-sky-200/70 uppercase font-bold block">
                  Rol Mutual
                </span>
                <p className="font-bold text-xs text-sky-300 capitalize">
                  {profile.role}
                </p>
              </div>
            </div>

            <div>
              <span className="text-[9px] text-sky-200/70 uppercase font-bold block">
                Entidad de Pertenencia
              </span>
              <p className="font-semibold text-xs text-white/90 line-clamp-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-[#38B6FF] shrink-0" />
                <span>{profile.entity_name || 'Mutual Homologada FEDETUR'}</span>
              </p>
            </div>
          </div>

          {/* Código QR Dinámico */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="p-2.5 bg-white rounded-2xl shadow-xl border-2 border-sky-400/40">
              <QRCodeSVG
                value={qrData}
                size={86}
                level="M"
                fgColor="#003561"
                bgColor="#ffffff"
              />
            </div>
            <span className="text-[9px] font-bold text-sky-200 mt-2 tracking-wider uppercase">
              Check-In QR
            </span>
          </div>
        </div>

        {/* Pie del Carnet */}
        <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[10px] text-white/75 relative z-10">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Validez: <strong>Diciembre 2027</strong></span>
          </div>
          <span className="text-[9px] font-semibold text-sky-200/80">
            24 Jurisdicciones Federales
          </span>
        </div>

      </div>
    </div>
  );
}

export default DigitalCarnet;
