# Hero background video

`hero.mp4` is in place — supplied by the owner 17 Sep 2026.

| | |
| --- | --- |
| Resolution | 1280×720 |
| Duration | 20.9s |
| Codec | H.264, **no audio track** |
| Size | 5.2 MB |
| Poster | `public/images/event/hero-poster.jpg` (frame 1, 1600×900, 105 KB) |

It is wired up through `heroVideo` in `src/data/event.ts` and rendered by
`src/components/HeroVideo.astro`.

## How it loads

The `<video>` ships with **no `src`**. `HeroVideo.astro` attaches the sources
from JavaScript, which means the 5.2 MB is only fetched when it will actually
be used. It plays at every screen size, phones included — a deliberate call by
the owner — but is skipped entirely for:

- visitors with `prefers-reduced-motion: reduce`
- visitors whose browser reports `Save-Data`

Both of those see the poster frame instead and download no video at all. The
element fades in only on the `playing` event, so there is no flash of black
between the poster and the first painted frame.

## Replacing it

Drop a new `hero.mp4` here and regenerate the poster from its first frame:

```bash
qlmanage -t -s 1280 -o /tmp public/video/hero.mp4
node -e "require('sharp')('/tmp/hero.mp4.png').resize(1600,900,{fit:'cover'}).jpeg({quality:72,mozjpeg:true,progressive:true}).toFile('public/images/event/hero-poster.jpg')"
```

Keep it muted (it is played muted and never unmuted) and ideally under ~6 MB.
If you can produce a `.webm`, add it **before** the mp4 in `heroVideo.sources`
— the browser picks the first source it can play, and VP9/AV1 is usually a lot
smaller.
