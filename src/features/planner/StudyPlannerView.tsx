import React, { useState } from 'react';
import { Clock, Play, CheckCircle2, Sparkles, BookOpen, ScrollText, Headphones, MessageSquare, ArrowRight } from 'lucide-react';
import { UserProfile, StudySessionPlan } from '../../types';
import { audioService } from '../../services/audioService';
import { ActiveTab } from '../../components/layout/Sidebar';

interface StudyPlannerViewProps {
  profile: UserProfile;
  onNavigate: (tab: ActiveTab) => void;
  onLogStudySession: (minutes: number, xp: number, reviewsDone: number, newLearned: number) => void;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({
  profile,
  onNavigate,
  onLogStudySession
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(profile.preferences.dailyGoalMinutes || 30);
  const [activeSession, setActiveSession] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  // Generate dynamic schedule blocks according to selected minutes
  const generatePlan = (mins: number): StudySessionPlan => {
    if (mins === 15) {
      return {
        durationMinutes: 15,
        blocks: [
          { step: 1, title: 'Repaso Rápido SM-2', section: 'review', minutes: 5, description: 'Despejar las tarjetas de memoria pendientes del día.', targetFeature: 'vocabulary' },
          { step: 2, title: 'Micro-lección de Vocabulario', section: 'vocab', minutes: 5, description: 'Aprender 3 términos nuevos con su oración modelo.', targetFeature: 'vocabulary' },
          { step: 3, title: 'Escucha o Frase Activa', section: 'listening', minutes: 5, description: 'Dictado de 2 oraciones para afinar el compás de mora.', targetFeature: 'listening' }
        ]
      };
    } else if (mins === 30) {
      return {
        durationMinutes: 30,
        blocks: [
          { step: 1, title: 'Repaso de Tarjetas Pendientes', section: 'review', minutes: 5, description: 'Refuerzo de memoria espaciada con el algoritmo SM-2.', targetFeature: 'vocabulary' },
          { step: 2, title: 'Vocabulario Nuevo en Contexto', section: 'vocab', minutes: 7, description: 'Palabras cotidianas con análisis de partículas asociadas.', targetFeature: 'vocabulary' },
          { step: 3, title: 'Gramática y Estructura', section: 'grammar', minutes: 8, description: 'Lección didáctica con comparación en español.', targetFeature: 'grammar' },
          { step: 4, title: 'Escucha Activa y Dictado', section: 'listening', minutes: 5, description: 'Entrenamiento del oído con audio japonés nativo.', targetFeature: 'listening' },
          { step: 5, title: 'Producción: Diálogo o Caligrafía', section: 'production', minutes: 5, description: 'Práctica de trazos en lienzo o simulación en restaurante.', targetFeature: 'conversation' }
        ]
      };
    } else if (mins === 45) {
      return {
        durationMinutes: 45,
        blocks: [
          { step: 1, title: 'Repaso Extensivo SM-2', section: 'review', minutes: 8, description: 'Consolidación de tarjetas de memoria pendientes.', targetFeature: 'vocabulary' },
          { step: 2, title: 'Vocabulario y Kanji del Día', section: 'vocab', minutes: 10, description: 'Nuevos términos y práctica de kanji con sus radicales.', targetFeature: 'writing-lab' },
          { step: 3, title: 'Profundización Gramatical', section: 'grammar', minutes: 12, description: 'Contrastes entre partículas (は vs が, に vs で).', targetFeature: 'grammar' },
          { step: 4, title: 'Lectura Graduada Inmersiva', section: 'listening', minutes: 8, description: 'Texto narrativo con diccionario y audio sincronizado.', targetFeature: 'reading' },
          { step: 5, title: 'Conversación Simulada', section: 'production', minutes: 7, description: 'Completar una interacción real con el camarero o cajero.', targetFeature: 'conversation' }
        ]
      };
    } else {
      // 60 minutes master session
      return {
        durationMinutes: 60,
        blocks: [
          { step: 1, title: 'Repaso Completo de Memoria', section: 'review', minutes: 10, description: 'Sesión intensiva de recuperación activa de vocabulario y kanji.', targetFeature: 'vocabulary' },
          { step: 2, title: 'Caligrafía y Nuevos Kanji', section: 'vocab', minutes: 12, description: 'Escritura en lienzo y análisis de orden de trazos.', targetFeature: 'writing-lab' },
          { step: 3, title: 'Academia de Gramática', section: 'grammar', minutes: 15, description: 'Lección teórica y ejercicios de construcción.', targetFeature: 'grammar' },
          { step: 4, title: 'Laboratorio de Audio y Dictados', section: 'listening', minutes: 10, description: 'Comprensión auditiva pura sin subtítulos.', targetFeature: 'listening' },
          { step: 5, title: 'Simulación Oral y Lectura', section: 'production', minutes: 13, description: 'Lectura de historia original y conversación situacional.', targetFeature: 'conversation' }
        ]
      };
    }
  };

  const currentPlan = generatePlan(selectedMinutes);

  const handleStartSession = () => {
    setActiveSession(true);
    setCurrentStepIndex(0);
    setSessionCompleted(false);
    audioService.playZenChime('bell');
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < currentPlan.blocks.length) {
      setCurrentStepIndex(prev => prev + 1);
      audioService.playZenChime('bell');
    } else {
      setActiveSession(false);
      setSessionCompleted(true);
      audioService.playZenChime('success');
      onLogStudySession(selectedMinutes, selectedMinutes * 5, 8, 3);
    }
  };

  const getSectionIcon = (sec: string) => {
    switch (sec) {
      case 'review': return Sparkles;
      case 'vocab': return BookOpen;
      case 'grammar': return ScrollText;
      case 'listening': return Headphones;
      default: return MessageSquare;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-piedra/60 pb-5">
        <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
          <span>学習プランナー</span>
          <span>•</span>
          <span>Rutina Guiada y Gestión del Tiempo</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
          Planificador Inteligente de Estudio
        </h1>
        <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1 max-w-2xl">
          Elige los minutos que tienes hoy. Generamos una secuencia pedagógica óptima combinando repaso, nuevo contenido y producción activa.
        </p>
      </div>

      {/* Minutes Picker */}
      <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider flex items-center gap-2">
            <Clock size={16} className="text-torii" />
            <span>Selecciona tu sesión de hoy:</span>
          </span>
          <span className="text-[11px] font-mono text-sumi/60 dark:text-washi/60">
            Adaptable según tu disponibilidad
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[15, 30, 45, 60].map(mins => (
            <button
              key={mins}
              onClick={() => {
                setSelectedMinutes(mins);
                setActiveSession(false);
                setSessionCompleted(false);
              }}
              className={`p-4 rounded-xl border text-center transition-all ${
                selectedMinutes === mins
                  ? 'border-torii bg-torii/10 ring-2 ring-torii text-torii dark:text-torii-dark font-bold'
                  : 'border-piedra/70 bg-washi/30 dark:bg-[#181B19] text-sumi dark:text-washi hover:border-torii'
              }`}
            >
              <span className="text-xl font-serif block">{mins}</span>
              <span className="text-[10px] uppercase tracking-wider block mt-0.5">Minutos</span>
            </button>
          ))}
        </div>
      </div>

      {/* Routine Breakdown Blocks */}
      <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-piedra/40 pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-sumi dark:text-washi">
              Estructura de la Sesión de {selectedMinutes} Minutos
            </h3>
            <p className="text-xs text-sumi/60 dark:text-washi/60 mt-0.5">
              Distribuida de acuerdo con principios de interleaving y retención activa.
            </p>
          </div>

          {!activeSession && !sessionCompleted && (
            <button
              onClick={handleStartSession}
              className="px-6 py-2.5 rounded-xl bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <Play size={15} className="fill-marfil" />
              <span>Comenzar Sesión Guiada</span>
            </button>
          )}
        </div>

        {/* Step-by-step progress indicator when running */}
        {activeSession && (
          <div className="p-4 rounded-xl border-2 border-torii bg-torii/5 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-torii dark:text-torii-dark uppercase tracking-wider">
                Paso {currentStepIndex + 1} de {currentPlan.blocks.length} en progreso
              </span>
              <span className="font-mono text-sumi/70 dark:text-washi/70">
                Bloque de {currentPlan.blocks[currentStepIndex].minutes} min
              </span>
            </div>

            <h4 className="font-serif text-base font-bold text-sumi dark:text-washi">
              {currentPlan.blocks[currentStepIndex].title}
            </h4>
            <p className="text-xs text-sumi/80 dark:text-washi/80">
              {currentPlan.blocks[currentStepIndex].description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onNavigate(currentPlan.blocks[currentStepIndex].targetFeature as ActiveTab)}
                className="px-4 py-2 rounded-lg border border-torii text-torii hover:bg-torii hover:text-marfil text-xs font-bold transition-colors"
              >
                Abrir Módulo de Práctica
              </button>

              <button
                onClick={handleNextStep}
                className="px-5 py-2 rounded-lg bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center gap-1.5 shadow-sm"
              >
                <span>{currentStepIndex + 1 < currentPlan.blocks.length ? 'Siguiente Bloque' : 'Completar Sesión'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Completed summary report */}
        {sessionCompleted && (
          <div className="p-6 rounded-xl border-2 border-musgo bg-musgo/10 text-center space-y-3 animate-in fade-in">
            <CheckCircle2 size={36} className="text-musgo mx-auto" />
            <h4 className="font-serif text-xl font-bold text-sumi dark:text-washi">
              ¡Sesión de {selectedMinutes} Minutos Completada con Éxito!
            </h4>
            <p className="text-xs text-sumi/80 dark:text-washi/80 max-w-md mx-auto leading-relaxed">
              Has reforzado tu memoria a largo plazo, practicado vocabulario en contexto y sumado <strong>+{selectedMinutes * 5} XP</strong> a tu progreso.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-2 rounded-lg bg-musgo text-marfil text-xs font-bold hover:bg-musgo/90"
              >
                Volver al Panel Principal
              </button>
            </div>
          </div>
        )}

        {/* Timeline Blocks */}
        <div className="space-y-3">
          {currentPlan.blocks.map(b => {
            const Icon = getSectionIcon(b.section);
            const isCurrent = activeSession && currentPlan.blocks[currentStepIndex].step === b.step;

            return (
              <div
                key={b.step}
                className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${
                  isCurrent
                    ? 'border-torii bg-torii/10 ring-1 ring-torii'
                    : 'border-piedra/60 bg-washi/30 dark:bg-[#181B19]'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-washi dark:bg-[#282d2a] border border-piedra/60 flex items-center justify-center text-xs font-bold text-torii dark:text-torii-dark shrink-0">
                  {b.minutes}m
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-sumi/60 dark:text-washi/60" />
                    <h4 className="text-xs font-bold text-sumi dark:text-washi">
                      {b.step}. {b.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-sumi/70 dark:text-washi/70 mt-0.5">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
