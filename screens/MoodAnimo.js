// ============================================================
//  screens/MoodAnimo.js (Formerly MoodBattery.js)
//  Mini-Game: Animo — The Animal Care Simulator
// ============================================================
import { sounds } from '../utils/sounds.js';
import { state } from '../gameState.js';

const TOOLS = [
    { id: 'hug', type: 'good', icon: 'assets/animo/tools/hug.svg', label: 'Warm Hug', lesson: "Warm hugs make your friend feel safe and loved! ❤️" },
    { id: 'food', type: 'good', icon: 'assets/animo/tools/food.svg', label: 'Tasty Treat', lesson: "Yummy food gives your friend energy to play! 🍖" },
    { id: 'brush', type: 'good', icon: 'assets/animo/tools/brush.svg', label: 'Pamper', lesson: "Brushing helps your friend feel clean and happy! ✨" },
    { id: 'play', type: 'good', icon: 'assets/animo/tools/play.svg', label: 'Play Time', lesson: "Bouncing a ball is the best way to have fun together! 🎾" },
    { id: 'noise', type: 'bad', icon: 'assets/animo/tools/noise.svg', label: 'Scary Noise', lesson: "Loud noises can be scary. Your friend is frightened! ⛈️" },
    { id: 'ignoring', type: 'bad', icon: 'assets/animo/tools/ignoring.svg', label: 'Ignoring', lesson: "Everyone needs attention. Ignoring someone makes them sad... 👁️‍🗨️" },
    { id: 'mean', type: 'bad', icon: 'assets/animo/tools/mean.svg', label: 'Mean Words', lesson: "Ouch! Harsh words hurt more than a fall. Be gentle! 🧱" }
];

const ANIMO_MAP = {
    'avatar_1.svg': 'lion',
    'avatar_2.svg': 'elephant',
    'avatar_3.svg': 'penguin',
    'avatar_4.svg': 'panda',
    'avatar_5.svg': 'cat',
    'avatar_6.svg': 'dog',
    'avatar_7.svg': 'monkey',
    'avatar_8.svg': 'rabbit',
    'avatar_9.svg': 'frog',
    'avatar_10.svg': 'owl',
    'avatar_11.svg': 'bee',
    'avatar_12.svg': 'butterfly'
};

function getAnimoFolder() {
    // Get filename from path: assets/avatars/avatar_1.svg -> avatar_1.svg
    const avatarFilename = state.playerAvatar.split('/').pop();
    return ANIMO_MAP[avatarFilename] || 'dog';
}

let animoStage = 1; // 1 to 4
let activeTool = null;
let dragX, dragY;
let hasRunAway = false;
let usedToolIds = new Set();
let randomizedTools = [];

function getAnimoMovementClass(folder) {
    const flyers = ['bee', 'bird', 'butterfly', 'owl'];
    const hoppers = ['frog', 'rabbit'];
    if (flyers.includes(folder)) return 'animo-fly';
    if (hoppers.includes(folder)) return 'animo-hop';
    return 'animo-sway';
}

