import React from 'react';
import { Region } from '@/types/database';

interface RegionBadgeProps {
  region: Region;
  className?: string;
}

export function RegionBadge({ region, className = '' }: RegionBadgeProps) {
  const getColors = (reg: Region) => {
    switch (reg) {
      case 'NEA':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'NOA':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Centro':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cuyo':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Buenos Aires':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Patagonia':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'Malvinas':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getColors(
        region
      )} ${className}`}
    >
      📍 Región {region}
    </span>
  );
}
