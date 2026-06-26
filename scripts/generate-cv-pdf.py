# -*- coding: utf-8 -*-
"""
Genererar Andreas CV-PDF ur src/data/cv-data.json.

Single source of truth = cv-data.json. Ändra datan, kör om scriptet.
Designmål: stilren AD-blå layout, KOMPAKT så allt ryms på 3 sidor.

Kör:  python scripts/generate-cv-pdf.py
Ut:   public/cv-andreas-dahlgren.pdf  (eller --out <fil> för utkast)
"""
import json, os, sys, argparse
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table,
    TableStyle, Image, KeepTogether, HRFlowable, Flowable
)
from reportlab.lib.enums import TA_RIGHT, TA_LEFT

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "src", "data", "cv-data.json")
LOGO = os.path.join(ROOT, "public", "cv-logo.png")

# --- Palett (AD-blå) ---
BLUE  = colors.HexColor("#1F4E96")
INK   = colors.HexColor("#222A33")
GRAY  = colors.HexColor("#7C8794")
ZEBRA = colors.HexColor("#EEF3F8")
CARD  = colors.HexColor("#EFF4FA")
RULE  = colors.HexColor("#C9D4E0")
WHITE = colors.white

LM, RM, TM, BM = 18*mm, 18*mm, 14*mm, 16*mm
PW, PH = A4
CW = PW - LM - RM  # innehållsbredd

# --- Stilar (kompakta) ---
def P(name, **kw):
    base = dict(fontName="Helvetica", fontSize=8.6, leading=11.2, textColor=INK)
    base.update(kw)
    return ParagraphStyle(name, **base)

st_name   = P("name", fontName="Helvetica-Bold", fontSize=22, leading=24, textColor=INK)
st_sub    = P("sub",  fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=BLUE)
st_facts  = P("facts", fontSize=8.4, leading=12, textColor=INK)
st_contact= P("contact", fontSize=8.3, leading=11.5, textColor=GRAY, alignment=TA_RIGHT)
st_sec    = P("sec", fontName="Helvetica-Bold", fontSize=11.5, leading=13, textColor=BLUE)
st_period = P("period", fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=BLUE)
st_body   = P("body", fontSize=8.6, leading=11.2, textColor=INK)
st_org    = P("org", fontSize=8.4, leading=11, textColor=GRAY, alignment=TA_RIGHT)
st_ptitle = P("ptitle", fontName="Helvetica-Bold", fontSize=9.4, leading=12, textColor=INK)
st_pben   = P("pben", fontName="Helvetica-Oblique", fontSize=8, leading=10.5, textColor=GRAY)
st_pdesc  = P("pdesc", fontSize=8.5, leading=11, textColor=INK)
st_pfacts = P("pfacts", fontName="Helvetica-Bold", fontSize=7.9, leading=10.5, textColor=BLUE)


def section(title):
    """Blå sektionsrubrik med understruken linje."""
    return KeepTogether([
        Spacer(1, 5),
        Paragraph(title.upper(), st_sec),
        Spacer(1, 2),
        HRFlowable(width="100%", thickness=1.4, color=BLUE,
                   spaceBefore=0, spaceAfter=4),
    ])


def two_col_table(rows, col0=0.20):
    """Zebra-tabell: smal blå periodkolumn + detalj."""
    w0 = CW*col0
    data = [[Paragraph(a, st_period), Paragraph(b, st_body)] for a, b in rows]
    t = Table(data, colWidths=[w0, CW-w0])
    t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, ZEBRA]),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TOPPADDING", (0,0), (-1,-1), 3.2),
        ("BOTTOMPADDING", (0,0), (-1,-1), 3.2),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
        ("RIGHTPADDING", (0,0), (-1,-1), 6),
    ]))
    return t


def courses_table(rows):
    """3-kolumn: datum (blå) | namn | arrangör (grå, höger)."""
    w0, w2 = CW*0.16, CW*0.26
    data = [[Paragraph(a, st_period), Paragraph(b, st_body), Paragraph(c, st_org)]
            for a, b, c in rows]
    t = Table(data, colWidths=[w0, CW-w0-w2, w2])
    t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, ZEBRA]),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TOPPADDING", (0,0), (-1,-1), 3.0),
        ("BOTTOMPADDING", (0,0), (-1,-1), 3.0),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
        ("RIGHTPADDING", (0,0), (-1,-1), 6),
    ]))
    return t


