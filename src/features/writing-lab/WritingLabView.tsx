import React, { useState } from 'react';
import { HIRAGANA_DATA, KATAKANA_DATA } from '../../data/kanaData';
import { KANJI_DATA } from '../../data/kanjiData';
import { KanaCharacter, KanjiItem } from '../../types';
import { KanjiCanvas } from '../../components/common/KanjiCanvas';
import { AudioButton } from '../../components/common/AudioButton';
import { audioService } from '../../services/audioService';
import { Sparkles, Check, HelpCircle, AlertTriangle } from 'lucide-react';

export const WritingLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana' | 'kanji'>('hiragana');
  const [selectedKana, setSelectedKana] = useState<KanaCharacter>(HIRAGANA_DATA[0]);
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem>(KANJI_DATA[0]);
  const [practiceMode, setPracticeMode] = useState<'trace' | 'recognition'>('trace');
  const [recognitionOptions, setRecognitionOptions] = useState<string[]>([]);
  const [recognitionFeedback, setRecognitionFeedback] = useState<string | null>(null);

  const kanaList = activeTab === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA;

  // Generate 4 multiple-choice options for recognition drill
  const startRecognitionGame = (char: KanaCharacter) => {
    const wrongOptions = kanaList
      .filter(k => k.char !== char.char)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(k => k.romaji);
    
    const all = [char.romaji, ...wrongOptions].sort(() => 0.5 - Math.random());
    setRecognitionOptions(all);
    setRecognitionFeedback(null);
  };

  const handleSelectChar = (k: KanaCharacter) => {
    setSelectedKana(k);
    audioService.speak(k.char, 1.0);
    startRecognitionGame(k);
  };

  const handleSelectKanji = (kj: KanjiItem) => {
    setSelectedKanji(kj);
    audioService.speak(kj.char, 1.0);
  };

  const handleGuessRomaji = (guess: string) => {
    if (guess === selectedKana.romaji) {
      audioService.playZenChime('success');
      setRecognitionFeedback('¡Correcto! Lectura y pronunciación reconocidas.');
    } else {
      audioService.playZenChime('bell');
      setRecognitionFeedback(`Incorrecto. La lectura correcta es "${selectedKana.romaji}".`);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Editorial Header */}
      <div className="border-b border-piedra/60 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
            <span>書道・文字ラボ</span>
            <span>•</span>
            <span>Trazos, Memoria y Caligrafía</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
            Laboratorio de Escritura Japonesa
          </h1>
          <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
            Domina los silabarios Hiragana y Katakana y los Kanji esenciales con orden de trazo y lienzo interactivo.
          </p>
        </div>

        {/* Tab switch: Hiragana / Katakana / Kanji */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-washi/80 dark:bg-[#1f2320] border border-piedra/60">
          <button
            onClick={() => {
              setActiveTab('hiragana');
              setSelectedKana(HIRAGANA_DATA[0]);
              startRecognitionGame(HIRAGANA_DATA[0]);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-serif font-bold transition-colors ${
              activeTab === 'hiragana'
                ? 'bg-torii text-marfil shadow-sm dark:bg-torii-dark'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            Hiragana (ひらがな)
          </button>

          <button
            onClick={() => {
              setActiveTab('katakana');
              setSelectedKana(KATAKANA_DATA[0]);
              startRecognitionGame(KATAKANA_DATA[0]);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-serif font-bold transition-colors ${
              activeTab === 'katakana'
                ? 'bg-torii text-marfil shadow-sm dark:bg-torii-dark'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            Katakana (カタカナ)
          </button>

          <button
            onClick={() => setActiveTab('kanji')}
            className={`px-4 py-1.5 rounded-lg text-xs font-serif font-bold transition-colors ${
              activeTab === 'kanji'
                ? 'bg-torii text-marfil shadow-sm dark:bg-torii-dark'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            Kanji N5 (漢字)
          </button>
        </div>
      </div>

      {/* Main Studio View */}
      {activeTab !== 'kanji' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Characters Grid Selector (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider">
                  Cuadrícula de Caracteres ({kanaList.length})
                </h3>
                <span className="text-[11px] text-sumi/50 dark:text-washi/50">
                  Selecciona uno para practicar
                </span>
              </div>

              {/* Grid of Kana tiles */}
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-[460px] overflow-y-auto pr-1">
                {kanaList.map(k => {
                  const isSelected = selectedKana.char === k.char;
                  return (
                    <button
                      key={k.char}
                      onClick={() => handleSelectChar(k)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'border-torii bg-torii/10 ring-2 ring-torii dark:border-torii-dark'
                          : 'border-piedra/60 bg-washi/30 dark:bg-[#181B19] hover:border-torii/60'
                      }`}
                    >
                      <span className="font-serif text-2xl font-bold text-sumi dark:text-washi">
                        {k.char}
                      </span>
                      <span className="text-[10px] font-mono text-sumi/60 dark:text-washi/60 mt-0.5 uppercase">
                        {k.romaji}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mnemonic and Examples Box */}
            <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-oro uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>Nemotecnia para hispanohablantes</span>
                </span>
                <AudioButton text={selectedKana.char} />
              </div>

              <p className="text-xs text-sumi/85 dark:text-washi/85 leading-relaxed bg-washi/50 dark:bg-[#181B19] p-3 rounded-xl border border-piedra/40">
                {selectedKana.mnemonicEs}
              </p>

              {/* Similar Confusions Warning (e.g. さ vs き, シ vs ツ) */}
              {selectedKana.similarConfusions && (
                <div className="p-3 rounded-xl border border-torii/30 bg-torii/5 text-xs flex items-start gap-2.5">
                  <AlertTriangle size={15} className="text-torii shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-torii block">
                      ¡Atención! No confundir con:
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedKana.similarConfusions.map(c => (
                        <span key={c} className="font-serif text-lg font-bold px-2 py-0.5 rounded bg-marfil dark:bg-[#181B19] border border-torii/20">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Words that contain this character */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-sumi/60 dark:text-washi/60 block mb-2">
                  Palabras de ejemplo con {selectedKana.char}:
                </span>
                <div className="space-y-1.5">
                  {selectedKana.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-washi/30 dark:bg-[#181B19] border border-piedra/40 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sumi dark:text-washi text-sm">
                          {ex.word}
                        </span>
                        <span className="text-[10px] text-sumi/60 dark:text-washi/60 font-mono">
                          [{ex.romaji}]
                        </span>
                        <span className="text-sumi/80 dark:text-washi/80">
                          — {ex.spanish}
                        </span>
                      </div>
                      <AudioButton text={ex.word} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Canvas Stroke Studio (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 shadow-sm text-center">
              {/* Practice Mode Toggle (Trazos vs Reconocimiento) */}
              <div className="flex justify-center gap-2 mb-4">
                <button
                  onClick={() => setPracticeMode('trace')}
                  className={`px-4 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                    practiceMode === 'trace'
                      ? 'bg-torii text-marfil border-torii dark:bg-torii-dark'
                      : 'border-piedra text-sumi/70 dark:text-washi/70 hover:border-torii'
                  }`}
                >
                  Práctica de Trazos con Pincel
                </button>
                <button
                  onClick={() => {
                    setPracticeMode('recognition');
                    if (recognitionOptions.length === 0) startRecognitionGame(selectedKana);
                  }}
                  className={`px-4 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                    practiceMode === 'recognition'
                      ? 'bg-torii text-marfil border-torii dark:bg-torii-dark'
                      : 'border-piedra text-sumi/70 dark:text-washi/70 hover:border-torii'
                  }`}
                >
                  Test de Reconocimiento
                </button>
              </div>

              {practiceMode === 'trace' ? (
                <KanjiCanvas
                  referenceChar={selectedKana.char}
                  strokeSteps={selectedKana.strokeSteps}
                  strokeCount={selectedKana.strokeCount}
                />
              ) : (
                /* Recognition Drill */
                <div className="py-6 space-y-4 max-w-sm mx-auto">
                  <div className="w-28 h-28 mx-auto rounded-2xl border-2 border-torii/40 bg-washi/40 dark:bg-[#181B19] flex items-center justify-center font-serif text-5xl font-bold text-sumi dark:text-washi shadow-inner">
                    {selectedKana.char}
                  </div>

                  <p className="text-xs font-medium text-sumi/75 dark:text-washi/75">
                    ¿Cuál es la lectura correcta en romaji para este carácter?
                  </p>

                  <div className="grid grid-cols-2 gap-2.5">
                    {recognitionOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleGuessRomaji(opt)}
                        className="py-3 px-4 rounded-xl border border-piedra/80 dark:border-piedra-dark bg-washi/50 dark:bg-[#181B19] text-sm font-mono font-bold text-sumi dark:text-washi hover:border-torii hover:text-torii transition-colors shadow-sm"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {recognitionFeedback && (
                    <div className="p-3 rounded-xl border border-musgo/40 bg-musgo/10 text-xs font-semibold text-sumi dark:text-washi">
                      {recognitionFeedback}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* KANJI STUDIO VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Kanji Selector & Metadata (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-4 sm:p-5 shadow-sm">
              <h3 className="text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider mb-3">
                Kanji Esenciales JLPT N5 ({KANJI_DATA.length})
              </h3>
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {KANJI_DATA.map(kj => {
                  const isSelected = selectedKanji.char === kj.char;
                  return (
                    <button
                      key={kj.char}
                      onClick={() => handleSelectKanji(kj)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'border-torii bg-torii/10 ring-2 ring-torii dark:border-torii-dark'
                          : 'border-piedra/60 bg-washi/30 dark:bg-[#181B19] hover:border-torii/60'
                      }`}
                    >
                      <span className="font-serif text-2xl font-bold text-sumi dark:text-washi">
                        {kj.char}
                      </span>
                      <span className="text-[10px] text-sumi/60 dark:text-washi/60 truncate max-w-full">
                        {kj.meaningEs.split(',')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kanji Card Details */}
            <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 shadow-sm space-y-4">
              <div className="flex items-start justify-between border-b border-piedra/40 pb-4">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-4xl font-black text-sumi dark:text-washi">
                      {selectedKanji.char}
                    </span>
                    <div>
                      <span className="text-sm font-bold text-torii dark:text-torii-dark block">
                        {selectedKanji.meaningEs}
                      </span>
                      <span className="text-[11px] text-sumi/60 dark:text-washi/60">
                        {selectedKanji.strokeCount} trazos • Radical: {selectedKanji.radical} ({selectedKanji.radicalMeaning})
                      </span>
                    </div>
                  </div>
                </div>

                <AudioButton text={selectedKanji.char} />
              </div>

              {/* Readings: Onyomi (Chino) & Kunyomi (Japonés) */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-washi/40 dark:bg-[#181B19] border border-piedra/50">
                  <span className="text-[10px] font-bold text-indigo dark:text-indigo/80 uppercase block mb-1">
                    Lectura On'yomi (Katakana)
                  </span>
                  <div className="font-mono font-bold text-sumi dark:text-washi">
                    {selectedKanji.onyomi.join(', ')}
                  </div>
                  <span className="text-[10px] text-sumi/50 dark:text-washi/50 block mt-1">
                    Usado en palabras compuestas (Jukugo)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-washi/40 dark:bg-[#181B19] border border-piedra/50">
                  <span className="text-[10px] font-bold text-musgo dark:text-musgo-light uppercase block mb-1">
                    Lectura Kun'yomi (Hiragana)
                  </span>
                  <div className="font-mono font-bold text-sumi dark:text-washi">
                    {selectedKanji.kunyomi.join(', ')}
                  </div>
                  <span className="text-[10px] text-sumi/50 dark:text-washi/50 block mt-1">
                    Palabra nativa independiente
                  </span>
                </div>
              </div>

              {/* Mnemonic story */}
              <div className="p-3.5 rounded-xl bg-oro/10 border border-oro/30 text-xs text-sumi/85 dark:text-washi/85 leading-relaxed">
                <span className="font-bold text-oro block mb-1">Historia mnemotécnica visual:</span>
                {selectedKanji.mnemonicEs}
              </div>

              {/* Vocabulary with this Kanji */}
              <div>
                <span className="text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider block mb-2">
                  Palabras reales en contexto:
                </span>
                <div className="space-y-1.5">
                  {selectedKanji.vocabulary.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-washi/30 dark:bg-[#181B19] border border-piedra/40 text-xs"
                    >
                      <div>
                        <span className="font-serif font-bold text-sumi dark:text-washi text-sm mr-2">
                          {v.word}
                        </span>
                        <span className="text-torii dark:text-torii-dark text-[11px] font-mono mr-2">
                          ({v.reading})
                        </span>
                        <span className="text-sumi/75 dark:text-washi/75">
                          — {v.spanish}
                        </span>
                      </div>
                      <AudioButton text={v.word} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Example sentence */}
              <div className="p-3.5 rounded-xl bg-washi/60 dark:bg-[#181B19] border border-piedra/60 text-xs">
                <span className="text-[10px] font-mono text-sumi/50 dark:text-washi/50 uppercase block mb-1">
                  Oración de ejemplo:
                </span>
                <div className="font-serif text-sm font-bold text-sumi dark:text-washi">
                  {selectedKanji.exampleSentence.japanese}
                </div>
                <div className="text-[11px] text-torii dark:text-torii-dark font-mono mt-0.5">
                  {selectedKanji.exampleSentence.kana}
                </div>
                <div className="text-xs text-sumi/75 dark:text-washi/75 mt-1 italic">
                  «{selectedKanji.exampleSentence.spanish}»
                </div>
              </div>
            </div>
          </div>

          {/* Right: Kanji Canvas Studio (6 cols) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 shadow-sm text-center">
              <h3 className="font-serif text-sm font-bold text-sumi dark:text-washi mb-4">
                Práctica Caligráfica del Kanji 「{selectedKanji.char}」
              </h3>
              <KanjiCanvas
                referenceChar={selectedKanji.char}
                strokeSteps={selectedKanji.strokeSteps}
                strokeCount={selectedKanji.strokeCount}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
