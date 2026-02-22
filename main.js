const cardsData = [
    {
        id: 'trigger-broken-robot',
        matchId: 'emotion-sad-child',
        image: '/assets/trigger/broken_robot_card.svg',
        type: 'trigger',
        name: 'Broken Toy',
        description: "It looks like the robot's arm broke! This is a TRAGIC trigger. It's okay to feel sad."
    },
    {
        id: 'emotion-sad-child',
        matchId: 'trigger-broken-robot',
        image: '/assets/emotion_match/sad_child_card.svg',
        type: 'emotion-match',
        name: 'Sad Child',
        description: "We feel sad when things we love get broken. A big blue raincloud is just a passing feeling!"
    },
    {
        id: 'emotion-angry-monster',
        matchId: 'action-calm-child',
        image: '/assets/emotion/angry_monster_card.svg',
        type: 'emotion',
        name: 'Angry Monster',
        description: "PHUFF! Steam from the ears! This monster is feeling ANGRY. What can we do?"
    },
    {
        id: 'action-calm-child',
        matchId: 'emotion-angry-monster',
        image: '/assets/action_match/calm_child_card.svg',
        type: 'action-match',
        name: 'Calm Breathing',
        description: "Blowing bubbles helps us take deep breaths and find our calm again. Bye bye, anger steam!"
    }
];

// Replicating to make a 8-card grid (2 of each for a better memory experience)
let gameCards = [...cardsData];
let flippedCards = [];
let matchedCount = 0;
let stars = 0;

// Screen Management
const screens = {
    splash: document.getElementById('screen-splash'),
    tutorial: document.getElementById('screen-tutorial'),
    game: document.getElementById('screen-game'),
    victory: document.getElementById('screen-victory'),
    overlay: document.getElementById('overlay-match')
};

function showScreen(screenId) {
    Object.values(screens).forEach(screen => {
        if (screen) screen.classList.remove('active');
    });
    screens[screenId].classList.add('active');
}

// Event Listeners
document.getElementById('btn-start').addEventListener('click', () => showScreen('tutorial'));
document.getElementById('btn-tutorial-ok').addEventListener('click', () => {
    showScreen('game');
    initGame();
});
document.getElementById('btn-reset').addEventListener('click', initGame);
document.getElementById('btn-match-continue').addEventListener('click', () => {
    screens.overlay.classList.remove('active');
});
document.getElementById('btn-play-again').addEventListener('click', () => showScreen('splash'));

// Game Logic
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function initGame() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    flippedCards = [];
    matchedCount = 0;
    stars = 0;
    updateStats();

    // Use 4 cards as specified in the "2x2 grid" prompt
    const shuffled = shuffle([...gameCards]);

    shuffled.forEach(card => {
        const cardEl = createCardElement(card);
        board.appendChild(cardEl);
    });
}

function createCardElement(cardData) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = cardData.id;
    card.dataset.matchId = cardData.matchId;

    card.innerHTML = `
        <div class="card-face card-back"></div>
        <div class="card-face card-front">
            <img src="${cardData.image}" alt="${cardData.name}">
        </div>
    `;

    card.addEventListener('click', () => flipCard(card, cardData));
    return card;
}

function flipCard(cardEl, cardData) {
    if (flippedCards.length === 2 || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) {
        return;
    }

    cardEl.classList.add('flipped');
    flippedCards.push({ el: cardEl, data: cardData });

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.data.matchId === card2.data.id) {
        // MATCH!
        setTimeout(() => {
            handleMatch(card1, card2);
        }, 600);
    } else {
        // NO MATCH
        setTimeout(() => {
            card1.el.classList.remove('flipped');
            card2.el.classList.remove('flipped');
            flippedCards = [];
        }, 1200);
    }
}

function handleMatch(card1, card2) {
    card1.el.classList.add('matched');
    card2.el.classList.add('matched');
    matchedCount += 2;
    stars += 1;
    updateStats();

    // Show Educational Overlay
    showMatchDiscovery(card1.data, card2.data);

    flippedCards = [];

    if (matchedCount === gameCards.length) {
        setTimeout(() => showScreen('victory'), 1500);
    }
}

function showMatchDiscovery(data1, data2) {
    const overlay = screens.overlay;
    const img1 = document.getElementById('match-img-1');
    const img2 = document.getElementById('match-img-2');
    const description = document.getElementById('match-description');
    const message = document.getElementById('match-message');

    img1.src = data1.image;
    img2.src = data2.image;

    // Combine descriptions for context
    description.textContent = data1.description + " " + data2.description;
    message.textContent = "Great Connection!";

    overlay.classList.add('active');
}

function updateStats() {
    document.getElementById('star-count').textContent = stars;
}

// Start in Splash Screen
showScreen('splash');
