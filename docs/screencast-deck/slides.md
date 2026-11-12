
# Cloud Scalability and Resilience on AWS
<!-- .slide: id="title" class="title-slide arj-title" data-note="1" -->

<div class="title-body no-link-icon">
  <figure class="deck-qr"><img src="src/img/qr/deck-qr.svg" alt="QR code: these slides online, a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck" />
    <figcaption class="byline"><span class="calendar" aria-hidden="true">📅</span><a class="ext date-link" href="https://github.com/A00349034/cloud-scaling-resilience-aws/commits" title="Version 1.9.0: the change history"><time class="deck-date" datetime="2026-11-12T00:30:00+00:00">November 2026</time></a></figcaption>
  </figure>
  <div class="title-text">
    <h3>What changes when the Product service scales?</h3>
    <p class="title-desc">Horizontal scaling of the Product-Coupon application</p>
    <p class="byline">
      <a class="person ext" href="https://github.com/A00349034" data-tip="github.com/A00349034"><img class="logo" src="src/img/logo/mc-logo-circle.png" alt="" />Mark Crowe</a>
    </p>
    <p class="title-course"><a class="ext" href="https://tus.ie/courses/msc-in-software-design-with-cloud-native-computing" title="The course on tus.ie"><span class="arj-icon icon-tus"></span>MSc in Software Design with Cloud Computing</a></p>
    <p class="title-module">Container Design and Deployment – CA1</p>
    <p class="title-quote">"<del>Peace</del> <em class="swap">Failure</em> was never an option." <cite>– Magneto, <i>X-Men: First Class</i> trailer (2011), adapted</cite></p>
  </div>
  <p class="built-with">Built with <a class="ext" href="https://revealjs.com/">
    <span class="arj-icon arj-icon-revealjs"></span>Reveal.js</a>, <a class="ext" href="https://www.npmjs.com/package/apocalypse-reveal-js" title="ARJ, Apocalypse Reveal-js">
    <span class="arj-icon arj-icon-arj"></span>ARJ</a>, <a class="ext" href="https://mermaid.js.org/" title="Diagrams drawn from text">
    <span class="arj-icon icon-mermaid"></span>Mermaid</a> and <a class="ext" href="https://echarts.apache.org/" title="Interactive charts">
    <span class="arj-icon icon-echarts"></span>ECharts</a><span class="sep">–</span>
    <a class="ext" href="https://github.com/A00349034/cloud-scaling-resilience-aws" title="Source, on GitHub"><span class="arj-icon arj-icon-github"></span>Source</a>
  </p>
</div>
<footer class="slide-footer no-link-icon">
  <p class="deck-pdf"><a class="ext" href="src/pdf/cloud-scalability-resilience-mark-crowe-2026.pdf" download="cloud-scalability-resilience-mark-crowe-2026.pdf" title="Download the slides as a PDF" aria-label="Download the slides as a PDF">Download as PDF</a></p>
  <p class="footer-rights"><a class="ext" href="https://github.com/A00349034" title="github.com/A00349034">© 2026 Mark Crowe</a></p>
  <p class="deck-version-line"><a class="version-link ext" href="https://github.com/A00349034/cloud-scaling-resilience-aws/commits" title="The change history">Version <span class="deck-version">1.9.0</span></a></p>
  <p class="deck-short"><a class="ext" href="https://tinyurl.com/3r3c23hm" data-tip="tinyurl.com/3r3c23hm" data-tip-size="72"><span class="arj-icon icon-tinyurl"></span>tinyurl.com/<b>3r3c23hm</b></a></p>
  <p class="deck-url"><a class="ext" href="https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/">a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck</a></p>
</footer>

---

## About the author
<!-- no-number -->
<!-- .slide: id="about" class="about-slide" data-note="2a" -->

