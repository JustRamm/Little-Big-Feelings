// ============================================================
//  screens/LevelSelect.js — Screen 2: Choose Difficulty
// ============================================================
import { state } from '../gameState.js';
import { loadScores } from '../utils/storage.js';
import { sounds } from '../utils/sounds.js';

export function template() {
    return /* html */`
    <section id="screen-level" class="screen" aria-label="Level Select">

        <!-- Top bar: player badge + settings gear -->
        <div class="level-top-bar">
            <div class="player-badge" id="player-badge">
                <span id="ls-avatar" class="player-badge-avatar">🐱</span>
                <span id="ls-name"   class="player-badge-name">Player</span>
            </div>
            <button id="btn-settings" class="btn-icon settings-gear" aria-label="Open settings" type="button">
                <img src="/assets/ui/settings.svg" alt="Settings">
            </button>
        </div>

        <div class="level-select-container">
            <h2>Choose Your Level</h2>
            <p class="level-intro">How many feelings can you discover today?</p>

            <div class="level-grid">

                <!-- Easy -->
                <button class="level-btn" data-level="1" id="level-btn-1" type="button">
                    <div class="level-icon">
                        <img src="/assets/ui/level_1.svg" alt="Easy">
                    </div>
                    <div class="level-name">Easy</div>
                    <div class="level-detail">3 Pairs · No Timer</div>
                    <div class="level-best" id="level-best-1">-</div>
                </button>

                <!-- Medium -->
                <button class="level-btn" data-level="2" id="level-btn-2" type="button">
                    <div class="level-icon">
                        <img src="/assets/ui/level_2.svg" alt="Medium">
                    </div>
                    <div class="level-name">Medium</div>
                    <div class="level-detail">5 Pairs · No Timer</div>
                    <div class="level-best" id="level-best-2">-</div>
                </button>

                <!-- Hard -->
                <button class="level-btn" data-level="3" id="level-btn-3" type="button">
                    <div class="level-icon">
                        <img src="/assets/ui/level_3.svg" alt="Hard">
                    </div>
                    <div class="level-name">Hard</div>
                    <div class="level-detail">8 Pairs · No Timer</div>
                    <div class="level-best" id="level-best-3">-</div>
                </button>

            </div>
        </div>
    </section>`;
}

function renderStars(count) {
    let html = '';
    for (let i = 0; i < 3; i++) {
        const src = i < count ? '/assets/ui/star_gold.svg' : '/assets/ui/star_grey.svg';
        html += `<img src="${src}" class="ui-star" alt="Star">`;
    }
    return html;
}

/** Refresh player badge + best scores — called every time the screen becomes active */
export function onShow() {
    // Player badge
    const avatarContainer = document.getElementById('ls-avatar');
    if (avatarContainer) {
        const avatar = state.playerAvatar || '/assets/avatars/avatar_1.svg';
        avatarContainer.innerHTML = `<img src="${avatar}" alt="" style="width: 100%; height: 100%;">`;
    }

    document.getElementById('ls-name').textContent = state.playerName || 'Player';

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
}
