// Deck settings and the two jobs ARJ does not do: speaker notes from speaking-script.md, and Mermaid.

// Speaker notes: each slide with <!-- .slide: data-note="2a" --> gets section 2a of speaking-script.md (notes.js).
function attachNotes() {
    document.querySelectorAll(".reveal .slides section[data-note]").forEach(section => {
        const text = window.CA1_NOTES?.[section.dataset.note];
        if (!text) return;
        const notes = section.querySelector(":scope > aside.notes") || section.appendChild(document.createElement("aside"));
        notes.className = "notes";
        notes.textContent = text;
    });
}
Reveal.on("ready", attachNotes);

// Files beside the deck (a relative link such as ../report.md or data/ca1-charts.json): class file-link,
// so deck.css puts the file's type before the name. Opening one leaves the slides, so it opens in a new
// tab and gets the new-tab arrow after it (opens-tab, drawn by ARJ). ARJ's link-icons.js only marks
// links to other websites.
function markFileLinks() {
    document.querySelectorAll(".reveal .slides a[href]").forEach(link => {
        const href = link.getAttribute("href");
        if (/^(https?:|#|mailto:|javascript:)/i.test(href) || link.querySelector("img")) return;
        link.target = "_blank";
        link.rel = "noopener";
        if (link.closest(".no-link-icon")) return;  // the title slide draws its own icons
        link.classList.add("file-link", "opens-tab");
    });
}
Reveal.on("ready", markFileLinks);

// The short link's hover (ARJ's #ref-tip, plain text): tinyurl.com/ small, the code to type in large.
// ARJ places the tip for its plain text first, so place it again for the new size.
function bigShortCode(event) {
    const link = event.target.closest?.('[data-tip^="tinyurl.com/"]');
    if (!link) return;
    requestAnimationFrame(() => {
        const tip = document.getElementById("ref-tip");
        const match = tip && /^(tinyurl\.com\/)(\w+)$/.exec(tip.textContent);
        if (!match) return;
        tip.innerHTML = `<span class="tip-host">${match[1]}</span><span class="tip-code">${match[2]}</span>`;
        const box = link.getBoundingClientRect(), margin = 8;
        const left = Math.min(Math.max(margin, box.left + box.width / 2 - tip.offsetWidth / 2), window.innerWidth - tip.offsetWidth - margin);
        const above = box.top - tip.offsetHeight - margin;
        tip.style.left = left + "px";
        tip.style.top = (above >= margin ? above : box.bottom + margin) + "px";
    });
}
document.addEventListener("mouseover", bigShortCode);
document.addEventListener("focusin", bigShortCode);

// A figure's data link (<a class="data-link" href="#/data" data-set="one-vs-two">) goes to the Data sets slide,
// marks that data set's row, and puts a way back in it, as ARJ does for a reference marker. Moving off the
// slide some other way cancels the way back.
(function dataLinks() {
    let returnTo = null;
    const back = document.createElement("button");
    back.type = "button";
    back.className = "ref-back";
    const label = at => {
        const number = Reveal.getConfig().slideNumber;
        const own = typeof number === "function" && number(Reveal.getSlide(at.h, at.v))[0];
        return own || (at.h + 1) + (at.v ? "." + (at.v + 1) : "");
    };
    const clear = () => {
        document.querySelectorAll("tr.data-target").forEach(row => row.classList.remove("data-target"));
        back.remove();
    };
    back.addEventListener("click", event => {
        event.stopPropagation();
        if (!returnTo) return;
        const to = returnTo;
        returnTo = null;
        clear();
        Reveal.slide(to.h, to.v);
    });
    document.addEventListener("click", event => {
        const link = event.target.closest?.("a.data-link");
        const row = link && document.querySelector(`#data tr[data-set="${link.dataset.set}"]`);
        if (!row) return;
        event.preventDefault();
        event.stopPropagation();
        returnTo = Reveal.getIndices();
        clear();
        row.classList.add("data-target");
        back.textContent = "↩ Back to slide " + label(returnTo);
        row.lastElementChild.appendChild(back);
        const to = Reveal.getIndices(row.closest("section"));
        Reveal.slide(to.h, to.v);
    }, true);
    Reveal.on("slidechanged", event => {
        if (returnTo && !event.currentSlide.querySelector("tr.data-target")) { returnTo = null; clear(); }
    });
})();

// A Mermaid timeline draws boxes of different heights in a row, leaves wide gaps between the rows, and runs
// its dashed lines far below the last event: the picture is tall, so fitted to the slide it is narrow and
// its text small. Lay the three rows out again: in each row every box the same height, its text centred;
// the rows close together; the picture cut off under the lowest box.
function trimTimeline(svg) {
    const box = document.createElement("div");
    box.style.cssText = "position:absolute;left:-20000px;top:0;width:2000px;visibility:hidden";
    box.innerHTML = svg;
    document.body.appendChild(box);
    const root = box.querySelector("svg");
    const lines = [...root.querySelectorAll("line")];
    const arrow = lines.find(l => l.getAttribute("y1") === l.getAttribute("y2"));
    const dashed = lines.filter(l => l !== arrow);
    const sections = [...root.children].filter(g => g.matches("g:not([class])") && g.querySelector(":scope > .timeline-node"));
    const tasks = [...root.querySelectorAll(".taskWrapper")];
    const events = [...root.querySelectorAll(".eventWrapper")];
    const at = g => g.transform.baseVal.consolidate()?.matrix ?? { e: 0, f: 0 };
    const place = (g, y) => g.setAttribute("transform", `translate(${at(g).e}, ${y})`);

    // One row: each box redrawn as a plain rectangle of the row's height, its text centred in it.
    // Class tl-section, tl-time or tl-event, so deck.css can style each row's text.
    function sameHeight(row, name, pad) {
        const parts = row.map(g => {
            const node = g.querySelector(".timeline-node");
            const shape = node.querySelector("path, rect");
            const label = [...node.children].find(c => c.querySelector("text"));
            return { g, node, shape, label, w: shape.getBBox().width, t: label.getBBox() };
        });
        const h = Math.ceil(Math.max(...parts.map(p => p.t.height))) + pad * 2;
        parts.forEach(({ node, shape, label, w, t }) => {
            node.classList.add(name);
            if (shape.tagName === "path") shape.setAttribute("d", `M0 0 H${w} V${h} H0 Z`);
            else { shape.setAttribute("height", h); shape.setAttribute("y", 0); }
            label.setAttribute("transform", `translate(${w / 2}, ${(h - t.height) / 2 - t.y})`);
        });
        return h;
    }

    if (tasks.length && arrow) {
        let y = Math.min(...[...sections, ...tasks].map(g => at(g).f));
        if (sections.length) {
            const h = sameHeight(sections, "tl-section", 12);
            sections.forEach(g => place(g, y));
            y += h + 14;
        }
        const ht = sameHeight(tasks, "tl-time", 10);
        tasks.forEach(g => place(g, y));
        const timeBottom = y + ht;
        const arrowY = timeBottom + 24;
        arrow.setAttribute("y1", arrowY);
        arrow.setAttribute("y2", arrowY);
        let bottom = arrowY;
        if (events.length) {
            const he = sameHeight(events, "tl-event", 10);
            // Events under the same time stack in their order, 8 apart
            const columns = new Map();
            [...events].sort((a, b) => at(a).f - at(b).f).forEach(g => {
                const x = Math.round(at(g).e);
                const n = columns.get(x) || 0;
                columns.set(x, n + 1);
                place(g, arrowY + 24 + n * (he + 8));
                bottom = Math.max(bottom, arrowY + 24 + n * (he + 8) + he);
            });
        }
        dashed.forEach(l => { l.setAttribute("y1", timeBottom); l.setAttribute("y2", bottom + 10); });
    }
    // Measure without the lines, which run past the boxes; end the time arrow just after the last box
    lines.forEach(l => { l.style.display = "none"; });
    const b = root.getBBox();
    lines.forEach(l => { l.style.display = ""; });
    if (arrow) arrow.setAttribute("x2", b.x + b.width + 30);
    const pad = 12;
    root.setAttribute("viewBox", `${b.x - pad} ${b.y - pad} ${b.width + 30 + pad * 2} ${b.height + pad * 2 + 12}`);
    root.removeAttribute("height");
    root.style.maxWidth = "100%";
    const out = box.innerHTML;
    box.remove();
    return out;
}

// Mermaid diagrams written as <div class="mermaid"> in slides.md, drawn in the browser (no PNGs).
Reveal.on("ready", async () => {
    if (!document.querySelector(".reveal .mermaid")) return;
    try {
        const { default: mermaid } = await import("https://cdn.jsdelivr.net/npm/mermaid@12.3.0/dist/mermaid.esm.min.mjs");
        // AWS service icons (Iconify "logos") and general icons (Material Design, "mdi"), fetched only when used.
        const pack = (name, version) => ({
            name, loader: () => fetch(`https://cdn.jsdelivr.net/npm/@iconify-json/${name}@${version}/icons.json`).then(r => r.json())
        });
        mermaid.registerIconPacks([pack("logos", "1.2.19"), pack("mdi", "1.2.3")]);
        mermaid.initialize({
            startOnLoad: false, theme: "redux-dark-color", look: "neo", layout: "elk",
            fontFamily: "Arial, sans-serif",
            themeVariables: {
                fontSize: "22px", edgeLabelBackground: "#101d31",
                // Gantt timelines in the deck's colours: teal tasks, red waits, green for 2 healthy targets
                taskBkgColor: "#25415f", taskBorderColor: "#67d8d0", taskTextColor: "#eef4fb",
                taskTextOutsideColor: "#eef4fb", taskTextLightColor: "#eef4fb", taskTextDarkColor: "#eef4fb",
                critBkgColor: "#e4572e", critBorderColor: "#ff8a65",
                doneTaskBkgColor: "#2f8f78", doneTaskBorderColor: "#67d8d0",
                activeTaskBkgColor: "#3a4a63", activeTaskBorderColor: "#b6c6d9",
                sectionBkgColor: "#15263d", sectionBkgColor2: "#101d31", altSectionBkgColor: "#101d31",
                gridColor: "#445872", titleColor: "#eef4fb",
                // Timeline diagrams: one teal-to-blue colour per period, light text
                cScale0: "#1f5f5b", cScale1: "#25415f", cScale2: "#2f8f78", cScale3: "#3a4a63", cScale4: "#1f5f5b", cScale5: "#25415f",
                cScaleLabel0: "#eef4fb", cScaleLabel1: "#eef4fb", cScaleLabel2: "#eef4fb", cScaleLabel3: "#eef4fb", cScaleLabel4: "#eef4fb", cScaleLabel5: "#eef4fb"
            },
            timeline: { disableMulticolor: false, padding: 8 },
            gantt: { fontSize: 20, sectionFontSize: 20, barHeight: 30, barGap: 6, leftPadding: 190, useWidth: 1180 },
            // Labels sit straight on the slide background instead of grey boxes.
            themeCSS: ".labelBkg, .edgeLabel, .edgeLabel p, .icon-shape p, .icon-shape .label div { background: transparent !important; } .sectionTitle { fill: #b6c6d9 !important; } .tick text { fill: #b6c6d9 !important; font-size: 18px; }"
        });
        // Render off-slide: inside a scaled Reveal slide Mermaid measures text too small.
        let n = 0;
        for (const el of document.querySelectorAll(".reveal .mermaid")) {
            const decode = document.createElement("textarea");
            decode.innerHTML = el.innerHTML;
            const { svg } = await mermaid.render(`deck-mermaid-${n++}`, decode.value.trim());
            el.innerHTML = /^\s*timeline\b/m.test(decode.value) ? trimTimeline(svg) : svg;
            el.setAttribute("data-processed", "true");
        }
        Reveal.layout();
    } catch (error) { console.error("Mermaid could not render", error); }
});

// Settings only; what each does is described in the ARJ script it belongs to (as in the memes deck).
startDeck({
    width: 1280, height: 720, margin: 0.06, center: false, hash: true, history: true,
    progress: true, slideNumber: 'h.v', transition: 'none',
    mouseWheel: false, scrollActivationWidth: null,
    plugins: [RevealMarkdown, RevealNotes],
    deckMarkdown: { fitMin: 0.85 },
    linkIcons: { style: 'favicon-before', newTab: true },  // links to other websites open in a new tab, so the slides stay open
    stackBarLinks: true, tapZones: true, lock: true, pinTop: true, draw: true,
    drawToolbar: 'top', tldreveal: { isDarkMode: true },
    deckControls: {
        contentsColumns: 4, contentsRows: 3, contentsColumnsPortrait: 2, contentsRowsPortrait: 2,
        contentsInFlow: false, contentsCaptions: true, contentsPageCount: false,
        numberFormat: 'multilevel', numberHeadings: false, sidebarSide: 'left', home: '../'
    },
    deckScripts: ['deck-markdown.js', 'link-icons.js', 'deck-controls.js', 'deck.js',
        'deck-draw.js', 'deck-search.js', 'deck-zoom.js'],
    zoom: { pictures: '.reveal .slides figure img' }
}).catch(error => console.error("Deck could not start", error));