<div class="about-grid">
<div class="about-me">
<p class="author-name"><a class="ext" href="https://github.com/A00349034" title="github.com/A00349034"><img class="inline-logo" src="src/img/logo/mc-logo.png" alt="" />Mark Crowe</a></p>
<h3 class="about-head">Qualifications</h3>
<ul class="quals">
<li class="qual-msc">MSc in Software Design with Cloud Computing (2027)</li>
<li class="qual-bsc">BSc in Computer Systems</li>
</ul>
<ul class="contact no-link-icon">
<li class="contact-github"><a href="https://github.com/A00349034" aria-label="GitHub">github.com/A00349034</a></li>
<li class="contact-mail"><a class="mail-text" data-mail="ei.kooltuo@43094300A" aria-label="Email Mark Crowe"></a></li>
</ul>
</div>
<div class="about-stack">
<h3 class="about-head">Languages</h3>
<ul class="stack" aria-label="Programming languages">
<li class="stack-cpp">C++</li>
<li class="stack-csharp">C#</li>
<li class="stack-java">Java</li>
<li class="stack-javascript">JavaScript</li>
<li class="stack-python">Python</li>
<li class="stack-typescript">TypeScript</li>
</ul>
<h3 class="about-head">Frameworks, data and tools</h3>
<ul class="stack" aria-label="Frameworks, data and tools">
<li class="stack-dotnet">.NET</li>
<li class="stack-maui">.NET MAUI</li>
<li class="stack-bigdata">Big Data</li>
<li class="stack-django">Django</li>
<li class="stack-jupyter">Jupyter Notebooks</li>
<li class="stack-mysql">MySQL</li>
<li class="stack-revealjs">Reveal.js</li>
<li class="stack-spring">Spring</li>
</ul>
</div>
</div>

---

<p class="eyebrow">01 · Design</p>

## Three tiers, two zones, one public entry
<!-- .slide: id="design" data-note="2" -->

<div class="mermaid">
flowchart LR
  C@{ icon: "mdi:laptop", form: "circle", label: "Client<br>k6 on laptop", pos: "b", h: 56 }
  subgraph VPC["Own VPC · two Availability Zones"]
    subgraph PUB["Public subnets"]
      A@{ icon: "logos:aws-elb", form: "rounded", label: "Application<br>Load Balancer", pos: "b", h: 56 }
    end
    subgraph APP["Private app subnets"]
      subgraph ASG["Product × N · Auto Scaling group"]
        P1@{ icon: "logos:aws-ec2", form: "rounded", label: "Product", pos: "b", h: 48 }
        P2@{ icon: "logos:aws-ec2", form: "rounded", label: "Product", pos: "b", h: 48 }
      end
      K@{ icon: "logos:aws-ec2", form: "rounded", label: "Coupon × 1", pos: "b", h: 48 }
    end
    subgraph DB["Private DB subnets · no internet route"]
      D1@{ icon: "logos:aws-rds", form: "rounded", label: "MySQL primary", pos: "b", h: 48 }
      D2@{ icon: "logos:aws-rds", form: "rounded", label: "Standby", pos: "b", h: 48 }
    end
  end
  C --> A
  A --> P1 & P2
  P1 -- "writes" --> K
  P2 --> K
  P1 & P2 & K --> D1
  D1 -. "copy" .-> D2
  style ASG stroke:#67d8d0,stroke-width:3px
</div>

<p class="fig-caption"><a class="ref media" href="#/figures"><sup>1</sup></a> – The architecture as built on November 11 (sets A and B). Only the load balancer is public; only the Product tier (outlined) changes</p>

- **Changed between tests:** the number of Product instances (1, 2, or scaled automatically)
- **Single in every test:** Coupon. The database has a standby copy in the other zone (Multi-AZ<a class="ref" href="#/references"><sup>4</sup></a>)
- **First design (set 0, November 9-10):** AWS's default network, public instance addresses, no database standby

---<!--L2-->

<p class="eyebrow">01.1 · Design</p>

## On the AWS console: one healthy target
<!-- .slide: id="console" -->

<figure class="console-shot"><img src="src/img/console-target-group.png" alt="AWS console, target group tus-ca1-product-tg: 1 target, healthy" /></figure>

