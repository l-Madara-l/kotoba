import { UserProfile, SRSItem, DailyStudyRecord } from '../types';
import { HIRAGANA_DATA } from '../data/kanaData';
import { KANJI_DATA } from '../data/kanjiData';
import { VOCAB_DATA } from '../data/vocabData';

const STORAGE_KEYS = {
  USER_PROFILE: 'kotoba_user_profile',
  SRS_ITEMS: 'kotoba_srs_items',
  STUDY_RECORDS: 'kotoba_study_records',
  ONBOARDING_DONE: 'kotoba_onboarding_completed'
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Viajero del Idioma',
  hasStudiedBefore: false,
  knownHiragana: false,
  knownKatakana: false,
  knownKanji: false,
  goal: 'travel',
  learningStyle: 'balanced',
  streakDays: 3,
  lastStudyDate: new Date().toISOString().split('T')[0],
  totalStudyTimeMinutes: 45,
  xp: 320,
  level: 2,
  completedLessons: ['l0-phonetics', 'l0-writing-system'],
  hankoBadges: ['badge-first-step'],
  preferences: {
    theme: 'light',
    showRomaji: true,
    showFurigana: true,
    audioSpeed: 1.0,
    dailyGoalMinutes: 30,
    immersionMode: false,
    soundEffects: true
  },
  createdAt: new Date().toISOString()
};

export class StorageService {
  /**
   * Get the current user profile, seeding with default if not found
   */
  public static getUserProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    this.saveUserProfile(DEFAULT_USER_PROFILE);
    return DEFAULT_USER_PROFILE;
  }

  /**
   * Save user profile
   */
  public static saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }

  /**
   * Check if onboarding has been completed
   */
  public static isOnboardingCompleted(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE) === 'true';
  }

  /**
   * Mark onboarding as completed
   */
  public static setOnboardingCompleted(completed: boolean): void {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, completed ? 'true' : 'false');
  }

  /**
   * Get all SRS items, seeding with foundational items if first time
   */
  public static getSRSItems(): SRSItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SRS_ITEMS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }

    // Seed initial SRS deck
    const initialItems = this.generateInitialSRSDeck();
    this.saveSRSItems(initialItems);
    return initialItems;
  }

  /**
   * Save SRS items
   */
  public static saveSRSItems(items: SRSItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SRS_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save SRS items', e);
    }
  }

  /**
   * Generate initial SRS deck from kana, kanji and vocab
   */
  private static generateInitialSRSDeck(): SRSItem[] {
    const items: SRSItem[] = [];
    const now = new Date();
    const todayISO = now.toISOString();

    // Past date so items appear DUE right away for instant review
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString();

    // 1. Initial Hiragana (あ、い、う、え、お、か、き)
    HIRAGANA_DATA.slice(0, 7).forEach((k, idx) => {
      items.push({
        id: `srs-kana-${k.char}`,
        type: 'kana',
        japanese: k.char,
        reading: k.char,
        romaji: k.romaji,
        spanish: `Sonido "${k.romaji}". ${k.mnemonicEs}`,
        category: 'Hiragana',
        repetitions: idx < 3 ? 1 : 0,
        interval: idx < 3 ? 1 : 0,
        easeFactor: 2.5,
        nextReviewDate: idx < 4 ? yesterdayISO : todayISO, // some due now
        errorCount: idx === 1 ? 1 : 0,
        tags: k.similarConfusions ? ['kana-confusion-sa-ki-chi'] : ['hiragana'],
        history: []
      });
    });

    // 2. Initial Kanji (日, 本, 人, 水)
    KANJI_DATA.slice(0, 4).forEach((kj, idx) => {
      items.push({
        id: `srs-kanji-${kj.char}`,
        type: 'kanji',
        japanese: kj.char,
        reading: kj.primaryReading,
        romaji: kj.primaryReading,
        spanish: kj.meaningEs,
        category: 'Kanji N5',
        jlpt: 'N5',
        repetitions: idx < 2 ? 2 : 0,
        interval: idx < 2 ? 3 : 0,
        easeFactor: 2.5,
        nextReviewDate: idx === 0 ? yesterdayISO : todayISO,
        errorCount: 0,
        tags: ['kanji', 'n5'],
        history: []
      });
    });

    // 3. Core Vocab (水, ありがとう, こんにちは, 食べます, 飲みます)
    VOCAB_DATA.slice(0, 6).forEach((v, idx) => {
      items.push({
        id: `srs-vocab-${v.id}`,
        type: 'vocab',
        japanese: v.word,
        reading: v.reading,
        romaji: v.romaji,
        spanish: v.meaningEs,
        category: v.category,
        jlpt: v.jlpt,
        repetitions: idx < 3 ? 1 : 0,
        interval: idx < 3 ? 1 : 0,
        easeFactor: 2.5,
        nextReviewDate: idx < 3 ? yesterdayISO : todayISO,
        errorCount: idx === 4 ? 2 : 0,
        tags: idx === 4 ? ['particula-wa-ga', 'vocab'] : ['vocab'],
        history: []
      });
    });

    return items;
  }

  /**
   * Get daily study records for progress tracking
   */
  public static getDailyStudyRecords(): DailyStudyRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STUDY_RECORDS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }

    // Default last 7 days records
    const records: DailyStudyRecord[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      records.push({
        date: dateStr,
        minutes: i === 0 ? 15 : Math.floor(Math.random() * 25) + 10,
        reviewsCompleted: i === 0 ? 6 : Math.floor(Math.random() * 15) + 5,
        newItemsLearned: i === 0 ? 2 : Math.floor(Math.random() * 4) + 1,
        xpEarned: i === 0 ? 45 : Math.floor(Math.random() * 80) + 30
      });
    }

    this.saveDailyStudyRecords(records);
    return records;
  }

  /**
   * Save daily study records
   */
  public static saveDailyStudyRecords(records: DailyStudyRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDY_RECORDS, JSON.stringify(records));
    } catch (e) {
      console.error('Failed to save study records', e);
    }
  }

  /**
   * Record a completed study session
   */
  public static logSession(minutes: number, xp: number, reviewsDone: number, newLearned: number): void {
    const records = this.getDailyStudyRecords();
    const todayStr = new Date().toISOString().split('T')[0];
    const existing = records.find(r => r.date === todayStr);

    if (existing) {
      existing.minutes += minutes;
      existing.xpEarned += xp;
      existing.reviewsCompleted += reviewsDone;
      existing.newItemsLearned += newLearned;
    } else {
      records.push({
        date: todayStr,
        minutes,
        xpEarned: xp,
        reviewsCompleted: reviewsDone,
        newItemsLearned: newLearned
      });
    }
    this.saveDailyStudyRecords(records);

    // Update profile
    const profile = this.getUserProfile();
    profile.totalStudyTimeMinutes += minutes;
    profile.xp += xp;
    profile.level = Math.floor(profile.xp / 200) + 1;
    this.saveUserProfile(profile);
  }

  /**
   * Export all data as JSON
   */
  public static exportAllData(): string {
    const data = {
      profile: this.getUserProfile(),
      srsItems: this.getSRSItems(),
      records: this.getDailyStudyRecords(),
      version: '1.0.0',
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * Import data from JSON
   */
  public static importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) this.saveUserProfile(data.profile);
      if (data.srsItems) this.saveSRSItems(data.srsItems);
      if (data.records) this.saveDailyStudyRecords(data.records);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  }

  /**
   * Reset everything to factory defaults
   */
  public static resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.SRS_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.STUDY_RECORDS);
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_DONE);
  }
}
