// ============================================================
//  screens/Splash.js — Screen 1: Title / Splash
// ============================================================
import { loadPlayer, loadSettings, loadUnlockedInsights } from '../utils/storage.js';
import { sounds } from '../utils/sounds.js';
import { state } from '../gameState.js';
import { EMOTIONS_DATA, LEVELS } from '../gameData.js';

export function template() {
    return /* html */`
    <section id="screen-splash" class="screen active" aria-label="Splash Screen">
        <div class="splash-background-elements" aria-hidden="true">
            <div class="floating-shape shape-1"><i data-lucide="heart"></i></div>
            <div class="floating-shape shape-2"><i data-lucide="zap"></i></div>
            <div class="floating-shape shape-3"><i data-lucide="smile"></i></div>
            <div class="floating-shape shape-4"><i data-lucide="battery"></i></div>
            <div class="floating-shape shape-5"><i data-lucide="star"></i></div>
            <div class="floating-shape shape-6"><i data-lucide="heart"></i></div>
        </div>

        <div class="splash-content">
            <div class="logo-wrapper">
                <div class="logo-burst"></div>
                <div class="logo-container">
                    <img src="assets/brand/logo.svg" alt="Emo Charge Logo" class="game-logo bounce-anim">
                </div>
            </div>
            
            <div class="title-group">
                <h1 class="game-title">Emo<br><span>Charge</span></h1>
                <p class="tagline">Power Up Your Emotional Intelligence!</p>
            </div>

            <div class="splash-actions">
                <div id="splash-preloader" class="splash-preloader">
                    <div class="preloader-bar">
                        <div id="preloader-fill" class="preloader-fill"></div>
                    </div>
                    <p id="preloader-status">Charging Emotions...</p>
                </div>
                <button id="btn-play" class="btn-primary pulse-btn hidden" type="button">
                    <span>Start Your Journey</span>
                    <i data-lucide="play" class="btn-icon-inline"></i>
                </button>
            </div>

            <div class="splash-footer">
                <p class="splash-credit">Based on <strong>Recharge Without Charge</strong> by Mind Empowered</p>
                <div class="brand-dots">
                    <span class="dot pink"></span>
                    <span class="dot blue"></span>
                    <span class="dot yellow"></span>
                </div>
            </div>
        </div>
    </section>`;
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    document.getElementById('btn-play').addEventListener('click', () => {
        sounds.click();
        sounds.startMusic();

        // Restore saved settings
        const settings = loadSettings();
        if (settings) {
            state.soundEnabled = settings.soundEnabled !== false;
            state.speechEnabled = settings.speechEnabled !== false;
            sounds.setEnabled(state.soundEnabled);
        }

        // Restore insights
        state.unlockedInsights = loadUnlockedInsights();

        // Always go to name entry so player can confirm/change identity
        const player = loadPlayer();
        if (player) {
            state.playerName = player.name;
            state.playerAvatar = player.avatar;
        }
        navigate('nameEntry');
    });

    _startPreloading();
}

/** 
 * Gathers all unique image assets from gameData and preloads them.
 */
async function _startPreloading() {
    const assets = new Set([
        'assets/brand/logo.svg',
        'assets/background/game_bg.svg',
    ]);

    // Extract all image paths from EMOTIONS_DATA
    Object.values(EMOTIONS_DATA).forEach(emo => {
        assets.add(emo.icon);
        emo.pairs.forEach(pair => {
            assets.add(pair.emotion.img);
            assets.add(pair.action.img);
        });
    });

    // Extract from LEVELS
    Object.values(LEVELS).forEach(lvl => assets.add(lvl.icon));

    const assetArray = Array.from(assets);
    let loaded = 0;
    const fill = document.getElementById('preloader-fill');
    const status = document.getElementById('preloader-status');
    const btn = document.getElementById('btn-play');
    const loader = document.getElementById('splash-preloader');

    const updateProgress = () => {
        loaded++;
        const pct = Math.round((loaded / assetArray.length) * 100);
        if (fill) fill.style.width = `${pct}%`;
        if (status) status.textContent = `Charging: ${pct}%`;

        if (loaded >= assetArray.length) {
            setTimeout(() => {
                loader?.classList.add('hidden');
                btn?.classList.remove('hidden');
            }, 500);
        }
    };

    assetArray.forEach(path => {
        const img = new Image();
        img.onload = updateProgress;
        img.onerror = updateProgress; // Don't block if one fails
        img.src = path;
    });
}
