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
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  Calendar,
  CreditCard,
  ChevronDown
} from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [roleDropdown, setRoleDropdown] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Hoteles & Reservas', href: '/hoteles' },
    { name: 'Regionales', href: '/#regionales' },
    { name: 'Entidades Adheridas', href: '/#entidades-adheridas' },
    { name: 'Autoridades', href: '/autoridades' },
    { name: 'Nuestra Misión', href: '/nuestra-mision' },
    { name: 'Contacto', href: '/#contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-fedetur-dark/95 backdrop-blur-md text-white border-b border-white/10 shadow-lg">
      {/* Top Banner de Matrícula y Asistencia */}
      <div className="bg-black/40 text-[11px] py-1 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-fedetur-lime text-fedetur-dark px-1.5 py-0.5 rounded font-black text-[9px]">
              INAES 25450
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Federación de Cooperativas y Mutuales de la Red Federal de Turismo
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href="mailto:info@fedetur.ar" className="hover:text-fedetur-lime flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>info@fedetur.ar</span>
            </a>
            <a 
              href="https://www.instagram.com/fedeturargentina25450/?hl=es" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-fedetur-pink text-slate-400 font-semibold"
            >
              @fedeturargentina
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-fedetur-lime flex items-center justify-center text-fedetur-dark font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              FD
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                FEDETUR
                <span className="w-2 h-2 rounded-full bg-fedetur-lime inline-block animate-pulse" />
              </span>
              <span className="text-[10px] text-slate-300 uppercase tracking-widest font-medium">
                Turismo Social & Solidario
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-fedetur-lime ${
                    isActive ? 'text-fedetur-lime' : 'text-slate-200'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User & Portals Action Menu */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Access Roles Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdown(!roleDropdown)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white border border-white/10 transition-all"
              >
                <span>Portales</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {roleDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl py-2 text-slate-800 border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setRoleDropdown(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                    Accesos Especializados
                  </div>
                  <Link
                    href="/afiliado/dashboard"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-fedetur-dark"
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold">Portal Afiliado</div>
                      <div className="text-[10px] text-slate-400">Carnet y Mis Reservas</div>
                    </div>
                  </Link>
                  <Link
                    href="/hotel/portal"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-fedetur-dark"
                  >
                    <Building className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-bold">Portal Hotel / Prestador</div>
                      <div className="text-[10px] text-slate-400">Publicar y Gestionar Plazas</div>
                    </div>
                  </Link>
                  <Link
                    href="/admin"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-fedetur-dark"
                  >
                    <Shield className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-bold">Admin FEDETUR</div>
                      <div className="text-[10px] text-slate-400">Auditoría, Padrón y Finanzas</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Login / Registro */}
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              Iniciar Sesión
            </Link>

            <Link
              href="/auth/registro"
              className="px-4 py-2.5 rounded-xl text-xs font-black text-fedetur-dark bg-fedetur-lime hover:bg-fedetur-lime-dark transition-all shadow-md hover:shadow-fedetur-lime/20"
            >
              Registrarme
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Abrir Menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-fedetur-navy border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-fedetur-lime"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="text-xs uppercase font-bold text-slate-400 px-3">Portales</div>
            <Link
              href="/afiliado/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-emerald-400 bg-white/5"
            >
              <User className="w-4 h-4" />
              <span>Portal Afiliado (Carnet)</span>
            </Link>
            <Link
              href="/hotel/portal"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-blue-400 bg-white/5"
            >
              <Building className="w-4 h-4" />
              <span>Portal Hoteles (Carga & Plazas)</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-amber-400 bg-white/5"
            >
              <Shield className="w-4 h-4" />
              <span>Admin FEDETUR (Auditoría)</span>
            </Link>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-white bg-white/10"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/registro"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-black text-fedetur-dark bg-fedetur-lime"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
