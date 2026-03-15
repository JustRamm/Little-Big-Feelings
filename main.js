// ============================================================
//  main.js — App Orchestrator  (v2)
//
//  Responsibilities:
//    1. Import every screen module
//    2. Inject each screen's HTML into #app
//    3. Own the navigate() function + onShow hook pattern
//    4. Wire every screen's init() with the deps it needs
//    5. Boot: splash screen
// ============================================================

import * as Splash from './screens/Splash.js';
import * as NameEntry from './screens/NameEntry.js';
import * as EmotionSelect from './screens/EmotionSelect.js';
import * as LevelSelect from './screens/LevelSelect.js';
import * as Tutorial from './screens/Tutorial.js';
import * as Game from './screens/Game.js';
import * as OverlayMatch from './screens/OverlayMatch.js';
import * as BreathingBuddy from './screens/BreathingBuddy.js';
import * as Victory from './screens/Victory.js';
import * as Settings from './screens/Settings.js';
import * as OverlayWrong from './screens/OverlayWrong.js';
import * as Journal from './screens/Journal.js';
import * as MoodBattery from './screens/MoodBattery.js';
import * as CopingAlphabet from './screens/CopingAlphabet.js';

// ── 1. Mount all templates into #app ─────────────────────────
const app = document.getElementById('app');

app.insertAdjacentHTML('beforeend', /* html */`
    <div class="game-background">
        <img src="assets/background/game_bg.svg" alt="" aria-hidden="true">
    </div>
`);

// Screens in DOM order (overlays last so they layer on top)
[
    Splash,
    NameEntry,
    EmotionSelect,
    LevelSelect,
    Tutorial,
    Game,
    Settings,
    OverlayMatch,
    OverlayWrong,
    Journal,
    BreathingBuddy,
    Victory,
    MoodBattery,
    CopingAlphabet,
].forEach(m => app.insertAdjacentHTML('beforeend', m.template()));

// ── 2. Screen registry ────────────────────────────────────────
// Maps logical key → DOM element
const SCREEN_MAP = {
    splash: document.getElementById('screen-splash'),
    nameEntry: document.getElementById('screen-name'),
    emotionSelect: document.getElementById('screen-emotion'),
    levelSelect: document.getElementById('screen-level'),
    tutorial: document.getElementById('screen-tutorial'),
    game: document.getElementById('screen-game'),
    settings: document.getElementById('screen-settings'),
    journal: document.getElementById('screen-journal'),
    victory: document.getElementById('screen-victory'),
    moodBattery: document.getElementById('screen-mood-battery'),
    alphabetGame: document.getElementById('screen-alphabet-game'),
};

// Maps logical key → module (for onShow hook)
const SCREEN_MODULES = {
    nameEntry: NameEntry,
    emotionSelect: EmotionSelect,
    levelSelect: LevelSelect,
    settings: Settings,
    journal: Journal,
};

// ── 3. navigate() ─────────────────────────────────────────────
/**
 * Deactivates all screens, activates the target, and runs its onShow() hook.
 * Overlays (OverlayMatch, BreathingBuddy) manage themselves separately.
 * @param {string} key - must be a key in SCREEN_MAP
 */
function navigate(key) {
    Object.values(SCREEN_MAP).forEach(el => el?.classList.remove('active'));
    SCREEN_MAP[key]?.classList.add('active');

    // Run screen's onShow() if it exports one
    SCREEN_MODULES[key]?.onShow?.();

    // Re-initialize Lucide icons for the new content
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// ── 4. Shared callbacks ───────────────────────────────────────
function startGame() {
    Game.startGame();
}

/** Called by OverlayMatch "Keep Going!" — triggers victory if all pairs done */
function onMatchContinue() {
    if (Game.isComplete()) {
        const stars = Game.calcStars();
        Victory.populate({ stars });
        navigate('victory');
    }
}

// ── 5. Wire every screen ─────────────────────────────────────
Splash.init({ navigate });

NameEntry.init({ navigate });

EmotionSelect.init({ navigate });

LevelSelect.init({ navigate });

Tutorial.init({ navigate, startGame });

Game.init({
    navigate,
    onVictory: () => {
        const stars = Game.calcStars();
        Victory.populate({ stars });
        navigate('victory');
    },
});

Settings.init({ navigate });

Journal.init({ navigate });

OverlayMatch.init({ onContinue: onMatchContinue });

OverlayWrong.init();

BreathingBuddy.init();

Victory.init({ navigate, startGame });

MoodBattery.init({ navigate });

CopingAlphabet.init({ navigate });

// ── 6. Boot ───────────────────────────────────────────────────
navigate('splash');
