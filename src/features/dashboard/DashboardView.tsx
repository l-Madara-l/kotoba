import React from 'react';
import { 
  Play, 
  Sparkles, 
  Flame, 
  Clock, 
  BookOpen, 
  PenTool, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';
import { UserProfile, SRSItem, DailyStudyRecord } from '../../types';
import { SRSService, AdaptiveMistake } from '../../services/srsService';
import { ProgressService } from '../../services/progressService';
import { HankoBadge } from '../../components/common/HankoBadge';
import { HANKO_BADGES } from '../../data/hankoBadgesData';
import { ActiveTab } from '../../components/layout/Sidebar';

interface DashboardViewProps {
  profile: UserProfile;
  srsItems: SRSItem[];
  studyRecords: DailyStudyRecord[];
  onNavigate: (tab: ActiveTab) => void;
  onStartReview: () => void;
  onStartLesson: (lessonId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  srsItems,
  studyRecords,
  onNavigate,
  onStartReview,
  onStartLesson
}) => {
  const dueItems = SRSService.getDueItems(srsItems);
  const mastery = SRSService.getMasteryBreakdown(srsItems);
  const mistakes = SRSService.analyzeMistakes(srsItems);

  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return { jp: 'おはようございます', es: 'Buenos días' };
    if (hour < 18) return { jp: 'こんにちは', es: 'Buenas tardes' };
    return { jp: 'こんばんは', es: 'Buenas noches' };
  };

  const greeting = getGreeting();

  // Today study progress
  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecord = studyRecords.find(r => r.date === todayStr);
  const minutesToday = todayRecord ? todayRecord.minutes : 0;
  const goalMinutes = profile.preferences.dailyGoalMinutes || 30;
  const goalPercent = Math.min(100, Math.round((minutesToday / goalMinutes) * 100));

  // Next recommended lesson dynamically computed from user completedLessons
  const pendingLesson = ProgressService.getNextPendingLesson(profile);
  const recommendedLesson = {
    id: pendingLesson.lessonId,
    title: pendingLesson.title,
    titleJp: pendingLesson.titleJp,
    module: pendingLesson.moduleName,
    time: pendingLesson.estimatedMinutes,
    isAllCompleted: pendingLesson.isAllCompleted
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Editorial Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-piedra/60 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
            <span>{greeting.jp}</span>
            <span>•</span>
            <span>{greeting.es}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1 tracking-tight">
            {profile.name}さん、今日も日本語を深めましょう。
          </h1>
          <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
            Tu camino hacia la fluidez natural: 15 a 60 minutos diarios con atención consciente.
          </p>
        </div>

        {/* Quick streak & daily goal widget */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm">
            <Flame className="text-torii fill-torii" size={20} />
            <div>
              <span className="text-[10px] text-sumi/60 dark:text-washi/60 block leading-tight">Racha activa</span>
              <span className="text-sm font-bold text-sumi dark:text-washi">{profile.streakDays} días</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm">
            <Clock className="text-musgo" size={20} />
            <div>
              <span className="text-[10px] text-sumi/60 dark:text-washi/60 block leading-tight">Meta diaria</span>
              <span className="text-sm font-bold text-sumi dark:text-washi">{minutesToday}/{goalMinutes} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Study Hero & Secondary SRS Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hero Continue Learning CTA (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Card */}
          <div className="relative rounded-2xl border-2 border-torii/30 dark:border-torii-dark/30 bg-marfil dark:bg-[#1f2320] p-6 sm:p-8 shadow-sm overflow-hidden group">
            {/* Subtle background kanji watermark */}
            <div 
              className="absolute -right-4 -bottom-6 text-9xl font-serif text-sumi/5 dark:text-washi/5 pointer-events-none select-none font-bold"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              道
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-torii/10 text-torii dark:text-torii-dark dark:bg-torii-dark/15 mb-3">
                <Sparkles size={13} />
                <span>Próximo Paso Recomendado</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-sumi dark:text-washi">
                {recommendedLesson.title}
              </h2>
              <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
                {recommendedLesson.module} • Duración estimada: {recommendedLesson.time} minutos
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onStartLesson(recommendedLesson.id)}
                  className="px-6 py-3 rounded-xl bg-torii text-marfil text-sm font-semibold hover:bg-torii-hover flex items-center gap-2 shadow-md transition-transform active:scale-95 group-hover:shadow-lg"
                >
                  <Play size={16} className="fill-marfil" />
                  <span>
                    {recommendedLesson.isAllCompleted
                      ? 'Repasar Lección Recomendada'
                      : 'Continuar Ruta de Aprendizaje'}
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('learning-path')}
                  className="px-4 py-3 rounded-xl border border-piedra/80 dark:border-piedra-dark text-xs font-medium text-sumi dark:text-washi hover:border-torii transition-colors"
                >
                  Ver Mapa de Niveles Completo
                </button>
              </div>
            </div>
          </div>

          {/* Adaptive Learning / Error Diagnostic Recommendation */}
          {mistakes.length > 0 && (
            <div className="rounded-xl border border-oro/40 bg-oro/5 dark:bg-oro/10 p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-oro/20 text-oro mt-0.5">
                  <AlertCircle size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-sumi dark:text-washi">
                      Diagnóstico Adaptativo Personalizado
                    </h3>
                    <span className="text-[10px] text-oro font-semibold">
                      {mistakes[0].count} errores detectados
                    </span>
                  </div>
                  <p className="text-xs text-sumi/80 dark:text-washi/80 mt-1">
                    {mistakes[0].description}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-musgo dark:text-musgo-light font-medium">
                      Acción sugerida: {mistakes[0].recommendedAction}
                    </span>
                    <button
                      onClick={() => onNavigate('grammar')}
                      className="text-xs font-bold text-torii dark:text-torii-dark hover:underline flex items-center gap-1"
                    >
                      <span>Practicar</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Study Time Activity Chart */}
          <div className="rounded-xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-musgo" />
                <h3 className="text-xs font-bold text-sumi dark:text-washi">
                  Actividad de los Últimos 7 Días
                </h3>
              </div>
              <span className="text-xs text-sumi/60 dark:text-washi/60">
                Total acumulado: {profile.totalStudyTimeMinutes} minutos
              </span>
            </div>

            {/* Bars */}
            <div className="flex items-end justify-between gap-2 h-28 pt-2">
              {studyRecords.slice(-7).map((rec, i) => {
                const maxMins = 40;
                const heightPercent = Math.min(100, Math.max(12, Math.round((rec.minutes / maxMins) * 100)));
                const dateLabel = new Date(rec.date).toLocaleDateString('es-ES', { weekday: 'narrow' });
                const isToday = rec.date === todayStr;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-mono text-sumi/50 dark:text-washi/50">
                      {rec.minutes}m
                    </span>
                    <div className="w-full max-w-[32px] bg-piedra/30 dark:bg-piedra-dark/40 rounded-t-sm relative h-full flex items-end">
                      <div
                        className={`w-full rounded-t-sm transition-all duration-500 ${
                          isToday
                            ? 'bg-torii dark:bg-torii-dark'
                            : 'bg-musgo/80 dark:bg-musgo-light/80'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className={`text-[11px] font-medium uppercase ${isToday ? 'text-torii font-bold' : 'text-sumi/60 dark:text-washi/60'}`}>
                      {dateLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: SRS Reviews & Quick Mastery Stats (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Spaced Repetition (SRS) Pending Box */}
          <div className="rounded-xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-torii dark:text-torii-dark" />
                <h3 className="text-xs font-bold text-sumi dark:text-washi">
                  Repetición Espaciada (SM-2)
                </h3>
              </div>
              <span className="text-xs font-serif font-bold text-torii dark:text-torii-dark">
                {dueItems.length} pendientes
              </span>
            </div>

            <p className="text-xs text-sumi/75 dark:text-washi/75 leading-relaxed">
              {dueItems.length > 0
                ? 'Tienes tarjetas listas para revisión hoy. El repaso a tiempo evita la curva del olvido.'
                : '¡Todo al día! No tienes revisiones pendientes por ahora.'}
            </p>

            <div className="mt-4 pt-3 border-t border-piedra/40 flex items-center justify-between text-xs">
              <span className="text-sumi/60 dark:text-washi/60">
                Tarjetas totales en memoria:
              </span>
              <span className="font-bold text-sumi dark:text-washi">
                {mastery.total}
              </span>
            </div>

            <button
              onClick={onStartReview}
              disabled={dueItems.length === 0}
              className="mt-4 w-full py-2.5 rounded-lg bg-torii text-marfil text-xs font-semibold hover:bg-torii-hover flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Sparkles size={14} />
              <span>{dueItems.length > 0 ? `Repasar ${dueItems.length} Tarjetas` : 'Repasar Adelantado'}</span>
            </button>
          </div>

          {/* Mastery Stages Breakdown */}
          <div className="rounded-xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-indigo" />
                <h3 className="text-xs font-bold text-sumi dark:text-washi">
                  Fases de Retención
                </h3>
              </div>
              <span className="text-[10px] text-sumi/50 dark:text-washi/50 font-serif">定着度</span>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-sumi/70 dark:text-washi/70">Dominado (Memoria a largo plazo)</span>
                  <span className="font-bold text-musgo dark:text-musgo-light">{mastery.mastered}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-piedra/40 dark:bg-piedra-dark">
                  <div 
                    className="h-1.5 rounded-full bg-musgo" 
                    style={{ width: `${mastery.total > 0 ? (mastery.mastered / mastery.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-sumi/70 dark:text-washi/70">Consolidando (Intervalo medio)</span>
                  <span className="font-bold text-oro">{mastery.reviewing}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-piedra/40 dark:bg-piedra-dark">
                  <div 
                    className="h-1.5 rounded-full bg-oro" 
                    style={{ width: `${mastery.total > 0 ? (mastery.reviewing / mastery.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-sumi/70 dark:text-washi/70">Aprendiendo (Reciente)</span>
                  <span className="font-bold text-torii dark:text-torii-dark">{mastery.learning}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-piedra/40 dark:bg-piedra-dark">
                  <div 
                    className="h-1.5 rounded-full bg-torii dark:bg-torii-dark" 
                    style={{ width: `${mastery.total > 0 ? (mastery.learning / mastery.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hanko Badges preview */}
          <div className="rounded-xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-oro" />
                <h3 className="text-xs font-bold text-sumi dark:text-washi">
                  Sellos Hanko Desbloqueados
                </h3>
              </div>
              <button 
                onClick={() => onNavigate('progress')}
                className="text-[11px] text-torii dark:text-torii-dark hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {HANKO_BADGES.slice(0, 3).map(badge => {
                const isUnlocked = profile.hankoBadges.includes(badge.id);
                return (
                  <HankoBadge
                    key={badge.id}
                    kanji={badge.kanji}
                    name={badge.name.split(' ')[0]}
                    unlocked={isUnlocked}
                    size="sm"
                    onClick={() => onNavigate('progress')}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
