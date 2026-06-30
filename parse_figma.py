import re
import json
import yaml

filename = r"C:\Users\HP\.gemini\antigravity-ide\brain\894578c8-a0fc-4b5a-b3cb-3ee9fa0699d0\.system_generated\steps\9\output.txt"

yaml_part = []
nodes_part = []
in_nodes = False

with open(filename, 'r', encoding='utf-8') as f:
    for line in f:
        if line.strip() == "NODES:":
            in_nodes = True
            continue
        if not in_nodes:
            yaml_part.append(line)
        else:
            nodes_part.append(line)

# Parse YAML part
try:
    global_vars = yaml.safe_load("".join(yaml_part))
except Exception as e:
    print(f"Error parsing YAML part: {e}")
    global_vars = {}

if global_vars is None:
    global_vars = {}

# Analyze Nodes
type_counts = {}
max_depth = 0
truncated_nodes = []
master_components = set()
instances = set()
variants = set()

elements = {
    'Frame': 0,
    'Group': 0,
    'Text Nodes': 0,
    'Vectors/Shapes': 0,
    'Images': 0
}

missing_css_candidates = []

for line in nodes_part:
    if not line.strip(): continue
    
    indent = len(line) - len(line.lstrip())
    depth = indent // 2
    if depth > max_depth:
        max_depth = depth
        
    if "TRUNCATED" in line.upper() or "DEPTH LIMIT" in line.upper():
        truncated_nodes.append(line.strip())

    match = re.search(r'\[(.*?)\]', line)
    if match:
        node_type = match.group(1)
        type_counts[node_type] = type_counts.get(node_type, 0) + 1
        
        if node_type == 'FRAME':
            elements['Frame'] += 1
        elif node_type == 'GROUP':
            elements['Group'] += 1
        elif node_type == 'TEXT':
            elements['Text Nodes'] += 1
        elif 'VECTOR' in node_type or 'SHAPE' in node_type or node_type in ['RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'LINE']:
            elements['Vectors/Shapes'] += 1
        elif 'IMAGE' in node_type:
            elements['Images'] += 1
        elif node_type == 'COMPONENT':
            elements['Frame'] += 1
            name_match = re.search(r'\[COMPONENT\] "(.*?)"', line)
            if name_match:
                master_components.add(name_match.group(1))
        elif node_type == 'COMPONENT_SET':
            elements['Frame'] += 1
            name_match = re.search(r'\[COMPONENT_SET\] "(.*?)"', line)
            if name_match:
                master_components.add(name_match.group(1))
        elif node_type == 'INSTANCE':
            elements['Frame'] += 1
            name_match = re.search(r'\[INSTANCE\] "(.*?)"', line)
            if name_match:
                instances.add(name_match.group(1))
                
        if "variantProperties=" in line or "componentProperties=" in line:
            variants.add(line.strip())
            
        if "layout=" not in line and "template=" not in line and node_type in ['FRAME', 'GROUP']:
            missing_css_candidates.append(line.strip())

print("--- Analysis Results ---")
print(f"Max Depth: {max_depth}")
print(f"Truncated Nodes: {truncated_nodes}")
print(f"Element Recapitulation:")
for k, v in elements.items():
    print(f"  {k}: {v}")
    
print(f"Raw Types Found: {type_counts}")

print(f"\nMaster Components count: {len(master_components)}")
print(f"Instances count: {len(instances)}")
print("Sample Master Components:", list(master_components)[:5])
print("Sample Instances:", list(instances)[:5])
print("Variants found:", len(variants))

# Styles extraction
print("\nGlobal Vars (Tokens & Styles) Extraction:")
styles_counts = {'fills': 0, 'layouts': 0, 'text_styles': 0, 'effects': 0}

colors = []
typography = []
auto_layout = []

if isinstance(global_vars, dict) and 'GLOBAL_VARS' in global_vars and global_vars['GLOBAL_VARS']:
    for k, v in global_vars['GLOBAL_VARS'].items():
        if k.startswith('fill_'): 
            styles_counts['fills'] += 1
            colors.append(v)
        elif k.startswith('layout_'): 
            styles_counts['layouts'] += 1
            if isinstance(v, dict) and 'mode' in v and v['mode'] != 'none':
                auto_layout.append(v)
        elif k.startswith('style_') or k.startswith('ts'): 
            styles_counts['text_styles'] += 1
            typography.append(v)
        elif k.startswith('effect_'): 
            styles_counts['effects'] += 1

print(styles_counts)
print(f"Found {len(colors)} unique fills/colors.")
print(f"Found {len(typography)} unique text styles.")
print(f"Found {len(auto_layout)} auto-layout configs.")

print("\nMissing CSS Candidates (Visuals missing explicit layout):", len(missing_css_candidates))

# Also parse all unique color hexes from colors
all_hexes = set()
for c in colors:
    if isinstance(c, list):
        for item in c:
            all_hexes.add(item)
    elif isinstance(c, str):
        all_hexes.add(c)
        
print("\nColor Hex/RGBs found:")
print(list(all_hexes)[:10])

# Typography sample
print("\nTypography properties found:")
typo_props = set()
for t in typography:
    if isinstance(t, dict):
        # build a signature
        sig = f"{t.get('fontFamily', '')} {t.get('fontWeight', '')} {t.get('fontSize', '')}px"
        typo_props.add(sig)
print(list(typo_props)[:10])

# Auto-layout sample
print("\nAuto Layout rules found:")
al_props = set()
for a in auto_layout:
    if isinstance(a, dict):
        padding = a.get('padding', '')
        gap = a.get('gap', '')
        mode = a.get('mode', '')
        sig = f"Mode: {mode}, Padding: {padding}, Gap: {gap}"
        al_props.add(sig)
print(list(al_props)[:10])
