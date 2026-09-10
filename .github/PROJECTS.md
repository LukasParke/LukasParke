# Curated project groups

GitHub repository topics are the source of truth for the profile catalog.
Each curated repository gets one category topic, chosen after reviewing its
README and implementation. The optional `portfolio-featured` topic selects group
highlights. Existing technical topics remain intact.

## Groups selected in the 2026-09-10 review

The review covered 99 public original repositories: **74 selected projects**,
**25 exclusions**, and **37 group highlights**. The categories and featured
markers were applied to GitHub and checked against the existing topic lists.

| Group | Category topic | Projects | Boundary |
| --- | --- | ---: | --- |
| API engineering & OpenAPI | `portfolio-openapi` | 15 | API contracts, editors, parsing/validation, and capture/replay workbenches. |
| Agents & AI tools | `portfolio-agents` | 3 | Pi extensions, shared human/agent tools, and agent knowledge/memory. |
| Plex ecosystem | `portfolio-plex` | 14 | Plex specifications, clients, documentation, collections, and applications. |
| Service SDKs & integrations | `portfolio-sdks` | 5 | Coolify, Dokploy, Prowlarr, and Discourse clients/contracts. |
| Web & app foundations | `portfolio-web` | 4 | Reusable SvelteKit SaaS, extension, and deployment/desktop foundations. |
| Developer tools & automation | `portfolio-developer-tools` | 11 | LSP frameworks, repository quality, analytics, and workstation tools. |
| Self-hosting & homelab | `portfolio-homelab` | 6 | Deployment platforms, operational GitOps, packaging, and self-hosted services. |
| Devices & interoperability | `portfolio-devices` | 5 | Yoto, HDMI-CEC, and Wave:3 device/protocol work. |
| Identity & SailPoint | `portfolio-identity` | 2 | IdentityNow support and diagnostics. |
| Research, datasets & references | `portfolio-research` | 9 | Inference experiments, comparative studies, developer references, and datasets. |

The [source-cited review](PROJECT-REVIEW.md) explains all 99 decisions; the
[review ledger](project-topic-review.json) records the selected categories and
highlights. These are dated review records. Rendering uses actual GitHub topics,
so subsequent curation happens on each repository.

### Decisions that differ from keyword matching

- **Hive** is a Docker Swarm deployment platform; its operational agents do not
  make it a coding-agent tool.
- **Gossip** and **Rumor** are general language-server frameworks. **Navigator**,
  **Suspect**, and **charte.rs** are specifically API engineering tools.
- **Relay** and **Baton** belong with API workbenches; Svelte/Rust are implementation
  choices rather than their product category.
- **Smelt**, the **Qwen benchmark campaign**, and **TUI Patterns** are research
  deliverables, separate from agent products.
- **Yoto**, **CEC**, and **Wave:3** share a device-interoperability purpose; Plex
  specifications and SDKs stay together in their own ecosystem.
- **pi-subagent** moved into **pi-extensions**. Empty starts, untouched scaffolds,
  deprecated predecessors, duplicate exports, and personal mirrors are not
  separate portfolio entries.
- **home-ops** contains substantive operational work and is included; a personal
  website or generated stats snapshot by itself is not a reusable tool.

## Curation rules

- Group by the problem a project solves. A Svelte OpenAPI editor belongs with
  OpenAPI tools; a Plex SDK belongs with the Plex ecosystem.
- Keep language browsing separate through Diffler's `repos_by_language()` index.
- Include public, owned, non-fork, non-archived projects with an identifiable
  purpose. A missing GitHub description does not disqualify a reviewed project.
- Leave scaffolds, minimal reproductions, unmodified deployment instances,
  incomplete placeholders, and mirrors outside the portfolio. Customized
  operational infrastructure can qualify under self-hosting.
- Use source-backed captions only when the repository description is empty.
- Record meaningful uncertainty instead of inferring purpose or effort from a
  name, language, star count, or amount of generated code.

## Updating membership

Edit a repository's About → Topics settings. Add the desired portfolio topic and
remove its previous category topic when moving it. Keep technical tags such as
`openapi`, `rust`, or `sveltekit`. Multiple or unknown category topics—and a
featured marker without a category—fail profile validation.

The public stats snapshot carries repository topics into the profile template.
After changing topics, allow the stats/profile schedules to refresh, or manually
run the stats workflow before the profile workflow.