export function template() {
    const animoFolder = getAnimoFolder();
    const moveClass = getAnimoMovementClass(animoFolder);
    
    // We shuffle randomizedTools during onShow, but initially we can just show them
    const currentTools = randomizedTools.length > 0 ? randomizedTools : TOOLS;

    const toolsHtml = currentTools.map(t => {
        const isUsed = usedToolIds.has(t.id);
        return `
            <div class="mg-tool-wrap ${isUsed ? 'used' : ''}" data-id="${t.id}">
                <img src="${t.icon}" alt="${t.label}" class="mg-tool-asset" draggable="false" />
                <span>${t.label}</span>
            </div>
        `;
    }).join('');

    return /* html */`
    <section id="screen-mood-battery" class="screen full-animo" aria-label="Animo Care"
             style="background-image: url('assets/animo/${animoFolder}/bg.svg'); background-size: cover; background-position: center;">
        <div id="mood-animo-screen" class="mg-container animo-mode ${moveClass}">
            <header class="mg-header">
                <button id="btn-mg-back" class="btn-icon" aria-label="Back">
                    <i data-lucide="arrow-left"></i>
                </button>
                <div class="mg-header-text">
                    <h1>Nurture Player's Friend</h1>
                    <p>Show love to help your friend grow big and strong!</p>
                </div>
                <div class="header-spacer"></div>
            </header>

            <div class="mg-garden-stage">
                <!-- Action Feedback Bubble -->
                <div id="mg-lesson-bubble" class="mg-lesson-bubble hidden">
                    <p id="mg-lesson-text"></p>
                </div>

                <!-- The Animal Target (Centered) -->
                <div id="mg-animo-target" class="mg-animo-target stage-1 ${moveClass}">
                    <div id="mg-animo-wrap" class="mg-animo-wrap">
                        <img id="mg-animo-asset" src="assets/animo/${animoFolder}/baby.svg" class="mg-animo-asset" alt="Your Friend">
                        <div id="mg-runaway-msg" class="mg-runaway-msg hidden">
                            <h3>Oh no! 😢</h3>
                            <p>Your friend felt too sad and ran away home. Let's send a kind message to call them back!</p>
                            <button class="btn-primary" id="btn-mg-recall">Call Friend Back</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mg-toolbox-scroll">
                <div id="mg-tool-dock" class="mg-toolbox-dock">
                    ${toolsHtml}
                </div>
            </div>

            <!-- Result Overlay -->
            <div id="mg-result-overlay" class="mg-overlay hidden">
                <div class="mg-modal celebration-modal">
                    <div class="mg-modal-icon">❤️</div>
                    <h2>A Heart Full of Joy!</h2>
                    <p>Thank you for nurturing me with so much love and kindness! <b>You've just learned how to love and care</b>, and that is the greatest success of all!</p>
                    <button class="btn-primary" id="btn-mg-exit">Back to Map</button>
                </div>
            </div>


            <!-- Tutorial -->
            <div id="mg-tutorial" class="mg-overlay">
                <div class="mg-modal tutorial-modal">
                    <div class="tutorial-img"><img src="assets/animo/tools/hug.svg" width="60"></div>
                    <h3>Your New Friend!</h3>
                    <p>Drag <b>kind actions</b> to your friend to help them grow. Be careful, mean actions might scare them away!</p>
                    <button class="btn-primary" id="btn-mg-start">Let's Play!</button>
                </div>
            </div>
        </div>
    </section>`;
}

export function init({ navigate }) {
    const exitBtn = document.getElementById('btn-mg-exit');
    const startBtn = document.getElementById('btn-mg-start');
    const backBtn = document.getElementById('btn-mg-back');
    const animoTarget = document.getElementById('mg-animo-target');

    backBtn.addEventListener('click', () => {
        sounds.stopAnimalAmbiance();
        navigate('emotionSelect');
    });
    exitBtn.addEventListener('click', () => navigate('emotionSelect'));
    
    startBtn.addEventListener('click', () => {
        sounds.click();
        document.getElementById('mg-tutorial').classList.add('hidden');
    });

    function startDrag(e) {
        if (hasRunAway || e.currentTarget.classList.contains('used')) return;
        
        const originalEl = e.currentTarget;
        const iconEl = originalEl.querySelector('.mg-tool-asset');
        const startX = e.clientX;
        const startY = e.clientY;
        let isDraggingInitiated = false;
        let dragClone = null;

        function onInitialMove(moveEvent) {
            const dist = Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY);
            if (!isDraggingInitiated && dist > 10) {
                isDraggingInitiated = true;
                
                // Only clone the SVG icon, not the full card
                dragClone = iconEl.cloneNode(true);
                dragClone.classList.add('dragging-icon');
                document.body.appendChild(dragClone);
                
                const rect = iconEl.getBoundingClientRect();
                dragX = moveEvent.clientX - rect.left;
                dragY = moveEvent.clientY - rect.top;
                
                dragClone.style.position = 'fixed';
                dragClone.style.width = '70px'; // Make the icon a bit larger for dragging
                dragClone.style.height = '70px';
                dragClone.style.left = rect.left + 'px';
                dragClone.style.top = rect.top + 'px';
                dragClone.style.zIndex = "3000";
                dragClone.style.pointerEvents = "none";
                dragClone.style.filter = "drop-shadow(0 10px 20px rgba(0,0,0,0.2))";
                
                sounds.click();
            }
        }

        function onMove(moveEvent) {
            if (isDraggingInitiated && dragClone) {
                // Center the icon slightly better
                dragClone.style.left = (moveEvent.clientX - 35) + 'px';
                dragClone.style.top = (moveEvent.clientY - 35) + 'px';
                dragClone.style.transform = `scale(1.3) rotate(${Math.sin(moveEvent.clientX * 0.01) * 5}deg)`;
            }
        }

        function onUp(upEvent) {
            document.removeEventListener('pointermove', onInitialMove);
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);

            if (isDraggingInitiated && dragClone) {
                const toolId = originalEl.dataset.id;
                const toolData = TOOLS.find(t => t.id === toolId);
                
                // HIGH PRECISION DROP DETECTION:
                // We use elementFromPoint to see if the user dropped onto the animal area
                // Since clone is pointer-events: none, it won't interfere.
                const elementsAtPoint = document.elementsFromPoint(upEvent.clientX, upEvent.clientY);
                const isHit = elementsAtPoint.some(el => 
                    el.id === 'mg-animo-target' || 
                    el.id === 'mg-animo-asset' || 
                    el.closest('#mg-animo-target')
                );
                
                if (isHit) {
                    handleToolUsage(toolData);
                }

                dragClone.remove();
                dragClone = null;
            }
        }

        document.addEventListener('pointermove', onInitialMove);
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
    }

    // Recall Logic
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'btn-mg-recall') {
            sounds.match();
            hasRunAway = false;
            animoStage = 1;
            updateAnimoUI();
        }
    });
}

