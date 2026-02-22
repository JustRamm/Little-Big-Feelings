// ============================================================
//  utils/storage.js — localStorage Persistence Helpers
// ============================================================

const PFX = 'emotion-match-';

function set(key, val, persistent = true) {
    const storage = persistent ? localStorage : sessionStorage;
    storage.setItem(PFX + key, JSON.stringify(val));
}
function get(key, persistent = true) {
    const storage = persistent ? localStorage : sessionStorage;
    try { return JSON.parse(storage.getItem(PFX + key)); }
    catch { return null; }
}

// ── Player profile ───────────────────────────────────────────
export function savePlayer(data) { set('player', data, false); }
export function loadPlayer() { return get('player', false); }

// ── Per-level best scores (In-memory only, lost on refresh) ───
let memoryScores = {};

/** @param {number} level  @param {{ stars:number, attempts:number }} data */
export function saveScore(level, data) {
    const prev = memoryScores[level];
    if (!prev || data.stars > prev.stars ||
        (data.stars === prev.stars && data.attempts < prev.attempts)) {
        memoryScores[level] = data;
    }
}
export function loadScores() { return memoryScores; }
export function resetScores() { memoryScores = {}; }

// ── App settings ─────────────────────────────────────────────
export function saveSettings(data) { set('settings', data); }
export function loadSettings() { return get('settings') ?? { soundEnabled: true }; }

// ── Nuclear option ───────────────────────────────────────────
export function clearAll() {
    Object.keys(localStorage)
        .filter(k => k.startsWith(PFX))
        .forEach(k => localStorage.removeItem(k));
}
