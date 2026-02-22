// ============================================================
//  gameData.js — Card Definitions based on "Recharge Without Charge" (Mind Empowered)
//
//  Content sourced entirely from the PDF:
//  "Recharge Without Charge.pptx (1).pdf" by Mind Empowered
//
//  Card pairs = EMOTION (feeling card) matched with COPING ACTION (strategy card)
//  All 12 pairs cover the full content of the source material.
// ============================================================

/**
 * Full card pool — 12 pairs (24 cards).
 * Content sourced from "Recharge Without Charge" by Mind Empowered.
 *
 * Match pattern: emotion/trigger cards ↔ coping/action cards
 */
export const ALL_CARDS = [

    // ── PAIR 1: Anger → Walk Away & Cool Down ──────────────────
    // Source: Page 4 (I'm Angry! bubbles) + Page 6 (Feeling Angry checklist)
    {
        id: 'emotion-anger',
        matchId: 'action-walk-away',
        image: '/assets/emotion/angry_monster_card.svg',
        type: 'emotion',
        name: 'Feeling Angry',
        label: 'Emotion',
        description: "Anger is here to fight against problems. It's okay to feel angry — but do not hurt yourself, others, or property."
    },
    {
        id: 'action-walk-away',
        matchId: 'emotion-anger',
        image: '/assets/action_match/calm_child_card.svg',
        type: 'action',
        name: 'Walk Away & Breathe',
        label: 'Coping Action',
        description: "Walk away and cool down. Take steady breaths, focus on exhaling slowly. Count to 20 until you feel calmer."
    },

    // ── PAIR 2: Sadness → Write & Express ──────────────────────
    // Source: Page 8 (I'm Sad! bubbles) + Page 10 (When You Feel Sad)
    {
        id: 'emotion-sadness',
        matchId: 'action-write-express',
        image: '/assets/emotion_match/sad_child_card.svg',
        type: 'emotion',
        name: 'Feeling Sad',
        label: 'Emotion',
        description: "Sadness connects us with those we love. Acknowledge your feelings — it's okay to say 'I am sad' without shame."
    },
    {
        id: 'action-write-express',
        matchId: 'emotion-sadness',
        image: '/assets/action_match/talk_adult_card.svg',
        type: 'action',
        name: 'Write & Express',
        label: 'Coping Action',
        description: "Write yourself a letter. Call up a friend. Listen to happy songs. Look at the big picture — you will be okay!"
    },

    // ── PAIR 3: Fear / Anxiety → Brave Affirmations ────────────
    // Source: Page 11 (Anxiety Presents Itself) + Page 12 (What to Tell Myself When Anxious)
    {
        id: 'emotion-anxiety',
        matchId: 'action-affirmations',
        image: '/assets/trigger/scared_dark_card.svg',
        type: 'emotion',
        name: 'Feeling Anxious',
        label: 'Emotion',
        description: "Fear protects us from danger. Anxiety can show up as difficulty sleeping, avoiding activities, or feeling worried. These feelings are normal."
    },
    {
        id: 'action-affirmations',
        matchId: 'emotion-anxiety',
        image: '/assets/action_match/brave_lion_card.svg',
        type: 'action',
        name: 'Brave Affirmations',
        label: 'Coping Action',
        description: "Tell yourself: 'This feeling won't last forever.' 'I have survived tough times before.' 'My bravery is stronger than my fear.' I GOT THIS!"
    },

    // ── PAIR 4: Loneliness → Connect & Self-Care ───────────────
    // Source: Page 14 (10 Signs You Are Lonely) + Page 15 (Dealing with Loneliness)
    {
        id: 'emotion-loneliness',
        matchId: 'action-connect',
        image: '/assets/trigger/lonely_card.svg',
        type: 'emotion',
        name: 'Feeling Lonely',
        label: 'Emotion',
        description: "Signs of loneliness: feeling tired all the time, avoiding activities, feeling hopeless. You are not alone — it's okay to reach out!"
    },
    {
        id: 'action-connect',
        matchId: 'emotion-loneliness',
        image: '/assets/action_match/hug_card.svg',
        type: 'action',
        name: 'Connect & Self-Care',
        label: 'Coping Action',
        description: "Practice self-care. Talk to someone. Keep busy with fun activities. Volunteer. Adopt a pet. Create a support system."
    },

    // ── PAIR 5: Stress → Positive Coping ───────────────────────
    // Source: Page 3 (Dealing with Stress) + Page 13 (Stressful Day To-Do List)
    {
        id: 'emotion-stress',
        matchId: 'action-positive-coping',
        image: '/assets/emotion/worried_child_card.svg',
        type: 'emotion',
        name: 'Feeling Stressed',
        label: 'Emotion',
        description: "Stress is real! There are two ways to cope: Positive coping makes you feel better for a LONGER time. Choose wisely!"
    },
    {
        id: 'action-positive-coping',
        matchId: 'emotion-stress',
        image: '/assets/action_match/celebrate_dance_card.svg',
        type: 'action',
        name: 'Positive Coping',
        label: 'Coping Action',
        description: "Call a friend. Go outside. Listen to happy tunes. Slow down. Eat something healthy. Be your own cheerleader. Don't overbook yourself!"
    },

    // ── PAIR 6: Frustration → Take a Break ─────────────────────
    // Source: Page 4 (Anger triggers: 'I lose at a game') + Page 6 (Take a Break)
    {
        id: 'emotion-frustration',
        matchId: 'action-take-break',
        image: '/assets/emotion/frustrated_face_card.svg',
        type: 'emotion',
        name: 'Feeling Frustrated',
        label: 'Emotion',
        description: "Frustration happens when things go wrong or feel unfair. Maybe you lost a game, got a bad grade, or couldn't finish something. Pause — it's okay."
    },
    {
        id: 'action-take-break',
        matchId: 'emotion-frustration',
        image: '/assets/action_match/take_break_card.svg',
        type: 'action',
        name: 'Take a Break',
        label: 'Coping Action',
        description: "Take a time out. Scribble on paper, then rip it up. Push against the wall then relax. Move, exercise, stretch or play a sport."
    },

    // ── PAIR 7: Joy / Pride → Celebrate ────────────────────────
    // Source: Page 2 (8 Basic Emotions: Joy = 'to remind what is important') + Page 10
    {
        id: 'emotion-joy',
        matchId: 'action-celebrate',
        image: '/assets/trigger/pride_trophy_card.svg',
        type: 'emotion',
        name: 'Feeling Joyful',
        label: 'Emotion',
        description: "Joy reminds us what is important! It's one of the 8 basic emotions. When you feel joyful, cherish and share it — joy grows when you spread it!"
    },
    {
        id: 'action-celebrate',
        matchId: 'emotion-joy',
        image: '/assets/action_match/cheer_clap_card.svg',
        type: 'action',
        name: 'Celebrate!',
        label: 'Coping Action',
        description: "Celebrate what's working! Compliment yourself. Treat yourself. Wear something comfy. Remember how far you have come. Be your own cheerleader!"
    },

    // ── PAIR 8: Being Overwhelmed → Circle of Control ──────────
    // Source: Page 7 (Reactive vs Proactive / Circle of Concern vs Circle of Control)
    {
        id: 'emotion-overwhelmed',
        matchId: 'action-circle-control',
        image: '/assets/trigger/happy_letter_card.svg',
        type: 'emotion',
        name: 'Feeling Overwhelmed',
        label: 'Emotion',
        description: "When everything feels too much, we spend time on things we can't control. This drains our energy and makes us reactive."
    },
    {
        id: 'action-circle-control',
        matchId: 'emotion-overwhelmed',
        image: '/assets/action_match/calm_child_card.svg',
        type: 'action',
        name: 'Focus on Your Circle',
        label: 'Coping Action',
        description: "Focus only on your Circle of Control: what you eat, how you act, where you learn, how you react. Let go of things outside your control."
    },

    // ── PAIR 9: Shame / Guilt → Accept Your Feelings ───────────
    // Source: Page 18 (It's OK to Feel: Ashamed, Guilty) + Page 9 (How to Accept Sadness)
    {
        id: 'emotion-shame',
        matchId: 'action-accept-feelings',
        image: '/assets/trigger/broken_robot_card.svg',
        type: 'emotion',
        name: 'Feeling Ashamed',
        label: 'Emotion',
        description: "Feeling ashamed or guilty is human. Everybody feels this way sometimes. It doesn't make you weak — it makes you human."
    },
    {
        id: 'action-accept-feelings',
        matchId: 'emotion-shame',
        image: '/assets/emotion_match/sad_child_card.svg',
        type: 'action',
        name: 'Accept Your Feelings',
        label: 'Coping Action',
        description: "Step 1: Acknowledge your feelings. Step 2: Accept they are normal. Step 3: Recognize that feelings pass with time. 'I will be okay. I can make this better!'"
    },

    // ── PAIR 10: Anger at Others → Use I-Messages ──────────────
    // Source: Page 6 (USE I-MESSAGES) + Page 4 (anger trigger: being treated disrespectfully)
    {
        id: 'emotion-disrespect',
        matchId: 'action-i-messages',
        image: '/assets/emotion/angry_monster_card.svg',
        type: 'emotion',
        name: 'Feeling Disrespected',
        label: 'Emotion',
        description: "It's hard when someone is mean, interrupts you, yells, or breaks a promise. These are real triggers of anger and hurt."
    },
    {
        id: 'action-i-messages',
        matchId: 'emotion-disrespect',
        image: '/assets/action_match/talk_adult_card.svg',
        type: 'action',
        name: 'Use I-Messages',
        label: 'Coping Action',
        description: "Use I-Messages: say what you need and how you want to be treated. Example: 'I feel hurt when... I need...' This is calm, clear communication."
    },

    // ── PAIR 11: Envy / Jealousy → Mindful Observation ─────────
    // Source: Page 18 (It's OK to Feel: Jealous, Envious) + Page 17 (A-Z: Observe, Meditate)
    {
        id: 'emotion-jealousy',
        matchId: 'action-mindfulness',
        image: '/assets/trigger/worried_feeling_card.svg',
        type: 'emotion',
        name: 'Feeling Jealous',
        label: 'Emotion',
        description: "Jealousy and envy are normal emotions. It's okay to feel them. Name the emotion — just saying 'I feel jealous' can reduce its power."
    },
    {
        id: 'action-mindfulness',
        matchId: 'emotion-jealousy',
        image: '/assets/action_match/mindfulness_card.svg',
        type: 'action',
        name: 'Mindful Observation',
        label: 'Coping Action',
        description: "Use mindfulness techniques. Observe your feelings. Meditate. Question your thoughts — thoughts and emotions aren't facts. 'I am safe right now.'"
    },

    // ── PAIR 12: Low Self-Worth → Positive Affirmations ─────────
    // Source: Page 19 (You are Braver/Stronger/Smarter) + Page 12 (Anxious affirmations)
    {
        id: 'emotion-low-worth',
        matchId: 'action-self-affirmation',
        image: '/assets/trigger/scared_dark_card.svg',
        type: 'emotion',
        name: 'Feeling Not Enough',
        label: 'Emotion',
        description: "Sometimes we feel like we're not good enough, not smart enough, or not loved enough. Anticipation and trust are also emotions — look forward with hope!"
    },
    {
        id: 'action-self-affirmation',
        matchId: 'emotion-low-worth',
        image: '/assets/action_match/self_affirmation_card.svg',
        type: 'action',
        name: 'You Are Enough',
        label: 'Coping Action',
        description: "Remember: You are BRAVER than you believe. STRONGER than you seem. SMARTER than you think. AND LOVED more than you know. — Mind Empowered"
    },
];

/** Level configuration — sourced from "Recharge Without Charge" pedagogy structure */
export const LEVELS = {
    // Easy: 3 pairs — core 3 emotions (Anger, Sadness, Anxiety)
    1: { pairs: 3, time: 99999, label: 'Easy', peekDuration: 3000, peekUses: 3 },
    // Medium: 6 pairs — adds Loneliness, Stress, Frustration
    2: { pairs: 6, time: 99999, label: 'Medium', peekDuration: 2000, peekUses: 2 },
    // Hard: all 12 pairs — full "Recharge Without Charge" content
    3: { pairs: 12, time: 99999, label: 'Hard', peekDuration: 1000, peekUses: 1 },
};
