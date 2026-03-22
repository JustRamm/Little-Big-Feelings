// ============================================================
//  screens/EmotionSelect.js — Screen: Choose Your Emotion
// ============================================================
import { state } from '../gameState.js';
import { sounds } from '../utils/sounds.js';
import { EMOTIONS_DATA } from '../gameData.js';

/**
 * Custom SVG Illustrations for each emotion
 * Designed to be vibrant, expressive, and fit the "Little Big Feelings" theme.
 */
export function template() {
    const emotions = Object.values(EMOTIONS_DATA);

    const cardsHtml = emotions.map(emo => `
        <button class="emotion-illustrative-btn" data-emotion="${emo.id}" style="--emo-color: ${emo.color}">
            <div class="emo-illustration-wrap">
                <img src="${emo.icon}" alt="${emo.name}" class="emo-select-icon" />
            </div>
            <div class="emo-info">
                <h3>${emo.name}</h3>
                <p>${emo.description}</p>
            </div>
            <div class="emo-pulse"></div>
        </button>
    `).join('');

    return /* html */`
    <section id="screen-emotion" class="screen" aria-label="Emotion Select">
        <div class="emotion-select-container">
            <header class="emotion-header">
                <button id="btn-emotion-back" class="btn-icon back-arrow" aria-label="Go back to name entry" type="button">
                    <i data-lucide="arrow-left"></i>
                </button>
                <div class="emotion-header-text">
                    <h2 class="premium-title">Which feeling shall we explore?</h2>
                    <p class="premium-subtitle">Pick an emotion character to begin your journey!</p>
                </div>
                <!-- Mini-game Shortcuts -->
                <div class="mini-game-shortcuts">
                    <button id="btn-animo-shortcut" class="mini-game-badge mb-badge" title="Animo Adventure" type="button">
                        <svg viewBox="0 0 100 100" class="game-badge-svg">
                            <circle cx="50" cy="50" r="48" fill="#FFF9E6" />
                            <!-- Pet Paw (Kawaii Style) -->
                            <circle cx="35" cy="40" r="10" fill="#FF80AB" />
                            <circle cx="65" cy="40" r="10" fill="#FF80AB" />
                            <circle cx="50" cy="30" r="10" fill="#FF80AB" />
                            <path d="M50 85 Q20 85 20 60 Q20 45 50 45 Q80 45 80 60 Q80 85 50 85 Z" fill="#FF80AB" />
                            <circle cx="50" cy="65" r="5" fill="white" /> <!-- Tiny heart center -->
                        </svg>
                        <span>Animo Adventure</span>
                    </button>
                    <button id="btn-az-shortcut" class="mini-game-badge az-badge" title="A-Z Arcade Game" type="button">
                        <svg viewBox="0 0 100 100" class="game-badge-svg">
                            <rect x="10" y="25" width="80" height="50" rx="15" fill="#4FC3F7" />
                            <circle cx="25" cy="50" r="8" fill="white" opacity="0.5" />
                            <rect x="60" y="42" width="20" height="6" rx="3" fill="white" />
                            <rect x="67" y="35" width="6" height="20" rx="3" fill="white" />
                            <text x="50" y="90" text-anchor="middle" font-family="Outfit" font-weight="800" font-size="20" fill="#0288D1">A-Z</text>
                        </svg>
                        <span>A-Z Arcade</span>
                    </button>
                </div>
            </header>

            <div class="emotion-illustrative-grid">
                ${cardsHtml}
            </div>
        </div>
    </section>`;
}

export function onShow() {
    // Reveal animation logic if needed
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    const screen = document.getElementById('screen-emotion');
    if (!screen) return;

    screen.querySelectorAll('.emotion-illustrative-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            sounds.hover();
        });

        btn.addEventListener('click', () => {
            sounds.click();
            state.selectedEmotion = btn.dataset.emotion;
            navigate('levelSelect');
        });
    });

    document.getElementById('btn-emotion-back').addEventListener('click', () => {
        sounds.click();
        navigate('nameEntry');
    });

    document.getElementById('btn-animo-shortcut').addEventListener('click', () => {
        sounds.click();
        navigate('moodAnimo');
    });

    document.getElementById('btn-az-shortcut').addEventListener('click', () => {
        sounds.click();
        navigate('alphabetGame');
    });
}

