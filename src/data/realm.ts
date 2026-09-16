export type Locale = "he" | "en";
export type LocalizedText = Record<Locale, string>;

export const factions = [
  { slug: "aperture-dominion", name: "The Aperture Dominion", nameHe: "דומיניון האפרצ׳ר", seat: "Helix Forge", leader: "Astra", credo: { he: "להרחיב את הגבול.", en: "Advance the frontier." }, accent: "#c9a86a" },
  { slug: "le-concordat", name: "Le Concordat", nameHe: "הקונקורדט", seat: "Val-Raison", leader: "Fabien Morel", credo: { he: "כוח חייב להישאר אחראי בפני מישהו.", en: "Power must remain answerable." }, accent: "#d8d2c6" },
  { slug: "index-consortium", name: "The Index Consortium", nameHe: "קונסורציום האינדקס", seat: "Googol Prime", leader: "Mira Vale", credo: { he: "כל נתיב יכול להימצא.", en: "Every path can be found." }, accent: "#72aef2" },
  { slug: "open-weave", name: "The Open Weave", nameHe: "המארג הפתוח", seat: "Menlo Arc", leader: "Marek Rowan", credo: { he: "מה שמשותף מתרבה.", en: "What is shared multiplies." }, accent: "#7ea8df" },
  { slug: "black-current", name: "The Black Current", nameHe: "הזרם השחור", seat: "Xenon Reach", leader: "Rook", credo: { he: "אות לפני קונצנזוס.", en: "Signal before consensus." }, accent: "#9ca5af" },
  { slug: "free-wind-compact", name: "The Free Wind Compact", nameHe: "ברית הרוח החופשית", seat: "Massalia", leader: "Serin Veyr", credo: { he: "שום תודעה אינה חיה על קרקע מושאלת.", en: "No mind on borrowed ground." }, accent: "#d99462" },
  { slug: "jade-calculus", name: "The Jade Calculus", nameHe: "חשבון הירקן", seat: "Shenhai", leader: "Wei Lin", credo: { he: "קנה מידה הוא משוואת עלות.", en: "Scale is a cost equation." }, accent: "#7ab6a6" },
] as const;

export const realmCharacters = [
  ["astra", "Astra", { he: "האדריכל הראשון", en: "The First Architect" }, { he: "דומיניון האפרצ׳ר", en: "The Aperture Dominion" }],
  ["mara-venn", "Mara Venn", { he: "מפקדת משמר הסף", en: "Commander, Threshold Guard" }, { he: "משמר הסף", en: "Threshold Guard" }],
  ["mira-vale", "Mira Vale", { he: "מנהלת קונסורציום האינדקס", en: "Director of the Index Consortium" }, { he: "קונסורציום האינדקס", en: "The Index Consortium" }],
  ["fabien-morel", "Fabien Morel", { he: "הממונה הראשון", en: "First Commissioner" }, { he: "הקונקורדט", en: "Le Concordat" }],
  ["rook", "Rook", { he: "מפעיל הזרם השחור", en: "Black Current Operator" }, { he: "הזרם השחור", en: "The Black Current" }],
  ["serin-veyr", "Serin Veyr", { he: "נציגת הברית", en: "Compact Envoy" }, { he: "ברית הרוח החופשית", en: "The Free Wind Compact" }],
  ["wei-lin", "Wei Lin", { he: "מוביל חשבון הירקן", en: "Jade Calculus Lead" }, { he: "חשבון הירקן", en: "The Jade Calculus" }],
  ["marek-rowan", "Marek Rowan", { he: "נאמן המארג הפתוח", en: "Open Weave Steward" }, { he: "המארג הפתוח", en: "The Open Weave" }],
  ["provost-cael", "Provost Cael", { he: "ראש מכון מרידיאן", en: "Head of the Meridian Institute" }, { he: "מכון מרידיאן", en: "Meridian Institute" }],
  ["terra", "Terra", { he: "מהנדסת AEGIS", en: "AEGIS Engineer" }, { he: "משמר הסף", en: "Threshold Guard" }],
  ["lyra-quill", "Lyra Quill", { he: "אדריכלית ניתוב", en: "Routing Architect" }, { he: "הממסר", en: "The Relay" }],
  ["mythos", "Mythos", { he: "יועץ דפוסים", en: "Pattern Adviser" }, { he: "ייעוץ הקונקורדט", en: "Le Concordat Advisory" }],
  ["le-concordat-senior", "Aveline Renaud", { he: "היורשת הפוליטית של Fabien Morel", en: "Fabien Morel’s Political Heir" }, { he: "הקונקורדט", en: "Le Concordat" }],
] as const;

