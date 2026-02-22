import pdfplumber, io, sys
from collections import defaultdict

output_path = r'c:\Users\abira\OneDrive\Desktop\MM\pdf_output.txt'
pdf_path = r'c:\Users\abira\OneDrive\Desktop\MM\assets\Recharge without charge.pptx (1).pdf'

with open(output_path, 'w', encoding='utf-8') as out:
    with pdfplumber.open(pdf_path) as pdf:
        out.write(f'Total pages: {len(pdf.pages)}\n')
        for i, page in enumerate(pdf.pages):
            out.write(f'\n{"="*60}\nPAGE {i+1}\n{"="*60}\n')
            chars = page.chars
            if chars:
                lines = defaultdict(list)
                for c in chars:
                    line_key = round(c['top'] / 8) * 8
                    lines[line_key].append(c)
                for y in sorted(lines.keys()):
                    row_chars = sorted(lines[y], key=lambda c: c['x0'])
                    text = ''.join(c['text'] for c in row_chars)
                    if text.strip():
                        out.write(f'{text}\n')
            else:
                out.write('[No chars found]\n')

print('Done! Written to pdf_output.txt')
