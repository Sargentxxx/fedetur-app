'use client';

import React from 'react';

interface FedeturLogoProps {
  variant?: 'light' | 'dark' | 'white' | 'auto';
  className?: string;
  showSubtitle?: boolean;
  showBadge?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function FedeturLogo({
  variant = 'auto',
  className = '',
  showBadge = true,
  size = 'md',
}: FedeturLogoProps) {
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  const imageSrc =
    variant === 'white' || variant === 'light'
      ? '/images/logo-fedetur-white.png'
      : '/images/logo-fedetur.png';

  const isWhiteVariant = variant === 'white' || variant === 'light';

  // Filtro de contorno oscuro perimetral para que las letras blancas y especialmente el 'tur' celeste
  // destaquen con nitidez absoluta y borde definido sobre cualquier fondo oscuro (navbar, hero, etc.)
  const logoOutlineFilter: React.CSSProperties = isWhiteVariant
    ? {
        filter:
          'drop-shadow(1px 0 0 #000814) drop-shadow(-1px 0 0 #000814) drop-shadow(0 1px 0 #000814) drop-shadow(0 -1px 0 #000814) drop-shadow(1px 1px 0 #000814) drop-shadow(-1px -1px 0 #000814) drop-shadow(1px -1px 0 #000814) drop-shadow(-1px 1px 0 #000814) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.9)) brightness(1.08) contrast(1.05)',
      }
    : {
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
      };

  return (
    <div className={`inline-flex items-center gap-3.5 group select-none ${className}`}>
      {/* Contenedor del logotipo con efecto nativo y resplandor sutil */}
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
        <img
          src={imageSrc}
          alt="FEDETUR · Federación de Turismo"
          style={logoOutlineFilter}
          className={`${heights[size]} w-auto object-contain`}
          loading="eager"
        />
      </div>

      {/* Subtítulo institucional / Badge federativo */}
      {showBadge && (
        <div className="hidden xl:flex flex-col pl-3 border-l border-slate-200 dark:border-white/10">
          <span className="text-[11px] font-extrabold tracking-wider text-[#003561] dark:text-sky-300 uppercase leading-none">
            Red Federal
          </span>
          <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-0.5">
            INAES 25450
          </span>
        </div>
      )}
    </div>
  );
}

export default FedeturLogo;
