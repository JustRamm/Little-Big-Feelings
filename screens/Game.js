// ============================================================
//  screens/Game.js — Screen 4: Game Board + All Card Logic
// ============================================================
import { state, resetRound } from '../gameState.js';
import { EMOTIONS_DATA, LEVELS } from '../gameData.js';
import { show as showMatch } from './OverlayMatch.js';
import { show as showBreathing } from './BreathingBuddy.js';
import { sounds } from '../utils/sounds.js';

// Grid column classes (avoids inline styles)
const GRID_COLS = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
};

// ── Template ────────────────────────────────────────────────
export function template() {
    return /* html */`
    <section id="screen-game" class="screen" aria-label="Game Board">

        <!-- HUD bar -->
        <div class="game-header">
            <button id="btn-home"  class="btn-icon" aria-label="Back to home"  title="Home" type="button">
                <img src="assets/ui/home.svg" alt="Home">
            </button>

            <div class="hud-stats">
                <div class="stat-item">
                    <span class="stat-label">Feeling</span>
                    <span id="stat-emotion-name" class="stat-value">Anger</span>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <span class="stat-label">Level</span>
                    <span id="stat-level-wrap" class="stat-value">
                        <img src="assets/ui/level_1.svg" alt="" id="stat-level-icon" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 4px;">
                        <span id="stat-level-text">Easy</span>
                    </span>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                    <span class="stat-label">Matched</span>
                    <span class="stat-value">
                        <span id="stat-matched">0</span>/<span id="stat-total">0</span>
                    </span>
                </div>
            </div>

            <div id="timer-wrap" class="timer-wrap timer-hidden" aria-live="polite">
                <span class="timer-icon" aria-hidden="true">
                    <img src="assets/ui/timer.svg" alt="Timer">
                </span>
                <span id="timer-display" class="timer-display">02:00</span>
            </div>

            <div class="hud-right-actions">
                <button id="btn-peek"  class="btn-icon peek-btn" aria-label="Peek at all cards" title="Peek" type="button">
                    <img src="assets/ui/peek.svg" alt="Peek">
                    <span class="btn-badge" id="peek-count-badge">0</span>
                </button>
                <button id="btn-hint"  class="btn-icon hint-btn" aria-label="Get a hint" title="Hint (max 3)" type="button">
                    <img src="assets/ui/hint.svg" alt="Hint">
                    <span class="btn-badge" id="hint-count-badge">3</span>
                </button>
                <button id="btn-reset" class="btn-icon" aria-label="Reset game" title="Reset" type="button">
                    <img src="assets/ui/reset.svg" alt="Reset">
                </button>
            </div>
        </div>

        <!-- Progress bar -->
        <div class="progress-bar-wrap" aria-label="Progress" role="progressbar"
             aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="progress-bar-wrap">
            <div class="progress-bar-fill" id="progress-bar-fill"></div>
            <span class="progress-bar-label" id="progress-bar-label">0%</span>
        </div>

        <!-- Card grid (populated by JS) -->
        <div class="game-board-container">
            <div id="game-board" class="game-grid"></div>
        </div>

    </section>`;
}

