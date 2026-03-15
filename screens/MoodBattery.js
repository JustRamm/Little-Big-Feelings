// ============================================================
//  screens/MoodBattery.js — Mini-Game: Mood Battery
// ============================================================
import { MOOD_BATTERY_ACTIONS } from '../moodBatteryData.js';
import { sounds } from '../utils/sounds.js';

let batteryLevel = 20;
let gameInterval;
let spawnInterval;
let activeOrbs = [];
let masteredIds = new Set();
let sessionActions = []; // Only 8 tools per game
const GOAL_BATTERY = 100;
const TOOLS_PER_SESSION = 8;
const TOTAL_ACTIONS = MOOD_BATTERY_ACTIONS.length;

export function template() {
    return /* html */`
    <section id="screen-mood-battery" class="screen" aria-label="Mood Battery Game">
        <div class="mb-container">
            <header class="mb-header">
                <button id="btn-mb-back" class="btn-icon" aria-label="Back">
                    <i data-lucide="arrow-left"></i>
                </button>
                <div class="mb-battery-wrap">
                    <div class="mb-battery-body">
                        <div id="mb-battery-fill" class="mb-battery-fill" style="width: 80%;"></div>
                        <span id="mb-battery-text">80%</span>
                    </div>
                    <div class="mb-battery-tip"></div>
                </div>
                <div class="mb-stats-top">
                    <div class="mb-stat-box">
                        <span id="mb-mastery-count">0/100</span>
                        <label>Mood Power</label>
                    </div>
                </div>
            </header>

            <div class="mb-game-main">
                <div class="mb-game-area" id="mb-orb-container">
                    <!-- Orbs will spawn here -->
                </div>

                <!-- Guidance Tooltip -->
                <div id="mb-guidance" class="mb-guidance hidden">
                    <p id="mb-guidance-text">Select a tool to help!</p>
                </div>
            </div>

            <footer class="mb-toolbox-area">
                <div class="mb-toolbox-header">
                    <label>YOUR COPING TOOLS</label>
                    <span id="mb-tool-name">Select a Tool</span>
                </div>
                <div class="mb-toolbox-scroll">
                    <div class="mb-toolbox-grid" id="mb-toolbox-grid">
                        <!-- 8 Tools will be injected here during startGame -->
                    </div>
                </div>
            </footer>

            <!-- Overlays -->
            <div id="mb-feedback-overlay" class="mb-overlay hidden">
                <div class="mb-modal feedback-modal">
                    <div class="mb-modal-icon feedback-icon" id="mb-feedback-icon"><i data-lucide="sparkles"></i></div>
                    <h2 id="mb-feedback-title">Good Choice!</h2>
                    <p id="mb-feedback-text"></p>
                    <button class="btn-primary" id="btn-mb-feedback-next">Got it!</button>
                </div>
            </div>

            <div id="mb-start-overlay" class="mb-overlay">
                <div class="mb-modal">
                    <div class="mb-modal-icon"><i data-lucide="smile"></i></div>
                    <h2>Help Your Mood Buddy!</h2>
                    <p>Our Mood Buddy is feeling a bit low. Can you use the <b>Magic Tools</b> at the bottom to help them reach 100% battery?</p>
                    <div class="mb-how-to">
                        <div class="step"><i data-lucide="cloud-rain"></i> See the sad clouds</div>
                        <div class="step"><i data-lucide="sparkles"></i> Pick a tool to make it a sun!</div>
                    </div>
                    <button class="btn-primary" id="btn-mb-start">Let's Help!</button>
                </div>
            </div>

            <div id="mb-result-overlay" class="mb-overlay hidden">
                <div class="mb-modal">
                    <div id="mb-result-icon" class="mb-modal-icon"></div>
                    <h2 id="mb-result-title">Victory!</h2>
                    <p id="mb-result-text"></p>
                    <button class="btn-primary" id="btn-mb-restart">Play Again</button>
                    <button class="btn-secondary" id="btn-mb-exit">Back to Home</button>
                </div>
            </div>
        </div>
    </section>`;
}

export function init({ navigate }) {
    const backBtn = document.getElementById('btn-mb-back');
    const startBtn = document.getElementById('btn-mb-start');
    const restartBtn = document.getElementById('btn-mb-restart');
    const exitBtn = document.getElementById('btn-mb-exit');    const feedbackBtn = document.getElementById('btn-mb-feedback-next');

    backBtn.addEventListener('click', () => {
        stopGame();
        navigate('emotionSelect');
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
    exitBtn.addEventListener('click', () => {
        stopGame();
        navigate('emotionSelect');
    });

    feedbackBtn.addEventListener('click', () => {
        document.getElementById('mb-feedback-overlay').classList.add('hidden');
        
        // Resume spawning
        spawnInterval = setInterval(() => {
            spawnOrb();
        }, 4000);

        if (batteryLevel >= 100) {
            endGame(true);
        }
    });

    // Tool Hover Logic
    const toolNameDisplay = document.getElementById('mb-tool-name');
    const toolboxGrid = document.getElementById('mb-toolbox-grid');
    
    toolboxGrid.addEventListener('mouseover', (e) => {
        const btn = e.target.closest('.mb-tool-btn');
        if (btn) toolNameDisplay.textContent = btn.dataset.name;
    });

    toolboxGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.mb-tool-btn');
        if (!btn) return;
        useTool(btn.dataset.actionId);
    });
}

