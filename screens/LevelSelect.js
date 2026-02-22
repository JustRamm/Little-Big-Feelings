// ============================================================
//  screens/LevelSelect.js — Screen 2: Choose Difficulty
// ============================================================
import { state } from '../gameState.js';

export function template() {
    return /* html */`
    <section id="screen-level" class="screen" aria-label="Level Select">
        <div class="level-select-container">
            <h2>Choose Your Level</h2>
            <p class="level-intro">Pick how many feelings you want to discover today!</p>
            <div class="level-grid">

                <button class="level-btn" data-level="1" id="level-btn-1" aria-label="Easy level">
                    <div class="level-icon">🌱</div>
                    <div class="level-name">Easy</div>
                    <div class="level-detail">3 Pairs · No Timer</div>
                    <div class="level-stars">⭐⭐⭐</div>
                </button>

                <button class="level-btn" data-level="2" id="level-btn-2" aria-label="Medium level">
                    <div class="level-icon">🌻</div>
                    <div class="level-name">Medium</div>
                    <div class="level-detail">5 Pairs · No Timer</div>
                    <div class="level-stars">⭐⭐⭐</div>
                </button>

                <button class="level-btn" data-level="3" id="level-btn-3" aria-label="Hard level">
                    <div class="level-icon">🔥</div>
                    <div class="level-name">Hard</div>
                    <div class="level-detail">8 Pairs · No Timer</div>
                    <div class="level-stars">⭐⭐⭐</div>
                </button>

            </div>
        </div>
    </section>`;
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.currentLevel = parseInt(btn.dataset.level, 10);
            navigate('tutorial');
        });
    });
}
