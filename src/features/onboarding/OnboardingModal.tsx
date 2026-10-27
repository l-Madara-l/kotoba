import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Compass, BookOpen, Volume2, Clock } from 'lucide-react';
import { UserProfile, StudyGoal, LearningStyle } from '../../types';
import { audioService } from '../../services/audioService';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profileData: Partial<UserProfile>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete
}) => {
  const [step, setStep] = useState<number>(0); // 0: Welcome, 1: Experience, 2: Goal, 3: Style & Time
  const [name, setName] = useState<string>('');
  const [hasStudiedBefore, setHasStudiedBefore] = useState<boolean>(false);
  const [knownHiragana, setKnownHiragana] = useState<boolean>(false);
  const [knownKatakana, setKnownKatakana] = useState<boolean>(false);
  const [knownKanji, setKnownKanji] = useState<boolean>(false);
  const [goal, setGoal] = useState<StudyGoal>('travel');
  const [dailyMinutes, setDailyMinutes] = useState<number>(30);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('balanced');

  if (!isOpen) return null;

  const handleFinish = () => {
    audioService.playZenChime('success');
    onComplete({
      name: name.trim() || 'Viajero del Idioma',
      hasStudiedBefore,
      knownHiragana,
      knownKatakana,
      knownKanji,
      goal,
      learningStyle,
      preferences: {
        theme: 'light',
        showRomaji: !knownHiragana, // If user doesn't know hiragana, show romaji initially
        showFurigana: true,
        audioSpeed: 1.0,
        dailyGoalMinutes: dailyMinutes,
        immersionMode: false,
        soundEffects: true
      }
    });
  };

  const goalsList: { id: StudyGoal; label: string; desc: string; icon: string }[] = [
    { id: 'travel', label: 'Viajar a Japón', desc: 'Moverte por Tokio, pedir en restaurantes y hablar con locales', icon: '🚅' },
    { id: 'anime', label: 'Anime & Cultura Pop', desc: 'Entender diálogos y expresiones sin depender siempre de subtítulos', icon: '🎬' },
    { id: 'manga', label: 'Leer Manga y Libros', desc: 'Comprender viñetas, onomatopeyas e historias originales', icon: '📖' },
    { id: 'conversation', label: 'Conversación Fluida', desc: 'Hablar con amigos japoneses con naturalidad y cortesía', icon: '💬' },
    { id: 'jlpt', label: 'Preparar Examen JLPT', desc: 'Aprobar los niveles N5, N4 o superiores con método riguroso', icon: '🎯' },
    { id: 'personal', label: 'Interés Personal & Reto', desc: 'Aprender por amor a la caligrafía, filosofía y cultura zen', icon: '🌸' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sumi/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-marfil dark:bg-[#1f2320] border-2 border-piedra/80 dark:border-piedra-dark shadow-2xl overflow-hidden transition-all my-8">
        {/* Subtle traditional Japanese Torii arch header art */}
        <div className="h-28 bg-gradient-to-b from-torii/15 to-transparent flex items-center justify-center relative border-b border-piedra/40">
          <div className="text-center">
            <span className="font-serif text-3xl font-black text-torii dark:text-torii-dark tracking-widest block">
              言葉
            </span>
            <span className="text-[11px] font-sans tracking-widest uppercase text-sumi/60 dark:text-washi/60 mt-1 block">
              KOTOBA — Plataforma Educativa Inmersiva
            </span>
          </div>

          {/* Step indicator pills */}
          <div className="absolute bottom-2 flex gap-1.5">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  step === i
                    ? 'w-6 bg-torii dark:bg-torii-dark'
                    : i < step
                    ? 'w-2 bg-musgo'
                    : 'w-2 bg-piedra dark:bg-piedra-dark'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content steps */}
        <div className="p-6 sm:p-8">
          {/* STEP 0: Welcome Screen */}
          {step === 0 && (
            <div className="text-center space-y-4">
              <h2 className="font-serif text-2xl font-bold text-sumi dark:text-washi">
                Bienvenido a KOTOBA
              </h2>
              <p className="font-serif italic text-torii dark:text-torii-dark text-sm">
                «Aprende japonés. Piensa en japonés. Vive el idioma.»
              </p>
              <p className="text-xs text-sumi/80 dark:text-washi/80 leading-relaxed max-w-md mx-auto">
                No somos una lista de tarjetas de memoria ni un juego superficial. 
                Aquí aprenderás con rigor pedagógico, identidad visual japonesa, repetición espaciada SM-2 y contexto cultural auténtico para hispanohablantes.
              </p>

              <div className="pt-4 max-w-xs mx-auto text-left">
                <label className="block text-xs font-semibold text-sumi/80 dark:text-washi/80 mb-1.5">
                  ¿Cómo te gustaría que te llamemos?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Tu nombre o apodo"
                  className="w-full px-3.5 py-2 rounded-lg border border-piedra dark:border-piedra-dark bg-washi/60 dark:bg-[#181B19] text-sm text-sumi dark:text-washi focus:outline-none focus:border-torii"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    audioService.playZenChime('bell');
                    setStep(1);
                  }}
                  className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-torii text-marfil text-sm font-semibold hover:bg-torii-hover flex items-center justify-center gap-2 mx-auto shadow-md transition-transform active:scale-95"
                >
                  <span>Comenzar Evaluación Inicial</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: Knowledge Check */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-sumi dark:text-washi">
                  1. Diagnóstico de conocimientos previos
                </h3>
                <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
                  Adaptaremos tu ruta según lo que ya domines para que nunca pierdas tiempo.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <label className="flex items-center justify-between p-3 rounded-lg border border-piedra/80 dark:border-piedra-dark bg-washi/40 dark:bg-[#181B19] cursor-pointer hover:border-torii transition-colors">
                  <div className="text-left">
                    <span className="text-xs font-semibold block text-sumi dark:text-washi">
                      ¿Has estudiado japonés anteriormente?
                    </span>
                    <span className="text-[11px] text-sumi/60 dark:text-washi/60">
                      En cursos, libros, anime o por tu cuenta
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasStudiedBefore}
                    onChange={e => setHasStudiedBefore(e.target.checked)}
                    className="w-4 h-4 accent-torii cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-piedra/80 dark:border-piedra-dark bg-washi/40 dark:bg-[#181B19] cursor-pointer hover:border-torii transition-colors">
                  <div className="text-left">
                    <span className="text-xs font-semibold block text-sumi dark:text-washi">
                      ¿Conoces el silabario Hiragana (ひらがな)?
                    </span>
                    <span className="text-[11px] text-sumi/60 dark:text-washi/60">
                      Reconoces los 46 caracteres básicos (あ、い、う...)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={knownHiragana}
                    onChange={e => setKnownHiragana(e.target.checked)}
                    className="w-4 h-4 accent-torii cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-piedra/80 dark:border-piedra-dark bg-washi/40 dark:bg-[#181B19] cursor-pointer hover:border-torii transition-colors">
                  <div className="text-left">
                    <span className="text-xs font-semibold block text-sumi dark:text-washi">
                      ¿Conoces el silabario Katakana (カタカナ)?
                    </span>
                    <span className="text-[11px] text-sumi/60 dark:text-washi/60">
                      Caracteres para extranjerismos (ア、イ、ウ...)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={knownKatakana}
                    onChange={e => setKnownKatakana(e.target.checked)}
                    className="w-4 h-4 accent-torii cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-piedra/80 dark:border-piedra-dark bg-washi/40 dark:bg-[#181B19] cursor-pointer hover:border-torii transition-colors">
                  <div className="text-left">
                    <span className="text-xs font-semibold block text-sumi dark:text-washi">
                      ¿Sabes leer algunos Kanji básicos?
                    </span>
                    <span className="text-[11px] text-sumi/60 dark:text-washi/60">
                      Ideogramas como 日, 本, 人, 水, 木
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={knownKanji}
                    onChange={e => setKnownKanji(e.target.checked)}
                    className="w-4 h-4 accent-torii cursor-pointer"
                  />
                </label>
              </div>

              <div className="flex justify-between pt-4 border-t border-piedra/50">
                <button
                  onClick={() => setStep(0)}
                  className="px-4 py-2 text-xs text-sumi/70 dark:text-washi/70 hover:text-sumi"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 rounded-lg bg-torii text-marfil text-xs font-semibold hover:bg-torii-hover flex items-center gap-1.5 shadow-sm"
                >
                  <span>Continuar</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Goal */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-sumi dark:text-washi">
                  2. ¿Cuál es tu objetivo principal?
                </h3>
                <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
                  Priorizaremos el vocabulario, situaciones y diálogos enfocados en tu meta.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-h-64 overflow-y-auto pr-1">
                {goalsList.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      goal === g.id
                        ? 'border-torii bg-torii/5 ring-1 ring-torii dark:border-torii-dark'
                        : 'border-piedra/80 dark:border-piedra-dark hover:border-torii/50 bg-washi/30 dark:bg-[#181B19]'
                    }`}
                  >
                    <span className="text-2xl select-none">{g.icon}</span>
                    <div>
                      <span className="text-xs font-bold block text-sumi dark:text-washi">
                        {g.label}
                      </span>
                      <span className="text-[11px] text-sumi/65 dark:text-washi/65 leading-tight block mt-0.5">
                        {g.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-piedra/50">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-sumi/70 dark:text-washi/70 hover:text-sumi"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2 rounded-lg bg-torii text-marfil text-xs font-semibold hover:bg-torii-hover flex items-center gap-1.5 shadow-sm"
                >
                  <span>Continuar</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Time & Learning Style */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-sumi dark:text-washi">
                  3. Disponibilidad y estilo de aprendizaje
                </h3>
                <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
                  Tu planificador diario organizará bloques de estudio a tu medida.
                </p>
              </div>

              {/* Time selection */}
              <div>
                <label className="block text-xs font-semibold text-sumi dark:text-washi mb-2 flex items-center gap-1.5">
                  <Clock size={14} className="text-torii" />
                  <span>Tiempo que puedes dedicar al día:</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 45, 60].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setDailyMinutes(mins)}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                        dailyMinutes === mins
                          ? 'bg-torii text-marfil border-torii dark:bg-torii-dark'
                          : 'border-piedra/80 text-sumi dark:text-washi hover:border-torii bg-washi/40 dark:bg-[#181B19]'
                      }`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Learning Style */}
              <div>
                <label className="block text-xs font-semibold text-sumi dark:text-washi mb-2 flex items-center gap-1.5">
                  <Compass size={14} className="text-musgo" />
                  <span>¿Cómo prefieres aprender?</span>
                </label>
                <div className="grid grid-cols-2 gap-2 text-left">
                  {[
                    { id: 'balanced', label: 'Equilibrado', desc: 'Audio, lectura, escritura y gramática' },
                    { id: 'audio', label: 'Auditivo / Oral', desc: 'Más enfoque en escucha y pronunciación' },
                    { id: 'reading', label: 'Visual / Lectura', desc: 'Más kanji, lectura de historias y textos' },
                    { id: 'exercises', label: 'Práctico / Retos', desc: 'Más ejercicios activos y minijuegos' }
                  ].map(style => (
                    <button
                      key={style.id}
                      onClick={() => setLearningStyle(style.id as LearningStyle)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        learningStyle === style.id
                          ? 'border-musgo bg-musgo/10 ring-1 ring-musgo text-musgo dark:text-musgo-light'
                          : 'border-piedra/80 text-sumi dark:text-washi hover:border-musgo bg-washi/30 dark:bg-[#181B19]'
                      }`}
                    >
                      <span className="text-xs font-bold block">{style.label}</span>
                      <span className="text-[10px] opacity-75 leading-tight block mt-0.5">{style.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-piedra/50">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs text-sumi/70 dark:text-washi/70 hover:text-sumi"
                >
                  Atrás
                </button>
                <button
                  onClick={handleFinish}
                  className="px-8 py-2.5 rounded-lg bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center gap-2 shadow-md transition-transform active:scale-95"
                >
                  <Check size={16} />
                  <span>Generar Mi Ruta de Estudio</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
