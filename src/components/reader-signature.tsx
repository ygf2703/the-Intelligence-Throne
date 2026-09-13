"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { factions } from "@/data/realm";

const pulses = ["beyond-the-threshold", "chapter-1", "chapter-2"];
const influences = [
  ["aperture-dominion", "le-concordat", "open-weave"],
  ["aperture-dominion", "le-concordat", "free-wind-compact"],
  ["aperture-dominion", "open-weave", "le-concordat"],
];

function usePreference(key: string) {
  return useSyncExternalStore(
    (notify) => { window.addEventListener("throne-preference", notify); return () => window.removeEventListener("throne-preference", notify); },
    () => localStorage.getItem(key),
    () => null,
  );
}

export function ReaderSignature({ locale }: { locale: string }) {
  const firstAnswer = usePreference(`throne-pulse:${pulses[0]}`);
  const secondAnswer = usePreference(`throne-pulse:${pulses[1]}`);
  const thirdAnswer = usePreference(`throne-pulse:${pulses[2]}`);
  const answers = [firstAnswer, secondAnswer, thirdAnswer];
  const completed = answers.filter(Boolean).length;
  const he = locale === "he";
  if (completed < 3) return <p className="signature-progress">{he ? `השלם/י עוד ${3 - completed} בחירות כדי לחשוף את חתימת ה־NEXUS שלך.` : `Complete ${3 - completed} more choices to reveal your NEXUS signature.`}</p>;
  const scores = new Map<string, number>();
  answers.forEach((answer, questionIndex) => {
    const optionIndex = answer ? answer.length % 3 : 0;
    const slug = influences[questionIndex][optionIndex % 3];
    scores.set(slug, (scores.get(slug) ?? 0) + 1);
  });
  const winner = factions.find((faction) => faction.slug === [...scores.entries()].sort((a, b) => b[1] - a[1])[0][0]) ?? factions[0];
  return <aside className="reader-signature" style={{ "--signature-colour": winner.accent } as CSSProperties}><Image src={`/assets/factions/${winner.slug}/crest-primary-v1.png`} alt="" width={72} height={72} /><div><span>{he ? "חתימת NEXUS" : "NEXUS SIGNATURE"}</span><h3>{he ? winner.nameHe : winner.name}</h3><p>{he ? "הבחירות שלך אינן משנות את העלילה — הן חושפות את העדשה שדרכה את/ה קורא/ת אותה." : "Your choices do not change the story - they reveal the lens through which you read it."}</p></div></aside>;
}
