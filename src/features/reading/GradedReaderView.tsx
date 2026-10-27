import React, { useState } from 'react';
import { GRADED_STORIES } from '../../data/storiesData';
import { GradedStory } from '../../types';
import { AudioButton } from '../../components/common/AudioButton';
import { audioService } from '../../services/audioService';
import { 
  BookOpen, 
  Sparkles, 
  Volume2, 
  Eye, 
  EyeOff, 
  Check, 
  HelpCircle,
  BookmarkPlus
} from 'lucide-react';

interface GradedReaderViewProps {
  onAddWordToSRS?: (word: string, reading: string, spanish: string) => void;
}

export const GradedReaderView: React.FC<GradedReaderViewProps> = ({
  onAddWordToSRS
}) => {
  const [selectedStory, setSelectedStory] = useState<GradedStory>(GRADED_STORIES[0]);
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [showTranslations, setShowTranslations] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [selectedGlossaryWord, setSelectedGlossaryWord] = useState<{
    word: string;
    reading: string;
    spanish: string;
  } | null>(null);

  const handleSelectStory = (story: GradedStory) => {
    setSelectedStory(story);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setSelectedGlossaryWord(null);
  };

  const handlePlayParagraph = (text: string) => {
    audioService.speak(text, 1.0);
  };

  const handleQuizAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    audioService.playZenChime('success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-piedra/60 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
            <span>多読ライブラリ</span>
            <span>•</span>
            <span>Lecturas Graduadas Inmersivas</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
            Biblioteca de Lectura Japonesa
          </h1>
          <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
            Historias originales por niveles JLPT. Haz clic en las palabras del glosario para ver su significado.
          </p>
        </div>

        {/* Global Reading Toggles */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setShowFurigana(!showFurigana)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
              showFurigana
                ? 'bg-musgo/15 border-musgo text-musgo dark:text-musgo-light'
                : 'border-piedra/60 text-sumi/60 dark:text-washi/60'
            }`}
          >
            {showFurigana ? 'Furigana Activo' : 'Sin Furigana'}
          </button>

          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
              showTranslations
                ? 'bg-torii/15 border-torii text-torii dark:text-torii-dark'
                : 'border-piedra/60 text-sumi/60 dark:text-washi/60'
            }`}
          >
            {showTranslations ? 'Traducción Visible' : 'Ocultar Traducción'}
          </button>
        </div>
      </div>

      {/* Story Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GRADED_STORIES.map(story => (
          <button
            key={story.id}
            onClick={() => handleSelectStory(story)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedStory.id === story.id
                ? 'border-torii bg-torii/5 ring-1 ring-torii dark:border-torii-dark'
                : 'border-piedra/70 bg-marfil dark:bg-[#1f2320] hover:border-torii/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo/15 text-indigo dark:text-washi/80">
                {story.level}
              </span>
              <span className="text-xs font-serif opacity-50">多読</span>
            </div>
            <h3 className="font-serif text-sm font-bold text-sumi dark:text-washi">
              {story.titleJp}
            </h3>
            <span className="text-xs text-sumi/70 dark:text-washi/70 block mt-0.5">
              {story.titleEs}
            </span>
          </button>
        ))}
      </div>

      {/* Reader Book Layout */}
      <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 sm:p-10 shadow-sm space-y-8">
        {/* Book Title */}
        <div className="text-center border-b border-piedra/40 pb-6 space-y-1">
          <span className="text-xs font-serif font-bold text-torii dark:text-torii-dark">
            {selectedStory.titleKana}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-sumi dark:text-washi">
            {selectedStory.titleJp}
          </h2>
          <p className="text-xs text-sumi/60 dark:text-washi/60 max-w-lg mx-auto italic mt-1">
            {selectedStory.summary}
          </p>
        </div>

        {/* Story Paragraphs Stream */}
        <div className="space-y-6">
          {selectedStory.paragraphs.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-washi/40 dark:bg-[#181B19] border border-piedra/50 space-y-3"
            >
              {/* Japanese Paragraph text with audio */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-serif text-base sm:text-lg text-sumi dark:text-washi leading-loose">
                    {showFurigana ? (
                      <ruby>
                        {p.japanese}
                        <rt className="text-xs text-torii dark:text-torii-dark font-sans opacity-90 select-none">
                          {p.kana}
                        </rt>
                      </ruby>
                    ) : (
                      p.japanese
                    )}
                  </p>

                  {/* Optional translation */}
                  {showTranslations && (
                    <p className="text-xs text-sumi/75 dark:text-washi/75 italic pt-2 border-t border-piedra/30 animate-in fade-in">
                      «{p.spanish}»
                    </p>
                  )}
                </div>

                <AudioButton text={p.japanese} size="md" />
              </div>

              {/* Glossary chips for this paragraph */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-sumi/50 dark:text-washi/50 uppercase mr-1">
                  Vocabulario:
                </span>
                {p.glossary.map((w, wi) => (
                  <button
                    key={wi}
                    onClick={() => setSelectedGlossaryWord(w)}
                    className="px-2 py-0.5 rounded-md border border-piedra/60 bg-marfil dark:bg-[#232724] text-[11px] font-serif text-sumi dark:text-washi hover:border-torii hover:text-torii transition-colors"
                  >
                    {w.word}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Word Glossary Tooltip Drawer */}
        {selectedGlossaryWord && (
          <div className="p-4 rounded-xl border-2 border-torii/40 bg-torii/5 flex items-center justify-between text-xs animate-in fade-in">
            <div>
              <span className="font-serif text-base font-bold text-sumi dark:text-washi mr-2">
                {selectedGlossaryWord.word}
              </span>
              <span className="text-torii dark:text-torii-dark font-mono mr-2">
                [{selectedGlossaryWord.reading}]
              </span>
              <span className="text-sumi/80 dark:text-washi/80 font-medium">
                — {selectedGlossaryWord.spanish}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <AudioButton text={selectedGlossaryWord.word} size="sm" />
              <button
                onClick={() => setSelectedGlossaryWord(null)}
                className="text-[10px] text-sumi/50 hover:text-torii"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Comprehension Quiz */}
        <div className="pt-6 border-t border-piedra/40 space-y-4">
          <h3 className="font-serif text-sm font-bold text-sumi dark:text-washi flex items-center gap-2">
            <Check size={16} className="text-musgo" />
            <span>Preguntas de Comprensión Lectora</span>
          </h3>

          <div className="space-y-4">
            {selectedStory.comprehensionQuiz.map((q, qi) => {
              const selectedOpt = quizAnswers[qi];

              return (
                <div
                  key={qi}
                  className="p-4 rounded-xl border border-piedra/60 bg-washi/30 dark:bg-[#181B19] space-y-2 text-xs"
                >
                  <p className="font-semibold text-sumi dark:text-washi">
                    {qi + 1}. {q.question}
                  </p>

                  <div className="space-y-1.5">
                    {q.options.map((opt, oi) => {
                      const isChosen = selectedOpt === oi;
                      let btnStyle = 'border-piedra/60 bg-marfil dark:bg-[#232724] text-sumi dark:text-washi hover:border-torii';

                      if (quizSubmitted) {
                        if (oi === q.correctIndex) {
                          btnStyle = 'border-musgo bg-musgo/15 text-musgo dark:text-musgo-light font-bold';
                        } else if (isChosen) {
                          btnStyle = 'border-torii bg-torii/10 text-torii line-through';
                        }
                      } else if (isChosen) {
                        btnStyle = 'border-torii bg-torii/10 text-torii font-semibold';
                      }

                      return (
                        <button
                          key={oi}
                          onClick={() => handleQuizAnswer(qi, oi)}
                          disabled={quizSubmitted}
                          className={`w-full p-2.5 rounded-lg border text-left transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <p className="text-[11px] text-sumi/75 dark:text-washi/75 pt-2 border-t border-piedra/30 leading-relaxed">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(quizAnswers).length < selectedStory.comprehensionQuiz.length}
              className="px-6 py-2.5 rounded-xl bg-torii text-marfil text-xs font-bold hover:bg-torii-hover shadow-sm disabled:opacity-40"
            >
              Comprobar Respuestas
            </button>
          ) : (
            <div className="p-3 rounded-lg bg-musgo/15 border border-musgo/40 text-xs font-bold text-musgo dark:text-musgo-light text-center">
              ¡Comprobación finalizada! Has ejercitado la comprensión contextual.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
