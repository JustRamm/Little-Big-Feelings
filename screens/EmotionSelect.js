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
                    <button id="btn-mb-shortcut" class="mini-game-badge mb-badge" title="Mood Buddy Game" type="button">
                        <svg viewBox="0 0 100 100" class="game-badge-svg">
                            <circle cx="50" cy="50" r="45" fill="#FFD54F" />
                            <circle cx="50" cy="50" r="38" fill="white" opacity="0.3" />
                            <path d="M50 20 L60 45 L85 45 L65 60 L75 85 L50 70 L25 85 L35 60 L15 45 L40 45 Z" fill="#F57C00" />
                            <path d="M45 45 L50 30 L55 45 Z" fill="white" opacity="0.6" />
                        </svg>
                        <span>Mood Buddy</span>
                    </button>
                    <button id="btn-az-shortcut" class="mini-game-badge az-badge" title="A-Z Rush Game" type="button">
                        <svg viewBox="0 0 100 100" class="game-badge-svg">
                            <rect x="10" y="25" width="80" height="50" rx="15" fill="#4FC3F7" />
                            <circle cx="25" cy="50" r="8" fill="white" opacity="0.5" />
                            <rect x="60" y="42" width="20" height="6" rx="3" fill="white" />
                            <rect x="67" y="35" width="6" height="20" rx="3" fill="white" />
                            <text x="50" y="90" text-anchor="middle" font-family="Outfit" font-weight="800" font-size="20" fill="#0288D1">A-Z</text>
                        </svg>
                        <span>A-Z Rush</span>
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

    document.getElementById('btn-mb-shortcut').addEventListener('click', () => {
        sounds.click();
        navigate('moodBattery');
    });

    document.getElementById('btn-az-shortcut').addEventListener('click', () => {
        sounds.click();
        navigate('alphabetGame');
    });
}

