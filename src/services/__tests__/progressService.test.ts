import { describe, it, expect } from 'vitest';
import { ProgressService } from '../progressService';
import { UserProfile } from '../../types';
import { DEFAULT_USER_PROFILE } from '../storageService';

describe('ProgressService', () => {
  const getCleanProfile = (): UserProfile => ({
    ...DEFAULT_USER_PROFILE,
    completedLessons: [],
    hankoBadges: [],
    favorites: [],
    xp: 0,
    level: 1
  });

  describe('getNextPendingLesson', () => {
    it('returns the first lesson of Module 0 for a brand new user', () => {
      const profile = getCleanProfile();
      const pending = ProgressService.getNextPendingLesson(profile);

      expect(pending.lessonId).toBe('l0-phonetics');
      expect(pending.moduleId).toBe('module-0');
      expect(pending.isAllCompleted).toBe(false);
    });

    it('advances to the second lesson once the first is completed', () => {
      const profile = {
        ...getCleanProfile(),
        completedLessons: ['l0-phonetics']
      };

      const pending = ProgressService.getNextPendingLesson(profile);
      expect(pending.lessonId).toBe('l0-writing-system');
      expect(pending.moduleId).toBe('module-0');
    });

    it('advances to the next module when all lessons in module 0 are completed', () => {
      const profile = {
        ...getCleanProfile(),
        completedLessons: ['l0-phonetics', 'l0-writing-system', 'l0-greetings']
      };

      const pending = ProgressService.getNextPendingLesson(profile);
      expect(pending.moduleId).toBe('module-1');
      expect(pending.lessonId).toBe('l1-vowels-k');
    });

    it('signals isAllCompleted when all lessons are completed', () => {
      const allLessons = ProgressService.getAllLessons();
      const profile = {
        ...getCleanProfile(),
        completedLessons: allLessons.map(item => item.lesson.id)
      };

      const pending = ProgressService.getNextPendingLesson(profile);
      expect(pending.isAllCompleted).toBe(true);
    });
  });

  describe('getNextLessonAfter', () => {
    it('finds the next lesson in the same module', () => {
      const nextInfo = ProgressService.getNextLessonAfter('l0-phonetics');
      expect(nextInfo.nextLesson).toBeDefined();
      expect(nextInfo.nextLesson?.lessonId).toBe('l0-writing-system');
      expect(nextInfo.isCurrentModuleComplete).toBe(false);
    });

    it('detects module boundary when completing the last lesson of a module', () => {
      const nextInfo = ProgressService.getNextLessonAfter('l0-greetings');
      expect(nextInfo.nextLesson).toBeDefined();
      expect(nextInfo.nextLesson?.lessonId).toBe('l1-vowels-k');
      expect(nextInfo.isCurrentModuleComplete).toBe(true);
      expect(nextInfo.nextModule?.id).toBe('module-1');
    });

    it('handles the very last lesson of the curriculum gracefully', () => {
      const all = ProgressService.getAllLessons();
      const last = all[all.length - 1];
      const nextInfo = ProgressService.getNextLessonAfter(last.lesson.id);

      expect(nextInfo.nextLesson).toBeNull();
      expect(nextInfo.isCurrentModuleComplete).toBe(true);
    });
  });

  describe('getModuleProgress', () => {
    it('calculates 0% for an untouched module', () => {
      const profile = getCleanProfile();
      const progress = ProgressService.getModuleProgress(profile, 'module-0');

      expect(progress.completedCount).toBe(0);
      expect(progress.totalCount).toBe(3);
      expect(progress.percentage).toBe(0);
      expect(progress.isCompleted).toBe(false);
      expect(progress.isUnlocked).toBe(true); // Module 0 is unlocked by default
    });

    it('calculates 100% when all module lessons are completed', () => {
      const profile = {
        ...getCleanProfile(),
        completedLessons: ['l0-phonetics', 'l0-writing-system', 'l0-greetings']
      };

      const progress = ProgressService.getModuleProgress(profile, 'module-0');
      expect(progress.completedCount).toBe(3);
      expect(progress.percentage).toBe(100);
      expect(progress.isCompleted).toBe(true);
    });
  });

  describe('completeLesson', () => {
    it('adds lesson to completedLessons, awards XP, and recalculates level', () => {
      const profile = getCleanProfile();
      const result = ProgressService.completeLesson(profile, 'l0-phonetics', 50);

      expect(result.updatedProfile.completedLessons).toContain('l0-phonetics');
      expect(result.updatedProfile.xp).toBe(50);
      expect(result.updatedProfile.level).toBe(1);
      expect(result.updatedProfile.lastActiveLessonId).toBe('l0-phonetics');
      expect(result.newBadgesAwarded).toContain('badge-first-step');
    });

    it('is idempotent and prevents duplicate entries in completedLessons', () => {
      const profile = {
        ...getCleanProfile(),
        completedLessons: ['l0-phonetics'],
        xp: 50
      };

      const result = ProgressService.completeLesson(profile, 'l0-phonetics', 50);
      expect(result.updatedProfile.completedLessons.filter(id => id === 'l0-phonetics').length).toBe(1);
      // Awards reduced XP for repeated completions
      expect(result.updatedProfile.xp).toBe(60);
    });

    it('awards Hanko badge for completing Module 0', () => {
      const profile = {
        ...getCleanProfile(),
        completedLessons: ['l0-phonetics', 'l0-writing-system']
      };

      const result = ProgressService.completeLesson(profile, 'l0-greetings', 50);
      expect(result.moduleJustCompleted).toBe(true);
      expect(result.newBadgesAwarded).toContain('badge-module-0');
      expect(result.updatedProfile.hankoBadges).toContain('badge-module-0');
    });
  });

  describe('Favorites management', () => {
    it('toggles favorites on and off correctly', () => {
      let profile = getCleanProfile();
      expect(ProgressService.isFavorite(profile, 'v-mizu')).toBe(false);

      const res1 = ProgressService.toggleFavorite(profile, 'v-mizu');
      expect(res1.isFavorite).toBe(true);
      expect(res1.updatedProfile.favorites).toContain('v-mizu');

      profile = res1.updatedProfile;
      expect(ProgressService.isFavorite(profile, 'v-mizu')).toBe(true);

      const res2 = ProgressService.toggleFavorite(profile, 'v-mizu');
      expect(res2.isFavorite).toBe(false);
      expect(res2.updatedProfile.favorites).not.toContain('v-mizu');
    });
  });
});
