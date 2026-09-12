export type PublicationStatus =
  | "draft"
  | "review"
  | "approved"
  | "scheduled"
  | "published"
  | "archived";

export interface Chapter {
  id: string;
  partNumber: number | null;
  chapterNumber: number | null;
  slug: string;
  titleHe: string;
  titleEn: string | null;
  contentHe: string;
  contentEn: string | null;
  status: PublicationStatus;
  publishedAt: string | null;
  visibleReleaseDate: boolean;
  version: number;
}
