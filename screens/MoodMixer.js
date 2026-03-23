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
    
    const choiceBubbles = basicEmotions.map(emo => `
        <button class="choice-bubble" data-emotion="${emo.id}" title="${emo.name}" type="button">
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

            <div class="mixer-card">
                <div class="mixer-slots">
                    <div class="slot-container">
                        <div id="mixer-slot-1" class="mixer-slot">
                            <i data-lucide="plus" style="opacity: 0.2;"></i>
                        </div>
                        <div id="slot-name-1" class="slot-label">???</div>
                    </div>

                    <span class="plus-symbol">+</span>

                    <div class="slot-container">
                        <div id="mixer-slot-2" class="mixer-slot">
                            <i data-lucide="plus" style="opacity: 0.2;"></i>
                        </div>
                        <div id="slot-name-2" class="slot-label">???</div>
                    </div>
                </div>

                <div id="mixer-controls">
                    <button id="btn-do-fusion" class="btn-primary disabled" disabled>Mix Them Up!</button>
                </div>

                <div class="journal-divider"></div>

                <div class="mixer-choices">
                    ${choiceBubbles}
                </div>

                <div class="journal-divider"></div>

                <div class="mixer-discovery-section">
                    <h4 class="discovery-title">Your Fusion Discoveries</h4>
                    <div id="mixer-discovery-grid" class="mixer-discovery-grid">
                        <!-- Discovered emotions will appear here as slots -->
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

    // Filter for UNIQUE discovered emotions only, so we don't have duplicate slots for different recipes
    const uniqueEmotions = [];
    const seenIds = new Set();
    MIXING_RECIPES.forEach(r => {
        if (!seenIds.has(r.result.id)) {
            seenIds.add(r.result.id);
            uniqueEmotions.push(r.result);
        }
    });

    // Show all possible unique emotions as slots
    grid.innerHTML = uniqueEmotions.map(emo => {
        // Robust check: handle if state.discoveredMixes has objects or IDs
        const isUnlocked = state.discoveredMixes.some(m => (m === emo.id) || (m && m.id === emo.id));
        
        if (isUnlocked) {
            return `
                <div class="discovery-slot unlocked" data-recipe-id="${emo.id}" title="${emo.name}" style="--slot-color: ${emo.color}">
                    <img src="${emo.icon}" alt="${emo.name}" class="discovery-icon">
                </div>
            `;
        } else {
            return `
                <div class="discovery-slot locked" title="Combined two feelings to find this!">
                    <i data-lucide="help-circle"></i>
                </div>
            `;
        }
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    // Add click listeners to UNLOCKED slots to show details
    const unlockedSlots = grid.querySelectorAll('.discovery-slot.unlocked');
    unlockedSlots.forEach((slot) => {
        slot.addEventListener('click', () => {
            const recipeId = slot.dataset.recipeId;
            const originalRecipe = MIXING_RECIPES.find(r => r.result.id === recipeId);
            if (originalRecipe) {
                showFusionResult(originalRecipe.result);
            }
        });
    });
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
    
    [1, 2].forEach(num => {
        const slot = document.getElementById(`mixer-slot-${num}`);
        const label = document.getElementById(`slot-name-${num}`);
        if (slot) {
            slot.innerHTML = `<i data-lucide="plus" style="opacity: 0.2;"></i>`;
            slot.classList.remove('occupied');
            slot.style.borderColor = '';
            slot.style.backgroundColor = '';
        }
        if (label) {
            label.textContent = '???';
            label.style.color = '#9E9E9E';
        }
    });

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
