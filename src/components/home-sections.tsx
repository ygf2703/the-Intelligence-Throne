import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { chapters } from "@/data/home";
import { factions, realmCharacters } from "@/data/realm";
import { DossierMap } from "@/components/nexus-experience";

export function SiteHeader({ locale }: { locale: string }) {
  const he = locale === "he";
  const prefix = `/${locale}`;
  return <header className="site-header"><Link className="brand-lockup" href={prefix}><span className="brand-he">כס התבונה</span><span className="brand-en">THE INTELLIGENCE THRONE</span></Link><nav className="main-nav" aria-label={he ? "ניווט ראשי" : "Main navigation"}><Link href={`${prefix}/book`}>{he ? "הספר" : "The Book"}</Link><Link href={`${prefix}/realm`}>{he ? "העולם" : "The Realm"}</Link><Link href={`${prefix}/characters`}>{he ? "דמויות" : "Characters"}</Link></nav><div className="header-actions"><Link className="locale-switch" href={he ? "/en" : "/he"}>{he ? "EN" : "HE"}</Link><Link className="button primary small" href={`${prefix}/read/beyond-the-threshold`}>{he ? "התחל לקרוא" : "Start reading"}</Link></div></header>;
}

export function ChapterShelf({ locale }: { locale: string }) {
  const he = locale === "he";
  return <section className="section-shell" aria-labelledby="chapters-title"><span className="section-kicker">SERIAL RELEASE</span><div className="section-heading"><div><h2 id="chapters-title">{he ? "הספר נפתח פרק אחר פרק" : "The book opens one chapter at a time"}</h2><p>{he ? "כל הספר כבר קיים במערכת. רק פרקים שאושרו נפתחים לקוראים." : "The complete manuscript lives in the system. Only approved chapters are released."}</p></div><Link className="text-link" href={`/${locale}/book`}>{he ? "לכל הפרקים ←" : "View all chapters →"}</Link></div><div className="chapter-grid">{chapters.map((chapter) => { const available = chapter.status === "available"; const slug = chapter.number === "00" ? "beyond-the-threshold" : `chapter-${Number(chapter.number)}`; return <article className={`chapter-card ${available ? "available" : "chapter-locked"}`} key={chapter.number}><div className="chapter-number">{chapter.number}</div><div><span className="chapter-status">{available ? (he ? "פתוח לקריאה" : "Available") : chapter.status === "scheduled" ? (he ? "בקרוב" : "Coming soon") : (he ? "נעול" : "Locked")}</span><h3>{he ? chapter.titleHe : chapter.titleEn}</h3><p>{he ? chapter.titleEn : chapter.titleHe}</p></div>{available ? <Link className="chapter-open" href={`/${locale}/read/${slug}`}>{he ? "קרא" : "Read"}</Link> : <span aria-label={he ? "נעול" : "Locked"}>◇</span>}</article>; })}</div></section>;
}

export function PowerStrip({ he }: { he: boolean }) {
  return <section className="section-shell" aria-labelledby="powers-title"><span className="section-kicker">THE SEVEN POWERS</span><div className="section-heading"><div><h2 id="powers-title">{he ? "שבעה כוחות. שבע תפיסות של תבונה." : "Seven powers. Seven ideas of intelligence."}</h2><p>{he ? "לכל בית סימן, חומר וצבע משלו — כדי שהכוח יהיה ברור במבט ראשון." : "Every house has its own symbol, material, and colour language."}</p></div><Link className="text-link" href={he ? "/he/realm" : "/en/realm"}>{he ? "לכל הבתים ←" : "Explore the houses →"}</Link></div><div className="power-grid">{factions.map((faction) => <Link className="power-card" href={`${he ? "/he" : "/en"}/realm`} key={faction.slug} style={{ "--accent": faction.accent } as CSSProperties}><Image className="power-crest" src={`/assets/factions/${faction.slug}/crest-primary-v1.png`} alt={`${faction.name} crest`} width={160} height={160} /><h3>{he ? faction.nameHe : faction.name}</h3><span>{faction.seat}</span><p>{faction.credo}</p></Link>)}</div></section>;
}

export function KnowledgeMap({ locale }: { locale: string }) {
  return <DossierMap locale={locale} />;
}

export function CharacterPreview({ he }: { he: boolean }) {
  const featuredCharacters = realmCharacters.filter(([slug]) => ["astra", "mira-vale", "le-concordat-senior"].includes(slug));
  return <section className="section-shell" aria-labelledby="characters-title"><span className="section-kicker">PEOPLE / SYSTEMS / CONSEQUENCES</span><div className="section-heading"><div><h2 id="characters-title">{he ? "מי מחליט מי רשאי לחשוב?" : "Who decides who is allowed to think?"}</h2><p>{he ? "העולם בנוי ממערכות. הסיפור נבנה מאנשים שמנסים לשלוט בהן." : "The world is built from systems. The story is built from people trying to control them."}</p></div><Link className="text-link" href={he ? "/he/characters" : "/en/characters"}>{he ? "לכל הדמויות ←" : "Meet the characters →"}</Link></div><div className="character-grid">{featuredCharacters.map(([slug, name, role, affiliation]) => <Link className="character-card" href={`${he ? "/he" : "/en"}/characters`} key={slug}><Image src={`/assets/characters/${slug}/portrait-primary-v1.png`} alt={name} width={1024} height={1024} /><div className="character-copy"><span>{affiliation}</span><h3>{name}</h3><p>{role}</p></div></Link>)}</div></section>;
}
