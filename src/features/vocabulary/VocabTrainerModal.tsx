import React, { useState, useEffect } from 'react';
import { X, Sparkles, Volume2, RotateCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { SRSItem, SRSRating } from '../../types';
import { SRSService } from '../../services/srsService';
import { audioService } from '../../services/audioService';
import { AudioButton } from '../../components/common/AudioButton';
import confetti from 'canvas-confetti';

interface VocabTrainerModalProps {
  isOpen: boolean;
  dueItems: SRSItem[];
  onClose: () => void;
  onItemReviewed: (updatedItem: SRSItem, rating: SRSRating) => void;
  onCompleteSession: (reviewsDone: number, xpEarned: number) => void;
  showRomaji: boolean;
}

export const VocabTrainerModal: React.FC<VocabTrainerModalProps> = ({
  isOpen,
  dueItems,
  onClose,
  onItemReviewed,
  onCompleteSession,
  showRomaji
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [itemsQueue, setItemsQueue] = useState<SRSItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setItemsQueue([...dueItems]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setCompletedCount(0);
    }
  }, [isOpen, dueItems]);

  if (!isOpen) return null;

  const currentItem = itemsQueue[currentIndex];

  const handleFlip = () => {
    if (!isFlipped && currentItem) {
      audioService.speak(currentItem.japanese, 1.0);
    }
    setIsFlipped(!isFlipped);
  };

  const handleRating = (rating: SRSRating) => {
    if (!currentItem) return;

    const updatedItem = SRSService.calculateNextReview(currentItem, rating);
    onItemReviewed(updatedItem, rating);

    if (rating === 'again') {
      // Re-insert at the end of the session queue for active recovery!
      setItemsQueue(prev => [...prev, currentItem]);
      audioService.playZenChime('tap');
    } else {
      setCompletedCount(prev => prev + 1);
      audioService.playZenChime('bell');
    }

    if (currentIndex + 1 < itemsQueue.length) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Session finished!
      audioService.playZenChime('success');
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
      onCompleteSession(completedCount + 1, (completedCount + 1) * 15);
      onClose();
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        if (!isFlipped) {
          e.preventDefault();
          handleFlip();
        }
      } else if (isFlipped) {
        if (e.key === '1') handleRating('again');
        if (e.key === '2') handleRating('hard');
        if (e.key === '3') handleRating('good');
        if (e.key === '4') handleRating('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentItem, currentIndex, itemsQueue]);

  if (!currentItem) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sumi/70 backdrop-blur-md">
        <div className="p-8 rounded-2xl bg-marfil dark:bg-[#1f2320] text-center max-w-sm w-full border border-piedra">
          <CheckCircle2 size={40} className="text-musgo mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-sumi dark:text-washi">
            ¡Mazo al día!
          </h3>
          <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
            Has repasado todas las tarjetas pendientes por hoy. Vuelve más tarde cuando venza el siguiente intervalo.
          </p>
          <button
            onClick={onClose}
            className="mt-5 w-full py-2.5 rounded-lg bg-torii text-marfil text-xs font-bold hover:bg-torii-hover"
          >
            Volver al Panel
          </button>
        </div>
      </div>
    );
  }

  // Preview next intervals for SM-2
  const previewIntervals = {
    again: '1d (Reintentar)',
    hard: `${Math.max(1, Math.round(currentItem.interval * 1.2))}d`,
    good: `${currentItem.repetitions === 0 ? 1 : currentItem.repetitions === 1 ? 6 : Math.round(currentItem.interval * currentItem.easeFactor)}d`,
    easy: `${currentItem.repetitions === 0 ? 4 : Math.round(currentItem.interval * currentItem.easeFactor * 1.35)}d`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sumi/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-marfil dark:bg-[#1f2320] border-2 border-piedra/80 dark:border-piedra-dark shadow-2xl overflow-hidden my-6 flex flex-col">
        {/* Header Bar */}
        <div className="p-4 border-b border-piedra/50 bg-washi/40 dark:bg-[#181B19] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-torii dark:text-torii-dark text-xs uppercase tracking-wider">
              SM-2 Spaced Repetition
            </span>
            <span className="text-[10px] text-sumi/50 dark:text-washi/50">
              • Tarjeta {currentIndex + 1} de {itemsQueue.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-sumi/60 dark:text-washi/60 hover:text-torii"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-piedra/30 dark:bg-piedra-dark">
          <div
            className="h-full bg-torii dark:bg-torii-dark transition-all duration-300"
            style={{ width: `${((currentIndex) / itemsQueue.length) * 100}%` }}
          />
        </div>

        {/* Flashcard Body */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center select-none">
          {/* Card Category Tag */}
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-washi border border-piedra/60 text-sumi/70 dark:text-washi/70 dark:bg-[#181B19] mb-4">
            {currentItem.category || 'Vocabulario General'}
          </span>

          {/* Prompt Side (Front) */}
          <div className="space-y-2 py-4">
            <div className="font-serif text-4xl sm:text-5xl font-black text-sumi dark:text-washi tracking-wide">
              {currentItem.japanese}
            </div>

            {showRomaji && currentItem.romaji && (
              <span className="text-xs font-mono text-sumi/50 dark:text-washi/50 block tracking-wider">
                [{currentItem.romaji}]
              </span>
            )}
          </div>

          <div className="my-2">
            <AudioButton text={currentItem.japanese} size="md" />
          </div>

          {/* Reveal Button or Back Side */}
          {!isFlipped ? (
            <div className="pt-6 w-full">
              <button
                onClick={handleFlip}
                className="w-full py-3 rounded-xl border border-piedra/80 dark:border-piedra-dark bg-washi/50 dark:bg-[#181B19] text-xs font-bold text-sumi dark:text-washi hover:border-torii hover:text-torii shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <RotateCw size={14} />
                <span>Mostrar Respuesta (Espacio / Clic)</span>
              </button>
            </div>
          ) : (
            /* Revealed Answer (Back) */
            <div className="w-full pt-4 space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl border border-musgo/40 bg-musgo/5 dark:bg-musgo/10">
                <span className="text-xs font-serif font-bold text-torii dark:text-torii-dark block mb-1">
                  Lectura: {currentItem.reading}
                </span>
                <p className="text-base font-bold text-sumi dark:text-washi">
                  {currentItem.spanish}
                </p>
              </div>

              {/* SM-2 4-button rating bar */}
              <div>
                <span className="text-[10px] text-sumi/60 dark:text-washi/60 block mb-2 font-mono">
                  ¿Cómo de fácil fue recordarlo? (Atajos: 1, 2, 3, 4)
                </span>

                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleRating('again')}
                    className="p-2.5 rounded-xl border border-[#BC3A32]/40 bg-[#BC3A32]/10 hover:bg-[#BC3A32] hover:text-marfil text-[#BC3A32] text-xs font-bold transition-all text-center group"
                  >
                    <span className="block text-xs font-mono opacity-60 group-hover:opacity-100">1</span>
                    <span className="block">Otra vez</span>
                    <span className="text-[9px] opacity-75 block font-mono">{previewIntervals.again}</span>
                  </button>

                  <button
                    onClick={() => handleRating('hard')}
                    className="p-2.5 rounded-xl border border-[#C6A15B]/40 bg-[#C6A15B]/10 hover:bg-[#C6A15B] hover:text-marfil text-[#C6A15B] text-xs font-bold transition-all text-center group"
                  >
                    <span className="block text-xs font-mono opacity-60 group-hover:opacity-100">2</span>
                    <span className="block">Difícil</span>
                    <span className="text-[9px] opacity-75 block font-mono">{previewIntervals.hard}</span>
                  </button>

                  <button
                    onClick={() => handleRating('good')}
                    className="p-2.5 rounded-xl border border-[#66785F]/40 bg-[#66785F]/10 hover:bg-[#66785F] hover:text-marfil text-[#66785F] text-xs font-bold transition-all text-center group"
                  >
                    <span className="block text-xs font-mono opacity-60 group-hover:opacity-100">3</span>
                    <span className="block">Bien</span>
                    <span className="text-[9px] opacity-75 block font-mono">{previewIntervals.good}</span>
                  </button>

                  <button
                    onClick={() => handleRating('easy')}
                    className="p-2.5 rounded-xl border border-[#334A68]/40 bg-[#334A68]/10 hover:bg-[#334A68] hover:text-marfil text-[#334A68] text-xs font-bold transition-all text-center group"
                  >
                    <span className="block text-xs font-mono opacity-60 group-hover:opacity-100">4</span>
                    <span className="block">Fácil</span>
                    <span className="text-[9px] opacity-75 block font-mono">{previewIntervals.easy}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