export function onShow() {
    animoStage = 1;
    hasRunAway = false;
    usedToolIds = new Set();
    
    // Mix the tools!
    randomizedTools = [...TOOLS].sort(() => Math.random() - 0.5);
    
    // Start unique background noise for this avatar
    sounds.startAnimalAmbiance(getAnimoFolder());
    
    renderTools();
    updateAnimoUI();
    document.getElementById('mg-result-overlay').classList.add('hidden');
    document.getElementById('mg-tutorial').classList.remove('hidden');
    document.getElementById('mg-lesson-bubble').classList.add('hidden');
}

function renderTools() {
    const dock = document.getElementById('mg-tool-dock');
    if (!dock) return;
    
    dock.innerHTML = randomizedTools.map(t => {
        const isUsed = usedToolIds.has(t.id);
        return `
            <div class="mg-tool-wrap ${isUsed ? 'used' : ''}" data-id="${t.id}">
                <img src="${t.icon}" alt="${t.label}" class="mg-tool-asset" draggable="false" />
                <span>${t.label}</span>
            </div>
        `;
    }).join('');
    
    // Re-attach listeners to NEW elements
    dock.querySelectorAll('.mg-tool-wrap').forEach(el => el.addEventListener('pointerdown', (e) => {
        if (hasRunAway || e.currentTarget.classList.contains('used')) return;
        
        const originalEl = e.currentTarget;
        const iconEl = originalEl.querySelector('.mg-tool-asset');
        const startX = e.clientX;
        const startY = e.clientY;
        let isDraggingInitiated = false;
        let dragClone = null;

        function onInitialMove(moveEvent) {
            const dist = Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY);
            if (!isDraggingInitiated && dist > 10) {
                isDraggingInitiated = true;
                
                // Only clone the icon
                dragClone = iconEl.cloneNode(true);
                dragClone.classList.add('dragging-icon');
                document.body.appendChild(dragClone);
                
                const rect = iconEl.getBoundingClientRect();
                dragX = moveEvent.clientX - rect.left;
                dragY = moveEvent.clientY - rect.top;
                
                dragClone.style.position = 'fixed';
                dragClone.style.width = '70px';
                dragClone.style.height = '70px';
                dragClone.style.left = rect.left + 'px';
                dragClone.style.top = rect.top + 'px';
                dragClone.style.zIndex = "3000";
                dragClone.style.pointerEvents = "none";
                dragClone.style.filter = "drop-shadow(0 15px 30px rgba(0,0,0,0.25))";
                
                sounds.click();
            }
        }

        function onMove(moveEvent) {
            if (isDraggingInitiated && dragClone) {
                dragClone.style.left = (moveEvent.clientX - 35) + 'px';
                dragClone.style.top = (moveEvent.clientY - 35) + 'px';
                dragClone.style.transform = `scale(1.4) rotate(${Math.sin(moveEvent.clientX * 0.01) * 8}deg)`;
            }
        }

        function onUp(upEvent) {
            document.removeEventListener('pointermove', onInitialMove);
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);

            if (isDraggingInitiated && dragClone) {
                const toolId = originalEl.dataset.id;
                const toolData = TOOLS.find(t => t.id === toolId);
                
                // Check if we hit the target
                const elementsAtPoint = document.elementsFromPoint(upEvent.clientX, upEvent.clientY);
                const isHit = elementsAtPoint.some(el => 
                    el.id === 'mg-animo-target' || 
                    el.id === 'mg-animo-asset' || 
                    el.closest('#mg-animo-target')
                );
                
                if (isHit) {
                    handleToolUsage(toolData);
                }

                dragClone.remove();
                dragClone = null;
            }
        }

        document.addEventListener('pointermove', onInitialMove);
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
    }));
}

