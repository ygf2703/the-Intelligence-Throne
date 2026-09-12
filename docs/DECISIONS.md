# Architecture Decision Log

## ADR-001 — Web-first serialized publication
The platform is the official online reading and release surface. The complete manuscript is loaded in advance; public visibility is controlled per chapter.

## ADR-002 — Author approval gate
No repository push/merge, production content update or production asset addition occurs without explicit author approval.

## ADR-003 — Hebrew-first, English-ready
Hebrew is the launch language. Data and routes support English from the beginning so translation does not require a later architecture migration.

## ADR-004 — Publishing state machine
Chapters move through: draft → review → approved → scheduled → published → archived.

## ADR-005 — Supabase publishing backend
Postgres stores structured book content and versions; Auth protects the Author Console; Storage holds approved production media.

## ADR-006 — Visual assets are canonical only after approval
Generated concept art is not production art until explicitly selected by the author and assigned a canonical file name/version.
