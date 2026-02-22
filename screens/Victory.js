// ============================================================
//  screens/Victory.js — Screen 5: Victory / End of Round
// ============================================================
import { state } from '../gameState.js';
import { LEVELS } from '../gameData.js';

export function template() {
    return /* html */`
    <section id="screen-victory" class="screen" aria-label="Victory Screen">
        <div class="victory-content">

            <!-- Confetti is spawned here by spawnConfetti() -->
            <div class="confetti-container" aria-hidden="true"></div>

            <h2 class="victory-title">🎊 Amazing Job! 🎊</h2>

            <!-- Star rating (filled by populate()) -->
            <div class="victory-stars-display" id="victory-stars" aria-label="Stars earned">⭐⭐⭐</div>

            <div class="victory-stats-grid">
                <div class="victory-stat">
                    <div class="victory-stat-icon">🎯</div>
                    <div class="victory-stat-value" id="victory-pairs">0</div>
                    <div class="victory-stat-label">Pairs Found</div>
                </div>
                <div class="victory-stat">
                    <div class="victory-stat-icon">🔢</div>
                    <div class="victory-stat-value" id="victory-attempts">0</div>
                    <div class="victory-stat-label">Total Tries</div>
                </div>
                <div class="victory-stat">
                    <div class="victory-stat-icon">🏆</div>
                    <div class="victory-stat-value" id="victory-level">Easy</div>
                    <div class="victory-stat-label">Level</div>
                </div>
            </div>

            <p class="victory-message">
                You learned all about emotions today! Amazing work! 🌈
            </p>

            <div class="victory-buttons">
                <button id="btn-next-level"  class="btn-primary">Next Level ➡️</button>
                <button id="btn-play-again"  class="btn-secondary">Choose Level 🗂️</button>
            </div>
        </div>
    </section>`;
}

// ── Confetti ─────────────────────────────────────────────────
function spawnConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#FF80AB', '#FFD54F', '#4FC3F7', '#AED581', '#CE93D8', '#FF8A65', '#80DEEA'];
    const shapes = ['●', '■', '▲', '★', '♦'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        piece.style.cssText = [
            `left:${Math.random() * 100}%`,
            `color:${colors[Math.floor(Math.random() * colors.length)]}`,
            `font-size:${Math.random() * 18 + 10}px`,
            `animation-delay:${Math.random() * 1.5}s`,
            `animation-duration:${Math.random() * 2 + 2}s`,
        ].join(';');
        container.appendChild(piece);
    }
}

/**
 * Populate the victory screen with results and trigger confetti.
 * @param {{ stars: number }} results
 */
export function populate({ stars }) {
    document.getElementById('victory-stars').textContent =
        '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    document.getElementById('victory-pairs').textContent = state.matchedCount / 2;
    document.getElementById('victory-attempts').textContent = state.totalAttempts;
    document.getElementById('victory-level').textContent = LEVELS[state.currentLevel].label;

    const nextBtn = document.getElementById('btn-next-level');
    nextBtn.style.display = state.currentLevel < 3 ? 'inline-block' : 'none';

    spawnConfetti();
}

/**
 * @param {{
 *   navigate:   (screen: string) => void,
 *   startGame:  () => void
 * }} deps
 */
export function init({ navigate, startGame }) {
    document.getElementById('btn-next-level').addEventListener('click', () => {
        if (state.currentLevel < 3) {
            state.currentLevel++;
            navigate('game');
            startGame();
        } else {
            navigate('levelSelect');
        }
    });

    document.getElementById('btn-play-again').addEventListener('click', () => {
        navigate('levelSelect');
    });
}
