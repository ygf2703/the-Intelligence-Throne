export default async function ChapterPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  return (
    <main style={{ padding: "4rem 1.5rem" }}>
      <article dir={locale === "he" ? "rtl" : "ltr"} style={{ maxWidth: "var(--max-reading)", margin: "0 auto" }}>
        <p style={{ color: "var(--gold)" }}>CHAPTER</p>
        <h1>{slug}</h1>
        <p style={{ color: "var(--muted)" }}>Chapter content will be loaded from Supabase after the manuscript import.</p>
      </article>
    </main>
  );
}
