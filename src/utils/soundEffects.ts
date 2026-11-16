// Web Audio API synthesizer for subtle cartoon character hover sounds (Tom's "Meow" & Jerry's "Squeak")

let sharedAudioCtx: AudioContext | null = null;
let lastTomPlayTime = 0;
let lastJerryPlayTime = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {
      // Ignore autoplay restriction until first click
    });
  }
  return sharedAudioCtx;
}

// Unlock AudioContext on first user gesture anywhere in the document
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    } else if (!sharedAudioCtx) {
      getAudioContext();
    }
  };
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
}

/**
 * Plays a subtle, warm cartoon cat "meow" pitch contour when hovering Tom's card.
 */
export function playTomMeow(muted = false): void {
  if (muted) return;
  const nowMs = Date.now();
  if (nowMs - lastTomPlayTime < 450) return; // Cooldown so rapid re-entry stays pleasant
  lastTomPlayTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 0.36;

    // Main vocal oscillator (triangle wave for soft feline timbre)
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    // Pitch contour: "Mee-oww" (starts mid, rises to peak, glides down)
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.11);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.24);
    osc.frequency.exponentialRampToValueAtTime(370, now + duration);

    // Formant filter sweep for vowel-like "ee-aa-ow" quality
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(3.2, now);
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(1450, now + 0.12);
    filter.frequency.exponentialRampToValueAtTime(750, now + duration);

    // Subtle envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.04);
    gain.gain.setValueAtTime(0.14, now + 0.16);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  } catch {
    // Safely ignore if Web Audio is blocked
  }
}

/**
 * Plays a subtle, cheerful double mouse "squeak-squeak" chirp when hovering Jerry's card.
 */
export function playJerrySqueak(muted = false): void {
  if (muted) return;
  const nowMs = Date.now();
  if (nowMs - lastJerryPlayTime < 450) return; // Cooldown
  lastJerryPlayTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Helper for a single tiny mouse squeak chirp
    const triggerChirp = (startTime: number, startFreq: number, peakFreq: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(peakFreq, startTime + dur * 0.65);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 1.1, startTime + dur);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.09, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + dur + 0.01);
    };

    // Double cartoon squeak ("squeak-squeak!")
    triggerChirp(now, 1650, 2480, 0.075);
    triggerChirp(now + 0.095, 1850, 2720, 0.085);
  } catch {
    // Safely ignore if Web Audio is blocked
  }
}
