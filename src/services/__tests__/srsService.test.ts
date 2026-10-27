import { describe, it, expect } from 'vitest';
import { SRSService } from '../srsService';
import { SRSItem } from '../../types';
import { HIRAGANA_DATA, KATAKANA_DATA } from '../../data/kanaData';
import { KANJI_DATA } from '../../data/kanjiData';
import { VOCAB_DATA } from '../../data/vocabData';
import { GRAMMAR_LESSONS } from '../../data/grammarData';

describe('SRSService - SM-2 Spaced Repetition Algorithm', () => {
  const baseItem: SRSItem = {
    id: 'test-1',
    type: 'vocab',
    japanese: '水',
    reading: 'みず',
    romaji: 'mizu',
    spanish: 'Agua',
    repetitions: 0,
    interval: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    errorCount: 0,
    tags: ['vocab'],
    history: []
  };

  it('resets repetitions to 0 and sets interval to 1 on "again"', () => {
    const itemWithHistory: SRSItem = {
      ...baseItem,
      repetitions: 3,
      interval: 10,
      easeFactor: 2.5
    };

    const updated = SRSService.calculateNextReview(itemWithHistory, 'again');
    expect(updated.repetitions).toBe(0);
    expect(updated.interval).toBe(1);
    expect(updated.errorCount).toBe(1);
    expect(updated.easeFactor).toBeLessThan(2.5); // reduced
    expect(updated.history.length).toBe(1);
  });

  it('progresses intervals correctly for first-time reviews with "good"', () => {
    // 1st review 'good'
    const step1 = SRSService.calculateNextReview(baseItem, 'good');
    expect(step1.repetitions).toBe(1);
    expect(step1.interval).toBe(1);

    // 2nd review 'good'
    const step2 = SRSService.calculateNextReview(step1, 'good');
    expect(step2.repetitions).toBe(2);
    expect(step2.interval).toBe(6);

    // 3rd review 'good'
    const step3 = SRSService.calculateNextReview(step2, 'good');
    expect(step3.repetitions).toBe(3);
    expect(step3.interval).toBe(Math.round(6 * 2.5)); // ~15 days
  });

  it('provides longer intervals for "easy" rating and increases ease factor', () => {
    const step1 = SRSService.calculateNextReview(baseItem, 'easy');
    expect(step1.repetitions).toBe(1);
    expect(step1.interval).toBe(4);
    expect(step1.easeFactor).toBeGreaterThan(2.5); // increased
  });

  it('correctly calculates due items based on nextReviewDate', () => {
    const past = new Date();
    past.setDate(past.getDate() - 2);

    const future = new Date();
    future.setDate(future.getDate() + 5);

    const items: SRSItem[] = [
      { ...baseItem, id: 'due-1', nextReviewDate: past.toISOString() },
      { ...baseItem, id: 'future-1', nextReviewDate: future.toISOString() }
    ];

    const due = SRSService.getDueItems(items);
    expect(due.length).toBe(1);
    expect(due[0].id).toBe('due-1');
  });

  it('correctly categorizes items in mastery breakdown stages', () => {
    const items: SRSItem[] = [
      { ...baseItem, id: '1', repetitions: 0 },
      { ...baseItem, id: '2', repetitions: 1 },
      { ...baseItem, id: '3', repetitions: 3 },
      { ...baseItem, id: '4', repetitions: 6 }
    ];

    const breakdown = SRSService.getMasteryBreakdown(items);
    expect(breakdown.learning).toBe(2); // reps 0, 1
    expect(breakdown.reviewing).toBe(1); // reps 3
    expect(breakdown.mastered).toBe(1); // reps 6
    expect(breakdown.total).toBe(4);
  });
});

