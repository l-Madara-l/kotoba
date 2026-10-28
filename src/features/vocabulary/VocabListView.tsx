import React, { useState } from 'react';
import { Search, Filter, BookOpen, Sparkles, Layers, ArrowUpDown, Volume2, Star } from 'lucide-react';
import { SRSItem, VocabItem } from '../../types';
import { VOCAB_DATA } from '../../data/vocabData';
import { AudioButton } from '../../components/common/AudioButton';
import { SRSService } from '../../services/srsService';

interface VocabListViewProps {
  srsItems: SRSItem[];
  onStartReview: () => void;
  showRomaji: boolean;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
}

export const VocabListView: React.FC<VocabListViewProps> = ({
  srsItems,
  onStartReview,
  showRomaji,
  favorites = [],
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedJLPT, setSelectedJLPT] = useState<string>('all');

  const dueItems = SRSService.getDueItems(srsItems);

  // Categories
  const categories = ['all', ...Array.from(new Set(VOCAB_DATA.map(v => v.category)))];

  const filteredVocab = VOCAB_DATA.filter(item => {
    const matchesSearch = 
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaningEs.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesJLPT = selectedJLPT === 'all' || item.jlpt === selectedJLPT;

    return matchesSearch && matchesCategory && matchesJLPT;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-piedra/60 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
            <span>単語帳・復習</span>
            <span>•</span>
            <span>Entrenador de Vocabulario y SM-2</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
            Vocabulario en Contexto
          </h1>
          <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
            Cada palabra incluye su función oracional, partículas asociadas y audio nativo.
          </p>
        </div>

        {/* Start SRS Review Button */}
        <button
          onClick={onStartReview}
          className="px-6 py-2.5 rounded-xl bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center gap-2 shadow-md transition-transform active:scale-95 shrink-0"
        >
          <Sparkles size={15} />
          <span>Iniciar Repaso SM-2 ({dueItems.length} pendientes)</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sumi/40 dark:text-washi/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por español, kana, kanji o romaji..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-piedra dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] text-xs text-sumi dark:text-washi focus:outline-none focus:border-torii"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-piedra dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] text-xs text-sumi dark:text-washi focus:outline-none focus:border-torii cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Todas las Categorías' : cat}
              </option>
            ))}
          </select>

          <select
            value={selectedJLPT}
            onChange={e => setSelectedJLPT(e.target.value)}
            className="px-3 py-2 rounded-xl border border-piedra dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] text-xs text-sumi dark:text-washi focus:outline-none focus:border-torii cursor-pointer font-mono"
          >
            <option value="all">JLPT (Todos)</option>
            <option value="N5">JLPT N5</option>
            <option value="N4">JLPT N4</option>
          </select>
        </div>
      </div>

      {/* Vocabulary Cards List */}
      <div className="space-y-4">
        {filteredVocab.map(item => {
          // Find matching SRS status if any
          const srs = srsItems.find(s => s.japanese === item.word);

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm space-y-3 transition-all hover:border-torii/60"
            >
              {/* Top Row: Word, Reading, Meaning & Audio */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif text-2xl font-bold text-sumi dark:text-washi">
                      {item.word}
                    </span>
                    {item.reading !== item.word && (
                      <span className="text-xs font-mono text-torii dark:text-torii-dark">
                        {item.reading}
                      </span>
                    )}
                    {showRomaji && (
                      <span className="text-[11px] font-mono text-sumi/50 dark:text-washi/50">
                        [{item.romaji}]
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-sumi/90 dark:text-washi/90 mt-1">
                    {item.meaningEs}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-piedra/60 bg-washi/50 dark:bg-[#181B19] text-sumi/60 dark:text-washi/60">
                    {item.partOfSpeech}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-musgo/15 text-musgo dark:text-musgo-light font-mono">
                    {item.jlpt}
                  </span>
                  <AudioButton text={item.word} />
                  {onToggleFavorite && (
                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      title={favorites.includes(item.id) ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                      className="p-1.5 rounded-lg border border-piedra/60 hover:border-oro hover:bg-oro/10 transition-colors"
                    >
                      <Star
                        size={14}
                        className={favorites.includes(item.id) ? 'fill-oro text-oro' : 'text-sumi/50 dark:text-washi/50'}
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Natural sentence breakdown */}
              <div className="p-3.5 rounded-xl bg-washi/40 dark:bg-[#181B19] border border-piedra/50 text-xs space-y-2">
                <div>
                  <span className="text-[10px] font-semibold text-sumi/50 dark:text-washi/50 uppercase tracking-wider block">
                    Ejemplo en Oración Natural:
                  </span>
                  <div className="font-serif text-sm font-bold text-sumi dark:text-washi mt-0.5">
                    {item.exampleSentence.japanese}
                  </div>
                  <div className="text-[11px] text-torii dark:text-torii-dark font-mono mt-0.5">
                    {item.exampleSentence.kana}
                  </div>
                  <div className="text-xs text-sumi/80 dark:text-washi/80 italic mt-0.5">
                    «{item.exampleSentence.spanish}»
                  </div>
                </div>

                {/* Particle & Grammatical Breakdown */}
                {item.exampleSentence.breakdown && (
                  <div className="pt-2 border-t border-piedra/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {item.exampleSentence.breakdown.map((b, i) => (
                      <div key={i} className="p-2 rounded-lg bg-marfil/80 dark:bg-[#232724] border border-piedra/40 text-[11px]">
                        <span className="font-serif font-bold text-sumi dark:text-washi block">
                          {b.segment}
                        </span>
                        <span className="text-torii dark:text-torii-dark text-[10px] block font-mono">
                          {b.role}
                        </span>
                        <span className="text-sumi/70 dark:text-washi/70 text-[10px] block mt-0.5">
                          {b.explanation}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes / Cultural nuance */}
              {item.notes && (
                <p className="text-[11px] text-sumi/65 dark:text-washi/65 italic pl-1">
                  💡 {item.notes}
                </p>
              )}

              {/* SRS status badge if recorded */}
              {srs && (
                <div className="pt-1 flex items-center justify-between text-[11px] text-sumi/60 dark:text-washi/60">
                  <span>
                    Estado SM-2: {srs.repetitions >= 5 ? 'Dominado' : srs.repetitions >= 2 ? 'Consolidando' : 'Aprendiendo'} ({srs.repetitions} repasos)
                  </span>
                  <span>Intervalo actual: {srs.interval} días</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
