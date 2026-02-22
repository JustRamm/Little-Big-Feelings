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
                    <img src="assets/ui/heart.svg" alt="" class="plus-icon-img">
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
export function show({ d1, d2 }) {
    document.getElementById('match-img-1').src = d1.image;
    document.getElementById('match-img-2').src = d2.image;
    document.getElementById('match-pair-title').textContent = `${d1.name} + ${d2.name}`;
    document.getElementById('match-description').textContent = d1.description;
    document.getElementById('match-fact').textContent = d2.description;
    document.getElementById('overlay-match').classList.add('active');
}

export function hide() {
    document.getElementById('overlay-match').classList.remove('active');
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