def project_card(p):
    """Projektkort: blå vänsterkant + ljusblå botten."""
    inner = []
    title = '<font color="#1F4E96"><b>%s</b></font>&nbsp;&nbsp;·&nbsp;&nbsp;%s' % (
        p["period"], p["name"])
    inner.append(Paragraph(title, st_ptitle))
    inner.append(Paragraph("Beställare: %s" % p.get("client", ""), st_pben))
    inner.append(Spacer(1, 1.5))
    inner.append(Paragraph(p.get("desc", ""), st_pdesc))
    inner.append(Spacer(1, 1.5))
    facts = " &nbsp;·&nbsp; ".join(s.strip() for s in p.get("facts", "").split("·"))
    inner.append(Paragraph(facts, st_pfacts))
    t = Table([[inner]], colWidths=[CW])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), CARD),
        ("LINEBEFORE", (0,0), (0,-1), 3, BLUE),
        ("TOPPADDING", (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING", (0,0), (-1,-1), 9),
        ("RIGHTPADDING", (0,0), (-1,-1), 9),
    ]))
    return KeepTogether([t, Spacer(1, 5)])


def header_flowables(cv):
    c = cv["contact"]
    contact = "%s<br/>%s<br/>%s" % (c["email"], c["phone"], c["web"])
    logo = Image(LOGO)
    # skala logo till ~46mm bredd, bevara aspekt
    iw, ih = logo.imageWidth, logo.imageHeight
    target = 46*mm
    logo.drawWidth = target
    logo.drawHeight = ih * (target/iw)
    head = Table([[logo, Paragraph(contact, st_contact)]],
                 colWidths=[CW*0.55, CW*0.45])
    head.setStyle(TableStyle([
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("LEFTPADDING", (0,0), (-1,-1), 0),
        ("RIGHTPADDING", (0,0), (-1,-1), 0),
        ("TOPPADDING", (0,0), (-1,-1), 0),
        ("BOTTOMPADDING", (0,0), (-1,-1), 0),
    ]))
    f = cv["pdfFacts"]
    facts = ('<b>Födelseår:</b> %s &nbsp;|&nbsp; <b>Språk:</b> %s &nbsp;|&nbsp; '
             '<b>Nuvarande:</b> %s') % (f["born"], f["languages"], f["current"])
    return [
        head,
        Spacer(1, 4),
        HRFlowable(width="100%", thickness=0.8, color=RULE, spaceAfter=8),
        Paragraph(cv["name"].upper(), st_name),
        Spacer(1, 1),
        Paragraph(cv["pdfTitleLine"], st_sub),
        Spacer(1, 5),
        Paragraph(facts, st_facts),
    ]


def footer(canvas, doc):
    canvas.saveState()
    y = 11*mm
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.6)
    canvas.line(LM, y+4, PW-RM, y+4)
    canvas.setFont("Helvetica", 7.3)
    canvas.setFillColor(GRAY)
    canvas.drawString(LM, y-3,
        "AD Byggprojekt Stockholm AB   ·   org.nr 559131-8695   ·   adbyggprojekt.se")
    canvas.drawRightString(PW-RM, y-3, "Sida %d" % doc.page)
    canvas.restoreState()


def build(out_path):
    cv = json.load(open(DATA, encoding="utf-8"))
    doc = BaseDocTemplate(out_path, pagesize=A4,
                          leftMargin=LM, rightMargin=RM, topMargin=TM, bottomMargin=BM,
                          title="CV – Andreas Dahlgren", author="AD Byggprojekt")
    frame = Frame(LM, BM, CW, PH-TM-BM, id="main",
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="cv", frames=[frame], onPage=footer)])

    story = []
    story += header_flowables(cv)

    story.append(section("Arbetslivserfarenhet"))
    story.append(two_col_table([
        (e["period"], '%s &mdash; <font color="#7C8794">%s</font>' % (e["role"], e["company"]))
        for e in cv["experience"]]))

    story.append(section("Utbildning"))
    story.append(two_col_table([
        (e["period"], '%s &mdash; <font color="#7C8794">%s</font>' % (e["title"], e["school"]))
        for e in cv["education"]]))

    story.append(section("Kurser & certifieringar (urval)"))
    story.append(courses_table([
        (c["date"], c["name"], c["organizer"]) for c in cv["courses"]]))

    story.append(section("Utvalda uppdrag"))
    for p in cv["projects"]:
        story.append(project_card(p))

    doc.build(story)
    return out_path


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(ROOT, "public", "cv-andreas-dahlgren.pdf"))
    args = ap.parse_args()
    path = build(args.out)
    print("Skrev", path)
