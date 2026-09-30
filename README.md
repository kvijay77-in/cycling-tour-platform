# Cycling Tour Management Platform

This is the documentation website for the **Cycling Tour Management Platform**. It gives the complete picture of the platform in plain language: who it's for, a day on tour, the features of both apps, how it works, security, the deployment model, and the platform **glossary**. It's used to showcase the platform.

**Live site:** <https://kvijay77-in.github.io/cycling-tour-platform/>

The platform is made up of three repositories:

| Repository | What it is |
|---|---|
| `tour-data-api` | Python AWS SAM backend. It owns all AWS infrastructure (Cognito, API Gateway HTTP APIs, Lambda, DynamoDB, S3) and defines the roles and permissions. |
| `tour-mgmt-app` | React Native / Expo management app (Android and web) for organizers and crews. It works offline. |
| `tour-rider-app` | React Native / Expo app for riders. |

> The platform glossary is at [`docs/glossary.md`](docs/glossary.md). The other repositories link to this path, so please don't move or rename it.

## Preview locally

You need Python 3.

```bash
pip install -r requirements.txt && mkdocs serve
```

Then open the local URL printed by `mkdocs serve` (usually <http://127.0.0.1:8000/cycling-tour-platform/>). To run the same check as CI:

```bash
mkdocs build --strict
```

## Project layout

```text
mkdocs.yml                     # site configuration (MkDocs Material, Mermaid, navigation)
requirements.txt               # Python dependencies for building the site
.github/workflows/docs.yml     # build on PR; build and deploy to GitHub Pages on push to main
docs/
├── index.md                   # Home - the story of a tour day
├── who-its-for.md
├── a-day-on-tour.md
├── features/
│   ├── management-app.md
│   └── rider-app.md
├── how-it-works.md
├── security-and-privacy.md
├── deployment-model.md
├── glossary.md                # THE platform glossary (fixed path)
├── roadmap.md
├── gallery.md
├── resources.md
└── assets/
    └── screenshots/           # app screenshots (see README.md inside)
```

All diagrams are written in [Mermaid](https://mermaid.js.org/) inside ```` ```mermaid ```` code blocks.

## Adding screenshots

1. Check [`docs/assets/screenshots/README.md`](docs/assets/screenshots/README.md) for the list of expected file names.
2. Save each screenshot as a PNG in `docs/assets/screenshots/` with the exact file name. Use demo data only.
3. On the pages that mention that file name (`docs/features/*.md` and `docs/gallery.md`), replace the "Screenshot to be added" placeholder with an image, for example `![Dashboard grid](../assets/screenshots/mgmt-dashboard-grid.png)`.
4. Run `mkdocs build --strict` to make sure every image path resolves.

## Publishing (one-time setup)

The site is deployed by GitHub Actions (`.github/workflows/docs.yml`):

- **Pull requests:** the site is built with `mkdocs build --strict`, and nothing is deployed.
- **Push to `main`:** the site is built and deployed to GitHub Pages.

Before the first deployment, a repository admin needs to do this once:

**Settings → Pages → Build and deployment → Source = GitHub Actions**

_Last updated: 2026-09-29_
