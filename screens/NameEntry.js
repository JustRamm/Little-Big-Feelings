// ============================================================
//  screens/NameEntry.js — Screen: Player Profile Setup
// ============================================================
import { savePlayer, loadPlayer } from '../utils/storage.js';
import { state } from '../gameState.js';
import { sounds } from '../utils/sounds.js';

const AVATARS = [
    'assets/avatars/avatar_1.svg',
    'assets/avatars/avatar_2.svg',
    'assets/avatars/avatar_3.svg',
    'assets/avatars/avatar_4.svg',
    'assets/avatars/avatar_5.svg',
    'assets/avatars/avatar_6.svg',
    'assets/avatars/avatar_7.svg',
    'assets/avatars/avatar_8.svg',
    'assets/avatars/avatar_9.svg',
    'assets/avatars/avatar_10.svg',
    'assets/avatars/avatar_11.svg',
    'assets/avatars/avatar_12.svg',
];

export function template() {
    return /* html */`
    <section id="screen-name" class="screen" aria-label="Player Profile">
        <div class="name-entry-container">

            <h2 class="name-entry-title">Who's Playing?</h2>
            <p class="name-intro">Pick an avatar and tell us your name!</p>

            <!-- Avatar picker -->
            <div class="avatar-grid" id="avatar-grid" role="group" aria-label="Choose an avatar">
                ${AVATARS.map((a, i) => `
                    <button
                        class="avatar-btn${i === 0 ? ' selected' : ''}"
                        data-avatar="${a}"
                        id="avatar-${i}"
                        aria-label="Avatar ${i + 1}"
                        aria-pressed="${i === 0}"
                        type="button"
                    >
                        <img src="${a}" alt="">
                    </button>`).join('')}
            </div>

            <!-- Name input -->
            <div class="name-input-wrap">
                <input
                    type="text"
                    id="player-name-input"
                    class="name-input"
                    placeholder="Your name..."
                    maxlength="12"
                    autocomplete="off"
                    spellcheck="false"
                    aria-label="Enter your name (max 12 characters)"
                >
                <span class="name-char-count" id="name-char-count" aria-live="polite">0/12</span>
            </div>

            <!-- Actions -->
            <div class="name-entry-actions">
                <button id="btn-name-back" class="btn-secondary name-back-btn" type="button">Back</button>
                <button id="btn-name-continue" class="btn-primary" type="button" disabled>
                    Let's Play!
                </button>
            </div>

        </div>
    </section>`;
}

/** Pre-fill form if editing existing profile */
function prefill() {
    const saved = loadPlayer();
    if (!saved) return;

    const input = document.getElementById('player-name-input');
    if (input) {
        input.value = saved.name;
        input.dispatchEvent(new Event('input'));
    }

    if (saved.avatar) {
        document.querySelectorAll('.avatar-btn').forEach(b => {
            const isThis = b.dataset.avatar === saved.avatar;
            b.classList.toggle('selected', isThis);
            b.setAttribute('aria-pressed', String(isThis));
        });
    }
}

/** Called by main.js whenever this screen becomes active */
export function onShow() {
    prefill();
    // Show back-button only if a profile already exists (i.e. editing, not first-time setup)
    const backBtn = document.getElementById('btn-name-back');
    if (backBtn) {
        backBtn.style.display = loadPlayer() ? 'inline-block' : 'none';
    }
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    let selectedAvatar = AVATARS[0];

    // Avatar selection
    document.getElementById('avatar-grid').addEventListener('click', e => {
        const btn = e.target.closest('.avatar-btn');
        if (!btn) return;
        sounds.click();
        document.querySelectorAll('.avatar-btn').forEach(b => {
            b.classList.remove('selected');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
        selectedAvatar = btn.dataset.avatar;
    });

    // Name input — live char count + enable button
    const input = document.getElementById('player-name-input');
    const counter = document.getElementById('name-char-count');
    const continueBtn = document.getElementById('btn-name-continue');

    input.addEventListener('input', () => {
        counter.textContent = `${input.value.length}/12`;
        continueBtn.disabled = input.value.trim().length === 0;
    });

    // Continue
    continueBtn.addEventListener('click', () => {
        const name = input.value.trim();
        if (!name) return;
        sounds.click();

        const player = { name, avatar: selectedAvatar };
        savePlayer(player);
        state.playerName = name;
        state.playerAvatar = selectedAvatar;
        navigate('emotionSelect');
    });

    // Back (only visible when a profile exists)
    document.getElementById('btn-name-back').addEventListener('click', () => {
        sounds.click();
        navigate('splash');
    });
}
