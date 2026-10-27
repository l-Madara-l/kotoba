import React, { useState } from 'react';
import { Volume2, Volume1, Play, Check, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { AudioButton } from '../../components/common/AudioButton';

interface DictationChallenge {
  id: string;
  japanese: string;
  kana: string;
  romaji: string;
  spanish: string;
  difficulty: 'Fácil' | 'Medio' | 'Avanzado';
  explanation: string;
}

const DICTATION_CHALLENGES: DictationChallenge[] = [
  {
    id: 'd1',
    japanese: '水を飲みます。',
    kana: 'みずを のみます。',
    romaji: 'mizu o nomimasu',
    spanish: 'Bebo agua.',
    difficulty: 'Fácil',
    explanation: 'Atención a la partícula を (pronunciada "o") y al verbo 飲みます.'
  },
  {
    id: 'd2',
    japanese: 'おはようございます。',
    kana: 'おはようございます。',
    romaji: 'ohayou gozaimasu',
    spanish: 'Buenos días.',
    difficulty: 'Fácil',
    explanation: 'El sonido largo en "you" se escribe con う (よ + う).'
  },
  {
    id: 'd3',
    japanese: '新幹線で京都へ行きます。',
    kana: 'しんかんせんで きょうとへ いきます。',
    romaji: 'shinkansen de kyouto e ikimasu',
    spanish: 'Voy a Kioto en tren bala.',
    difficulty: 'Medio',
    explanation: 'La partícula de dirección へ se pronuncia "e", y で marca el medio de transporte.'
  },
  {
    id: 'd4',
    japanese: 'すみません、メニューをお願いします。',
    kana: 'すみません、めにゅーを おねがいします。',
    romaji: 'sumimasen menyuu o onegaishimasu',
    spanish: 'Disculpe, la carta por favor.',
    difficulty: 'Medio',
    explanation: 'Fórmula clásica para restaurantes. メニュー está en katakana con vocal larga.'
  }
];

export const ListeningLabView: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<DictationChallenge>(DICTATION_CHALLENGES[0]);
  const [userInput, setUserInput] = useState<string>('');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [showHintKana, setShowHintKana] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const handlePlayAudio = (speed: number = playbackSpeed) => {
    audioService.speak(selectedChallenge.japanese, speed);
  };

  const handleCheckDictation = () => {
    setHasEvaluated(true);
    const cleanUser = userInput.trim().toLowerCase().replace(/[.,!?;:・\s]/g, '');
    const cleanTargetJp = selectedChallenge.japanese.replace(/[.,!?;:・\s]/g, '');
    const cleanTargetKana = selectedChallenge.kana.replace(/[.,!?;:・\s]/g, '');
    const cleanTargetRomaji = selectedChallenge.romaji.toLowerCase().replace(/[.,!?;:・\s]/g, '');

    const isMatch = cleanUser === cleanTargetJp || cleanUser === cleanTargetKana || cleanUser === cleanTargetRomaji;

    if (isMatch) {
      audioService.playZenChime('success');
    } else {
      audioService.playZenChime('bell');
    }
  };

  const handleSelectNew = (item: DictationChallenge) => {
    setSelectedChallenge(item);
    setUserInput('');
    setHasEvaluated(false);
    setShowHintKana(false);
    setShowTranslation(false);
    audioService.speak(item.japanese, 1.0);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-piedra/60 pb-5">
        <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
          <span>リスニング・聞き取りラボ</span>
          <span>•</span>
          <span>Comprensión Auditiva y Dictados</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
          Laboratorio de Audio y Dictado
        </h1>
        <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
          Entrena tu oído para distinguir moras, partículas y entonación sin depender de la vista.
        </p>
      </div>

      {/* Dictation Studio Card */}
      <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 sm:p-8 shadow-sm space-y-6">
        {/* Top Controls: Challenge Selector & Difficulty */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-piedra/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sumi dark:text-washi uppercase tracking-wider">
              Dictados:
            </span>
            <div className="flex gap-1.5">
              {DICTATION_CHALLENGES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectNew(item)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedChallenge.id === item.id
                      ? 'bg-torii text-marfil dark:bg-torii-dark'
                      : 'border border-piedra bg-washi/40 text-sumi dark:text-washi'
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo/10 text-indigo dark:text-washi/80">
            Dificultad: {selectedChallenge.difficulty}
          </span>
        </div>

        {/* Audio Player Station */}
        <div className="py-6 px-4 rounded-xl border border-piedra/60 bg-washi/40 dark:bg-[#181B19] text-center space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-sumi/60 dark:text-washi/60 block">
            1. Escucha con atención la oración
          </span>

          {/* Large audio trigger button */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handlePlayAudio(1.0)}
              className="px-6 py-3 rounded-full bg-indigo text-marfil font-bold text-xs hover:bg-indigo/90 flex items-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <Volume2 size={18} />
              <span>Velocidad Normal (1.0x)</span>
            </button>

            <button
              onClick={() => handlePlayAudio(0.75)}
              className="px-5 py-3 rounded-full border border-indigo/40 bg-marfil dark:bg-[#232724] text-indigo dark:text-washi font-bold text-xs hover:bg-indigo/10 flex items-center gap-2 transition-transform active:scale-95"
            >
              <Volume1 size={18} />
              <span>Lenta (0.75x)</span>
            </button>
          </div>

          {/* Toggles for hints */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowHintKana(!showHintKana)}
              className="text-[11px] font-mono text-sumi/70 dark:text-washi/70 hover:text-torii underline"
            >
              {showHintKana ? 'Ocultar pista en Kana' : 'Ver pista en Kana'}
            </button>
            <span>•</span>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-[11px] font-mono text-sumi/70 dark:text-washi/70 hover:text-torii underline"
            >
              {showTranslation ? 'Ocultar traducción' : 'Ver traducción en español'}
            </button>
          </div>

          {showHintKana && (
            <div className="text-sm font-mono text-torii dark:text-torii-dark font-bold animate-in fade-in">
              {selectedChallenge.kana}
            </div>
          )}

          {showTranslation && (
            <div className="text-xs text-sumi/80 dark:text-washi/80 italic animate-in fade-in">
              «{selectedChallenge.spanish}»
            </div>
          )}
        </div>

        {/* User Input & Evaluation */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-sumi dark:text-washi">
            2. Escribe lo que has escuchado (en japonés o romaji):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={e => {
                setUserInput(e.target.value);
                setHasEvaluated(false);
              }}
              onKeyDown={e => e.key === 'Enter' && handleCheckDictation()}
              placeholder="Ejemplo: みずをのみます o mizu o nomimasu..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-piedra dark:border-piedra-dark bg-washi/40 dark:bg-[#181B19] text-sm text-sumi dark:text-washi focus:outline-none focus:border-torii"
            />
            <button
              onClick={handleCheckDictation}
              disabled={!userInput.trim()}
              className="px-6 py-2.5 rounded-xl bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center gap-1.5 shadow-sm disabled:opacity-40"
            >
              <Check size={14} />
              <span>Evaluar</span>
            </button>
          </div>
        </div>

        {/* Detailed Feedback on Evaluation */}
        {hasEvaluated && (
          <div className="p-4 rounded-xl border border-musgo/40 bg-musgo/5 dark:bg-musgo/10 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-musgo dark:text-musgo-light">
                Respuesta Oficial:
              </span>
              <AudioButton text={selectedChallenge.japanese} size="sm" />
            </div>

            <div className="font-serif text-lg font-bold text-sumi dark:text-washi">
              {selectedChallenge.japanese}
            </div>
            <div className="text-torii dark:text-torii-dark font-mono text-xs">
              {selectedChallenge.kana} [{selectedChallenge.romaji}]
            </div>
            <div className="text-sumi/80 dark:text-washi/80 font-medium">
              «{selectedChallenge.spanish}»
            </div>

            <p className="pt-2 border-t border-piedra/30 text-sumi/70 dark:text-washi/70 text-[11px] leading-relaxed">
              💡 {selectedChallenge.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
