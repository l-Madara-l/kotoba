import React, { useState, useMemo } from 'react';
import { 
  Star, 
  Search, 
  BookOpen, 
  PenTool, 
  ScrollText, 
  Trash2, 
  Plus, 
  Compass, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserProfile, JLPTLevel } from '../../types';
import { VOCAB_DATA } from '../../data/vocabData';
import { KANJI_DATA } from '../../data/kanjiData';
import { GRAMMAR_LESSONS } from '../../data/grammarData';
import { AudioButton } from '../../components/common/AudioButton';
import { ActiveTab } from '../../components/layout/Sidebar';

interface FavoritesViewProps {
  profile: UserProfile;
  onToggleFavorite: (itemId: string) => void;
  onAddWordToSRS?: (word: string, reading: string, spanish: string) => void;
  onNavigate: (tab: ActiveTab) => void;
}

interface FavoriteCardItem {
  id: string;
  type: 'vocab' | 'kanji' | 'grammar' | 'other';
  title: string;
  reading?: string;
  romaji?: string;
  meaning: string;
  category?: string;
  jlpt?: JLPTLevel | string;
  audioText?: string;
  formula?: string;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  profile,
  onToggleFavorite,
  onAddWordToSRS,
  onNavigate
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'vocab' | 'kanji' | 'grammar'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedToSRSMap, setAddedToSRSMap] = useState<Record<string, boolean>>({});

  // Resolve favorite items from data catalogs
  const resolvedFavorites = useMemo<FavoriteCardItem[]>(() => {
    const favorites = profile.favorites || [];
    const items: FavoriteCardItem[] = [];

    favorites.forEach(favId => {
      // 1. Try Vocab
      const vocab = VOCAB_DATA.find(v => v.id === favId || v.word === favId);
      if (vocab) {
        items.push({
          id: favId,
          type: 'vocab',
          title: vocab.word,
          reading: vocab.reading,
          romaji: vocab.romaji,
          meaning: vocab.meaningEs,
          category: vocab.category,
          jlpt: vocab.jlpt,
          audioText: vocab.word
        });
        return;
      }

      // 2. Try Kanji
      const kanji = KANJI_DATA.find(k => k.char === favId || `kanji-${k.char}` === favId);
      if (kanji) {
        items.push({
          id: favId,
          type: 'kanji',
          title: kanji.char,
          reading: kanji.primaryReading,
          meaning: kanji.meaningEs,
          category: `Radical: ${kanji.radical} (${kanji.strokeCount} trazos)`,
          jlpt: kanji.jlpt,
          audioText: kanji.char
        });
        return;
      }

      // 3. Try Grammar
      const grammar = GRAMMAR_LESSONS.find(g => g.id === favId);
      if (grammar) {
        items.push({
          id: favId,
          type: 'grammar',
          title: grammar.structure,
          meaning: grammar.title,
          category: grammar.level,
          jlpt: grammar.level,
          formula: grammar.formula,
          audioText: grammar.examples?.[0]?.japanese
        });
        return;
      }

      // 4. Fallback / Custom item
      items.push({
        id: favId,
        type: 'other',
        title: favId,
        meaning: 'Elemento personalizado de estudio',
        audioText: favId
      });
    });

    return items;
  }, [profile.favorites]);

  // Filter and search
  const filteredItems = useMemo(() => {
    return resolvedFavorites.filter(item => {
      if (selectedFilter !== 'all' && item.type !== selectedFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchReading = item.reading ? item.reading.toLowerCase().includes(q) : false;
        const matchRomaji = item.romaji ? item.romaji.toLowerCase().includes(q) : false;
        return matchTitle || matchMeaning || matchReading || matchRomaji;
      }

      return true;
    });
  }, [resolvedFavorites, selectedFilter, searchQuery]);

  const handleAddToSRS = (item: FavoriteCardItem) => {
    if (!onAddWordToSRS) return;
    onAddWordToSRS(item.title, item.reading || item.title, item.meaning);
    setAddedToSRSMap(prev => ({ ...prev, [item.id]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-piedra/60 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-oro dark:text-oro/90 tracking-widest uppercase">
            <Star size={14} className="fill-oro text-oro" />
            <span>お気に入り • Favoritos & Guardados</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1 tracking-tight">
            Cuaderno de Elementos Destacados
          </h1>
          <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
            Palabras, kanji y estructuras guardadas para repasar a tu propio ritmo con atención consciente.
          </p>
        </div>

        {/* Count Badge */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl border border-oro/40 bg-oro/10 text-xs font-semibold text-oro flex items-center gap-2">
            <Star size={14} className="fill-oro" />
            <span>{profile.favorites?.length || 0} guardados</span>
          </div>
        </div>
      </div>

      {/* Controls: Search & Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-washi/80 dark:bg-[#1f2320] border border-piedra/60 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedFilter === 'all'
                ? 'bg-torii text-marfil shadow-sm'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            Todos ({resolvedFavorites.length})
          </button>
          <button
            onClick={() => setSelectedFilter('vocab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedFilter === 'vocab'
                ? 'bg-torii text-marfil shadow-sm'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            Vocabulario ({resolvedFavorites.filter(i => i.type === 'vocab').length})
          </button>
          <button
            onClick={() => setSelectedFilter('kanji')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedFilter === 'kanji'
                ? 'bg-torii text-marfil shadow-sm'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            Kanji ({resolvedFavorites.filter(i => i.type === 'kanji').length})
          </button>
          <button
            onClick={() => setSelectedFilter('grammar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedFilter === 'grammar'
                ? 'bg-torii text-marfil shadow-sm'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            Gramática ({resolvedFavorites.filter(i => i.type === 'grammar').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-sumi/40 dark:text-washi/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar en favoritos..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#181B19] text-xs text-sumi dark:text-washi focus:outline-none focus:border-torii"
          />
        </div>
      </div>

      {/* Main Content Area: Empty State vs Cards Grid */}
      {resolvedFavorites.length === 0 ? (
        <div className="p-10 sm:p-14 rounded-2xl border border-dashed border-piedra/80 dark:border-piedra-dark bg-marfil/60 dark:bg-[#181B19]/60 text-center max-w-2xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-oro/15 border border-oro/30 text-oro flex items-center justify-center mx-auto shadow-sm">
            <Star size={32} className="fill-oro text-oro" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-sumi dark:text-washi">
              Aún no tienes elementos en favoritos
            </h3>
            <p className="text-xs text-sumi/70 dark:text-washi/70 leading-relaxed max-w-md mx-auto">
              Guarda cualquier palabra, kanji o lección haciendo clic en el icono de estrella (⭐) 
              en cualquier sección de KOTOBA. Aparecerán aquí como tu cuaderno de notas personal.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('vocabulary')}
              className="px-4 py-2.5 rounded-xl bg-torii text-marfil text-xs font-semibold hover:bg-torii-hover flex items-center gap-2 shadow-sm transition-transform active:scale-95"
            >
              <BookOpen size={14} />
              <span>Explorar Vocabulario</span>
            </button>
            <button
              onClick={() => onNavigate('writing-lab')}
              className="px-4 py-2.5 rounded-xl border border-piedra/80 dark:border-piedra-dark text-xs font-medium text-sumi dark:text-washi hover:border-torii transition-colors flex items-center gap-2"
            >
              <PenTool size={14} />
              <span>Aprender Kanji & Kana</span>
            </button>
            <button
              onClick={() => onNavigate('learning-path')}
              className="px-4 py-2.5 rounded-xl border border-piedra/80 dark:border-piedra-dark text-xs font-medium text-sumi dark:text-washi hover:border-torii transition-colors flex items-center gap-2"
            >
              <Compass size={14} />
              <span>Ruta de Aprendizaje</span>
            </button>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-piedra/60 bg-marfil dark:bg-[#181B19]">
          <p className="text-xs text-sumi/60 dark:text-washi/60">
            No se encontraron elementos que coincidan con "{searchQuery}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => {
            const isAddedToSRS = addedToSRSMap[item.id];

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-piedra/70 dark:border-piedra-dark bg-marfil dark:bg-[#181B19] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Type & Actions */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.type === 'vocab'
                          ? 'bg-torii/10 text-torii dark:text-torii-dark'
                          : item.type === 'kanji'
                          ? 'bg-musgo/10 text-musgo dark:text-musgo-light'
                          : 'bg-oro/15 text-oro'
                      }`}>
                        {item.type === 'vocab' ? 'Vocabulario' : item.type === 'kanji' ? 'Kanji' : 'Gramática'}
                      </span>
                      {item.jlpt && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-piedra/20 text-sumi/70 dark:text-washi/70">
                          {item.jlpt}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {item.audioText && (
                        <AudioButton text={item.audioText} size="sm" />
                      )}
                      <button
                        onClick={() => onToggleFavorite(item.id)}
                        title="Quitar de favoritos"
                        className="p-1.5 rounded-lg text-oro hover:text-torii hover:bg-torii/10 transition-colors"
                      >
                        <Star size={16} className="fill-oro" />
                      </button>
                    </div>
                  </div>

                  {/* Japanese Word / Title */}
                  <div className="my-2">
                    <h3 className="font-serif text-2xl font-bold text-sumi dark:text-washi tracking-tight">
                      {item.title}
                    </h3>
                    {item.reading && (
                      <p className="text-xs font-mono text-sumi/60 dark:text-washi/60 mt-0.5">
                        {item.reading} {item.romaji ? `• ${item.romaji}` : ''}
                      </p>
                    )}
                  </div>

                  {/* Meaning & Details */}
                  <p className="text-xs text-sumi/85 dark:text-washi/85 font-medium leading-relaxed mt-2">
                    {item.meaning}
                  </p>

                  {item.formula && (
                    <div className="mt-2 p-2 rounded-lg bg-washi/60 dark:bg-[#202422] text-[11px] font-mono text-sumi/80 dark:text-washi/80">
                      {item.formula}
                    </div>
                  )}

                  {item.category && (
                    <p className="text-[10px] text-sumi/50 dark:text-washi/50 mt-2">
                      {item.category}
                    </p>
                  )}
                </div>

                {/* Bottom CTA: Add to SRS Repetition */}
                {onAddWordToSRS && item.type !== 'grammar' && (
                  <div className="mt-4 pt-3 border-t border-piedra/40 flex items-center justify-end">
                    <button
                      onClick={() => handleAddToSRS(item)}
                      disabled={isAddedToSRS}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                        isAddedToSRS
                          ? 'bg-musgo/10 text-musgo dark:text-musgo-light cursor-default'
                          : 'bg-washi dark:bg-[#232724] border border-piedra/60 text-sumi dark:text-washi hover:border-torii hover:text-torii'
                      }`}
                    >
                      {isAddedToSRS ? (
                        <>
                          <Check size={13} />
                          <span>En Mazo SRS</span>
                        </>
                      ) : (
                        <>
                          <Plus size={13} />
                          <span>Añadir a Repasos</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
