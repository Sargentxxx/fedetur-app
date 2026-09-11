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
  CheckCircle2,
  CreditCard,
  ChevronDown,
  Sparkles,
  Phone,
  ArrowRight,
  Lock
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
      {/* Sub-cinta superior institucional Stitch en Azul Federal Noche */}
      <div className="bg-[#001427] text-white py-1.5 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-portal mx-auto flex items-center justify-between text-xs tracking-wide">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-bold tracking-wider text-sky-200 uppercase bg-sky-950/80 border border-sky-400/30 px-2.5 py-0.5 rounded-full text-[10px] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Matrícula I.N.A.E.S. 25450
            </span>
            <span className="text-white/30">|</span>
            <span className="text-white/85 text-[11px] font-medium hidden lg:inline">
              Red Federal de Turismo Social, Solidario y Cooperativo de la República Argentina
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <a 
              href="tel:+541143829000" 
              className="text-white/80 hover:text-sky-300 transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-sky-300" />
              <span>(011) 4382-9000</span>
            </a>
            <span className="text-white/30">•</span>
            <a 
              href="mailto:mesadeayuda@fedetur.ar" 
              className="text-white/80 hover:text-sky-300 transition-colors flex items-center gap-1 font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-sky-300" /> 
              <span>mesadeayuda@fedetur.ar</span>
            </a>
            <span className="text-white/30">•</span>
            <div className="text-amber-300 font-extrabold flex items-center gap-1 bg-amber-400/15 px-2.5 py-0.5 rounded-md border border-amber-400/30 shadow-xs">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>Hasta 30% OFF directo a mutualistas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación principal en Cristal Ahumado Deep Navy (Liquid Glass 2.0) */}
      <div className="bg-[#001D38]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,18,36,0.4)]">
        <div className="max-w-portal mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Oficial FEDETUR en versión Blanca Nítida */}
          <Link href="/" className="shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl p-1 transition-transform hover:scale-[1.02]">
            <FedeturLogo variant="white" size="md" showBadge={true} />
          </Link>

          {/* Links de navegación editorial luminosos */}
          <nav className="hidden xl:flex items-center gap-1.5 text-xs font-bold tracking-wide">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-all px-3 py-1.5 rounded-xl border ${
                    isActive 
                      ? 'text-amber-300 bg-white/10 border-amber-400/40 shadow-sm font-black' 
                      : 'border-transparent text-white/80 hover:text-white hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Acciones y Portales con Acentos Ricos */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Alta de Hoteles / Prestadores */}
            <Link
              href="/hotel/portal"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-sky-400/30 bg-sky-500/10 text-sky-200 hover:bg-sky-500/25 hover:text-white font-bold transition-all text-xs group shadow-xs"
            >
              <Building className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform" />
              <span>Portal Hoteles</span>
            </Link>

            {/* Carnet Digital Afiliado con Brillo Solar Ámbar */}
            <Link
              href="/afiliado/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all text-xs active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-slate-950" />
              <span>Carnet Afiliado</span>
            </Link>

            {/* Selector de Portales Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleDropdown(!roleDropdown)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 font-bold text-xs transition-colors border border-white/15"
                aria-label="Menú de accesos institucionales"
              >
                <span>Accesos</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform ${roleDropdown ? 'rotate-180' : ''}`} />
              </button>

              {roleDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#001D38]/98 backdrop-blur-2xl rounded-2xl shadow-2xl py-2 text-white border border-white/15 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setRoleDropdown(false)}
                >
                  <div className="px-4 py-2 text-[10px] uppercase font-extrabold text-sky-300 border-b border-white/10 tracking-wider flex items-center justify-between">
                    <span>Red Federal de Servicios</span>
                    <Lock className="w-3 h-3 text-sky-400" />
                  </div>
                  <Link
                    href="/afiliado/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 text-xs font-semibold text-white/90 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Portal Afiliados</div>
                      <div className="text-[10px] text-white/60">Carnet Digital & Vouchers</div>
                    </div>
                  </Link>
                  <Link
                    href="/hotel/portal"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 text-xs font-semibold text-white/90 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Portal Hoteles</div>
                      <div className="text-[10px] text-white/60">Alta y Gestión de Plazas</div>
                    </div>
                  </Link>
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 text-xs font-semibold text-white/90 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Administración Central</div>
                      <div className="text-[10px] text-white/60">Auditoría INAES & Convenios</div>
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
              className="sm:hidden px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1 shadow-sm"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Carnet</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil desplegable en Cristal Oscuro */}
      {isOpen && (
        <div className="xl:hidden bg-[#001D38]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl space-y-4 animate-in slide-in-from-top-4 duration-200 text-white">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/hotel/portal"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl border border-sky-400/40 bg-sky-500/15 text-sky-200 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Building className="w-4 h-4 text-sky-300" />
              <span>Portal Hoteles & Prestadores</span>
            </Link>
            <Link
              href="/afiliado/dashboard"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <CreditCard className="w-4 h-4" />
              <span>Mi Carnet Digital con QR</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 text-white/70 font-bold text-xs flex items-center justify-center gap-2 border border-white/10"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Administración INAES</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
