// ============================================================
//  utils/storage.js — localStorage Persistence Helpers
// ============================================================

const PFX = 'emotion-match-';

function set(key, val) {
    localStorage.setItem(PFX + key, JSON.stringify(val));
}
function get(key) {
    try { return JSON.parse(localStorage.getItem(PFX + key)); }
    catch { return null; }
}

// ── Player profile ───────────────────────────────────────────
export function savePlayer(data) { set('player', data); }
export function loadPlayer() { return get('player'); }

// ── Per-level best scores ────────────────────────────────────
/** @param {number} level  @param {{ stars:number, attempts:number }} data */
export function saveScore(level, data) {
    const all = loadScores();
    // Only overwrite if the new score is better (more stars, or same stars fewer attempts)
    const prev = all[level];
    if (!prev || data.stars > prev.stars ||
        (data.stars === prev.stars && data.attempts < prev.attempts)) {
        all[level] = data;
        set('scores', all);
    }
}
export function loadScores() { return get('scores') ?? {}; }

// ── App settings ─────────────────────────────────────────────
export function saveSettings(data) { set('settings', data); }
export function loadSettings() { return get('settings') ?? { soundEnabled: true }; }

// ── Nuclear option ───────────────────────────────────────────
export function clearAll() {
    Object.keys(localStorage)
        .filter(k => k.startsWith(PFX))
        .forEach(k => localStorage.removeItem(k));
}
