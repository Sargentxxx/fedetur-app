'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, ArrowRight, User, Building, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'afiliado' | 'hotel_admin' | 'super_admin'>('afiliado');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (role === 'afiliado') {
        router.push('/afiliado/dashboard');
      } else if (role === 'hotel_admin') {
        router.push('/hotel/portal');
      } else {
        router.push('/admin');
      }
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-fedetur-lime text-fedetur-dark font-black text-xl flex items-center justify-center mx-auto shadow-md">
            FD
          </div>
          <h1 className="text-2xl font-black text-slate-900">Iniciar Sesión</h1>
          <p className="text-xs text-slate-500">
            Ingresá a la plataforma oficial de la Red Federal de Turismo (INAES 25450)
          </p>
        </div>

        {/* Selector de Tipo de Usuario */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setRole('afiliado')}
            className={`py-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
              role === 'afiliado' ? 'bg-white text-fedetur-dark shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5 text-emerald-600" />
            <span>Afiliado</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('hotel_admin')}
            className={`py-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
              role === 'hotel_admin' ? 'bg-white text-fedetur-dark shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>Hotel</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('super_admin')}
            className={`py-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
              role === 'super_admin' ? 'bg-white text-fedetur-dark shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>FEDETUR</span>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Correo Electrónico</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'super_admin' ? 'albertoezequielcrm@gmail.com' : 'tu@email.com'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Contraseña</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-fedetur-dark hover:bg-fedetur-navy text-white font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <span>{loading ? 'Validando credenciales...' : 'Ingresar a mi Cuenta'}</span>
            <ArrowRight className="w-4 h-4 text-fedetur-lime" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          ¿No tenés una cuenta?{' '}
          <Link href="/auth/registro" className="font-bold text-fedetur-dark hover:underline">
            Registrate gratis aquí
          </Link>
        </div>

      </div>
    </div>
  );
}
