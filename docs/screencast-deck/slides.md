
# Cloud Scalability and Resilience on AWS
<!-- .slide: id="title" class="title-slide arj-title" data-note="1" -->

<div class="title-body no-link-icon">
  <figure class="deck-qr"><img src="src/img/qr/deck-qr.svg" alt="QR code: these slides online, a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck" />
    <figcaption class="byline"><span class="calendar" aria-hidden="true">📅</span><a class="ext date-link" href="https://github.com/A00349034/cloud-scaling-resilience-aws/commits" title="Version 1.8.2: the change history"><time class="deck-date" datetime="2026-11-10T05:00:00+00:00">November 2026</time></a></figcaption>
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
  <p class="deck-version-line"><a class="version-link ext" href="https://github.com/A00349034/cloud-scaling-resilience-aws/commits" title="The change history">Version <span class="deck-version">1.8.2</span></a></p>
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

## One endpoint, shared dependencies
<!-- .slide: id="design" data-note="2" -->

<div class="mermaid">
flowchart LR
  C@{ icon: "mdi:laptop", form: "circle", label: "Client<br>k6 on laptop", pos: "b", h: 64 }
  subgraph AWS["AWS eu-west-1"]
    A@{ icon: "logos:aws-elb", form: "rounded", label: "Application Load Balancer<br>health checks", pos: "b", h: 64 }
    subgraph ASG["Product × N · Auto Scaling group"]
      P1@{ icon: "logos:aws-ec2", form: "rounded", label: "Product", pos: "b", h: 56 }
      P2@{ icon: "logos:aws-ec2", form: "rounded", label: "Product", pos: "b", h: 56 }
    end
    K@{ icon: "logos:aws-ec2", form: "rounded", label: "Coupon × 1", pos: "b", h: 56 }
    D@{ icon: "logos:aws-rds", form: "rounded", label: "MySQL × 1<br>RDS, single AZ", pos: "b", h: 64 }
  end
  C --> A
  A --> P1 & P2
  P1 -- "writes" --> K
  P2 --> K
  P1 -- "reads and writes" --> D
  P2 --> D
  K --> D
  style ASG stroke:#67d8d0,stroke-width:3px
</div>

<p class="fig-caption"><a class="ref media" href="#/figures"><sup>1</sup></a> – The architecture as tested. Only the Product tier (outlined) changes</p>

- **Changed between tests:** the number of Product instances (1, 2, or scaled automatically)
- **Kept single in every test:** Coupon and the database

---<!--L2-->

<p class="eyebrow">01.1 · Design</p>

## On the AWS console: one healthy target
<!-- .slide: id="console" -->

<figure class="console-shot"><img src="src/img/console-target-group.png" alt="AWS console, target group tus-ca1-product-tg: 1 target, healthy" /></figure>

<p class="fig-caption"><a class="ref media" href="#/figures"><sup>2</sup></a> – The load balancer's target group in the elasticity run, before scale-out: one Product instance, healthy. Health checks decide where requests go<a class="ref" href="#/references"><sup>1</sup></a></p>

---

<p class="eyebrow">02 · Method</p>

## A controlled comparison
<!-- .slide: id="method" data-note="3" -->

<div class="three steps">
<div><h3 class="ic-server"><span class="number">1</span>Baseline</h3><p>One Product instance<br>Scaling off</p></div>
<div><h3 class="ic-scale-balance"><span class="number">2</span>Compare</h3><p>Two instances<br>Same workload and data</p></div>
<div><h3 class="ic-server-remove"><span class="number">3</span>Disrupt</h3><p>Automatic scaling<br>Terminate an instance</p></div>
</div>

