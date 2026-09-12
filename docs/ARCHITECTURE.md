# Architecture

## Surfaces
1. Public reading platform
2. Author Console
3. Supabase content backend
4. Asset library
5. Analytics/event layer
6. Release scheduler

## Application structure
- `src/app/[locale]` — public localized routes
- `src/app/admin` — Author Console
- `src/components` — reusable visual components
- `src/features` — domain logic grouped by product capability
- `src/lib` — infrastructure and integrations
- `src/types` — shared domain types
- `supabase/migrations` — database schema history
- `scripts` — import and maintenance utilities
- `public/assets` — approved production assets only
- `docs` — source-of-truth project documentation

## Content ownership
Word remains the literary archive/master. Supabase is the publishing master for the online edition. Import is explicit and versioned; post-import edits are tracked in `chapter_versions`.

## Locales
Hebrew content is required. English fields/routes exist from day one but may remain empty until translation.
