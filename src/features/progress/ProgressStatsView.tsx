import React from 'react';
import { Award, Flame, Clock, BookOpen, PenTool, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { UserProfile, SRSItem, DailyStudyRecord } from '../../types';
import { HANKO_BADGES } from '../../data/hankoBadgesData';
import { HankoBadge } from '../../components/common/HankoBadge';
import { SRSService } from '../../services/srsService';

interface ProgressStatsViewProps {
  profile: UserProfile;
  srsItems: SRSItem[];
  studyRecords: DailyStudyRecord[];
}

export const ProgressStatsView: React.FC<ProgressStatsViewProps> = ({
  profile,
  srsItems,
  studyRecords
}) => {
  const mastery = SRSService.getMasteryBreakdown(srsItems);
  const totalReviews = studyRecords.reduce((acc, r) => acc + r.reviewsCompleted, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-piedra/60 pb-5">
        <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
          <span>達成・成績</span>
          <span>•</span>
          <span>Evolución y Sellos Tradicionales</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
          Progreso y Colección de Sellos Hanko
        </h1>
        <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1 max-w-xl">
          Constancia, recuperación activa y profundidad de aprendizaje reflejados en tu cuaderno de estudio.
        </p>
      </div>

      {/* Core Stats Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm">
          <div className="flex items-center gap-2 text-torii dark:text-torii-dark mb-1">
            <Flame size={18} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Racha</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-black text-sumi dark:text-washi">
            {profile.streakDays} <span className="text-xs font-normal opacity-70">días</span>
          </div>
          <span className="text-[10px] text-sumi/60 dark:text-washi/60 block mt-0.5">
            Días consecutivos de práctica
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm">
          <div className="flex items-center gap-2 text-musgo mb-1">
            <Clock size={18} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Tiempo Total</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-black text-sumi dark:text-washi">
            {profile.totalStudyTimeMinutes} <span className="text-xs font-normal opacity-70">min</span>
          </div>
          <span className="text-[10px] text-sumi/60 dark:text-washi/60 block mt-0.5">
            Invertidos en atención consciente
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm">
          <div className="flex items-center gap-2 text-oro mb-1">
            <Sparkles size={18} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Experiencia XP</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-black text-sumi dark:text-washi">
            {profile.xp} <span className="text-xs font-normal opacity-70">XP</span>
          </div>
          <span className="text-[10px] text-sumi/60 dark:text-washi/60 block mt-0.5">
            Nivel actual: {profile.level}
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm">
          <div className="flex items-center gap-2 text-indigo mb-1">
            <BookOpen size={18} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Tarjetas SM-2</span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-black text-sumi dark:text-washi">
            {mastery.total} <span className="text-xs font-normal opacity-70">cards</span>
          </div>
          <span className="text-[10px] text-sumi/60 dark:text-washi/60 block mt-0.5">
            {mastery.mastered} dominadas a largo plazo
          </span>
        </div>
      </div>

      {/* Hanko Seal Collection Grid */}
      <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-piedra/40 pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-sumi dark:text-washi">
              Colección de Sellos Hanko Tradicionales
            </h3>
            <p className="text-xs text-sumi/65 dark:text-washi/65 mt-0.5">
              Inspirados en los sellos de lacre y madera japoneses para certificar hitos pedagógicos.
            </p>
          </div>

          <span className="text-xs font-serif font-bold text-torii dark:text-torii-dark">
            {profile.hankoBadges.length} de {HANKO_BADGES.length} sellados
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {HANKO_BADGES.map(badge => {
            const isUnlocked = profile.hankoBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
                  isUnlocked
                    ? 'border-torii/40 bg-torii/5'
                    : 'border-piedra/40 opacity-40 grayscale bg-washi/20 dark:bg-[#181B19]'
                }`}
              >
                <HankoBadge
                  kanji={badge.kanji}
                  name={badge.name}
                  unlocked={isUnlocked}
                  size="md"
                />
                <p className="text-[11px] text-sumi/70 dark:text-washi/70 mt-1 leading-tight">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
