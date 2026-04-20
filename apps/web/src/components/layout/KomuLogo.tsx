import React from 'react';

interface KomuLogoProps {
  className?: string;
  size?: number;
  light?: boolean;
}

export function KomuLogo({ className = "", size = 40, light = false }: KomuLogoProps) {
  // Calculamos el ancho proporcional (aprox 3.5 veces el alto para el conjunto icono + texto)
  const width = size * 3.5;
  const textColor = light ? "#FFFFFF" : "#0f172a";

  return (
    <svg 
      width={width} 
      height={size} 
      viewBox="0 0 140 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-sm transition-transform duration-300 hover:scale-105 ${className}`}
    >
      {/* Icono Logo (Nodo K) */}
      <rect width="40" height="40" rx="10" fill="#0f172a" />
      <path d="M14 12V28" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 20L26 12" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 20L26 28" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="14" cy="20" r="2.5" fill="#38bdf8" />

      {/* Texto "Komu" estilizado dentro del SVG */}
      <text 
        x="50" 
        y="28" 
        fill={textColor} 
        style={{ 
          fontFamily: 'var(--font-outfit), sans-serif', 
          fontWeight: 900, 
          fontSize: '24px',
          letterSpacing: '-0.05em'
        }}
      >
        Komu
      </text>
    </svg>
  );
}
