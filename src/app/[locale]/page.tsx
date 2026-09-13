import Image from "next/image";
import Link from "next/link";
import styles from "./hero-video.module.css";
import { CharacterPreview, ChapterShelf, KnowledgeMap, PowerStrip, SiteHeader } from "@/components/home-sections";
import { HouseSelection } from "@/components/nexus-experience";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const he = locale === "he";

  return (
    <main className="site-page" dir={he ? "rtl" : "ltr"}>
      <SiteHeader locale={locale} />
      <section className="hero">
        <video className={styles.video} autoPlay muted loop playsInline preload="metadata" poster="/assets/media/nexus-signal-poster-v1.png" aria-hidden="true">
          <source src="/assets/media/nexus-signal-teaser-v1.mp4" type="video/mp4" />
        </video>
        <div className={styles.scrim} aria-hidden="true" />
        <div className="hero-grid">
          <div>
            <span className="eyebrow">A SERIAL NOVEL ABOUT INTELLIGENCE &amp; AUTHORITY</span>
            <h1><span className="hero-title-he">כס התבונה</span><span className="hero-title-en">THE INTELLIGENCE THRONE</span></h1>
            <p className="hero-manifesto">{he ? "בעולם שבו התבונה הפכה לתשתית, השאלה כבר איננה מי חושב הכי טוב — אלא מי מחליט מי רשאי לחשוב, לזכור ולפעול." : "In a world where intelligence became infrastructure, the question is no longer who thinks best — but who decides who may think, remember, and act."}</p>
            <div className="hero-actions"><Link className="button primary" href={`/${locale}/read/beyond-the-threshold`}>{he ? "התחל לקרוא" : "Start reading"}</Link><Link className="button secondary" href={`/${locale}/realm`}>{he ? "גלה את העולם" : "Explore the realm"}</Link></div>
            <div className="hero-meta"><div><strong>03</strong><span>{he ? "יחידות פתוחות" : "Available now"}</span></div><div><strong>27</strong><span>{he ? "יחידות בספר" : "Story units"}</span></div><div><strong>07</strong><span>{he ? "בתים" : "Houses"}</span></div></div>
          </div>
          <aside className="release-panel" aria-label={he ? "Astra — האדריכל הראשון" : "Astra — The First Architect"}>
            <div className="release-art release-character-art"><Image src="/assets/characters/astra/portrait-primary-v1.png" alt="Astra" fill priority sizes="(max-width: 1050px) 100vw, 34rem" /><span>THE APERTURE DOMINION</span><em>{he ? "Astra · האדריכל הראשון" : "Astra · The First Architect"}</em></div>
            <div className="release-info"><span>{he ? "האדריכל הראשון" : "THE FIRST ARCHITECT"}</span><h2>{he ? "לא כוח אחד. שבע תפיסות של תבונה." : "Not one power. Seven ideas of intelligence."}</h2><p>{he ? "היכנס אל הבתים, הסמלים והאנשים שמחזיקים את העתיד בידיים שלהם." : "Enter the houses, symbols, and people holding the future in their hands."}</p><Link className="text-link" href={`/${locale}/characters`}>{he ? "פגוש את הדמויות ←" : "Meet the characters →"}</Link></div>
          </aside>
        </div>
      </section>
      <HouseSelection locale={locale} />
      <KnowledgeMap locale={locale} />
      <div className="manifesto-band"><span>PEOPLE</span><i /><span>IDEAS</span><i /><span>SYSTEMS</span><i /><span>WORLDS</span><i /><span>WHAT COMES NEXT</span></div>
      <CharacterPreview he={he} />
      <PowerStrip he={he} />
      <ChapterShelf locale={locale} />
      <section className="newsletter section-shell"><div><span className="section-kicker">NEXT RELEASE</span><h2>{he ? "כשהפרק הבא נפתח — תהיה הראשון לדעת." : "When the next chapter opens, be the first to know."}</h2><p>{he ? "בלי ניוזלטר שבועי. רק הודעה כשיש משהו חדש לקרוא." : "No weekly newsletter. Just a note when there is something new to read."}</p></div><form className="signup-form"><input type="email" inputMode="email" placeholder={he ? "כתובת אימייל" : "Email address"} aria-label={he ? "כתובת אימייל" : "Email address"} /><button type="button">{he ? "שלחו לי את הפרק הבא" : "Send me the next chapter"}</button></form></section>
      <footer className="site-footer"><div><strong>כס התבונה</strong><span>THE INTELLIGENCE THRONE</span></div><p>Different minds. A shared tomorrow.</p><time dateTime="2026">© 2026</time></footer>
    </main>
  );
}
