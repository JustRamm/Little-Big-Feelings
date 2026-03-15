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
                    <p>Match the correct coping skill to the letter before the time runs out! Can you reach Z?</p>
                    <button class="btn-primary" id="btn-az-start">Begin Challenge</button>
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
        navigate('splash');
    });

    document.getElementById('btn-az-start').addEventListener('click', () => {
        startGame();
    });

    document.getElementById('btn-az-finish').addEventListener('click', () => {
        resetGame();
        navigate('splash');
    });
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
