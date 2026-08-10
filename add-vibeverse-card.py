import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

new_card = '''      <article class="release-card">
        <div class="card-top">
          <div class="app-mark" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M6 16V10" stroke="#FF8A3D" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M11 19V7" stroke="#FF8A3D" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M16 16V10" stroke="#FF8A3D" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M21 19V7" stroke="#FF8A3D" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="status-pill">stable</span>
        </div>
        <div>
          <h3>VibeVerse</h3>
          <p class="tagline">Local-first music player with podcasts, radio, lyrics, and casting.</p>
        </div>
        <div class="spec-plate compact">
          <div><span class="k">version</span><span class="v">1.0.0</span></div>
          <div><span class="k">size</span><span class="v">20 MB</span></div>
          <div><span class="k">min sdk</span><span class="v">26</span></div>
          <div><span class="k">updated</span><span class="v">2026-08-10</span></div>
        </div>
        <a href="apps/vibeverse.html" class="card-link">View release <span aria-hidden="true">\u2192</span></a>
      </article>

'''

anchor = '<a href="apps/netscope.html" class="card-link">'
idx = content.find(anchor)
if idx == -1:
    raise SystemExit("Could not find the Netscope card anchor - aborting, no changes made.")

close_idx = content.find("</article>", idx)
if close_idx == -1:
    raise SystemExit("Could not find closing </article> after Netscope card - aborting.")

insert_at = close_idx + len("</article>")
content = content[:insert_at] + "\n\n" + new_card.rstrip("\n") + content[insert_at:]

content = content.replace(
    "Two apps in active development.",
    "Three apps in active development."
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done. VibeVerse card inserted and description updated.")
