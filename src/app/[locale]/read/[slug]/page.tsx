import Link from "next/link";
import { notFound } from "next/navigation";
import { NexusPulse } from "@/components/nexus-experience";
import { ReaderSignature } from "@/components/reader-signature";
import { ReaderControls } from "@/components/reader-controls";
import { bookUnits } from "@/data/book";
import { isReadableUnit } from "@/data/edition";
import { getReaderContent } from "@/lib/reader-content";

export default async function ChapterPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (locale !== "he" && locale !== "en") notFound();
  const he = locale === "he";
  const unit = bookUnits.find((item) => item.slug === slug);
  if (!unit || !isReadableUnit(unit)) notFound();
  const content = await getReaderContent(slug, locale);
  const current = bookUnits.findIndex((item) => item.slug === slug);
  const next = bookUnits.slice(current + 1).find((item) => item.status === "published");

  if (!content) {
    return <main className="reader-page" dir={he ? "rtl" : "ltr"}><header><Link href={`/${locale}/book`}>{he ? "← חזרה לספר" : "Back to the book →"}</Link></header><article className="reader-copy"><span>{he ? "מהדורה בתהליך" : "EDITION IN PROGRESS"}</span><h1>{he ? unit.titleHe : unit.titleEn}</h1><div className="reader-rule" /><p>{he ? "המהדורה הספרותית באנגלית של יחידת קריאה זו עדיין אינה זמינה. לא נציג כאן תרגום אוטומטי במקום תרגום ערוך." : "The literary English edition of this reading unit is not available yet. This platform will not substitute machine translation for an edited literary translation."}</p></article></main>;
  }

  return <main className="reader-page" dir={he ? "rtl" : "ltr"}><header><Link href={`/${locale}/book`}>{he ? "← חזרה לספר" : "Back to the book →"}</Link><ReaderControls slug={slug} locale={locale} /></header><article className="reader-copy"><span>{unit.kind === "prologue" ? (he ? "פרולוג" : "PROLOGUE") : `${he ? "פרק" : "CHAPTER"} ${unit.number}`}</span><h1>{he ? unit.titleHe : unit.titleEn}</h1><div className="reader-rule" />{content.paragraphs.map((paragraph, index) => <p key={`${slug}-${index}`}>{paragraph}</p>)}</article><NexusPulse slug={slug} locale={locale} /><ReaderSignature locale={locale} /><nav className="reader-nav">{next ? <Link href={`/${locale}/read/${next.slug}`}>{he ? "ליחידה הבאה ←" : "Next unit →"}</Link> : <Link href={`/${locale}/book`}>{he ? "חזרה למדף הספר" : "Back to the shelf →"}</Link>}</nav></main>;
}
