// ============================================================
//  utils/sounds.js — Synthesised Sound Effects (Web Audio API)
//  No external files — all tones generated in-browser.
// ============================================================

let _ctx = null;
let _enabled = true;

/** Lazy AudioContext — created on first user gesture */
function getCtx() {
    if (!_ctx) {
        _ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (browser autoplay policy)
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
}

/**
 * Play a single synthesised tone.
 * @param {{ freq?:number, type?:OscillatorType, dur?:number, vol?:number, delay?:number }}
 */
function tone({ freq = 440, type = 'sine', dur = 0.15, vol = 0.2, delay = 0 } = {}) {
    if (!_enabled) return;
    try {
        const ac = getCtx();
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.connect(g);
        g.connect(ac.destination);

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ac.currentTime + delay);
        g.gain.setValueAtTime(vol, ac.currentTime + delay);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + delay + dur);

        osc.start(ac.currentTime + delay);
        osc.stop(ac.currentTime + delay + dur + 0.05);
    } catch (_) { /* audio unavailable in this environment */ }
}

// ── Public API ───────────────────────────────────────────────
// ── Music ────────────────────────────────────────────────────
let _musicAudio = null;
let _musicStarted = false;

export const sounds = {
    setEnabled(v) {
        _enabled = !!v;
        if (!_enabled) this.stopMusic();
    },
    isEnabled() { return _enabled; },

    /** Start background music — handles both file-based and synthesized backup */
    startMusic() {
        if (!_enabled || _musicStarted) return;
        _musicStarted = true;

        try {
            // Priority 1: Use the user's song if it exists
            _musicAudio = new Audio('assets/sounds/MeSong.mpeg');
            _musicAudio.loop = true;
            _musicAudio.volume = 0.4;

            const playPromise = _musicAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio file not found or blocked, using synthesized backup.");
                    // Priority 2: Synthesized "Chill Loop"
                    this._startSynthBGM();
                });
            }
        } catch (e) {
            this._startSynthBGM();
        }
    },

    stopMusic() {
        if (_musicAudio) {
            _musicAudio.pause();
            _musicAudio.currentTime = 0;
        }
        _musicStarted = false;
        // Also stop any synth loops if implemented
    },

    /** A gentle, airy synthesized background loop (as fallback) */
    _startSynthBGM() {
        const playNote = (freq, vol, dur, delay) => {
            if (!_musicStarted || !_enabled) return;
            tone({ freq, type: 'sine', dur, vol, delay });
            setTimeout(() => playNote(freq, vol, dur, delay), 8000); // Loop every 8s
        };

        // Gentle Cmaj7 arpeggio
        [261.63, 329.63, 392.00, 493.88].forEach((f, i) => {
            setTimeout(() => playNote(f, 0.05, 4, 0), i * 2000);
        });
    },

    flip() {
        tone({ freq: 750, type: 'sine', dur: 0.07, vol: 0.15 });
    },

    /** Happy ascending arpeggio on a correct match */
    match() {
        [523, 659, 784, 1047].forEach((freq, i) =>
            tone({ freq, type: 'sine', dur: 0.28, vol: 0.2, delay: i * 0.09 })
        );
    },

    /** Low descending tones — gentle, not harsh — on a wrong match */
    wrong() {
        tone({ freq: 300, type: 'triangle', dur: 0.18, vol: 0.15 });
        tone({ freq: 230, type: 'triangle', dur: 0.2, vol: 0.12, delay: 0.14 });
    },

    /** Full fanfare on victory */
    victory() {
        [523, 659, 784, 1047, 1319, 1568].forEach((freq, i) =>
            tone({ freq, type: 'sine', dur: 0.45, vol: 0.22, delay: i * 0.1 })
        );
    },

    /** Subtle click for UI buttons */
    click() {
        tone({ freq: 620, type: 'sine', dur: 0.06, vol: 0.1 });
    },

    /** Soft hover sound for children's feedback */
    hover() {
        tone({ freq: 440, type: 'sine', dur: 0.04, vol: 0.05 });
    },

    /** Magical shimmer for matches or success */
    shimmer() {
        for (let i = 0; i < 8; i++) {
            tone({
                freq: 880 + (i * 120),
                type: 'sine',
                dur: 0.15,
                vol: 0.08,
                delay: i * 0.04
            });
        }
    },

    /** Soft breathing-phase bell */
    breathBell() {
        tone({ freq: 880, type: 'sine', dur: 0.6, vol: 0.18 });
    },
};