// ── Helpers ──────────────────────────────────────────────────
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function updateHUD() {
    const pairs = state.matchedCount / 2;
    const total = state.gameCards.length / 2;
    const pct = total > 0 ? Math.round((pairs / total) * 100) : 0;

    document.getElementById('stat-matched').textContent = pairs;
    document.getElementById('stat-total').textContent = total;

    // Emotion and Level label
    const emoNameEl = document.getElementById('stat-emotion-name');
    const lvlText = document.getElementById('stat-level-text');
    const lvlIcon = document.getElementById('stat-level-icon');

    const emoData = EMOTIONS_DATA[state.selectedEmotion] || EMOTIONS_DATA.anger;
    if (emoNameEl) {
        emoNameEl.textContent = emoData.name;
        emoNameEl.style.color = emoData.color;
    }

    if (lvlText) lvlText.textContent = LEVELS[state.currentLevel].label;
    if (lvlIcon) lvlIcon.src = `assets/ui/level_${state.currentLevel}.svg`;

    // Progress bar
    const fill = document.getElementById('progress-bar-fill');
    const label = document.getElementById('progress-bar-label');
    const wrap = document.getElementById('progress-bar-wrap');
    if (fill) fill.style.width = `${pct}%`;
    if (label) label.textContent = `${pct}%`;
    if (wrap) wrap.setAttribute('aria-valuenow', pct);

    // Peak button
    const peekBtn = document.getElementById('btn-peek');
    const peekBadge = document.getElementById('peek-count-badge');
    if (peekBtn) {
        const maxPeeks = LEVELS[state.currentLevel].peekUses;
        const left = maxPeeks - state.peeksUsed;
        peekBtn.disabled = left <= 0;
        if (peekBadge) peekBadge.textContent = left;
    }

    // Disable hint after 3 uses
    const hintBtn = document.getElementById('btn-hint');
    const hintBadge = document.getElementById('hint-count-badge');
    if (hintBtn) {
        const left = 3 - state.hintsUsed;
        hintBtn.disabled = left <= 0;
        if (hintBadge) hintBadge.textContent = left;
    }
}

// ── Timer ────────────────────────────────────────────────────
function startTimer(seconds) {
    const wrap = document.getElementById('timer-wrap');
    const display = document.getElementById('timer-display');

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
            if (state.matchedCount > 0) _onVictory(); // only call if at least 1 match
        }
    }, 1000);
}

function _renderTimer(el, t) {
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    el.textContent = `${m}:${s}`;
}

