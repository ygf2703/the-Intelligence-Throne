import { readFile } from "node:fs/promises";
import path from "node:path";

type ImportedUnit = { title: string; paragraphs: string[] };
type ImportedBook = { source: string; units: Record<string, ImportedUnit> };

async function readBook(filePath: string): Promise<ImportedBook | null> {
  try {
    const source = await readFile(filePath, "utf8");
    return JSON.parse(source) as ImportedBook;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function getReaderContent(slug: string, locale: "he" | "en"): Promise<ImportedUnit | null> {
  const candidates = locale === "he"
    ? [
        path.join(process.cwd(), "content", "published", "book-he.json"),
        path.join(process.cwd(), "content", "private", "book-he.json"),
      ]
    : [path.join(process.cwd(), "content", "private", "book-en.json")];

  for (const filePath of candidates) {
    const book = await readBook(filePath);
    const unit = book?.units[slug];
    if (unit) return unit;
  }

  return null;
}
