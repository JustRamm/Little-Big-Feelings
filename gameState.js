// ============================================================
//  gameState.js — Shared Game State (single source of truth)
// ============================================================

/**
 * All mutable game state lives here.
 * Import and mutate this object from any screen module.
 * Because JS objects are passed by reference, all modules
 * see the same live values.
 */
export const state = {
    currentLevel: 1,
    gameCards: [],   // cards active in the current round
    flippedCards: [],   // at most 2 cards currently face-up
    matchedCount: 0,    // total individual cards matched
    totalAttempts: 0,    // number of pair-flip attempts
    stars: 0,    // earned at end of round
    isLocked: false, // blocks clicks during animations
    timerInterval: null,
    timeLeft: 0,
};

/** Reset per-round fields, keeping level intact */
export function resetRound() {
    state.gameCards = [];
    state.flippedCards = [];
    state.matchedCount = 0;
    state.totalAttempts = 0;
    state.stars = 0;
    state.isLocked = false;
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.timeLeft = 0;
}
