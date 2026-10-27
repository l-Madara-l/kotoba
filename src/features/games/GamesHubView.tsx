import React, { useState, useEffect } from 'react';
import { Gamepad2, Timer, Sparkles, Check, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';
import { HIRAGANA_DATA } from '../../data/kanaData';
import { audioService } from '../../services/audioService';

export const GamesHubView: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'sprint' | 'builder' | 'detective'>('sprint');

  // --- KANA SPRINT GAME STATE ---
  const [sprintScore, setSprintScore] = useState<number>(0);
  const [sprintCombo, setSprintCombo] = useState<number>(0);
  const [sprintTimeLeft, setSprintTimeLeft] = useState<number>(30);
  const [isSprintRunning, setIsSprintRunning] = useState<boolean>(false);
  const [currentSprintKana, setCurrentSprintKana] = useState(HIRAGANA_DATA[0]);
  const [sprintOptions, setSprintOptions] = useState<string[]>([]);

  const setupNextSprintRound = () => {
    const nextChar = HIRAGANA_DATA[Math.floor(Math.random() * HIRAGANA_DATA.length)];
    setCurrentSprintKana(nextChar);

    const wrongOptions = HIRAGANA_DATA
      .filter(k => k.char !== nextChar.char)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(k => k.romaji);

    const all = [nextChar.romaji, ...wrongOptions].sort(() => 0.5 - Math.random());
    setSprintOptions(all);
  };

  const handleStartSprint = () => {
    setSprintScore(0);
    setSprintCombo(0);
    setSprintTimeLeft(30);
    setIsSprintRunning(true);
    setupNextSprintRound();
    audioService.playZenChime('bell');
  };

  useEffect(() => {
    if (!isSprintRunning) return;
    if (sprintTimeLeft <= 0) {
      setIsSprintRunning(false);
      audioService.playZenChime('success');
      return;
    }

    const timer = setInterval(() => {
      setSprintTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSprintRunning, sprintTimeLeft]);

  const handleSprintGuess = (romaji: string) => {
    if (!isSprintRunning) return;

    if (romaji === currentSprintKana.romaji) {
      const addedScore = 10 + sprintCombo * 5;
      setSprintScore(prev => prev + addedScore);
      setSprintCombo(prev => prev + 1);
      audioService.playZenChime('bell');
      setupNextSprintRound();
    } else {
      setSprintCombo(0);
      audioService.playZenChime('tap');
    }
  };

  // --- SENTENCE BUILDER GAME STATE ---
  const builderPuzzles = [
    {
      targetJp: '私は水を飲みます。',
      targetEs: 'Yo bebo agua.',
      pieces: ['飲みます。', '水', '私', 'を', 'は'],
      explanation: 'Orden básico japonés: [Sujeto/Tema: 私は] + [Objeto: 水を] + [Verbo al final: 飲みます。].'
    },
    {
      targetJp: '図書館で本を読みます。',
      targetEs: 'Leo un libro en la biblioteca.',
      pieces: ['読みます。', '本を', 'で', '図書館'],
      explanation: 'Lugar de acción con で [図書館で] + objeto [本を] + verbo [読みます。].'
    },
    {
      targetJp: '明日新幹線で東京へ行きます。',
      targetEs: 'Mañana voy a Tokio en tren bala.',
      pieces: ['東京へ', '新幹線で', '行きます。', '明日'],
      explanation: 'Tiempo [明日] + medio [新幹線で] + destino [東京へ] + verbo de movimiento [行きます。].'
    }
  ];

  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const currentPuzzle = builderPuzzles[puzzleIndex];
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  const [availablePieces, setAvailablePieces] = useState<string[]>(currentPuzzle.pieces);
  const [builderFeedback, setBuilderFeedback] = useState<string | null>(null);

  const handlePickPiece = (piece: string, idx: number) => {
    setPlacedPieces(prev => [...prev, piece]);
    setAvailablePieces(prev => prev.filter((_, i) => i !== idx));
    setBuilderFeedback(null);
  };

  const handleRemovePiece = (piece: string, idx: number) => {
    setAvailablePieces(prev => [...prev, piece]);
    setPlacedPieces(prev => prev.filter((_, i) => i !== idx));
    setBuilderFeedback(null);
  };

  const handleCheckSentence = () => {
    const built = placedPieces.join('');
    if (built === currentPuzzle.targetJp.replace(/\s+/g, '')) {
      audioService.playZenChime('success');
      setBuilderFeedback('¡Correcto! Oración gramaticalmente perfecta.');
    } else {
      audioService.playZenChime('bell');
      setBuilderFeedback('El orden no es el adecuado. Revisa la posición del verbo o las partículas.');
    }
  };

  const handleNextPuzzle = () => {
    const next = (puzzleIndex + 1) % builderPuzzles.length;
    setPuzzleIndex(next);
    setPlacedPieces([]);
    setAvailablePieces(builderPuzzles[next].pieces);
    setBuilderFeedback(null);
  };

  // --- GRAMMAR DETECTIVE GAME STATE ---
  const detectiveChallenges = [
    {
      sentence: '私は寿司を好きです。',
      error: 'を',
      correction: 'が',
      explanation: 'En japonés, "gustar" (好き suki) es un adjetivo y el objeto de gusto siempre se acompaña con が, no con を.',
      correctedSentence: '私は寿司が好きです。'
    },
    {
      sentence: 'カフェに本を読みます。',
      error: 'に',
      correction: 'で',
      explanation: 'Leer es una acción activa que se desarrolla en la cafetería, por lo que el lugar de acción requiere で y no に.',
      correctedSentence: 'カフェで本を読みます。'
    }
  ];

  const [detectiveIndex, setDetectiveIndex] = useState(0);
  const currentDetective = detectiveChallenges[detectiveIndex];
  const [detectiveSolved, setDetectiveSolved] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="border-b border-piedra/60 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
            <span>ゲームと練習</span>
            <span>•</span>
            <span>Refuerzo Lúdico y Retos Activos</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
            Actividades y Minijuegos Educativos
          </h1>
          <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
            Pon a prueba tu agilidad mental, construcción oracional y detección de errores sin cuestionarios aburridos.
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-washi/80 dark:bg-[#1f2320] border border-piedra/60">
          <button
            onClick={() => setActiveGame('sprint')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeGame === 'sprint'
                ? 'bg-torii text-marfil shadow-sm dark:bg-torii-dark'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            ⚡ Kana Sprint
          </button>

          <button
            onClick={() => setActiveGame('builder')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeGame === 'builder'
                ? 'bg-torii text-marfil shadow-sm dark:bg-torii-dark'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            🧩 Construye la Frase
          </button>

          <button
            onClick={() => setActiveGame('detective')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeGame === 'detective'
                ? 'bg-torii text-marfil shadow-sm dark:bg-torii-dark'
                : 'text-sumi/70 dark:text-washi/70 hover:text-sumi'
            }`}
          >
            🔍 Detective Gramatical
          </button>
        </div>
      </div>

      {/* GAME 1: KANA SPRINT */}
      {activeGame === 'sprint' && (
        <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 sm:p-10 shadow-sm text-center max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-piedra/40 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-torii dark:text-torii-dark">
              <Timer size={16} />
              <span>{sprintTimeLeft}s restantes</span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono font-bold">
              <span className="text-musgo">Combo: x{sprintCombo}</span>
              <span className="text-sumi dark:text-washi">Puntuación: {sprintScore} pts</span>
            </div>
          </div>

          {!isSprintRunning ? (
            <div className="py-8 space-y-4">
              <span className="text-5xl block select-none">⚡</span>
              <h2 className="font-serif text-2xl font-bold text-sumi dark:text-washi">
                Kana Sprint (Velocidad Kana)
              </h2>
              <p className="text-xs text-sumi/70 dark:text-washi/70 max-w-sm mx-auto leading-relaxed">
                Identifica la mayor cantidad de caracteres Hiragana en 30 segundos. Cada acierto consecutivo multiplica tu puntuación de combo.
              </p>
              <button
                onClick={handleStartSprint}
                className="px-8 py-3 rounded-xl bg-torii text-marfil font-bold text-xs hover:bg-torii-hover shadow-md transition-transform active:scale-95"
              >
                {sprintScore > 0 ? 'Volver a Jugar' : '¡Iniciar Carrera (30s)!'}
              </button>
            </div>
          ) : (
            <div className="space-y-6 py-4 animate-in fade-in">
              {/* Kana flash symbol */}
              <div className="w-32 h-32 mx-auto rounded-2xl bg-washi dark:bg-[#181B19] border-2 border-torii flex items-center justify-center font-serif text-6xl font-bold text-sumi dark:text-washi shadow-inner">
                {currentSprintKana.char}
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                {sprintOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSprintGuess(opt)}
                    className="py-3.5 rounded-xl border border-piedra/80 dark:border-piedra-dark bg-washi/40 dark:bg-[#232724] font-mono font-bold text-lg text-sumi dark:text-washi hover:border-torii hover:text-torii transition-colors shadow-sm active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: CONSTRUYE LA FRASE */}
      {activeGame === 'builder' && (
        <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-piedra/40 pb-4">
            <span className="text-xs font-serif font-bold text-torii dark:text-torii-dark uppercase tracking-wider">
              Construye la Oración #{puzzleIndex + 1}
            </span>
            <button
              onClick={handleNextPuzzle}
              className="text-xs font-semibold text-sumi/60 dark:text-washi/60 hover:text-torii flex items-center gap-1"
            >
              <span>Siguiente Frase</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono text-sumi/50 dark:text-washi/50 uppercase">
              Objetivo en español:
            </span>
            <h3 className="font-serif text-lg font-bold text-sumi dark:text-washi">
              «{currentPuzzle.targetEs}»
            </h3>
          </div>

          {/* Placement Zone */}
          <div className="min-h-16 p-4 rounded-xl border-2 border-dashed border-piedra dark:border-piedra-dark bg-washi/30 dark:bg-[#181B19] flex flex-wrap items-center justify-center gap-2">
            {placedPieces.length === 0 ? (
              <span className="text-xs text-sumi/40 dark:text-washi/40 italic">
                Haz clic en las fichas de abajo para colocarlas aquí en orden
              </span>
            ) : (
              placedPieces.map((piece, i) => (
                <button
                  key={i}
                  onClick={() => handleRemovePiece(piece, i)}
                  className="px-3.5 py-2 rounded-lg bg-torii text-marfil font-serif font-bold text-sm shadow-sm hover:bg-torii-hover transition-transform active:scale-95"
                >
                  {piece}
                </button>
              ))
            )}
          </div>

          {/* Available Pieces Bank */}
          <div className="space-y-2 text-center">
            <span className="text-[10px] font-mono text-sumi/50 dark:text-washi/50 uppercase block">
              Fichas disponibles:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {availablePieces.map((piece, i) => (
                <button
                  key={i}
                  onClick={() => handlePickPiece(piece, i)}
                  className="px-4 py-2 rounded-lg border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#232724] font-serif font-bold text-sm text-sumi dark:text-washi hover:border-torii shadow-sm transition-transform active:scale-95"
                >
                  {piece}
                </button>
              ))}
            </div>
          </div>

          {/* Action Check */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCheckSentence}
              disabled={placedPieces.length === 0}
              className="px-6 py-2.5 rounded-xl bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center gap-1.5 shadow-sm disabled:opacity-40"
            >
              <Check size={14} />
              <span>Comprobar Orden Gramatical</span>
            </button>
          </div>

          {builderFeedback && (
            <div className="p-4 rounded-xl border border-musgo/40 bg-musgo/10 text-xs text-sumi dark:text-washi space-y-1 animate-in fade-in">
              <span className="font-bold block">{builderFeedback}</span>
              <p className="text-[11px] text-sumi/75 dark:text-washi/75 leading-relaxed">
                {currentPuzzle.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: DETECTIVE GRAMATICAL */}
      {activeGame === 'detective' && (
        <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] p-6 sm:p-8 shadow-sm max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-piedra/40 pb-4">
            <span className="text-xs font-serif font-bold text-torii dark:text-torii-dark uppercase tracking-wider">
              Detective Gramatical #{detectiveIndex + 1}
            </span>
            <button
              onClick={() => {
                setDetectiveIndex((detectiveIndex + 1) % detectiveChallenges.length);
                setDetectiveSolved(false);
              }}
              className="text-xs font-semibold text-sumi/60 dark:text-washi/60 hover:text-torii flex items-center gap-1"
            >
              <span>Siguiente Caso</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <p className="text-xs text-sumi/70 dark:text-washi/70 text-center">
            Esta oración contiene un error típico de hispanohablantes. Encuentra qué partícula o término falla y corrígelo:
          </p>

          {/* Offending sentence */}
          <div className="p-5 rounded-xl border-2 border-torii/30 bg-washi/40 dark:bg-[#181B19] text-center font-serif text-2xl font-bold text-sumi dark:text-washi tracking-wide">
            {currentDetective.sentence}
          </div>

          {!detectiveSolved ? (
            <div className="text-center">
              <button
                onClick={() => {
                  setDetectiveSolved(true);
                  audioService.playZenChime('success');
                }}
                className="px-6 py-2.5 rounded-xl bg-torii text-marfil text-xs font-bold hover:bg-torii-hover shadow-sm"
              >
                Revelar Error y Solución
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-musgo/40 bg-musgo/10 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold">
                <span className="text-torii line-through">Error: {currentDetective.error}</span>
                <span className="text-musgo">➔ Corrección: {currentDetective.correction}</span>
              </div>
              <div className="font-serif text-base font-bold text-musgo dark:text-musgo-light">
                {currentDetective.correctedSentence}
              </div>
              <p className="text-[11px] text-sumi/80 dark:text-washi/80 leading-relaxed border-t border-piedra/30 pt-2">
                {currentDetective.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
