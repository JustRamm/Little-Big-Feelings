// ============================================================
//  screens/CopingAlphabet.js — Mini-Game: Alphabet Coping
// ============================================================
import { COPING_ALPHABET } from '../copingAtoZData.js';
import { sounds } from '../utils/sounds.js';

let currentIndex = 0;
let score = 0;
let streak = 0;
let timer;
let timeLeft = 10;

export function template() {
    return /* html */`
    <section id="screen-alphabet-game" class="screen" aria-label="Alphabet Coping Game">
        <div class="az-container">
            <header class="az-header">
                <button id="btn-az-back" class="btn-icon" aria-label="Back">
                    <i data-lucide="arrow-left"></i>
                </button>
                <div class="az-progress-rail">
                    <div id="az-progress-fill" class="az-progress-fill" style="width: 0%;"></div>
                </div>
                <div class="az-score-badge">
                    <span id="az-score">000</span>
                    <label>Score</label>
                </div>
            </header>

            <div class="az-game-main">
                <div id="az-start-screen" class="az-overlay-screen">
                    <h2 class="premium-title">A-Z Coping Rush</h2>
                    <p>Can you find a coping skill for every letter of the alphabet? Let's learn A to Z!</p>
                    <div class="az-tutorial-preview">
                         <div class="tutorial-item"><i data-lucide="type"></i> <span>A to Z</span></div>
                         <div class="tutorial-item"><i data-lucide="timer"></i> <span>Be Quick!</span></div>
                    </div>
                    <button class="btn-primary" id="btn-az-tutorial">How to Play?</button>
                    <button class="btn-secondary" id="btn-az-start" style="margin-top: 1rem;">Skip to Game</button>
                </div>

                <!-- Step-by-Step Tutorial -->
                <div id="az-tutorial-overlay" class="az-overlay hidden">
                    <div class="az-modal">
                        <div id="az-tutorial-content" class="az-tutorial-content">
                            <!-- Slides will be injected here -->
                        </div>
                        <div class="az-tutorial-dots" id="az-tutorial-dots"></div>
                        <button class="btn-primary" id="btn-az-tut-next">Next Tip</button>
                    </div>
                </div>

                <div id="az-game-play" class="az-play-area hidden">
                    <div class="az-huge-letter" id="az-letter">A</div>
                    
                    <div class="az-timer-bar">
                        <div id="az-timer-fill" class="az-timer-fill"></div>
                    </div>

                    <div class="az-options-grid" id="az-options">
                        <!-- 3 Options will be injected here -->
                    </div>

                    <div id="az-streak" class="az-streak-badge hidden">
                        <i data-lucide="zap"></i> <span id="az-streak-val">2x</span> STREAK
                    </div>
                </div>

                <div id="az-victory" class="az-overlay-screen hidden">
                    <div class="victory-stars-display" id="az-final-stars"></div>
                    <h3 id="az-final-title">Alphabet Master!</h3>
                    <p id="az-final-score">Final Score: 1250</p>
                    <button class="btn-primary" id="btn-az-finish">I am a Master!</button>
                </div>
            </div>
        </div>
    </section>`;
}

export function init({ navigate }) {
    document.getElementById('btn-az-back').addEventListener('click', () => {
        resetGame();
        navigate('emotionSelect');
    });

    document.getElementById('btn-az-tutorial').addEventListener('click', () => {
        showTutorial();
    });

    document.getElementById('btn-az-start').addEventListener('click', () => {
        startGame();
    });

    document.getElementById('btn-az-tut-next').addEventListener('click', () => {
        nextTutorialStep();
    });

    document.getElementById('btn-az-finish').addEventListener('click', () => {
        resetGame();
        navigate('emotionSelect');
    });
}

let tutorialStep = 0;
const tutorialSlides = [
    {
        icon: 'type',
        title: 'The Big Letter',
        text: 'Look at the giant letter in the middle. This is your target!'
    },
    {
        icon: 'mouse-pointer-2',
        title: 'Pick the Skill',
        text: 'Find the coping skill that starts with that letter and click it!'
    },
    {
        icon: 'timer',
        title: 'Watch the Time',
        text: 'The orange bar shows your time. Go fast to get a high score!'
    }
];

function showTutorial() {
    tutorialStep = 0;
    document.getElementById('az-tutorial-overlay').classList.remove('hidden');
    updateTutorialUI();
}

function nextTutorialStep() {
    tutorialStep++;
    if (tutorialStep >= tutorialSlides.length) {
        document.getElementById('az-tutorial-overlay').classList.add('hidden');
        startGame();
    } else {
        updateTutorialUI();
    }
}

