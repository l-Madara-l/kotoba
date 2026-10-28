export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type LearningStyle = 'audio' | 'reading' | 'exercises' | 'balanced';

export type StudyGoal = 
  | 'travel' 
  | 'anime' 
  | 'manga' 
  | 'conversation' 
  | 'personal' 
  | 'jlpt' 
  | 'literacy';

export interface UserPreferences {
  theme: 'light' | 'dark';
  showRomaji: boolean;
  showFurigana: boolean;
  audioSpeed: number; // 0.75, 1.0, 1.25
  dailyGoalMinutes: number; // 15, 30, 45, 60
  immersionMode: boolean; // minimizes Spanish explanations when true
  soundEffects: boolean;
}

export interface UserProfile {
  name: string;
  hasStudiedBefore: boolean;
  knownHiragana: boolean;
  knownKatakana: boolean;
  knownKanji: boolean;
  goal: StudyGoal;
  learningStyle: LearningStyle;
  streakDays: number;
  lastStudyDate: string;
  totalStudyTimeMinutes: number;
  xp: number;
  level: number;
  completedLessons: string[]; // lesson IDs
  hankoBadges: string[]; // badge IDs
  favorites: string[]; // item IDs: vocab, kanji char, lesson ID
  lastActiveLessonId?: string;
  currentModuleId?: string;
  lastActivityDate?: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface LessonDetail {
  id: string;
  title: string;
  titleJp: string;
  module: string;
  moduleId: string;
  level: string;
  objective: string;
  content: string[];
  audioSamples?: {
    text: string;
    kana: string;
    romaji: string;
    es: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// SM-2 Spaced Repetition Types
export type SRSRating = 'again' | 'hard' | 'good' | 'easy';

export interface SRSHistoryEntry {
  date: string;
  rating: SRSRating;
  interval: number;
  easeFactor: number;
}

export interface SRSItem {
  id: string;
  type: 'kana' | 'kanji' | 'vocab' | 'grammar';
  japanese: string;
  reading: string;
  romaji: string;
  spanish: string;
  category?: string;
  jlpt?: JLPTLevel;
  repetitions: number;
  interval: number; // in days
  easeFactor: number; // initial 2.5
  nextReviewDate: string; // ISO date
  lastReviewDate?: string;
  history: SRSHistoryEntry[];
  errorCount: number;
  tags: string[];
}

// Kana
export interface KanaCharacter {
  char: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  category: 'vowel' | 'k' | 's' | 't' | 'n' | 'h' | 'm' | 'y' | 'r' | 'w' | 'n_single' | 'dakuten' | 'handakuten' | 'yoon';
  strokeCount: number;
  strokeSteps: string[]; // descriptive stroke directions
  mnemonicEs: string; // memory trick in Spanish
  examples: {
    word: string;
    reading: string;
    romaji: string;
    spanish: string;
  }[];
  similarConfusions?: string[]; // e.g. さ vs き vs ち, シ vs ツ
}

// Kanji
export interface KanjiItem {
  char: string;
  meaningEs: string;
  onyomi: string[];
  kunyomi: string[];
  primaryReading: string;
  radical: string;
  radicalMeaning: string;
  strokeCount: number;
  jlpt: JLPTLevel;
  grade: number;
  strokeSteps: string[];
  mnemonicEs: string;
  vocabulary: {
    word: string;
    reading: string;
    romaji: string;
    spanish: string;
    jlpt?: JLPTLevel;
  }[];
  exampleSentence: {
    japanese: string;
    kana: string;
    romaji: string;
    spanish: string;
  };
}

// Vocabulary
export interface VocabItem {
  id: string;
  word: string;
  reading: string;
  romaji: string;
  meaningEs: string;
  partOfSpeech: 'sustantivo' | 'verbo' | 'adjetivo-i' | 'adjetivo-na' | 'adverbio' | 'partícula' | 'expresión' | 'contador';
  category: string;
  jlpt: JLPTLevel;
  priority: 'alta' | 'media' | 'baja';
  pitchAccent?: string;
  notes?: string;
  exampleSentence: {
    japanese: string;
    kana: string;
    romaji: string;
    spanish: string;
    breakdown: {
      segment: string;
      role: string;
      explanation: string;
    }[];
  };
}

// Grammar
export interface GrammarLesson {
  id: string;
  title: string;
  structure: string;
  level: JLPTLevel;
  order: number;
  learningObjective: string;
  summaryEs: string;
  formula: string;
  detailedExplanation: string;
  spanishComparison?: string;
  commonMistakes: {
    incorrect: string;
    correct: string;
    explanation: string;
  }[];
  examples: {
    japanese: string;
    kana: string;
    romaji: string;
    spanish: string;
    breakdown: {
      term: string;
      reading?: string;
      meaning: string;
      function: string;
    }[];
  }[];
  practiceQuestions: {
    id: string;
    type: 'multiple-choice' | 'fill-blank' | 'reorder' | 'translate';
    prompt: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
    hint?: string;
  }[];
}

// Reading Stories
export interface GradedStory {
  id: string;
  titleJp: string;
  titleKana: string;
  titleEs: string;
  level: JLPTLevel;
  summary: string;
  paragraphs: {
    japanese: string;
    kana: string;
    spanish: string;
    glossary: {
      word: string;
      reading: string;
      spanish: string;
    }[];
  }[];
  comprehensionQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

// Conversation Simulator
export interface DialogueTurn {
  speaker: 'npc' | 'user';
  speakerName: string;
  avatar: string;
  japanese: string;
  kana: string;
  romaji: string;
  spanish: string;
  audioPrompt?: string;
  possibleResponses?: {
    textJp: string;
    kana: string;
    romaji: string;
    spanish: string;
    formality: 'cortés' | 'informal' | 'muy cortés';
    isBest: boolean;
    feedback: string;
  }[];
  culturalNote?: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  titleJp: string;
  location: string;
  difficulty: JLPTLevel;
  description: string;
  objective: string;
  characterName: string;
  characterRole: string;
  characterAvatar: string;
  dialogueTurns: DialogueTurn[];
}

// Culture Notes
export interface CultureArticle {
  id: string;
  title: string;
  japaneseTitle: string;
  category: 'etiqueta' | 'sociedad' | 'gastronomia' | 'tradicion' | 'vida-cotidiana';
  summary: string;
  content: string[];
  keyVocabulary: {
    word: string;
    reading: string;
    romaji: string;
    spanish: string;
  }[];
  proTip: string;
}

// Learning Path Modules
export interface ModuleLesson {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  type: 'kana' | 'vocab' | 'grammar' | 'reading' | 'culture' | 'checkpoint';
  estimatedMinutes: number;
  unlockedByDefault?: boolean;
}

export type Lesson = ModuleLesson;

export interface LearningModule {
  levelNumber: number;
  id: string;
  name: string;
  nameJp: string;
  jlptEquivalent: string;
  description: string;
  color: string;
  lessons: ModuleLesson[];
}

// Study Session Plan
export interface StudySessionPlan {
  durationMinutes: number;
  blocks: {
    step: number;
    title: string;
    section: 'review' | 'vocab' | 'grammar' | 'listening' | 'production';
    minutes: number;
    description: string;
    targetFeature: string;
  }[];
}

// Hanko Badges
export interface HankoBadge {
  id: string;
  kanji: string;
  name: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
}

// Daily Study Record
export interface DailyStudyRecord {
  date: string; // YYYY-MM-DD
  minutes: number;
  reviewsCompleted: number;
  newItemsLearned: number;
  xpEarned: number;
}
