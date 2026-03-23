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

            // Silently catch 404 (file not found) and fall back to synth
            _musicAudio.onerror = () => {
                this._startSynthBGM();
            };

            const playPromise = _musicAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(_error => {
                    // Autoplay blocked or file missing — use synthesized backup
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
    match(emotionId = 'stress') {
        const baseFreq = this._getEmotionFrequency(emotionId);
        [1, 1.25, 1.5, 2].forEach((mult, i) =>
            tone({ 
                freq: baseFreq * mult, 
                type: emotionId === 'anger' ? 'sawtooth' : 'sine', 
                dur: 0.28, 
                vol: 0.15, 
                delay: i * 0.09 
            })
        );
    },

    /** Low descending tones — gentle, not harsh — on a wrong match */
    wrong(emotionId = 'stress') {
        const baseFreq = emotionId === 'anger' ? 200 : 300;
        tone({ freq: baseFreq, type: 'triangle', dur: 0.18, vol: 0.15 });
        tone({ freq: baseFreq * 0.75, type: 'triangle', dur: 0.2, vol: 0.12, delay: 0.14 });
    },

    _getEmotionFrequency(id) {
        const freqs = {
            anger: 300,        // Heavy/Low
            sadness: 440,      // Pure/Standard
            joy: 784,          // High/Bright
            fear: 659,         // High/Tense
            trust: 523,        // Balanced
            disgust: 349,      // Low/Sharp
            anticipation: 880, // Very High
            surprise: 1047,    // Dynamic
            stress: 523        // Energetic (Default)
        };
        return freqs[id] || 523;
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

    /** Synthesized cheer sound using multiple tones and noise-like frequencies */
    cheer() {
        if (!_enabled) return;
        const ac = getCtx();
        // Multiple rising notes for "whoop" effect
        [440, 554.37, 659.25, 880].forEach((f, i) => {
            const osc = ac.createOscillator();
            const g = ac.createGain();
            osc.connect(g);
            g.connect(ac.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, ac.currentTime + i * 0.05);
            osc.frequency.exponentialRampToValueAtTime(f * 1.5, ac.currentTime + i * 0.05 + 0.5);
            
            g.gain.setValueAtTime(0, ac.currentTime + i * 0.05);
            g.gain.linearRampToValueAtTime(0.1, ac.currentTime + i * 0.05 + 0.1);
            g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + i * 0.05 + 0.6);
            
            osc.start(ac.currentTime + i * 0.05);
            osc.stop(ac.currentTime + i * 0.05 + 0.7);
        });
        
        // Add some noise bursts for "applause"
        for (let j = 0; j < 15; j++) {
            this.clap(ac.currentTime + Math.random() * 0.8);
        }
    },

    /** Short noise burst for a clap */
    clap(time = null) {
        if (!_enabled) return;
        const ac = getCtx();
        const t = time || ac.currentTime;
        
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.connect(g);
        g.connect(ac.destination);
        
        // Use a high-frequency sawtooth/noise-ish sound
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(Math.random() * 500 + 1000, t);
        
        g.gain.setValueAtTime(0.08, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
        
        osc.start(t);
        osc.stop(t + 0.1);
    },

    /** Ambiance state tracking */
    _ambianceLoop: null,
    _ambianceType: null,

    stopAnimalAmbiance() {
        if (this._ambianceLoop) {
            clearTimeout(this._ambianceLoop);
            this._ambianceLoop = null;
        }
        this._ambianceType = null;
    },

    startAnimalAmbiance(type) {
        this.stopAnimalAmbiance();
        this._ambianceType = type;
        
        const loop = () => {
            if (this._ambianceType !== type || !_enabled) return;
            
            // Lower volume for ambiance
            const volMod = (type === 'bee') ? 0.03 : 0.08;
            this.animal(type, volMod);
            
            // Beekeepers love constant buzz; lions roar occasionally
            const delay = (type === 'bee') ? 400 : 5000 + (Math.random() * 3000);
            this._ambianceLoop = setTimeout(loop, delay);
        };
        
        loop();
    },

    /** Synthesized Animal Sounds Engine (v1) — No TTS, just raw code textures */
    animal(type, ambianceVol = null) {
        if (!_enabled) return;
        const ac = getCtx();
        const t = ac.currentTime;

        const p = (f, ty, dur, vol, del = 0, glide = 0) => {
            const finalVol = ambianceVol || vol;
            const o = ac.createOscillator();
            const g = ac.createGain();
            o.connect(g); g.connect(ac.destination);
            o.type = ty;
            o.frequency.setValueAtTime(f, t + del);
            if (glide) o.frequency.exponentialRampToValueAtTime(f + glide, t + del + dur);
            g.gain.setValueAtTime(finalVol, t + del);
            g.gain.exponentialRampToValueAtTime(0.0001, t + del + dur);
            o.start(t + del); o.stop(t + del + dur + 0.05);
        };

        switch (type) {
            case 'lion':
                // Complex low-freq rumble with noise-like sawtooth
                for (let i = 0; i < 5; i++) {
                    p(85 - (i * 10), 'sawtooth', 0.8, 0.18, i * 0.05, -30);
                    p(95 - (i * 8), 'triangle', 1.0, 0.1, i * 0.08, -20);
                }
                break;
            case 'elephant':
                // Brassy, raspy trumpet
                for (let i = 0; i < 3; i++) {
                    p(440 + (i * 5), 'sawtooth', 0.5, 0.14, i * 0.02, 300);
                    p(880 - (i * 5), 'sine', 0.4, 0.08, i * 0.03, -150);
                }
                break;
            case 'penguin':
                // Nasal, rapid honking
                for (let i = 0; i < 3; i++) {
                    p(380, 'triangle', 0.12, 0.18, i * 0.18, 50);
                }
                break;
            case 'panda':
                // High-pitched "chirp-like" squeak
                p(1200, 'sine', 0.15, 0.1, 0, 400);
                p(1400, 'sine', 0.1, 0.08, 0.08, 200);
                break;
            case 'cat':
                // Multi-stage meow (rising then falling)
                p(523, 'sine', 0.4, 0.15, 0, 150);
                p(659, 'sine', 0.3, 0.12, 0.25, -200);
                break;
            case 'dog':
                // Powerful broad-spectrum bark
                p(180, 'sawtooth', 0.1, 0.2, 0, -20);
                p(320, 'square', 0.08, 0.12, 0.02, -50);
                p(160, 'triangle', 0.15, 0.15, 0.05);
                break;
            case 'monkey':
                // Bouncy hooting loop
                for (let i = 0; i < 6; i++) {
                    p(550 + (i % 2 ? 150 : 0), 'sine', 0.08, 0.14, i * 0.12, 80);
                }
                break;
            case 'rabbit':
                // Fast, soft sniffling (tiny noise blips)
                for (let i = 0; i < 4; i++) {
                    p(1500, 'sine', 0.03, 0.08, i * 0.08);
                }
                break;
            case 'frog':
                // Deep resonant ribbit
                for (let i = 0; i < 12; i++) {
                    p(110 + (i * 4), 'sawtooth', 0.015, 0.12, i * 0.025);
                }
                break;
            case 'owl':
                // Resonant hoot-hoot
                p(330, 'sine', 0.4, 0.18, 0, -40);
                p(290, 'sine', 0.5, 0.15, 0.5, -30);
                break;
            case 'bee':
                // Constant high-freq oscillation
                for (let i = 0; i < 20; i++) {
                    p(280 + Math.random() * 60, 'sawtooth', 0.012, 0.1, i * 0.008);
                }
                break;
            case 'butterfly':
                // Extremely soft, shimmering flutters
                for (let i = 0; i < 10; i++) {
                    tone({ freq: 2200 + (Math.random() * 500), type: 'sine', dur: 0.1, vol: 0.04, delay: i * 0.06 });
                }
                break;
            default:
                this.match();
        }

    }
};
