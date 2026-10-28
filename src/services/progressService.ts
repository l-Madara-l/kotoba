import { UserProfile, LearningModule, Lesson } from '../types';
import { LEARNING_MODULES } from '../data/levelsData';

export interface NextLessonInfo {
  lessonId: string;
  title: string;
  titleJp: string;
  moduleName: string;
  moduleId: string;
  levelNumber: number;
  estimatedMinutes: number;
  isLastInModule: boolean;
  isAllCompleted: boolean;
  nextLessonId?: string;
  nextLessonTitle?: string;
}

export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  levelNumber: number;
  completedCount: number;
  totalCount: number;
  percentage: number;
  isCompleted: boolean;
  isUnlocked: boolean;
}

export interface LessonCompletionResult {
  updatedProfile: UserProfile;
  completedLessonId: string;
  nextLesson: NextLessonInfo | null;
  moduleJustCompleted: boolean;
  completedModuleName: string;
  newBadgesAwarded: string[];
}

export class ProgressService {
  /**
   * Get all lessons in linear sequence across all modules
   */
  public static getAllLessons(): Array<{ lesson: Lesson; module: LearningModule; indexInModule: number }> {
    const list: Array<{ lesson: Lesson; module: LearningModule; indexInModule: number }> = [];
    LEARNING_MODULES.forEach(mod => {
      mod.lessons.forEach((lesson, idx) => {
        list.push({
          lesson,
          module: mod,
          indexInModule: idx
        });
      });
    });
    return list;
  }

  /**
   * Find the next pending lesson for a user based on their completedLessons list
   */
  public static getNextPendingLesson(profile: UserProfile): NextLessonInfo {
    const all = this.getAllLessons();
    const completedSet = new Set(profile.completedLessons || []);

    // Look for first uncompleted lesson
    for (let i = 0; i < all.length; i++) {
      const item = all[i];
      if (!completedSet.has(item.lesson.id)) {
        const isLastInMod = item.indexInModule === item.module.lessons.length - 1;
        const nextItem = i + 1 < all.length ? all[i + 1] : undefined;

        return {
          lessonId: item.lesson.id,
          title: item.lesson.title,
          titleJp: item.lesson.titleJp || 'レッスン',
          moduleName: item.module.name,
          moduleId: item.module.id,
          levelNumber: item.module.levelNumber,
          estimatedMinutes: item.lesson.estimatedMinutes || 10,
          isLastInModule: isLastInMod,
          isAllCompleted: false,
          nextLessonId: nextItem?.lesson.id,
          nextLessonTitle: nextItem?.lesson.title
        };
      }
    }

    // All lessons completed! Return the last lesson with isAllCompleted = true
    const lastItem = all[all.length - 1];
    return {
      lessonId: lastItem.lesson.id,
      title: lastItem.lesson.title,
      titleJp: lastItem.lesson.titleJp || '修了',
      moduleName: lastItem.module.name,
      moduleId: lastItem.module.id,
      levelNumber: lastItem.module.levelNumber,
      estimatedMinutes: lastItem.lesson.estimatedMinutes || 10,
      isLastInModule: true,
      isAllCompleted: true
    };
  }

  /**
   * Find details about the immediate next lesson following a specific lessonId
   */
  public static getNextLessonAfter(currentLessonId: string): {
    nextLesson: NextLessonInfo | null;
    isCurrentModuleComplete: boolean;
    currentModule: LearningModule | null;
    nextModule: LearningModule | null;
  } {
    const all = this.getAllLessons();
    const currentIndex = all.findIndex(item => item.lesson.id === currentLessonId);

    if (currentIndex === -1) {
      return {
        nextLesson: null,
        isCurrentModuleComplete: false,
        currentModule: null,
        nextModule: null
      };
    }

    const currentItem = all[currentIndex];
    const isLastInCurrentModule = currentItem.indexInModule === currentItem.module.lessons.length - 1;

    if (currentIndex + 1 >= all.length) {
      // Reached the very end of curriculum
      return {
        nextLesson: null,
        isCurrentModuleComplete: isLastInCurrentModule,
        currentModule: currentItem.module,
        nextModule: null
      };
    }

    const nextItem = all[currentIndex + 1];
    const isNextLastInModule = nextItem.indexInModule === nextItem.module.lessons.length - 1;
    const isNewModule = nextItem.module.id !== currentItem.module.id;

    return {
      nextLesson: {
        lessonId: nextItem.lesson.id,
        title: nextItem.lesson.title,
        titleJp: nextItem.lesson.titleJp || 'レッスン',
        moduleName: nextItem.module.name,
        moduleId: nextItem.module.id,
        levelNumber: nextItem.module.levelNumber,
        estimatedMinutes: nextItem.lesson.estimatedMinutes || 10,
        isLastInModule: isNextLastInModule,
        isAllCompleted: false
      },
      isCurrentModuleComplete: isLastInCurrentModule,
      currentModule: currentItem.module,
      nextModule: isNewModule ? nextItem.module : null
    };
  }