function updateTutorialUI() {
    const content = document.getElementById('az-tutorial-content');
    const slide = tutorialSlides[tutorialStep];
    const nextBtn = document.getElementById('btn-az-tut-next');
    
    content.innerHTML = `
        <div class="mb-modal-icon"><i data-lucide="${slide.icon}"></i></div>
        <h3>${slide.title}</h3>
        <p>${slide.text}</p>
    `;

    const dots = document.getElementById('az-tutorial-dots');
    dots.innerHTML = tutorialSlides.map((_, i) => 
        `<span class="dot ${i === tutorialStep ? 'active' : ''}"></span>`
    ).join('');

    nextBtn.textContent = tutorialStep === tutorialSlides.length - 1 ? "Let's Play!" : "Next Tip";
    
    if (window.lucide) window.lucide.createIcons();
}

function startGame() {
    currentIndex = 0;
    score = 0;
    streak = 0;
    document.getElementById('az-start-screen').classList.add('hidden');
    document.getElementById('az-game-play').classList.remove('hidden');
    document.getElementById('az-victory').classList.add('hidden');
    nextRound();
}

function nextRound() {
    if (currentIndex >= COPING_ALPHABET.length) {
        showVictory();
        return;
    }

    const currentData = COPING_ALPHABET[currentIndex];
    
    // Update UI
    document.getElementById('az-letter').textContent = currentData.letter;
    const progress = (currentIndex / COPING_ALPHABET.length) * 100;
    document.getElementById('az-progress-fill').style.width = `${progress}%`;
    
    // Generate Options
    const options = generateOptions(currentData);
    const optionsGrid = document.getElementById('az-options');
    optionsGrid.innerHTML = options.map(opt => `
        <button class="az-option-card" data-is-correct="${opt.isCorrect}">
            <div class="az-opt-icon"><i data-lucide="${opt.icon}"></i></div>
            <p>${opt.action}</p>
        </button>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    // Reset Timer
    clearInterval(timer);
    timeLeft = 10;
    startTimer();

    // Event listeners
    optionsGrid.querySelectorAll('.az-option-card').forEach(card => {
        card.addEventListener('click', () => handleChoice(card));
    });
}

function generateOptions(correct) {
    let opts = [{ ...correct, isCorrect: true }];
    
    // Pick 2 random wrong options
    const pool = COPING_ALPHABET.filter(item => item.letter !== correct.letter);
    while (opts.length < 3) {
        const rand = pool[Math.floor(Math.random() * pool.length)];
        if (!opts.find(o => o.letter === rand.letter)) {
            opts.push({ ...rand, isCorrect: false });
        }
    }

    // Shuffle
    return opts.sort(() => Math.random() - 0.5);
}

function handleChoice(card) {
    if (card.dataset.isCorrect === 'true') {
        sounds.match();
        card.classList.add('correct');
        streak++;
        score += 100 + (streak * 20) + (timeLeft * 10);
        updateScore();
        currentIndex++;
        
        if (streak >= 2) {
            const sb = document.getElementById('az-streak');
            sb.classList.remove('hidden');
            document.getElementById('az-streak-val').textContent = `${streak}x`;
        }

        setTimeout(nextRound, 600);
    } else {
        sounds.wrong();
        card.classList.add('wrong');
        streak = 0;
        document.getElementById('az-streak').classList.add('hidden');
        timeLeft -= 2; // Penalty
    }
}

function updateScore() {
    document.getElementById('az-score').textContent = score.toString().padStart(3, '0');
}

function startTimer() {
    const fill = document.getElementById('az-timer-fill');
    timer = setInterval(() => {
        timeLeft -= 0.1;
        const pct = (timeLeft / 10) * 100;
        fill.style.width = `${pct}%`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            sounds.wrong();
            currentIndex++; // Move to next anyway but no score
            streak = 0;
            document.getElementById('az-streak').classList.add('hidden');
            nextRound();
        }
    }, 100);
}

function showVictory() {
    clearInterval(timer);
    document.getElementById('az-game-play').classList.add('hidden');
    document.getElementById('az-victory').classList.remove('hidden');
    document.getElementById('az-final-score').textContent = `Final Score: ${score}`;
    
    const starsContainer = document.getElementById('az-final-stars');
    const starCount = score > 3000 ? 3 : score > 1500 ? 2 : 1;
    starsContainer.innerHTML = '';
    for(let i=0; i<3; i++) {
        const active = i < starCount ? 'star-active' : 'star-inactive';
        starsContainer.innerHTML += `<i data-lucide="star" class="ui-star ${active}"></i>`;
    }
    if (window.lucide) window.lucide.createIcons();
}

function resetGame() {
    clearInterval(timer);
    currentIndex = 0;
    score = 0;
    streak = 0;
}
