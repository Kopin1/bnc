# Myriad Pro (self-hosted)

Supplied by the client 17 Sep 2026, converted from their Creative Cloud desktop
`.otf` files to web formats via transfonter.org.

**Licence note for whoever maintains this:** these originate from an Adobe
*desktop* licence — the source `.otf` declares `fsType 0x0008` (document
embedding). Converting to `.woff2` changes the format, not the licence terms;
serving Myriad Pro as a webfont normally requires either an Adobe Fonts web
project (included with a paid Creative Cloud plan) or a purchased webfont
licence. This was raised with the client and self-hosting was their decision.

If that ever needs undoing, it is a small change: drop the `Myriad Pro` entry
from `fonts` in `astro.config.mjs` and point `--font-display` in
`src/styles/global.css` back at `var(--font-archivo)`.

Only Bold (700) and Black (900) were copied from the conversion; the other 12
cuts are unused. Of these, **only Bold is loaded** — see `fonts` in
`astro.config.mjs`. Black is kept because it measures only 3% wider than Bold
while being substantially heavier, so it is a drop-in if the headings ever want
more weight: add a second variant at `weight: 900` and set the heading rules in
`global.css` to match.
