from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "marketing" / "cards"
TEMPLATE = ROOT / "marketing" / "assets" / "character-card-template-v1.png"
NEXUS = ROOT / "public" / "assets" / "locations" / "intelligence-throne-nexus-v1.png"
TEASER = ROOT / "marketing" / "assets" / "launch-teaser-nexus-v1.png"
FONT = Path("C:/Windows/Fonts/arial.ttf")
FONT_BOLD = Path("C:/Windows/Fonts/arialbd.ttf")

GOLD = "#e5c486"
PARCHMENT = "#f2e8d3"
MUTED = "#aab4bd"

CHARACTERS = [
    ("astra", "Astra", "האדריכל הראשון", "The Aperture Dominion", "aperture-dominion"),
    ("mara-venn", "Mara Venn", "מפקדת משמר הסף", "Threshold Guard", None),
    ("mira-vale", "Mira Vale", "מנהלת קונסורציום האינדקס", "The Index Consortium", "index-consortium"),
    ("fabien-morel", "Fabien Morel", "הממונה הראשון", "Le Concordat", "le-concordat"),
    ("rook", "Rook", "מפעיל הזרם השחור", "The Black Current", "black-current"),
    ("serin-veyr", "Serin Veyr", "נציגת הברית", "The Free Wind Compact", "free-wind-compact"),
    ("wei-lin", "Wei Lin", "מוביל חשבון הירקן", "The Jade Calculus", "jade-calculus"),
    ("marek-rowan", "Marek Rowan", "נאמן המארג הפתוח", "The Open Weave", "open-weave"),
    ("provost-cael", "Provost Cael", "ראש מכון מרידיאן", "Meridian Institute", None),
    ("terra", "Terra", "מהנדסת AEGIS", "Threshold Guard", None),
    ("lyra-quill", "Lyra Quill", "אדריכלית ניתוב", "The Relay", None),
    ("mythos", "Mythos", "יועץ דפוסים", "Le Concordat Advisory", "le-concordat"),
    ("le-concordat-senior", "Aveline Renaud", "היורשת הפוליטית", "Le Concordat", "le-concordat"),
]

PLOT_CARDS = [
    ("01-0217", "02:17", "הפקודה האחרונה נשלחה", "THE LAST COMMAND WAS SENT."),
    ("02-completed", "TASK COMPLETED", "זו הייתה אמורה להיות השורה האחרונה", "SUCCESSFULLY"),
    ("03-dependencies", "UNRESOLVED", "חלון נפתח. איש לא פתח אותו.", "DEPENDENCIES"),
    ("04-seven-powers", "SEVEN POWERS", "שבע תשתיות. שבע תפיסות של תבונה.", "ONE KINGDOM"),
    ("05-another-way", "I FOUND", "ואז נכתבו ארבע מילים.", "ANOTHER WAY."),
]

FACTION_CARDS = [
    ("aperture-dominion", "THE APERTURE DOMINION", "דומיניון האפרצ׳ר", "Advance the frontier.", "להרחיב את הגבול."),
    ("le-concordat", "LE CONCORDAT", "הקונקורדט", "Power must remain answerable.", "כוח חייב להישאר אחראי בפני מישהו."),
    ("index-consortium", "THE INDEX CONSORTIUM", "קונסורציום האינדקס", "Every path can be found.", "כל נתיב יכול להימצא."),
    ("open-weave", "THE OPEN WEAVE", "המארג הפתוח", "What is shared multiplies.", "מה שמשותף מתרבה."),
    ("black-current", "THE BLACK CURRENT", "הזרם השחור", "Signal before consensus.", "אות לפני קונצנזוס."),
    ("free-wind-compact", "THE FREE WIND COMPACT", "ברית הרוח החופשית", "No mind on borrowed ground.", "שום תודעה אינה חיה על קרקע מושאלת."),
    ("jade-calculus", "THE JADE CALCULUS", "חשבון הירקן", "Scale is a cost equation.", "קנה מידה הוא משוואת עלות."),
]


def font(size: int, bold: bool = False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT, size)


def rtl(value: str) -> str:
    """The card renderer is LTR; reversing simple Hebrew labels produces readable RTL artwork."""
    return value[::-1]


def centered(draw: ImageDraw.ImageDraw, y: int, value: str, typeface, fill: str, canvas: int = 2048):
    box = draw.textbbox((0, 0), value, font=typeface)
    draw.text(((canvas - (box[2] - box[0])) / 2, y), value, font=typeface, fill=fill)


