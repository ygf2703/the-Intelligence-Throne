export const powers = [
  { name: "The Aperture Dominion", seat: "Helix Forge", accent: "#c9a86a", mark: "AP", ethos: "Frontier intelligence" },
  { name: "Le Concordat", seat: "Val-Raison", accent: "#d8d2c6", mark: "LC", ethos: "Power must remain answerable" },
  { name: "The Index Consortium", seat: "Googol Prime", accent: "#72aef2", mark: "IX", ethos: "Every path can be found" },
  { name: "The Open Weave", seat: "Menlo Arc", accent: "#7ea8df", mark: "OW", ethos: "What is shared multiplies" },
  { name: "The Black Current", seat: "Xenon Reach", accent: "#9ca5af", mark: "BC", ethos: "Signal before consensus" },
  { name: "The Free Wind Compact", seat: "Massalia", accent: "#d99462", mark: "FW", ethos: "No mind on borrowed ground" },
  { name: "The Jade Calculus", seat: "Shenhai", accent: "#7ab6a6", mark: "JC", ethos: "Scale is a cost equation" },
] as const;
export const chapters = [
  { number: "00", titleHe: "מעבר לסף", titleEn: "Beyond the Threshold", status: "available" },
  { number: "01", titleHe: "המושב הריק", titleEn: "The Empty Seat", status: "available" },
  { number: "02", titleHe: "האדריכל הראשון", titleEn: "The First Architect", status: "available" },
  { number: "03", titleHe: "האינדקס הזהוב", titleEn: "The Golden Index", status: "scheduled" },
  { number: "04", titleHe: "הקונקורדט", titleEn: "The Concordat", status: "locked" },
] as const;
export const characters = [
  { name: "Astra", initials: "AS", roleHe: "האדריכל הראשון", roleEn: "The First Architect", alignment: "The Aperture Dominion" },
  { name: "Mara Venn", initials: "MV", roleHe: "מפקדת משמר הסף", roleEn: "Commander, Threshold Guard", alignment: "Threshold Guard" },
  { name: "Mira Vale", initials: "MV", roleHe: "מנהלת קונסורציום האינדקס", roleEn: "Executive Director, Index Consortium", alignment: "The Index Consortium" },
] as const;