describe('SRSService - Adaptive Mistake Diagnostics', () => {
  it('detects particle wa/ga confusion and produces pedagogical recommendation', () => {
    const items: SRSItem[] = [
      {
        id: '1',
        type: 'grammar',
        japanese: '私は寿司が好きです',
        reading: 'わたしは すしが すきです',
        romaji: 'watashi wa sushi ga suki desu',
        spanish: 'Me gusta el sushi',
        repetitions: 0,
        interval: 1,
        easeFactor: 2.3,
        nextReviewDate: new Date().toISOString(),
        errorCount: 3,
        tags: ['particula-wa-ga'],
        history: []
      }
    ];

    const recommendations = SRSService.analyzeMistakes(items);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0].tag).toBe('particula-wa-ga');
    expect(recommendations[0].relatedLessonId).toBe('grammar-wa-ga');
  });

  it('detects kana confusion sa/ki/chi', () => {
    const items: SRSItem[] = [
      {
        id: '1',
        type: 'kana',
        japanese: 'さ',
        reading: 'さ',
        romaji: 'sa',
        spanish: 'sa',
        repetitions: 0,
        interval: 1,
        easeFactor: 2.3,
        nextReviewDate: new Date().toISOString(),
        errorCount: 2,
        tags: ['kana-confusion-sa-ki-chi'],
        history: []
      }
    ];

    const recommendations = SRSService.analyzeMistakes(items);
    expect(recommendations.some(r => r.tag === 'kana-confusion-sa-ki-chi')).toBe(true);
  });
});

describe('Content Integrity and Pedagogical Quality', () => {
  it('HIRAGANA_DATA contains all 46 core characters with stroke steps and mnemonics', () => {
    expect(HIRAGANA_DATA.length).toBeGreaterThanOrEqual(40);
    HIRAGANA_DATA.forEach(k => {
      expect(k.char).toBeDefined();
      expect(k.romaji).toBeDefined();
      expect(k.strokeCount).toBeGreaterThan(0);
      expect(k.strokeSteps.length).toBeGreaterThan(0);
      expect(k.mnemonicEs).toBeDefined();
    });
  });

  it('KATAKANA_DATA contains characters with mnemonics and examples', () => {
    expect(KATAKANA_DATA.length).toBeGreaterThanOrEqual(15);
    KATAKANA_DATA.forEach(k => {
      expect(k.char).toBeDefined();
      expect(k.romaji).toBeDefined();
      expect(k.examples.length).toBeGreaterThan(0);
    });
  });

  it('KANJI_DATA contains radical, stroke order steps, onyomi, kunyomi and contextual sentences', () => {
    expect(KANJI_DATA.length).toBeGreaterThanOrEqual(5);
    KANJI_DATA.forEach(kj => {
      expect(kj.char).toBeDefined();
      expect(kj.meaningEs).toBeDefined();
      expect(kj.radical).toBeDefined();
      expect(kj.exampleSentence).toBeDefined();
      expect(kj.vocabulary.length).toBeGreaterThan(0);
    });
  });

  it('GRAMMAR_LESSONS contain formula, detailed explanation, common mistakes and quiz questions', () => {
    expect(GRAMMAR_LESSONS.length).toBeGreaterThanOrEqual(4);
    GRAMMAR_LESSONS.forEach(l => {
      expect(l.id).toBeDefined();
      expect(l.title).toBeDefined();
      expect(l.formula).toBeDefined();
      expect(l.commonMistakes.length).toBeGreaterThan(0);
      expect(l.practiceQuestions.length).toBeGreaterThan(0);
    });
  });

  it('VOCAB_DATA contains contextual sentences with grammatical breakdown', () => {
    expect(VOCAB_DATA.length).toBeGreaterThanOrEqual(10);
    VOCAB_DATA.forEach(v => {
      expect(v.word).toBeDefined();
      expect(v.reading).toBeDefined();
      expect(v.meaningEs).toBeDefined();
      expect(v.exampleSentence.breakdown).toBeDefined();
      expect(v.exampleSentence.breakdown.length).toBeGreaterThan(0);
    });
  });
});
