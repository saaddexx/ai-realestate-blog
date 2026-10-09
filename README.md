# AI for Real Estate Marketers (static blog)

Free stack: Astro (static site) + GitHub Pages (hosting + deploy) + n8n (research and draft automation).
Cost: $0. No domain needed (you get `USERNAME.github.io/REPO`).

## How the pieces fit

```
n8n: Chat -> Research Agent -> Writer Agent -> GitHub node
                                                  |
                          creates src/content/blog/<slug>.md  (draft: true)
                                                  |
                    you review the file on GitHub, set draft: false, commit
                                                  |
                    GitHub Action builds the site and publishes it
```

Drafts (`draft: true`) are never published. Nothing goes live until you flip that flag.

## One-time setup (about 10 minutes)

1. Create a GitHub account if you do not have one, then create a **new public repository** (for example `ai-realestate-blog`).
2. Upload everything from this folder to the repo (GitHub web: Add file -> Upload files, or use git).
3. Edit `astro.config.mjs`:
   - `site: 'https://YOUR-USERNAME.github.io'`
   - `base: '/ai-realestate-blog'` (your repo name). Use `'/'` only if the repo is named `YOUR-USERNAME.github.io`.
4. In the repo: **Settings -> Pages -> Source: GitHub Actions**.
5. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes. Your site appears at the URL shown in the Actions run.

## Local preview (optional)

```
npm install
npm run dev
```

## Writing or publishing a post

Posts are Markdown files in `src/content/blog/`. Front matter fields:

| Field | Meaning |
|---|---|
| `title`, `description`, `pubDate` | required |
| `draft` | `true` = hidden, `false` = published (default is `true`) |
| `evidence` | `experiment`, `method` or `analysis` (shown as a badge) |
| `sources` | list of `{title, url, type, checked}`; shown in a Sources box at the end of the post |

The first post is already here as a draft. Before you set `draft: false`:
1. Open every source you want to cite and confirm it supports the exact claim.
2. Add it to `sources` with its type and the date you checked.
3. Add one real example from your own pilot run (what the AI got right, what you corrected).

## Next: connect n8n

Add a Writer Agent and a GitHub node after your Research Agent. The GitHub node creates a file at
`src/content/blog/<slug>.md` with `draft: true` front matter. That is the next step.
