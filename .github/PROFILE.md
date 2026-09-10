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

The template fetches public repository records from `LukasParke/stats` with
`fetch_json`. A project enters the catalog when its GitHub topics contain exactly
one recognized `portfolio-*` category. The optional `portfolio-featured` topic
selects the first projects within a group. Group membership is manually curated on the
repository, using the purpose of its README and source; names, descriptions, and
languages do not implicitly move a project between groups.

Only owned, public, non-fork, non-archived repositories are rendered. Untagged
repositories stay outside the portfolio. Curated projects can appear even when
their GitHub description is empty. See [PROJECTS.md](PROJECTS.md) for the taxonomy
and review decisions.

The first four projects in each theme are visible; the rest remain available in
expandable lists. Featured projects lead; stars sort each tier, with recent pushes breaking ties.
Missing push dates display as `—` and sort after known dates within those ties.
Reviewed projects have source-backed description fallbacks while their
repository descriptions are empty. Stars and UTC push dates are displayed as
metadata, without estimating engineering effort. Telescope remains a separately
identified collaboration rather than an owned repository.

`repos_by_language(catalog)` generates a second, expandable navigation index over
the same projects. Exact topic matching, ordering, descriptions, and row rendering
live in `templates/profile.md.j2`; there is no separate project-generation script.
The validator rejects unrecognized/multiple portfolio topics, empty catalogs,
duplicate assignment, unexpected owners, and invalid snapshot dates before
publication.

To curate a repository, set its portfolio topic in GitHub's About/Topics settings.
Keep existing technical topics and replace only the old portfolio group when
moving a project. The stats workflow refreshes the topic snapshot; the next
profile run adopts it. For immediate propagation, manually run **GitHub Profile
Stats** in `LukasParke/stats` before rerunning this profile workflow.

To add a category, register its exact topic and display title in `project_groups`.
Use `description_overrides` only for missing descriptions, with captions grounded
in the project's README.

For a local preview, use a checkout of the pinned Diffler revision:

```sh
node /path/to/diffler/packages/diffler/dist-action/index.js render \
  --config .github/diffler.yml --output .diffler/README.md
node .github/scripts/check-profile.mjs .diffler/README.md
```

This template uses public Dev.to and GitHub data through Diffler's prefetched
helpers. Local rendering does not need a personal token. To stage a generated
update after reviewing the preview, copy `.diffler/README.md` to `README.md`.
