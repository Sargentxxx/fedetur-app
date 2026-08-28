'use client';

import React, { useState } from 'react';
import { FileText, CheckCircle2, Building2, Send, ShieldCheck } from 'lucide-react';
import { Region } from '@/types/database';

export default function CensoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-black text-blue-800 uppercase tracking-widest bg-blue-100 px-3.5 py-1 rounded-full">
          Registro Oficial Federal
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Censo Federal de Entidades 2025-2026
        </h1>
        <p className="text-sm text-slate-600">
          Relevamiento institucional para cooperativas, mutuales y prestadores turísticos con el fin de articular la oferta federal de turismo social.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
        {submitted ? (
          <div className="text-center space-y-3 py-8">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">¡Entidad Registrada en el Censo!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Los datos fueron recibidos por el Consejo de FEDETUR. Un coordinador regional se pondrá en contacto para formalizar el convenio.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nombre Legal de la Entidad</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Asociación Mutual ..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Matrícula I.N.A.E.S. / Personería</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. MAT-18492"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Entidad</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none">
                  <option value="mutual">Mutual</option>
                  <option value="cooperativa">Cooperativa</option>
                  <option value="federacion">Federación</option>
                  <option value="hotel">Prestador Hotelero</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Región</label>
                <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none">
                  <option value="NEA">Región NEA</option>
                  <option value="NOA">Región NOA</option>
                  <option value="Centro">Región Centro</option>
                  <option value="Cuyo">Región Cuyo</option>
                  <option value="Buenos Aires">Región Buenos Aires</option>
                  <option value="Patagonia">Región Patagonia</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Provincia</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Santa Fe"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Institucional</label>
                <input
                  type="email"
                  required
                  placeholder="contacto@entidad.org.ar"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Teléfono Directivo</label>
                <input
                  type="tel"
                  required
                  placeholder="+54 9 ..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-fedetur-dark hover:bg-fedetur-navy text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4 text-fedetur-lime" />
              <span>Enviar Formulario de Censo</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
