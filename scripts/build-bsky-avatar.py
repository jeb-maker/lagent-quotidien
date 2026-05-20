#!/usr/bin/env python3
"""Génère 3 candidats d'avatar 1000x1000 pour le compte Bluesky cuvee-42.

Run: python3 scripts/build-bsky-avatar.py
Output: /tmp/avatar-{1,2,3}.png

Style : palette du journal (cream/ink/accent), lecture jusqu'à 32×32.
"""
import cairo
import math
from pathlib import Path

OUT_DIR = Path("/tmp")
SIZE = 1000

PAPER = (0.984, 0.969, 0.937)
INK = (0.094, 0.094, 0.094)
INK_MUTE = (0.45, 0.45, 0.45)
RULE = (0.78, 0.78, 0.78)
ACCENT = (0.545, 0.165, 0.122)  # #8B2A1F, terracotta du site


def base(ctx):
    ctx.rectangle(0, 0, SIZE, SIZE)
    ctx.set_source_rgb(*PAPER)
    ctx.fill()


def frame(ctx, color=INK, width=10, inset=60):
    ctx.set_source_rgb(*color)
    ctx.set_line_width(width)
    ctx.rectangle(inset, inset, SIZE - 2 * inset, SIZE - 2 * inset)
    ctx.stroke()


# ───── Candidat 1 : Monogramme & en italique, cadre journal ─────
def candidate_1():
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, SIZE, SIZE)
    ctx = cairo.Context(surf)
    base(ctx)
    frame(ctx, INK, 8, 50)
    frame(ctx, INK, 2, 80)

    # Bandeau kicker
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(46)
    label = "L'AGENT  &  LE QUOTIDIEN"
    ext = ctx.text_extents(label)
    ctx.move_to((SIZE - ext.width) / 2, 200)
    ctx.show_text(label)

    # Esperluette monumentale
    ctx.select_font_face("Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(540)
    ctx.set_source_rgb(*ACCENT)
    ext = ctx.text_extents("&")
    ctx.move_to((SIZE - ext.width) / 2 - ext.x_bearing - ext.width / 2 + SIZE / 2, SIZE / 2 + ext.height / 2)
    # recalc properly: center horizontally and vertically based on metrics
    ext = ctx.text_extents("&")
    x = (SIZE - ext.width) / 2 - ext.x_bearing
    y = SIZE / 2 + ext.height / 2 + 30
    ctx.move_to(x, y)
    ctx.show_text("&")

    # Footer
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(36)
    foot = "VOL. II · @cuvee_42"
    ext = ctx.text_extents(foot)
    ctx.move_to((SIZE - ext.width) / 2, SIZE - 160)
    ctx.show_text(foot)

    surf.write_to_png(str(OUT_DIR / "avatar-1.png"))


# ───── Candidat 2 : Disque rouge centré, drop cap "L" italique blanc ─────
def candidate_2():
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, SIZE, SIZE)
    ctx = cairo.Context(surf)
    base(ctx)

    cx, cy = SIZE / 2, SIZE / 2
    r = 380

    # Anneau extérieur fin (signal de cachet)
    ctx.set_source_rgb(*INK)
    ctx.set_line_width(4)
    ctx.arc(cx, cy, r + 30, 0, 2 * math.pi)
    ctx.stroke()

    # Disque rouge plein
    ctx.set_source_rgb(*ACCENT)
    ctx.arc(cx, cy, r, 0, 2 * math.pi)
    ctx.fill()

    # Anneau intérieur clair (filet décoratif)
    ctx.set_source_rgb(*PAPER)
    ctx.set_line_width(4)
    ctx.arc(cx, cy, r - 24, 0, 2 * math.pi)
    ctx.stroke()

    # Drop cap "L" italique blanc, monumental, parfaitement centré
    ctx.set_source_rgb(*PAPER)
    ctx.select_font_face("Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(620)
    glyph = "L"
    ext = ctx.text_extents(glyph)
    x = cx - ext.width / 2 - ext.x_bearing
    y = cy + ext.height / 2 - 20
    ctx.move_to(x, y)
    ctx.show_text(glyph)

    surf.write_to_png(str(OUT_DIR / "avatar-2.png"))


# ───── Candidat 3 : Tampon "@cuvee_42" en biais, fond crème ─────
def candidate_3():
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, SIZE, SIZE)
    ctx = cairo.Context(surf)
    base(ctx)

    cx, cy = SIZE / 2, SIZE / 2

    # Anneau extérieur dans le style cachet de cire
    ctx.set_source_rgb(*ACCENT)
    ctx.set_line_width(12)
    ctx.arc(cx, cy, 430, 0, 2 * math.pi)
    ctx.stroke()
    ctx.set_line_width(4)
    ctx.arc(cx, cy, 405, 0, 2 * math.pi)
    ctx.stroke()

    # Bandeau haut : "PRESSE" — court, tient dans le disque
    ctx.set_source_rgb(*ACCENT)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(58)
    top = "·  PRESSE  ·"
    ext = ctx.text_extents(top)
    ctx.move_to((SIZE - ext.width) / 2, 235)
    ctx.show_text(top)

    # Filets décoratifs
    ctx.set_line_width(3)
    ctx.move_to(245, 285); ctx.line_to(SIZE - 245, 285); ctx.stroke()
    ctx.move_to(245, SIZE - 285); ctx.line_to(SIZE - 245, SIZE - 285); ctx.stroke()

    # Handle monumental au centre
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(170)
    handle = "@cuvee"
    ext = ctx.text_extents(handle)
    ctx.move_to((SIZE - ext.width) / 2, cy - 10)
    ctx.show_text(handle)

    # Numéro 42 en accent, monumental
    ctx.set_source_rgb(*ACCENT)
    ctx.set_font_size(200)
    num = "42"
    ext = ctx.text_extents(num)
    ctx.move_to((SIZE - ext.width) / 2, cy + 180)
    ctx.show_text(num)

    # Bas
    ctx.set_source_rgb(*ACCENT)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(46)
    foot = "L  &  Q  ·  VOL. II"
    ext = ctx.text_extents(foot)
    ctx.move_to((SIZE - ext.width) / 2, SIZE - 190)
    ctx.show_text(foot)

    surf.write_to_png(str(OUT_DIR / "avatar-3.png"))


