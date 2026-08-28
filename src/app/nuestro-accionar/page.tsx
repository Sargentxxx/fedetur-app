import React from 'react';
import { Award, Sparkles, Building2, Users, CheckCircle2 } from 'lucide-react';

export default function AccionarPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-black text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full">
          Presencia & Articulación
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Nuestro Accionar & F.I.T.
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          FEDETUR en la Feria Internacional de Turismo y la consolidación de pactos cooperativos en todo el país.
        </p>
      </div>

      <div className="space-y-12">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900">
            FEDETUR en la Feria Internacional de Turismo (F.I.T.)
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Nuestra participación activa y continua en la <strong>Feria Internacional de Turismo</strong> ha sido fundamental para posicionar a las entidades de la Economía Social y Solidaria (ESS) en el mercado turístico nacional e internacional.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Durante años consecutivos, hemos logrado dar visibilidad y concientizar sobre la importancia de la ESS, construyendo puentes entre el turismo social y el sector convencional para forjar nuevos convenios y alianzas estratégicas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <div className="text-2xl font-black text-fedetur-dark">+500</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">Convenios de Alojamiento</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <div className="text-2xl font-black text-emerald-700">6 Regiones</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">Articulación Territorial</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <div className="text-2xl font-black text-fedetur-dark">100%</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">Economía Solidaria</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
