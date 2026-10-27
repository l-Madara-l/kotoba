import React from 'react';

interface FuriganaTextProps {
  japanese: string;
  kana?: string;
  romaji?: string;
  showFurigana?: boolean;
  showRomaji?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  className?: string;
  vertical?: boolean;
}

export const FuriganaText: React.FC<FuriganaTextProps> = ({
  japanese,
  kana,
  romaji,
  showFurigana = true,
  showRomaji = false,
  size = 'md',
  className = '',
  vertical = false
}) => {
  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-3xl',
    '4xl': 'text-5xl md:text-6xl'
  };

  const rtSizeMap = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
    '2xl': 'text-base',
    '4xl': 'text-xl'
  };

  const hasKanaDifference = kana && kana !== japanese;

  return (
    <div className={`inline-flex flex-col items-center ${vertical ? 'writing-vertical' : ''} ${className}`}>
      {hasKanaDifference && showFurigana ? (
        <ruby className={`${sizeMap[size]} font-serif font-medium tracking-wide`}>
          {japanese}
          <rt className={`${rtSizeMap[size]} text-torii dark:text-torii-dark font-sans opacity-90 select-none`}>
            {kana}
          </rt>
        </ruby>
      ) : (
        <span className={`${sizeMap[size]} font-serif font-medium tracking-wide`}>
          {japanese}
        </span>
      )}

      {showRomaji && romaji && (
        <span className="text-[11px] font-sans text-sumi/60 dark:text-washi/60 mt-0.5 tracking-wider font-light">
          {romaji}
        </span>
      )}
    </div>
  );
};
