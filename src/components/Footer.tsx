import React from 'react';
import Link from 'next/link';
import { Mail, Instagram, Youtube, MapPin, Award, ShieldCheck, Phone, CheckCircle } from 'lucide-react';
import { FEDETUR_INFO } from '@/lib/mockData';
import { FedeturLogo } from '@/components/FedeturLogo';

export function Footer() {
  return (
    <footer className="bg-[#001C38] text-white pt-16 pb-10 border-t border-white/10 mt-auto">
      <div className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          
          {/* Col 1: FEDETUR Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <FedeturLogo variant="white" size="lg" showBadge={false} />
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
              Federación de Cooperativas y Mutuales de la Red Federal de Turismo Social, Solidario y Comunitario Coop. Ltda. (Matrícula I.N.A.E.S. 25450). Articulando a mutuales, cooperativas y complejos turísticos en beneficio del pueblo trabajador.
            </p>

            {/* Redes Sociales y Contacto Rápido */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={FEDETUR_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#00A3E0] hover:text-white flex items-center justify-center text-slate-300 transition-all shadow-sm"
                title="Instagram FEDETUR"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={FEDETUR_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-300 transition-all shadow-sm"
                title="YouTube FEDETUR"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${FEDETUR_INFO.email}`}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#00A3E0] hover:text-white flex items-center justify-center text-slate-300 transition-all shadow-sm"
                title="Email FEDETUR"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${FEDETUR_INFO.phone}`}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-slate-300 transition-all shadow-sm"
                title="Teléfono Mesa Federal"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Sello de Matrícula */}
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-sky-200">
              <CheckCircle className="w-4 h-4 text-sky-400" />
              <span>Entidad Auditada & Homologada por el Estado Nacional</span>
            </div>
          </div>

          {/* Col 2: Explorar Portal */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-sky-300 mb-4">
              Explorar Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio & Buscador
                </Link>
              </li>
              <li>
                <Link href="/hoteles" className="hover:text-white transition-colors">
                  Catálogo Federal de Hoteles
                </Link>
              </li>
              <li>
                <Link href="/#regionalizacion" className="hover:text-white transition-colors">
                  Regiones Federales INAES
                </Link>
              </li>
              <li>
                <Link href="/#beneficios" className="hover:text-white transition-colors">
                  Beneficios y Descuentos
                </Link>
              </li>
              <li>
                <Link href="/#entidades" className="hover:text-white transition-colors">
                  Entidades Mutuales Adheridas
                </Link>
              </li>
              <li>
                <Link href="/#contacto-portal" className="hover:text-white transition-colors">
                  Mesa de Ayuda Federal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hoteles & Prestadores */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-300 mb-4">
              Hoteles & Mutuales
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/hotel/portal" className="hover:text-white transition-colors font-bold text-amber-200">
                  Alta de Hotel / Prestador
                </Link>
              </li>
              <li>
                <Link href="/afiliado/dashboard" className="hover:text-white transition-colors">
                  Carnet Digital con QR
                </Link>
              </li>
              <li>
                <Link href="/auth/registro" className="hover:text-white transition-colors">
                  Afiliación para Mutuales
                </Link>
              </li>
              <li>
                <Link href="/censo-2025" className="hover:text-white transition-colors">
                  Censo Federal 2025
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Panel de Administración
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institucional & Legal */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-sky-300 mb-4">
              Marco Institucional
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/autoridades" className="hover:text-white transition-colors">
                  Consejo de Administración
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
                <span className="text-slate-400">
                  Miembro C.O.N.A.M. & O.D.E.M.A.
                </span>
              </li>
              <li>
                <span className="text-slate-400">
                  Sede: Av. de Mayo 822, CABA
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Fila Inferior de Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} FEDETUR · Matrícula I.N.A.E.S. 25450 · Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:mesadeayuda@fedetur.ar" className="hover:text-white transition-colors">
              Mesa de Ayuda
            </a>
            <Link href="/#contacto-portal" className="hover:text-white transition-colors">
              Libro de Quejas Digital
            </Link>
            <span className="text-slate-500">República Argentina</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
