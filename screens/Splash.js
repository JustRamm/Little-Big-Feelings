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
            <h1 class="game-title">Emotion<br><span>Match-Up!</span></h1>
            <div class="character-preview">
                <img
                    src="/assets/emotion/angry_monster_card.svg"
                    class="bounce-anim"
                    alt="Friendly emotion monster"
                >
            </div>
            <button id="btn-play" class="btn-primary" type="button">Play Now</button>
            <p class="tagline">Learn about feelings in a fun way!</p>
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
