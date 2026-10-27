import { SRSItem, SRSRating } from '../types';

export interface AdaptiveMistake {
  tag: string;
  count: number;
  description: string;
  recommendedAction: string;
  relatedLessonId?: string;
}

export class SRSService {
  /**
   * Applies the SM-2 Spaced Repetition Algorithm
   * 
   * Ratings:
   * - 'again': Complete blackout. Repetitions reset to 0, interval = 1 day, ease factor reduced.
   * - 'hard': Remembered with serious hesitation. Repetitions +1, interval * 1.2, ease factor slightly reduced.
   * - 'good': Correct recall after moderate effort. Repetitions +1, interval * ease factor.
   * - 'easy': Instant, confident recall. Repetitions +1, interval * ease factor * 1.3, ease factor increased.
   */
  public static calculateNextReview(item: SRSItem, rating: SRSRating): SRSItem {
    let { repetitions, interval, easeFactor, errorCount } = item;
    const now = new Date();
    const todayISO = now.toISOString();

    if (rating === 'again') {
      repetitions = 0;
      interval = 1; // Due tomorrow (or end of session)
      easeFactor = Math.max(1.3, easeFactor - 0.20);
      errorCount += 1;
    } else if (rating === 'hard') {
      repetitions += 1;
      interval = Math.max(1, Math.round(interval * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
    } else if (rating === 'good') {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
      // Ease factor remains stable
    } else if (rating === 'easy') {
      if (repetitions === 0) {
        interval = 4;
      } else if (repetitions === 1) {
        interval = 8;
      } else {
        interval = Math.round(interval * easeFactor * 1.35);
      }
      repetitions += 1;
      easeFactor = Math.min(3.0, easeFactor + 0.15);
    }

    // Calculate next review date
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + interval);
    const nextReviewDate = nextDate.toISOString();

    const updatedHistory = [
      ...(item.history || []),
      {
        date: todayISO,
        rating,
        interval,
        easeFactor,
      },
    ];

    return {
      ...item,
      repetitions,
      interval,
      easeFactor,
      nextReviewDate,
      lastReviewDate: todayISO,
      history: updatedHistory,
      errorCount,
    };
  }

  /**
   * Filter items that are currently due for review
   */
  public static getDueItems(items: SRSItem[]): SRSItem[] {
    const now = new Date();
    return items.filter(item => {
      if (!item.nextReviewDate) return true;
      const reviewDate = new Date(item.nextReviewDate);
      return reviewDate <= now;
    });
  }

  /**
   * Categorize items by mastery stage:
   * - Aprendiendo (Learning): reps < 2
   * - Consolidando (Reviewing): reps 2-4
   * - Dominado (Mastered): reps >= 5
   */
  public static getMasteryBreakdown(items: SRSItem[]): {
    learning: number;
    reviewing: number;
    mastered: number;
    total: number;
  } {
    let learning = 0;
    let reviewing = 0;
    let mastered = 0;

    items.forEach(item => {
      if (item.repetitions < 2) learning++;
      else if (item.repetitions < 5) reviewing++;
      else mastered++;
    });

    return {
      learning,
      reviewing,
      mastered,
      total: items.length,
    };
  }

  /**
   * Adaptive Learning Engine: analyzes user error tags and returns recommendations
   */
  public static analyzeMistakes(items: SRSItem[]): AdaptiveMistake[] {
    const tagErrorMap: Record<string, { count: number; items: string[] }> = {};

    items.forEach(item => {
      if (item.errorCount > 0 && item.tags) {
        item.tags.forEach(tag => {
          if (!tagErrorMap[tag]) {
            tagErrorMap[tag] = { count: 0, items: [] };
          }
          tagErrorMap[tag].count += item.errorCount;
          tagErrorMap[tag].items.push(item.japanese);
        });
      }
    });

    const recommendations: AdaptiveMistake[] = [];

    // Particle confusions
    if (tagErrorMap['particula-wa-ga'] && tagErrorMap['particula-wa-ga'].count >= 2) {
      recommendations.push({
        tag: 'particula-wa-ga',
        count: tagErrorMap['particula-wa-ga'].count,
        description: 'Dificultad recurrente distinguiendo la partícula は (tema) y が (sujeto enfático).',
        recommendedAction: 'Revisar la lección comparativa "は vs が" en la Academia de Gramática.',
        relatedLessonId: 'grammar-wa-ga',
      });
    }

    if (tagErrorMap['particula-ni-de'] && tagErrorMap['particula-ni-de'].count >= 2) {
      recommendations.push({
        tag: 'particula-ni-de',
        count: tagErrorMap['particula-ni-de'].count,
        description: 'Confusión entre に (lugar de existencia/destino) y で (lugar de acción).',
        recommendedAction: 'Practicar oraciones contrastivas con に y で.',
        relatedLessonId: 'grammar-ni-de',
      });
    }

    // Kana visual confusion: sa vs ki vs chi
    if (tagErrorMap['kana-confusion-sa-ki-chi'] && tagErrorMap['kana-confusion-sa-ki-chi'].count >= 2) {
      recommendations.push({
        tag: 'kana-confusion-sa-ki-chi',
        count: tagErrorMap['kana-confusion-sa-ki-chi'].count,
        description: 'Confusión visual frecuente entre さ (sa), き (ki) y ち (chi) en Hiragana.',
        recommendedAction: 'Hacer una sesión de 5 minutos en el Laboratorio de Escritura enfocada en el número y dirección de trazos de さ/き/ち.',
        relatedLessonId: 'kana-drill-sa-ki',
      });
    }

    // Katakana visual confusion: shi vs tsu
    if (tagErrorMap['katakana-shi-tsu'] && tagErrorMap['katakana-shi-tsu'].count >= 2) {
      recommendations.push({
        tag: 'katakana-shi-tsu',
        count: tagErrorMap['katakana-shi-tsu'].count,
        description: 'Confusión en los trazos de シ (shi) y ツ (tsu). Recuerda: シ sube desde abajo (sonrisa), ツ cae desde arriba (gotas).',
        recommendedAction: 'Practicar el trazo vertical vs horizontal en el Laboratorio.',
        relatedLessonId: 'katakana-shi-tsu-drill',
      });
    }

    // Verb conjugation te-form
    if (tagErrorMap['forma-te'] && tagErrorMap['forma-te'].count >= 2) {
      recommendations.push({
        tag: 'forma-te',
        count: tagErrorMap['forma-te'].count,
        description: 'Errores en las terminaciones de la forma て según el grupo verbal (う・つ・る -> って, etc.).',
        recommendedAction: 'Repasar la canción nemotécnica de la forma て en la Academia.',
        relatedLessonId: 'grammar-te-form',
      });
    }

    return recommendations;
  }
}