function startGame() {
    document.getElementById('mb-start-overlay').classList.add('hidden');
    document.getElementById('mb-result-overlay').classList.add('hidden');
    document.getElementById('mb-feedback-overlay').classList.add('hidden');
    batteryLevel = 20;
    masteredIds.clear();
    activeOrbs = [];
    
    // Pick 8 random actions for this session
    sessionActions = [...MOOD_BATTERY_ACTIONS]
        .sort(() => Math.random() - 0.5)
        .slice(0, TOOLS_PER_SESSION);

    renderToolbox();
    
    // Clear display
    document.getElementById('mb-orb-container').innerHTML = '';
    
    updateUI();
    
    // NO MORE AUTOMATIC DRAIN - Focus on building up energy!
    
    spawnInterval = setInterval(() => {
        spawnOrb();
    }, 4000);
    
    spawnOrb(); 
    spawnOrb();
}

function stopGame() {
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    activeOrbs.forEach(orb => clearInterval(orb.drainTimer));
}

function renderToolbox() {
    const grid = document.getElementById('mb-toolbox-grid');
    grid.innerHTML = sessionActions.map(item => `
        <button class="mb-tool-btn" 
                data-action-id="${item.id}" 
                data-name="${item.action}"
                data-category="${item.category}"
                title="${item.action}">
            <div class="mb-tool-icon-wrap">
                <i data-lucide="${item.icon}"></i>
            </div>
            <span class="mb-tool-check hidden" id="check-${item.id}">
                <i data-lucide="check"></i>
            </span>
        </button>
    `).join('');
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function spawnOrb() {
    const container = document.getElementById('mb-orb-container');
    if (!container) return;

    // Only spawn actions that are in the session toolbox
    const availableActions = sessionActions.filter(item => 
        !activeOrbs.find(orb => orb.actionId === item.id)
    );
    if (availableActions.length === 0) return;

    const actionData = availableActions[Math.floor(Math.random() * availableActions.length)];
    
    const orbEl = document.createElement('div');
    orbEl.className = `mb-orb mb-category-${actionData.category}`;
    // ADDED HELPER ICON to the orb for understandability
    orbEl.innerHTML = `
        <div class="mb-orb-hint"><i data-lucide="${actionData.icon}"></i></div>
        <span class="mb-orb-trigger">${actionData.trigger}</span>
    `;
    
    const x = Math.random() * (container.clientWidth - 160);
    const y = Math.random() * (container.clientHeight - 140);
    orbEl.style.left = `${x}px`;
    orbEl.style.top = `${y}px`;
    
    container.appendChild(orbEl);
    lucide.createIcons({ attrs: { 'stroke-width': 3 } }); // Refresh icons for new element
    
    const orbData = {
        id: Date.now(),
        actionId: actionData.id,
        el: orbEl
    };
    
    activeOrbs.push(orbData);
    // Orbs don't drain either, they are just problems waiting for solutions!
}

function useTool(actionId) {
    const orbIndex = activeOrbs.findIndex(o => o.actionId === actionId);
    
    if (orbIndex !== -1) {
        const orb = activeOrbs[orbIndex];
        const actionData = MOOD_BATTERY_ACTIONS.find(a => a.id === actionId);

        orb.el.classList.add('mastered');
        sounds.match();
        
        masteredIds.add(actionId);
        document.getElementById(`check-${actionId}`).classList.remove('hidden');

        // Show feedback popup
        showFeedback(actionData);

        setTimeout(() => {
            orb.el.remove();
            activeOrbs.splice(orbIndex, 1);
        }, 500);

        batteryLevel = Math.min(100, batteryLevel + 10);
        updateUI();
    } else {
        sounds.wrong();
        // No penalty for kids, just a soft sound
    }
}

function showFeedback(actionData) {
    // Pause spawning during feedback
    clearInterval(spawnInterval);

    const overlay = document.getElementById('mb-feedback-overlay');
    const text = document.getElementById('mb-feedback-text');
    const title = document.getElementById('mb-feedback-title');
    const icon = document.getElementById('mb-feedback-icon');

    title.textContent = `You used: ${actionData.action}`;
    text.textContent = actionData.why;
    icon.innerHTML = `<i data-lucide="${actionData.icon}"></i>`;
    
    overlay.classList.remove('hidden');
    lucide.createIcons();
}

function updateUI() {
    const fill = document.getElementById('mb-battery-fill');
    const text = document.getElementById('mb-battery-text');
    const mastery = document.getElementById('mb-mastery-count');
    
    if (fill) fill.style.width = `${batteryLevel}%`;
    if (text) text.textContent = `${Math.round(batteryLevel)}%`;
    if (mastery) mastery.textContent = `${Math.round(batteryLevel)}%`;

    if (fill) {
        if (batteryLevel > 60) fill.style.background = 'var(--green)';
        else if (batteryLevel > 25) fill.style.background = 'var(--yellow)';
        else fill.style.background = 'var(--orange)';
    }
}

function endGame(won) {
    stopGame();
    const resultOverlay = document.getElementById('mb-result-overlay');
    const resultTitle = document.getElementById('mb-result-title');
    const resultText = document.getElementById('mb-result-text');
    const resultIcon = document.getElementById('mb-result-icon');

    resultOverlay.classList.remove('hidden');
    
    if (won) {
        resultTitle.textContent = "100% Charged!";
        resultText.textContent = "Yay! You helped the Mood Buddy feel super happy and energized. You are an Emotion Hero!";
        resultIcon.innerHTML = '<i data-lucide="heart" style="color: #FF80AB; fill: #FF80AB;"></i>';
    } else {
        // This won't trigger anymore but keeping for safety
        resultTitle.textContent = "Keep Trying!";
        resultText.textContent = "Every tool you use helps! Want to try again and reach 100%?";
        resultIcon.innerHTML = '<i data-lucide="sparkles" style="color: var(--yellow);"></i>';
    }
    lucide.createIcons();
}