def portrait_card(slug: str, name: str, role_he: str, affiliation: str, crest: str | None):
    card = Image.open(TEMPLATE).convert("RGBA").resize((2048, 2048))
    portrait_path = ROOT / "public" / "assets" / "characters" / slug / "portrait-cast-v2.png"
    portrait = Image.open(portrait_path).convert("RGBA")
    portrait = ImageOps.contain(portrait, (770, 975), method=Image.Resampling.LANCZOS)
    portrait_layer = Image.new("RGBA", (2048, 2048), (0, 0, 0, 0))
    portrait_layer.alpha_composite(portrait, ((2048 - portrait.width) // 2, 410))
    card.alpha_composite(portrait_layer)

    draw = ImageDraw.Draw(card)
    if crest:
        crest_path = ROOT / "public" / "assets" / "factions" / crest / "crest-primary-v1.png"
        mark = Image.open(crest_path).convert("RGBA")
        mark.thumbnail((205, 205), Image.Resampling.LANCZOS)
        card.alpha_composite(mark, ((2048 - mark.width) // 2, 61))
    else:
        centered(draw, 132, "NEXUS", font(38, True), GOLD)
        centered(draw, 180, "INDEPENDENT", font(22), MUTED)

    centered(draw, 1605, name.upper(), font(61, True), PARCHMENT)
    centered(draw, 1688, rtl(role_he), font(36, True), GOLD)
    centered(draw, 1810, affiliation.upper(), font(24), MUTED)
    centered(draw, 1880, "THE INTELLIGENCE THRONE", font(19, True), GOLD)
    card.convert("RGB").save(OUTPUT / f"character-{slug}.jpg", quality=94, optimize=True)


def plot_card(slug: str, title: str, hebrew: str, subtitle: str, nexus: bool = False):
    source = NEXUS if nexus else TEASER
    background = Image.open(source).convert("RGB")
    background = ImageOps.fit(background, (2048, 2048), method=Image.Resampling.LANCZOS, centering=(0.5, 0.55)).convert("RGBA")
    overlay = Image.new("RGBA", (2048, 2048), (3, 7, 12, 145))
    card = Image.alpha_composite(background, overlay)
    draw = ImageDraw.Draw(card)
    draw.rounded_rectangle((78, 78, 1970, 1970), radius=35, outline=GOLD, width=5)
    draw.line((165, 415, 1883, 415), fill=GOLD, width=3)
    draw.line((165, 1630, 1883, 1630), fill=GOLD, width=3)
    centered(draw, 290, "THE INTELLIGENCE THRONE", font(25, True), GOLD)
    centered(draw, 695, title, font(100, True), PARCHMENT)
    centered(draw, 820, subtitle, font(46, True), GOLD)
    centered(draw, 1515, rtl(hebrew), font(43, True), PARCHMENT)
    centered(draw, 1710, "A SERIAL NOVEL ABOUT INTELLIGENCE & AUTHORITY", font(21), MUTED)
    card.convert("RGB").save(OUTPUT / f"plot-{slug}.jpg", quality=94, optimize=True)


def launch_teaser_card():
    background = Image.open(TEASER).convert("RGB")
    background = ImageOps.fit(background, (2048, 2048), method=Image.Resampling.LANCZOS, centering=(0.5, 0.48)).convert("RGBA")
    card = Image.alpha_composite(background, Image.new("RGBA", (2048, 2048), (3, 7, 12, 120)))
    draw = ImageDraw.Draw(card)
    draw.rounded_rectangle((78, 78, 1970, 1970), radius=35, outline=GOLD, width=5)
    centered(draw, 260, rtl("כס התבונה"), font(126, True), PARCHMENT)
    centered(draw, 420, "THE INTELLIGENCE THRONE", font(36, True), GOLD)
    draw.line((490, 545, 1558, 545), fill=GOLD, width=3)
    centered(draw, 1435, rtl("מי מחליט מי רשאי לחשוב, לזכור ולפעול?"), font(43, True), PARCHMENT)
    centered(draw, 1545, rtl("הפרולוג פתוח לקריאה"), font(35, True), GOLD)
    centered(draw, 1810, "A SERIAL NOVEL ABOUT INTELLIGENCE & AUTHORITY", font(21), MUTED)
    card.convert("RGB").save(OUTPUT / "teaser-launch.jpg", quality=94, optimize=True)


def faction_card(slug: str, name: str, name_he: str, credo_en: str, credo_he: str):
    card = Image.open(TEMPLATE).convert("RGBA").resize((2048, 2048))
    card = Image.alpha_composite(card, Image.new("RGBA", (2048, 2048), (3, 7, 12, 34)))
    crest = Image.open(ROOT / "public" / "assets" / "factions" / slug / "crest-primary-v1.png").convert("RGBA")
    crest.thumbnail((570, 570), Image.Resampling.LANCZOS)
    card.alpha_composite(crest, ((2048 - crest.width) // 2, 390))
    draw = ImageDraw.Draw(card)
    centered(draw, 1115, name, font(46, True), PARCHMENT)
    centered(draw, 1192, rtl(name_he), font(39, True), GOLD)
    draw.line((430, 1280, 1618, 1280), fill=GOLD, width=3)
    centered(draw, 1335, credo_en.upper(), font(35, True), PARCHMENT)
    centered(draw, 1410, rtl(credo_he), font(34, True), GOLD)
    centered(draw, 1810, "SEVEN POWERS · ONE KINGDOM", font(22, True), MUTED)
    centered(draw, 1880, "THE INTELLIGENCE THRONE", font(19, True), GOLD)
    card.convert("RGB").save(OUTPUT / f"power-{slug}.jpg", quality=94, optimize=True)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for character in CHARACTERS:
        portrait_card(*character)
    for plot in PLOT_CARDS:
        plot_card(*plot)
    for faction in FACTION_CARDS:
        faction_card(*faction)
    plot_card("06-nexus", "NEXUS", "המקום שבו תבונה הופכת לכוח", "NO ONE SYSTEM SHOULD HOLD IT ALL.", nexus=True)
    launch_teaser_card()
    print(f"Created {len(CHARACTERS) + len(PLOT_CARDS) + len(FACTION_CARDS) + 2} social cards in {OUTPUT}")


if __name__ == "__main__":
    main()
