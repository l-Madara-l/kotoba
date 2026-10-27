import React, { useState } from 'react';
import { Volume2, Volume1 } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface AudioButtonProps {
  text: string;
  speed?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSlowToggle?: boolean;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  speed = 1.0,
  size = 'md',
  className = '',
  showSlowToggle = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      await audioService.speak(text, currentSpeed);
    } finally {
      setIsPlaying(false);
    }
  };

  const toggleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSpeed(prev => (prev === 1.0 ? 0.75 : 1.0));
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <button
        onClick={handlePlay}
        disabled={isPlaying}
        title={currentSpeed === 0.75 ? 'Reproducir lento (0.75x)' : 'Escuchar pronunciación (1.0x)'}
        aria-label="Escuchar pronunciación"
        className={`${sizeClasses[size]} rounded-full transition-all flex items-center justify-center border border-indigo/20 text-indigo hover:bg-indigo/10 active:scale-95 dark:text-washi dark:border-washi/20 dark:hover:bg-washi/10 ${
          isPlaying ? 'animate-pulse ring-2 ring-indigo/40' : ''
        }`}
      >
        {currentSpeed === 0.75 ? (
          <Volume1 size={iconSizes[size]} />
        ) : (
          <Volume2 size={iconSizes[size]} />
        )}
      </button>

      {showSlowToggle && (
        <button
          onClick={toggleSpeed}
          title={currentSpeed === 0.75 ? 'Cambiar a velocidad normal' : 'Cambiar a velocidad lenta'}
          className="text-[10px] px-1.5 py-0.5 rounded border border-piedra/60 text-sumi/70 dark:text-washi/70 hover:border-torii hover:text-torii transition-colors font-mono"
        >
          {currentSpeed === 0.75 ? '0.75x' : '1.0x'}
        </button>
      )}
    </div>
  );
};
