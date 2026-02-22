// ============================================================
//  screens/Splash.js — Screen 1: Title / Splash
// ============================================================

/**
 * Returns the HTML markup for the Splash screen.
 * Called once by main.js to inject into #app.
 */
export function template() {
    return /* html */`
    <section id="screen-splash" class="screen active" aria-label="Splash Screen">
        <div class="splash-content">
            <h1 class="game-title">Emotion<br><span>Match-Up!</span></h1>
            <div class="character-preview">
                <img
                    src="/assets/emotion/angry_monster_card.svg"
                    class="bounce-anim"
                    alt="Friendly emotion monster"
                >
            </div>
            <button id="btn-start" class="btn-primary">Play Now! 🎮</button>
            <p class="tagline">Learn about feelings in a fun way!</p>
        </div>
    </section>`;
}

/**
 * Wires up the Splash screen's button.
 * @param {{ navigate: (screen: string) => void }} deps
 */
export function init({ navigate }) {
    document.getElementById('btn-start')
        .addEventListener('click', () => navigate('levelSelect'));
}
