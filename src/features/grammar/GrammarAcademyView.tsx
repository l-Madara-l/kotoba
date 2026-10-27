import React, { useState } from 'react';
import { GRAMMAR_LESSONS } from '../../data/grammarData';
import { GrammarLesson } from '../../types';
import { AudioButton } from '../../components/common/AudioButton';
import { audioService } from '../../services/audioService';
import { 
  ScrollText, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

export const GrammarAcademyView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson>(GRAMMAR_LESSONS[0]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleCheckQuiz = (questionId: string, correctAnswer: string) => {
    const isCorrect = quizAnswers[questionId]?.trim() === correctAnswer.trim();
    setQuizResults(prev => ({ ...prev, [questionId]: isCorrect }));

    if (isCorrect) {
      audioService.playZenChime('success');
    } else {
      audioService.playZenChime('bell');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Editorial Header */}
      <div className="border-b border-piedra/60 pb-5">
        <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
          <span>文法アカデミー</span>
          <span>•</span>
          <span>Gramática Funcional para Hispanohablantes</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
          Academia de Gramática Japonesa
        </h1>
        <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1 max-w-2xl">
          Estructuras lógicas, fórmulas visuales y comparaciones directas con el español para entender el porqué sin memorizar reglas vacías.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Lessons List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider mb-2">
            Lecciones Disponibles ({GRAMMAR_LESSONS.length})
          </div>

          <div className="space-y-2">
            {GRAMMAR_LESSONS.map(lesson => {
              const isSelected = selectedLesson.id === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-torii bg-torii/5 ring-1 ring-torii dark:border-torii-dark'
                      : 'border-piedra/70 bg-marfil dark:bg-[#1f2320] hover:border-torii/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold text-torii dark:text-torii-dark">
                      Lección {lesson.order} • {lesson.level}
                    </span>
                    <span className="font-serif text-sumi/50 dark:text-washi/50">文法</span>
                  </div>

                  <h3 className="text-xs font-bold text-sumi dark:text-washi line-clamp-1">
                    {lesson.title}
                  </h3>
                  <p className="text-[11px] font-mono text-sumi/60 dark:text-washi/60 mt-1 line-clamp-1">
                    {lesson.structure}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Lesson Deep Dive (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 sm:p-8 shadow-sm space-y-6">
            {/* Header info */}
            <div>
              <span className="text-[11px] font-mono font-bold text-torii dark:text-torii-dark uppercase tracking-wider">
                Lección {selectedLesson.order} • Nivel {selectedLesson.level}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-sumi dark:text-washi mt-1">
                {selectedLesson.title}
              </h2>
              <p className="text-xs text-sumi/75 dark:text-washi/75 mt-1 leading-relaxed">
                {selectedLesson.summaryEs}
              </p>
            </div>

            {/* Visual Formula Box */}
            <div className="p-4 rounded-xl border-2 border-torii/30 bg-washi/60 dark:bg-[#181B19] text-center space-y-1 shadow-inner">
              <span className="text-[10px] font-mono uppercase tracking-widest text-torii dark:text-torii-dark font-bold block">
                Fórmula de la Estructura:
              </span>
              <div className="font-mono text-sm sm:text-base font-bold text-sumi dark:text-washi">
                {selectedLesson.formula}
              </div>
            </div>

            {/* Learning Objective */}
            <div className="p-3.5 rounded-xl border border-musgo/30 bg-musgo/5 dark:bg-musgo/10 text-xs">
              <span className="font-bold text-musgo dark:text-musgo-light uppercase tracking-wider block mb-0.5">
                Objetivo de Aprendizaje:
              </span>
              <p className="text-sumi/85 dark:text-washi/85 leading-relaxed">
                {selectedLesson.learningObjective}
              </p>
            </div>

            {/* Detailed Explanation */}
            <div className="space-y-3 text-xs sm:text-sm text-sumi/85 dark:text-washi/85 leading-relaxed border-t border-piedra/40 pt-4">
              <h4 className="font-serif text-sm font-bold text-sumi dark:text-washi">
                Explicación Didáctica
              </h4>
              <div 
                className="space-y-2 whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: selectedLesson.detailedExplanation
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                }}
              />
            </div>

            {/* Spanish Contrast & Comparison */}
            {selectedLesson.spanishComparison && (
              <div className="p-4 rounded-xl border border-indigo/30 bg-indigo/5 dark:bg-indigo/10 text-xs text-sumi/85 dark:text-washi/85 space-y-1">
                <span className="font-bold text-indigo dark:text-indigo/90 uppercase tracking-wider block">
                  💡 Comparación con el español:
                </span>
                <p className="leading-relaxed">
                  {selectedLesson.spanishComparison}
                </p>
              </div>
            )}

            {/* Natural Sentence Examples with Word-by-Word Breakdown */}
            <div className="space-y-4 pt-2 border-t border-piedra/40">
              <h4 className="font-serif text-sm font-bold text-sumi dark:text-washi">
                Ejemplos y Análisis Palabra por Palabra
              </h4>

              <div className="space-y-4">
                {selectedLesson.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-piedra/60 bg-washi/30 dark:bg-[#181B19] space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-serif text-base sm:text-lg font-bold text-sumi dark:text-washi">
                          {ex.japanese}
                        </div>
                        <div className="text-xs text-torii dark:text-torii-dark font-mono mt-0.5">
                          {ex.kana} [{ex.romaji}]
                        </div>
                        <div className="text-xs text-sumi/80 dark:text-washi/80 font-medium mt-1">
                          «{ex.spanish}»
                        </div>
                      </div>

                      <AudioButton text={ex.japanese} />
                    </div>

                    {/* Word by word breakdown table */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-piedra/30">
                      {ex.breakdown.map((b, bi) => (
                        <div key={bi} className="p-2 rounded-lg bg-marfil dark:bg-[#232724] border border-piedra/40 text-[11px]">
                          <span className="font-serif font-bold text-sumi dark:text-washi block">
                            {b.term}
                          </span>
                          <span className="text-torii dark:text-torii-dark text-[10px] block font-mono">
                            {b.meaning}
                          </span>
                          <span className="text-sumi/60 dark:text-washi/60 text-[10px] block mt-0.5">
                            {b.function}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes / Errores Frecuentes */}
            {selectedLesson.commonMistakes.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-piedra/40">
                <h4 className="font-serif text-sm font-bold text-sumi dark:text-washi flex items-center gap-1.5 text-torii">
                  <AlertTriangle size={15} />
                  <span>Errores Típicos de Hispanohablantes</span>
                </h4>

                <div className="space-y-2">
                  {selectedLesson.commonMistakes.map((m, mi) => (
                    <div
                      key={mi}
                      className="p-3.5 rounded-xl border border-torii/30 bg-torii/5 text-xs space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-torii font-bold line-through">
                          ❌ {m.incorrect}
                        </span>
                        <span className="text-musgo font-bold">
                          ➔ ✔️ {m.correct}
                        </span>
                      </div>
                      <p className="text-sumi/80 dark:text-washi/80">
                        {m.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Questions / Active Quiz */}
            <div className="space-y-4 pt-4 border-t border-piedra/40">
              <h4 className="font-serif text-sm font-bold text-sumi dark:text-washi flex items-center gap-2">
                <Sparkles size={16} className="text-oro" />
                <span>Ejercicios Guiados de Comprobación</span>
              </h4>

              <div className="space-y-4">
                {selectedLesson.practiceQuestions.map(q => {
                  const currentAnswer = quizAnswers[q.id] || '';
                  const hasChecked = quizResults[q.id] !== undefined;
                  const isCorrect = quizResults[q.id];

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-piedra/60 bg-washi/30 dark:bg-[#181B19] space-y-3 text-xs"
                    >
                      <p className="font-semibold text-sumi dark:text-washi">
                        {q.prompt}
                      </p>

                      {q.type === 'multiple-choice' && q.options && (
                        <div className="space-y-1.5">
                          {q.options.map((opt, oi) => (
                            <button
                              key={oi}
                              onClick={() => handleSelectAnswer(q.id, opt)}
                              className={`w-full p-2.5 rounded-lg border text-left transition-all ${
                                currentAnswer === opt
                                  ? 'border-torii bg-torii/10 text-torii font-semibold'
                                  : 'border-piedra/60 bg-marfil dark:bg-[#232724] text-sumi dark:text-washi hover:border-torii'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {q.type === 'fill-blank' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={currentAnswer}
                            onChange={e => handleSelectAnswer(q.id, e.target.value)}
                            placeholder="Escribe la partícula o palabra..."
                            className="px-3 py-2 rounded-lg border border-piedra bg-marfil dark:bg-[#232724] text-xs text-sumi dark:text-washi focus:outline-none focus:border-torii"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handleCheckQuiz(q.id, q.correctAnswer)}
                          disabled={!currentAnswer}
                          className="px-4 py-1.5 rounded-lg bg-torii text-marfil text-xs font-semibold hover:bg-torii-hover disabled:opacity-40"
                        >
                          Comprobar
                        </button>

                        {hasChecked && (
                          <span className={`font-bold ${isCorrect ? 'text-musgo' : 'text-torii'}`}>
                            {isCorrect ? '¡Correcto!' : 'Revisa de nuevo'}
                          </span>
                        )}
                      </div>

                      {hasChecked && (
                        <p className="text-[11px] text-sumi/75 dark:text-washi/75 pt-1 border-t border-piedra/30">
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
