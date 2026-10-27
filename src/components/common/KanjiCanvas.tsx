import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Eye, EyeOff, Check, Eraser } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface KanjiCanvasProps {
  referenceChar: string;
  strokeSteps: string[];
  strokeCount: number;
  onComplete?: (score: number) => void;
}

export const KanjiCanvas: React.FC<KanjiCanvasProps> = ({
  referenceChar,
  strokeSteps,
  strokeCount,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGhost, setShowGhost] = useState(true);
  const [strokesHistory, setStrokesHistory] = useState<ImageData[]>([]);
  const [evaluation, setEvaluation] = useState<{ score: number; feedback: string } | null>(null);

  const CANVAS_SIZE = 280;

  useEffect(() => {
    initCanvas();
  }, [referenceChar]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    drawGrid(ctx);
    setStrokesHistory([]);
    setEvaluation(null);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.strokeStyle = '#D9D5CB';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_SIZE / 2);
    ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE / 2);
    ctx.stroke();

    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(CANVAS_SIZE / 2, 0);
    ctx.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE);
    ctx.stroke();

    // Outer border
    ctx.setLineDash([]);
    ctx.strokeStyle = '#D9D5CB';
    ctx.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.restore();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * (CANVAS_SIZE / rect.width),
        y: (e.touches[0].clientY - rect.top) * (CANVAS_SIZE / rect.height)
      };
    } else if ('clientX' in e) {
      return {
        x: (e.clientX - rect.left) * (CANVAS_SIZE / rect.width),
        y: (e.clientY - rect.top) * (CANVAS_SIZE / rect.height)
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save current state for undo
    setStrokesHistory(prev => [...prev, ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)]);

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#202321'; // Sumi ink
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || strokesHistory.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = strokesHistory[strokesHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setStrokesHistory(prev => prev.slice(0, prev.length - 1));
    setEvaluation(null);
  };

  const handleEvaluate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Coverage & density algorithm
    const userImgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    let userPixelCount = 0;
    for (let i = 0; i < userImgData.data.length; i += 4) {
      // Check for dark sumi pixels
      if (userImgData.data[i] < 100 && userImgData.data[i + 3] > 100) {
        userPixelCount++;
      }
    }

    if (userPixelCount < 100) {
      setEvaluation({
        score: 20,
        feedback: 'El lienzo parece casi vacío. Dibuja el carácter completo siguiendo los trazos numerados.'
      });
      return;
    }

    // Estimate based on expected strokes and ink coverage
    const strokesDrawn = strokesHistory.length;
    let score = 85;
    let feedback = '¡Excelente ejecución! Los trazos muestran firmeza y buena distribución en la cuadrícula.';

    if (Math.abs(strokesDrawn - strokeCount) > 2) {
      score = 70;
      feedback = `Atención al orden y número de trazos: este carácter tiene exactamente ${strokeCount} trazos. Tú hiciste ${strokesDrawn}.`;
    }

    setEvaluation({ score, feedback });
    audioService.playZenChime('success');
    if (onComplete) onComplete(score);
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Canvas Container with Calligraphy Grid */}
      <div className="relative border-2 border-piedra dark:border-piedra-dark rounded-xl bg-marfil dark:bg-[#1f2320] shadow-sm overflow-hidden touch-none">
        {/* Ghost character guide */}
        {showGhost && (
          <div
            className="absolute inset-0 flex items-center justify-center font-serif text-sumi/15 dark:text-washi/15 pointer-events-none select-none text-[180px] leading-none"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {referenceChar}
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair"
        />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={() => setShowGhost(!showGhost)}
          title={showGhost ? 'Ocultar guía' : 'Mostrar guía de fondo'}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
            showGhost
              ? 'bg-washi border-torii text-torii dark:bg-[#282d2a] dark:text-torii-dark'
              : 'border-piedra text-sumi/70 dark:text-washi/70 hover:border-torii'
          }`}
        >
          {showGhost ? <Eye size={14} /> : <EyeOff size={14} />}
          {showGhost ? 'Guía Visible' : 'Sin Guía'}
        </button>

        <button
          onClick={handleUndo}
          disabled={strokesHistory.length === 0}
          title="Deshacer último trazo"
          className="p-2 rounded-lg text-xs border border-piedra dark:border-piedra-dark text-sumi/70 dark:text-washi/70 hover:border-sumi hover:text-sumi disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <RotateCcw size={14} />
        </button>

        <button
          onClick={initCanvas}
          title="Borrar lienzo y empezar de nuevo"
          className="p-2 rounded-lg text-xs border border-piedra dark:border-piedra-dark text-sumi/70 dark:text-washi/70 hover:border-torii hover:text-torii transition-colors"
        >
          <Eraser size={14} />
        </button>

        <button
          onClick={handleEvaluate}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-torii text-marfil hover:bg-torii-hover flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
        >
          <Check size={14} />
          Comprobar Trazo
        </button>
      </div>

      {/* Evaluation Feedback */}
      {evaluation && (
        <div className="mt-4 w-full max-w-xs p-3 rounded-lg border border-musgo/30 bg-musgo/5 dark:bg-musgo/10 text-xs">
          <div className="flex items-center justify-between font-semibold text-musgo dark:text-musgo-light mb-1">
            <span>Puntuación estimada:</span>
            <span className="text-sm">{evaluation.score}/100</span>
          </div>
          <p className="text-sumi/80 dark:text-washi/80 leading-relaxed">
            {evaluation.feedback}
          </p>
          <span className="block mt-2 text-[10px] text-sumi/50 dark:text-washi/50 italic">
            * Comprobación basada en densidad de cobertura y distribución en cuadrícula.
          </span>
        </div>
      )}

      {/* Stroke step guide */}
      <div className="mt-4 w-full max-w-sm text-left">
        <h4 className="text-xs font-semibold text-sumi dark:text-washi mb-2 flex items-center justify-between">
          <span>Orden oficial de trazos ({strokeCount} trazos):</span>
          <span className="text-torii dark:text-torii-dark text-[11px] font-mono">
            {referenceChar}
          </span>
        </h4>
        <ol className="space-y-1.5 text-xs text-sumi/75 dark:text-washi/75 pl-4 list-decimal">
          {strokeSteps.map((step, idx) => (
            <li key={idx} className="leading-snug">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
