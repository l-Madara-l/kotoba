import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  BookOpen, 
  PenTool, 
  ScrollText, 
  Library, 
  Compass, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { LEARNING_MODULES } from '../../data/levelsData';
import { UserProfile, LearningModule } from '../../types';
import { LessonModal } from './LessonModal';

interface LearningPathViewProps {
  profile: UserProfile;
  onLessonCompleted: (lessonId: string, xpEarned: number) => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  profile,
  onLessonCompleted
}) => {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'n5' | 'n4' | 'advanced'>('all');

  const filteredModules = LEARNING_MODULES.filter(m => {
    if (selectedFilter === 'n5') return m.levelNumber <= 4;
    if (selectedFilter === 'n4') return m.levelNumber === 5 || m.levelNumber === 6;
    if (selectedFilter === 'advanced') return m.levelNumber === 7;
    return true;
  });

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'kana':
        return PenTool;
      case 'vocab':
        return BookOpen;
      case 'grammar':
        return ScrollText;
      case 'reading':
        return Library;
      default:
        return Compass;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Editorial Header */}
      <div className="border-b border-piedra/60 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
            <span>学習ロードマップ</span>
            <span>•</span>
            <span>Ruta Pedagógica Integral</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
            Mapa de Progreso: De Cero a Fluidez
          </h1>
          <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
            Ocho etapas estructuradas que combinan lectura, escritura tradicional, gramática contrastiva y conversación.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-washi/80 dark:bg-[#1f2320] border border-piedra/60 self-start md:self-auto">
          {[
            { id: 'all', label: 'Todos los Niveles' },
            { id: 'n5', label: 'JLPT N5 (Básico)' },
            { id: 'n4', label: 'JLPT N4 (Intermedio)' },
            { id: 'advanced', label: 'Avanzado' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as typeof selectedFilter)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedFilter === f.id
                  ? 'bg-marfil dark:bg-[#181B19] text-torii font-semibold shadow-sm'
                  : 'text-sumi/60 dark:text-washi/60 hover:text-sumi'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Roadmap List */}
      <div className="space-y-6">
        {filteredModules.map((mod: LearningModule) => {
          const completedCount = mod.lessons.filter(l => profile.completedLessons.includes(l.id)).length;
          const progressPercent = Math.round((completedCount / mod.lessons.length) * 100);

          return (
            <div
              key={mod.id}
              className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm overflow-hidden"
            >
              {/* Module Header Bar */}
              <div className="p-5 sm:p-6 border-b border-piedra/50 bg-washi/30 dark:bg-[#181B19]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-marfil font-serif font-black text-lg shadow-sm shrink-0"
                    style={{ backgroundColor: mod.color }}
                  >
                    {mod.levelNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-sumi/60 dark:text-washi/60 uppercase">
                        Nivel {mod.levelNumber} • {mod.jlptEquivalent}
                      </span>
                      <span className="text-xs font-serif opacity-50">{mod.nameJp}</span>
                    </div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-sumi dark:text-washi mt-0.5">
                      {mod.name}
                    </h2>
                    <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1 max-w-xl">
                      {mod.description}
                    </p>
                  </div>
                </div>

                {/* Progress bar and counter */}
                <div className="sm:text-right shrink-0">
                  <div className="text-xs font-bold text-sumi dark:text-washi mb-1">
                    {completedCount} de {mod.lessons.length} lecciones ({progressPercent}%)
                  </div>
                  <div className="w-full sm:w-36 h-2 rounded-full bg-piedra/40 dark:bg-piedra-dark overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progressPercent}%`,
                        backgroundColor: mod.color
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Lessons Grid within Module */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {mod.lessons.map(lesson => {
                  const isDone = profile.completedLessons.includes(lesson.id);
                  const Icon = getLessonIcon(lesson.type);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`p-4 rounded-xl border text-left flex items-start justify-between gap-3 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md ${
                        isDone
                          ? 'border-musgo/40 bg-musgo/5 dark:bg-musgo/10'
                          : 'border-piedra/60 bg-washi/20 dark:bg-[#181B19]/50 hover:border-torii'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg mt-0.5 ${
                          isDone
                            ? 'bg-musgo/20 text-musgo dark:text-musgo-light'
                            : 'bg-washi dark:bg-[#282d2a] text-sumi/70 dark:text-washi/70'
                        }`}>
                          <Icon size={16} />
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-serif text-torii dark:text-torii-dark font-medium">
                              {lesson.titleJp}
                            </span>
                            <span className="text-[10px] text-sumi/50 dark:text-washi/50">• {lesson.estimatedMinutes} min</span>
                          </div>
                          <h3 className="text-xs font-bold text-sumi dark:text-washi mt-0.5 line-clamp-1">
                            {lesson.title}
                          </h3>
                          <p className="text-[11px] text-sumi/65 dark:text-washi/65 line-clamp-2 mt-1">
                            {lesson.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        {isDone ? (
                          <CheckCircle2 size={18} className="text-musgo dark:text-musgo-light" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-piedra dark:border-piedra-dark flex items-center justify-center">
                            <Circle size={8} className="text-transparent" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Details Modal */}
      {activeLessonId && (
        <LessonModal
          lessonId={activeLessonId}
          onClose={() => setActiveLessonId(null)}
          onCompleteLesson={onLessonCompleted}
          isCompleted={profile.completedLessons.includes(activeLessonId)}
        />
      )}
    </div>
  );
};
