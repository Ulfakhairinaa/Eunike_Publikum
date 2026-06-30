import re

filename = r"C:\Users\HP\.gemini\antigravity-ide\brain\894578c8-a0fc-4b5a-b3cb-3ee9fa0699d0\.system_generated\steps\9\output.txt"

# Let's just regex through the whole file.

colors = set()
layouts = set()
typographies = set()

master_components = set()
instances = set()

elements = {
    'Frame': 0,
    'Group': 0,
    'Text Nodes': 0,
    'Vectors/Shapes': 0,
    'Images': 0
}

max_depth = 0
truncated = []
missing_css = 0

in_nodes = False
for line in open(filename, 'r', encoding='utf-8'):
    line_s = line.strip()
    if line_s == "NODES:":
        in_nodes = True
        
    # extract fills
    fills = re.findall(r"- '(#([a-fA-F0-9]{6}|[a-fA-F0-9]{3}))'", line)
    for f in fills: colors.add(f[0])
    
    rgba = re.findall(r"- '(rgba\([^)]+\))'", line)
    for r in rgba: colors.add(r)
    
    # layouts
    if "padding:" in line or "gap:" in line:
        layouts.add(line_s)
        
    if "fontFamily:" in line: typographies.add(line_s)
    if "fontSize:" in line: typographies.add(line_s)
    if "fontWeight:" in line: typographies.add(line_s)
    
    if in_nodes:
        indent = len(line) - len(line.lstrip())
        depth = indent // 2
        if depth > max_depth: max_depth = depth
        
        if "TRUNCATED" in line.upper() or "DEPTH LIMIT" in line.upper():
            truncated.append(line_s)
            
        match = re.search(r'\[(.*?)\]', line)
        if match:
            t = match.group(1)
            if t == 'FRAME': elements['Frame'] += 1
            elif t == 'GROUP': elements['Group'] += 1
            elif t == 'TEXT': elements['Text Nodes'] += 1
            elif t in ['RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'LINE'] or 'VECTOR' in t or 'SHAPE' in t: elements['Vectors/Shapes'] += 1
            elif 'IMAGE' in t: elements['Images'] += 1
            
            # Components
            # Actually, standard Figma MCP output uses `[COMPONENT] "name" #id` or similar. Let's see if there are any.
            if t == 'COMPONENT': master_components.add(line_s)
            if t == 'INSTANCE': instances.add(line_s)
            
            # code validation
            # visual element (Frame, Group, Text) missing layout and not canvas
            if t in ['FRAME', 'GROUP'] and "layout=" not in line and "template=" not in line and "fills=" not in line:
                missing_css += 1
                
print("Max Depth:", max_depth)
print("Truncated:", truncated)
print("Elements:", elements)
print("Master Components Count:", len(master_components))
print("Instances Count:", len(instances))
print("Colors Found:", len(colors))
print("Sample Colors:", list(colors)[:10])
print("Layout Attributes Found:", len(layouts))
print("Sample Layouts:", list(layouts)[:10])
print("Typography Attributes Found:", len(typographies))
print("Sample Typography:", list(typographies)[:10])
print("Missing CSS Candidates:", missing_css)

