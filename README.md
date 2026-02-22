# Emo Charge — The Game

> An interactive emotional intelligence card-matching game based on the **"Recharge Without Charge"** resource by [Mind Empowered](https://www.mind-empowered.org).
>
> *You are BRAVER than you believe. STRONGER than you seem. SMARTER than you think. AND LOVED more than you know.*

---

## About This Game

**Emo Charge** is a browser-based memory matching game that transforms the educational content of the Mind Empowered resource into an engaging, interactive experience.

Children and young people match **Emotion cards** with their corresponding **Coping Action cards** — building a practical emotional toolkit along the way. Every successful match surfaces a real insight from the original resource, teaching children how to handle their feelings in healthy ways.

---

## Content Source

All game content is derived directly from the **"Recharge Without Charge"** PDF by Mind Empowered. The original material covers:

| Source Page | Topic Used In Game |
|---|---|
| Page 2 | 8 Basic Emotions (Anger, Sadness, Joy, Fear, Trust, Disgust, Anticipation, Surprise) |
| Page 3 | Positive vs Negative Coping Mechanisms |
| Pages 4–5 | Anger Triggers & Rules of Feeling Angry |
| Page 6 | Anger Coping Checklist (Walk Away, Breathe, Count, I-Messages) |
| Page 7 | Reactive vs Proactive — Circle of Control vs Circle of Concern |
| Pages 8–9 | Sadness Triggers & How to Accept Sadness |
| Page 10 | What to Do When You Feel Sad |
| Pages 11–12 | How Anxiety Presents Itself & What to Tell Yourself When Anxious |
| Page 13 | Stressful Day To-Do List |
| Pages 14–16 | 10 Signs of Loneliness & Dealing with Loneliness |
| Page 17 | A to Z of Coping Skills |
| Page 18 | It's OK to Feel (Scared, Ashamed, Sad, Frustrated, Angry, Lonely, Jealous, Guilty...) |
| Page 19 | Closing Affirmation: Braver / Stronger / Smarter / Loved |

---

## Game Card Pairs

There are **12 pairs** in the game, one for each major theme of the source material:

| Emotion Card | Coping Action Card | Source Pages |
|---|---|---|
| Feeling Angry | Walk Away & Breathe | Pages 4, 5, 6 |
| Feeling Sad | Write & Express | Pages 8, 9, 10 |
| Feeling Anxious | Brave Affirmations | Pages 11, 12 |
| Feeling Loneliness | Connect & Self-Care | Pages 14, 15, 16 |
| Feeling Stressed | Positive Coping | Pages 3, 13 |
| Feeling Frustrated | Take a Break | Pages 4, 6 |
| Feeling Joyful | Celebrate! | Pages 2, 10 |
| Feeling Overwhelmed | Focus on Your Circle | Page 7 |
| Feeling Ashamed | Accept Your Feelings | Pages 9, 18 |
| Feeling Disrespected | Use I-Messages | Pages 4, 6 |
| Feeling Jealous | Mindful Observation | Pages 12, 17, 18 |
| Feeling Not Enough | You Are Enough | Pages 12, 19 |

---

## Difficulty Levels

| Level | Name | Coverage |
|---|---|---|
| 1 | Beginner | 3 pairs — Core Emotions (Anger, Sadness, Anxiety) |
| 2 | Intermediate | 6 pairs — Deeper Feelings (adds Loneliness, Stress, Frustration) |
| 3 | Full Journey | 12 pairs — Complete resource coverage |

---

## Game Mechanics

### Match System
Players flip cards to find an Emotion card and its matching Coping Action card. Each successful match reveals an educational insight sourced directly from the PDF.

### Power-Up Tools
- **Peek**: Briefly reveals all face-down cards. Duration and uses decrease with difficulty level.
- **Hint**: Highlights a matching pair. Costs an extra attempt (mild penalty to encourage skill).
- **Breathing Buddy**: A calming deep-breathing exercise activates on repeated incorrect matches, mirroring the PDF's emphasis on emotional regulation.

### Affirmation-Based Feedback
- **3 Stars**: "You are BRAVER than you believe, STRONGER than you seem, and SMARTER than you think!"
- **2 Stars**: "This feeling won't last forever — and neither will challenges. You handled it well!"
- **1 Star**: "I have survived other tough times before and I will be resilient this time too. Keep going!"

### Scoring
Stars are awarded based on efficiency — fewer attempts and fewer power-up uses means more stars. This encourages active recall and emotional learning, not just luck.

---

## Project Architecture

```text
/assets/
  ├── brand/                # Emo Charge logo and branding
  ├── avatars/              # Custom player characters (12 SVG avatars)
  ├── background/           # Thematic game environments
  ├── emotion/              # Emotion cards (Anger, Worry, Frustration...)
  ├── emotion_match/        # Emotion match cards (Sadness, Shame...)
  ├── trigger/              # Trigger/situation cards (Lonely, Not Enough...)
  ├── action_match/         # Coping strategy cards (Breathe, Celebrate...)
  └── ui/                   # Interface icons, stars, buttons

/screens/
  ├── Splash.js             # Title screen with Emo Charge branding
  ├── NameEntry.js          # Player profile creation
  ├── LevelSelect.js        # Difficulty selection
  ├── Tutorial.js           # How to play instructions
  ├── Game.js               # Main game engine
  ├── BreathingBuddy.js     # Calming overlay (Page 6 content)
  ├── OverlayMatch.js       # Match success overlay
  ├── OverlayWrong.js       # Incorrect match overlay
  ├── Victory.js            # Victory screen with PDF affirmations
  └── Settings.js           # Sound and profile management

/utils/
  ├── sounds.js             # Audio management
  └── storage.js            # LocalStorage for player profiles & scores

gameData.js                 # All 12 card pairs from the PDF
gameState.js                # Centralized reactive game state
main.js                     # Application orchestrator & SPA router
style.css                   # Full design system with custom animations
```

---

## Technical Stack

- **Frontend**: Vanilla HTML5, CSS3, and JavaScript (ES Modules) — zero framework overhead
- **Assets**: Scalable Vector Graphics (SVG) for all illustrations — crisp at any resolution
- **State**: Centralized reactive state container for round tracking and player progress
- **Storage**: Persistent LocalStorage for player profiles, settings, and high scores
- **Tooling**: Vite for fast development and production bundling

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

```bash
git clone https://github.com/JustRamm/Emo-Match.git
cd Emo-Match
npm install
npm run dev
```

Open `http://localhost:5173/` in your browser.

---

## Attribution

All educational content in this game is based on:

**"Recharge Without Charge"**
by [Mind Empowered](https://www.mind-empowered.org)

This game is designed for educational and child development purposes.

---

**Repository**: [github.com/JustRamm/Emo-Match](https://github.com/JustRamm/Emo-Match)

© 2026 JustRamm. Dedicated to child emotional wellbeing and literacy.
