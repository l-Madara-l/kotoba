// Audio service for Japanese speech synthesis and sound effects

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private jaVoice: SpeechSynthesisVoice | null = null;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize natural Japanese voices
    this.jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang.startsWith('ja')) || null;
  }

  /**
   * Speak Japanese text
   * @param text Japanese sentence, word or kana
   * @param speed Speed multiplier (0.75 for slow practice, 1.0 for normal)
   */
  public speak(text: string, speed: number = 1.0): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      // Cancel any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      if (this.jaVoice) {
        utterance.voice = this.jaVoice;
      }
      utterance.rate = Math.max(0.6, Math.min(1.4, speed));
      utterance.pitch = 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.synth.speak(utterance);
    });
  }

  /**
   * Stop any current speech
   */
  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Play a subtle Japanese Zen singing bowl / chime sound via Web Audio API
   */
  public playZenChime(type: 'success' | 'hanko' | 'bell' | 'tap' = 'bell') {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      if (type === 'hanko') {
        // Deep resonant wooden stamp thud / hyoshigi tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.15);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'success') {
        // Japanese pentatonic chime: D5 - F#5 - A5
        [587.33, 739.99, 880].forEach((freq, i) => {
          if (!this.audioCtx) return;
          const toneOsc = this.audioCtx.createOscillator();
          const toneGain = this.audioCtx.createGain();
          toneOsc.type = 'sine';
          toneOsc.frequency.setValueAtTime(freq, now + i * 0.08);
          toneGain.gain.setValueAtTime(0.15, now + i * 0.08);
          toneGain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.6);
          toneOsc.connect(toneGain);
          toneGain.connect(this.audioCtx.destination);
          toneOsc.start(now + i * 0.08);
          toneOsc.stop(now + i * 0.08 + 0.6);
        });
      } else if (type === 'bell') {
        // Japanese temple suzu / orin bell harmonic
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.9);
      } else {
        // Gentle click/tap
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch {
      // AudioContext unavailable or blocked by user gesture
    }
  }
}

export const audioService = new AudioService();
