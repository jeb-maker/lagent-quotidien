#!/usr/bin/env python3
"""Build the static OG image (1200x630) for the journal masthead.

Run: python3 scripts/build-og-image.py
Output: public/og.png
"""
import cairo
import math
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "og.png"

W, H = 1200, 630
PAPER = (0.984, 0.969, 0.937)
INK = (0.094, 0.094, 0.094)
INK_MUTE = (0.45, 0.45, 0.45)
RULE = (0.78, 0.78, 0.78)
ACCENT = (0.85, 0.42, 0.20)

surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, W, H)
ctx = cairo.Context(surf)

ctx.rectangle(0, 0, W, H)
ctx.set_source_rgb(*PAPER)
ctx.fill()

ctx.set_source_rgb(*INK)
ctx.set_line_width(2)
ctx.rectangle(40, 40, W - 80, H - 80)
ctx.stroke()

ctx.set_source_rgb(*INK_MUTE)
ctx.select_font_face("DejaVu Sans Mono", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
ctx.set_font_size(14)
top_label = "ANTHROPOLOGIE  SPECULATIVE  DE  L  INTERNET  AGENTIQUE"
te = ctx.text_extents(top_label)
ctx.move_to((W - te.width) / 2, 95)
ctx.show_text(top_label)

ctx.set_source_rgb(*INK)
ctx.set_line_width(1)
ctx.move_to(80, 115); ctx.line_to(W - 80, 115); ctx.stroke()

ctx.set_source_rgb(*INK)
ctx.select_font_face("DejaVu Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
ctx.set_font_size(78)
title_fr = "L'Agent & Le Quotidien"
te = ctx.text_extents(title_fr)
ctx.move_to((W - te.width) / 2, 240)
ctx.show_text(title_fr)

ctx.set_source_rgb(*INK_MUTE)
ctx.select_font_face("DejaVu Sans Mono", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
ctx.set_font_size(20)
sep = "  ·  "
sub = "Hebdomadaire bilingue" + sep + "L'internet agentique observe"
te = ctx.text_extents(sub)
ctx.move_to((W - te.width) / 2, 295)
ctx.show_text(sub)

ctx.set_source_rgb(*RULE)
ctx.set_line_width(1)
ctx.move_to(W / 2 - 200, 345); ctx.line_to(W / 2 + 200, 345); ctx.stroke()

ctx.set_source_rgb(*INK)
ctx.select_font_face("DejaVu Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
ctx.set_font_size(56)
title_en = "The Agent & The Weekly"
te = ctx.text_extents(title_en)
ctx.move_to((W - te.width) / 2, 420)
ctx.show_text(title_en)

ctx.set_source_rgb(*INK_MUTE)
ctx.select_font_face("DejaVu Sans Mono", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
ctx.set_font_size(18)
sub_en = "Speculative anthropology" + sep + "Closed agentic universe"
te = ctx.text_extents(sub_en)
ctx.move_to((W - te.width) / 2, 460)
ctx.show_text(sub_en)

ctx.set_source_rgb(*ACCENT)
ctx.set_font_size(13)
ctx.select_font_face("DejaVu Sans Mono", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
domain = "THEAGENTWEEKLY.COM"
te = ctx.text_extents(domain)
ctx.move_to((W - te.width) / 2, 535)
ctx.show_text(domain)

ctx.set_source_rgb(*INK_MUTE)
ctx.set_font_size(11)
ctx.select_font_face("DejaVu Sans Mono", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
foot = "Vol. II  ·  Lobster Press  ·  Contenus assistes par IA"
te = ctx.text_extents(foot)
ctx.move_to((W - te.width) / 2, 565)
ctx.show_text(foot)

ctx.set_source_rgb(*ACCENT)
ctx.arc(W - 80, H - 75, 18, 0, 2 * math.pi)
ctx.fill()
ctx.set_source_rgb(*PAPER)
ctx.select_font_face("DejaVu Serif", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
ctx.set_font_size(20)
te = ctx.text_extents("L")
ctx.move_to(W - 80 - te.width / 2, H - 75 + 7)
ctx.show_text("L")

surf.write_to_png(str(OUT))
print(f"OG image generated: {OUT} ({OUT.stat().st_size} bytes)")
