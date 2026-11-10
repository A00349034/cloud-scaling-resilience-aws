# Dataset 1: One Product instance versus two

k6 on the laptop, `GET /productapi/products`, 20 products, 10 to 400 virtual users, 1 minute at each step.

| Dataset | File                                    | Rows | Figure                                                                                                               |
|--------:|-----------------------------------------|-----:|----------------------------------------------------------------------------------------------------------------------|
|       1 | [one-vs-two.csv](../csv/one-vs-two.csv) |   12 | [Figure 3 of the slides](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/#/one-vs-two) |

- **Download:** [one-vs-two.csv](../csv/one-vs-two.csv)
- **Report:** [report.md](../../docs/report.md) · **Slides:** [the deck](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/) · **Code:** [ca1_chart_data.py](../../scripts/ca1_chart_data.py) · **Evidence:** [20261109-184043-laptop-read-1product-400users](../../test-results/20261109-184043-laptop-read-1product-400users/), [20261109-185537-laptop-read-2product-400users](../../test-results/20261109-185537-laptop-read-2product-400users/)
- This page was made by [csv_markdown.py](../../scripts/csv_markdown.py)

## Columns

| Column                | Meaning                                                                                 |
|-----------------------|-----------------------------------------------------------------------------------------|
| `product_instances`   | Product instances behind the load balancer (1 or 2)                                     |
| `virtual_users`       | k6 virtual users at this step                                                           |
| `requests_per_second` | Requests per second that k6 completed                                                   |
| `client_p95_ms`       | Client p95 response time in milliseconds: 95% of requests were faster, network included |

## Data

| product_instances | virtual_users | requests_per_second | client_p95_ms |
|------------------:|--------------:|--------------------:|--------------:|
|                 1 |            10 |               150.7 |          96.5 |
|                 1 |            25 |               276.9 |         104.8 |
|                 1 |            50 |               512.8 |         103.3 |
|                 1 |           100 |               719.6 |         137.4 |
|                 1 |           200 |              1019.9 |         294.9 |
|                 1 |           400 |              1170.4 |         533.7 |
|                 2 |            10 |               136.1 |          67.9 |
|                 2 |            25 |               287.0 |          81.7 |
|                 2 |            50 |               565.5 |         108.5 |
|                 2 |           100 |               665.5 |         209.7 |
|                 2 |           200 |              1013.9 |         366.0 |
|                 2 |           400 |              1171.5 |         577.1 |
