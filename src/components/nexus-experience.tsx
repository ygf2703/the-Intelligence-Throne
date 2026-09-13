"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { dossiers, pulses } from "@/data/engagement";
import { factions } from "@/data/realm";

const mapPositions: Record<string, { x: string; y: string }> = {
  "aperture-dominion": { x: "50%", y: "11%" }, "le-concordat": { x: "27%", y: "19%" }, "index-consortium": { x: "73%", y: "19%" }, "open-weave": { x: "24%", y: "45%" }, "black-current": { x: "76%", y: "45%" }, "free-wind-compact": { x: "29%", y: "66%" }, "jade-calculus": { x: "71%", y: "66%" },
};

function useLocalChoice(key: string) {
  const value = useSyncExternalStore(
    (onChange) => { window.addEventListener("throne-preference", onChange); return () => window.removeEventListener("throne-preference", onChange); },
    () => localStorage.getItem(key),
    () => null,
  );
  function setValue(next: string) { localStorage.setItem(key, next); window.dispatchEvent(new Event("throne-preference")); }
  return [value, setValue] as const;
}

export function HouseSelection({ locale }: { locale: string }) {
  const he = locale === "he";
  const [choice, select] = useLocalChoice("throne-house");
  const selected = factions.find((faction) => faction.slug === choice);
  return <section className="house-selection" aria-labelledby="house-choice-title"><div><span className="section-kicker">DECLARE A POSITION</span><h2 id="house-choice-title">{he ? "למי אתה נותן את הכוח?" : "Who do you trust with power?"}</h2><p>{he ? "בחר בית, או עמוד מחוץ לשבעתם. זו עמדה אישית — לא שינוי של הקאנון." : "Choose a house, or stand outside all seven. This is your position, not a change to canon."}</p></div><div className="house-choice-grid">{factions.map((faction) => <button type="button" className={choice === faction.slug ? "house-choice selected" : "house-choice"} onClick={() => select(faction.slug)} key={faction.slug} style={{ "--choice-colour": faction.accent } as CSSProperties}><Image src={`/assets/factions/${faction.slug}/crest-primary-v1.png`} alt="" width={72} height={72} /><span>{he ? faction.nameHe : faction.name}</span></button>)}<button type="button" className={choice === "unaffiliated" ? "house-choice selected unaligned" : "house-choice unaligned"} onClick={() => select("unaffiliated")}><b>◇</b><span>{he ? "אף בית" : "No house"}</span></button></div><p className="house-choice-status" aria-live="polite">{selected ? (he ? `הסיכה שלך: ${selected.nameHe}.` : `Your insignia: ${selected.name}.`) : choice === "unaffiliated" ? (he ? "העמדה שלך: מחוץ לשבעת הבתים." : "Your position: outside the seven houses.") : (he ? "אפשר לשנות עמדה בכל עת במכשיר הזה." : "You can change this position on this device at any time.")}</p></section>;
}

export function NexusPulse({ slug, locale }: { slug: string; locale: string }) {
  const pulse = pulses[slug as keyof typeof pulses];
  const he = locale === "he";
  const [answer, choose] = useLocalChoice(`throne-pulse:${slug}`);
  if (!pulse) return null;
  return <section className="nexus-pulse" aria-labelledby="pulse-title"><span className="section-kicker">NEXUS PULSE</span><h2 id="pulse-title">{pulse.question}</h2><div className="pulse-options">{pulse.options.map((option) => <button type="button" className={answer === option ? "pulse-option selected" : "pulse-option"} onClick={() => choose(option)} key={option}>{option}</button>)}</div><p aria-live="polite">{answer ? (he ? "עמדתך נשמרה במכשיר הזה. היא אינה משנה את העלילה — היא חושפת את העדשה שדרכה אתה קורא אותה." : "Your position is saved on this device. It does not change the story; it changes the lens through which you read it.") : (he ? "אין כאן תשובה נכונה. יש רק המחיר של כל תשובה." : "There is no correct answer here. Only the cost of each answer.")}</p></section>;
}

export function DossierMap({ locale }: { locale: string }) {
  const he = locale === "he";
  const [activeSlug, setActiveSlug] = useState("aperture-dominion");
  const activeFaction = factions.find((faction) => faction.slug === activeSlug) ?? factions[0];
  const dossier = dossiers[activeFaction.slug];
  return <section className="knowledge-map" aria-labelledby="map-title"><div className="map-heading"><div><span className="section-kicker">THE NEXUS ATLAS</span><h2 id="map-title">{he ? "מפת התבונה שמאחורי הסיפור." : "The intelligence map beneath the story."}</h2><p>{he ? "בחר סמל כדי לפתוח דוסייה קנונית על מרכז הכוח שלו." : "Choose a crest to open its canonical power-centre dossier."}</p></div></div><div className="atlas-frame"><Image className="atlas-art" src="/assets/maps/nexus-atlas-v1.png" alt={he ? "מפת ה־NEXUS ושבעת מרכזי הכוח" : "The NEXUS map and seven power centres"} width={1680} height={944} priority sizes="(max-width: 900px) 100vw, 88rem" /><div className="atlas-nexus" aria-hidden="true"><span>NEXUS</span></div>{factions.map((faction) => { const position = mapPositions[faction.slug]; return <button className={activeSlug === faction.slug ? "atlas-node active" : "atlas-node"} type="button" onClick={() => setActiveSlug(faction.slug)} key={faction.slug} style={{ "--node-x": position.x, "--node-y": position.y, "--node-colour": faction.accent } as CSSProperties} aria-label={`${faction.name}, ${faction.seat}`}><Image src={`/assets/factions/${faction.slug}/crest-primary-v1.png`} alt="" width={96} height={96} /><span className="atlas-node-label"><b>{he ? faction.nameHe : faction.name}</b><small>{faction.seat}</small></span></button>; })}<aside className="map-dossier" style={{ "--dossier-colour": activeFaction.accent } as CSSProperties} aria-live="polite"><Image src={`/assets/factions/${activeFaction.slug}/crest-primary-v1.png`} alt="" width={56} height={56} /><div><span>{activeFaction.seat}</span><h3>{dossier.title}</h3><p>{dossier.body}</p></div></aside></div><p className="map-caption">{he ? "הסמלים שעל המפה הם ה־crests הקנוניים של הבתים — לא סימנים דקורטיביים." : "The marks on this atlas are the houses’ canonical crests, not decorative stand-ins."}</p></section>;
}
