'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  DollarSign, 
  Calendar, 
  History, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Database, 
  FileSpreadsheet,
  Download,
  Filter,
  Eye
} from 'lucide-react';
import { INITIAL_HOTELS, MOCK_BOOKINGS, AFFILIATED_ENTITIES, FEDETUR_INFO } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'afiliados' | 'hoteles' | 'auditoria'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Audit Logs inmutables
  const [auditLogs] = useState([
    {
      id: 'log-1',
      timestamp: '2026-08-28 12:35:10',
      user: 'albertoezequielcrm@gmail.com',
      action: 'PAYMENT_MERCADOPAGO_APPROVED',
      entity: 'Booking: FDT-2026-8941',
      ip: '190.245.12.89',
      details: 'Monto: $318.750 ARS • Tarjeta Crédito • Aprobado sin observaciones',
    },
    {
      id: 'log-2',
      timestamp: '2026-08-28 11:20:04',
      user: 'recepcion.iguazu@fedetur.ar',
      action: 'VOUCHER_QR_SCANNED',
      entity: 'Booking: FDT-2026-8941',
      ip: '181.44.201.33',
      details: 'Huésped verificado: Alberto Ezequiel García • Check-In confirmado',
    },
    {
      id: 'log-3',
      timestamp: '2026-08-28 09:14:22',
      user: 'admin.consejo@fedetur.ar',
      action: 'HOTEL_APPROVAL_GRANTED',
      entity: 'Hotel: Posada Colonial Valles Calchaquíes',
      ip: '186.136.90.10',
      details: 'Resolución de Consejo N° 84/2026 • Convenio de tarifa 25% OFF',
    },
    {
      id: 'log-4',
      timestamp: '2026-08-27 18:40:55',
      user: 'sistema.auth@fedetur.ar',
      action: 'NEW_AFFILIATE_REGISTERED',
      entity: 'Afiliado: DNI 38.492.019',
      ip: '190.19.144.2',
      details: 'Entidad: Mutual Personal SAMEEP (Mu.Pe.Sa CHACO) • Verificado',
    },
  ]);

  // Lista demo de afiliados
  const affiliatesList = [
    { id: '1', name: 'Alberto Ezequiel García', dni: '38.492.019', entity: 'Mutual Personal SAMEEP', region: 'NEA', status: 'Activo', date: '15/01/2025' },
    { id: '2', name: 'María Laura Gómez', dni: '39.102.394', entity: 'Mutual Capital', region: 'NOA', status: 'Activo', date: '02/02/2025' },
    { id: '3', name: 'Carlos Mendoza', dni: '28.910.442', entity: 'Cooperativa FECOVIMA', region: 'Buenos Aires', status: 'Activo', date: '14/03/2025' },
    { id: '4', name: 'Irma Beatriz Pérez', dni: '33.401.992', entity: 'Mutual FOCOMEJ', region: 'Buenos Aires', status: 'Activo', date: '29/04/2025' },
    { id: '5', name: 'Gustavo R. Morales', dni: '35.882.109', entity: 'FEMMEVI Mendoza', region: 'Cuyo', status: 'Activo', date: '10/05/2025' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Cabecera de Administración Central */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black px-2 py-0.5 rounded-full">
                  SUPER ADMINISTRADOR
                </span>
                <span className="text-[10px] text-slate-400">INAES Matrícula 25450</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Backoffice General FEDETUR</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Panel Central de Control Estricto, Padrón Nacional de Afiliados y Auditoría Inmutable de Operaciones.
              </p>
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-right">
            <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 justify-end">
              <Database className="w-3 h-3 text-fedetur-lime" />
              <span>Base de Datos Supabase</span>
            </div>
            <div className="text-xs font-mono font-bold text-fedetur-lime mt-0.5">
              albertoezequielcrm@gmail.com
            </div>
            <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">
              ● Conexión RLS Encriptada
            </span>
          </div>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Métricas & Resumen</span>
          </button>

          <button
            onClick={() => setActiveTab('afiliados')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'afiliados' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Padrón de Afiliados ({affiliatesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hoteles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'hoteles' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Hoteles & Aprobaciones ({INITIAL_HOTELS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('auditoria')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'auditoria' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Log Inmutable de Auditoría</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. OVERVIEW: KPIS FINANCIEROS Y OPERACIONALES                             */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase">Volumen Transaccionado</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-slate-900">$24.890.000</div>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">+18.5% este mes</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase">Reservas Totales</span>
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-3xl font-black text-slate-900">342</div>
              <span className="text-[10px] text-slate-500 block mt-1">98.2% confirmadas</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase">Afiliados Activos</span>
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-3xl font-black text-slate-900">12.450</div>
              <span className="text-[10px] text-slate-500 block mt-1">Padrón Federal Cruzado</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase">Hoteles Habilitados</span>
                <Building2 className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-3xl font-black text-slate-900">{INITIAL_HOTELS.length}</div>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">En las 6 Regiones</span>
            </div>
          </div>

          {/* Últimas Reservas Registradas */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Últimas Operaciones de Reserva</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3">Código</th>
                    <th className="p-3">Afiliado</th>
                    <th className="p-3">Establecimiento</th>
                    <th className="p-3">Fechas</th>
                    <th className="p-3">Monto</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_BOOKINGS.map((bk) => (
                    <tr key={bk.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-fedetur-dark">{bk.booking_code}</td>
                      <td className="p-3 font-semibold text-slate-800">{bk.affiliate_name}</td>
                      <td className="p-3 text-slate-600">{bk.hotel_name}</td>
                      <td className="p-3 text-slate-500">{bk.check_in_date} al {bk.check_out_date}</td>
                      <td className="p-3 font-black text-emerald-800">{formatCurrency(bk.total_amount)}</td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          {bk.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PADRÓN DE AFILIADOS                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'afiliados' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Padrón General de Afiliados</h2>
              <p className="text-xs text-slate-500">Listado auditado de asociados habilitados para beneficios y descuentos.</p>
            </div>
            <button
              onClick={() => alert('Exportando padrón a CSV/Excel...')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors flex items-center gap-1.5 self-start"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Padrón</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
                <tr>
                  <th className="p-3">Nombre y Apellido</th>
                  <th className="p-3">DNI / CUIT</th>
                  <th className="p-3">Mutual / Cooperativa</th>
                  <th className="p-3">Región</th>
                  <th className="p-3">Fecha Alta</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {affiliatesList.map((aff) => (
                  <tr key={aff.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{aff.name}</td>
                    <td className="p-3 font-mono text-slate-700">{aff.dni}</td>
                    <td className="p-3 text-slate-700">{aff.entity}</td>
                    <td className="p-3 font-semibold text-slate-500">{aff.region}</td>
                    <td className="p-3 text-slate-400">{aff.date}</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        ✓ {aff.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. GESTIÓN DE HOTELES                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'hoteles' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Control y Aprobación de Alojamientos</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
                <tr>
                  <th className="p-3">Establecimiento</th>
                  <th className="p-3">Ubicación</th>
                  <th className="p-3">Región</th>
                  <th className="p-3">Contacto</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INITIAL_HOTELS.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{h.name}</td>
                    <td className="p-3 text-slate-600">{h.city}, {h.province}</td>
                    <td className="p-3 font-semibold text-slate-700">{h.region}</td>
                    <td className="p-3 text-slate-500">{h.contact_email}</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                        HABILITADO
                      </span>
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/hoteles/${h.slug || h.id}`}
                        className="text-xs font-bold text-fedetur-dark hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LOG INMUTABLE DE AUDITORÍA (CONTROL ESTRICTO)                         */}
      {/* ========================================================================= */}
      {activeTab === 'auditoria' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Registro Inmutable de Auditoría</h2>
              <p className="text-xs text-slate-500">Trazabilidad criptográfica de todas las operaciones, pagos y accesos.</p>
            </div>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>{log.timestamp}</span>
                  <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    IP: {log.ip}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-700">{log.action}</span>
                  <span className="text-slate-500">por</span>
                  <strong className="text-slate-900 font-sans">{log.user}</strong>
                </div>
                <p className="text-slate-600 font-sans text-xs">
                  {log.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
