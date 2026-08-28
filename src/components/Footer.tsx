import React from 'react';
import Link from 'next/link';
import { Mail, Instagram, Youtube, MapPin, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { FEDETUR_INFO } from '@/lib/mockData';

export function Footer() {
  return (
    <footer className="bg-fedetur-slate text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: FEDETUR Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-fedetur-lime flex items-center justify-center text-fedetur-dark font-black text-xl">
                FD
              </div>
              <div>
                <h3 className="font-extrabold text-lg tracking-tight">FEDETUR</h3>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Matrícula I.N.A.E.S. 25450
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Federación de Cooperativas y Mutuales de la Red Federal de Turismo Coop. Ltda. Impulsando el desarrollo territorial a través del Turismo Social y Solidario en toda la República Argentina.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={FEDETUR_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-fedetur-pink hover:text-fedetur-dark flex items-center justify-center text-slate-300 transition-colors"
                title="Instagram FEDETUR"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={FEDETUR_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
                title="YouTube FEDETUR"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${FEDETUR_INFO.email}`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-fedetur-lime hover:text-fedetur-dark flex items-center justify-center text-slate-300 transition-colors"
                title="Email FEDETUR"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Institucional & Accionar */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-fedetur-lime mb-4">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/autoridades" className="hover:text-white transition-colors">
                  Consejo de Administración & Autoridades
                </Link>
              </li>
              <li>
                <Link href="/nuestra-mision" className="hover:text-white transition-colors">
                  Nuestra Misión y Principios
                </Link>
              </li>
              <li>
                <Link href="/nuestro-accionar" className="hover:text-white transition-colors">
                  Nuestro Accionar & F.I.T.
                </Link>
              </li>
              <li>
                <Link href="/censo-2025" className="hover:text-white transition-colors">
                  Censo Federal de Entidades 2025-2026
                </Link>
              </li>
              <li>
                <Link href="/#entidades-adheridas" className="hover:text-white transition-colors">
                  Entidades Mutuales y Cooperativas Adheridas
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Red Federal & Destinos */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-fedetur-lime mb-4">
              Regionales & Turismo
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/hoteles?region=NEA" className="hover:text-white transition-colors">
                  Región NEA (Iguazú, Chaco, Corrientes)
                </Link>
              </li>
              <li>
                <Link href="/hoteles?region=NOA" className="hover:text-white transition-colors">
                  Región NOA (Salta, Jujuy, Santiago del Estero)
                </Link>
              </li>
              <li>
                <Link href="/hoteles?region=Centro" className="hover:text-white transition-colors">
                  Región Centro (Córdoba, Santa Fe, Entre Ríos)
                </Link>
              </li>
              <li>
                <Link href="/hoteles?region=Cuyo" className="hover:text-white transition-colors">
                  Región Cuyo (Mendoza, San Juan, San Luis)
                </Link>
              </li>
              <li>
                <Link href="/hoteles?region=Buenos+Aires" className="hover:text-white transition-colors">
                  Región Buenos Aires & Costa Atlántica
                </Link>
              </li>
              <li>
                <Link href="/hoteles?region=Patagonia" className="hover:text-white transition-colors">
                  Región Patagonia & Islas Malvinas
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Portales & Contacto */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-fedetur-lime mb-4">
              Portales & Contacto
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 mb-4">
              <li>
                <Link href="/afiliado/dashboard" className="text-emerald-400 hover:underline font-semibold">
                  Acceso Portal Afiliado (Carnet Digital)
                </Link>
              </li>
              <li>
                <Link href="/hotel/portal" className="text-blue-400 hover:underline font-semibold">
                  Portal Hoteles (Publicar Alojamiento)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:underline font-semibold">
                  Administración FEDETUR (Auditoría)
                </Link>
              </li>
            </ul>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-[11px] text-slate-300">
              <div className="font-bold text-white mb-1">Sede Central CABA</div>
              <div className="flex items-start gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-fedetur-lime mt-0.5" />
                <span>Ciudad Autónoma de Buenos Aires, República Argentina</span>
              </div>
              <div className="mt-2 text-fedetur-lime font-mono">info@fedetur.ar</div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & INAES Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-fedetur-lime" />
            <span>
              &copy; {new Date().getFullYear()} FEDETUR Coop. Ltda. • Matrícula I.N.A.E.S. 25450 • Todos los derechos reservados.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/nuestra-mision" className="hover:text-white">Términos de Servicio</Link>
            <span>•</span>
            <Link href="/nuestra-mision" className="hover:text-white">Política de Privacidad</Link>
            <span>•</span>
            <span className="text-fedetur-lime font-bold">Desarrollo Social & Solidario</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
