// ============================================================
//  screens/EmotionSelect.js — Screen: Choose Your Emotion
// ============================================================
import { state } from '../gameState.js';
import { sounds } from '../utils/sounds.js';
import { EMOTIONS_DATA } from '../gameData.js';

export function template() {
    const emotions = Object.values(EMOTIONS_DATA);

    const cardsHtml = emotions.map(emo => `
        <button class="emotion-card" data-emotion="${emo.id}" style="--emo-color: ${emo.color}">
            <div class="emotion-card-inner">
                <div class="emotion-icon-circle">
                    <img src="${emo.icon}" alt="${emo.name}">
                </div>
                <h3>${emo.name}</h3>
                <p>${emo.description}</p>
            </div>
            <div class="emotion-selection-border"></div>
        </button>
    `).join('');

    return /* html */`
    <section id="screen-emotion" class="screen" aria-label="Emotion Select">
        <div class="emotion-select-container">
            <header class="emotion-header">
                <h2>Which feeling shall we explore?</h2>
                <p>Pick an emotion to learn how it works and how to handle it!</p>
            </header>

            <div class="emotion-grid">
                ${cardsHtml}
            </div>
        </div>
    </section>`;
}

export function onShow() {
    // Potentially refresh something if needed
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    const grid = document.getElementById('screen-emotion');
    if (!grid) return;

    grid.querySelectorAll('.emotion-card').forEach(btn => {
        btn.addEventListener('click', () => {
            sounds.click();
            state.selectedEmotion = btn.dataset.emotion;
            navigate('levelSelect');
        });
    });
}
