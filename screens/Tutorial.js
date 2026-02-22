// ============================================================
//  screens/Tutorial.js — Screen 3: How to Play
// ============================================================

export function template() {
    return /* html */`
    <section id="screen-tutorial" class="screen" aria-label="How to Play">
        <div class="container">
            <button id="btn-tutorial-back" class="btn-icon back-arrow" aria-label="Go back to level select" type="button" style="position: absolute; left: 1rem; top: 1rem;">
                <i data-lucide="arrow-left"></i>
            </button>
            <h2>How to Play</h2>
            <p style="margin-bottom: 1.5rem; font-size: 0.95rem; color: #757575; font-weight: 600;">
                Based on <strong>Recharge Without Charge</strong> by Mind Empowered
            </p>
            <div class="tutorial-grid">

                <div class="tutorial-step">
                    <div class="step-num">1</div>
                    <div class="step-icon">
                        <i data-lucide="help-circle" style="color: var(--blue);"></i>
                    </div>
                    <p>Flip a card to reveal an <strong>Emotion</strong> — like Anger, Sadness, or Anxiety.</p>
                </div>

                <div class="tutorial-step">
                    <div class="step-num">2</div>
                    <div class="step-icon">
                        <i data-lucide="layers" style="color: var(--pink);"></i>
                    </div>
                    <p>Find its matching <strong>Coping Action</strong> — a healthy tool to handle that feeling!</p>
                </div>

                <div class="tutorial-step">
                    <div class="step-num">3</div>
                    <div class="step-icon">
                        <i data-lucide="star" style="color: var(--yellow);"></i>
                    </div>
                    <p>Match them all to earn <strong>Stars</strong> and discover your emotional toolkit!</p>
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

    document.getElementById('btn-tutorial-back')
        .addEventListener('click', () => {
            navigate('levelSelect');
        });
}
