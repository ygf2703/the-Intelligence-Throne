"""Import the private Word manuscript into the local reading cache.

The source DOCX and generated JSON remain outside Git. Only the import logic is
versioned. Run this script whenever the literary master changes.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from docx import Document


UNITS = {
    "מעבר לסף": "beyond-the-threshold",
    "המושב הריק": "chapter-1",
    "האדריכל הראשון": "chapter-2",
    "האינדקס הזהוב": "chapter-3",
    "הקונקורדט": "chapter-4",
    "חשבון המזרח": "chapter-5",
    "בתי היציקה": "chapter-6",
    "המארג נפתח": "chapter-7",
    "אות למכירה": "chapter-8",
    "צמתים ריבוניים": "chapter-9",
    "הממסר": "chapter-10",
    "עיר שנקנתה לפני עלות השחר": "chapter-11",
    "הסוכן הראשון": "chapter-12",
    "הצבא שאינו ישן": "chapter-13",
    "השערים הזהובים": "chapter-14",
    "מחיר הנאמנות": "chapter-15",
    "מעבר למעטפת": "chapter-16",
    "המתים אינם עושים Prompt": "chapter-17",
    "הסכין הזהובה": "chapter-18",
    "נפילת עיר ענן": "chapter-19",
    "המבחן האחרון": "chapter-20",
    "שבעה אויבים": "chapter-21",
    "האמנה": "chapter-22",
    "מחיר הבטיחות": "chapter-23",
    "שרפו את הכס": "chapter-24",
    "עולם של תודעות רבות": "chapter-25",
    "הסמן בחשכה": "cursor-in-the-dark",
}


def build_cache(source: Path) -> dict[str, object]:
    document = Document(source)
    units: dict[str, dict[str, object]] = {}
    active_slug: str | None = None

    for paragraph in document.paragraphs:
        text = paragraph.text.strip()
        if not text:
            continue
        if paragraph.style.name == "Heading 2" and text in UNITS:
            active_slug = UNITS[text]
            units[active_slug] = {"title": text, "paragraphs": []}
            continue
        if paragraph.style.name == "Heading 1":
            active_slug = None
            continue
        if active_slug is not None:
            paragraphs = units[active_slug]["paragraphs"]
            assert isinstance(paragraphs, list)
            paragraphs.append(text)

    missing = set(UNITS.values()) - set(units)
    if missing:
        raise ValueError(f"Missing manuscript units: {', '.join(sorted(missing))}")

    return {
        "source": source.name,
        "units": units,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Import the private manuscript into a local reader cache.")
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=Path("content/private/book-he.json"))
    args = parser.parse_args()

    cache = build_cache(args.source)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(cache, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Imported {len(cache['units'])} units to {args.output}")


if __name__ == "__main__":
    main()
