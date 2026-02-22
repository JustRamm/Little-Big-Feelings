// ============================================================
//  main.js — App Orchestrator
//
//  Responsibilities:
//    1. Import every screen module
//    2. Inject each screen's HTML into #app
//    3. Wire navigate() so screens can switch each other
//    4. Call each screen's init() with its required deps
//    5. Start on the Splash screen
// ============================================================

import * as Splash from './screens/Splash.js';
import * as LevelSelect from './screens/LevelSelect.js';
import * as Tutorial from './screens/Tutorial.js';
import * as Game from './screens/Game.js';
import * as OverlayMatch from './screens/OverlayMatch.js';
import * as OverlayWrong from './screens/OverlayWrong.js';
import * as Victory from './screens/Victory.js';

// ── 1. Mount all screen templates into #app ──────────────────
const app = document.getElementById('app');

// Static background (not a screen module — just markup)
app.insertAdjacentHTML('beforeend', /* html */`
    <div class="game-background">
        <img src="/assets/background/game_bg.svg" alt="" aria-hidden="true">
    </div>
`);

// Screens & overlays in DOM order
[
    Splash,
    LevelSelect,
    Tutorial,
    Game,
    OverlayMatch,   // overlays come after screens so they sit on top
    OverlayWrong,
    Victory,
].forEach(module => {
    app.insertAdjacentHTML('beforeend', module.template());
});

// ── 2. Screen registry (id → element) ───────────────────────
const SCREEN_MAP = {
    splash: document.getElementById('screen-splash'),
    levelSelect: document.getElementById('screen-level'),
    tutorial: document.getElementById('screen-tutorial'),
    game: document.getElementById('screen-game'),
    victory: document.getElementById('screen-victory'),
};

// ── 3. Navigate function ─────────────────────────────────────
/**
 * Deactivates all screens, then activates the requested one.
 * Overlays are NOT managed here; they manage themselves.
 * @param {keyof SCREEN_MAP} screenKey
 */
function navigate(screenKey) {
    Object.values(SCREEN_MAP).forEach(el => el?.classList.remove('active'));
    SCREEN_MAP[screenKey]?.classList.add('active');
}

// ── 4. Shared callbacks ───────────────────────────────────────
/**
 * Called by Tutorial and Victory screens to (re)start the board.
 */
function startGame() {
    Game.startGame();
}

/**
 * Called by Game.js after every successful match to check if
 * all pairs are done — and trigger victory if so.
 */
function onMatchContinue() {
    if (Game.isComplete()) {
        const stars = Game.calcStars();
        Victory.populate({ stars });
        navigate('victory');
    }
}

// ── 5. Initialise every screen with its deps ─────────────────
Splash.init({ navigate });

LevelSelect.init({ navigate });

Tutorial.init({ navigate, startGame });

Game.init({
    navigate, onVictory: () => {
        const stars = Game.calcStars();
        Victory.populate({ stars });
        navigate('victory');
    }
});

OverlayMatch.init({ onContinue: onMatchContinue });

OverlayWrong.init();

Victory.init({ navigate, startGame });

// ── 6. Boot ──────────────────────────────────────────────────
navigate('splash');
