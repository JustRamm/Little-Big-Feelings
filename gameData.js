// ============================================================
//  gameData.js — Card Definitions & Asset Helpers
// ============================================================


/**
 * Full card pool — 8 pairs (16 cards).
 * Each pair must have matching id ↔ matchId cross-references.
 */
export const ALL_CARDS = [
    // ── Pair 1: Broken toy → Sadness ──────────────────────────
    {
        id: 'trigger-broken-robot',
        matchId: 'emotion-sad-child',
        image: '/assets/trigger/broken_robot_card.svg',
        type: 'trigger',
        name: 'Broken Toy',
        label: 'Trigger',
        description: "When something we love breaks, it's okay to feel sad. A big blue raincloud feeling is just passing by!"
    },
    {
        id: 'emotion-sad-child',
        matchId: 'trigger-broken-robot',
        image: '/assets/emotion_match/sad_child_card.svg',
        type: 'emotion',
        name: 'Feeling Sad',
        label: 'Emotion',
        description: "Feeling sad when things break shows we care about them. It's brave to name our sadness!"
    },

    // ── Pair 2: Anger → Calm breathing ────────────────────────
    {
        id: 'trigger-angry-monster',
        matchId: 'action-calm-child',
        image: '/assets/emotion/angry_monster_card.svg',
        type: 'trigger',
        name: 'Feeling Angry',
        label: 'Emotion',
        description: "PHUFF! Steam from the ears! This is what ANGER looks like. Let's find a way to cool down."
    },
    {
        id: 'action-calm-child',
        matchId: 'trigger-angry-monster',
        image: '/assets/action_match/calm_child_card.svg',
        type: 'action',
        name: 'Calm Breathing',
        label: 'Action',
        description: "Deep breaths are like magic! Counting to 5 while breathing out chases the anger storm away."
    },

    // ── Pair 3: Lonely → Hug ──────────────────────────────────
    {
        id: 'trigger-lonely',
        matchId: 'emotion-lonely',
        image: '/assets/trigger/lonely_card.svg',
        type: 'trigger',
        name: 'Feeling Left Out',
        label: 'Trigger',
        description: "When friends leave us out, it stings. That hollow feeling has a name — loneliness."
    },
    {
        id: 'emotion-lonely',
        matchId: 'trigger-lonely',
        image: '/assets/action_match/hug_card.svg',
        type: 'action',
        name: 'A Warm Hug',
        label: 'Action',
        description: "A hug from someone we trust can fill that lonely feeling back up with warmth and safety!"
    },

    // ── Pair 4: Fear → Bravery ────────────────────────────────
    {
        id: 'trigger-scared',
        matchId: 'emotion-brave',
        image: '/assets/trigger/scared_dark_card.svg',
        type: 'trigger',
        name: 'Scared of Dark',
        label: 'Emotion',
        description: "Feeling scared is normal! Everyone feels scared sometimes — even superheroes."
    },
    {
        id: 'emotion-brave',
        matchId: 'trigger-scared',
        image: '/assets/action_match/brave_lion_card.svg',
        type: 'action',
        name: 'Be Brave!',
        label: 'Action',
        description: "Being brave doesn't mean not being scared — it means going forward even when we are!"
    },

    // ── Pair 5: Happy news → Celebrate ───────────────────────
    {
        id: 'trigger-happy',
        matchId: 'emotion-celebrate',
        image: '/assets/trigger/happy_letter_card.svg',
        type: 'trigger',
        name: 'Good News!',
        label: 'Trigger',
        description: "Something wonderful happened! Our heart feels light and floaty — that's happiness!"
    },
    {
        id: 'emotion-celebrate',
        matchId: 'trigger-happy',
        image: '/assets/action_match/celebrate_dance_card.svg',
        type: 'action',
        name: 'Celebrate!',
        label: 'Action',
        description: "When we're happy, we can dance, sing, or share our joy with others to make it grow even bigger!"
    },

    // ── Pair 6: Worry → Talk ─────────────────────────────────
    {
        id: 'trigger-worried',
        matchId: 'emotion-talk',
        image: '/assets/emotion/worried_child_card.svg',
        type: 'trigger',
        name: 'Big Test Day',
        label: 'Trigger',
        description: "Butterflies in your tummy before something important — that's worry coming to visit."
    },
    {
        id: 'emotion-talk',
        matchId: 'trigger-worried',
        image: '/assets/action_match/talk_adult_card.svg',
        type: 'action',
        name: 'Talk About It',
        label: 'Action',
        description: "Talking to a trusted adult about our worries is like opening a pressure valve — it releases the icky feeling!"
    },

    // ── Pair 7: Frustration → Break ──────────────────────────
    {
        id: 'trigger-frustrated',
        matchId: 'emotion-take-break',
        image: '/assets/emotion/frustrated_face_card.svg',
        type: 'trigger',
        name: 'Hard Puzzle',
        label: 'Emotion',
        description: "When things won't go our way — frustration knocks on the door. It's okay to pause."
    },
    {
        id: 'emotion-take-break',
        matchId: 'trigger-frustrated',
        image: '/assets/action_match/take_break_card.svg',
        type: 'action',
        name: 'Take a Break',
        label: 'Action',
        description: "Stepping away and coming back fresh is one of the smartest things our brain can do!"
    },

    // ── Pair 8: Pride → Cheer ────────────────────────────────
    {
        id: 'trigger-proud',
        matchId: 'emotion-cheer',
        image: '/assets/trigger/pride_trophy_card.svg',
        type: 'trigger',
        name: 'I Did It!',
        label: 'Trigger',
        description: "You worked hard and achieved something! That glowing warm feeling is called PRIDE."
    },
    {
        id: 'emotion-cheer',
        matchId: 'trigger-proud',
        image: '/assets/action_match/cheer_clap_card.svg',
        type: 'action',
        name: 'Celebrate You!',
        label: 'Action',
        description: "Recognising our own achievements and cheering ourselves is an important life skill!"
    },
];

/** Level configuration */
export const LEVELS = {
    1: { pairs: 3, time: 99999, label: 'Easy', peekDuration: 3000, peekUses: 3 },
    2: { pairs: 5, time: 99999, label: 'Medium', peekDuration: 2000, peekUses: 2 },
    3: { pairs: 8, time: 99999, label: 'Hard', peekDuration: 1000, peekUses: 1 },
};

