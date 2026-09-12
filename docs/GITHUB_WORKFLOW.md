# GitHub workflow and approval gate

## Non-negotiable rule
No code, manuscript update, generated image, visual asset, database migration or configuration change is pushed/merged into the approved project state without explicit author approval.

## Branch model
- `main` — approved/releasable state only.
- `feature/<name>` — product/code changes.
- `content/<chapter-or-batch>` — chapter/content changes.
- `asset/<name-or-batch>` — visual assets.
- `fix/<name>` — bug fixes.

## Assistant workflow
1. Read current repository state.
2. Prepare proposed changes locally or on an explicitly approved working branch.
3. Report files changed, intent, risks and preview where relevant.
4. Wait for explicit author approval.
5. Only then push/open PR/merge as separately authorized.

## Pull requests
Every material change should be reviewable as a PR. Prefer squash merge for a clean project history.

## Asset rule
Generated art is never added automatically. Each production asset requires explicit selection/approval and a stable canonical filename before repository inclusion.

## Suggested commit prefixes
- `feat:` feature
- `fix:` bug fix
- `content:` manuscript/content
- `asset:` approved visual asset
- `docs:` documentation
- `chore:` tooling/configuration
