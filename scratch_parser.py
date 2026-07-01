import yaml
import json
import re

filepath = r'C:\Users\HP\.gemini\antigravity-ide\brain\d2959bbd-4ed8-4786-b1bf-4d30268da1b2\.system_generated\steps\12\output.txt'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Split into YAML vars and Nodes
parts = content.split('\nNODES:\n')
if len(parts) == 2:
    yaml_part, nodes_part = parts
else:
    yaml_part = parts[0]
    nodes_part = ""

# The yaml part might have NAME: and GLOBAL_VARS:
# We just need to load it after cleaning
try:
    global_vars = yaml.safe_load(yaml_part.replace('GLOBAL_VARS:', ''))
except Exception as e:
    # If YAML parse fails, we can just extract using regex
    global_vars = {}

def get_fill_color(fill_ref):
    if not fill_ref:
        return 'None'
    # Try using regex to find the fill array in the yaml part
    m = re.search(rf'{fill_ref}:\n\s+- \'([^\']+)\'', yaml_part)
    if m:
        return m.group(1)
    
    m2 = re.search(rf'{fill_ref}:\n\s+- ([^\n]+)', yaml_part)
    if m2:
        return m2.group(1).strip()
    return 'None'

lines = nodes_part.split('\n')
frames = []
current_frame = None

for line in lines:
    if not line.strip(): continue
    indent = len(line) - len(line.lstrip())
    
    if indent == 2 and line.lstrip().startswith('[FRAME]'):
        # Parse top-level frame
        m = re.search(r'\[FRAME\] "([^"]+)" #\S+(.*)', line)
        if m:
            name = m.group(1)
            rest = m.group(2)
            
            # extract layout
            layout_match = re.search(r'layout=({[^}]+(}?)[^}]+})', rest) # basic JSON match
            if not layout_match:
                # try simpler regex
                layout_match = re.search(r'layout=({.*?})\s+\w+', rest)
            width, height = '?', '?'
            if layout_match:
                try:
                    # layout might have spaces, we can just regex width and height
                    layout_str = layout_match.group(1)
                except:
                    pass
            
            # just search for width and height directly in the rest
            w_m = re.search(r'"width":\s*([\d.]+)', rest)
            h_m = re.search(r'"height":\s*([\d.]+)', rest)
            if w_m: width = w_m.group(1)
            if h_m: height = h_m.group(1)
            
            fill_m = re.search(r'fills=(fill_\w+)', rest)
            color = get_fill_color(fill_m.group(1)) if fill_m else 'None'
            
            current_frame = {
                'name': name,
                'width': width,
                'height': height,
                'color': color,
                'children': []
            }
            frames.append(current_frame)
    elif indent > 2 and current_frame:
        # nested element
        m = re.search(r'\[(\w+)\] "?([^"]*)"? #', line)
        if m:
            c_type = m.group(1)
            c_name = m.group(2)
            if c_name:
                current_frame['children'].append(f"{c_type}: {c_name}")
            else:
                current_frame['children'].append(f"{c_type}")

# Now format output
out = []
for i, f in enumerate(frames):
    out.append(f"{i+1}. **Frame Name**: {f['name']}")
    out.append(f"   - **Dimensions**: {f['width']} x {f['height']}")
    out.append(f"   - **Background Color**: {f['color']}")
    out.append(f"   - **Nested Elements**: {len(f['children'])} items")
    if f['children']:
        # Only show up to 10 for brevity, or summarize
        # Let's show all grouped by type or just a list
        out.append(f"     " + ", ".join(f['children'][:15]) + ("..." if len(f['children']) > 15 else ""))
    out.append("")

with open("scratch_output.md", "w", encoding="utf-8") as out_f:
    out_f.write("\n".join(out))
