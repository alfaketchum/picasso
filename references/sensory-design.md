# Sensory Design Reference

---

## 1. UI Sound Design

### Why Sound
Sound confirms actions, draws attention to state changes, and adds personality. Underused on the web but highly effective with restraint.

### Sourcing Sounds
- **Kenney.nl**: free CC0 game/UI sound packs, no attribution
- **Freesound.org**: filter by CC0, verify per clip
- **Tone.js synthesis**: procedural sounds at runtime, no files to load
- **Self-recorded foley**: export as WAV/MP3 at 44.1kHz mono

For inline embedding, convert to base64 data URIs to avoid CORS and runtime fetching.

### The useSound Hook (Production-Ready)

Handles AudioContext lifecycle (browser autoplay policy), caches decoded buffers, exposes volume control via GainNode.

```typescript
// hooks/use-sound.ts
import { useCallback, useEffect, useRef } from "react";

let sharedCtx: AudioContext | null = null;
const bufferCache = new Map<string, AudioBuffer>();

function getAudioContext(): AudioContext {
  if (!sharedCtx) sharedCtx = new AudioContext();
  return sharedCtx;
}

export function initAudioOnGesture(): void {
  const resume = () => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
  };
  (["click", "touchstart", "keydown"] as const).forEach((e) =>
    document.addEventListener(e, resume, { once: false })
  );
}

interface UseSoundOptions {
  volume?: number;
  offset?: number;
  duration?: number;
}

export function useSound(src: string, options: UseSoundOptions = {}) {
  const { volume = 0.4, offset, duration } = options;
  const gainRef = useRef<GainNode | null>(null);

  const play = useCallback(async () => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") await ctx.resume();

    let buffer = bufferCache.get(src);
    if (!buffer) {
      const response = await fetch(src);
      buffer = await ctx.decodeAudioData(await response.arrayBuffer());
      bufferCache.set(src, buffer);
    }

    const gain = ctx.createGain();
    gain.gain.value = volume;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(gain);
    offset !== undefined && duration !== undefined
      ? source.start(0, offset, duration)
      : source.start(0);
  }, [src, volume, offset, duration]);

  const setVolume = useCallback((v: number) => {
    if (gainRef.current) gainRef.current.gain.value = Math.max(0, Math.min(1, v));
  }, []);

  return { play, setVolume } as const;
}
```

Call `initAudioOnGesture()` once at app root on mount.

### Sound Sprite Pattern
Pack multiple short sounds into a single file. Reference by offset + duration:
```typescript
export const SPRITE_MAP = {
  click:   { offset: 0.0,  duration: 0.08 },
  success: { offset: 0.1,  duration: 0.15 },
  error:   { offset: 0.3,  duration: 0.12 },
  toggle:  { offset: 0.5,  duration: 0.06 },
  whoosh:  { offset: 0.6,  duration: 0.20 },
} as const;
```

### When to Use Sound
- **Button clicks**: soft, short (50-100ms)
- **Success actions**: pleasant confirmation tone
- **Notifications**: attention-getting, not alarming
- **Errors**: subtle alert, not harsh
- **Toggle switches**: satisfying mechanical click
- **Transitions**: whoosh for page changes

### Rules
- Always provide a sound toggle in the UI
- Keep sounds under 200ms for interactions
- Use Web Audio API, not `<audio>` elements (lower latency)
- Default volume: 0.3-0.5
- Never auto-play on page load
- Gate behind user preference in localStorage
- Pre-decode buffers; never decode on every play

---

## 2. Haptic Feedback

### Vibration API (Android, some desktop)
```typescript
export function hapticTap() { navigator.vibrate?.(10); }
export function hapticSuccess() { navigator.vibrate?.([10, 50, 10]); }
export function hapticError() { navigator.vibrate?.(30); }
export function hapticWarning() { navigator.vibrate?.([10, 30, 10, 30, 10]); }
```

### iOS Considerations
Vibration API not supported on iOS Safari. Options:
- **Capacitor/React Native bridge**: call `UIImpactFeedbackGenerator` with `.light`/`.medium`/`.heavy`
- **Graceful degradation**: wrap all calls behind `'vibrate' in navigator` check; on iOS it's a no-op

### When to Use Haptics
- Button press confirmation (10ms)
- Toggle switch state change (10ms)
- Destructive action confirmation (30ms)
- Pull-to-refresh threshold reached (10ms)
- Drag and drop pickup/drop (10ms)

### Rules
- Gate behind feature detection
- Respect `prefers-reduced-motion`
- Keep durations 10-30ms, never over 100ms
- Only for pivotal moments, not every interaction
- Test on real hardware

---

## 3. Multi-Sensory Integration

Reserve combined visual + audio + haptic feedback for milestone moments: order placed, task completed, level achieved, payment confirmed.

### Principles
1. **Synchronize**: sound, haptic, and animation fire at t=0
2. **Match intensity**: subtle visual = quiet click = light tap; big celebration = brighter chime = stronger vibration
3. **Degrade gracefully**: each channel must stand alone if others are unavailable
4. **Respect preferences**: check `prefers-reduced-motion`, sound toggle, haptic toggle independently

### Timeline of a Multi-Sensory Moment

| Time | Visual | Sound | Haptic |
|------|--------|-------|--------|
| 0ms | State change, spring animation | Chime begins (100-150ms) | Double-pulse: 10ms/50ms/10ms |
| 150ms | Animation settles | Sound fades | Complete |
| 300ms | Final resting state | Silent | Idle |

All three channels start at t=0 and resolve independently. The user perceives them as one unified moment.
