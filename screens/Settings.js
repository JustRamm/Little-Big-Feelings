// ============================================================
//  screens/Settings.js — Screen: App Settings
// ============================================================
import { loadSettings, saveSettings, loadPlayer, clearAll, resetScores } from '../utils/storage.js';
import { sounds } from '../utils/sounds.js';
import { state } from '../gameState.js';
import { applyAccessibilitySettings } from '../utils/accessibility.js';

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

                <div class="settings-row">
                    <div class="settings-label">
                        <span class="settings-icon">
                            <i id="speech-icon-preview" data-lucide="message-square"></i>
                        </span>
                        <div class="settings-label-text">
                            <div class="settings-label-title">Voice Narration</div>
                            <div class="settings-label-sub">Read matches out loud</div>
                        </div>
                    </div>
                    <button id="btn-speech-toggle" class="toggle-btn" aria-label="Toggle narration">
                        <div class="toggle-thumb"></div>
                    </button>
                </div>
            </div>

            <!-- Accessibility Card -->
            <div class="settings-card">
                <div class="settings-header-small">
                    <i data-lucide="accessibility"></i>
                    <span>Accessibility</span>
                </div>
                
                <div class="settings-row">
                    <div class="settings-label">
                        <div class="settings-label-text">
                            <div class="settings-label-title">High Contrast</div>
                            <div class="settings-label-sub">Better visibility for icons</div>
                        </div>
                    </div>
                    <button id="btn-contrast-toggle" class="toggle-btn" aria-label="Toggle high contrast">
                        <div class="toggle-thumb"></div>
                    </button>
                </div>

                <div class="settings-row">
                    <div class="settings-label">
                        <div class="settings-label-text">
                            <div class="settings-label-title">Dyslexic Friendly Font</div>
                            <div class="settings-label-sub">Easier to read text</div>
                        </div>
                    </div>
                    <button id="btn-font-toggle" class="toggle-btn" aria-label="Toggle dyslexic font">
                        <div class="toggle-thumb"></div>
                    </button>
                </div>

                <div class="settings-row">
                    <div class="settings-label">
                        <div class="settings-label-text">
                            <div class="settings-label-title">Reduced Motion</div>
                            <div class="settings-label-sub">Turn off fast animations</div>
                        </div>
                    </div>
                    <button id="btn-motion-toggle" class="toggle-btn" aria-label="Toggle reduced motion">
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

export function onShow() {
    const player = loadPlayer();

    const avatarEl = document.getElementById('settings-avatar');
    const nameEl = document.getElementById('settings-name');

    if (avatarEl) {
        const avatar = player?.avatar || 'assets/animo/puppy/baby.svg';
        avatarEl.innerHTML = `<img src="${avatar}" alt="" style="width: 100%; height: 100%;">`;
    }
    if (nameEl) nameEl.textContent = player?.name ?? 'Player';

    // Refresh UI Toggles
    _updateToggleUI('btn-sound-toggle', state.soundEnabled);
    _updateToggleUI('btn-speech-toggle', state.speechEnabled);
    _updateToggleUI('btn-contrast-toggle', state.highContrast);
    _updateToggleUI('btn-font-toggle', state.dyslexicFont);
    _updateToggleUI('btn-motion-toggle', state.reducedMotion);
    
    // Update Icons
    _updateIconUI('sound-icon-preview', state.soundEnabled ? 'volume-2' : 'volume-x');
    _updateIconUI('speech-icon-preview', state.speechEnabled ? 'message-square' : 'message-square-off');
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    // Back to Previous Screen
    document.getElementById('btn-settings-back').addEventListener('click', () => {
        sounds.click();
        navigate(state.previousScreen || 'levelSelect');
    });

    // Edit profile → NameEntry
    document.getElementById('btn-edit-profile').addEventListener('click', () => {
        sounds.click();
        navigate('nameEntry');
    });

    // Sound toggle
    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        _save();
        sounds.setEnabled(state.soundEnabled);
        if (state.soundEnabled) {
            sounds.click();
            sounds.startMusic();
        }
        _updateToggleUI('btn-sound-toggle', state.soundEnabled);
        _updateIconUI('sound-icon-preview', state.soundEnabled ? 'volume-2' : 'volume-x');
    });

    // Speech toggle
    document.getElementById('btn-speech-toggle').addEventListener('click', () => {
        state.speechEnabled = !state.speechEnabled;
        _save();
        if (state.speechEnabled) sounds.click();
        _updateToggleUI('btn-speech-toggle', state.speechEnabled);
        _updateIconUI('speech-icon-preview', state.speechEnabled ? 'message-square' : 'message-square-off');
    });

    // Accessibility Toggles
    document.getElementById('btn-contrast-toggle').addEventListener('click', () => {
        state.highContrast = !state.highContrast;
        _handleA11yUpdate('btn-contrast-toggle', state.highContrast);
    });

    document.getElementById('btn-font-toggle').addEventListener('click', () => {
        state.dyslexicFont = !state.dyslexicFont;
        _handleA11yUpdate('btn-font-toggle', state.dyslexicFont);
    });

    document.getElementById('btn-motion-toggle').addEventListener('click', () => {
        state.reducedMotion = !state.reducedMotion;
        _handleA11yUpdate('btn-motion-toggle', state.reducedMotion);
    });

    // Reset all data
    document.getElementById('btn-clear-data').addEventListener('click', () => {
        if (!confirm('This will delete your name, avatar, and all level scores. Sure?')) return;
        clearAll();
        resetScores();
        state.playerName = 'Player';
        state.playerAvatar = 'assets/animo/puppy/baby.svg';
        sounds.setEnabled(true);
        navigate('nameEntry');
    });
}

function _handleA11yUpdate(btnId, val) {
    _save();
    sounds.click();
    _updateToggleUI(btnId, val);
    applyAccessibilitySettings();
}

function _save() {
    saveSettings({
        soundEnabled: state.soundEnabled,
        speechEnabled: state.speechEnabled,
        highContrast: state.highContrast,
        dyslexicFont: state.dyslexicFont,
        reducedMotion: state.reducedMotion
    });
}

function _updateToggleUI(id, on) {
    const btn = document.getElementById(id);
    if (btn) {
        btn.classList.toggle('toggle-on', on);
        btn.setAttribute('aria-checked', on);
    }
}

function _updateIconUI(id, iconName) {
    const el = document.getElementById(id);
    if (el) {
        el.setAttribute('data-lucide', iconName);
        if (window.lucide) window.lucide.createIcons();
    }
}
