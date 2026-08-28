'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, User, Building2, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AFFILIATED_ENTITIES } from '@/lib/mockData';

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'afiliado' | 'hotel'>('afiliado');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedEntity, setSelectedEntity] = useState(AFFILIATED_ENTITIES[0].name);
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (accountType === 'afiliado') {
        router.push('/afiliado/dashboard');
      } else {
        router.push('/hotel/portal');
      }
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-fedetur-lime text-fedetur-dark font-black text-xl flex items-center justify-center mx-auto shadow-md">
            FD
          </div>
          <h1 className="text-2xl font-black text-slate-900">Crear Cuenta en FEDETUR</h1>
          <p className="text-xs text-slate-500">
            Unite a la Red Federal de Turismo Social y Solidario (Matrícula INAES 25450)
          </p>
        </div>

        {/* Selector de Tipo de Cuenta */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setAccountType('afiliado')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
              accountType === 'afiliado' ? 'bg-white text-fedetur-dark shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4 text-emerald-600" />
            <span>Afiliado / Mutualista</span>
          </button>

          <button
            type="button"
            onClick={() => setAccountType('hotel')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
              accountType === 'hotel' ? 'bg-white text-fedetur-dark shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Prestador Hotelero</span>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {accountType === 'afiliado' ? 'Nombre y Apellido' : 'Nombre del Responsable'}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">DNI / CUIT</label>
              <input
                type="text"
                required
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="38.492.019"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Teléfono / WhatsApp</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+54 9 11 ..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
              />
            </div>
          </div>

          {accountType === 'afiliado' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Mutual o Cooperativa de Origen</label>
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
              >
                {AFFILIATED_ENTITIES.map((ent) => (
                  <option key={ent.id} value={ent.name}>
                    {ent.name} ({ent.province} - {ent.region})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Contraseña de Seguridad</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-fedetur-dark focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-fedetur-dark hover:bg-fedetur-navy text-white font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <span>{loading ? 'Creando cuenta...' : 'Confirmar Registro en FEDETUR'}</span>
            <ArrowRight className="w-4 h-4 text-fedetur-lime" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          ¿Ya tenés una cuenta registrada?{' '}
          <Link href="/auth/login" className="font-bold text-fedetur-dark hover:underline">
            Iniciá sesión aquí
          </Link>
        </div>

      </div>
    </div>
  );
}
