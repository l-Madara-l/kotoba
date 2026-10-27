import React, { useState } from 'react';
import { CULTURE_ARTICLES } from '../../data/cultureData';
import { CultureArticle } from '../../types';
import { AudioButton } from '../../components/common/AudioButton';
import { Compass, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

export const CultureView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<CultureArticle>(CULTURE_ARTICLES[0]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Editorial Header */}
      <div className="border-b border-piedra/60 pb-5">
        <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
          <span>日本文化と礼儀</span>
          <span>•</span>
          <span>Etiqueta, Costumbres y Sociedad</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
          Cultura Japonesa y Etiqueta Real
        </h1>
        <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1 max-w-2xl">
          El idioma japonés y su cultura son inseparables. Aprende las normas sociales auténticas para viajar y convivir sin tabúes ni estereotipos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Article Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider block mb-2">
            Artículos Esenciales ({CULTURE_ARTICLES.length})
          </span>

          {CULTURE_ARTICLES.map(art => {
            const isSelected = selectedArticle.id === art.id;
            return (
              <button
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-torii bg-torii/5 ring-1 ring-torii dark:border-torii-dark'
                    : 'border-piedra/70 bg-marfil dark:bg-[#1f2320] hover:border-torii/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold text-torii dark:text-torii-dark uppercase">
                    {art.category}
                  </span>
                  <span className="font-serif text-sumi/50 dark:text-washi/50">{art.japaneseTitle}</span>
                </div>
                <h3 className="text-xs font-bold text-sumi dark:text-washi line-clamp-1">
                  {art.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Right: Article Reader (8 cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-[11px] font-serif font-bold text-torii dark:text-torii-dark block">
                {selectedArticle.japaneseTitle}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-sumi dark:text-washi mt-1">
                {selectedArticle.title}
              </h2>
              <p className="text-xs text-sumi/65 dark:text-washi/65 italic mt-1">
                {selectedArticle.summary}
              </p>
            </div>

            {/* Content paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-sm text-sumi/85 dark:text-washi/85 leading-relaxed border-t border-piedra/40 pt-4">
              {selectedArticle.content.map((p, i) => (
                <p 
                  key={i} 
                  dangerouslySetInnerHTML={{
                    __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
              ))}
            </div>

            {/* Pro Tip Box */}
            <div className="p-4 rounded-xl border border-oro/40 bg-oro/10 text-xs text-sumi/85 dark:text-washi/85 space-y-1">
              <span className="font-bold text-oro block uppercase tracking-wider">
                Consejo del profesor nativo:
              </span>
              <p className="leading-relaxed">
                {selectedArticle.proTip}
              </p>
            </div>

            {/* Key Vocabulary Associated */}
            <div className="pt-2 border-t border-piedra/40">
              <h4 className="text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider mb-3">
                Vocabulario Cultural Asociado:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedArticle.keyVocabulary.map((v, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-piedra/50 bg-washi/40 dark:bg-[#181B19] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sumi dark:text-washi">
                          {v.word}
                        </span>
                        <span className="text-torii dark:text-torii-dark text-[10px] font-mono">
                          [{v.reading}]
                        </span>
                      </div>
                      <span className="text-[11px] text-sumi/70 dark:text-washi/70 block mt-0.5">
                        {v.spanish}
                      </span>
                    </div>

                    <AudioButton text={v.word} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
