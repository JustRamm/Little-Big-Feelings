// ============================================================
//  screens/MoodBattery.js — Mini-Game: Mood Battery
// ============================================================
import { MOOD_BATTERY_ACTIONS } from '../moodBatteryData.js';
import { sounds } from '../utils/sounds.js';

let batteryLevel = 80;
let gameInterval;
let spawnInterval;
let activeOrbs = [];
let masteryCount = 0;
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
                <div class="mb-stats">
                    <span id="mb-mastery-count">0/${TOTAL_ACTIONS}</span>
                    <label>Mastered</label>
                </div>
            </header>

            <div class="mb-game-area" id="mb-orb-container">
                <div class="mb-start-overlay" id="mb-start-overlay">
                    <h3>Mood Battery</h3>
                    <p>Stress orbs are draining your energy! Use your Coping Tools at the bottom to stay charged and master all 20 actions.</p>
                    <button class="btn-primary" id="btn-mb-start">Start Game</button>
                </div>
                <!-- Orbs will be spawned here -->
            </div>

            <footer class="mb-toolbox">
                <div class="mb-toolbox-grid">
                    ${MOOD_BATTERY_ACTIONS.map(item => `
                        <button class="mb-tool-btn" data-action-id="${item.id}" title="${item.action}">
                            <i data-lucide="${item.icon}"></i>
                        </button>
                    `).join('')}
                </div>
            </footer>
        </div>
    </section>`;
}

export function init({ navigate }) {
    document.getElementById('btn-mb-back').addEventListener('click', () => {
        stopGame();
        navigate('splash');
    });

    document.getElementById('btn-mb-start').addEventListener('click', () => {
        startGame();
    });

    // Handle tool clicks
    document.querySelector('.mb-toolbox-grid').addEventListener('click', (e) => {
        const btn = e.target.closest('.mb-tool-btn');
        if (!btn) return;
        
        const actionId = btn.dataset.actionId;
        useTool(actionId);
    });
}

function startGame() {
    document.getElementById('mb-start-overlay').classList.add('hidden');
    batteryLevel = 80;
    masteryCount = 0;
    activeOrbs = [];
    updateUI();
    
    gameInterval = setInterval(() => {
        batteryLevel -= 0.5; // Constant drain
        if (batteryLevel <= 0) endGame(false);
        updateUI();
    }, 100);

    spawnInterval = setInterval(() => {
        spawnOrb();
    }, 3000);
}

function stopGame() {
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    const container = document.getElementById('mb-orb-container');
    if (container) {
        container.querySelectorAll('.mb-orb').forEach(orb => orb.remove());
    }
}

function spawnOrb() {
    const container = document.getElementById('mb-orb-container');
    if (!container) return;

    // Pick a random action that isn't already spawned as an orb
    const availableActions = MOOD_BATTERY_ACTIONS.filter(item => 
        !activeOrbs.find(orb => orb.actionId === item.id)
    );
    if (availableActions.length === 0) return;

    const actionData = availableActions[Math.floor(Math.random() * availableActions.length)];
    
    const orbEl = document.createElement('div');
    orbEl.className = 'mb-orb';
    orbEl.innerHTML = `<span>${actionData.trigger}</span>`;
    
    // Random position
    const x = Math.random() * (container.clientWidth - 150);
    const y = Math.random() * (container.clientHeight - 100);
    orbEl.style.left = `${x}px`;
    orbEl.style.top = `${y}px`;
    
    container.appendChild(orbEl);
    
    const orbData = {
        id: Date.now(),
        actionId: actionData.id,
        el: orbEl
    };
    
    activeOrbs.push(orbData);

    // Orb slowly drains more battery
    const drainTimer = setInterval(() => {
        batteryLevel -= 0.2;
    }, 500);

    orbData.drainTimer = drainTimer;
}

function useTool(actionId) {
    const orbIndex = activeOrbs.findIndex(o => o.actionId === actionId);
    
    if (orbIndex !== -1) {
        const orb = activeOrbs[orbIndex];
        
        // Success effect
        orb.el.classList.add('mastered');
        sounds.match();
        clearInterval(orb.drainTimer);
        
        setTimeout(() => {
            orb.el.remove();
            activeOrbs.splice(orbIndex, 1);
        }, 500);

        batteryLevel = Math.min(100, batteryLevel + 15);
        masteryCount++;
        
        if (masteryCount >= TOTAL_ACTIONS) {
            endGame(true);
        }
    } else {
        // Wrong tool
        sounds.wrong();
        batteryLevel -= 5;
    }
    updateUI();
}

function updateUI() {
    const fill = document.getElementById('mb-battery-fill');
    const text = document.getElementById('mb-battery-text');
    const mastery = document.getElementById('mb-mastery-count');
    
    if (fill) fill.style.width = `${batteryLevel}%`;
    if (text) text.textContent = `${Math.round(batteryLevel)}%`;
    if (mastery) mastery.textContent = `${masteryCount}/${TOTAL_ACTIONS}`;

    // Color battery based on level
    if (fill) {
        if (batteryLevel > 60) fill.style.background = 'var(--green)';
        else if (batteryLevel > 25) fill.style.background = 'var(--yellow)';
        else fill.style.background = 'var(--orange)';
    }
}

function endGame(won) {
    stopGame();
    if (won) {
        alert("Emotion Master! You reloaded the battery with all 20 actions.");
    } else {
        alert("Game Over! The battery ran out. Take a deep breath and try again!");
    }
    location.reload(); // Simple reset for now
}
