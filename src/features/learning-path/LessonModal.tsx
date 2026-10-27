import React, { useState } from 'react';
import { X, Check, Volume2, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { AudioButton } from '../../components/common/AudioButton';

interface LessonModalProps {
  lessonId: string | null;
  onClose: () => void;
  onCompleteLesson: (lessonId: string, xpEarned: number) => void;
  isCompleted?: boolean;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lessonId,
  onClose,
  onCompleteLesson,
  isCompleted = false
}) => {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'content' | 'practice'>('content');

  if (!lessonId) return null;

  // Lesson content registry
  const getLessonDetails = (id: string) => {
    switch (id) {
      case 'l0-phonetics':
        return {
          title: 'Las 5 vocales puras y el compás de mora',
          titleJp: '母音と拍（モーラ）',
          module: 'Nivel 0: Fundamentos',
          objective: 'Dominar la pronunciación exacta de las cinco vocales japonesas y entender el concepto de "mora" como unidad rítmica temporal.',
          content: [
            'A diferencia del español, donde las vocales a veces se diptongan o se acortan según la entonación, en japonés las vocales son **absolutamente puras y constantes**.',
            'El orden tradicional japonés de las vocales es: **A, I, U, E, O** (あ、い、う、え、お).',
            '**La "U" japonesa (う):** Es la vocal más diferente. No redondees los labios hacia afuera como en español o francés. Los labios permanecen neutros y relajados, produciendo un sonido más suave y sordo.',
            '**El concepto de Mora (拍 - haku):** El japonés no se mide en sílabas complejas, sino en pulsos de tiempo iguales llamados moras. Por ejemplo:',
            '• *にほん (Nihon)* tiene 3 moras: Ni - ho - n. Cada una dura exactamente el mismo compás de tiempo.',
            '• *とうきょう (Toukyou)* tiene 4 moras: To - u - kyo - u. La "u" alarga el sonido de la "o", durando el doble de tiempo exacto.'
          ],
          audioSamples: [
            { text: 'あ', kana: 'あ', romaji: 'a', es: 'Vocal A (abierta)' },
            { text: 'い', kana: 'い', romaji: 'i', es: 'Vocal I' },
            { text: 'う', kana: 'う', romaji: 'u', es: 'Vocal U (labios relajados)' },
            { text: 'え', kana: 'え', romaji: 'e', es: 'Vocal E' },
            { text: 'お', kana: 'お', romaji: 'o', es: 'Vocal O' },
            { text: '東京', kana: 'とうきょう', romaji: 'toukyou', es: 'Tokio (4 moras: To-u-kyo-u)' }
          ],
          quiz: {
            question: '¿Cuántas moras (unidades de compás temporal) tiene la palabra "にほん" (Nihon - Japón)?',
            options: [
              '1 sola sílaba larga',
              '2 moras (Ni - hon)',
              '3 moras (Ni - ho - n)',
              '4 moras'
            ],
            correctIndex: 2,
            explanation: 'En japonés, la "n" final (ん) cuenta como una mora de tiempo completa e independiente. Por tanto: Ni (1) + ho (2) + n (3) = 3 moras.'
          }
        };

      case 'l0-writing-system':
        return {
          title: 'Los tres sistemas de escritura japonesa',
          titleJp: 'ひらがな・カタカナ・漢字',
          module: 'Nivel 0: Fundamentos',
          objective: 'Entender el propósito de combinar Hiragana, Katakana y Kanji en un solo texto natural.',
          content: [
            'Una de las primeras preguntas que surgen es: "¿Por qué el japonés usa tres sistemas a la vez?". La respuesta es que cada uno cumple un rol lingüístico insustituible:',
            '1. **Hiragana (平仮名 - 46 caracteres):** Caracteres curvos que se usan para la gramática, partículas (は, を, に), terminaciones verbales y palabras nativas.',
            '2. **Katakana (片仮名 - 46 caracteres):** Caracteres angulares para palabras importadas del extranjero (pan, koohii), nombres no japoneses, nombres científicos y onomatopeyas.',
            '3. **Kanji (漢字 - ideogramas de origen chino):** Representan conceptos, raíces de palabras, sustantivos y verbos. Permiten leer a gran velocidad sin espacios entre palabras, ya que en japonés tradicional no se usan espacios.'
          ],
          audioSamples: [
            { text: '私はパンを食べます。', kana: 'わたしは ぱんを たべます。', romaji: 'Watashi wa pan o tabemasu.', es: 'Ejemplo completo: 私 (Kanji) + は (Hiragana) + パン (Katakana) + を (Hiragana) + 食べます (Kanji + Hiragana)' }
          ],
          quiz: {
            question: 'En la frase "私はパンを食べます", ¿qué sistema de escritura se usa para la palabra "パン" (pan)?',
            options: [
              'Hiragana, por ser comida',
              'Katakana, porque es un préstamo del portugués',
              'Kanji nativo',
              'Romaji'
            ],
            correctIndex: 1,
            explanation: 'La palabra "pan" fue introducida en Japón por misioneros y comerciantes portugueses en el siglo XVI, por lo que se escribe en Katakana (パン).'
          }
        };

      default:
        return {
          title: 'Lección de Estudio KOTOBA',
          titleJp: '日本語レッスン',
          module: 'Academia KOTOBA',
          objective: 'Avanzar en el dominio del japonés mediante comprensión comprensible y práctica activa.',
          content: [
            'Esta lección combina teoría explicativa para hispanohablantes con ejemplos naturales y ejercicios interactivos.',
            'Recuerda escuchar los audios tantas veces como necesites y repetir en voz alta para afianzar el ritmo de mora.'
          ],
          audioSamples: [
            { text: '日本語を勉強します。', kana: 'にほんごを べんきょうします。', romaji: 'Nihongo o benkyou shimasu.', es: 'Estudio idioma japonés.' }
          ],
          quiz: {
            question: '¿Cuál es la forma más efectiva de asimilar una nueva estructura en japonés?',
            options: [
              'Memorizar traducciones literales palabra por palabra',
              'Aprenderla dentro de oraciones naturales en contexto y repasarla con repetición espaciada',
              'Solo leer explicaciones sin pronunciar ni escribir',
              'Ignorar las partículas'
            ],
            correctIndex: 1,
            explanation: 'La adquisición lingüística se consolida cuando el vocabulario y la gramática se internalizan en contexto y se refuerzan espaciadamente.'
          }
        };
    }
  };

  const details = getLessonDetails(lessonId);

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
    audioService.playZenChime('hanko');
    onCompleteLesson(lessonId, 50);
    onClose();
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
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs (Teoría / Ejercicio de Recuperación) */}
        <div className="flex border-b border-piedra/60 bg-washi/20 dark:bg-[#181B19]/50 px-5">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'content'
                ? 'border-torii text-torii dark:border-torii-dark dark:text-torii-dark'
                : 'border-transparent text-sumi/60 dark:text-washi/60 hover:text-sumi'
            }`}
          >
            <BookOpen size={14} />
            <span>Explicación & Ejemplos</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'practice'
                ? 'border-torii text-torii dark:border-torii-dark dark:text-torii-dark'
                : 'border-transparent text-sumi/60 dark:text-washi/60 hover:text-sumi'
            }`}
          >
            <Sparkles size={14} />
            <span>Comprobación Activa</span>
            {quizSubmitted && selectedQuizAnswer === details.quiz.correctIndex && (
              <Check size={12} className="text-musgo font-bold" />
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === 'content' ? (
            <>
              {/* Learning Objective Callout */}
              <div className="p-3.5 rounded-xl border border-musgo/30 bg-musgo/5 dark:bg-musgo/10">
                <span className="text-[11px] font-bold text-musgo dark:text-musgo-light uppercase tracking-wider block mb-0.5">
                  Objetivo Pedagógico
                </span>
                <p className="text-xs text-sumi/85 dark:text-washi/85 leading-relaxed">
                  {details.objective}
                </p>
              </div>

              {/* Explanatory text */}
              <div className="space-y-3 text-xs sm:text-sm text-sumi/85 dark:text-washi/85 leading-relaxed">
                {details.content.map((p, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                ))}
              </div>

              {/* Native Audio Samples */}
              {details.audioSamples && details.audioSamples.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Volume2 size={14} className="text-indigo" />
                    <span>Muestras de Audio y Pronunciación</span>
                  </h4>
                  <div className="space-y-2">
                    {details.audioSamples.map((sample, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg border border-piedra/60 bg-washi/40 dark:bg-[#181B19]"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-base font-bold text-sumi dark:text-washi">
                              {sample.text}
                            </span>
                            <span className="text-xs text-sumi/60 dark:text-washi/60 font-mono">
                              [{sample.romaji}]
                            </span>
                          </div>
                          <span className="text-[11px] text-sumi/70 dark:text-washi/70 block mt-0.5">
                            {sample.es}
                          </span>
                        </div>

                        <AudioButton text={sample.text} showSlowToggle />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Practice / Quiz Tab */
            <div className="space-y-5">
              <div className="text-left">
                <span className="text-[11px] font-semibold text-torii dark:text-torii-dark uppercase tracking-wider">
                  Recuperación Activa de Memoria
                </span>
                <h3 className="font-serif text-base font-bold text-sumi dark:text-washi mt-1">
                  {details.quiz.question}
                </h3>
              </div>

              <div className="space-y-2">
                {details.quiz.options.map((option, idx) => {
                  const isSelected = selectedQuizAnswer === idx;
                  let optionStyle = 'border-piedra/80 bg-washi/40 dark:bg-[#181B19] text-sumi dark:text-washi hover:border-torii';

                  if (quizSubmitted) {
                    if (idx === details.quiz.correctIndex) {
                      optionStyle = 'border-musgo bg-musgo/15 text-musgo dark:text-musgo-light font-bold';
                    } else if (isSelected) {
                      optionStyle = 'border-torii bg-torii/10 text-torii line-through';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-torii bg-torii/5 ring-1 ring-torii text-torii font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={quizSubmitted}
                      className={`w-full p-3.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {quizSubmitted && idx === details.quiz.correctIndex && (
                        <Check size={16} className="text-musgo" />
                      )}
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
            className="px-6 py-2.5 rounded-lg bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center gap-2 shadow-md transition-transform active:scale-95"
          >
            <CheckCircle2 size={16} />
            <span>{isCompleted ? 'Volver a Marcar (+50 XP)' : 'Completar Lección (+50 XP)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
