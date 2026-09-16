"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { characterInsights, characterPowerMarks, factionInsights, type Locale, type LocalizedText } from "@/data/realm";

const copy = (value: LocalizedText, locale: Locale) => value[locale];

export function CharacterLoreCard({ character, he }: { character: readonly [string, string, LocalizedText, LocalizedText]; he: boolean }) {
  const locale: Locale = he ? "he" : "en";
  const [flipped, setFlipped] = useState(false);
  const [slug, name, role, affiliation] = character;
  const insight = characterInsights[slug];
  const powerMark = characterPowerMarks[slug];
  const affiliationName = copy(affiliation, locale);
  return <button type="button" className={flipped ? "lore-card character-lore flipped" : "lore-card character-lore"} onClick={() => setFlipped((value) => !value)} aria-pressed={flipped} aria-label={`${name}. ${he ? "פתח פרופיל" : "Open profile"}`}><span className="lore-card-inner"><span className="lore-card-face lore-card-front" aria-hidden={flipped}><Image src={`/assets/characters/${slug}/portrait-cast-v2.png`} alt={name} width={1024} height={1024} /><span className="character-power-pin" title={affiliationName}>{powerMark ? <Image src={`/assets/factions/${powerMark}/crest-primary-v1.png`} alt="" width={64} height={64} /> : <span aria-hidden="true">◇</span>}<b>{affiliationName}</b></span><span className="lore-card-overlay"><span>{affiliationName}</span><strong>{name}</strong><em>{copy(role, locale)}</em><small>{he ? "לחץ לחשיפה" : "Tap to reveal"}</small></span></span><span className="lore-card-face lore-card-back" aria-hidden={!flipped}><span className="lore-card-kicker">{he ? "תיק דמות" : "CHARACTER DOSSIER"}</span><strong>{name}</strong><em>{copy(role, locale)}</em><span className="lore-card-rule" /><p><b>{he ? "מייצג/ת" : "Represents"}</b>{copy(insight.represents, locale)}</p><p><b>{he ? "השאלה שלך" : "Your question"}</b>{copy(insight.connection, locale)}</p><small>{he ? "לחץ כדי לחזור" : "Tap to return"}</small></span></span></button>;
}

export function FactionLoreCard({ faction, he, compact = false }: { faction: { slug: string; name: string; nameHe: string; seat: string; credo: LocalizedText; accent: string }; he: boolean; compact?: boolean }) {
  const locale: Locale = he ? "he" : "en";
  const [flipped, setFlipped] = useState(false);
  const insight = factionInsights[faction.slug];
  const name = he ? faction.nameHe : faction.name;
  return <button type="button" className={flipped ? `lore-card faction-lore ${compact ? "compact" : ""} flipped` : `lore-card faction-lore ${compact ? "compact" : ""}`} onClick={() => setFlipped((value) => !value)} aria-pressed={flipped} aria-label={`${name}. ${he ? "פתח דוסייה" : "Open dossier"}`} style={{ "--faction-colour": faction.accent } as CSSProperties}><span className="lore-card-inner"><span className="lore-card-face lore-card-front" aria-hidden={flipped}><Image src={`/assets/factions/${faction.slug}/crest-primary-v1.png`} alt="" width={160} height={160} /><strong>{name}</strong><em>{faction.seat}</em><p>{copy(faction.credo, locale)}</p><small>{he ? "לחץ לדוסייה" : "Tap for dossier"}</small></span><span className="lore-card-face lore-card-back" aria-hidden={!flipped}><span className="lore-card-kicker">{he ? "תיק כוח" : "POWER DOSSIER"}</span><strong>{name}</strong><p><b>{he ? "מייצג" : "Represents"}</b>{copy(insight.represents, locale)}</p><p><b>{he ? "חוזקה" : "Strength"}</b>{copy(insight.strength, locale)}</p><p><b>{he ? "חולשה" : "Weakness"}</b>{copy(insight.weakness, locale)}</p><p><b>{he ? "עקבה" : "Trace"}</b>{copy(insight.history, locale)}</p><p className="lore-card-horizon">{copy(insight.horizon, locale)}</p></span></span></button>;
}
