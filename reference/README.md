# Reference material (not deployed)

Source material from the previous edition, kept out of `public/` so it is not
published but stays available for whoever updates the content.

| File | What it is |
| --- | --- |
| `workshop-schedule-2026.pdf` | The organiser's official flattened workshop grid for the 2026 edition. |
| `workshop-schedule-2026.jpg` | Same grid as an image (2528×1795), easier to read. |

`src/data/schedule.ts` was transcribed from these. When the 2027 grid arrives,
transcribe it the same way, then put the new PDF in `public/` and point
`event.schedulePdf` at it to restore the download button on `/program`.