  /**
   * Calculate progress for a specific module
   */
  public static getModuleProgress(profile: UserProfile, moduleId: string): ModuleProgress {
    const targetModule = LEARNING_MODULES.find(m => m.id === moduleId);
    if (!targetModule) {
      return {
        moduleId,
        moduleName: 'Desconocido',
        levelNumber: 0,
        completedCount: 0,
        totalCount: 0,
        percentage: 0,
        isCompleted: false,
        isUnlocked: false
      };
    }

    const completedSet = new Set(profile.completedLessons || []);
    const completedCount = targetModule.lessons.filter(l => completedSet.has(l.id)).length;
    const totalCount = targetModule.lessons.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const isCompleted = totalCount > 0 && completedCount === totalCount;

    // A module is unlocked if levelNumber === 0, or previous module is completed, or if any lesson in it is completed
    let isUnlocked = targetModule.levelNumber === 0;
    if (!isUnlocked) {
      const prevModule = LEARNING_MODULES.find(m => m.levelNumber === targetModule.levelNumber - 1);
      if (prevModule) {
        const prevCompleted = prevModule.lessons.every(l => completedSet.has(l.id));
        isUnlocked = prevCompleted || completedCount > 0;
      } else {
        isUnlocked = true;
      }
    }

    return {
      moduleId: targetModule.id,
      moduleName: targetModule.name,
      levelNumber: targetModule.levelNumber,
      completedCount,
      totalCount,
      percentage,
      isCompleted,
      isUnlocked
    };
  }

  /**
   * Get total curriculum statistics
   */
  public static getOverallProgress(profile: UserProfile): {
    totalLessons: number;
    completedLessons: number;
    percentage: number;
    modulesCompleted: number;
    totalModules: number;
  } {
    const all = this.getAllLessons();
    const completedSet = new Set(profile.completedLessons || []);
    const completedCount = all.filter(item => completedSet.has(item.lesson.id)).length;
    const totalCount = all.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const modulesCompleted = LEARNING_MODULES.filter(m =>
      m.lessons.every(l => completedSet.has(l.id))
    ).length;

    return {
      totalLessons: totalCount,
      completedLessons: completedCount,
      percentage,
      modulesCompleted,
      totalModules: LEARNING_MODULES.length
    };
  }

  /**
   * Complete a lesson and return the updated profile plus next lesson info
   */
  public static completeLesson(
    profile: UserProfile,
    lessonId: string,
    xpEarned: number = 50
  ): LessonCompletionResult {
    const completedSet = new Set(profile.completedLessons || []);
    const wasAlreadyCompleted = completedSet.has(lessonId);
    completedSet.add(lessonId);

    // Find lesson and module info
    const all = this.getAllLessons();
    const currentItem = all.find(item => item.lesson.id === lessonId);
    const currentMod = currentItem?.module;

    // Check if this module just became fully completed
    let moduleJustCompleted = false;
    let completedModuleName = currentMod ? currentMod.name : '';
    if (currentMod) {
      const allLessonsInModDone = currentMod.lessons.every(l => completedSet.has(l.id));
      if (allLessonsInModDone && !wasAlreadyCompleted) {
        moduleJustCompleted = true;
      }
    }

    // Check badges
    const badgesSet = new Set(profile.hankoBadges || []);
    const newBadges: string[] = [];

    const awardBadge = (badgeId: string) => {
      if (!badgesSet.has(badgeId)) {
        badgesSet.add(badgeId);
        newBadges.push(badgeId);
      }
    };

    awardBadge('badge-first-step');

    if (currentMod?.id === 'module-0' && currentMod.lessons.every(l => completedSet.has(l.id))) {
      awardBadge('badge-module-0');
    }
    if (currentMod?.id === 'module-1' && currentMod.lessons.every(l => completedSet.has(l.id))) {
      awardBadge('badge-hiragana-master');
    }
    if (currentMod?.id === 'module-2' && currentMod.lessons.every(l => completedSet.has(l.id))) {
      awardBadge('badge-katakana-master');
    }
    if (currentMod?.id === 'module-3' && currentMod.lessons.every(l => completedSet.has(l.id))) {
      awardBadge('badge-grammar-foundation');
    }
    if (currentMod?.id === 'module-4' && currentMod.lessons.every(l => completedSet.has(l.id))) {
      awardBadge('badge-kanji-voyager');
    }

    // XP calculation: full XP on first complete, reduced XP on repeat
    const actualXp = wasAlreadyCompleted ? Math.round(xpEarned * 0.2) : xpEarned;
    const newXp = (profile.xp || 0) + actualXp;
    const newLevel = Math.floor(newXp / 200) + 1;

    // Determine next lesson
    const nextInfo = this.getNextLessonAfter(lessonId);

    const updatedProfile: UserProfile = {
      ...profile,
      completedLessons: Array.from(completedSet),
      hankoBadges: Array.from(badgesSet),
      xp: newXp,
      level: newLevel,
      lastActiveLessonId: lessonId,
      currentModuleId: nextInfo.nextLesson?.moduleId || currentMod?.id || profile.currentModuleId,
      lastActivityDate: new Date().toISOString()
    };

    return {
      updatedProfile,
      completedLessonId: lessonId,
      nextLesson: nextInfo.nextLesson,
      moduleJustCompleted,
      completedModuleName,
      newBadgesAwarded: newBadges
    };
  }

  /**
   * Toggle an item in the user's favorites array
   */
  public static toggleFavorite(
    profile: UserProfile,
    itemId: string
  ): { updatedProfile: UserProfile; isFavorite: boolean } {
    const favorites = new Set(profile.favorites || []);
    let isFavorite: boolean;

    if (favorites.has(itemId)) {
      favorites.delete(itemId);
      isFavorite = false;
    } else {
      favorites.add(itemId);
      isFavorite = true;
    }

    const updatedProfile: UserProfile = {
      ...profile,
      favorites: Array.from(favorites)
    };

    return { updatedProfile, isFavorite };
  }

  /**
   * Check if an item is favorited
   */
  public static isFavorite(profile: UserProfile, itemId: string): boolean {
    if (!profile.favorites) return false;
    return profile.favorites.includes(itemId);
  }
}
