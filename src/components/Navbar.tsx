'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  User, 
  Building, 
  Shield, 
  Mail, 
  CheckCircle,
  CreditCard,
  ChevronDown,
  Sparkles,
  Phone,
  ArrowRight
} from 'lucide-react';
import { FedeturLogo } from '@/components/FedeturLogo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [roleDropdown, setRoleDropdown] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Red Hotelera', href: '/hoteles' },
    { name: 'Regiones', href: '/#regionalizacion' },
    { name: 'Beneficios', href: '/#beneficios' },
    { name: 'Entidades', href: '/#entidades' },
    { name: 'Autoridades', href: '/autoridades' },
    { name: 'Contacto', href: '/#contacto-portal' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Sub-cinta superior institucional Stitch */}
      <div className="bg-[#003561] text-white py-1.5 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-portal mx-auto flex items-center justify-between text-xs tracking-wide">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-bold tracking-wider text-sky-200 uppercase bg-white/10 px-2.5 py-0.5 rounded-full text-[10px]">
              <CheckCircle className="w-3 h-3 text-sky-300" />
              Matrícula I.N.A.E.S. 25450
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/85 text-[11px] font-medium hidden lg:inline">
              Red Federal de Turismo Social, Solidario y Cooperativo de la República Argentina
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <a 
              href="mailto:mesadeayuda@fedetur.ar" 
              className="text-white/80 hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-sky-300" /> 
              <span>mesadeayuda@fedetur.ar</span>
            </a>
            <span className="text-white/40">•</span>
            <div className="text-amber-300 font-bold flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>Hasta 30% OFF directo a mutualistas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación principal en cristal flotante */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_4px_25px_rgba(0,53,97,0.06)]">
        <div className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Oficial FEDETUR Nativo */}
          <Link href="/" className="shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-xl p-1">
            <FedeturLogo variant="auto" size="md" showBadge={true} />
          </Link>

          {/* Links de navegación editorial */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-bold tracking-wide text-slate-600">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-all py-1.5 border-b-2 hover:text-[#003561] ${
                    isActive 
                      ? 'text-[#003561] border-[#00A3E0] font-extrabold' 
                      : 'border-transparent text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Acciones y Portales */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Alta de Hoteles / Prestadores */}
            <Link
              href="/hotel/portal"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-sky-500/30 bg-sky-50 text-[#00658D] hover:bg-[#00658D] hover:text-white font-bold transition-all text-xs group"
            >
              <Building className="w-4 h-4 text-[#00A3E0] group-hover:text-white transition-colors" />
              <span>Portal Hoteles</span>
            </Link>

            {/* Carnet Digital Afiliado */}
            <Link
              href="/afiliado/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#003561] hover:bg-[#004C87] text-white font-bold shadow-md hover:shadow-lg hover:shadow-[#003561]/20 transition-all text-xs"
            >
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Carnet Afiliado</span>
            </Link>

            {/* Selector de Portales Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleDropdown(!roleDropdown)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors border border-slate-200"
                aria-label="Menú de accesos institucionales"
              >
                <span>Accesos</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {roleDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl py-2 text-slate-800 border border-slate-200/80 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setRoleDropdown(false)}
                >
                  <div className="px-4 py-2 text-[10px] uppercase font-extrabold text-slate-400 border-b border-slate-100 tracking-wider">
                    Red Federal de Servicios
                  </div>
                  <Link
                    href="/afiliado/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-[#003561]"
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-slate-900">Portal Afiliados</div>
                      <div className="text-[10px] text-slate-500">Carnet Digital & Vouchers</div>
                    </div>
                  </Link>
                  <Link
                    href="/hotel/portal"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-[#003561]"
                  >
                    <Building className="w-4 h-4 text-sky-600" />
                    <div>
                      <div className="font-bold text-slate-900">Portal Hoteles</div>
                      <div className="text-[10px] text-slate-500">Alta y Gestión de Plazas</div>
                    </div>
                  </Link>
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-[#003561]"
                  >
                    <Shield className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-bold text-slate-900">Administración Central</div>
                      <div className="text-[10px] text-slate-500">Auditoría INAES & Convenios</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/afiliado/dashboard"
              className="sm:hidden px-3 py-1.5 rounded-lg bg-[#003561] text-white text-xs font-bold flex items-center gap-1"
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-300" />
              <span>Carnet</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil desplegable */}
      {isOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-6 py-6 shadow-2xl space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 hover:text-[#003561] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200/80 flex flex-col gap-2.5">
            <Link
              href="/hotel/portal"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl border border-sky-400/40 bg-sky-50 text-[#00658D] font-bold text-xs flex items-center justify-center gap-2"
            >
              <Building className="w-4 h-4 text-[#00A3E0]" />
              <span>Portal Hoteles & Prestadores</span>
            </Link>
            <Link
              href="/afiliado/dashboard"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-[#003561] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <CreditCard className="w-4 h-4 text-amber-300" />
              <span>Mi Carnet Digital con QR</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>Administración INAES</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
