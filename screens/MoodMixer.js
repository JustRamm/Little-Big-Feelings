/**
 * screens/MoodMixer.js — The Feeling Fusion Lab
 */
import { state } from '../gameState.js';
import { sounds } from '../utils/sounds.js';
import { EMOTIONS_DATA } from '../gameData.js';
import { MIXING_RECIPES } from '../moodMixerData.js';
import { saveDiscoveredMixes } from '../utils/storage.js';

let selectedSlot1 = null;
let selectedSlot2 = null;

export function template() {
    const basicEmotions = Object.values(EMOTIONS_DATA);
    
    const choiceBubbles = basicEmotions.map((emo, index) => `
        <button class="choice-bubble" data-emotion="${emo.id}" title="${emo.name}" type="button" style="--delay: ${index}">
            <img src="${emo.icon}" alt="${emo.name}">
        </button>
    `).join('');

    return /* html */`
    <section id="screen-mood-mixer" class="screen" aria-label="Feeling Fusion Lab">
        <div class="mood-mixer-container">
            <header class="mixer-header">
                <button id="btn-mixer-back" class="btn-icon circle-btn" aria-label="Exit" type="button">
                    <i data-lucide="log-out"></i>
                </button>
                <div class="journal-title-wrap">
                    <h2 class="premium-title">Feeling Fusion Lab</h2>
                    <p class="premium-subtitle">Mix two feelings to see what happens!</p>
                </div>
            </header>

            <div class="mixer-card fusion-chamber">
                <div class="mixer-slots">
                    <div class="slot-container">
                        <div id="mixer-slot-1" class="mixer-slot">
                            <i data-lucide="beaker" style="opacity: 0.3; color: var(--pink);"></i>
                        </div>
                        <div id="slot-name-1" class="slot-label">Ingredient 1</div>
                    </div>

                    <span class="plus-symbol">⚗️</span>

                    <div class="slot-container">
                        <div id="mixer-slot-2" class="mixer-slot">
                            <i data-lucide="beaker" style="opacity: 0.3; color: var(--blue);"></i>
                        </div>
                        <div id="slot-name-2" class="slot-label">Ingredient 2</div>
                    </div>
                </div>

                <div id="mixer-controls">
                    <button id="btn-do-fusion" class="btn-primary disabled" disabled>
                        <i data-lucide="test-tube-2" style="margin-right: 10px;"></i>
                        Begin Experiment!
                    </button>
                </div>

                <div class="journal-divider"></div>

                <div class="mixer-choices-wrap">
                    <p class="premium-subtitle" style="margin-bottom: 1rem; color: var(--blue-dark); font-weight: 800;">Select Elements to Mix</p>
                    <div class="mixer-choices">
                        ${choiceBubbles}
                    </div>
                </div>

                <div class="journal-divider"></div>

                <div class="mixer-discovery-section">
                    <h4 class="discovery-title">🧪 Experiment Records 🧪</h4>
                    <div id="mixer-discovery-grid" class="mixer-discovery-grid">
                        <!-- Discovered emotions slots -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Result Overlay -->
        <div id="fusion-overlay" class="fusion-overlay">
            <div class="fusion-content">
                <div id="fusion-new-character" class="fusion-result-img"></div>
                <h3 id="fusion-result-name" class="premium-title" style="font-size: 2.2rem;">New Feeling!</h3>
                <p id="fusion-result-desc" class="premium-subtitle" style="margin: 1rem 0; opacity: 1;"></p>
                <button id="btn-close-fusion" class="btn-primary">That's amazing!</button>
            </div>
        </div>
    </section>`;
}

export function onShow() {
    clearMixer();
    renderDiscoveryGrid();
}

