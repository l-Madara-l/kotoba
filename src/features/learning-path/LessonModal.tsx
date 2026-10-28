import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Award,
  RotateCcw
} from 'lucide-react';
import { audioService } from '../../services/audioService';
import { AudioButton } from '../../components/common/AudioButton';
import { getLessonDetail } from '../../data/lessonDetailsData';
import { ProgressService, NextLessonInfo } from '../../services/progressService';

interface LessonModalProps {
  lessonId: string | null;
  onClose: () => void;
  onCompleteLesson: (lessonId: string, xpEarned: number) => void;
  isCompleted?: boolean;
  onNavigateLesson?: (nextLessonId: string) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lessonId,
  onClose,
  onCompleteLesson,
  isCompleted = false,
  onNavigateLesson
}) => {
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(lessonId);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'content' | 'practice'>('content');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [nextLessonData, setNextLessonData] = useState<NextLessonInfo | null>(null);
  const [isModuleComplete, setIsModuleComplete] = useState<boolean>(false);

  // Sync with prop when prop changes
  useEffect(() => {
    setCurrentLessonId(lessonId);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
    setActiveTab('content');
    setShowCelebration(false);
    setIsSaving(false);
  }, [lessonId]);

  if (!currentLessonId) return null;

  const details = getLessonDetail(currentLessonId);

  const handleSelectOption = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswer(index);
  };

  const handleSubmitQuiz = () => {
    if (selectedQuizAnswer === null) return;
    setQuizSubmitted(true);
    if (selectedQuizAnswer === details.quiz.correctIndex) {
      audioService.playZenChime('success');
    } else {
      audioService.playZenChime('bell');
    }
  };

  const handleComplete = () => {
    if (isSaving) return; // Prevent double-clicks
    setIsSaving(true);

    try {
      audioService.playZenChime('hanko');
      onCompleteLesson(currentLessonId, 50);

      // Determine next lesson and module status
      const nextInfo = ProgressService.getNextLessonAfter(currentLessonId);
      setNextLessonData(nextInfo.nextLesson);
      setIsModuleComplete(nextInfo.isCurrentModuleComplete);
      setShowCelebration(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdvanceToNextLesson = (nextId: string) => {
    setCurrentLessonId(nextId);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
    setActiveTab('content');
    setShowCelebration(false);
    if (onNavigateLesson) {
      onNavigateLesson(nextId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sumi/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-marfil dark:bg-[#1f2320] border-2 border-piedra/80 dark:border-piedra-dark shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-piedra/60 bg-washi/40 dark:bg-[#181B19] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark font-medium">
              <span>{details.module}</span>
              <span>•</span>
              <span>{details.titleJp}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-sumi dark:text-washi mt-0.5">
              {details.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-sumi/60 dark:text-washi/60 hover:text-torii transition-colors"
            aria-label="Cerrar lección"
          >
            <X size={20} />
          </button>
        </div>

        {/* Celebration Screen after completion */}
        {showCelebration ? (
          <div className="p-8 sm:p-12 text-center flex-1 flex flex-col items-center justify-center space-y-6">
            {/* Hanko stamp visual */}
            <div className="w-20 h-20 rounded-2xl border-4 border-torii bg-torii/10 text-torii flex flex-col items-center justify-center shadow-lg animate-bounce">
              <span className="font-serif font-black text-2xl tracking-widest">修了</span>
              <span className="text-[9px] uppercase tracking-wider font-mono">HANKO</span>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="font-serif text-2xl font-bold text-sumi dark:text-washi">
                {isModuleComplete ? '¡Módulo Completado!' : '¡Lección Completada!'}
              </h3>
              <p className="text-xs text-sumi/70 dark:text-washi/70">
                {isModuleComplete
                  ? `Has dominado con éxito todas las lecciones de ${details.module}. ¡Un gran paso hacia la fluidez!`
                  : `Has finalizado "${details.title}". Tus conocimientos han sido registrados y sumas +50 XP a tu perfil.`}
              </p>
            </div>

            <div className="p-3 px-6 rounded-full bg-oro/15 border border-oro/40 text-oro text-xs font-bold flex items-center gap-2">
              <Sparkles size={16} />
              <span>+50 XP acumulados</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
              {nextLessonData ? (
                <button
                  onClick={() => handleAdvanceToNextLesson(nextLessonData.lessonId)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                >
                  <span>Continuar: {nextLessonData.title}</span>
                  <ArrowRight size={15} />
                </button>
              ) : (
                <div className="text-xs text-musgo dark:text-musgo-light font-bold">
                  ¡Felicidades! Has completado todas las lecciones disponibles en este programa.
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-piedra/80 dark:border-piedra-dark text-xs font-medium text-sumi dark:text-washi hover:border-torii transition-colors"
              >
                Volver a la Ruta
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Nav Tabs */}
            <div className="flex border-b border-piedra/60 bg-washi/20 dark:bg-[#1f2320] px-5 pt-2">
              <button
                onClick={() => setActiveTab('content')}
                className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'content'
                    ? 'border-torii text-torii dark:border-torii-dark dark:text-torii-dark'
                    : 'border-transparent text-sumi/60 dark:text-washi/60 hover:text-sumi'
                }`}
              >
                <BookOpen size={14} />
                <span>Explicación & Audios</span>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'practice'
                    ? 'border-torii text-torii dark:border-torii-dark dark:text-torii-dark'
                    : 'border-transparent text-sumi/60 dark:text-washi/60 hover:text-sumi'
                }`}
              >
                <Sparkles size={14} />
                <span>Práctica Activa</span>
                {quizSubmitted && <Check size={12} className="text-musgo" />}
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {activeTab === 'content' && (
                <div className="space-y-5">
                  {/* Objective pill */}
                  <div className="p-3 rounded-xl bg-musgo/10 border border-musgo/30 text-xs text-musgo dark:text-musgo-light">
                    <span className="font-bold block mb-0.5">Objetivo Pedagógico:</span>
                    <span className="text-sumi/80 dark:text-washi/80">{details.objective}</span>
                  </div>

                  {/* Editorial explanation paragraphs */}
                  <div className="space-y-3 text-xs leading-relaxed text-sumi/90 dark:text-washi/90">
                    {details.content.map((p, idx) => (
                      <p key={idx} className="border-l-2 border-torii/40 pl-3 py-0.5">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Interactive Audio Reference Samples */}
                  {details.audioSamples && details.audioSamples.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-piedra/60 space-y-3">
                      <h4 className="font-serif text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider">
                        Muestras de Audio & Ritmo de Mora
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {details.audioSamples.map((sample, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl border border-piedra/70 dark:border-piedra-dark bg-marfil dark:bg-[#181B19] flex items-center justify-between gap-3 shadow-xs"
                          >
                            <div>
                              <div className="font-serif text-lg font-bold text-sumi dark:text-washi">
                                {sample.text}
                              </div>
                              <div className="text-[10px] font-mono text-sumi/60 dark:text-washi/60">
                                {sample.kana} • {sample.romaji}
                              </div>
                              <div className="text-[11px] text-sumi/80 dark:text-washi/80 mt-0.5">
                                {sample.es}
                              </div>
                            </div>

                            <AudioButton text={sample.text} size="sm" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'practice' && (
                <div className="space-y-4">
                  <div className="text-xs font-serif text-sumi/60 dark:text-washi/60 uppercase tracking-wider">
                    Recuperación Activa • Pregunta de Afianzamiento
                  </div>

                  <h3 className="font-serif text-sm font-bold text-sumi dark:text-washi leading-snug">
                    {details.quiz.question}
                  </h3>

                  <div className="space-y-2 pt-2">
                    {details.quiz.options.map((opt, idx) => {
                      const isSelected = selectedQuizAnswer === idx;
                      const isCorrect = idx === details.quiz.correctIndex;

                      let btnStyle = 'border-piedra/70 dark:border-piedra-dark hover:border-torii';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-musgo bg-musgo/10 text-musgo font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-torii bg-torii/10 text-torii line-through';
                        } else {
                          btnStyle = 'opacity-50 border-piedra/40';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-torii bg-torii/5 text-torii font-semibold';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={quizSubmitted}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <Check size={16} className="text-musgo shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={selectedQuizAnswer === null}
                      className="w-full py-2.5 rounded-lg bg-torii text-marfil text-xs font-semibold hover:bg-torii-hover flex items-center justify-center gap-2 shadow-sm disabled:opacity-40"
                    >
                      <span>Comprobar Respuesta</span>
                      <Check size={14} />
                    </button>
                  ) : (
                    <div className="p-3.5 rounded-xl border border-musgo/30 bg-musgo/5 dark:bg-musgo/10 text-xs">
                      <span className="font-bold text-musgo dark:text-musgo-light block mb-1">
                        {selectedQuizAnswer === details.quiz.correctIndex
                          ? '¡Correcto! Excelente comprensión.'
                          : 'Revisión didáctica:'}
                      </span>
                      <p className="text-sumi/80 dark:text-washi/80 leading-relaxed">
                        {details.quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 border-t border-piedra/60 bg-washi/40 dark:bg-[#181B19] flex items-center justify-between">
              <button
                onClick={onClose}
                className="text-xs text-sumi/70 dark:text-washi/70 hover:text-sumi"
              >
                Cerrar
              </button>

              <button
                onClick={handleComplete}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-lg bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center gap-2 shadow-md transition-transform active:scale-95 disabled:opacity-50"
              >
                <CheckCircle2 size={16} />
                <span>
                  {isSaving
                    ? 'Guardando...'
                    : isCompleted
                    ? 'Volver a Marcar (+50 XP)'
                    : 'Completar Lección (+50 XP)'}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
