export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main style={{ display: "grid", placeItems: "center", padding: "4rem 1.5rem" }}>
      <section style={{ width: "min(70rem, 100%)", textAlign: "center" }}>
        <p style={{ color: "var(--gold)", letterSpacing: ".18em" }}>THE INTELLIGENCE THRONE</p>
        <h1 style={{ fontSize: "clamp(3rem, 9vw, 7rem)", margin: ".2em 0" }}>כס התבונה</h1>
        <p style={{ color: "var(--muted)", fontSize: "1.15rem" }}>
          {locale === "he" ? "מי שמחליט מי חושב — מחזיק בכוח האמיתי." : "The real power belongs to whoever decides who gets to think."}
        </p>
      </section>
    </main>
  );
}
