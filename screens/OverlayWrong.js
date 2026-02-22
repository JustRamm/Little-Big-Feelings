// ============================================================
//  screens/OverlayWrong.js — Overlay: Wrong / No Match
// ============================================================

const AUTO_DISMISS_MS = 2200;
let _dismissTimer = null;

export function template() {
    return /* html */`
    <div id="overlay-wrong" class="overlay overlay-wrong" role="alert" aria-live="assertive">
        <div class="overlay-card wrong-card">
            <div class="wrong-icon">🙈</div>
            <h3>Oops! Not quite!</h3>
            <p>Those two don't match — try again! You've got this! 💪</p>
            <button id="btn-wrong-continue" class="btn-secondary">Try Again!</button>
        </div>
    </div>`;
}

export function show() {
    document.getElementById('overlay-wrong').classList.add('active');

    // Auto-dismiss after AUTO_DISMISS_MS if the user doesn't click
    clearTimeout(_dismissTimer);
    _dismissTimer = setTimeout(hide, AUTO_DISMISS_MS);
}

export function hide() {
    clearTimeout(_dismissTimer);
    document.getElementById('overlay-wrong').classList.remove('active');
}

/**
 * @param {object} _deps  — no external deps needed; included for consistency
 */
export function init(_deps = {}) {
    document.getElementById('btn-wrong-continue')
        .addEventListener('click', hide);
}
