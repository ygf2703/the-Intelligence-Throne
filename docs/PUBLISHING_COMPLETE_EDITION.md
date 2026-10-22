# Complete edition publishing

The Hebrew edition is approved to be fully readable.

## Reader state
- Prologue: published
- Chapters 1–25: published
- Epilogue: published
- Continuous reading route: enabled
- The publishing status model remains in place so staged release can be restored later.

## Manuscript source
The canonical Word manuscript remains private and must not be committed.

Generate the public reader payload locally:

```bash
python scripts/publish_manuscript.py
```

Default source:
`_private/source/master-manuscript-v3.docx`

Generated public file:
`content/published/book-he.json`

The generated JSON is the public web edition. Review it before committing because it contains the complete novel text.

## English
English routes remain structurally available, but no machine translation is published. A literary English edition should be imported only after it is approved.
