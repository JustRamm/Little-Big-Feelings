// ============================================================
//  screens/LevelSelect.js — Screen 2: Choose Difficulty
// ============================================================
import { state } from '../gameState.js';
import { loadScores } from '../utils/storage.js';
import { sounds } from '../utils/sounds.js';

export function template() {
    return /* html */`
    <section id="screen-level" class="screen" aria-label="Level Select">

        <!-- Top bar: back button + settings gear -->
        <div class="level-top-bar">
            <button id="btn-level-back" class="btn-icon back-arrow" aria-label="Go back to emotion select" type="button">
                <i data-lucide="arrow-left"></i>
            </button>
            <div class="player-badge" id="player-badge">
                <span id="ls-avatar" class="player-badge-avatar"></span>
            </div>
            <button id="btn-settings" class="btn-icon settings-gear" aria-label="Open settings" type="button">
                <i data-lucide="settings"></i>
            </button>
        </div>

        <div class="level-select-container">
            <h2>Choose Your Level</h2>
            <p class="level-intro">How many feelings can you discover today?</p>

            <div class="level-grid">

                <!-- Easy -->
                <button class="level-btn" data-level="1" id="level-btn-1" type="button">
                    <div class="level-icon">
                        <i data-lucide="sprout" style="color: var(--green); width: 48px; height: 48px;"></i>
                    </div>
                    <div class="level-name">Beginner</div>
                    <div class="level-detail">3 Pairs · Core Emotions</div>
                    <div class="level-best" id="level-best-1">-</div>
                </button>

                <!-- Medium -->
                <button class="level-btn" data-level="2" id="level-btn-2" type="button">
                    <div class="level-icon">
                        <i data-lucide="flower" style="color: var(--yellow); width: 48px; height: 48px;"></i>
                    </div>
                    <div class="level-name">Intermediate</div>
                    <div class="level-detail">6 Pairs · Deeper Feelings</div>
                    <div class="level-best" id="level-best-2">-</div>
                </button>

                <!-- Hard -->
                <button class="level-btn" data-level="3" id="level-btn-3" type="button">
                    <div class="level-icon">
                        <i data-lucide="tree-pine" style="color: var(--orange); width: 48px; height: 48px;"></i>
                    </div>
                    <div class="level-name">Full Journey</div>
                    <div class="level-detail">12 Pairs · Complete Guide</div>
                    <div class="level-best" id="level-best-3">-</div>
                </button>

            </div>
        </div>
    </section>`;
}

function renderStars(count) {
    let html = '';
    for (let i = 0; i < 3; i++) {
        const activeClass = i < count ? 'star-active' : 'star-inactive';
        html += `<i data-lucide="star" class="ui-star ${activeClass}"></i>`;
    }
    return html;
}

/** Refresh player badge + best scores — called every time the screen becomes active */
export function onShow() {
    // Player badge
    const avatarContainer = document.getElementById('ls-avatar');
    if (avatarContainer) {
        const avatar = state.playerAvatar || 'assets/avatars/avatar_1.svg';
        avatarContainer.innerHTML = `<img src="${avatar}" alt="" style="width: 100%; height: 100%;">`;
    }

    // Best scores
    const scores = loadScores();
    [1, 2, 3].forEach(lvl => {
        const el = document.getElementById(`level-best-${lvl}`);
        if (!el) return;
        const s = scores[lvl];
        if (s) {
            el.innerHTML = renderStars(s.stars);
            el.classList.add('level-best-filled');
        } else {
            el.textContent = 'Not played yet';
            el.classList.remove('level-best-filled');
        }
    });
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sounds.click();
            state.currentLevel = parseInt(btn.dataset.level, 10);
            navigate('tutorial');
        });
    });

    document.getElementById('btn-settings').addEventListener('click', () => {
        sounds.click();
        navigate('settings');
    });

    document.getElementById('btn-level-back').addEventListener('click', () => {
        sounds.click();
        navigate('emotionSelect');
    });
}
