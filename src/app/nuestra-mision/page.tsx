import React from 'react';
import { ShieldCheck, HeartHandshake, Compass, Users, Award } from 'lucide-react';
import { FEDETUR_INFO } from '@/lib/mockData';

export default function MissionPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3.5 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          <span>Matrícula I.N.A.E.S. 25450</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Nuestra Misión y Principios
        </h1>
        <p className="text-lg text-slate-600 font-medium">
          &ldquo;{FEDETUR_INFO.slogan}&rdquo;
        </p>
      </div>

      <div className="space-y-12 text-slate-700 leading-relaxed text-sm sm:text-base">
        
        {/* Declaración de Misión */}
        <div className="bg-fedetur-sand rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-slate-900">¿Quiénes Somos?</h2>
          <p>
            Somos la <strong>Red Federal</strong> que articula a las Entidades de la Economía Social y Solidaria (ESS) con servicios turísticos, sociales y comunitarios. Promovemos el turismo accesible, responsable y transformador, fortaleciendo a cada <strong>COOPERATIVA y MUTUAL</strong> como protagonista del desarrollo local y regional.
          </p>
          <p>
            Entendemos el turismo no como un mero bien de consumo mercantilista, sino como un <strong>derecho social fundamental</strong> que favorece el descanso, la salud psicofísica, la integración familiar y el conocimiento de la geografía, cultura e historia de nuestra patria.
          </p>
        </div>

        {/* Pilares Fundamentales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ayuda Recíproca</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              El motor que mantiene en movimiento la interrelación entre FEDETUR y las entidades es la solidaridad activa. El crecimiento de cada mutual fortalece a toda la federación.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Desarrollo Territorial</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generamos circuitos turísticos en destinos no tradicionales, impulsando economías regionales, cooperativas de trabajo gastronómicas y prestadores locales.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Calidad & Transparencia</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supervisión continua de la calidad de servicio hotelero, tarifas justas protegidas y auditoría inmutable en cada reserva y transacción.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
