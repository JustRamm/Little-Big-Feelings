// ============================================================
//  screens/BreathingBuddy.js — Unique Emotional Regulation Feature
// ============================================================
import { sounds } from '../utils/sounds.js';

export function template() {
    return /* html */`
    <div id="overlay-breathing" class="overlay overlay-breathing" aria-hidden="true">
        <div class="overlay-card breathing-card">
            
            <div class="breathing-oops-row">
                <div class="breathing-oops-icon">
                    <img src="assets/ui/question.svg" alt="Oops" style="width: 50px;">
                </div>
                <div class="breathing-header-text">
                    <h2 class="breathing-title">Not a match this time!</h2>
                    <p class="breathing-subtitle">Let's take a quick breath buddy break together.</p>
                </div>
            </div>

            <div class="breathing-circle-wrap">
                <div class="breathing-circle" id="breathing-circle">
                    <img src="assets/ui/breathe_in.svg" id="breathing-icon" class="breathing-emoji" alt="">
                </div>
                <p class="breathing-phase-text" id="breathing-text">Ready?</p>
            </div>

            <button id="btn-breathing-done" class="btn-primary breathing-done-btn breathing-done-hidden" type="button">
                <span>I feel better!</span>
            </button>
        </div>
    </div>`;
}

/**
 * @param {() => void} onDone - called when user clicks "I feel better"
 */
export function show(onDone) {
    const overlay = document.getElementById('overlay-breathing');
    const ctrlBtn = document.getElementById('btn-breathing-done');
    const text = document.getElementById('breathing-text');
    const circle = document.getElementById('breathing-circle');
    const icon = document.getElementById('breathing-icon');

    overlay.classList.add('active'); // Use .active instead of aria-hidden if main.js expects it
    overlay.setAttribute('aria-hidden', 'false');
    ctrlBtn.classList.add('breathing-done-hidden');
    text.textContent = "Ready?";
    circle.className = "breathing-circle phase-idle";
    icon.src = 'assets/ui/breathe_in.svg';

    // Start cycle after a short delay
    setTimeout(() => {
        startBreatheCycle(circle, text, icon, () => {
            ctrlBtn.classList.remove('breathing-done-hidden');
            text.textContent = "Great job!";
            sounds.breathBell();
        });
    }, 800);

    const onFinish = () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        ctrlBtn.removeEventListener('click', onFinish);
        if (onDone) onDone();
    };
    ctrlBtn.addEventListener('click', onFinish);
}

function startBreatheCycle(circle, text, icon, onCycleDone) {
    // 1. IN (4s)
    if (!text || !circle || !icon) return;

    text.textContent = "Breathe In...";
    circle.className = "breathing-circle phase-expand";
    icon.src = 'assets/ui/breathe_in.svg';

    setTimeout(() => {
        // 2. HOLD (2s)
        text.textContent = "Hold...";
        circle.className = "breathing-circle phase-hold";
        icon.src = 'assets/ui/breathe_hold.svg';

        setTimeout(() => {
            // 3. OUT (4s)
            text.textContent = "Slowly Out...";
            circle.className = "breathing-circle phase-shrink";
            icon.src = 'assets/ui/breathe_out.svg';

            setTimeout(() => {
                onCycleDone();
            }, 4000);
        }, 2000);
    }, 4000);
}

export function init() {
    // No specific global setup needed here
}
