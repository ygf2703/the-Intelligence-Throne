import Link from "next/link";
import { notFound } from "next/navigation";
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
  const next = bookUnits[current + 1] ?? null;

  if (!content) {
    return <main className="reader-page" dir={he ? "rtl" : "ltr"}><header><Link href={`/${locale}/book`}>{he ? "← חזרה לספר" : "Back to the book →"}</Link></header><article className="reader-copy"><span>{he ? "מהדורה בתהליך" : "EDITION IN PROGRESS"}</span><h1>{he ? unit.titleHe : unit.titleEn}</h1><div className="reader-rule" /><p>{he ? "יחידת הקריאה אינה זמינה כרגע. נסה שוב לאחר רענון המהדורה." : "The edited literary English edition of this reading unit is not available yet. This platform will not substitute machine translation for an edited literary translation."}</p></article></main>;
  }

  return <main className="reader-page" dir={he ? "rtl" : "ltr"}><header><Link href={`/${locale}/book`}>{he ? "← חזרה לספר" : "Back to the book →"}</Link><ReaderControls slug={slug} locale={locale} /></header><article className="reader-copy"><span>{unit.kind === "prologue" ? (he ? "פרולוג" : "PROLOGUE") : unit.kind === "epilogue" ? (he ? "אפילוג" : "EPILOGUE") : `${he ? "פרק" : "CHAPTER"} ${unit.number}`}</span><h1>{he ? unit.titleHe : unit.titleEn}</h1><div className="reader-rule" />{content.paragraphs.map((paragraph, index) => <p key={`${slug}-${index}`}>{paragraph}</p>)}</article><section className="reader-next"><span>{next ? (he ? "המשך הקריאה" : "CONTINUE READING") : (he ? "סוף הספר" : "THE END")}</span><h2>{next ? (he ? "הסיפור ממשיך." : "The story continues.") : (he ? "הגעת לסוף כס התבונה." : "You reached the end of The Intelligence Throne.")}</h2><p>{next ? (he ? "המשך ישירות ליחידה הבאה, בלי לצאת מהעולם." : "Continue straight to the next reading unit, without leaving the world.") : (he ? "אפשר לחזור למדף, לעולם ולדמויות — ובקרוב גם לסרטונים הקצרים של כל פרק." : "Return to the book, the realm, and the characters — with chapter videos coming next.")}</p>{next ? <Link className="button primary" href={`/${locale}/read/${next.slug}`}>{he ? "המשך לקרוא" : "Continue reading"}</Link> : <Link className="button secondary" href={`/${locale}/book`}>{he ? "חזרה לספר" : "Back to the book"}</Link>}</section></main>;
}
