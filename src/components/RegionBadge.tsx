import React from 'react';
import { Region } from '@/types/database';
import { MapPin } from 'lucide-react';

interface RegionBadgeProps {
  region: Region;
  className?: string;
  showIcon?: boolean;
}

export function RegionBadge({ region, className = '', showIcon = true }: RegionBadgeProps) {
  const getColors = (reg: Region) => {
    switch (reg) {
      case 'NEA':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'NOA':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Centro':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Cuyo':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Buenos Aires':
        return 'bg-blue-50 text-[#003561] border-blue-200';
      case 'Patagonia':
        return 'bg-cyan-50 text-cyan-900 border-cyan-200';
      case 'Malvinas':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border tracking-wide shadow-xs ${getColors(
        region
      )} ${className}`}
    >
      {showIcon && <MapPin className="w-3 h-3 text-[#00A3E0]" />}
      <span>Región {region}</span>
    </span>
  );
}

export default RegionBadge;
