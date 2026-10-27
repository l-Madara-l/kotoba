import React from 'react';

interface HankoBadgeProps {
  kanji: string;
  name: string;
  unlocked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  date?: string;
  onClick?: () => void;
}

export const HankoBadge: React.FC<HankoBadgeProps> = ({
  kanji,
  name,
  unlocked = true,
  size = 'md',
  date,
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-24 h-24 text-xl'
  };

  return (
    <div 
      onClick={onClick}
      className={`group flex flex-col items-center justify-center p-3 text-center transition-all ${
        unlocked ? 'cursor-pointer' : 'opacity-40 grayscale cursor-not-allowed'
      }`}
    >
      <div
        className={`${sizeClasses[size]} relative flex items-center justify-center rounded-lg border-2 border-torii text-torii font-bold font-serif shadow-sm transition-transform group-hover:scale-105 group-hover:-rotate-3 ${
          unlocked
            ? 'bg-torii/5 border-torii dark:border-torii-dark dark:text-torii-dark'
            : 'border-piedra text-piedra dark:border-piedra-dark dark:text-piedra-dark'
        }`}
        style={{
          boxShadow: unlocked ? 'inset 0 0 0 1px rgba(188, 58, 50, 0.2), 0 2px 4px rgba(0,0,0,0.04)' : 'none'
        }}
      >
        {/* Subtle decorative inner corner marks resembling a traditional carved seal */}
        <span className="absolute top-0.5 left-0.5 text-[8px] leading-none opacity-40">⌜</span>
        <span className="absolute bottom-0.5 right-0.5 text-[8px] leading-none opacity-40">⌟</span>
        <span className="tracking-widest select-none font-serif">{kanji}</span>
      </div>
      <p className="mt-2 text-xs font-medium text-sumi dark:text-washi line-clamp-1">
        {name}
      </p>
      {date && (
        <span className="text-[10px] text-sumi/60 dark:text-washi/60">
          {date}
        </span>
      )}
    </div>
  );
};
