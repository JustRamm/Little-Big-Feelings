import { state } from '../gameState.js';

/**
 * Applies global accessibility styles based on current state.
 * Targets: <html> or <body> to provide CSS hook context.
 */
export function applyAccessibilitySettings() {
    const root = document.documentElement;

    // 1. High Contrast
    if (state.highContrast) {
        root.classList.add('a11y-high-contrast');
    } else {
        root.classList.remove('a11y-high-contrast');
    }

    // 2. Dyslexic Font
    if (state.dyslexicFont) {
        root.classList.add('a11y-dyslexic-font');
    } else {
        root.classList.remove('a11y-dyslexic-font');
    }

    // 3. Reduced Motion
    if (state.reducedMotion) {
        root.classList.add('a11y-reduced-motion');
    } else {
        root.classList.remove('a11y-reduced-motion');
    }
}