function handleToolUsage(tool) {
    if (tool.type === 'good') {
        const oldStage = animoStage;
        animoStage = Math.min(4, animoStage + 1);
        
        sounds.match();
        
        if (animoStage > oldStage) {
            sounds.shimmer();
            triggerGrowthVFX();
        } else {
            sounds.shimmer();
        }

        sounds.animal(getAnimoFolder());
        showFeedback(tool.lesson, 'success');
    } else {
        animoStage--;
        sounds.wrong();
        showFeedback(tool.lesson, 'error');
        
        if (animoStage < 1) {
            hasRunAway = true;
            sounds.lose || sounds.wrong();
        }
    }

    // Mark as used
    usedToolIds.add(tool.id);
    renderTools();
    updateAnimoUI();
    
    if (animoStage === 4) {
        setTimeout(() => {
            document.getElementById('mg-result-overlay').classList.remove('hidden');
            sounds.victory();
        }, 1200);
    }
}

function showFeedback(text, type) {
    const bubble = document.getElementById('mg-lesson-bubble');
    const textEl = document.getElementById('mg-lesson-text');
    if (!bubble) return;
    bubble.classList.remove('hidden', 'success', 'error', 'slide-out');
    bubble.classList.add(type);
    textEl.textContent = text;

    setTimeout(() => {
        bubble.classList.add('slide-out');
        setTimeout(() => bubble.classList.add('hidden'), 500);
    }, 3500);
}

function updateAnimoUI() {
    const animoFolder = getAnimoFolder();
    const asset = document.getElementById('mg-animo-asset');
    const msg = document.getElementById('mg-runaway-msg');
    const target = document.getElementById('mg-animo-target');
    const section = document.getElementById('screen-mood-battery');
    const container = document.getElementById('mood-animo-screen');

    if (section) {
        section.style.backgroundImage = `url('assets/animo/${animoFolder}/bg.svg')`;
        section.style.backgroundSize = 'cover';
        section.style.backgroundPosition = 'center';
    }
    
    if (container) {
        // Reset and re-apply movement class while keeping base layout classes
        container.className = `mg-container animo-mode ${getAnimoMovementClass(animoFolder)}`;
    }

    if (hasRunAway) {
        asset.classList.add('hidden');
        msg.classList.remove('hidden');
        target.classList.add('runaway');
        return;
    }

    asset.classList.remove('hidden');
    msg.classList.add('hidden');
    target.classList.remove('runaway');

    let stageName = 'baby';
    if (animoStage === 2) stageName = 'teen';
    if (animoStage >= 3) stageName = 'adult';

    asset.src = `assets/animo/${animoFolder}/${stageName}.svg`;
    target.className = `mg-animo-target stage-${animoStage}`;
}
function triggerGrowthVFX() {
    const container = document.querySelector('.mg-container');
    if (!container) return;
    
    container.classList.add('mg-growth-flash');
    setTimeout(() => container.classList.remove('mg-growth-flash'), 1000);

    const asset = document.getElementById('mg-animo-asset');
    if (asset) {
        asset.classList.add('mg-animating');
        setTimeout(() => asset.classList.remove('mg-animating'), 1000);
    }
}
