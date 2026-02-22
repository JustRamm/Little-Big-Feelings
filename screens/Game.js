// ============================================================
//  screens/Game.js — Screen 4: Game Board + All Card Logic
// ============================================================
import { state, resetRound } from '../gameState.js';
import { ALL_CARDS, LEVELS } from '../gameData.js';
import { show as showMatch } from './OverlayMatch.js';
import { show as showWrong } from './OverlayWrong.js';

// ── Template ────────────────────────────────────────────────
export function template() {
    return /* html */`
    <section id="screen-game" class="screen" aria-label="Game Board">

        <!-- HUD bar -->
        <div class="game-header">
            <button id="btn-home"  class="btn-icon" aria-label="Back to home"  title="Home">🏠</button>

            <div class="hud-stats">
                <div class="stat-item">
                    <span class="stat-label">Level</span>
                    <span id="stat-level" class="stat-value">Easy 🌱</span>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <span class="stat-label">Matched</span>
                    <span class="stat-value">
                        <span id="stat-matched">0</span>/<span id="stat-total">0</span>
                    </span>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <span class="stat-label">Tries</span>
                    <span id="stat-attempts" class="stat-value">0</span>
                </div>
            </div>

            <div id="timer-wrap" class="timer-wrap timer-hidden" aria-live="polite">
                <span class="timer-icon" aria-hidden="true">⏱️</span>
                <span id="timer-display" class="timer-display">02:00</span>
            </div>

            <button id="btn-reset" class="btn-icon" aria-label="Reset game" title="Reset">🔄</button>
        </div>

        <!-- Card grid (populated by JS) -->
        <div class="game-board-container">
            <div id="game-board" class="game-grid"></div>
        </div>

    </section>`;
}

// ── Private helpers ─────────────────────────────────────────
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function updateHUD() {
    document.getElementById('stat-attempts').textContent = state.totalAttempts;
    document.getElementById('stat-matched').textContent = state.matchedCount / 2;
    document.getElementById('stat-total').textContent = state.gameCards.length / 2;

    const lvlEl = document.getElementById('stat-level');
    if (lvlEl) lvlEl.textContent = LEVELS[state.currentLevel].label;
}

// ── Timer ────────────────────────────────────────────────────
function startTimer(seconds) {
    const wrap = document.getElementById('timer-wrap');
    const display = document.getElementById('timer-display');

    // No timer for current levels (time = 99999 means unlimited)
    if (seconds >= 99999) {
        wrap.classList.add('timer-hidden');
        return;
    }

    wrap.classList.remove('timer-hidden');
    state.timeLeft = seconds;
    _renderTimer(display, seconds);

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        _renderTimer(display, state.timeLeft);

        if (state.timeLeft <= 10) display.classList.add('timer-warning');
        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            _onVictory(); // time-up = end game with current score
        }
    }, 1000);
}

function _renderTimer(el, t) {
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    el.textContent = `${m}:${s}`;
}

// ── Card creation ────────────────────────────────────────────
function createCardEl(cardData) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = cardData.id;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Hidden emotion card — click to flip');

    card.innerHTML = /* html */`
        <div class="card-inner">
            <div class="card-face card-back">
                <div class="card-back-pattern"><span>❓</span></div>
            </div>
            <div class="card-face card-front">
                <div class="card-label">${cardData.label}</div>
                <img src="${cardData.image}" alt="${cardData.name}" draggable="false">
                <div class="card-name">${cardData.name}</div>
            </div>
        </div>`;

    card.addEventListener('click', () => _flipCard(card, cardData));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') _flipCard(card, cardData);
    });

    return card;
}

// ── Flip / Match logic ───────────────────────────────────────
function _flipCard(cardEl, cardData) {
    if (state.isLocked) return;
    if (cardEl.classList.contains('flipped')) return;
    if (cardEl.classList.contains('matched')) return;
    if (state.flippedCards.length === 2) return;

    cardEl.classList.add('flipped');
    state.flippedCards.push({ el: cardEl, data: cardData });

    if (state.flippedCards.length === 2) {
        state.isLocked = true;
        state.totalAttempts++;
        updateHUD();
        setTimeout(_checkMatch, 700);
    }
}

function _checkMatch() {
    const [c1, c2] = state.flippedCards;

    if (c1.data.matchId === c2.data.id) {
        _handleMatch(c1, c2);
    } else {
        _handleNoMatch(c1, c2);
    }
}

function _handleMatch(c1, c2) {
    c1.el.classList.add('matched');
    c2.el.classList.add('matched');
    state.matchedCount += 2;
    state.flippedCards = [];
    state.isLocked = false;
    updateHUD();

    // Show educational overlay; victory check happens inside onContinue (main.js)
    showMatch({ d1: c1.data, d2: c2.data });
}

function _handleNoMatch(c1, c2) {
    c1.el.classList.add('shake');
    c2.el.classList.add('shake');
    showWrong();

    setTimeout(() => {
        c1.el.classList.remove('flipped', 'shake');
        c2.el.classList.remove('flipped', 'shake');
        state.flippedCards = [];
        state.isLocked = false;
    }, 950);
}

// ── Victory callback (set by main.js) ───────────────────────
let _onVictory = () => { };

// ── Public API ───────────────────────────────────────────────

/**
 * Build and shuffle the board for the current level.
 * Called by main.js whenever a new game starts.
 */
export function startGame() {
    resetRound();

    const cfg = LEVELS[state.currentLevel];
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    // Pick `cfg.pairs` random pairs from the pool
    const evenCards = ALL_CARDS.filter((_, i) => i % 2 === 0);
    const selectedBase = shuffle(evenCards).slice(0, cfg.pairs);

    selectedBase.forEach(base => {
        state.gameCards.push(base);
        const partner = ALL_CARDS.find(c => c.id === base.matchId);
        if (partner) state.gameCards.push(partner);
    });
    state.gameCards = shuffle(state.gameCards);

    // Adjust columns
    const cols = cfg.pairs <= 3 ? 3 : 4;
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    state.gameCards.forEach(card => board.appendChild(createCardEl(card)));

    updateHUD();
    startTimer(cfg.time);
}

/**
 * @param {{
 *   navigate:   (screen: string) => void,
 *   onVictory:  () => void
 * }} deps
 */
export function init({ navigate, onVictory }) {
    _onVictory = onVictory;

    document.getElementById('btn-home').addEventListener('click', () => {
        clearInterval(state.timerInterval);
        navigate('splash');
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        clearInterval(state.timerInterval);
        startGame();
    });
}

/** True when all pairs on the board are matched */
export function isComplete() {
    return state.gameCards.length > 0 &&
        state.matchedCount === state.gameCards.length;
}

/** Star rating based on attempt efficiency */
export function calcStars() {
    const pairs = state.matchedCount / 2;
    const efficiency = pairs / Math.max(state.totalAttempts, 1);
    if (efficiency >= 0.75) return 3;
    if (efficiency >= 0.50) return 2;
    return 1;
}
