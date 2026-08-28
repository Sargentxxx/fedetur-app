'use client';

import React from 'react';
import { AUTHORITIES } from '@/lib/mockData';
import { ShieldCheck, Building2 } from 'lucide-react';

export default function AuthoritiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          <span>Matrícula I.N.A.E.S. 25450</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Consejo de Administración
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Autoridades y directivos representativos de las cooperativas, mutuales y federaciones de todas las regiones del país que conforman la conducción de FEDETUR.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {AUTHORITIES.map((auth, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-fedetur-lime hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-slate-100 group-hover:border-fedetur-lime transition-all shadow-md bg-slate-100 shrink-0">
              <img
                src={auth.image}
                alt={auth.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              {auth.role}
            </span>

            <h3 className="text-base font-bold text-slate-900 leading-tight">
              {auth.name}
            </h3>

            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {auth.entity}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
