// ============================================================
//  gameState.js — Shared Game State (single source of truth)
// ============================================================

export const state = {
    // ── Round state ──────────────────────────────────────────
    currentLevel: 1,
    gameCards: [],    // active cards this round
    flippedCards: [],    // at most 2 face-up cards
    matchedCount: 0,     // individual cards matched
    totalAttempts: 0,     // pair-flip attempts
    mistakes: 0,         // wrong match count
    maxMistakes: 3,      // allowed mistakes before breathing break
    hintsUsed: 0,     // hint button presses
    peeksUsed: 0,     // peek button presses
    stars: 0,     // stars earned (set at victory)
    isLocked: false, // block clicks during animations
    timerInterval: null,
    timeLeft: 0,

    // ── Player profile ────────────────────────────────────────
    playerName: 'Player',
    playerAvatar: '🐱',

    // ── App preferences ───────────────────────────────────────
    soundEnabled: true,
    speechEnabled: true,
    selectedEmotion: null, // e.g., 'anger', 'sadness', 'anxiety', etc.
};

/** Reset all per-round fields. Preserves level, player info, and settings. */
export function resetRound() {
    state.gameCards = [];
    state.flippedCards = [];
    state.matchedCount = 0;
    state.totalAttempts = 0;
    state.mistakes = 0;
    state.hintsUsed = 0;
    state.peeksUsed = 0;
    state.stars = 0;
    state.isLocked = false;
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.timeLeft = 0;
}
