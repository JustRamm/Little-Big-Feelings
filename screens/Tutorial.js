// ============================================================
//  screens/Tutorial.js — Screen 3: How to Play
// ============================================================

export function template() {
    return /* html */`
    <section id="screen-tutorial" class="screen" aria-label="How to Play">
        <div class="container">
            <h2>How to Play</h2>
            <div class="tutorial-grid">

                <div class="tutorial-step">
                    <div class="step-num">1</div>
                    <div class="step-icon">
                        <img src="/assets/ui/question.svg" alt="">
                    </div>
                    <p>Flip a card to see a <strong>Trigger</strong>,
                       <strong>Feeling</strong> or <strong>Action</strong>.</p>
                </div>

                <div class="tutorial-step">
                    <div class="step-num">2</div>
                    <div class="step-icon">
                        <img src="/assets/ui/stat_pairs.svg" alt="">
                    </div>
                    <p>Find the <strong>Match</strong> that connects to it!</p>
                </div>

                <div class="tutorial-step">
                    <div class="step-num">3</div>
                    <div class="step-icon">
                        <img src="/assets/ui/star_gold.svg" alt="">
                    </div>
                    <p>Match them all to earn <strong>Stars</strong>.
                       Fewer tries = more stars!</p>
                </div>

            </div>
            <button id="btn-tutorial-ok" class="btn-primary">Got it! Let's Play!</button>
        </div>
    </section>`;
}

/**
 * @param {{ navigate: (screen: string) => void, startGame: () => void }} deps
 */
export function init({ navigate, startGame }) {
    document.getElementById('btn-tutorial-ok')
        .addEventListener('click', () => {
            navigate('game');
            startGame();
        });
}
