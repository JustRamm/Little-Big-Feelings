// ============================================================
//  screens/OverlayMatch.js — Overlay: Correct Match Found
// ============================================================

export function template() {
    return /* html */`
    <div id="overlay-match" class="overlay" role="dialog" aria-modal="true" aria-label="Match Found">
        <div class="overlay-card match-overlay-card">
            <div class="match-badge">Great Connection!</div>
            <h3 id="match-pair-title" class="match-title">Pair Name</h3>

            <div class="match-visuals">
                <div class="matched-pair">
                    <img id="match-img-1" src="" alt="First matched card">
                    <i data-lucide="heart" class="plus-icon-img" style="color: var(--pink); fill: var(--pink);"></i>
                    <img id="match-img-2" src="" alt="Second matched card">
                </div>
            </div>

            <div class="match-descriptions">
                <p id="match-description" class="match-desc-primary"></p>
                <p id="match-fact"        class="match-desc-secondary"></p>
            </div>

            <button id="btn-match-continue" class="btn-primary">Keep Going!</button>
        </div>
    </div>`;
}

/**
 * Populates and shows the overlay with pair data.
 * @param {{ d1: object, d2: object }} pair
 */
import { sounds } from '../utils/sounds.js';
import { state } from '../gameState.js';

let autoDismissTimer = null;

export function show({ d1, d2 }) {
    sounds.shimmer();

    document.getElementById('match-img-1').src = d1.image;
    document.getElementById('match-img-2').src = d2.image;
    document.getElementById('match-pair-title').textContent = `${d1.name} + ${d2.name}`;
    document.getElementById('match-description').textContent = d1.description;
    document.getElementById('match-fact').textContent = d2.description;
    document.getElementById('overlay-match').classList.add('active');

    // Narrate for children
    if ('speechSynthesis' in window && state.speechEnabled) {
        window.speechSynthesis.cancel(); // stop previous
        const text = `Great job! You matched ${d1.name} with ${d2.name}. ${d1.description}`;
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = 1.1;
        msg.pitch = 1.1;
        window.speechSynthesis.speak(msg);
    }

    // Auto-dismiss after 6 seconds to make it "easier for player to play"
    clearTimeout(autoDismissTimer);
    autoDismissTimer = setTimeout(() => {
        const btn = document.getElementById('btn-match-continue');
        if (document.getElementById('overlay-match').classList.contains('active')) {
            btn.click();
        }
    }, 6000);
}

export function hide() {
    document.getElementById('overlay-match').classList.remove('active');
    clearTimeout(autoDismissTimer);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

/**
 * @param {{ onContinue: () => void }} deps
 */
export function init({ onContinue }) {
    document.getElementById('btn-match-continue')
        .addEventListener('click', () => {
            hide();
            onContinue();
        });
}