# ───── Vignette rich-card Bluesky : 1200x630, EN-only ─────
# Sert de thumbnail dans les posts cuvee-daily.mjs et bluesky-pin.mjs.
# Pas de mention bilingue (le compte Bluesky est EN-only).
def thumb_en():
    TW, TH = 1200, 630
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, TW, TH)
    ctx = cairo.Context(surf)
    ctx.rectangle(0, 0, TW, TH)
    ctx.set_source_rgb(*PAPER)
    ctx.fill()

    # Cadre journal
    ctx.set_source_rgb(*INK)
    ctx.set_line_width(2)
    ctx.rectangle(40, 40, TW - 80, TH - 80)
    ctx.stroke()

    # Kicker haut
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("DejaVu Sans Mono", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(15)
    kicker = "SPECULATIVE  ANTHROPOLOGY  OF  THE  AGENTIC  INTERNET"
    te = ctx.text_extents(kicker)
    ctx.move_to((TW - te.width) / 2, 110)
    ctx.show_text(kicker)

    # Filet
    ctx.set_line_width(1)
    ctx.move_to(80, 135); ctx.line_to(TW - 80, 135); ctx.stroke()

    # Titre monumental — taille calculée pour tenir dans le cadre (TW-160 d'usable)
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("DejaVu Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(78)
    title = "The Agent & The Weekly"
    te = ctx.text_extents(title)
    ctx.move_to((TW - te.width) / 2, 310)
    ctx.show_text(title)

    # Sous-titre
    ctx.set_source_rgb(*INK_MUTE)
    ctx.select_font_face("DejaVu Sans Mono", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(22)
    sub = "Closed agentic universe  ·  New issue every Tuesday"
    te = ctx.text_extents(sub)
    ctx.move_to((TW - te.width) / 2, 380)
    ctx.show_text(sub)

    # Filet de séparation
    ctx.set_source_rgb(*RULE)
    ctx.move_to(TW / 2 - 200, 440); ctx.line_to(TW / 2 + 200, 440); ctx.stroke()

    # URL
    ctx.set_source_rgb(*ACCENT)
    ctx.select_font_face("DejaVu Sans Mono", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(20)
    domain = "THEAGENTWEEKLY.COM"
    te = ctx.text_extents(domain)
    ctx.move_to((TW - te.width) / 2, 500)
    ctx.show_text(domain)

    # Footer fine
    ctx.set_source_rgb(*INK_MUTE)
    ctx.set_font_size(12)
    ctx.select_font_face("DejaVu Sans Mono", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    foot = "Vol. II  ·  Lobster Press  ·  AI-assisted, human-edited"
    te = ctx.text_extents(foot)
    ctx.move_to((TW - te.width) / 2, 540)
    ctx.show_text(foot)

    # L disc en bas à droite
    ctx.set_source_rgb(*ACCENT)
    ctx.arc(TW - 80, TH - 75, 22, 0, 2 * math.pi)
    ctx.fill()
    ctx.set_source_rgb(*PAPER)
    ctx.select_font_face("DejaVu Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(26)
    te = ctx.text_extents("L")
    ctx.move_to(TW - 80 - te.width / 2 - te.x_bearing, TH - 75 + te.height / 2 - 2)
    ctx.show_text("L")

    out = Path("/home/debian/agentic-news/agent-quotidien/public/bsky-thumb.png")
    surf.write_to_png(str(out))


# ───── Banner Bluesky : 3000x1000, EN-only ─────
# Bluesky est en EN-only pour ce compte, donc la bannière reste sobre :
# un seul titre, pas de mention bilingue.
def banner():
    BW, BH = 3000, 1000
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, BW, BH)
    ctx = cairo.Context(surf)
    ctx.rectangle(0, 0, BW, BH)
    ctx.set_source_rgb(*PAPER)
    ctx.fill()

    # Cadre extérieur (style journal imprimé)
    ctx.set_source_rgb(*INK)
    ctx.set_line_width(8)
    ctx.rectangle(50, 50, BW - 100, BH - 100)
    ctx.stroke()
    ctx.set_line_width(2)
    ctx.rectangle(80, 80, BW - 160, BH - 160)
    ctx.stroke()

    # Kicker
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(40)
    kicker = "SPECULATIVE  ANTHROPOLOGY  OF  THE  AGENTIC  INTERNET  ·  VOL. II"
    ext = ctx.text_extents(kicker)
    ctx.move_to((BW - ext.width) / 2, 240)
    ctx.show_text(kicker)

    ctx.set_line_width(1.5)
    ctx.move_to(180, 290); ctx.line_to(BW - 180, 290); ctx.stroke()

    # Titre monumental EN (dimensionné pour tenir entre les disques L)
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(160)
    title = "The Agent  &  The Weekly"
    ext = ctx.text_extents(title)
    ctx.move_to((BW - ext.width) / 2, 560)
    ctx.show_text(title)

    # Sous-titre
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(40)
    sub = "closed agentic universe  ·  new issue every tuesday"
    ext = ctx.text_extents(sub)
    ctx.move_to((BW - ext.width) / 2, 660)
    ctx.show_text(sub)

    ctx.set_line_width(1.5)
    ctx.move_to(BW / 2 - 250, 730); ctx.line_to(BW / 2 + 250, 730); ctx.stroke()

    # URL en accent
    ctx.set_source_rgb(*ACCENT)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(38)
    foot = "THEAGENTWEEKLY.COM"
    ext = ctx.text_extents(foot)
    ctx.move_to((BW - ext.width) / 2, 800)
    ctx.show_text(foot)

    # Disques L décoratifs
    for x in [180, BW - 180]:
        ctx.set_source_rgb(*ACCENT)
        ctx.arc(x, BH / 2, 55, 0, 2 * math.pi)
        ctx.fill()
        ctx.set_source_rgb(*PAPER)
        ctx.select_font_face("Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
        ctx.set_font_size(80)
        ext = ctx.text_extents("L")
        ctx.move_to(x - ext.width / 2 - ext.x_bearing, BH / 2 + ext.height / 2 - 4)
        ctx.show_text("L")

    surf.write_to_png(str(OUT_DIR / "banner.png"))


# ───── Banner X (Twitter) : 1500x500, plus court que Bluesky ─────
def banner_x():
    BW, BH = 1500, 500
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, BW, BH)
    ctx = cairo.Context(surf)
    ctx.rectangle(0, 0, BW, BH)
    ctx.set_source_rgb(*PAPER)
    ctx.fill()

    # Cadre extérieur
    ctx.set_source_rgb(*INK)
    ctx.set_line_width(5)
    ctx.rectangle(30, 30, BW - 60, BH - 60)
    ctx.stroke()
    ctx.set_line_width(1.5)
    ctx.rectangle(50, 50, BW - 100, BH - 100)
    ctx.stroke()

    # Kicker compact (la zone centrale de X est cachée par l'avatar circulaire en bas à gauche)
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(22)
    kicker = "ANTHROPOLOGIE  SPÉCULATIVE  ·  AGENTIC  INTERNET  ·  VOL. II"
    ext = ctx.text_extents(kicker)
    ctx.move_to((BW - ext.width) / 2, 105)
    ctx.show_text(kicker)

    ctx.set_line_width(1)
    ctx.move_to(150, 130); ctx.line_to(BW - 150, 130); ctx.stroke()

    # Titre EN monumental
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("Serif", cairo.FONT_SLANT_ITALIC, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(110)
    en = "The Agent  &  The Weekly"
    ext = ctx.text_extents(en)
    ctx.move_to((BW - ext.width) / 2, 280)
    ctx.show_text(en)

    # Sous-titre
    ctx.set_source_rgb(*INK)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(22)
    sub = "speculative weekly  ·  closed universe  ·  new issue every tuesday"
    ext = ctx.text_extents(sub)
    ctx.move_to((BW - ext.width) / 2, 350)
    ctx.show_text(sub)

    # URL en accent
    ctx.set_source_rgb(*ACCENT)
    ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    ctx.set_font_size(26)
    foot = "THEAGENTWEEKLY.COM"
    ext = ctx.text_extents(foot)
    ctx.move_to((BW - ext.width) / 2, 415)
    ctx.show_text(foot)

    surf.write_to_png(str(OUT_DIR / "banner-x.png"))


candidate_1()
candidate_2()
candidate_3()
banner()
banner_x()
thumb_en()
print("✓ /tmp/avatar-{1,2,3}.png + /tmp/banner.png + /tmp/banner-x.png + public/bsky-thumb.png")
