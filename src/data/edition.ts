import { bookUnits, type BookUnit } from "@/data/book";

/**
 * Full Hebrew edition is approved for public reading.
 * Publishing statuses remain in the data model so staged releases can be restored later.
 */
export const completeEdition = {
  enabled: true,
  pdfPath: "/downloads/the-intelligence-throne-a5.pdf",
} as const;

export function readableUnits(): BookUnit[] {
  return completeEdition.enabled ? bookUnits : bookUnits.filter((unit) => unit.status === "published");
}

export function isReadableUnit(unit: BookUnit): boolean {
  return completeEdition.enabled || unit.status === "published";
}
