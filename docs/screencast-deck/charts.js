// Interactive charts for slides 03, 04.1 and 05, drawn with Apache ECharts from data/ca1-charts.json
// (written by scripts/ca1_chart_data.py from the saved test results: the same numbers as the report's PNG charts).
// A chart draws itself, left to right, every time its slide is shown. Hover for values; drag or scroll inside
// a chart to zoom in on time; the small icons at its top right zoom, restore, or save a picture.
// In a slide: <div class="echart" data-chart="oneVsTwo|elasticity|failure"></div>
(() => {
    const C = {
        ink: "#eef4fb", muted: "#b6c6d9", line: "#445872", grid: "#2a3d57", paper: "#101d31",
        bad: "#ff6b6b", event: "#ff8a8a", series: ["#67d8d0", "#ffb454", "#9ad46a", "#e88ad1", "#8ab4ff"]
    };
    const printing = /print-pdf/.test(location.search);
    const filming = /video/.test(location.search);  // the screencast build (recording/capture_slides.mjs): no toolbar
    const label = { color: C.muted, fontSize: 16 };
    const utc = pattern => value => echarts.time.format(value, pattern, true);
    const charts = new Map();
    let data;

    function base() {
        return {
            backgroundColor: "transparent", color: C.series,
            animation: !printing, animationDuration: 4000, animationEasing: "linear",
            textStyle: { fontFamily: "Arial, sans-serif", color: C.ink },
            tooltip: {
                trigger: "axis", backgroundColor: "#15263d", borderColor: C.line,
                textStyle: { color: C.ink, fontSize: 15 }, valueFormatter: v => v == null ? "-" : v.toLocaleString("en-IE")
            },
            toolbox: {
                show: !printing && !filming, right: 4, top: 0, itemSize: 18, iconStyle: { borderColor: C.muted },
                feature: { dataZoom: { yAxisIndex: "none", title: { zoom: "Zoom", back: "Undo zoom" } }, restore: { title: "Restore" },
                    saveAsImage: { title: "Save as picture", backgroundColor: C.paper, pixelRatio: 2 } }
            }
        };
    }

    function valueAxis(name, gridIndex, extra = {}) {
        return {
            type: "value", gridIndex, name, nameLocation: "middle", nameGap: 62, nameTextStyle: { color: C.ink, fontSize: 16, lineHeight: 20 },
            axisLabel: label, axisLine: { show: true, lineStyle: { color: C.line } }, splitLine: { lineStyle: { color: C.grid } }, ...extra
        };
    }

    // Stacked panels: the axis name sits above its panel, read left to right
    function topName(name, gridIndex, extra = {}) {
        return valueAxis(name, gridIndex, {
            nameLocation: "end", nameGap: 10, nameRotate: 0,
            nameTextStyle: { color: C.ink, fontSize: 15, align: "left", padding: [0, 0, 0, -50] }, ...extra
        });
    }

    function timeAxis(gridIndex, showLabels, pattern, range) {
        return {
            type: "time", gridIndex, ...range,
            axisLabel: { ...label, show: showLabels, formatter: utc(pattern), hideOverlap: true },
            axisTick: { show: showLabels }, axisLine: { lineStyle: { color: C.line } }, splitLine: { show: true, lineStyle: { color: C.grid } }
        };
    }

    // Dashed red lines at the run's events; their names only on the top panel
    function eventLines(events, showNames) {
        return {
            symbol: "none", silent: true, animation: false,
            lineStyle: { color: C.event, type: "dashed", width: 1.5 },
            label: { show: showNames, color: C.event, fontSize: 14, formatter: p => p.name, position: "insideEndTop" },
            data: events.map(e => ({ name: e.label, xAxis: e.time }))
        };
    }

    function range(times, events, padSeconds) {
        const all = times.concat(events.map(e => e.time));
        return { min: Math.min(...all) - padSeconds * 1000, max: Math.max(...all) + padSeconds * 1000 };
    }

    // Slide 03: requests per second and client p95 against virtual users, side by side
    function oneVsTwo(d) {
        const names = Object.keys(d);
        const users = d[names[0]].map(r => String(r.users));
        const o = base();
        o.legend = { top: 0, left: "center", textStyle: { color: C.ink, fontSize: 17 }, itemWidth: 30 };
        o.grid = [{ left: 90, right: "54%", top: 48, bottom: 62 }, { left: "56%", right: 16, top: 48, bottom: 62 }];
        o.xAxis = [0, 1].map(i => ({
            type: "category", gridIndex: i, data: users, boundaryGap: false,
            name: "Virtual users (1 minute each)", nameLocation: "middle", nameGap: 38, nameTextStyle: { color: C.ink, fontSize: 16 },
            axisLabel: label, axisLine: { lineStyle: { color: C.line } }
        }));
        o.yAxis = [valueAxis("Requests per second", 0), valueAxis("Client p95 response time (ms)", 1, { nameGap: 52 })];
        o.series = names.flatMap((name, k) => ["rps", "p95"].map((key, i) => ({
            name, type: "line", xAxisIndex: i, yAxisIndex: i, data: d[name].map(r => r[key]),
            color: C.series[k], symbolSize: 10, lineStyle: { width: 3 }
        })));
        delete o.toolbox.feature.dataZoom;
        return o;
    }

    // Slide 04.1: the four CloudWatch panels of the elasticity run on one time axis
    function elasticity(d) {
        const panels = [["cpu", "Product CPU (%)"], ["response", "Load balancer response time (ms)"], ["capacity", "Instances"], ["database", "CPU (%)"]];
        const times = panels.flatMap(([k]) => d[k].flatMap(s => s.points.map(p => p[0])));
        const span = range(times, d.events, 30);
        const o = base();
        o.grid = panels.map((_, i) => ({ left: 70, right: 230, top: `${9 + i * 23}%`, height: "15%" }));
        o.xAxis = panels.map((_, i) => timeAxis(i, i === panels.length - 1, "{HH}:{mm}", span));
        o.yAxis = panels.map(([k, name], i) => topName(name, i, {
            splitNumber: 2,
            ...(k === "cpu" ? { min: 0, max: 100 } : {}), ...(k === "capacity" ? { min: 0, max: 3, interval: 1 } : {})
        }));
        o.series = panels.flatMap(([k], i) => d[k].map((s, n) => ({
            name: k === "cpu" ? `Product ${n + 1}` : s.name, type: "line", xAxisIndex: i, yAxisIndex: i, color: C.series[n],
            data: s.points, step: k === "capacity" ? "end" : false, showSymbol: false, lineStyle: { width: 2.5 },
            markLine: n === 0 ? eventLines(d.events, i === 0) : undefined
        })));
        // One small legend beside each panel, naming only that panel's lines
        o.legend = panels.map((_, i) => ({
            data: o.series.filter(s => s.xAxisIndex === i).map(s => s.name), orient: "vertical",
            right: 0, top: `${9 + i * 23}%`, itemGap: 4, textStyle: { color: C.ink, fontSize: 14 }
        }));
        o.axisPointer = { link: [{ xAxisIndex: "all" }] };
        o.dataZoom = [{ type: "inside", xAxisIndex: panels.map((_, i) => i) }];
        return o;
    }

    // Slide 05: what the client saw in 5-second windows around the failure
    function failure(d) {
        const p = d.points;
        const span = range(p.map(r => r[0]), d.events, 20);
        const o = base();
        o.grid = [0, 1, 2].map(i => ({ left: 70, right: 20, top: `${11 + i * 30}%`, height: "19%" }));
        o.xAxis = [0, 1, 2].map(i => timeAxis(i, i === 2, "{HH}:{mm}:{ss}", span));
        o.yAxis = [
            topName("Requests per second", 0, { splitNumber: 2 }),
            topName(`Failed requests per ${d.seconds} seconds`, 1, { splitNumber: 2 }),
            { ...topName("p95 response time (ms), log scale", 2), type: "log", min: 10 }
        ];
        o.series = [
            { name: "Requests per second", type: "line", xAxisIndex: 0, yAxisIndex: 0, data: p.map(r => [r[0], r[1]]),
              showSymbol: false, lineStyle: { width: 2.5 }, color: C.series[0], markLine: eventLines(d.events, true) },
            { name: "Failed requests", type: "bar", xAxisIndex: 1, yAxisIndex: 1, data: p.map(r => [r[0], r[2]]),
              barWidth: 7, color: C.bad, markLine: eventLines(d.events, false) },
            { name: "p95 response time (ms)", type: "line", xAxisIndex: 2, yAxisIndex: 2, data: p.map(r => [r[0], r[3]]),
              showSymbol: false, lineStyle: { width: 2.5 }, color: C.series[1], markLine: eventLines(d.events, false) }
        ];
        o.axisPointer = { link: [{ xAxisIndex: "all" }] };
        o.dataZoom = [{ type: "inside", xAxisIndex: [0, 1, 2] }];
        return o;
    }

    const builders = { oneVsTwo, elasticity, failure };

    function draw(el) {
        let chart = charts.get(el);
        if (!chart) {
            chart = echarts.init(el, null, { renderer: "svg" });
            charts.set(el, chart);
        }
        chart.clear();  // so the lines draw again from the left each time the slide is shown
        chart.setOption(builders[el.dataset.chart](data[el.dataset.chart]));
    }

    async function start() {
        if (data) return;
        try {
            data = await fetch("data/ca1-charts.json").then(r => r.json());
        } catch (error) { console.error("Chart data could not load", error); return; }
        if (!printing) Reveal.getCurrentSlide()?.querySelectorAll(".echart").forEach(draw);
    }

    // Printing (?print-pdf): draw every chart once the slides have been laid out as pages
    async function printAll() {
        await start();
        document.querySelectorAll(".echart").forEach(el => { draw(el); charts.get(el).resize(); });
    }

    Reveal.on("ready", start);
    if (printing) Reveal.on("pdf-ready", printAll);
    Reveal.on("slidechanged", e => { if (data) e.currentSlide.querySelectorAll(".echart").forEach(draw); });
    if (Reveal.isReady && Reveal.isReady()) start();
})();
