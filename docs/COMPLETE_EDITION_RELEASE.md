# Complete-edition release switch

The complete edition is deliberately disabled in `src/data/edition.ts`. This protects the 24 unpublished reading units while the platform runs as a serial release.

When the author approves a full release:

1. Set `completeEdition.enabled` to `true`.
2. Create the approved Hebrew and English literary source files as `content/private/book-he.json` and `content/private/book-en.json`.
3. Generate and visually approve the A5 PDF, then place it at `public/downloads/the-intelligence-throne-a5.pdf`.
4. Add the public download control only after the PDF is approved.

The continuous route is already available at `/{locale}/read/complete`. While the switch is off, it renders only units already released to readers. Once enabled, it renders the complete edition without changing the route.