/**
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    document.getElementById('btn-mixer-back').addEventListener('click', () => {
        sounds.click();
        navigate('emotionSelect');
    });

    const choices = document.querySelectorAll('.choice-bubble');
    choices.forEach(btn => {
        btn.addEventListener('click', () => {
            const emoId = btn.dataset.emotion;
            const emoData = EMOTIONS_DATA[emoId];
            if (!emoData) return;

            sounds.click();

            if (!selectedSlot1) {
                selectedSlot1 = emoData;
                updateSlotUI(1, emoData);
                btn.classList.add('selected');
            } else if (!selectedSlot2 && selectedSlot1.id !== emoId) {
                selectedSlot2 = emoData;
                updateSlotUI(2, emoData);
                btn.classList.add('selected');
            }
            
            checkCombinations();
        });
    });

    document.getElementById('btn-do-fusion').addEventListener('click', () => {
        if (!selectedSlot1 || !selectedSlot2) return;
        
        sounds.cheer(); // Or a custom "magic/fusion" sound
        performFusion();
    });



    document.getElementById('btn-close-fusion').addEventListener('click', () => {
        sounds.click();
        document.getElementById('fusion-overlay').classList.remove('active');
        clearMixer();
        renderDiscoveryGrid(); // Update gallery after discovery
    });
}

function renderDiscoveryGrid() {
    const grid = document.getElementById('mixer-discovery-grid');
    if (!grid) return;

    // We only show 4 slots total now
    const totalSlots = 4;
    
    // Get the discovered emotions (limit to first 4 or unique ones)
    const discoveryIds = state.discoveredMixes.slice(0, totalSlots);
    
    let html = '';
    for (let i = 0; i < totalSlots; i++) {
        const dishId = discoveryIds[i];
        if (dishId) {
            // Find the emotion data for this result ID
            const resultData = MIXING_RECIPES.find(r => r.result.id === dishId)?.result;
            if (resultData) {
                html += `
                    <div class="discovery-slot unlocked" data-recipe-id="${resultData.id}" title="${resultData.name}" style="--slot-color: ${resultData.color}">
                        <img src="${resultData.icon}" alt="${resultData.name}" class="discovery-icon">
                    </div>
                `;
            }
        } else {
            html += `
                <div class="discovery-slot locked" title="Discovery more to fill this slot!">
                    <i data-lucide="help-circle"></i>
                </div>
            `;
        }
    }

    grid.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    // Add click listeners to UNLOCKED slots to show details
    grid.querySelectorAll('.discovery-slot.unlocked').forEach((slot) => {
        slot.addEventListener('click', () => {
            const recipeId = slot.dataset.recipeId;
            const res = MIXING_RECIPES.find(r => r.result.id === recipeId)?.result;
            if (res) showFusionResult(res);
        });
    });

    // WIN CONDITION: If we have 4 or more, tell them they won!
    if (state.discoveredMixes.length >= 4) {
        setTimeout(() => {
            if (!document.querySelector('.fusion-victory-banner')) {
                const banner = document.createElement('div');
                banner.className = 'fusion-victory-banner';
                banner.innerHTML = `
                    <div class="victory-content">
                        <h2>You Found 4 Feelings!</h2>
                        <p>You're a master of the Fusion Lab!</p>
                        <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Keep Mixing!</button>
                    </div>
                `;
                document.body.appendChild(banner);
                sounds.cheer();
            }
        }, 800);
    }
}

function showFusionResult(result) {
    const overlay = document.getElementById('fusion-overlay');
    const resultImg = document.getElementById('fusion-new-character');
    const resultName = document.getElementById('fusion-result-name');
    const resultDesc = document.getElementById('fusion-result-desc');

    resultImg.innerHTML = `<img src="${result.icon}" style="width: 100%; height: 100%;" />`;
    resultName.textContent = result.name;
    resultName.style.color = result.color;
    resultDesc.textContent = result.description;

    overlay.classList.add('active');
}

function updateSlotUI(slotNum, data) {
    const slot = document.getElementById(`mixer-slot-${slotNum}`);
    const label = document.getElementById(`slot-name-${slotNum}`);
    if (!slot || !label) return;
    
    slot.innerHTML = `<img src="${data.icon}" alt="${data.name}">`;
    slot.classList.add('occupied');
    slot.style.borderColor = data.color;
    slot.style.backgroundColor = data.color + '15'; 
    label.textContent = data.name;
    label.style.color = data.color;
    label.style.fontWeight = '800';
}

function checkCombinations() {
    const btn = document.getElementById('btn-do-fusion');
    if (selectedSlot1 && selectedSlot2) {
        btn.classList.remove('disabled');
        btn.classList.add('pulse-button');
        btn.disabled = false;
    } else {
        btn.classList.add('disabled');
        btn.classList.remove('pulse-button');
        btn.disabled = true;
    }
}

function clearMixer() {
    selectedSlot1 = null;
    selectedSlot2 = null;
    
    const slot1 = document.getElementById('mixer-slot-1');
    const label1 = document.getElementById('slot-name-1');
    if (slot1) {
        slot1.innerHTML = `<i data-lucide="beaker" style="opacity: 0.3; color: var(--pink);"></i>`;
        slot1.classList.remove('occupied');
        slot1.style.borderColor = '';
        slot1.style.backgroundColor = '';
    }
    if (label1) {
        label1.textContent = 'Ingredient 1';
        label1.style.color = '#9E9E9E';
    }

    const slot2 = document.getElementById('mixer-slot-2');
    const label2 = document.getElementById('slot-name-2');
    if (slot2) {
        slot2.innerHTML = `<i data-lucide="beaker" style="opacity: 0.3; color: var(--blue);"></i>`;
        slot2.classList.remove('occupied');
        slot2.style.borderColor = '';
        slot2.style.backgroundColor = '';
    }
    if (label2) {
        label2.textContent = 'Ingredient 2';
        label2.style.color = '#9E9E9E';
    }

    document.querySelectorAll('.choice-bubble').forEach(b => b.classList.remove('selected'));

    checkCombinations();
    if (window.lucide) window.lucide.createIcons();
}

function performFusion() {
    const recipe = MIXING_RECIPES.find(r => 
        (r.e1 === selectedSlot1.id && r.e2 === selectedSlot2.id) ||
        (r.e1 === selectedSlot2.id && r.e2 === selectedSlot1.id)
    );

    const overlay = document.getElementById('fusion-overlay');
    const resultImg = document.getElementById('fusion-new-character');
    const resultName = document.getElementById('fusion-result-name');
    const resultDesc = document.getElementById('fusion-result-desc');

    if (recipe) {
        // We found a valid mixture!
        showFusionResult(recipe.result);

        // Save discovery if new
        if (!state.discoveredMixes.some(m => (m === recipe.result.id) || (m && m.id === recipe.result.id))) {
            state.discoveredMixes.push(recipe.result.id);
            saveDiscoveredMixes(state.discoveredMixes);
            // Instant update to have it ready behind the overlay
            renderDiscoveryGrid(); 
        }
    } else {
        // Unknown mixture - default "curious" result
        const mysteryResult = {
            icon: '', // handled below
            name: "Mystery Mix!",
            description: "We haven't discovered this mix yet! It's a brand new unique feeling of your own.",
            color: '#9E9E9E'
        };
        
        resultImg.innerHTML = `<i data-lucide="help-circle" style="width: 100%; height: 100%; color: #9E9E9E;"></i>`;
        resultName.textContent = mysteryResult.name;
        resultDesc.textContent = mysteryResult.description;
        resultName.style.color = mysteryResult.color;
        
        if (window.lucide) window.lucide.createIcons();
        overlay.classList.add('active');
    }
}
