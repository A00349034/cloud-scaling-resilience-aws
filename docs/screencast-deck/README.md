# CA1 screencast deck

The slides for the CA1 screencast. [index.html](index.html) loads [slides.md](slides.md): **edit slides.md**, not index.html. The layout follows the slide rules in the reveal-js-html repository (`slide-rules.md`, modelled on the meme bank deck), with this deck's own dark blue and green colours.

## Open it

The Markdown is fetched, so it needs a web server. In PowerShell 7:

```powershell
cd C:\Users\user\GitHub\the-moodler\coupon-product-java
Get-Location
Start-Process python -ArgumentList '-m', 'http.server', '8011', '--bind', '127.0.0.1'
Start-Process msedge 'http://localhost:8011/docs/screencast-deck/'
# all done

```

Reveal.js 5.1.0, ARJ (Apocalypse Reveal-js) 1.8.15, Mermaid 12.3.0 and Apache ECharts 5.5.1 load from the jsDelivr CDN, so it needs the internet.

## Files

| File                                                                                                                               | What it is                                                                                                                                                                                                                                                                                                                                                     |
|------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [slides.md](slides.md)                                                                                                             | Every slide. `---` = next slide across, `---<!--L2-->` = next slide down                                                                                                                                                                                                                                                                                       |
| [speaking-script.md](speaking-script.md)                                                                                           | What to say on each slide. After a change run [build_notes.py](build_notes.py) (makes [notes.js](notes.js), the speaker notes)                                                                                                                                                                                                                                 |
| [deck.js](deck.js)                                                                                                                 | Settings, numbering (4, 4.1, 5 ...), speaker notes (each slide's `data-note="n"` gets section n of the script) and Mermaid                                                                                                                                                                                                                                     |
| [charts.js](charts.js)                                                                                                             | The interactive charts on slides 03, 04.1 and 05 (Apache ECharts), drawn from [ca1-charts.json](data/ca1-charts.json)                                                                                                                                                                                                                                          |
| [data](data/)                                                                                                                      | The chart numbers ([ca1-charts.json](data/ca1-charts.json)), written by [ca1_chart_data.py](../../scripts/ca1_chart_data.py) from the saved test results. The same numbers as data sets: [data/csv](../../data/csv/), viewable as [data/markdown](../../data/markdown/). Rebuild with the notebook [make_charts.ipynb](../../data/notebooks/make_charts.ipynb) |
| [deck.css](deck.css)                                                                                                               | Dark colours, captions, reference and file icons, References and Figures lists                                                                                                                                                                                                                                                                                 |
| [src](src/)                                                                                                                        | Icons, logo, favicons, QR code to these slides online, and the slides PDF                                                                                                                                                                                                                                                                                      |
| [cloud-scalability-resilience-mark-crowe-2026.pdf](src/pdf/cloud-scalability-resilience-mark-crowe-2026.pdf)                       | The slides as a PDF (linked from the title slide). Rebuild with [build-slides-pdf.ps1](../../scripts/build-slides-pdf.ps1)                                                                                                                                                                                                                                     |
| [recording/readme.md](recording/readme.md)                                                                                         | How the screencast is made: one voice recording per slide, built into a video by [build_screencast.py](recording/build_screencast.py)                                                                                                                                                                                                                          |
| [slide-one-vs-two.png](slide-one-vs-two.png), [slide-elasticity.png](slide-elasticity.png), [slide-failure.png](slide-failure.png) | Dark PNG versions of the three charts, from [ca1-make-charts.ps1](../../scripts/ca1-make-charts.ps1). Not on the slides any more; kept as a fallback                                                                                                                                                                                                           |

Diagrams (architecture, the elasticity and failure timelines) are Mermaid code inside [slides.md](slides.md), drawn in the browser: no PNGs.

## Slides PDF

In PowerShell 7:

```powershell
cd C:\Users\user\GitHub\the-moodler\coupon-product-java
Get-Location
pwsh -File scripts/build-slides-pdf.ps1
# all done

```

## Keys

Arrow keys move; **F** full screen; **S** speaker view with the notes; **Esc** overview. Inside a chart: hover for values, scroll or drag to zoom in on time.
