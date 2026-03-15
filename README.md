# <img src="public/assets/brand/logo.svg" width="48" height="48" valign="middle"> Emo Charge! — Emotional Intelligence Game

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **"You are BRAVER than you believe. STRONGER than you seem. SMARTER than you think. AND LOVED more than you know."**

**Emo Charge** is an interactive, browser-based memory matching game designed to help children and young people build emotional literacy. Based on the **"Recharge Without Charge"** curriculum by [Mind Empowered](https://www.mind-empowered.org), the game transforms educational psychiatric resources into an engaging, gamified experience.

---

## <img src="public/assets/action_match/self_affirmation_card.svg" width="32" height="32" valign="middle"> Key Features

- **5 Core Emotional Themes**: Focused modules for Anger, Sadness, Anxiety, Loneliness, and Stress.
- **50 Unique Card Pairs**: Each pair connects a real-world trigger or emotion to a scientifically-backed positive coping action.
- **Progressive Mastery**: 
    - **Beginner to Full Journey**: Graduated difficulty levels to build confidence.
    - **Grand Master Mode**: The final challenge mixing all emotions into one large board.
- **Breathing Buddy**: An integrated emotional regulation tool that triggers during difficult moments, teaching deep-breathing techniques.
- **Knowledge Journal**: A collection of every unlocked insight. Collect all 50 to earn the **Emotion Champion Certificate**.
- **Personalized Profiles**: Customizable names and 12 unique character avatars.
- **Persistent Progress**: LocalStorage integration to save player identity, unlocked insights, and high scores.

---

## <img src="public/assets/action_match/talk_adult_card.svg" width="32" height="32" valign="middle"> Educational Content

All game data is sourced directly from the **"Recharge Without Charge"** curriculum. The game covers:

| Emotion | Core Lesson | Example Match |
| :--- | :--- | :--- |
| **Anger** | Signal to fight problems safely. | Walk Away, Breathe, Count to 20 |
| **Sadness** | Connecting with loved ones. | Write a Letter, Talk it Out |
| **Anxiety** | The body's way of staying safe. | Brave Affirmations, Slow Breathing |
| **Loneliness** | A sign to connect & self-care. | Reach out, Join a Group, Self-Care |
| **Stress** | Positive vs. Negative coping. | Healthy Habits, Trash Bad Thoughts |

---

## <img src="public/assets/action_match/mindfulness_card.svg" width="32" height="32" valign="middle"> Technical Architecture

This project is built with a **Vanilla JavaScript SPA (Single Page Application)** architecture, prioritizing performance and zero-dependency reliability.

- **Modular Screens**: Every screen (Splash, Game, Victory, Journal) is a standalone ES module.
- **Reactive State**: Centralized state management in `gameState.js`.
- **Custom Animation Engine**: High-performance CSS transitions and JS-triggered visual effects.
- **Asset Management**: Uses the `public/` directory for efficient Vite production builds on Vercel.
- **Tooling**: 
  - `Vite` for development and bundling.
  - `Lucide Icons` (Self-hosted) for accessible UI elements.
  - `Web Audio API` for synthesized background music and sound effects.

### Directory Overview
- [/public/assets](file:///c:/Users/abira/OneDrive/Desktop/MM/public/assets/README.md): SVG illustrations, branding, and player avatars.
- [/screens](file:///c:/Users/abira/OneDrive/Desktop/MM/screens/README.md): Modular UI components and navigation logic.
- [/utils](file:///c:/Users/abira/OneDrive/Desktop/MM/utils/README.md): Audio, storage, and visual effect helpers.

---

## <img src="public/assets/brand/logo.svg" width="32" height="32" valign="middle"> Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### Installation & Run

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/JustRamm/Emo-Match.git
    cd Emo-Match
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Launch Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:5173/`

---

## <img src="public/assets/action_match/hug_card.svg" width="32" height="32" valign="middle"> Attribution

Educational content provided by **Mind Empowered**. 
Visit [mind-empowered.org](https://www.mind-empowered.org) for more resources on emotional wellbeing.

---

*Dedicated to empowering the next generation with the tools to navigate their emotions with confidence and resilience.* <img src="public/assets/avatars/avatar_1.svg" width="24" height="24" valign="middle">
