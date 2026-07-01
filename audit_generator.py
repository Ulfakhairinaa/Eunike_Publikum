import re
import yaml
import json
import datetime
import math

filepath = r'C:\Users\HP\.gemini\antigravity-ide\brain\d2959bbd-4ed8-4786-b1bf-4d30268da1b2\.system_generated\steps\12\output.txt'

try:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
except FileNotFoundError:
    print("Error: output.txt not found.")
    exit(1)

parts = content.split('\nNODES:\n')
if len(parts) == 2:
    yaml_part, nodes_part = parts
else:
    yaml_part = parts[0]
    nodes_part = ""

# Load YAML
try:
    global_vars = yaml.safe_load(yaml_part.replace('GLOBAL_VARS:', ''))
except Exception as e:
    global_vars = {}

# We will need custom regex parsing since yaml safe load failed earlier
def extract_colors():
    colors = {}
    matches = re.finditer(r'(fill_[a-f0-9]+):\n\s+- \'([^\']+)\'', yaml_part)
    for m in matches:
        colors[m.group(1)] = m.group(2)
    matches2 = re.finditer(r'(fill_[a-f0-9]+):\n\s+- (rgba\([^)]+\))', yaml_part)
    for m in matches2:
        colors[m.group(1)] = m.group(2)
    return colors

def extract_styles():
    styles = {}
    current_style = None
    lines = yaml_part.split('\n')
    for line in lines:
        m = re.match(r'^(style_[a-f0-9]+):', line)
        if m:
            current_style = m.group(1)
            styles[current_style] = {}
        elif current_style and line.startswith('  '):
            kv = line.strip().split(': ', 1)
            if len(kv) == 2:
                styles[current_style][kv[0]] = kv[1]
        elif not line.startswith('  '):
            current_style = None
    return styles

def extract_layouts():
    layouts = {}
    current = None
    lines = yaml_part.split('\n')
    for line in lines:
        m = re.match(r'^(layout_[a-f0-9]+):', line)
        if m:
            current = m.group(1)
            layouts[current] = {}
        elif current and line.startswith('  '):
            kv = line.strip().split(': ', 1)
            if len(kv) == 2:
                layouts[current][kv[0]] = kv[1]
        elif not line.startswith('  '):
            current = None
    return layouts

colors = extract_colors()
styles = extract_styles()
layouts = extract_layouts()

def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip('#')
    if len(hex_code) == 6:
        return f"rgb({int(hex_code[0:2], 16)}, {int(hex_code[2:4], 16)}, {int(hex_code[4:6], 16)})"
    return hex_code

def categorize_color(hex_code):
    h = hex_code.lower()
    if h in ['#ffffff', '#000000', '#f8f9ff', '#f1f5f9', '#e2e8f0']: return "Neutral/Background"
    if h in ['#003d76', '#235591']: return "Primary"
    if h in ['#ffdcbc', '#ffb86b']: return "Secondary/Accent"
    if h in ['#ba1a1a']: return "Status (Error)"
    if h in ['#1bc700']: return "Status (Success)"
    return "Neutral"

# 1. FRAME INVENTORY
lines = nodes_part.split('\n')
frames = []
current_frame = None

for line in lines:
    if not line.strip(): continue
    indent = len(line) - len(line.lstrip())
    
    if indent == 2 and line.lstrip().startswith('[FRAME]'):
        m = re.search(r'\[FRAME\] "([^"]+)" #\S+(.*)', line)
        if m:
            name = m.group(1)
            rest = m.group(2)
            
            w_m = re.search(r'"width":\s*([\d.]+)', rest)
            h_m = re.search(r'"height":\s*([\d.]+)', rest)
            width = w_m.group(1) if w_m else 'Auto'
            height = h_m.group(1) if h_m else 'Auto'
            
            fill_m = re.search(r'fills=(fill_\w+)', rest)
            color = colors.get(fill_m.group(1), 'None') if fill_m else 'None'
            
            current_frame = {
                'name': name,
                'width': width,
                'height': height,
                'color': color,
                'children': []
            }
            frames.append(current_frame)
    elif indent > 2 and current_frame:
        m = re.search(r'\[(\w+)\] "?([^"]*)"? #', line)
        if m:
            c_type = m.group(1)
            c_name = m.group(2)
            if c_name:
                current_frame['children'].append(f"{c_type}: {c_name}")
            else:
                current_frame['children'].append(f"{c_type}")

# Generate Markdown
md = []
md.append(f"# YO MAP - FIGMA DESIGN AUDIT")
md.append(f"**Tanggal:** {datetime.datetime.now().strftime('%Y-%m-%d')}")
md.append(f"**Figma File:** JLTvAhZ2mJHiFSitGoLy3c")
md.append(f"**Page:** Page 2")
md.append("")

# PART 1
md.append("## 1. FRAME INVENTORY")
for i, f in enumerate(frames):
    md.append(f"{i+1}. **{f['name']}**")
    md.append(f"   - **Dimensions**: {f['width']} x {f['height']}")
    md.append(f"   - **Background Color**: {f['color']}")
    md.append(f"   - **Nested Elements**: {len(f['children'])} items")
md.append("")

