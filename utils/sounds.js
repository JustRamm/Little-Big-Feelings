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
export const sounds = {
    setEnabled(v) { _enabled = !!v; },
    isEnabled() { return _enabled; },

    /** Short tick when flipping a card */
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

    /** Soft breathing-phase bell */
    breathBell() {
        tone({ freq: 880, type: 'sine', dur: 0.6, vol: 0.18 });
    },
};
