import { bookUnits, type BookUnit } from "@/data/book";

/**
 * Publishing switch for the complete edition.
 * Keep this false until the author explicitly approves release of the full manuscript.
 */
export const completeEdition = {
  enabled: false,
  pdfPath: "/downloads/the-intelligence-throne-a5.pdf",
} as const;

export function readableUnits(): BookUnit[] {
  return completeEdition.enabled ? bookUnits : bookUnits.filter((unit) => unit.status === "published");
}

export function isReadableUnit(unit: BookUnit): boolean {
  return completeEdition.enabled || unit.status === "published";
}