// ── Card creation ─────────────────────────────────────────────
function createCardEl(cardData) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = cardData.id;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Emotion card: ${cardData.name}`);

    card.innerHTML = /* html */`
        <div class="card-inner">
            <div class="card-face card-back">
                <div class="card-back-pattern">
                    <img src="assets/ui/question.svg" alt="Hidden">
                </div>
            </div>
            <div class="card-face card-front">
                <div class="card-label">${cardData.label}</div>
                <img src="${cardData.image}" alt="${cardData.name}" draggable="false">
                <div class="card-name">${cardData.name}</div>
            </div>
        </div>`;

    card.addEventListener('click', () => _flipCard(card, cardData));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            _flipCard(card, cardData);
        }
    });

    return card;
}

// ── Flip / Match logic ────────────────────────────────────────
function _flipCard(cardEl, cardData) {
    if (state.isLocked) return;
    if (cardEl.classList.contains('flipped')) return;
    if (cardEl.classList.contains('matched')) return;
    if (state.flippedCards.length === 2) return;

    sounds.flip();
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
    sounds.match();
    c1.el.classList.add('matched');
    c2.el.classList.add('matched');
    state.matchedCount += 2;
    state.flippedCards = [];
    state.isLocked = false;
    updateHUD();
    showMatch({ d1: c1.data, d2: c2.data });
}

function _handleNoMatch(c1, c2) {
    sounds.wrong();
    c1.el.classList.add('shake');
    c2.el.classList.add('shake');

    // Remove shake after animation, but keep cards face-up until breathing done
    setTimeout(() => {
        c1.el.classList.remove('shake');
        c2.el.classList.remove('shake');
    }, 600);

    // Show BreathingBuddy — unflip cards only AFTER the child finishes
    showBreathing(() => {
        c1.el.classList.remove('flipped');
        c2.el.classList.remove('flipped');
        state.flippedCards = [];
        state.isLocked = false;
    });
}

// ── Hint ─────────────────────────────────────────────────────
function _giveHint() {
    if (state.hintsUsed >= 3 || state.isLocked) return;

    // Find first unmatched pair
    const unmatched = state.gameCards.filter(c => {
        const el = document.querySelector(`[data-id="${c.id}"]`);
        return el && !el.classList.contains('matched') && !el.classList.contains('flipped');
    });
    if (unmatched.length < 2) return;

    const first = unmatched[0];
    const partner = state.gameCards.find(c => c.id === first.matchId);
    if (!partner) return;

    const el1 = document.querySelector(`[data-id="${first.id}"]`);
    const el2 = document.querySelector(`[data-id="${partner.id}"]`);

    [el1, el2].forEach(el => el?.classList.add('hint-glow'));

    state.hintsUsed++;
    sounds.click();
    updateHUD();

    setTimeout(() => {
        [el1, el2].forEach(el => el?.classList.remove('hint-glow'));
    }, 1800);
}

// ── Peek ─────────────────────────────────────────────────────
function _peekAll() {
    const cfg = LEVELS[state.currentLevel];
    if (state.peeksUsed >= cfg.peekUses || state.isLocked) return;

    sounds.click();
    state.peeksUsed++;
    state.isLocked = true; // prevent interaction while peeking
    updateHUD();

    const allCards = document.querySelectorAll('.card');
    const cardsToUnflip = [];

    allCards.forEach(card => {
        if (!card.classList.contains('matched') && !card.classList.contains('flipped')) {
            card.classList.add('flipped', 'peeking');
            cardsToUnflip.push(card);
        }
    });

    setTimeout(() => {
        cardsToUnflip.forEach(card => {
            card.classList.remove('flipped', 'peeking');
        });
        state.isLocked = false;
    }, cfg.peekDuration);
}

// ── Victory callback (injected by main.js) ────────────────────
let _onVictory = () => { };

// ── Public API ────────────────────────────────────────────────

/** Build + shuffle the board for the current level */
export function startGame() {
    resetRound();

    const cfg = LEVELS[state.currentLevel];
    const board = document.getElementById('game-board');
    if (!board) return;
    board.innerHTML = '';

    // Remove any previous grid-col class and set the right one
    Object.values(GRID_COLS).forEach(c => board.classList.remove(c));
    const cols = cfg.pairs <= 3 ? 3 : cfg.pairs <= 6 ? 4 : 6;
    board.classList.add(GRID_COLS[cols]);

    // Pick pairs from the selected emotion's pool
    const emoData = EMOTIONS_DATA[state.selectedEmotion] || EMOTIONS_DATA.anger;
    const availablePairs = shuffle(emoData.pairs).slice(0, cfg.pairs);

    state.gameCards = [];
    availablePairs.forEach(pair => {
        state.gameCards.push({
            id: pair.emotion.id,
            matchId: pair.action.id,
            image: pair.emotion.img,
            type: 'emotion',
            name: pair.emotion.name,
            label: 'Emotion',
            description: pair.emotion.desc
        });
        state.gameCards.push({
            id: pair.action.id,
            matchId: pair.emotion.id,
            image: pair.action.img,
            type: 'action',
            name: pair.action.name,
            label: 'Coping Action',
            description: pair.action.desc
        });
    });

    state.gameCards = shuffle(state.gameCards);

    state.gameCards.forEach(card => board.appendChild(createCardEl(card)));
    updateHUD();
    startTimer(cfg.time);
}

/**
 * @param {{ navigate: (screen: string) => void, onVictory: () => void }} deps
 */
export function init({ navigate, onVictory }) {
    _onVictory = onVictory;

    document.getElementById('btn-home').addEventListener('click', () => {
        sounds.click();
        clearInterval(state.timerInterval);
        navigate('emotionSelect');
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        sounds.click();
        clearInterval(state.timerInterval);
        startGame();
    });

    document.getElementById('btn-hint').addEventListener('click', _giveHint);
    document.getElementById('btn-peek').addEventListener('click', _peekAll);
}

/** True when all pairs on this board are matched */
export function isComplete() {
    return state.gameCards.length > 0 &&
        state.matchedCount === state.gameCards.length;
}

/** Star rating: based on pair-match efficiency */
export function calcStars() {
    const pairs = state.matchedCount / 2;
    const efficiency = pairs / Math.max(state.totalAttempts, 1);
    if (efficiency >= 0.75) return 3;
    if (efficiency >= 0.50) return 2;
    return 1;
}
