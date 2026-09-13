import { readFile } from "node:fs/promises";
import path from "node:path";

type ImportedUnit = { title: string; paragraphs: string[] };
type ImportedBook = { source: string; units: Record<string, ImportedUnit> };

const manuscriptPath = path.join(process.cwd(), "content", "private", "book-he.json");

export async function getReaderContent(slug: string): Promise<ImportedUnit | null> {
  try {
    const source = await readFile(manuscriptPath, "utf8");
    const book = JSON.parse(source) as ImportedBook;
    return book.units[slug] ?? null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
