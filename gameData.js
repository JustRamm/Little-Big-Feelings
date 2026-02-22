// ============================================================
//  gameData.js — Structured Emotion Data (v3)
//
//  Content sourced entirely from the PDF:
//  "Recharge Without Charge.pptx (1).pdf" by Mind Empowered
// ============================================================

/** 
 * Level configuration 
 * Pairs count determines how many pairs are picked from the emotion's pool.
 */
export const LEVELS = {
    1: { pairs: 3, time: 99999, label: 'Beginner', peekDuration: 3000, peekUses: 3, icon: 'assets/action_match/calm_child_card.svg' },
    2: { pairs: 6, time: 99999, label: 'Intermediate', peekDuration: 2000, peekUses: 2, icon: 'assets/action_match/mindfulness_card.svg' },
    3: { pairs: 10, time: 99999, label: 'Expert', peekDuration: 1000, peekUses: 1, icon: 'assets/action_match/brave_lion_card.svg' },
};

/**
 * Emotion Definitions and their specific card pools.
 * Each pool contains up to 12 pairs.
 */
export const EMOTIONS_DATA = {
    anger: {
        id: 'anger',
        name: 'Anger',
        color: '#FF5252',
        icon: 'assets/emotion/angry_monster_card.svg',
        description: 'Anger helps us fight against problems. It is okay to feel angry, but do not hurt yourself or others.',
        pairs: [
            {
                emotion: { id: 'a1-e', name: 'Feeling Angry', desc: 'Anger is a signal to fight problems.', img: 'assets/emotion/angry_monster_card.svg' },
                action: { id: 'a1-a', name: 'Walk Away', desc: 'Step away to cool down your fire.', img: 'assets/action_match/calm_child_card.svg' }
            },
            {
                emotion: { id: 'a2-e', name: 'Losing a Game', desc: 'It feels unfair when you dont win.', img: 'assets/emotion/frustrated_face_card.svg' },
                action: { id: 'a2-a', name: 'Take a Break', desc: 'Use a stress ball to stay calm.', img: 'assets/action_match/take_break_card.svg' }
            },
            {
                emotion: { id: 'a3-e', name: 'Being Interrupted', desc: 'It is hard when people dont listen.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 'a3-a', name: 'Count to 20', desc: 'Count slowly until you feel calmer.', img: 'assets/action_match/calm_child_card.svg' }
            },
            {
                emotion: { id: 'a4-e', name: 'Feeling Exploded', desc: 'When anger feels like too much.', img: 'assets/emotion/angry_monster_card.svg' },
                action: { id: 'a4-a', name: 'Push the Wall', desc: 'Push a wall or floor, then relax.', img: 'assets/action_match/take_break_card.svg' }
            },
            {
                emotion: { id: 'a5-e', name: 'Treated Unfairly', desc: 'Adults or friends being unfair.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 'a5-a', name: 'Use I-Messages', desc: "Say: 'I feel hurt when you...'", img: 'assets/action_match/talk_adult_card.svg' }
            },
            {
                emotion: { id: 'a6-e', name: 'Physical Tension', desc: 'Your body feels tight and hot.', img: 'assets/emotion/angry_monster_card.svg' },
                action: { id: 'a6-a', name: 'Scribble & Rip', desc: 'Scribble on paper, then rip it up!', img: 'assets/action_match/take_break_card.svg' }
            },
            {
                emotion: { id: 'a7-e', name: 'People Yelling', desc: 'Loud noises can trigger anger.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 'a7-a', name: 'Steady Breaths', desc: 'Focus on exhaling slowly.', img: 'assets/action_match/calm_child_card.svg' }
            },
            {
                emotion: { id: 'a8-e', name: 'Waiting Your Turn', desc: 'Impatence can lead to anger.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 'a8-a', name: 'Move & Exercise', desc: 'Stretch or play a quick sport.', img: 'assets/action_match/celebrate_dance_card.svg' }
            },
            {
                emotion: { id: 'a9-e', name: 'Broken Promise', desc: 'When someone lies or fails you.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 'a9-a', name: 'Talk it Out', desc: 'Express your hurt with words.', img: 'assets/action_match/talk_adult_card.svg' }
            },
            {
                emotion: { id: 'a10-e', name: 'Angry Rule', desc: 'Never hurt property or things.', img: 'assets/emotion/angry_monster_card.svg' },
                action: { id: 'a10-a', name: 'Keep it Safe', desc: 'Protect your surroundings.', img: 'assets/action_match/calm_child_card.svg' }
            }
        ]
    },
    sadness: {
        id: 'sadness',
        name: 'Sadness',
        color: '#42A5F5',
        icon: 'assets/emotion_match/sad_child_card.svg',
        description: 'Sadness connects us with those we love. Acknowledge your feelings — it is okay to be sad.',
        pairs: [
            {
                emotion: { id: 's1-e', name: 'Feeling Sad', desc: 'Connecting with our loved ones.', img: 'assets/emotion_match/sad_child_card.svg' },
                action: { id: 's1-a', name: 'Write a Letter', desc: 'Write a letter to yourself.', img: 'assets/trigger/happy_letter_card.svg' }
            },
            {
                emotion: { id: 's2-e', name: 'Family Arguing', desc: 'When family members fight.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 's2-a', name: 'Call a Friend', desc: 'Talking to a friend helps.', img: 'assets/action_match/talk_adult_card.svg' }
            },
            {
                emotion: { id: 's3-e', name: 'Left Out', desc: 'When people ignore you.', img: 'assets/trigger/lonely_card.svg' },
                action: { id: 's3-a', name: 'Happy Songs', desc: 'Listen to tunes that cheer you.', img: 'assets/action_match/celebrate_dance_card.svg' }
            },
            {
                emotion: { id: 's4-e', name: 'Something Wrong', desc: 'When plans dont go right.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 's4-a', name: 'Smile at Mirror', desc: 'Give yourself a little smile.', img: 'assets/action_match/brave_lion_card.svg' }
            },
            {
                emotion: { id: 's5-e', name: 'Feeling Unloved', desc: 'Feeling alone or unwanted.', img: 'assets/trigger/lonely_card.svg' },
                action: { id: 's5-a', name: 'Treat Yourself', desc: 'Do something nice for YOU.', img: 'assets/action_match/self_affirmation_card.svg' }
            },
            {
                emotion: { id: 's6-e', name: 'Losing Something', desc: 'Losing a toy or a friend.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 's6-a', name: 'Take a Nap', desc: 'Resting helps your heart heal.', img: 'assets/action_match/calm_child_card.svg' }
            },
            {
                emotion: { id: 's7-e', name: 'Acknowledge', desc: "Say 'Okay, I am sad'.", img: 'assets/emotion_match/sad_child_card.svg' },
                action: { id: 's7-a', name: 'Accept it', desc: 'Its normal to feel this way.', img: 'assets/action_match/brave_lion_card.svg' }
            },
            {
                emotion: { id: 's8-e', name: 'Hidden Feelings', desc: 'Dont be ashamed of sadness.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 's8-a', name: 'Speak Up', desc: 'Express what you feel.', img: 'assets/action_match/talk_adult_card.svg' }
            },
            {
                emotion: { id: 's9-e', name: 'Big Problems', desc: 'When things feel too huge.', img: 'assets/emotion_match/sad_child_card.svg' },
                action: { id: 's9-a', name: 'Big Picture', desc: 'Look at the whole world.', img: 'assets/action_match/mindfulness_card.svg' }
            },
            {
                emotion: { id: 's10-e', name: 'Future Sadness', desc: 'Will I ever be happy?', img: 'assets/trigger/scared_dark_card.svg' },
                action: { id: 's10-a', name: 'I Will Be Okay', desc: 'This feeling will soon pass.', img: 'assets/action_match/brave_lion_card.svg' }
            }
        ]
    },
    anxiety: {
        id: 'anxiety',
        name: 'Anxiety',
        color: '#9C27B0',
        icon: 'assets/trigger/scared_dark_card.svg',
        description: 'Fear protects us from danger. Anxiety is the body telling us to slow down and stay safe.',
        pairs: [
            {
                emotion: { id: 'x1-e', name: 'Feeling Anxious', desc: 'Fear protecting us from danger.', img: 'assets/trigger/scared_dark_card.svg' },
                action: { id: 'x1-a', name: 'Self-Talk', desc: 'This wont last forever.', img: 'assets/action_match/brave_lion_card.svg' }
            },
            {
                emotion: { id: 'x2-e', name: 'Avoiding Things', desc: 'Avoiding school or sports.', img: 'assets/trigger/lonely_card.svg' },
                action: { id: 'x2-a', name: 'Trust Process', desc: 'I dont have to know everything.', img: 'assets/action_match/mindfulness_card.svg' }
            },
            {
                emotion: { id: 'x3-e', name: 'Tummy Ache', desc: 'Pain from feeling worried.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 'x3-a', name: 'Slow Breathing', desc: 'Calm your body down slowly.', img: 'assets/action_match/calm_child_card.svg' }
            },
            {
                emotion: { id: 'x4-e', name: 'Difficulty Sleeping', desc: 'Minds racing at night.', img: 'assets/trigger/scared_dark_card.svg' },
                action: { id: 'x4-a', name: 'I Am Safe', desc: 'You are safe right now.', img: 'assets/action_match/brave_lion_card.svg' }
            },
            {
                emotion: { id: 'x5-e', name: 'High Expectations', desc: 'Trying to be too perfect.', img: 'assets/trigger/pride_trophy_card.svg' },
                action: { id: 'x5-a', name: 'Courage', desc: 'My bravery is stronger.', img: 'assets/action_match/brave_lion_card.svg' }
            },
            {
                emotion: { id: 'x6-e', name: 'Feeling Agitated', desc: 'Feeling angry or stuck.', img: 'assets/emotion/angry_monster_card.svg' },
                action: { id: 'x6-a', name: 'I Got This', desc: 'I can handle this feeling.', img: 'assets/action_match/self_affirmation_card.svg' }
            },
            {
                emotion: { id: 'x7-e', name: 'Worrying Ahead', desc: 'Thinking about what-ifs.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 'x7-a', name: 'Mindfulness', desc: 'Thoughts are not facts.', img: 'assets/action_match/mindfulness_card.svg' }
            },
            {
                emotion: { id: 'x8-e', name: 'Cant Focus', desc: 'Struggling to pay attention.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 'x8-a', name: 'Slow Down', desc: 'Take it one step at a time.', img: 'assets/action_match/calm_child_card.svg' }
            },
            {
                emotion: { id: 'x9-e', name: 'Uncertainty', desc: 'Not knowing what happens.', img: 'assets/trigger/scared_dark_card.svg' },
                action: { id: 'x9-a', name: 'Trust Mirror', desc: 'I have survived tough times.', img: 'assets/action_match/brave_lion_card.svg' }
            },
            {
                emotion: { id: 'x10-e', name: 'Heavy Heart', desc: 'Anxiety feels so heavy.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 'x10-a', name: 'Compassion', desc: 'Be kind to your feelings.', img: 'assets/action_match/talk_adult_card.svg' }
            }
        ]
    },
    loneliness: {
        id: 'loneliness',
        name: 'Loneliness',
        color: '#FFB74D',
        icon: 'assets/trigger/lonely_card.svg',
        description: 'You are never truly alone. Loneliness is a sign to connect and practice self-care.',
        pairs: [
            {
                emotion: { id: 'l1-e', name: 'Feeling Lonely', desc: 'Missing a connection.', img: 'assets/trigger/lonely_card.svg' },
                action: { id: 'l1-a', name: 'Talk to Someone', desc: 'Reach out to a friend.', img: 'assets/action_match/talk_adult_card.svg' }
            },
            {
                emotion: { id: 'l2-e', name: 'Feeling Tired', desc: 'Signs of being too lonely.', img: 'assets/trigger/lonely_card.svg' },
                action: { id: 'l2-a', name: 'Keep Busy', desc: 'Do something fun you love.', img: 'assets/action_match/celebrate_dance_card.svg' }
            },
            {
                emotion: { id: 'l3-e', name: 'Binge Watching', desc: 'Hiding in screens too long.', img: 'assets/trigger/lonely_card.svg' },
                action: { id: 'l3-a', name: 'Go Outside', desc: 'See the world and nature.', img: 'assets/action_match/celebrate_dance_card.svg' }
            },
            {
                emotion: { id: 'l4-e', name: 'Buying Things', desc: 'Buying stuff wont fill it.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 'l4-a', name: 'Self-Care', desc: 'Take care of your inner self.', img: 'assets/action_match/self_affirmation_card.svg' }
            },
            {
                emotion: { id: 'l5-e', name: 'Feeling Sick', desc: 'Loneliness can hurt bodies.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 'l5-a', name: 'Warm Bath', desc: 'A warm bath can help you.', img: 'assets/action_match/calm_child_card.svg' }
            },
            {
                emotion: { id: 'l6-e', name: 'Hopelessness', desc: 'Feeling like it wont end.', img: 'assets/trigger/scared_dark_card.svg' },
                action: { id: 'l6-a', name: 'Adopt a Pet', desc: 'Pets give great company.', img: 'assets/action_match/hug_card.svg' }
            },
            {
                emotion: { id: 'l7-e', name: 'Inner Critic', desc: 'Mean thoughts in your head.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 'l7-a', name: 'Silence Critic', desc: 'Be your own cheerleader.', img: 'assets/action_match/self_affirmation_card.svg' }
            },
            {
                emotion: { id: 'l8-e', name: 'Staying Alone', desc: 'Afraid of new people.', img: 'assets/trigger/lonely_card.svg' },
                action: { id: 'l8-a', name: 'Volunteer', desc: 'Help others to feel connected.', img: 'assets/action_match/talk_adult_card.svg' }
            },
            {
                emotion: { id: 'l9-e', name: 'Lack of Contact', desc: 'Missing human touch.', img: 'assets/trigger/lonely_card.svg' },
                action: { id: 'l9-a', name: 'Support System', desc: 'Create a team of supporters.', img: 'assets/action_match/hug_card.svg' }
            },
            {
                emotion: { id: 'l10-e', name: 'Isolated', desc: 'Staying in your room.', img: 'assets/trigger/lonely_card.svg' },
                action: { id: 'l10-a', name: 'Comfort Zone', desc: 'Step out and say Hello.', img: 'assets/action_match/talk_adult_card.svg' }
            }
        ]
    },
    stress: {
        id: 'stress',
        name: 'Stress',
        color: '#66BB6A',
        icon: 'assets/emotion/worried_child_card.svg',
        description: 'Stress is real. Positive coping helps you feel better for a longer time!',
        pairs: [
            {
                emotion: { id: 'st1-e', name: 'Feeling Stressed', desc: 'Stress is a part of life.', img: 'assets/emotion/worried_child_card.svg' },
                action: { id: 'st1-a', name: 'Positive Coping', desc: 'Choose what helps long-term.', img: 'assets/action_match/self_affirmation_card.svg' }
            },
            {
                emotion: { id: 'st2-e', name: 'Feeling Awful', desc: 'Negative coping feels bad.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 'st2-a', name: 'Choose Wise', desc: 'Pick the better path today.', img: 'assets/action_match/brave_lion_card.svg' }
            },
            {
                emotion: { id: 'st3-e', name: 'Overbooked', desc: 'Doing too much at once.', img: 'assets/emotion/worried_child_card.svg' },
                action: { id: 'st3-a', name: 'Slow Down', desc: 'Drop one thing and rest.', img: 'assets/action_match/calm_child_card.svg' }
            },
            {
                emotion: { id: 'st4-e', name: 'Negative Paths', desc: 'Tired and overwhelmed.', img: 'assets/trigger/scared_dark_card.svg' },
                action: { id: 'st4-a', name: 'Trash Thoughts', desc: 'Throw away bad ideas!', img: 'assets/action_match/take_break_card.svg' }
            },
            {
                emotion: { id: 'st5-e', name: 'Unhealthy Body', desc: 'Stress makes you hungry.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 'st5-a', name: 'Eat Healthy', desc: 'Fuel your body with good.', img: 'assets/action_match/self_affirmation_card.svg' }
            },
            {
                emotion: { id: 'st6-e', name: 'Long Day', desc: 'When you are so busy.', img: 'assets/emotion/worried_child_card.svg' },
                action: { id: 'st6-a', name: 'Wear Comfy', desc: 'Wear your favorite clothes.', img: 'assets/action_match/celebrate_dance_card.svg' }
            },
            {
                emotion: { id: 'st7-e', name: 'Success Check', desc: 'Am I doing enough?', img: 'assets/trigger/pride_trophy_card.svg' },
                action: { id: 'st7-a', name: 'Celebrate You', desc: 'Celebrate what is working.', img: 'assets/action_match/self_affirmation_card.svg' }
            },
            {
                emotion: { id: 'st8-e', name: 'Small World', desc: 'Feeling so tiny.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 'st8-a', name: 'Compliment', desc: 'Give yourself a nice word.', img: 'assets/action_match/self_affirmation_card.svg' }
            },
            {
                emotion: { id: 'st9-e', name: 'Heavy Mind', desc: 'Too many thoughts.', img: 'assets/trigger/worried_feeling_card.svg' },
                action: { id: 'st9-a', name: 'Drink Tea', desc: 'Warm tea helps you relax.', img: 'assets/action_match/calm_child_card.svg' }
            },
            {
                emotion: { id: 'st10-e', name: 'Feeling Stuck', desc: 'Cant move forward.', img: 'assets/trigger/broken_robot_card.svg' },
                action: { id: 'st10-a', name: 'Go Outside', desc: 'Fresh air is your friend.', img: 'assets/action_match/take_break_card.svg' }
            }
        ]
    }
};

/**
 * Legacy support / fallback pool.
 * (Will remain for any general logic or testing)
 */
export const ALL_CARDS = []; // We populate this if needed or rely on EMOTIONS_DATA