- **Measured:** requests per second, p95 response time, errors, CPU, event times
- **p95, the [95th percentile](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Statistics-definitions.html)<a class="ref" href="#/references"><sup>9</sup></a>:** 95% of requests finished faster than this time. **Client p95** is measured by [k6](https://grafana.com/docs/k6/latest/) (a load-testing tool) on the laptop, network included; **server p95** by the load balancer, network excluded<a class="ref" href="#/references"><sup>6</sup></a>
- **Kept the same:** instance type, workload (k6, <a href="http://localhost:9090/productapi/products">list products</a>, <code>GET /productapi/products</code>), data size (20 products), client location

---

<p class="eyebrow">03 · Measured capacity</p>

## One Product instance versus two
<!-- .slide: id="one-vs-two" data-note="4" -->

| Product instances (200 users) | Requests per second | Client p95 | Server p95 | Product CPU | Errors |
|-------------------------------|--------------------:|-----------:|-----------:|-------------|-------:|
| 1                             |               1,020 |     295 ms |      45 ms | 43%         |  0.27% |
| 2                             |               1,014 |     366 ms |      29 ms | 22% + 20%   |  0.26% |

<div class="echart chart-short" data-chart="oneVsTwo" role="img" aria-label="Requests per second and client p95 against virtual users, one and two Product instances"></div>

<p class="fig-caption"><a class="ref media" href="#/figures"><sup>3</sup></a> – <a href="http://localhost:9090/productapi/products">List products</a> (<code>GET /productapi/products</code>) from the laptop, 20 products, 10 to 400 users, 1 minute each</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="one-vs-two">Dataset 1</a>, <span class="csv-name">one-vs-two.csv</span></p>

---

<p class="eyebrow">04 · Elasticity</p>

## New capacity came almost 6 minutes after the load
<!-- .slide: id="elasticity" data-note="5" -->

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

<p class="fig-caption"><a class="ref media" href="#/figures"><sup>4</sup></a> – Elasticity events (UTC): 200 users, CPU target 30%<a class="ref" href="#/references"><sup>2</sup></a>, min 1, max 2</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="elasticity-events">Dataset 2</a>, <span class="csv-name">elasticity-events.csv</span></p>

- **Almost 6 minutes** from the load to useful capacity: 4m 19s waiting for the alarm, 1m 31s for the new instance to start
- The server got faster; the client gained only 7%

---<!--L2-->

<p class="eyebrow">04.1 · Elasticity</p>

## What CloudWatch saw
<!-- .slide: id="elasticity-cloudwatch" data-note="5a" -->

<div class="echart chart-tall" data-chart="elasticity" role="img" aria-label="Product CPU, load balancer response time, capacity and database CPU during the elasticity run"></div>

<p class="fig-caption"><a class="ref media" href="#/figures"><sup>5</sup></a> – 1-minute data from <a href="https://aws.amazon.com/cloudwatch/">Amazon CloudWatch</a>, the AWS monitoring service</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="elasticity-cloudwatch">Dataset 3</a>, <span class="csv-name">elasticity-cloudwatch.csv</span></p>

---

<p class="eyebrow">05 · Resilience</p>

## Failure: what did the client see?
<!-- .slide: id="failure" data-note="6" -->

<div class="echart chart-short" data-chart="failure" role="img" aria-label="Client requests per second, failed requests and p95 around the failure"></div>

<p class="fig-caption"><a class="ref media" href="#/figures"><sup>6</sup></a> – 100 users, 2 instances, one terminated at 18:59:20. k6 requests in 5-second windows</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="failure-client-5s">Dataset 4</a>, <span class="csv-name">failure-client-5s.csv</span></p>

- **In the first 10 seconds, there were 4,180 failed requests.** Normal on one instance after about 30 seconds<a class="ref" href="#/references"><sup>1</sup></a>
- **Replacement healthy after 6m 53s:** its CPU was held at 10% by standard CPU credits<a class="ref" href="#/references"><sup>3</sup></a>

---<!--L2-->

<p class="eyebrow">05.1 · Resilience</p>

## Failure: the events in order
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

<p class="fig-caption"><a class="ref media" href="#/figures"><sup>7</sup></a> – Failure events (UTC): the client recovered in seconds, full capacity took almost 7 minutes</p>
<p class="fig-data"><a class="data-link" href="#/data" data-set="failure-events">Dataset 5</a>, <span class="csv-name">failure-events.csv</span></p>

---

<p class="eyebrow">06 · Whole system</p>

## What remains limited?
<!-- .slide: id="limits" data-note="7" -->

<div class="two limits">
<div class="mermaid">
flowchart LR
  C@{ icon: "mdi:laptop", form: "circle", label: "Laptop, network", pos: "b", h: 40 }
  P@{ icon: "logos:aws-ec2", form: "rounded", label: "Product × 2", pos: "b", h: 40 }
  K@{ icon: "logos:aws-ec2", form: "rounded", label: "Coupon × 1", pos: "b", h: 40 }
  D@{ icon: "logos:aws-rds", form: "rounded", label: "MySQL × 1, one zone", pos: "b", h: 40 }
  C --> P
  P --> K
  P --> D
  K --> D
</div>
<ul class="icon-list">
<li class="ic-laptop"><span><b>My laptop and network:</b> server p95 was only 5-15% of client p95; the mobile network changed my address</span></li>
<li class="ic-database"><span><b>Database:</b> one shared RDS instance in one Availability Zone, CPU up to 48%</span></li>
<li class="ic-ticket-percent"><span><b>Coupon:</b> one instance on the write path; tested locally, writes fail when it stops</span></li>
<li class="ic-timer-sand"><span><b>Start-up:</b> 1.5 minutes with unlimited CPU credits, 6 minutes with standard credits</span></li>
</ul>
</div>

<p class="caption">Above: the parts that stayed single. A single dependency is a risk; it is only a bottleneck where the data shows saturation.</p>

---

<p class="eyebrow">07 · Engineering judgement</p>

## Answer
<!-- .slide: id="answer" data-note="8" -->

<div class="three answer">
<div><h3 class="ic-chart-line">Scalability</h3><p>Product CPU halved and server p95 fell 36-55%, but the client saw no gain: my laptop was the limit</p></div>
<div><h3 class="ic-shield-refresh">Resilience</h3><p>Survived losing an instance after about 30 s of errors; full capacity back after 7 min</p></div>
<div><h3 class="ic-lightbulb-on-outline">Next improvement</h3><p>Three tiers across two zones: private subnets, Multi-AZ RDS<a class="ref" href="#/references"><sup>4</sup></a>, Coupon in each zone, min 2 Product from a pre-baked image; then run k6 inside AWS</p></div>
</div>

<p class="caption">The cost: about USD 32-35 a month for each NAT gateway<a class="ref" href="#/references"><sup>5</sup></a>, and more to configure. Details: <a href="../report.md#54-one-next-improvement-a-three-tier-design-across-two-availability-zones">report, section 5.4</a></p>

---

## Thanks for coming to my TED Talk
<!-- no-number -->
<!-- .slide: id="finish" class="finish-slide" data-note="9" -->

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
<li data-m="1"><a href="#/design">The architecture as tested</a></li>
<li data-m="2"><a href="#/console">The load balancer's target group on the AWS console</a></li>
<li data-m="3"><a href="#/one-vs-two">One versus two Product instances: requests per second and client p95 against users</a></li>
<li data-m="4"><a href="#/elasticity">Elasticity: the events in order</a></li>
<li data-m="5"><a href="#/elasticity-cloudwatch">Elasticity: Product CPU, response time, capacity and RDS CPU</a></li>
<li data-m="6"><a href="#/failure">Failure: client requests per second, failed requests and p95</a></li>
<li data-m="7"><a href="#/failure-events">Failure: the events in order</a></li>
</ol>

<p class="caption">The charts are drawn in the browser from <a href="data/ca1-charts.json">ca1-charts.json</a>, made by <a href="../../scripts/ca1_chart_data.py">ca1_chart_data.py</a> from the saved data in <a class="folder" href="../../test-results/">test-results</a>. The data behind each figure: <a href="#/data">Data sets</a>; the notebook <a href="../../data/notebooks/make_charts.ipynb">make_charts.ipynb</a> shows the numbers and draws the report's charts.</p>

---<!--L2-->

## Data sets
<!-- no-number -->
<!-- .slide: id="data" -->

<table class="data-sets no-link-icon">
<thead><tr><th>Dataset</th><th>File and description</th><th class="num">Rows</th><th>Figure</th><th>Open</th></tr></thead>
<tbody>
<tr data-set="one-vs-two"><td class="set-no">Dataset 1</td><td><span class="csv-name">one-vs-two.csv</span><br><span class="set-desc">One Product instance versus two: requests per second and client p95 by users</span></td><td class="num">12</td><td><a class="fig-link" href="#/one-vs-two">3</a></td><td class="set-actions"><a class="md-view" href="../../data/markdown/one-vs-two.md">View</a> <a class="csv-download" href="../../data/csv/one-vs-two.csv" download>Download</a></td></tr>
<tr data-set="elasticity-events"><td class="set-no">Dataset 2</td><td><span class="csv-name">elasticity-events.csv</span><br><span class="set-desc">Elasticity: the events in order</span></td><td class="num">6</td><td><a class="fig-link" href="#/elasticity">4</a></td><td class="set-actions"><a class="md-view" href="../../data/markdown/elasticity-events.md">View</a> <a class="csv-download" href="../../data/csv/elasticity-events.csv" download>Download</a></td></tr>
<tr data-set="elasticity-cloudwatch"><td class="set-no">Dataset 3</td><td><span class="csv-name">elasticity-cloudwatch.csv</span><br><span class="set-desc">Elasticity: CloudWatch, 1-minute points</span></td><td class="num">134</td><td><a class="fig-link" href="#/elasticity-cloudwatch">5</a></td><td class="set-actions"><a class="md-view" href="../../data/markdown/elasticity-cloudwatch.md">View</a> <a class="csv-download" href="../../data/csv/elasticity-cloudwatch.csv" download>Download</a></td></tr>
<tr data-set="failure-client-5s"><td class="set-no">Dataset 4</td><td><span class="csv-name">failure-client-5s.csv</span><br><span class="set-desc">Failure: k6 requests in 5-second windows</span></td><td class="num">72</td><td><a class="fig-link" href="#/failure">6</a></td><td class="set-actions"><a class="md-view" href="../../data/markdown/failure-client-5s.md">View</a> <a class="csv-download" href="../../data/csv/failure-client-5s.csv" download>Download</a></td></tr>
<tr data-set="failure-events"><td class="set-no">Dataset 5</td><td><span class="csv-name">failure-events.csv</span><br><span class="set-desc">Failure: the events in order</span></td><td class="num">6</td><td><a class="fig-link" href="#/failure-events">7</a></td><td class="set-actions"><a class="md-view" href="../../data/markdown/failure-events.md">View</a> <a class="csv-download" href="../../data/csv/failure-events.csv" download>Download</a></td></tr>
</tbody>
</table>

<p class="caption">View: the data as a table, with what each column means. Download: the CSV file. Made by <a href="../../scripts/csv_markdown.py">csv_markdown.py</a>; all data sets: <a href="../../data/readme.md">readme.md</a></p>
<p class="caption related">Report: <a href="../report.md">report.md</a> · Slides: <a href="slides.md">slides.md</a> · Code: <a class="folder" href="../../scripts/">scripts</a> · Evidence: <a class="folder" href="../../test-results/">test-results</a></p>

---<!--L2-->

## Software used
<!-- no-number -->
<!-- .slide: id="software" -->

<div class="software-list">
<div><h3 class="ic-application-brackets-outline">Applications</h3>
<ul><li><a href="https://www.docker.com/">Docker</a></li><li><a href="https://aws.amazon.com/corretto/">Java 17 (Amazon Corretto)</a></li><li><a href="https://spring.io/projects/spring-boot">Spring Boot 4.1</a></li></ul></div>
<div><h3 class="ic-aws">AWS</h3>
<ul><li><a href="https://aws.amazon.com/elasticloadbalancing/application-load-balancer/">Application Load Balancer</a></li><li><a href="https://aws.amazon.com/cli/">AWS CLI v2</a></li><li><a href="https://aws.amazon.com/cloudwatch/">CloudWatch</a></li><li><a href="https://aws.amazon.com/ec2/">EC2</a></li><li><a href="https://aws.amazon.com/ec2/autoscaling/">EC2 Auto Scaling</a></li><li><a href="https://aws.amazon.com/rds/mysql/">RDS for MySQL</a></li><li><a href="https://aws.amazon.com/systems-manager/">Systems Manager</a></li></ul></div>
<div><h3 class="ic-chart-box-outline">Data and charts</h3>
<ul><li><a href="https://jupyter.org/">Jupyter</a></li><li><a href="https://matplotlib.org/">matplotlib</a></li><li><a href="https://pandas.pydata.org/">pandas</a></li><li><a href="https://www.python.org/">Python</a></li></ul></div>
<div><h3 class="ic-sitemap-outline">Diagrams and slides</h3>
<ul><li><a href="https://echarts.apache.org/">Apache ECharts 5.5</a></li><li><a href="https://www.npmjs.com/package/apocalypse-reveal-js">ARJ 1.8</a></li><li><a href="https://mermaid.js.org/">Mermaid 12.3</a></li><li><a href="https://revealjs.com/">Reveal.js 5.1</a></li></ul></div>
<div><h3 class="ic-speedometer">Load testing</h3>
<ul><li><a href="https://grafana.com/oss/k6/">Grafana k6</a></li></ul></div>
<div><h3 class="ic-script-text-outline">Scripts</h3>
<ul><li><a href="https://learn.microsoft.com/powershell/">PowerShell 7</a></li></ul></div>
<div><h3 class="ic-video-outline">Video</h3>
<ul><li><a href="https://ffmpeg.org/">ffmpeg</a></li><li><a href="https://pptr.dev/">Puppeteer</a></li><li><a href="https://www.python.org/">Python</a></li></ul></div>
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

## That's all, folks❗
<!-- no-number -->
<!-- .slide: id="exit" class="exit-slide" -->

<p class="exit-now"><button type="button" data-deck-exit>Click here to exit</button></p>

<p class="exit-note">Closes this tab, or goes back to the page before the slides</p>
