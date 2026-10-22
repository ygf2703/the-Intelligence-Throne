import Link from "next/link";
import { bookUnits, parts } from "@/data/book";

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const he = locale === "he";
  return <main className="book-page" dir={he ? "rtl" : "ltr"}>
    <header className="book-header"><Link href={`/${locale}`}>כס התבונה <span>THE INTELLIGENCE THRONE</span></Link><Link href={`/${locale}/read/beyond-the-threshold`}>{he ? "התחל לקרוא" : "Start reading"}</Link></header>
    <section className="book-intro"><span>THE BOOK</span><h1>{he ? "הספר המלא פתוח לקריאה." : "The complete book is open for reading."}</h1><p>{he ? "הפרולוג, 25 הפרקים והאפילוג זמינים כעת ברצף מלא." : "The prologue, all 25 chapters, and the epilogue are now available."}</p><Link className="button primary" href={`/${locale}/read/complete`}>{he ? "קריאה רציפה של הספר" : "Read the complete edition"}</Link></section>
    {parts.map((part, index) => <section className="part-shelf" key={part}><div className="part-label"><span>PART {index + 1}</span><h2>{part}</h2></div><div className="unit-list">{bookUnits.filter((unit) => unit.part === index + 1).map((unit) => <article className="unit published" key={unit.slug}><div className="unit-number">{unit.kind === "prologue" ? "00" : unit.kind === "epilogue" ? "EP" : String(unit.number).padStart(2, "0")}</div><div><span>{he ? "פתוח לקריאה" : "Available"}</span><h3>{he ? unit.titleHe : unit.titleEn}</h3><p>{he ? unit.titleEn : unit.titleHe}</p></div><Link href={`/${locale}/read/${unit.slug}`}>{he ? "קרא" : "Read"}</Link></article>)}</div></section>)}
  </main>;
}
