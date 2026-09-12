# כס התבונה / The Intelligence Throne

Official repository for the serialized publishing platform of **כס התבונה**.

## Product
A web-first literary platform for publishing the complete novel gradually. The entire manuscript is loaded in advance, while the author controls editing, approval, scheduling, publication and version history chapter by chapter.

## Core principles
- Reading experience first.
- Hebrew-first, English-ready architecture.
- All manuscript units exist in the CMS before launch.
- Flexible chapter release cadence.
- Strong separation between manuscript/content, code and visual assets.
- No direct production update without author approval.

## Stack
- Next.js 16.3.3 + TypeScript
- Supabase (Postgres, Auth, Storage)
- Vercel deployment target

## Repository governance
`main` represents approved, releasable work.

All code, content or asset changes are prepared separately and reviewed before they enter `main`. No assistant-driven push, merge or production asset upload is performed without explicit author approval.

See `docs/GITHUB_WORKFLOW.md` and `docs/ARCHITECTURE.md`.
