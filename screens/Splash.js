// ============================================================
//  screens/Splash.js — Screen 1: Title / Splash
// ============================================================
import { loadPlayer, loadSettings } from '../utils/storage.js';
import { sounds } from '../utils/sounds.js';
import { state } from '../gameState.js';

export function template() {
    return /* html */`
    <section id="screen-splash" class="screen active" aria-label="Splash Screen">
        <div class="splash-content">
            <div class="logo-container">
                <img src="/assets/brand/logo.svg" alt="Emo Charge Logo" class="game-logo bounce-anim">
            </div>
            <h1 class="game-title">Emo<br><span>Charge</span></h1>
            <button id="btn-play" class="btn-primary" type="button">Start Your Journey</button>
            <p class="tagline">Power Up Your Emotional Intelligence!</p>
            <p class="splash-credit">Based on <strong>Recharge Without Charge</strong> by Mind Empowered</p>
        </div>
    </section>`;
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    document.getElementById('btn-play').addEventListener('click', () => {
        sounds.click();

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
            navigate('levelSelect');
        } else {
            navigate('nameEntry');
        }
    });
}
