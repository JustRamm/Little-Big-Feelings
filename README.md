# Emo-Match

> A vibrant, educational memory card game for children that teaches emotional intelligence — matching triggers, feelings, and healthy coping actions.

---

## Overview

**Emo-Match** is a browser-based memory card game designed for young children (ages 4–9). Players flip cards to match emotional **triggers** with **feelings** and discover **healthy actions** to cope with those feelings. Every match reveals a short, supportive educational message that helps children build emotional vocabulary and self-regulation skills.

The art style is inspired by high-quality children's apps like **Toca Boca** and **Bluey** — vibrant, rounded, and full of personality.

---

## Screens

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Splash / Title** | Animated entry screen with the game title and a bouncing character |
| 2 | **How to Play** | 3-step visual tutorial explaining the matching mechanic |
| 3 | **Game Board** | The interactive 2x2 card grid with star counter and reset button |
| 4 | **Match Discovery Overlay** | Pops up on every successful match with an educational message |
| 5 | **Victory Screen** | Celebrates completing the game with a "Play Again" option |

---

## Game Cards

All card illustrations are hand-crafted SVGs stored in the `assets/` folder:

| Card | Type | File |
|------|------|------|
| Broken toy robot (sad frown) | Trigger | `assets/trigger/broken_robot_card.svg` |
| Child with watery eyes & raincloud | Emotion Match | `assets/emotion_match/sad_child_card.svg` |
| Fluffy red monster puffing steam | Emotion | `assets/emotion/angry_monster_card.svg` |
| Child sitting cross-legged blowing bubbles | Action Match | `assets/action_match/calm_child_card.svg` |

---

## Project Structure

```
Emo-Match/
├── assets/
│   ├── background/
│   │   └── game_bg.svg              # Animated background
│   ├── trigger/
│   │   └── broken_robot_card.svg    # Card 1 — Trigger
│   ├── emotion_match/
│   │   └── sad_child_card.svg       # Card 2 — Emotion Match
│   ├── emotion/
│   │   └── angry_monster_card.svg   # Card 3 — Emotion
│   └── action_match/
│       └── calm_child_card.svg      # Card 4 — Healthy Action
├── index.html                       # SPA shell with all 5 screen structures
├── style.css                        # Full design system & animations
├── main.js                          # Game engine, card logic, screen management
├── package.json                     # Vite dev server config
└── README.md
```

---

## Tech Stack

- **HTML5** — Semantic SPA structure
- **Vanilla CSS3** — Custom design system, 3D card flip animations, keyframe effects
- **Vanilla JavaScript (ES Modules)** — Game logic, screen transitions, match detection
- **Vite** — Lightning-fast local dev server
- **Google Fonts** — Outfit (800, 600, 400) for the rounded, friendly typography
- **SVG** — All game illustrations are scalable vector graphics

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/JustRamm/Emo-Match.git
cd Emo-Match

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:5173/` in your browser.

---

## How to Play

1. **Flip** any card to reveal it — it could be a Story (trigger), a Feeling, or a Healthy Action.
2. **Flip a second card** to try and find its matching pair.
3. If the cards **match**, a pop-up explains the emotional connection.
4. Match **all pairs** to win stars and reach the Victory screen!

---

## Design

- **Color Palette:** Highly saturated pastels — bubblegum pink (`#FF80AB`), sunny yellow (`#FFD54F`), sky blue (`#4FC3F7`), lime green (`#A5D6A7`)
- **Typography:** [Outfit](https://fonts.google.com/specimen/Outfit) — rounded and friendly
- **Card Style:** Thick white borders, soft 3D drop shadow, 180° flip animation
- **Background:** Layered SVG blobs, stars, and wavy stripes for a playful atmosphere

---

## Roadmap

- [ ] Confetti animation on Victory screen
- [ ] Sound effects and background music toggle
- [ ] Level select (Easy 4-card / Medium 8-card / Hard 12-card grids)
- [ ] More emotion card sets (jealousy, excitement, worry)
- [ ] Lesson summary card at end of game
- [ ] Accessibility improvements (keyboard navigation, screen reader support)

---

## Author

Built with love for children's emotional wellbeing.

**Repository:** [github.com/JustRamm/Emo-Match](https://github.com/JustRamm/Emo-Match)
