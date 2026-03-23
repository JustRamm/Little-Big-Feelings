// ============================================================
//  screens/EmotionSelect.js — Screen: Choose Your Emotion
// ============================================================
import { state } from '../gameState.js';
import { sounds } from '../utils/sounds.js';
import { EMOTIONS_DATA } from '../gameData.js';
import { speakText } from '../utils/accessibility.js';

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
                <div class="header-top-row">
                    <div class="emotion-left-actions">
                        <button id="btn-emotion-journal" class="btn-icon circle-btn" aria-label="Open Journal" title="Journal" type="button">
                            <i data-lucide="book-open"></i>
                        </button>
                    </div>
                    
                    <div class="emotion-header-text">
                        <h2 class="premium-title">Which feeling shall we explore?</h2>
                        <p class="premium-subtitle">Pick an emotion character to begin your journey!</p>
                    </div>

                    <div class="emotion-top-actions">
                        <button id="btn-emotion-settings" class="btn-icon circle-btn" aria-label="Open Settings" title="Settings" type="button">
                            <i data-lucide="settings"></i>
                        </button>
                    </div>
                </div>
                <!-- Mini-game Shortcuts -->
                <div class="mini-game-shortcuts">
                    <button id="btn-animo-shortcut" class="mini-game-badge mb-badge" title="Animo Adventure" type="button">
                        <svg viewBox="0 0 100 100" class="game-badge-svg">
                            <defs>
                                <radialGradient id="eyeShine" cx="30%" cy="30%" r="50%">
                                    <stop offset="0%" stop-color="white" />
                                    <stop offset="100%" stop-color="white" stop-opacity="0" />
                                </radialGradient>
                            </defs>
                            <circle cx="50" cy="50" r="48" fill="#FFF9E6" />
                            <!-- Puppy Ears -->
                            <path d="M20,45 Q5,35 15,15 Q30,5 40,25 Z" fill="#D7CCC8" transform="rotate(-10, 30, 30)" />
                            <path d="M80,45 Q95,35 85,15 Q70,5 60,25 Z" fill="#D7CCC8" transform="rotate(10, 70, 30)" />
                            <!-- Puppy Face -->
                            <circle cx="50" cy="55" r="32" fill="#EFEBE9" />
                            <!-- Eyes -->
                            <circle cx="38" cy="50" r="6" fill="#3E2723" />
                            <circle cx="36" cy="48" r="2" fill="white" />
                            <circle cx="62" cy="50" r="6" fill="#3E2723" />
                            <circle cx="60" cy="48" r="2" fill="white" />
                            <!-- Nose & Mouth -->
                            <circle cx="50" cy="62" r="4" fill="#5D4037" />
                            <path d="M44,70 Q50,78 56,70" stroke="#5D4037" stroke-width="2" fill="none" stroke-linecap="round" />
                            <!-- Rosy Cheeks -->
                            <circle cx="30" cy="62" r="6" fill="#FF80AB" opacity="0.3" />
                            <circle cx="70" cy="62" r="6" fill="#FF80AB" opacity="0.3" />
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
                    <button id="btn-mixer-shortcut" class="mini-game-badge mixer-badge" title="Feeling Fusion Lab" type="button">
                        <svg viewBox="0 0 100 100" class="game-badge-svg">
                            <path d="M30,80 Q50,95 70,80 L65,40 Q65,25 50,15 Q35,25 35,40 Z" fill="#FF80AB" />
                            <rect x="42" y="10" width="16" height="15" rx="4" fill="#607D8B" />
                            <circle cx="40" cy="65" r="4" fill="white" opacity="0.6" />
                            <circle cx="60" cy="55" r="3" fill="white" opacity="0.4" />
                            <circle cx="50" cy="75" r="5" fill="white" opacity="0.5" />
                        </svg>
                        <span>Feeling Fusion</span>
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
            const emo = EMOTIONS_DATA[btn.dataset.emotion];
            if (emo && state.speechEnabled) speakText(emo.name);
            state.selectedEmotion = btn.dataset.emotion;
            navigate('levelSelect');
        });
    });


    document.getElementById('btn-animo-shortcut').addEventListener('click', () => {
        sounds.click();
        navigate('moodAnimo');
    });

    document.getElementById('btn-az-shortcut').addEventListener('click', () => {
        sounds.click();
        navigate('alphabetGame');
    });

    document.getElementById('btn-mixer-shortcut').addEventListener('click', () => {
        sounds.click();
        navigate('moodMixer');
    });

    document.getElementById('btn-emotion-settings').addEventListener('click', () => {
        sounds.click();
        navigate('settings');
    });

    document.getElementById('btn-emotion-journal').addEventListener('click', () => {
        sounds.click();
        navigate('journal');
    });
}

