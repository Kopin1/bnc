# Hero background video

Drop the supplied hero footage here as:

- `hero.mp4`  — H.264/AAC, the broad-compatibility fallback
- `hero.webm` — VP9/AV1, smaller where supported

Then set `heroVideo.enabled = true` in `src/data/event.ts`.

Guidance:
- Keep it under ~6 MB. It is decorative; it must not delay first paint.
- Mute the audio track (it is played muted and is never unmuted).
- Export a poster frame to `public/images/event/hero-poster.jpg` (1920×1080).
- Users with `prefers-reduced-motion: reduce` never see the video —
  they get the poster and the gradient instead, so both must look right.
