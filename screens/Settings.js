// ============================================================
//  screens/Settings.js — Screen: App Settings
// ============================================================
import { loadSettings, saveSettings, loadPlayer, clearAll, resetScores } from '../utils/storage.js';
import { sounds } from '../utils/sounds.js';
import { state } from '../gameState.js';

export function template() {
    return /* html */`
    <section id="screen-settings" class="screen" aria-label="Settings">
        
        <div class="settings-container">
            <div class="settings-header">
                <button id="btn-settings-back" class="btn-icon settings-back-btn" aria-label="Back" type="button">
                    <i data-lucide="arrow-left"></i>
                </button>
                <h2 style="margin: 0;">Settings</h2>
            </div>

            <!-- Player Profile Card -->
            <div class="settings-card">
                <div class="settings-player-preview">
                    <div id="settings-avatar" class="settings-big-avatar"></div>
                    <div id="settings-name"   class="settings-player-name">Player</div>
                </div>
                <button id="btn-edit-profile" class="btn-secondary" type="button">
                    Edit Profile
                </button>
            </div>

            <!-- Options Card -->
            <div class="settings-card">
                <div class="settings-row">
                    <div class="settings-label">
                        <span class="settings-icon">
                            <i id="sound-icon-preview" data-lucide="volume-2"></i>
                        </span>
                        <div class="settings-label-text">
                            <div class="settings-label-title">Sound Effects</div>
                            <div class="settings-label-sub">Fun noises and music</div>
                        </div>
                    </div>
                    <button id="btn-sound-toggle" class="toggle-btn" aria-label="Toggle sound">
                        <div class="toggle-thumb"></div>
                    </button>
                </div>
            </div>

            <!-- Danger Zone -->
            <div class="settings-card settings-danger">
                <div class="settings-row">
                    <div class="settings-label">
                        <span class="settings-icon">
                            <i data-lucide="trash-2" style="color: #EF5350;"></i>
                        </span>
                        <div class="settings-label-text">
                            <div class="settings-label-title">Reset Progress</div>
                            <div class="settings-label-sub">Delete all scores and profile</div>
                        </div>
                    </div>
                    <button id="btn-clear-data" class="btn-danger" type="button">Reset</button>
                </div>
            </div>
        </div>

    </section>`;
}

/** Refresh the displayed values from localStorage — call every time this screen is shown */
export function onShow() {
    const player = loadPlayer();

    const avatarEl = document.getElementById('settings-avatar');
    const nameEl = document.getElementById('settings-name');

    if (avatarEl) {
        const avatar = player?.avatar || 'assets/avatars/avatar_1.svg';
        avatarEl.innerHTML = `<img src="${avatar}" alt="" style="width: 100%; height: 100%;">`;
    }
    if (nameEl) nameEl.textContent = player?.name ?? 'Player';

    // Sound toggle position
    _updateSoundUI(state.soundEnabled);
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    // Back to Level Select
    document.getElementById('btn-settings-back').addEventListener('click', () => {
        sounds.click();
        navigate('levelSelect');
    });

    // Edit profile → NameEntry
    document.getElementById('btn-edit-profile').addEventListener('click', () => {
        sounds.click();
        navigate('nameEntry');
    });

    // Sound toggle
    const soundBtn = document.getElementById('btn-sound-toggle');
    soundBtn.addEventListener('click', () => {
        const isCurrentlyOn = state.soundEnabled;
        const newVal = !isCurrentlyOn;

        state.soundEnabled = newVal;
        saveSettings({ soundEnabled: newVal });
        sounds.setEnabled(newVal);

        if (newVal) {
            sounds.click();
            sounds.startMusic();
        }
        _updateSoundUI(newVal);
    });

    // Reset all data
    document.getElementById('btn-clear-data').addEventListener('click', () => {
        if (!confirm('This will delete your name, avatar, and all level scores. Sure?')) return;
        clearAll();
        resetScores();
        state.playerName = 'Player';
        state.playerAvatar = 'assets/avatars/avatar_1.svg';
        sounds.setEnabled(true);
        navigate('nameEntry');
    });
}

function _updateSoundUI(on) {
    const btn = document.getElementById('btn-sound-toggle');
    const iconPreview = document.getElementById('sound-icon-preview');
    if (btn) {
        btn.classList.toggle('toggle-on', on);
        btn.setAttribute('aria-checked', on);
    }
    if (iconPreview) {
        iconPreview.setAttribute('data-lucide', on ? 'volume-2' : 'volume-x');
        if (window.lucide) window.lucide.createIcons();
    }
}
