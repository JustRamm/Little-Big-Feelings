// ============================================================
//  screens/Splash.js — Screen 1: Title / Splash
// ============================================================
import { loadPlayer, loadSettings } from '../utils/storage.js';
import { sounds } from '../utils/sounds.js';
import { state } from '../gameState.js';

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
                <button id="btn-play" class="btn-primary pulse-btn" type="button">
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
            sounds.setEnabled(state.soundEnabled);
        }

        // Route based on whether a profile exists
        const player = loadPlayer();
        if (player) {
            state.playerName = player.name;
            state.playerAvatar = player.avatar;
            navigate('emotionSelect');
        } else {
            navigate('nameEntry');
        }
    });
}