<p class="fig-caption"><a class="ref media" href="#/figures"><sup>2</sup></a> – The load balancer's target group in the set 0 elasticity run, before scale-out: one Product instance, healthy. Health checks decide where requests go<a class="ref" href="#/references"><sup>1</sup></a></p>

---

<p class="eyebrow">02 · Method</p>

## A controlled comparison, three times
<!-- .slide: id="method" data-note="3" -->

<div class="three steps">
<div><h3 class="ic-server"><span class="number">1</span>Baseline</h3><p>One Product instance<br>Scaling off</p></div>
<div><h3 class="ic-scale-balance"><span class="number">2</span>Compare</h3><p>Two instances<br>Same workload and data</p></div>
<div><h3 class="ic-server-remove"><span class="number">3</span>Disrupt</h3><p>Automatic scaling, lose an instance<br>Stop Coupon, fail over the database</p></div>
</div>

- **Three sets:** set 0 (first design, November 9-10); set A (new design, standard CPU credits); set B (new design, unlimited CPU credits). A t3.micro earns CPU credits while idle; with standard credits and none left, its CPU is held at 10%<a class="ref" href="#/references"><sup>3</sup></a>
- **p95, the [95th percentile](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Statistics-definitions.html)<a class="ref" href="#/references"><sup>9</sup></a>:** 95% of requests finished faster than this time, measured by [k6](https://grafana.com/docs/k6/latest/) (a load-testing tool) on the laptop<a class="ref" href="#/references"><sup>6</sup></a>
- **Kept the same:** instance type, workload (k6, <code>GET /productapi/products</code>), data size (20 products), client location

---

<p class="eyebrow">03 · Measured capacity</p>

## Two instances doubled capacity, once CPU was not capped
<!-- .slide: id="capacity" data-note="4" -->

| At 400 users                       | Requests per second, 1 instance | Requests per second, 2 instances | Client p95, 1 → 2 instances |
|------------------------------------|--------------------------------:|---------------------------------:|----------------------------:|
| Set 0: first design                |                           1,170 |                            1,171 |                534 → 577 ms |
| Set A: standard credits, none left |                             433 |                              861 |            3,290 → 1,910 ms |
| Set B: unlimited credits           |                           1,438 |                            2,483 |                742 → 435 ms |

- **Set A:** CPU held at 10%, so one instance stopped at about 430 requests per second, and two capped instances doubled that<a class="ref" href="#/references"><sup>3</sup></a>
- **Set B:** two instances served 1.7 times as many requests, and client p95 fell by 41%

---<!--L2-->

<p class="eyebrow">03.1 · Measured capacity</p>

## Set B reached twice the set 0 ceiling, from the same laptop
<!-- .slide: id="one-vs-two" data-note="4a" -->

<div class="echart chart-short" data-chart="oneVsTwo" role="img" aria-label="Requests per second and client p95 against virtual users, one and two Product instances, sets 0 and B"></div>

<div class="fig-meta">
<p class="fig-caption"><a class="ref media" href="#/figures"><sup>3</sup></a> – <code>GET /productapi/products</code> from the laptop, 10 to 400 users, 1 minute each. Dashed: set 0; solid: set B</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="one-vs-two" title="Dataset 1: the numbers behind this figure">1</a> – <span class="csv-name">one-vs-two.csv</span></p>
</div>

---

<p class="eyebrow">04 · Elasticity</p>

## Scale-out took about 5 minutes, or never happened
<!-- .slide: id="elasticity" data-note="5" -->

| From the load increase    |  Set 0 |       Set A |  Set B |
|---------------------------|-------:|------------:|-------:|
| Desired capacity 1 → 2    | 4m 19s |       never | 3m 20s |
| New instance healthy      | 5m 51s |           – | 4m 55s |
| Product CPU, one instance | 56-64% | 10%, capped | 72-76% |
| Client p95, whole run     | 361 ms |    5,572 ms | 231 ms |

- **Target tracking** on average CPU at 30%, minimum 1, maximum 2 instances, 200 users for 14 minutes<a class="ref" href="#/references"><sup>2</sup></a>
- **Set A never scaled out:** CPU was held at 10%, under the 30% target, so the policy saw nothing to act on

---<!--L2-->

<p class="eyebrow">04.1 · Elasticity</p>

## Set 0: the events in order
<!-- .slide: id="elasticity-events" data-note="5a" -->

<div class="mermaid">
%%{init: {"themeVariables": {"fontSize": "20px"}}}%%
timeline
  section One instance, waiting for the alarm (4m 19s)
    19∶10∶29 : ▶️ 200 users start
    19∶11∶00 : ⚠️ CPU over the 30% target
  section Second instance starting (1m 31s)
    19∶14∶48 : 🔔 Alarm : Desired 1 → 2
  section Two instances serving
    19∶16∶20 : ✅ New instance healthy
    19∶17∶00 : 📉 Server p95 down by about 55%
    19∶24∶32 : ⏹️ Load ends
</div>

<div class="fig-meta">
<p class="fig-caption"><a class="ref media" href="#/figures"><sup>4</sup></a> – Elasticity events, set 0 (UTC): 200 users, CPU target 30%<a class="ref" href="#/references"><sup>2</sup></a>, min 1, max 2</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="elasticity-events" title="Dataset 2: the numbers behind this figure">2</a> – <span class="csv-name">elasticity-events.csv</span></p>
</div>

---<!--L2-->

<p class="eyebrow">04.2 · Elasticity</p>

## Set 0: what CloudWatch saw
<!-- .slide: id="elasticity-cloudwatch" data-note="5b" -->

<div class="echart chart-tall" data-chart="elasticity" role="img" aria-label="Product CPU, load balancer response time, capacity and database CPU during the elasticity run"></div>

<div class="fig-meta">
<p class="fig-caption"><a class="ref media" href="#/figures"><sup>5</sup></a> – Set 0, 1-minute data from <a href="https://aws.amazon.com/cloudwatch/">Amazon CloudWatch</a>, the AWS monitoring service</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="elasticity-cloudwatch" title="Dataset 3: the numbers behind this figure">3</a> – <span class="csv-name">elasticity-cloudwatch.csv</span></p>
</div>

---

<p class="eyebrow">05 · Resilience</p>

## Losing an instance cost 1.3% of requests
<!-- .slide: id="failure" data-note="6" -->

<div class="echart chart-short" data-chart="failure" role="img" aria-label="Client requests per second, failed requests and p95 around the failure"></div>

<div class="fig-meta">
<p class="fig-caption"><a class="ref media" href="#/figures"><sup>6</sup></a> – Set 0: 100 users, 2 instances, one terminated at 18:59:20. k6 requests in 5-second windows</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="failure-client-5s" title="Dataset 4: the numbers behind this figure">4</a> – <span class="csv-name">failure-client-5s.csv</span></p>
</div>

- **Every set: 1.3% of requests failed.** The load balancer kept the dead instance for 21-28 seconds, until its health checks failed<a class="ref" href="#/references"><sup>1</sup></a>
- **Replacement healthy:** 2m 15s with unlimited credits; about 7 minutes with standard credits (CPU held at 10%)<a class="ref" href="#/references"><sup>3</sup></a>

---<!--L2-->

<p class="eyebrow">05.1 · Resilience</p>

## Set 0: the events in order
<!-- .slide: id="failure-events" data-note="6a" -->

<div class="mermaid">
%%{init: {"themeVariables": {"fontSize": "20px"}}}%%
timeline
  section Errors (30s)
    18∶59∶20 : ❌ Instance terminated : ⚠️ 4,180 failed requests in 10s
    18∶59∶47 : 🚫 Dead target removed, 27s later
  section One instance carries the load (6m 23s)
    18∶59∶50 : ✅ Errors stop
    19∶00∶17 : 🔔 Auto Scaling notices, 57s
    19∶00∶30 : 🔄 Replacement starts : 🐢 CPU held at 10%
  section Two instances again
    19∶06∶13 : ✅ Replacement healthy, 6m 53s
</div>

<div class="fig-meta">
<p class="fig-caption"><a class="ref media" href="#/figures"><sup>7</sup></a> – Failure events, set 0 (UTC): the client recovered in seconds, full capacity took almost 7 minutes</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="failure-events" title="Dataset 5: the numbers behind this figure">5</a> – <span class="csv-name">failure-events.csv</span></p>
</div>

---

<p class="eyebrow">06 · Dependencies</p>

## When a shared dependency fails
<!-- .slide: id="dependencies" data-note="7" -->

|                  | Coupon stopped (H06), sets 0, A, B | Database failover (H07), sets A, B |
|------------------|------------------------------------|------------------------------------|
| Reads            | 0% failed                          | 0-0.01% failed                     |
| Writes           | 20 of 20 failed, in every set      | 1 failed; working again after 20 s |
| Back to normal   | 13-18 s after Coupon restarted     | Standby took over in 40-59 s       |
| Product instance | Stayed healthy                     | Stayed healthy                     |

- **Coupon:** Product's health check did not notice, so the load balancer kept sending writes to it. More Product instances cannot help
- **Database:** Multi-AZ switched to the standby, with the same address<a class="ref" href="#/references"><sup>4</sup></a>; Product reconnected without a restart

---

<p class="eyebrow">07 · Whole system</p>

## What remains limited?
<!-- .slide: id="limits" data-note="8" -->

<div class="two limits">
<div class="mermaid">
flowchart LR
  C@{ icon: "mdi:laptop", form: "circle", label: "Laptop, network", pos: "b", h: 40 }
  P@{ icon: "logos:aws-ec2", form: "rounded", label: "Product × 2, t3.micro", pos: "b", h: 40 }
  K@{ icon: "logos:aws-ec2", form: "rounded", label: "Coupon × 1", pos: "b", h: 40 }
  D@{ icon: "logos:aws-rds", form: "rounded", label: "MySQL, shared", pos: "b", h: 40 }
  C --> P
  P --> K
  P --> D
  K --> D
</div>
<ul class="icon-list">
<li class="ic-speedometer"><span><b>CPU credits:</b> with none left, one instance served 433 requests per second instead of 1,438, and scaling never started</span></li>
<li class="ic-database"><span><b>Database:</b> shared by every instance; its CPU rose from 41% to 70% with two instances</span></li>
<li class="ic-ticket-percent"><span><b>Coupon:</b> one instance on the write path; stopped, every write failed</span></li>
<li class="ic-timer-sand"><span><b>Start-up:</b> about 2 minutes with unlimited credits, about 7 with standard credits</span></li>
</ul>
</div>

<p class="caption">Above: what every Product instance depends on. A single dependency is a risk; it is only a bottleneck where the data shows saturation.</p>

---

<p class="eyebrow">08 · Engineering judgement</p>

## What do you see?
<!-- .slide: id="answer" data-note="9" -->

<p class="answer-big">The answer.</p>

<div class="three answer">
<div><h3 class="ic-chart-line">Scalability</h3><p>With unlimited credits, two instances served 1.7 times as many requests and p95 fell 41%. With credits used up, CPU was capped and scaling never started</p></div>
<div><h3 class="ic-shield-refresh">Resilience</h3><p>Losing an instance cost 1.3% of requests; a database failover cost one write. A stopped Coupon broke every write</p></div>
<div><h3 class="ic-lightbulb-on-outline">Next improvement</h3><p>Minimum 2 Product from a pre-built image, unlimited credits, Coupon in each zone, a paged product list; then run k6 inside AWS</p></div>
</div>

<figure class="answer-meme"><img src="src/img/memes/the-answer-x-men-apocalypse-2016-imdb-tt3385516-time-01-10-18.png" alt="Film still from X-Men: Apocalypse (2016), subtitle: The answer." />
<figcaption class="fig-caption"><a class="ref media" href="#/figures"><sup>8</sup></a> – X-Men: Apocalypse (2016)</figcaption></figure>

<p class="caption">Already built: private subnets and a Multi-AZ database, at about USD 32-35 a month for each NAT gateway<a class="ref" href="#/references"><sup>5</sup></a>. Details: <a href="../report.md#54-one-next-improvement-complete-the-target-design">report, section 5.4</a></p>

---

## Thanks for coming to my TED Talk
<!-- no-number -->
<!-- .slide: id="finish" class="finish-slide" data-note="10" -->

### <span class="finish-emoji" aria-hidden="true">🎤</span>Questions? <span class="mail-icon" aria-hidden="true"></span>Email me
<!-- .element: class="finish-questions" -->

<p class="finish-mail"><a class="mail-text" data-mail="ei.kooltuo@43094300A" aria-label="Email Mark Crowe"></a></p>

- The full report: [report.md](../report.md) · <a href="../report.pdf" download="CA1 Mark Crowe report.pdf">Download the report as a PDF</a>
- References, figures, software and links are below ↓, and → to exit

---<!--L2-->

## References
<!-- no-number -->
<!-- .slide: id="references" -->

<ol class="reflist">
<li data-n="1"><a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html">Amazon Web Services. Health checks for Application Load Balancer target groups. Elastic Load Balancing User Guide</a></li>
<li data-n="2"><a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html">Amazon Web Services. Target tracking scaling policies for Amazon EC2 Auto Scaling. Amazon EC2 Auto Scaling User Guide</a></li>
<li data-n="3"><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances-unlimited-mode.html">Amazon Web Services. Unlimited mode for burstable performance instances. Amazon EC2 User Guide</a></li>
<li data-n="4"><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html">Amazon Web Services. Multi-AZ DB instance deployments for Amazon RDS. Amazon RDS User Guide</a></li>
<li data-n="5"><a href="https://aws.amazon.com/vpc/pricing/">Amazon Web Services. Amazon VPC pricing (NAT gateway)</a></li>
<li data-n="6"><a href="https://grafana.com/docs/k6/latest/using-k6/metrics/">Grafana Labs. k6 documentation: metrics (http_req_duration, p95)</a></li>
<li data-n="7"><a href="https://mermaid.js.org/">Mermaid. Diagrams and charts from text (version 12.3)</a></li>
<li data-n="8"><a href="https://echarts.apache.org/">Apache ECharts. Interactive charts in the browser (version 5.5)</a></li>
<li data-n="9"><a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Statistics-definitions.html">Amazon Web Services. CloudWatch statistics definitions: percentiles (p95). Amazon CloudWatch User Guide</a></li>
</ol>

---<!--L2-->

## Figures
<!-- no-number -->
<!-- .slide: id="figures" -->

<ol class="reflist media-list">
<li data-m="1"><a href="#/design">The architecture as built: three tiers across two zones</a></li>
<li data-m="2"><a href="#/console">The load balancer's target group on the AWS console (set 0)</a></li>
<li data-m="3"><a href="#/one-vs-two">One versus two Product instances, sets 0 and B: requests per second and client p95 against users</a></li>
<li data-m="4"><a href="#/elasticity-events">Elasticity, set 0: the events in order</a></li>
<li data-m="5"><a href="#/elasticity-cloudwatch">Elasticity, set 0: Product CPU, response time, capacity and RDS CPU</a></li>
<li data-m="6"><a href="#/failure">Failure, set 0: client requests per second, failed requests and p95</a></li>
<li data-m="7"><a href="#/failure-events">Failure, set 0: the events in order</a></li>
<li data-m="8"><a href="#/answer">X-Men: Apocalypse (2016), film still</a></li>
</ol>

<p class="caption">The charts are drawn in the browser from <a href="data/ca1-charts.json">ca1-charts.json</a>, made by <a href="../../scripts/ca1_chart_data.py">ca1_chart_data.py</a> from the saved data in <a class="folder" href="../../test-results/">test-results</a>. The data behind each figure: <a href="#/data">Data sets</a>; the notebook <a href="../../data/notebooks/make_charts.ipynb">make_charts.ipynb</a> shows the numbers and draws the report's charts.</p>

---<!--L2-->

## Data sets
<!-- no-number -->
<!-- .slide: id="data" -->

<table class="data-sets no-link-icon">
<thead><tr><th>Dataset</th><th>File</th><th>Description</th><th class="num">Data rows</th><th>Figure</th><th><span class="sr-only">View</span></th><th><span class="sr-only">Download</span></th></tr></thead>
<tbody>
<tr data-set="one-vs-two"><td class="set-no">1</td><td><span class="csv-name">one-vs-two.csv</span></td><td class="set-desc">One Product instance versus two, sets 0 and B: requests per second and client p95 by users</td><td class="num">24</td><td><a class="fig-link" href="#/one-vs-two">3</a></td><td class="view"><a class="md-view" href="../../data/markdown/one-vs-two.md">View</a></td><td class="download"><a class="csv-download" href="../../data/csv/one-vs-two.csv" download>Download</a></td></tr>
<tr data-set="elasticity-events"><td class="set-no">2</td><td><span class="csv-name">elasticity-events.csv</span></td><td class="set-desc">Elasticity: the events in order</td><td class="num">6</td><td><a class="fig-link" href="#/elasticity-events">4</a></td><td class="view"><a class="md-view" href="../../data/markdown/elasticity-events.md">View</a></td><td class="download"><a class="csv-download" href="../../data/csv/elasticity-events.csv" download>Download</a></td></tr>
<tr data-set="elasticity-cloudwatch"><td class="set-no">3</td><td><span class="csv-name">elasticity-cloudwatch.csv</span></td><td class="set-desc">Elasticity: CloudWatch, 1-minute points</td><td class="num">134</td><td><a class="fig-link" href="#/elasticity-cloudwatch">5</a></td><td class="view"><a class="md-view" href="../../data/markdown/elasticity-cloudwatch.md">View</a></td><td class="download"><a class="csv-download" href="../../data/csv/elasticity-cloudwatch.csv" download>Download</a></td></tr>
<tr data-set="failure-client-5s"><td class="set-no">4</td><td><span class="csv-name">failure-client-5s.csv</span></td><td class="set-desc">Failure: k6 requests in 5-second windows</td><td class="num">72</td><td><a class="fig-link" href="#/failure">6</a></td><td class="view"><a class="md-view" href="../../data/markdown/failure-client-5s.md">View</a></td><td class="download"><a class="csv-download" href="../../data/csv/failure-client-5s.csv" download>Download</a></td></tr>
<tr data-set="failure-events"><td class="set-no">5</td><td><span class="csv-name">failure-events.csv</span></td><td class="set-desc">Failure: the events in order</td><td class="num">6</td><td><a class="fig-link" href="#/failure-events">7</a></td><td class="view"><a class="md-view" href="../../data/markdown/failure-events.md">View</a></td><td class="download"><a class="csv-download" href="../../data/csv/failure-events.csv" download>Download</a></td></tr>
</tbody>
</table>

<p class="caption">View: the data as a table, with what each column means. Download: the CSV file. Made by <a href="../../scripts/csv_markdown.py">csv_markdown.py</a>; all data sets: <a href="../../data/readme.md">readme.md</a></p>
<p class="caption related">Report: <a href="../report.md">report.md</a> · Slides: <a href="slides.md">slides.md</a> · Code: <a class="folder" href="../../scripts/">scripts</a> · Evidence: <a class="folder" href="../../test-results/">test-results</a></p>

---<!--L2-->

## Software used
<!-- no-number -->
<!-- .slide: id="software" -->

<div class="software-list">
<div class="col">
<div><h3 class="ic-application-brackets-outline">Applications</h3>
<ul><li><a href="https://aws.amazon.com/cli/">AWS CLI v2</a></li><li><a href="https://www.docker.com/">Docker</a></li><li><a href="https://aws.amazon.com/corretto/">Java 17 (Amazon Corretto)</a></li><li><a href="https://spring.io/projects/spring-boot">Spring Boot 4.1</a></li></ul></div>
<div><h3 class="ic-aws">AWS</h3>
<ul><li><a href="https://aws.amazon.com/elasticloadbalancing/application-load-balancer/">Application Load Balancer</a></li><li><a href="https://aws.amazon.com/cloudwatch/">CloudWatch</a></li><li><a href="https://aws.amazon.com/ec2/">EC2</a></li><li><a href="https://aws.amazon.com/ec2/autoscaling/">EC2 Auto Scaling</a></li><li><a href="https://aws.amazon.com/rds/mysql/">RDS for MySQL</a></li><li><a href="https://aws.amazon.com/systems-manager/">Systems Manager</a></li></ul></div>
</div>
<div class="col">
<div><h3 class="ic-chart-box-outline">Data and charts</h3>
<ul><li><a href="https://jupyter.org/">Jupyter</a></li><li><a href="https://matplotlib.org/">matplotlib</a></li><li><a href="https://pandas.pydata.org/">pandas</a></li><li><a href="https://www.python.org/">Python</a></li></ul></div>
<div><h3 class="ic-sitemap-outline">Diagrams and slides</h3>
<ul><li><a href="https://echarts.apache.org/">Apache ECharts 5.5</a></li><li><a href="https://www.npmjs.com/package/apocalypse-reveal-js">ARJ 1.8</a></li><li><a href="https://mermaid.js.org/">Mermaid 12.3</a></li><li><a href="https://revealjs.com/">Reveal.js 5.1</a></li></ul></div>
</div>
<div class="col">
<div><h3 class="ic-speedometer">Load testing</h3>
<ul><li><a href="https://grafana.com/oss/k6/">Grafana k6</a></li></ul></div>
<div><h3 class="ic-script-text-outline">Scripts</h3>
<ul><li><a href="https://learn.microsoft.com/powershell/">PowerShell 7</a></li></ul></div>
<div><h3 class="ic-video-outline">Video</h3>
<ul><li><a href="https://ffmpeg.org/">ffmpeg</a></li><li><a href="https://pptr.dev/">Puppeteer</a></li><li><a href="https://www.python.org/">Python</a></li></ul></div>
</div>
</div>

---<!--L2-->

## Links
<!-- no-number -->
<!-- .slide: id="links" -->

- Report: [report.md](../report.md) · <a href="../report.pdf" download="CA1 Mark Crowe report.pdf">Download the report as a PDF</a>
- These slides: [slides.md](slides.md), narration [speaking-script.md](speaking-script.md) · <a href="src/pdf/cloud-scalability-resilience-mark-crowe-2026.pdf" download="cloud-scalability-resilience-mark-crowe-2026.pdf">Download the slides as a PDF</a>
- Code and evidence: [github.com/A00349034/cloud-scaling-resilience-aws](https://github.com/A00349034/cloud-scaling-resilience-aws)
- Notes: © 2026 Mark Crowe. AWS service and software icons from Iconify's "logos" pack (CC0) and Devicon (MIT); other icons Material Design Icons (Apache 2.0); site icons belong to their sites; reveal.js © Hakim El Hattab, MIT licence. Generative AI (Claude) helped build the scripts, diagrams and slides; all measurements are from my own AWS deployment

---

<div class="exit-card"><div class="exit-rings"><img src="src/img/logo/mc-logo-circle.png" alt="" /></div></div>

## That's all, folks❗
<!-- .element: class="exit-words" -->
<!-- no-number -->
<!-- .slide: id="exit" class="exit-slide" -->

<p class="exit-now"><button type="button" data-deck-exit>Click here to exit</button></p>

<p class="exit-note">Closes this tab, or goes back to the page before the slides</p>
