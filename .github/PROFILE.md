# Updating this profile

Edit `templates/profile.md.j2`; `README.md` is generated with Diffler.
Configuration lives in `.github/diffler.yml`.

The workflow pins the merged Diffler implementation to
`bac0799a883974c2245e235a9146da6ca8bfebf5`. It refreshes posts and a sample of
community links, validates the output and all six image sources, then uploads the
rendered README. Pull requests run this preview job with read-only permissions.
Publication runs only on `main`, using the built-in GitHub token.

The hourly schedule is retained. Generated README commits do not retrigger the
workflow. The old `PERSONAL_GITHUB_TOKEN` secret is no longer needed by this
workflow.

Stats collection remains in `LukasParke/stats`; the Signature and language cards
are rendered and hosted by Diffler Pages. Their PNG, animated WebP, and GIF URLs
update independently of this README. The PNG source supports reduced-motion
preferences. Card coverage labels describe incomplete collection.

## Project catalog

The template fetches the public repository records from `LukasParke/stats` with
`fetch_json`. It selects owned, non-fork, non-archived projects with descriptions,
then assigns each project to one keyword theme. Names, descriptions, and GitHub
topics all participate in matching; more specific themes take precedence.
Test/demo repositories and dot-prefixed automation repositories are omitted.

The first four projects in each theme are visible; the rest remain available in
expandable lists. Stars sort each group, with recent pushes breaking ties.
Diffler is pinned first in its theme and has a description fallback while its
repository description is empty. Stars and UTC push dates are displayed as
metadata, without estimating engineering effort. Telescope remains a separately
identified collaboration rather than an owned repository.

`repos_by_language(catalog)` generates a second, expandable navigation index over
the same projects. Topic matching, ordering, descriptions, and row rendering live
in `templates/profile.md.j2`; there is no separate project-generation script.
The validator checks catalog completeness, unique assignment, owner scope, and
the snapshot date before publication.

To tune the catalog, edit `project_groups` (keywords/priority) and
`description_overrides` in the template. Future repositories enter automatically
when their public metadata qualifies.

For a local preview, use a checkout of the pinned Diffler revision:

```sh
node /path/to/diffler/packages/diffler/dist-action/index.js render \
  --config .github/diffler.yml --output .diffler/README.md
node .github/scripts/check-profile.mjs .diffler/README.md
```

This template uses public Dev.to and GitHub data through Diffler's prefetched
helpers. Local rendering does not need a personal token. To stage a generated
update after reviewing the preview, copy `.diffler/README.md` to `README.md`.
