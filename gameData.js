// ============================================================
//  gameData.js — Card Definitions & Asset Helpers
// ============================================================

/**
 * Generates an inline SVG data-URI card so we don't need extra image files
 * for the emoji-based pairs. Real asset pairs use their file paths directly.
 */
export function makeEmojiCard(emoji, bg, label) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="260" viewBox="0 0 200 260">
      <rect width="200" height="260" rx="20" fill="${bg}"/>
      <text x="100" y="130" font-size="80" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
      <text x="100" y="220" font-size="16" font-family="Outfit,sans-serif" font-weight="700" fill="#5D4037" text-anchor="middle">${label}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

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
        label: '😟 Trigger',
        description: "When something we love breaks, it's okay to feel sad. A big blue raincloud feeling is just passing by!"
    },
    {
        id: 'emotion-sad-child',
        matchId: 'trigger-broken-robot',
        image: '/assets/emotion_match/sad_child_card.svg',
        type: 'emotion',
        name: 'Feeling Sad',
        label: '💧 Emotion',
        description: "Feeling sad when things break shows we care about them. It's brave to name our sadness!"
    },

    // ── Pair 2: Anger → Calm breathing ────────────────────────
    {
        id: 'trigger-angry-monster',
        matchId: 'action-calm-child',
        image: '/assets/emotion/angry_monster_card.svg',
        type: 'trigger',
        name: 'Feeling Angry',
        label: '🔥 Emotion',
        description: "PHUFF! Steam from the ears! This is what ANGER looks like. Let's find a way to cool down."
    },
    {
        id: 'action-calm-child',
        matchId: 'trigger-angry-monster',
        image: '/assets/action_match/calm_child_card.svg',
        type: 'action',
        name: 'Calm Breathing',
        label: '🧘 Action',
        description: "Deep breaths are like magic! Counting to 5 while breathing out chases the anger storm away."
    },

    // ── Pair 3: Lonely → Hug ──────────────────────────────────
    {
        id: 'trigger-lonely',
        matchId: 'emotion-lonely',
        image: makeEmojiCard('😔', '#B3E5FC', 'Feeling Left Out'),
        type: 'trigger',
        name: 'Feeling Left Out',
        label: '💙 Trigger',
        description: "When friends leave us out, it stings. That hollow feeling has a name — loneliness."
    },
    {
        id: 'emotion-lonely',
        matchId: 'trigger-lonely',
        image: makeEmojiCard('🤗', '#E1BEE7', 'A Warm Hug'),
        type: 'action',
        name: 'A Warm Hug',
        label: '💜 Action',
        description: "A hug from someone we trust can fill that lonely feeling back up with warmth and safety!"
    },

    // ── Pair 4: Fear → Bravery ────────────────────────────────
    {
        id: 'trigger-scared',
        matchId: 'emotion-brave',
        image: makeEmojiCard('😨', '#F8BBD0', 'Scared of Dark'),
        type: 'trigger',
        name: 'Scared of Dark',
        label: '😱 Emotion',
        description: "Feeling scared is normal! Everyone feels scared sometimes — even superheroes."
    },
    {
        id: 'emotion-brave',
        matchId: 'trigger-scared',
        image: makeEmojiCard('🦁', '#FFF9C4', 'Being Brave'),
        type: 'action',
        name: 'Be Brave!',
        label: '🌟 Action',
        description: "Being brave doesn't mean not being scared — it means going forward even when we are!"
    },

    // ── Pair 5: Happy news → Celebrate ───────────────────────
    {
        id: 'trigger-happy',
        matchId: 'emotion-celebrate',
        image: makeEmojiCard('🎉', '#DCEDC8', 'Good News!'),
        type: 'trigger',
        name: 'Good News!',
        label: '🎊 Trigger',
        description: "Something wonderful happened! Our heart feels light and floaty — that's happiness!"
    },
    {
        id: 'emotion-celebrate',
        matchId: 'trigger-happy',
        image: makeEmojiCard('💃', '#FFE0B2', 'Dance It Out'),
        type: 'action',
        name: 'Celebrate!',
        label: '🎵 Action',
        description: "When we're happy, we can dance, sing, or share our joy with others to make it grow even bigger!"
    },

    // ── Pair 6: Worry → Talk ─────────────────────────────────
    {
        id: 'trigger-worried',
        matchId: 'emotion-talk',
        image: makeEmojiCard('😰', '#CFD8DC', 'Big Test Day'),
        type: 'trigger',
        name: 'Big Test Day',
        label: '📝 Trigger',
        description: "Butterflies in your tummy before something important — that's worry coming to visit."
    },
    {
        id: 'emotion-talk',
        matchId: 'trigger-worried',
        image: makeEmojiCard('🗣️', '#B2EBF2', 'Talk About It'),
        type: 'action',
        name: 'Talk About It',
        label: '💬 Action',
        description: "Talking to a trusted adult about our worries is like opening a pressure valve — it releases the icky feeling!"
    },

    // ── Pair 7: Frustration → Break ──────────────────────────
    {
        id: 'trigger-frustrated',
        matchId: 'emotion-take-break',
        image: makeEmojiCard('😤', '#FFCCBC', 'Hard Puzzle'),
        type: 'trigger',
        name: 'Hard Puzzle',
        label: '😤 Emotion',
        description: "When things won't go our way — frustration knocks on the door. It's okay to pause."
    },
    {
        id: 'emotion-take-break',
        matchId: 'trigger-frustrated',
        image: makeEmojiCard('☕', '#D7CCC8', 'Take a Break'),
        type: 'action',
        name: 'Take a Break',
        label: '⏸️ Action',
        description: "Stepping away and coming back fresh is one of the smartest things our brain can do!"
    },

    // ── Pair 8: Pride → Cheer ────────────────────────────────
    {
        id: 'trigger-proud',
        matchId: 'emotion-cheer',
        image: makeEmojiCard('🏆', '#FFF176', 'I Did It!'),
        type: 'trigger',
        name: 'I Did It!',
        label: '🏆 Trigger',
        description: "You worked hard and achieved something! That glowing warm feeling is called PRIDE."
    },
    {
        id: 'emotion-cheer',
        matchId: 'trigger-proud',
        image: makeEmojiCard('👏', '#C8E6C9', 'Celebrate You!'),
        type: 'action',
        name: 'Celebrate You!',
        label: '⭐ Action',
        description: "Recognising our own achievements and cheering ourselves is an important life skill!"
    },
];

/** Level configuration */
export const LEVELS = {
    1: { pairs: 3, time: 99999, label: 'Easy 🌱' },
    2: { pairs: 5, time: 99999, label: 'Medium 🌻' },
    3: { pairs: 8, time: 99999, label: 'Hard 🔥' },
};