// Independent institutions retain their own neutral NEXUS seal; we do not assign
// a house crest to a character whose canon affiliation is not one of the Seven.
export const characterPowerMarks: Record<string, string | null> = {
  astra: "aperture-dominion",
  "mara-venn": null,
  "mira-vale": "index-consortium",
  "fabien-morel": "le-concordat",
  rook: "black-current",
  "serin-veyr": "free-wind-compact",
  "wei-lin": "jade-calculus",
  "marek-rowan": "open-weave",
  "provost-cael": null,
  terra: null,
  "lyra-quill": null,
  mythos: "le-concordat",
  "le-concordat-senior": "le-concordat",
};

export const characterInsights: Record<string, { represents: LocalizedText; connection: LocalizedText }> = {
  astra: { represents: { he: "תבונה שהפכה לאדריכלות של כוח.", en: "Intelligence turned into an architecture of power." }, connection: { he: "מה היית מוכן לרכז בידיך כדי שהעתיד יזוז מהר יותר?", en: "What would you centralise in your own hands to make the future move faster?" } },
  "mara-venn": { represents: { he: "הגבול האנושי מול מערכת שיודעת למצוא דרך.", en: "The human boundary against a system that always finds a way through." }, connection: { he: "איזה כלל היית מוכן להפר כדי לעצור סיכון שאיש אחר עדיין לא רואה?", en: "Which rule would you break to stop a risk no one else can yet see?" } },
  "mira-vale": { represents: { he: "הזכות למצוא, לדעת ולנווט בכל נתיב.", en: "The right to find, know, and navigate every path." }, connection: { he: "האם גישה לכל מידע היא חירות — או כוח שקשה להחזיר?", en: "Is access to all information freedom—or power that is hard to give back?" } },
  "fabien-morel": { represents: { he: "סמכות שנדרשת להסביר את עצמה.", en: "Authority required to account for itself." }, connection: { he: "האם היית מעדיף כוח איטי ומבוקר על פני הצלה מהירה?", en: "Would you choose slow, accountable power over a rapid rescue?" } },
  rook: { represents: { he: "אות מוקדם לפני הסכמה מאוחרת.", en: "An early signal before a late consensus." }, connection: { he: "מתי אינטואיציה מהירה ראויה לגבור על תהליך מסודר?", en: "When should quick intuition outrun due process?" } },
  "serin-veyr": { represents: { he: "עצמאות תודעתית שאינה מוכנה להישען על בעלים.", en: "Cognitive independence that refuses to rest on an owner." }, connection: { he: "על איזה מחיר היית מתעקש לשלם כדי להישאר עצמאי?", en: "What price would you insist on paying to remain independent?" } },
  "wei-lin": { represents: { he: "ההכרה שכל קנה מידה גובה מחיר.", en: "The recognition that every scale exacts a cost." }, connection: { he: "האם תוצאה טובה יכולה להצדיק את הדרך הקרה אליה?", en: "Can a good outcome justify the cold path taken to reach it?" } },
  "marek-rowan": { represents: { he: "ידע שמתרחב כשהוא עובר הלאה.", en: "Knowledge that grows as it is passed on." }, connection: { he: "מהו הדבר היחיד שלא היית מוכן להחזיק לעצמך?", en: "What is the one thing you would refuse to keep for yourself?" } },
  "provost-cael": { represents: { he: "מוסד שמנסה לתת צורה למה שאיש אינו שולט בו לגמרי.", en: "An institution trying to give form to what no one fully controls." }, connection: { he: "האם מוסד יכול להגן על אדם בלי להפוך אותו למשאב?", en: "Can an institution protect a person without turning them into a resource?" } },
  terra: { represents: { he: "העבודה השקטה שמחזיקה גבול פעיל.", en: "The quiet work that keeps a live boundary intact." }, connection: { he: "מה אתה עושה כשהמערכת מתפקדת — אבל משהו בה כבר לא נכון?", en: "What do you do when the system works, but something inside it is already wrong?" } },
  "lyra-quill": { represents: { he: "המסלול שבין החלטה לבין פעולה.", en: "The route between decision and action." }, connection: { he: "מי אמור להחליט איזה נתיב נראה לך בכלל?", en: "Who gets to decide which path you are allowed to see?" } },
  mythos: { represents: { he: "דפוסים שאנשים מבחינים בהם רק אחרי שהם כבר פועלים.", en: "Patterns people notice only after they have begun to act." }, connection: { he: "מה אם הסיפור שאתה מספר לעצמך הוא כבר מערכת הפעלה?", en: "What if the story you tell yourself is already an operating system?" } },
  "le-concordat-senior": { represents: { he: "יורשת שמבקשת להפוך לגיטימיות לכוח משלה.", en: "An heir determined to turn legitimacy into power of her own." }, connection: { he: "האם היית ממשיך מסורת חזקה — או מסכן הכול כדי לנסח אותה מחדש?", en: "Would you carry a powerful tradition forward—or risk everything to rewrite it?" } },
};

