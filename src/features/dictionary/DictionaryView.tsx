import React, { useState } from 'react';
import { Search, BookOpen, Volume2, BookmarkPlus, Sparkles, Check } from 'lucide-react';
import { VOCAB_DATA } from '../../data/vocabData';
import { KANJI_DATA } from '../../data/kanjiData';
import { AudioButton } from '../../components/common/AudioButton';
import { audioService } from '../../services/audioService';

interface DictionaryViewProps {
  onAddWordToSRS?: (word: string, reading: string, spanish: string) => void;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  onAddWordToSRS
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addedWords, setAddedWords] = useState<string[]>([]);

  // Search through all vocab and kanji
  const results = VOCAB_DATA.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.word.toLowerCase().includes(q) ||
      item.reading.toLowerCase().includes(q) ||
      item.romaji.toLowerCase().includes(q) ||
      item.meaningEs.toLowerCase().includes(q)
    );
  });

  const handleAddCard = (word: string, reading: string, spanish: string) => {
    if (onAddWordToSRS) {
      onAddWordToSRS(word, reading, spanish);
    }
    setAddedWords(prev => [...prev, word]);
    audioService.playZenChime('hanko');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-piedra/60 pb-5">
        <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
          <span>和西辞典</span>
          <span>•</span>
          <span>Diccionario Japonés — Español</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
          Diccionario y Búsqueda Léxica
        </h1>
        <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1 max-w-xl">
          Busca por kanji, kana, romaji o traducción en español. Agrega cualquier término directamente a tus repasos diarios de memoria.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sumi/40 dark:text-washi/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Escribe en español (ej: agua), romaji (mizu), hiragana (みず) o kanji (水)..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-piedra dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] text-sm text-sumi dark:text-washi focus:outline-none focus:border-torii shadow-sm"
        />
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-sumi/60 dark:text-washi/60 px-1">
        <span>Se encontraron {results.length} entradas</span>
        <span className="font-mono text-[11px]">JLPT N5 - N4</span>
      </div>

      {/* Results Cards List */}
      <div className="space-y-3">
        {results.map(item => {
          const isAdded = addedWords.includes(item.word);

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-piedra/70 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-torii/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl font-bold text-sumi dark:text-washi">
                    {item.word}
                  </span>
                  {item.reading !== item.word && (
                    <span className="text-xs font-mono text-torii dark:text-torii-dark font-medium">
                      【{item.reading}】
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-sumi/50 dark:text-washi/50">
                    [{item.romaji}]
                  </span>
                </div>

                <p className="text-sm font-semibold text-sumi/90 dark:text-washi/90">
                  {item.meaningEs}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-piedra/60 bg-washi/50 dark:bg-[#181B19] text-sumi/60 dark:text-washi/60">
                    {item.partOfSpeech}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-musgo/15 text-musgo dark:text-musgo-light font-mono">
                    {item.jlpt}
                  </span>
                  <span className="text-[10px] text-sumi/50 dark:text-washi/50">
                    • {item.category}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <AudioButton text={item.word} />

                <button
                  onClick={() => handleAddCard(item.word, item.reading, item.meaningEs)}
                  disabled={isAdded}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isAdded
                      ? 'bg-musgo/20 text-musgo border border-musgo/40 cursor-default'
                      : 'border border-piedra/80 hover:border-torii hover:text-torii text-sumi dark:text-washi bg-washi/40 dark:bg-[#181B19]'
                  }`}
                >
                  {isAdded ? <Check size={14} /> : <BookmarkPlus size={14} />}
                  <span>{isAdded ? 'En mi Mazo SRS' : 'Agregar a Repaso'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
