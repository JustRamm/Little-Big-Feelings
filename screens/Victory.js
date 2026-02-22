// ============================================================
//  screens/Victory.js — Screen 5: Victory / End of Round
// ============================================================
import { state } from '../gameState.js';
import { LEVELS } from '../gameData.js';
import { saveScore } from '../utils/storage.js';
import { sounds } from '../utils/sounds.js';

// Star-based message variations — from "Recharge Without Charge" by Mind Empowered
const MESSAGES = {
    3: "You are BRAVER than you believe, STRONGER than you seem, and SMARTER than you think!",
    2: "This feeling won't last forever — and neither will challenges. You handled it well!",
    1: "I have survived other tough times before and I will be resilient this time too. Keep going!",
};

function renderStars(count) {
    let html = '';
    for (let i = 0; i < 3; i++) {
        const src = i < count ? 'assets/ui/star_gold.svg' : 'assets/ui/star_grey.svg';
        html += `<img src="${src}" class="ui-star" alt="Star">`;
    }
    return html;
}

export function template() {
    return /* html */`
    <section id="screen-victory" class="screen" aria-label="Victory Screen">
        <div class="victory-content">

            <div class="confetti-container" aria-hidden="true"></div>

            <h2 class="victory-title">Amazing Job!</h2>

            <div class="victory-stars-display" id="victory-stars" aria-label="Stars earned"></div>

            <p class="victory-star-message" id="victory-star-msg"></p>

            <div class="victory-stats-grid">
                <div class="victory-stat">
                    <div class="victory-stat-icon">
                        <img src="assets/ui/stat_pairs.svg" alt="Pairs">
                    </div>
                    <div class="victory-stat-value" id="victory-pairs">0</div>
                    <div class="victory-stat-label">Pairs Found</div>
                </div>
                <div class="victory-stat">
                    <div class="victory-stat-icon">
                        <img src="assets/ui/stat_tries.svg" alt="Tries">
                    </div>
                    <div class="victory-stat-value" id="victory-attempts">0</div>
                    <div class="victory-stat-label">Total Tries</div>
                </div>
                <div class="victory-stat">
                    <div class="victory-stat-icon">
                        <img src="assets/ui/stat_level.svg" alt="Level">
                    </div>
                    <div class="victory-stat-value" id="victory-level">Easy</div>
                    <div class="victory-stat-label">Level</div>
                </div>
            </div>

            <p class="victory-message">
                You learned all about emotions today! Amazing work!
            </p>

            <div class="victory-buttons">
                <button id="btn-next-level" class="btn-primary"   type="button">
                    <span>Next Level</span>
                    <img src="assets/ui/arrow_next.svg" alt="" class="btn-img-icon">
                </button>
                <button id="btn-change-level" class="btn-secondary" type="button">
                    <span>Try Another Level</span>
                </button>
                <button id="btn-change-emotion" class="btn-secondary" type="button">
                    <span>New Emotion</span>
                </button>
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
 * Fill in results + trigger celebratory effects.
 * @param {{ stars: number }} results
 */
export function populate({ stars }) {
    // Save to localStorage (only if better score)
    saveScore(state.currentLevel, { stars, attempts: state.totalAttempts });

    // Stars display
    document.getElementById('victory-stars').innerHTML = renderStars(stars);

    // Dynamic message
    document.getElementById('victory-star-msg').textContent = MESSAGES[stars] ?? MESSAGES[1];

    // Stats
    document.getElementById('victory-pairs').textContent = state.matchedCount / 2;
    document.getElementById('victory-attempts').textContent = state.totalAttempts;
    document.getElementById('victory-level').textContent = LEVELS[state.currentLevel].label;

    // Show/hide Next Level button via class (no inline style)
    const nextBtn = document.getElementById('btn-next-level');
    nextBtn.classList.toggle('btn-hidden', state.currentLevel >= 3);

    spawnConfetti();
    sounds.victory();

    // Narrate for children
    if ('speechSynthesis' in window && state.speechEnabled) {
        const text = `Amazing Job! You earned ${stars} stars. ${MESSAGES[stars] ?? MESSAGES[1]}`;
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = 1.1;
        msg.pitch = 1.1;
        window.speechSynthesis.speak(msg);
    }
}

/**
 * @param {{ navigate: (screen: string) => void, startGame: () => void }} deps
 */
export function init({ navigate, startGame }) {
    document.getElementById('btn-next-level').addEventListener('click', () => {
        sounds.click();
        if (state.currentLevel < 3) {
            state.currentLevel++;
            navigate('game');
            startGame();
        } else {
            navigate('levelSelect');
        }
    });

    document.getElementById('btn-change-level').addEventListener('click', () => {
        sounds.click();
        navigate('levelSelect');
    });

    document.getElementById('btn-change-emotion').addEventListener('click', () => {
        sounds.click();
        navigate('emotionSelect');
    });
}
