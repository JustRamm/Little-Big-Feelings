// ============================================================
//  screens/Journal.js — Screen: Collection of Unlocked Insights
// ============================================================
import { state } from '../gameState.js';
import { sounds } from '../utils/sounds.js';
import { EMOTIONS_DATA } from '../gameData.js';
import { loadUnlockedInsights } from '../utils/storage.js';

export function template() {
    return /* html */`
    <section id="screen-journal" class="screen" aria-label="Knowledge Journal">
        <div class="journal-container">
            <header class="journal-header">
                <button id="btn-journal-back" class="btn-icon" aria-label="Back" type="button">
                    <i data-lucide="arrow-left"></i>
                </button>
                <div class="journal-title-wrap">
                    <h2 class="premium-title">My Feeling Journal</h2>
                    <p class="premium-subtitle">Your collection of emotional tools and insights</p>
                </div>
                <div class="journal-stat-badge">
                    <span id="journal-progress-text">0/50</span>
                    <i data-lucide="book-open"></i>
                </div>
            </header>

            <div class="journal-tabs" id="journal-tabs">
                <!-- Populated by JS -->
            </div>

            <div class="journal-grid-scroll">
                <div id="journal-grid" class="journal-grid">
                    <!-- Populated by JS -->
                </div>
            </div>

            <!-- Master Certificate (Shown only when 100% complete) -->
            <div id="mastery-certificate" class="mastery-certificate hidden">
                <div class="cert-border">
                    <div class="cert-content">
                        <i data-lucide="award" class="cert-main-icon"></i>
                        <h3>Emotion Champion Certificate</h3>
                        <p class="cert-name-line">Presented to <strong id="cert-player-name">Player</strong></p>
                        <p class="cert-text">For successfully uncovering 50 emotional insights and mastering the recharge journey.</p>
                        <div class="cert-footer">
                            <div class="cert-seal">
                                <img src="assets/brand/logo.svg" alt="Seal">
                            </div>
                            <div class="cert-sig">
                                <p>Mind Empowered</p>
                                <span class="sig-line"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function onShow() {
    state.unlockedInsights = loadUnlockedInsights();
    renderTabs();
    // Default to first emotion or currently selected
    const firstEmo = Object.keys(EMOTIONS_DATA)[0];
    renderGrid(firstEmo);
    updateProgress();
}

function updateProgress() {
    const total = Object.values(EMOTIONS_DATA).reduce((sum, emo) => sum + emo.pairs.length, 0);
    const unlocked = state.unlockedInsights.length;
    const textEl = document.getElementById('journal-progress-text');
    if (textEl) textEl.textContent = `${unlocked}/${total}`;

    const cert = document.getElementById('mastery-certificate');
    const grid = document.querySelector('.journal-grid-scroll');
    const nameEl = document.getElementById('cert-player-name');

    if (unlocked >= total && total > 0) {
        if (cert) cert.classList.remove('hidden');
        if (grid) grid.classList.add('hidden');
        if (nameEl) nameEl.textContent = state.playerName || 'Player';
    } else {
        if (cert) cert.classList.add('hidden');
        if (grid) grid.classList.remove('hidden');
    }
}

function renderTabs() {
    const tabsContainer = document.getElementById('journal-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = Object.values(EMOTIONS_DATA).map(emo => `
        <button class="journal-tab" data-emotion="${emo.id}" style="--tab-color: ${emo.color}">
            ${emo.name}
        </button>
    `).join('');

    const tabs = tabsContainer.querySelectorAll('.journal-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sounds.click();
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderGrid(tab.dataset.emotion);
        });
    });

    // Mark first tab as active
    if (tabs[0]) tabs[0].classList.add('active');
}

function renderGrid(emotionId) {
    const grid = document.getElementById('journal-grid');
    if (!grid) return;

    const emo = EMOTIONS_DATA[emotionId];
    if (!emo) return;

    grid.innerHTML = emo.pairs.map(pair => {
        const isUnlocked = state.unlockedInsights.includes(pair.emotion.id);
        
        if (isUnlocked) {
            return `
                <div class="journal-card unlocked" style="--card-color: ${emo.color}">
                    <div class="journal-card-inner">
                        <div class="journal-card-front">
                            <div class="journal-card-img">
                                <img src="${pair.emotion.img}" alt="${pair.emotion.name}">
                            </div>
                            <div class="journal-card-content">
                                <h3>${pair.emotion.name}</h3>
                                <div class="journal-divider"></div>
                                <p class="journal-action"><strong>Coping:</strong> ${pair.action.name}</p>
                                <p class="journal-insight">${pair.emotion.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="journal-card locked">
                    <div class="journal-card-inner">
                        <div class="journal-card-locked-state">
                            <i data-lucide="lock" class="lock-icon"></i>
                            <p>Discover this feeling<br>to unlock the insight!</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');

    if (window.lucide) window.lucide.createIcons();
}

export function init({ navigate }) {
    document.getElementById('btn-journal-back').addEventListener('click', () => {
        sounds.click();
        navigate('levelSelect');
    });
}