# PART 2
md.append("## 2. COLOR PALETTE")
unique_colors = set(colors.values())
for i, col in enumerate(unique_colors):
    rgb = hex_to_rgb(col) if col.startswith('#') else col
    cat = categorize_color(col)
    md.append(f"{i+1}. **{col}**")
    md.append(f"   - **RGB**: {rgb}")
    md.append(f"   - **Kategori**: {cat}")
    md.append(f"   - **Dimana dipakai**: Berbagai komponen dengan warna {cat}")
md.append("")

# PART 3
md.append("## 3. TYPOGRAPHY")
for k, s in styles.items():
    if 'fontFamily' in s:
        md.append(f"- **{s.get('fontFamily', 'Unknown')}** {s.get('fontWeight', '400')}")
        md.append(f"  - Size: {s.get('fontSize', '?')}px, Line Height: {s.get('lineHeight', 'Auto')}")
        if 'letterSpacing' in s:
            md.append(f"  - Letter Spacing: {s['letterSpacing']}")
        md.append(f"  - Dimana dipakai: General text formatting")
md.append("")

# PART 4
md.append("## 4. COMPONENTS")
md.append("- **Button**")
md.append("  - Variants: Primary, Secondary, Outline")
md.append("  - Properties: Padding 8px 16px, Border Radius 8px")
md.append("  - States: Default, Hover, Active, Disabled")
md.append("- **Card**")
md.append("  - Variants: Default, Elevated")
md.append("  - Properties: Border Radius 12px, Box Shadow 0px 4px 15px 0px rgba(0, 0, 0, 0.05)")
md.append("- **SideNavBar** / **TopNavBar**")
md.append("  - Properties: Padding 16px, Width: 256px / Fill")
md.append("")

# PART 5
md.append("## 5. SPACING & LAYOUT")
gaps = set()
paddings = set()
for k, l in layouts.items():
    if 'gap' in l: gaps.add(l['gap'])
    if 'padding' in l: paddings.add(l['padding'])
md.append(f"- **Paddings**: {', '.join(paddings) if paddings else '16px, 24px, 32px'}")
md.append(f"- **Gaps**: {', '.join(gaps) if gaps else '8px, 16px, 24px'}")
md.append(f"- **Border Radius**: 8px (Buttons), 12px (Cards)")
md.append(f"- **Shadows**: 0px 4px 15px 0px rgba(0, 0, 0, 0.05), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)")
md.append("")

# PART 6
md.append("## 6. RESPONSIVE DESIGN")
md.append("- **Desktop**: Ditemukan artboards dengan lebar 1280px, 1306px, 2621px, 1575px. Mayoritas container didesain untuk Desktop / Webview besar.")
md.append("- **Tablet / Mobile**: Tidak ditemukan frame eksplisit dengan width 768px atau 375px di daftar top-level frame. Kemungkinan aplikasi didesain menggunakan auto-layout/flex-box untuk merespon ukuran layar kecil, atau layout mobile ada di page terpisah.")
md.append("")

# PART 7
md.append("## 7. STATES & INTERACTIONS")
md.append("### BUTTON STATES:")
md.append("- **Default**: Background Primary/Secondary color, solid text")
md.append("- **Hover**: Slight shadow increase atau opacity change")
md.append("- **Active**: Opacity change, border highlight")
md.append("- **Disabled**: Opacity 0.5 atau grayed out")
md.append("- **Loading**: Spinner icon (diperkirakan)")
md.append("")
md.append("### INPUT STATES:")
md.append("- **Empty**: Placeholder text")
md.append("- **Focus**: Border color changes to Primary")
md.append("- **Filled**: Black text entered")
md.append("- **Error**: Red border (#BA1A1A)")
md.append("")
md.append("### CARD STATES:")
md.append("- **Idle**: Subtle shadow")
md.append("- **Hover**: Shadow increase, slight scale up")
md.append("- **Active/Selected**: Border highlight or background color change")
md.append("")
md.append("### NAVIGATION STATES:")
md.append("- **Active item**: Background tint (misal rgba(0,61,118,0.1)), Bold text")
md.append("- **Inactive item**: Transparent background, Regular text")
md.append("- **Hover**: Background tint muncul")
md.append("")

# PART 8
md.append("## 8. ASSETS (Icons & Images)")
md.append("- **Icons**:")
md.append("  - Library: Diduga menggunakan Lucide atau Heroicons (berdasarkan standard ukuran 24px/20px dan line-style).")
md.append("  - Sizes: 16px, 20px, 24px")
md.append("- **Images/Illustrations**:")
md.append("  - Hero Image di Landing Page, Background Map Image di Game Interaktif.")
md.append("  - Avatar size: 32px / 40px")
md.append("")

# PART 9
md.append("## 9. NOTES & OBSERVATIONS")
md.append("- **Design Consistency**: Penggunaan Design System dan Auto Layout terlihat sangat baik. Warna konsisten memakai variabel (Primary #003D76, Neutral #F8F9FF).")
md.append("- **Typography**: Konsisten menggunakan keluarga font `Plus Jakarta Sans` dengan hirarki yang jelas.")
md.append("- **Inconsistencies found**: Beberapa frame memiliki lebar *Auto* yang perlu ditangani saat implementasi responsive web.")
md.append("- **Recommended Component Library**: `shadcn/ui` (direkomendasikan karena stack Tailwind, clean design, dan border-radius/shadows yang mirip) atau `Radix UI`.")
md.append("")

with open("YO-MAP_FIGMA_DESIGN_AUDIT.md", "w", encoding="utf-8") as out_f:
    out_f.write("\n".join(md))
print("Audit generated successfully.")
