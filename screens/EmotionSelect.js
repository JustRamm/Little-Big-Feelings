// ============================================================
//  screens/EmotionSelect.js — Screen: Choose Your Emotion
// ============================================================
import { state } from '../gameState.js';
import { sounds } from '../utils/sounds.js';
import { EMOTIONS_DATA } from '../gameData.js';

/**
 * Custom SVG Illustrations for each emotion
 * Designed to be vibrant, expressive, and fit the "Emo Charge" theme.
 */
const ILLUSTRATIONS = {
    anger: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="grad-anger" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#FF8A80" />
                    <stop offset="100%" style="stop-color:#D32F2F" />
                </radialGradient>
            </defs>
            <circle cx="100" cy="110" r="70" fill="url(#grad-anger)" />
            <path d="M70 80 Q100 60 130 80" stroke="white" stroke-width="8" fill="none" stroke-linecap="round" />
            <circle cx="75" cy="110" r="12" fill="white" />
            <circle cx="125" cy="110" r="12" fill="white" />
            <circle cx="75" cy="110" r="5" fill="#333" />
            <circle cx="125" cy="110" r="5" fill="#333" />
            <path d="M85 145 Q100 130 115 145" stroke="white" stroke-width="8" fill="none" stroke-linecap="round" />
            <path d="M90 40 L110 40 L100 10 Z" fill="#FFC107" />
        </svg>
    `,
    sadness: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-sad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#90CAF9" />
                    <stop offset="100%" style="stop-color:#1976D2" />
                </linearGradient>
            </defs>
            <path d="M40 140 Q40 80 100 80 Q160 80 160 140 Z" fill="url(#grad-sad)" />
            <circle cx="100" cy="140" r="60" fill="url(#grad-sad)" />
            <circle cx="80" cy="130" r="8" fill="white" />
            <circle cx="120" cy="130" r="8" fill="white" />
            <path d="M85 160 Q100 175 115 160" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" />
            <path d="M150 160 Q155 180 150 190" stroke="#BBDEFB" stroke-width="4" fill="none" />
        </svg>
    `,
    anxiety: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="grad-anx" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#E1BEE7" />
                    <stop offset="100%" style="stop-color:#7B1FA2" />
                </radialGradient>
            </defs>
            <rect x="50" y="50" width="100" height="100" rx="40" fill="url(#grad-anx)" />
            <circle cx="80" cy="90" r="15" fill="white" />
            <circle cx="120" cy="90" r="15" fill="white" />
            <path d="M72 90 Q80 82 88 90" stroke="#333" stroke-width="2" fill="none" />
            <path d="M112 90 Q120 82 128 90" stroke="#333" stroke-width="2" fill="none" />
            <path d="M80 125 Q100 120 120 125" stroke="white" stroke-width="8" fill="none" stroke-linecap="round" />
            <circle cx="40" cy="60" r="5" fill="#BA68C8" opacity="0.6" />
            <circle cx="160" cy="150" r="8" fill="#BA68C8" opacity="0.6" />
        </svg>
    `,
    loneliness: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="grad-lone" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#FFF59D" />
                    <stop offset="100%" style="stop-color:#FBC02D" />
                </radialGradient>
            </defs>
            <path d="M100 30 L120 80 L170 80 L130 110 L150 160 L100 130 L50 160 L70 110 L30 80 L80 80 Z" fill="url(#grad-lone)" />
            <circle cx="85" cy="95" r="6" fill="#5D4037" />
            <circle cx="115" cy="95" r="6" fill="#5D4037" />
            <path d="M90 110 Q100 105 110 110" stroke="#5D4037" stroke-width="4" fill="none" stroke-linecap="round" />
        </svg>
    `,
    stress: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="grad-stress" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#C8E6C9" />
                    <stop offset="100%" style="stop-color:#388E3C" />
                </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="65" fill="url(#grad-stress)" />
            <circle cx="80" cy="90" r="10" fill="white" />
            <circle cx="120" cy="90" r="10" fill="white" />
            <path d="M75 125 L125 125" stroke="white" stroke-width="8" stroke-linecap="round" />
            <path d="M40 80 Q30 60 50 40" stroke="#81C784" stroke-width="6" fill="none" />
            <path d="M160 80 Q170 60 150 40" stroke="#81C784" stroke-width="6" fill="none" />
        </svg>
    `
};

export function template() {
    const emotions = Object.values(EMOTIONS_DATA);

    const cardsHtml = emotions.map(emo => `
        <button class="emotion-illustrative-btn" data-emotion="${emo.id}" style="--emo-color: ${emo.color}">
            <div class="emo-illustration-wrap">
                ${ILLUSTRATIONS[emo.id] || ''}
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
                <h2 class="premium-title">Which feeling shall we explore?</h2>
                <p class="premium-subtitle">Pick an emotion character to begin your journey!</p>
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
        btn.addEventListener('click', () => {
            sounds.click();
            state.selectedEmotion = btn.dataset.emotion;
            navigate('levelSelect');
        });
    });
}

