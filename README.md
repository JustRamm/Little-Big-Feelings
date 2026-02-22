# Emotion Match-Up

Emotion Match-Up is a professional, educational memory card game designed to help children develop emotional intelligence and self-regulation skills. Through interactive gameplay, children learn to identify emotional triggers, recognize feelings, and discover healthy coping strategies.

---

## Key Features

### Educational Matching System
The core mechanic connects three vital aspects of emotional development:
- **Triggers**: Identifying situations that cause strong feelings.
- **Emotions**: Building vocabulary for feelings like sadness, anger, fear, and pride.
- **Actions**: Discovering constructive ways to handle emotions, such as deep breathing or talking to a trusted adult.

### Professional Illustration System
The game features a completely custom, high-quality vector illustration library. Every asset is a hand-crafted SVG, ensuring crisp visuals on any screen size.
- **12 Unique Avatars**: Players can choose a character that represents them.
- **16 Educational Cards**: Balanced 8-pair sets covering a wide emotional spectrum.
- **Animated UI**: Smooth transitions, 3D card flips, and playful micro-animations.

### Dynamic Difficulty & Tools
- **Three Skill Levels**: Easy (6 cards), Medium (10 cards), and Hard (16 cards).
- **Peek Power-Up**: A unique tool that temporarily reveals all cards. Duration and uses are balanced per difficulty level.
- **Smart Hints**: A supportive hint system that guides players toward their next connection.
- **Breathing Buddy**: A built-in calming exercise that activates when players hit an "oops" moment, teaching resilience through deep breathing.

---

## Technical Architecture

The project is built with a focus on modularity and performance, utilizing a modern SPA (Single Page Application) approach with vanishingly small overhead.

### Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, and JavaScript (ES Modules).
- **Asset Pipeline**: Scalable Vector Graphics (SVG) for all visual elements.
- **State Management**: Centralized reactive state for round tracking and player progress.
- **Storage**: Persistent local storage for player profiles, settings, and high scores.
- **Tooling**: Vite for optimized development and bundling.

### Directory Structure
```text
/assets/
  ├── avatars/        # Custom player characters
  ├── background/     # Thematic game environments
  ├── trigger/        # Situation cards
  ├── emotion/        # Feeling cards
  ├── action_match/   # Coping strategy cards
  └── ui/             # Interface icons and feedback elements
/screens/             # Modular SPA screen components
/utils/               # LocalStorage and Audio management
/main.js              # Application orchestrator
/gameState.js         # Reactive state container
/gameData.js          # Card definitions and level balance
/style.css            # Enterprise-grade CSS design system
```

---

## Getting Started

### Prerequisites
- Node.js (Version 18.0 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/JustRamm/Emo-Match.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Emo-Match
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Launch the development server:
   ```bash
   npm run dev
   ```

---

## Development Roadmap
- [x] Full SVG asset integration
- [x] Dynamic level difficulty system
- [x] Multi-use power-up tools (Peek/Hint)
- [x] Persistent player profile system
- [x] Breathing Buddy regulation module
- [ ] Multi-language support (ESN/FRN)
- [ ] Offline-first PWA support
- [ ] Enhanced accessibility (ARIA-Live region support)

---

## Repository
Maintained at: [github.com/JustRamm/Emo-Match](https://github.com/JustRamm/Emo-Match)

© 2026 JustRamm. Dedicated to child development and emotional literacy.
