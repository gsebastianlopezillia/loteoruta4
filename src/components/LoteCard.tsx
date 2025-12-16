import { useState } from 'react';
import { useCurrencyConversion } from '../hooks/useCurrencyConversion';

interface LoteCardProps {
  numero: number;
  superficie: string;
  precioUSD: number; // Precio en dólares
  dimensiones: string;
  forma: 'triangular' | 'rectangular';
  estado: 'disponible' | 'vendido';
}

export function LoteCard({ numero, superficie, precioUSD, dimensiones, forma, estado }: LoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDisponible = estado === 'disponible';
  const { getPriceInARS, formatCurrency, loading } = useCurrencyConversion(precioUSD);

  // SVG Icon para forma triangular con perspectiva isométrica 2D
  const TriangularIcon = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <defs>
        <linearGradient id={`triangleGrad-${numero}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: isDisponible ? '#00695C' : '#555555', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: isDisponible ? '#27AE60' : '#555555', stopOpacity: 1 }} />
        </linearGradient>
        {/* Clip path para animación de relleno */}
        <clipPath id={`triangleClip-${numero}`}>
          <rect 
            x="0" 
            y={isHovered && isDisponible ? "0" : "120"}
            width="120" 
            height="120"
            className="transition-all duration-700 ease-out"
          />
        </clipPath>
      </defs>
      
      <g className={`transition-all duration-500 ${isHovered && isDisponible ? 'translate-y-[-6px]' : ''}`}>
        {/* Triángulo con relleno animado */}
        <path 
          d="M 60 30 L 35 75 L 85 75 Z" 
          fill={`url(#triangleGrad-${numero})`}
          opacity={isHovered && isDisponible ? 0.4 : 0}
          clipPath={`url(#triangleClip-${numero})`}
          className="transition-opacity duration-300"
        />
        
        {/* Borde del triángulo isométrico */}
        <path 
          d="M 60 30 L 35 75 L 85 75 Z" 
          stroke={`url(#triangleGrad-${numero})`} 
          strokeWidth="2.5" 
          fill="none"
          opacity={isDisponible ? 1 : 0.5}
          className="transition-all duration-300"
        />
        
        {/* Vértices */}
        <circle cx="60" cy="30" r="4" fill={isDisponible ? '#27AE60' : '#555555'} className="transition-all duration-300" />
        <circle cx="35" cy="75" r="4" fill={isDisponible ? '#27AE60' : '#555555'} className="transition-all duration-300" />
        <circle cx="85" cy="75" r="4" fill={isDisponible ? '#27AE60' : '#555555'} className="transition-all duration-300" />
      </g>
    </svg>
  );

  // SVG Icon para forma rectangular con perspectiva isométrica 2D
  const RectangularIcon = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <defs>
        <linearGradient id={`rectGrad-${numero}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: isDisponible ? '#00695C' : '#555555', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: isDisponible ? '#27AE60' : '#555555', stopOpacity: 1 }} />
        </linearGradient>
        {/* Clip path para animación de relleno */}
        <clipPath id={`rectClip-${numero}`}>
          <rect 
            x="0" 
            y={isHovered && isDisponible ? "0" : "120"}
            width="120" 
            height="120"
            className="transition-all duration-700 ease-out"
          />
        </clipPath>
      </defs>
      
      <g className={`transition-all duration-500 ${isHovered && isDisponible ? 'translate-y-[-6px]' : ''}`}>
        {/* Rectángulo con relleno animado */}
        <rect 
          x="45" 
          y="25" 
          width="30" 
          height="70" 
          fill={`url(#rectGrad-${numero})`}
          opacity={isHovered && isDisponible ? 0.4 : 0}
          rx="2"
          clipPath={`url(#rectClip-${numero})`}
          className="transition-opacity duration-300"
        />
        
        {/* Borde del rectángulo isométrico */}
        <rect 
          x="45" 
          y="25" 
          width="30" 
          height="70" 
          stroke={`url(#rectGrad-${numero})`} 
          strokeWidth="2.5" 
          fill="none"
          rx="2"
          opacity={isDisponible ? 1 : 0.5}
          className="transition-all duration-300"
        />
        
        {/* Vértices */}
        <circle cx="45" cy="25" r="4" fill={isDisponible ? '#27AE60' : '#555555'} className="transition-all duration-300" />
        <circle cx="75" cy="25" r="4" fill={isDisponible ? '#27AE60' : '#555555'} className="transition-all duration-300" />
        <circle cx="45" cy="95" r="4" fill={isDisponible ? '#27AE60' : '#555555'} className="transition-all duration-300" />
        <circle cx="75" cy="95" r="4" fill={isDisponible ? '#27AE60' : '#555555'} className="transition-all duration-300" />
      </g>
    </svg>
  );

  return (
    <div 
      className={`relative bg-[#121212] rounded-xl border overflow-hidden transition-all duration-300 ${
        isDisponible ? 'border-[#2a2a2a] hover:border-[#27AE60]/50 shadow-lg hover:shadow-xl' : 'border-[#1a1a1a] opacity-60'
      }`}
      style={{ 
        boxShadow: isDisponible ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.2)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Texto VENDIDO */}
      {!isDisponible && (
        <>
          {/* Texto VENDIDO */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            <div 
              className="transform -rotate-12 px-8 py-2"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '32px',
                color: '#FFFFFF',
                backgroundColor: '#DC3545',
                letterSpacing: '3px',
                boxShadow: '0 4px 12px rgba(220, 53, 69, 0.4)',
                borderRadius: '4px'
              }}
            >
              VENDIDO
            </div>
          </div>
        </>
      )}

      {/* Contenido de la card - Layout horizontal */}
      <div className="p-6 flex items-center justify-between gap-6">
        {/* Columna izquierda: Información textual */}
        <div className="flex-1">
          {/* Título Lote N */}
          <h3 
            className={isDisponible ? 'text-[#FFFFFF]' : 'text-[#707070]'}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '32px',
              marginBottom: '4px',
              letterSpacing: '0.5px'
            }}
          >
            Lote {numero}
          </h3>

          {/* Superficie */}
          <p 
            className={isDisponible ? 'text-[#B8B8B8]' : 'text-[#606060]'}
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              marginBottom: '14px'
            }}
          >
            {superficie}
          </p>

          {/* Precio */}
          <div>
            <p
              className={isDisponible ? 'text-[#27AE60]' : 'text-[#707070]'}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '28px',
                letterSpacing: '0.5px'
              }}
            >
              {loading ? 'Cargando...' : formatCurrency(getPriceInARS('blue'))}
            </p>
            <p
              className={`text-xs mt-1 ${isDisponible ? 'text-[#888888]' : 'text-[#606060]'}`}
              style={{
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 300
              }}
            >
              ≈ ${precioUSD.toLocaleString()} USD
            </p>
          </div>

          {/* Dimensiones alineadas con el precio */}
          <p 
            className={`mt-2 ${isDisponible ? 'text-[#B8B8B8]' : 'text-[#606060]'}`}
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 300
            }}
          >
            {dimensiones}
          </p>
        </div>

        {/* Columna derecha: Ícono geométrico solo */}
        <div 
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            transform: 'rotateX(60deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
            animation: isHovered && isDisponible ? 'float 3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite' : 'none',
          }}
        >
          {forma === 'triangular' ? <TriangularIcon /> : <RectangularIcon />}
        </div>
        
        {/* Keyframes para animación de flotación */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: rotateX(60deg) rotateZ(45deg) translateY(0px) translateX(0px);
            }
            25% {
              transform: rotateX(60deg) rotateZ(45deg) translateY(-8px) translateX(4px);
            }
            50% {
              transform: rotateX(60deg) rotateZ(45deg) translateY(-12px) translateX(0px);
            }
            75% {
              transform: rotateX(60deg) rotateZ(45deg) translateY(-8px) translateX(-4px);
            }
          }
        `}</style>
      </div>
    </div>
  );
}