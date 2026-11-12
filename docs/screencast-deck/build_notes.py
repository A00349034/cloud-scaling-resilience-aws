"""Puts the narration in speaking-script.md into the Reveal.js speaker notes (notes.js).

Each "## <label>. <title>" section of the script (1, 2, 2a, 5a ...) becomes the notes of the slide
whose <!-- .slide: data-note="<label>" --> matches. Run after editing the script:  python build_notes.py
"""
from pathlib import Path
import json
import re

root = Path(__file__).resolve().parent
source = (root / "speaking-script.md").read_text(encoding="utf-8").split("## Recording checklist")[0]
heads = list(re.finditer(r"^## (\w+)\. .+$", source, flags=re.M))
notes = {h.group(1): source[h.end():(heads[i + 1].start() if i + 1 < len(heads) else len(source))].strip()
         for i, h in enumerate(heads)}
used = set(re.findall(r'data-note="(\w+)"', (root / "slides.md").read_text(encoding="utf-8")))
for label in sorted(used - notes.keys()):
    print(f"WARNING: slides.md asks for section {label}, which speaking-script.md does not have")
for label in sorted(notes.keys() - used):
    print(f"WARNING: section {label} of speaking-script.md is not on any slide")
header = "// Generated from speaking-script.md by build_notes.py; rebuild after editing the narration.\n"
(root / "notes.js").write_text(header + "window.CA1_NOTES = " + json.dumps(notes, indent=2) + ";\n", encoding="utf-8")
print(f"Wrote {len(notes)} narration sections to notes.js")