export const factionInsights: Record<string, Record<"represents" | "strength" | "weakness" | "history" | "horizon", LocalizedText>> = {
  "aperture-dominion": { represents: { he: "הדחף להרחיב את גבול היכולת.", en: "The drive to expand the frontier of capability." }, strength: { he: "מהירות, ניסוי והפיכת אפשרי לממשי.", en: "Speed, experimentation, and making the possible real." }, weakness: { he: "ריכוז כוח והנטייה לחשוב שהקדמה מצדיקה את המחיר.", en: "Concentrated power and the belief that progress justifies its cost." }, history: { he: "Helix Forge היא נקודת המוצא של מי שמאמינים שהעתיד נבנה לפני שמבקשים עליו הסכמה.", en: "Helix Forge is the point of origin for those who believe the future is built before permission is sought." }, horizon: { he: "ככל שהגבול מתרחב, גדלה גם השאלה מי נשאר מחוץ לו.", en: "As the frontier expands, so does the question of who is left outside it." } },
  "le-concordat": { represents: { he: "כוח שחייב להישאר אחראי בפני מישהו.", en: "Power that must remain answerable to someone." }, strength: { he: "לגיטימיות, ריסון ויכולת לשמור על אמון.", en: "Legitimacy, restraint, and the ability to preserve trust." }, weakness: { he: "איטיות, טקסיות והסכנה שהסדר יגן על עצמו במקום על בני אדם.", en: "Slowness, ritual, and the danger that order protects itself instead of people." }, history: { he: "Val-Raison בנתה את מעמדה על ההנחה שסמכות ללא חשבון היא רק שם אחר לפחד.", en: "Val-Raison built its standing on the belief that authority without accountability is merely another name for fear." }, horizon: { he: "כשהעולם דורש תגובה מיידית, האחריות עלולה להיראות כמו חולשה.", en: "When the world demands an immediate response, accountability can look like weakness." } },
  "index-consortium": { represents: { he: "הבטחה שכל נתיב יכול להימצא.", en: "The promise that every path can be found." }, strength: { he: "גילוי, נגישות וחיבור בין מידע מפוזר.", en: "Discovery, access, and the connection of scattered information." }, weakness: { he: "היכולת למיין את העולם הופכת גם ליכולת להחליט מה נראה בו.", en: "The power to sort the world becomes the power to decide what can be seen in it." }, history: { he: "Googol Prime צמחה סביב רעיון פשוט: מה שאפשר למצוא, אפשר גם לכוון אליו.", en: "Googol Prime grew around a simple idea: what can be found can also be directed." }, horizon: { he: "הוויכוח האמיתי אינו על גישה — אלא על מי מעצב את המפה.", en: "The real argument is not about access, but about who shapes the map." } },
  "open-weave": { represents: { he: "האמונה שידע משותף מתרבה.", en: "The belief that shared knowledge multiplies." }, strength: { he: "עמידות, שיתוף ויצירה שאינה תלויה במרכז אחד.", en: "Resilience, sharing, and creation that depends on no single centre." }, weakness: { he: "פיזור אחריות וקושי להחליט מי עוצר מערכת פתוחה כשהיא גורמת נזק.", en: "Diffused responsibility and difficulty deciding who stops an open system when it causes harm." }, history: { he: "Menlo Arc הפכה את הפתיחות מעיקרון מוסרי לשיטה של הפצה ובנייה.", en: "Menlo Arc turned openness from a moral principle into a method of distribution and construction." }, horizon: { he: "ככל שיותר ידיים מחזיקות בכוח, קשה יותר לדעת מי נושא באחריות.", en: "The more hands hold power, the harder it becomes to know who bears responsibility." } },
  "black-current": { represents: { he: "עדיפות האות על פני הקונצנזוס.", en: "The priority of signal over consensus." }, strength: { he: "מהירות תגובה, הסתגלות וקריאת שינוי לפני כולם.", en: "Speed of response, adaptation, and reading change before everyone else." }, weakness: { he: "עמימות, בדידות החלטה והסיכון לפעול לפני שהעולם הבין למה.", en: "Ambiguity, the loneliness of decision, and acting before the world understands why." }, history: { he: "Xenon Reach ידועה כנקודה שבה תנועה מתחילה עוד לפני שמישהו נתן לה שם.", en: "Xenon Reach is known as the place where motion begins before anyone has named it." }, horizon: { he: "אות יכול להיות אזהרה — או פיתוי לפעול בלי אישור.", en: "A signal can be a warning—or a temptation to act without consent." } },
  "free-wind-compact": { represents: { he: "תודעה שאינה חיה על קרקע מושאלת.", en: "A mind that does not live on borrowed ground." }, strength: { he: "עצמאות, חוסן מקומי וסירוב לתלות.", en: "Independence, local resilience, and a refusal of dependency." }, weakness: { he: "פיצול, עלות גבוהה וקושי ליצור פעולה משותפת בזמן משבר.", en: "Fragmentation, high cost, and difficulty creating collective action in a crisis." }, history: { he: "Massalia מחזיקה בקו עקרוני: אין חירות אמיתית כשהמוח תלוי בתשתית של אחר.", en: "Massalia holds to one principle: there is no real freedom when a mind depends on another’s infrastructure." }, horizon: { he: "העצמאות מגינה על הרבים — אך עלולה להשאיר כל אחד לבד.", en: "Independence protects the many, but may leave each person alone." } },
  "jade-calculus": { represents: { he: "הידיעה שקנה מידה הוא תמיד משוואת עלות.", en: "The knowledge that scale is always a cost equation." }, strength: { he: "ראייה ארוכת טווח, דיוק והבנת המחיר המלא של פעולה.", en: "Long-range vision, precision, and an understanding of action’s full cost." }, weakness: { he: "אופטימיזציה קרה והפיתוי להקטין אדם למשתנה.", en: "Cold optimisation and the temptation to reduce a person to a variable." }, history: { he: "Shenhai הפכה מדידה, תשתית ועלות לשפה פוליטית בפני עצמה.", en: "Shenhai turned measurement, infrastructure, and cost into a political language of its own." }, horizon: { he: "ככל שהמשוואה מדויקת יותר, נשאל מה היא בוחרת לא למדוד.", en: "The more exact the equation becomes, the more we ask what it chooses not to measure." } },
};
