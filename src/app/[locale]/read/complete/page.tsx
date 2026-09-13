import Link from "next/link";
import { notFound } from "next/navigation";
import { readableUnits } from "@/data/edition";
import { getReaderContent } from "@/lib/reader-content";

export default async function CompleteReaderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "he" && locale !== "en") notFound();
  const he = locale === "he";
  const units = await Promise.all(readableUnits().map(async (unit) => ({ unit, content: await getReaderContent(unit.slug, locale) })));
  const readable = units.filter((entry): entry is typeof entry & { content: NonNullable<typeof entry.content> } => entry.content !== null);

  return <main className="reader-page continuous-reader" dir={he ? "rtl" : "ltr"}><header><Link href={`/${locale}/book`}>{he ? "← חזרה לספר" : "Back to the book →"}</Link></header><article className="reader-copy"><span>{he ? "קריאה רציפה" : "CONTINUOUS READING"}</span><h1>{he ? "כס התבונה" : "The Intelligence Throne"}</h1><p className="reader-subtitle">{he ? "המהדורה הזמינה לקריאה כעת" : "The edition currently available to read"}</p>{readable.map(({ unit, content }) => <section className="continuous-unit" key={unit.slug}><div className="reader-rule" /><span>{unit.kind === "prologue" ? (he ? "פרולוג" : "PROLOGUE") : `${he ? "פרק" : "CHAPTER"} ${unit.number}`}</span><h2>{he ? unit.titleHe : unit.titleEn}</h2>{content.paragraphs.map((paragraph, index) => <p key={`${unit.slug}-${index}`}>{paragraph}</p>)}</section>)}</article></main>;
}
