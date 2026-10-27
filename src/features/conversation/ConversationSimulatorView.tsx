import React, { useState } from 'react';
import { CONVERSATION_SCENARIOS } from '../../data/conversationScenarios';
import { ConversationScenario, DialogueTurn } from '../../types';
import { AudioButton } from '../../components/common/AudioButton';
import { audioService } from '../../services/audioService';
import { 
  MessageSquare, 
  Sparkles, 
  RotateCcw, 
  Compass, 
  Send, 
  Check, 
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const ConversationSimulatorView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario>(CONVERSATION_SCENARIOS[0]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [conversationHistory, setConversationHistory] = useState<{
    sender: 'npc' | 'user';
    speakerName: string;
    avatar: string;
    japanese: string;
    kana: string;
    spanish: string;
    feedback?: string;
  }[]>([
    {
      sender: 'npc',
      speakerName: CONVERSATION_SCENARIOS[0].characterName,
      avatar: CONVERSATION_SCENARIOS[0].characterAvatar,
      japanese: CONVERSATION_SCENARIOS[0].dialogueTurns[0].japanese,
      kana: CONVERSATION_SCENARIOS[0].dialogueTurns[0].kana,
      spanish: CONVERSATION_SCENARIOS[0].dialogueTurns[0].spanish
    }
  ]);
  const [isImmersiveMode, setIsImmersiveMode] = useState<boolean>(false);
  const [freeInput, setFreeInput] = useState<string>('');
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentTurn = selectedScenario.dialogueTurns[currentTurnIndex];

  const handleSelectScenario = (sc: ConversationScenario) => {
    setSelectedScenario(sc);
    setCurrentTurnIndex(0);
    setIsFinished(false);
    setFreeInput('');
    setConversationHistory([
      {
        sender: 'npc',
        speakerName: sc.characterName,
        avatar: sc.characterAvatar,
        japanese: sc.dialogueTurns[0].japanese,
        kana: sc.dialogueTurns[0].kana,
        spanish: sc.dialogueTurns[0].spanish
      }
    ]);
    audioService.speak(sc.dialogueTurns[0].japanese, 1.0);
  };

  const handleChooseResponse = (resp: NonNullable<DialogueTurn['possibleResponses']>[0]) => {
    audioService.speak(resp.textJp, 1.0);
    audioService.playZenChime('bell');

    // Add user response to history
    const updatedHistory = [
      ...conversationHistory,
      {
        sender: 'user' as const,
        speakerName: 'Tú',
        avatar: '👤',
        japanese: resp.textJp,
        kana: resp.kana,
        spanish: resp.spanish,
        feedback: resp.feedback
      }
    ];

    const nextIndex = currentTurnIndex + 1;
    if (nextIndex < selectedScenario.dialogueTurns.length) {
      const nextTurn = selectedScenario.dialogueTurns[nextIndex];
      updatedHistory.push({
        sender: 'npc' as const,
        speakerName: selectedScenario.characterName,
        avatar: selectedScenario.characterAvatar,
        japanese: nextTurn.japanese,
        kana: nextTurn.kana,
        spanish: nextTurn.spanish
      });

      setConversationHistory(updatedHistory);
      setCurrentTurnIndex(nextIndex);
      setTimeout(() => {
        audioService.speak(nextTurn.japanese, 1.0);
      }, 500);
    } else {
      setConversationHistory(updatedHistory);
      setIsFinished(true);
      audioService.playZenChime('success');
    }
  };

  const handleSendFreeText = () => {
    if (!freeInput.trim() || !currentTurn.possibleResponses) return;

    // Check if matches any valid response closely
    const match = currentTurn.possibleResponses.find(r => 
      r.textJp.includes(freeInput.trim()) || freeInput.includes(r.romaji) || freeInput.includes(r.kana)
    ) || currentTurn.possibleResponses[0];

    handleChooseResponse(match);
    setFreeInput('');
  };

  const handleRestart = () => {
    handleSelectScenario(selectedScenario);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Editorial Header */}
      <div className="border-b border-piedra/60 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-torii dark:text-torii-dark tracking-widest uppercase">
            <span>会話シミュレーター</span>
            <span>•</span>
            <span>Práctica Situacional Inmersiva</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sumi dark:text-washi mt-1">
            Simulador de Conversación en Japón
          </h1>
          <p className="text-xs text-sumi/70 dark:text-washi/70 mt-1">
            Interactúa con personajes nativos en restaurantes, tiendas y la calle con retroalimentación de cortesía.
          </p>
        </div>

        {/* Guided vs Immersive Mode Toggle */}
        <button
          onClick={() => setIsImmersiveMode(!isImmersiveMode)}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 ${
            isImmersiveMode
              ? 'bg-torii text-marfil border-torii dark:bg-torii-dark'
              : 'border-piedra/80 bg-marfil dark:bg-[#1f2320] text-sumi dark:text-washi hover:border-torii'
          }`}
        >
          {isImmersiveMode ? <EyeOff size={15} /> : <Eye size={15} />}
          <span>{isImmersiveMode ? 'Modo Inmersivo (Solo JP)' : 'Modo Guiado (Con Ayuda)'}</span>
        </button>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CONVERSATION_SCENARIOS.map(sc => (
          <button
            key={sc.id}
            onClick={() => handleSelectScenario(sc)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedScenario.id === sc.id
                ? 'border-torii bg-torii/5 ring-1 ring-torii dark:border-torii-dark'
                : 'border-piedra/70 bg-marfil dark:bg-[#1f2320] hover:border-torii/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl select-none">{sc.characterAvatar}</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-washi border border-piedra/60 text-sumi/70 dark:text-washi/70 dark:bg-[#181B19]">
                {sc.difficulty}
              </span>
            </div>
            <h3 className="text-xs font-bold text-sumi dark:text-washi line-clamp-1">
              {sc.title}
            </h3>
            <span className="text-[11px] font-serif text-torii dark:text-torii-dark block mt-0.5">
              {sc.titleJp}
            </span>
          </button>
        ))}
      </div>

      {/* Chat Room Stage */}
      <div className="rounded-2xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#1f2320] shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Scenario Banner */}
        <div className="p-4 border-b border-piedra/50 bg-washi/40 dark:bg-[#181B19] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedScenario.characterAvatar}</span>
            <div>
              <span className="text-xs font-bold text-sumi dark:text-washi block">
                {selectedScenario.characterName} ({selectedScenario.characterRole})
              </span>
              <span className="text-[10px] text-sumi/60 dark:text-washi/60">
                📍 {selectedScenario.location}
              </span>
            </div>
          </div>

          <button
            onClick={handleRestart}
            title="Reiniciar diálogo"
            className="p-2 rounded-lg text-xs border border-piedra/60 text-sumi/70 dark:text-washi/70 hover:border-torii hover:text-torii"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {conversationHistory.map((msg, i) => {
            const isNpc = msg.sender === 'npc';
            return (
              <div
                key={i}
                className={`flex gap-3 max-w-[85%] ${
                  isNpc ? 'self-start' : 'self-end ml-auto flex-row-reverse'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-washi dark:bg-[#282d2a] border border-piedra/60 flex items-center justify-center text-sm shrink-0">
                  {msg.avatar}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                    isNpc
                      ? 'bg-washi/60 dark:bg-[#181B19] border border-piedra/60 text-sumi dark:text-washi'
                      : 'bg-torii text-marfil dark:bg-torii-dark shadow-sm'
                  }`}
                >
                  <div className="font-serif text-sm font-bold flex items-center justify-between gap-3">
                    <span>{msg.japanese}</span>
                    <AudioButton text={msg.japanese} size="sm" />
                  </div>

                  {!isImmersiveMode && (
                    <>
                      <div className={`text-[10px] font-mono opacity-80 ${isNpc ? 'text-torii dark:text-torii-dark' : 'text-marfil'}`}>
                        {msg.kana}
                      </div>
                      <div className="text-[11px] opacity-90 italic">
                        «{msg.spanish}»
                      </div>
                    </>
                  )}

                  {msg.feedback && (
                    <div className="mt-2 pt-2 border-t border-marfil/20 text-[10px] opacity-95">
                      💡 {msg.feedback}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Cultural Note Alert if present in current turn */}
          {currentTurn?.culturalNote && !isFinished && (
            <div className="p-3 rounded-xl border border-oro/40 bg-oro/10 text-xs text-sumi/85 dark:text-washi/85 flex items-start gap-2.5">
              <Compass size={16} className="text-oro shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-oro block mb-0.5">Etiqueta cultural:</span>
                <p className="leading-snug">{currentTurn.culturalNote}</p>
              </div>
            </div>
          )}
        </div>

        {/* Input / Response Selection Footer */}
        <div className="p-4 border-t border-piedra/60 bg-washi/30 dark:bg-[#181B19]">
          {!isFinished ? (
            <div className="space-y-3">
              {/* Guided Response Options */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-sumi/60 dark:text-washi/60 uppercase tracking-wider block">
                  Elige tu respuesta:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentTurn?.possibleResponses?.map((resp, i) => (
                    <button
                      key={i}
                      onClick={() => handleChooseResponse(resp)}
                      className="p-3 rounded-xl border border-piedra/80 dark:border-piedra-dark bg-marfil dark:bg-[#232724] text-left hover:border-torii transition-all flex flex-col gap-0.5 shadow-sm active:scale-[0.99]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs text-sumi dark:text-washi">
                          {resp.textJp}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-washi dark:bg-[#181B19] text-sumi/60 dark:text-washi/60">
                          {resp.formality}
                        </span>
                      </div>
                      {!isImmersiveMode && (
                        <span className="text-[10px] text-sumi/70 dark:text-washi/70">
                          {resp.spanish}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Text Option */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={freeInput}
                  onChange={e => setFreeInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendFreeText()}
                  placeholder="O escribe tu propia respuesta en japonés / romaji..."
                  className="flex-1 px-3 py-2 rounded-lg border border-piedra dark:border-piedra-dark bg-marfil dark:bg-[#232724] text-xs text-sumi dark:text-washi focus:outline-none focus:border-torii"
                />
                <button
                  onClick={handleSendFreeText}
                  disabled={!freeInput.trim()}
                  className="px-4 py-2 rounded-lg bg-torii text-marfil text-xs font-bold hover:bg-torii-hover flex items-center gap-1.5 shadow-sm disabled:opacity-40"
                >
                  <Send size={13} />
                  <span>Enviar</span>
                </button>
              </div>
            </div>
          ) : (
            /* Finished dialogue banner */
            <div className="p-3 rounded-xl bg-musgo/15 border border-musgo/40 text-center flex items-center justify-between">
              <span className="text-xs font-bold text-musgo dark:text-musgo-light">
                🎉 ¡Conversación completada con éxito! Has usado japonés natural y respetuoso.
              </span>
              <button
                onClick={handleRestart}
                className="px-4 py-1.5 rounded-lg bg-musgo text-marfil text-xs font-semibold hover:bg-musgo/90"
              >
                Repetir Escenario
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
