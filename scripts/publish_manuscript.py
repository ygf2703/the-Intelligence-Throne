#!/usr/bin/env python3
"""Publish the approved Hebrew manuscript into the website reader format.

Usage:
  python scripts/publish_manuscript.py
  python scripts/publish_manuscript.py --source _private/source/master-manuscript-v3.docx
"""

from __future__ import annotations

import argparse
import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
NS = {"w": W}
SLUGS = ["beyond-the-threshold", *[f"chapter-{i}" for i in range(1, 26)], "cursor-in-the-dark"]


def attr(name: str) -> str:
    return f"{{{W}}}{name}"


def load_paragraphs(docx_path: Path) -> list[tuple[str, str]]:
    with zipfile.ZipFile(docx_path) as archive:
        styles_root = ET.fromstring(archive.read("word/styles.xml"))
        document_root = ET.fromstring(archive.read("word/document.xml"))

    style_names: dict[str, str] = {}
    for style in styles_root.findall(".//w:style", NS):
        style_id = style.get(attr("styleId"), "")
        name = style.find("w:name", NS)
        if name is not None:
            style_names[style_id] = name.get(attr("val"), "")

    paragraphs: list[tuple[str, str]] = []
    for paragraph in document_root.findall(".//w:body/w:p", NS):
        text = "".join(node.text or "" for node in paragraph.findall(".//w:t", NS)).strip()
        pstyle = paragraph.find("w:pPr/w:pStyle", NS)
        style_id = pstyle.get(attr("val"), "") if pstyle is not None else ""
        style_name = style_names.get(style_id, style_id).lower()
        paragraphs.append((style_name, text))

    return paragraphs


def build_book(paragraphs: list[tuple[str, str]]) -> dict:
    starts = [(index, text) for index, (style, text) in enumerate(paragraphs) if style == "heading 2"]
    if len(starts) != 27:
        raise RuntimeError(f"Expected 27 reading units, found {len(starts)} Heading 2 entries.")

    units: dict[str, dict] = {}
    for unit_index, (start, title) in enumerate(starts):
        end = starts[unit_index + 1][0] if unit_index + 1 < len(starts) else len(paragraphs)
        body: list[str] = []

        for style, text in paragraphs[start + 1 : end]:
            if not text:
                continue
            if style == "heading 1":
                continue
            if re.fullmatch(r"פרק\s+\d+", text):
                continue
            if text.startswith("THE ") and text.upper() == text and len(text.split()) <= 8:
                continue
            body.append(text)

        units[SLUGS[unit_index]] = {"title": title, "paragraphs": body}

    return {
        "source": "Master Manuscript V3 — World Rebuild Edition",
        "units": units,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", default="_private/source/master-manuscript-v3.docx")
    parser.add_argument("--output", default="content/published/book-he.json")
    args = parser.parse_args()

    source = Path(args.source)
    output = Path(args.output)
    if not source.exists():
        raise SystemExit(f"Source manuscript not found: {source}")

    book = build_book(load_paragraphs(source))
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(book, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    word_count = sum(
        len(paragraph.split())
        for unit in book["units"].values()
        for paragraph in unit["paragraphs"]
    )
    print(f"Published {len(book['units'])} reading units / {word_count:,} words -> {output}")


if __name__ == "__main__":
    main()
