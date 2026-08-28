'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { UserProfile } from '@/types/database';
import { ShieldCheck, Sparkles, Building2, User, CreditCard } from 'lucide-react';

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
      <div className="carnet-hologram rounded-3xl p-6 text-white border border-fedetur-lime/30 shadow-2xl relative overflow-hidden">
        {/* Cabecera del Carnet */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-fedetur-lime flex items-center justify-center text-fedetur-dark font-black text-xl shadow-lg">
              FD
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-fedetur-lime">
                República Argentina
              </span>
              <h4 className="font-extrabold text-sm leading-tight text-white">
                FEDETUR DIGITAL
              </h4>
              <p className="text-[10px] text-slate-300">
                Matrícula I.N.A.E.S. 25450
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3" />
              AFILIADO ACTIVO
            </span>
          </div>
        </div>

        {/* Cuerpo del Carnet */}
        <div className="my-5 grid grid-cols-3 gap-4 items-center">
          <div className="col-span-2 space-y-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Titular Afiliado
              </span>
              <p className="font-bold text-base text-white tracking-wide">
                {profile.full_name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  DNI / CUIT
                </span>
                <p className="font-mono text-xs font-bold text-fedetur-lime">
                  {profile.dni_cuit || '38.492.019'}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  ID Credencial
                </span>
                <p className="font-mono text-xs text-slate-200">
                  FDT-{profile.id.slice(0, 6).toUpperCase()}
                </p>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Mutual / Cooperativa
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-100 font-medium">
                <Building2 className="w-3.5 h-3.5 text-fedetur-lime shrink-0" />
                <span className="truncate">{profile.entity_name || 'Mutual Personal SAMEEP (Mu.Pe.Sa)'}</span>
              </div>
            </div>
          </div>

          {/* QR de Validación en Hotel */}
          <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-2xl shadow-inner">
            <QRCodeSVG value={qrData} size={88} level="M" />
            <span className="text-[8px] font-black text-slate-800 uppercase mt-1 tracking-wider">
              Escanear Hotel
            </span>
          </div>
        </div>

        {/* Footer del Carnet */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
          <span>Válido para convenios hoteleros nacionales</span>
          <span className="font-mono text-fedetur-lime">VENCE: 12/2027</span>
        </div>
      </div>
    </div>
  );
}
