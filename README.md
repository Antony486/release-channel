# Release Channel — direct APK distribution site

A static site for publishing your Android apps as direct APK downloads.
No backend, no build step — plain HTML/CSS/JS. Host it anywhere that
serves static files.

## Structure

```
index.html            hub page — app grid, install guide, about
apps/pulse.html        sample app release page (placeholder app)
apps/netscope.html     sample app release page (placeholder app)
downloads/              put your real .apk files here
style.css               all design tokens + styles, one file
script.js                terminal type-on animation + copy-to-clipboard
generate-checksums.sh   run this against downloads/ to get real SHA-256 hashes
```

## First things to change

1. **Brand name and contact.** Search both HTML files for `release-channel`,
   `m.antony.kobia@gmail.com`, and `github.com/Antony486` — replace with yours.
   These appear in the nav, footer, and page titles.

2. **Replace the two sample apps** (`Pulse`, `Netscope`) with your own,
   or add more by duplicating `apps/pulse.html` as a template. Each app page
   is self-contained — copy it, rename it, edit the content inside.

3. **Add your real APK files** to `downloads/`, named like
   `yourapp-1.0.0.apk` so old versions stay downloadable side by side.

4. **Generate real checksums.** Placeholder hashes are used throughout —
   they are not real. Run:
   ```
   chmod +x generate-checksums.sh
   ./generate-checksums.sh
   ```
   and paste the results into each app page's download table
   (`table.dl-table`) and the "Package details" side panel.

5. **Update the hub grid.** In `index.html`, the `#apps` section has one
   `<article class="release-card">` per app, each with a small "spec plate"
   (version / size / min SDK / updated) — keep this in sync with the
   individual app pages.

## Adding a new app page

Copy `apps/pulse.html`, then update, top to bottom:
- `<title>` and meta description
- the icon SVG in `.app-mark-lg` and the matching small one on the hub card
- the spec plate values (version, size, min SDK, updated)
- the download button href and size label
- the feature list, screenshots block, and package details panel
- the download table rows and changelog entries

Then add a matching `release-card` block to `index.html` linking to the new page.

## Signing keys, matter for real

The "signature verified" line on each app page and the trust copy on the
hub page ("signed with the same key across versions") only means something
if you actually keep using the same signing key for every release of a
given app. If you lose that key, Android will refuse to install an update
over the existing app — users would have to uninstall first, which breaks
local data. Keep your keystore backed up somewhere durable, outside this repo.

## Deploying

This is a static site — any of these work with no changes:
- GitHub Pages: push this folder to a `gh-pages` branch, or serve `/docs`
- Netlify / Vercel / Cloudflare Pages: point at this folder, no build command
- Your own server: `nginx`/`caddy` serving this directory is enough

One thing to set server-side if you can: serve `.apk` files with
`Content-Type: application/vnd.android.package-archive` so browsers
download rather than try to render them. Most static hosts do this
automatically by file extension; if yours doesn't, add it to your
host's headers/mime config.

## Notes on the design

Dark, mono-accented, built around a repeating "spec plate" — the small
version/size/SDK/date readout that appears on every card and app page.
Fonts: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono
(data, code, labels). No frameworks, no build tooling — edit the HTML
and CSS directly.
