
import os

folder = 'c:/Users/abira/OneDrive/Desktop/Little Big Feelings/public/assets/emotion'
os.makedirs(folder, exist_ok=True)

icons = {
    'love.svg': ('#F06292', 'heart'),
    'humble.svg': ('#81C784', 'flower'),
    'awe.svg': ('#BA68C8', 'star-eye'),
    'disapproval.svg': ('#9575CD', 'down-cloud'),
    'remorse.svg': ('#7986CB', 'tear-cloud'),
    'contempt.svg': ('#AFB42B', 'nose'),
    'determined.svg': ('#E53935', 'fist'),
    'optimistic.svg': ('#FFB300', 'sun'),
    'shy.svg': ('#FFD54F', 'bashful'),
    'curiosity.svg': ('#4DB6AC', 'magnifier'),
    'despair.svg': ('#5C6BC0', 'sinking'),
    'unbelief.svg': ('#CDDC39', 'eyebrow'),
    'envy.svg': ('#66BB6A', 'green-eye'),
    'cynicism.svg': ('#C0CA33', 'roll-eye'),
    'pride.svg': ('#FF8A65', 'crown'),
    'hope.svg': ('#81C784', 'growing-plant'),
    'delight.svg': ('#F06292', 'gift'),
    'silliness.svg': ('#DCE775', 'tongue'),
    'empathy.svg': ('#64B5F6', 'two-hearts'),
    'strong.svg': ('#43A047', 'arm'),
    'shame.svg': ('#9E9E9E', 'hidden-face'),
    'anxiety.svg': ('#9575CD', 'wiggle'),
    'confusion.svg': ('#E1BEE7', 'spiral'),
    'outrage.svg': ('#FF1744', 'shout'),
    'pessimism.svg': ('#B0BEC5', 'dark-cloud'),
    'contempt_2.svg': ('#827717', 'sticky'),
    'maze.svg': ('#4DB6AC', 'maze'),
    'bittersweet.svg': ('#CE93D8', 'rainbow-tear')
}

def get_svg(color, design):
    content = f'<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">'
    content += f'<circle cx="50" cy="50" r="45" fill="{color}" opacity="0.1" />'
    content += f'<circle cx="50" cy="50" r="40" fill="{color}" />'
    
    # Generic Kawaii Face
    content += '<circle cx="35" cy="45" r="5" fill="white" />'
    content += '<circle cx="65" cy="45" r="5" fill="white" />'
    content += '<path d="M40,70 Q50,80 60,70" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" />'
    
    # Custom design addition
    if design == 'heart':
        content += '<path d="M50,30 Q50,45 65,45 Q50,60 35,45 Q50,45 50,30" fill="white" opacity="0.6"/>'
    elif design == 'star-eye':
        content += '<circle cx="35" cy="45" r="8" fill="white" opacity="0.3"/>'
        content += '<circle cx="65" cy="45" r="8" fill="white" opacity="0.3"/>'
    elif design == 'tear-cloud':
        content += '<circle cx="50" cy="80" r="4" fill="white" opacity="0.8"/>'
    elif design == 'sun':
        content += '<circle cx="50" cy="50" r="30" stroke="white" stroke-width="2" stroke-dasharray="10 5" fill="none"/>'
    elif design == 'rainbow-tear':
        content += '<path d="M30,50 Q50,20 70,50" stroke="white" stroke-width="4" fill="none" />'
        
    content += '</svg>'
    return content

for filename, (color, design) in icons.items():
    with open(os.path.join(folder, filename), 'w') as f:
        f.write(get_svg(color, design))

print("SVG Generation Complete!")
