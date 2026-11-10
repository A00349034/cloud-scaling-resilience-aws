# Dataset 3: Elasticity: what CloudWatch saw

1-minute CloudWatch data for the elasticity run, one row per point.

| Dataset | File                                                          | Rows | Figure                                                                                                                          |
|--------:|---------------------------------------------------------------|-----:|---------------------------------------------------------------------------------------------------------------------------------|
|       3 | [elasticity-cloudwatch.csv](../csv/elasticity-cloudwatch.csv) |  134 | [Figure 5 of the slides](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/#/elasticity-cloudwatch) |

- **Download:** [elasticity-cloudwatch.csv](../csv/elasticity-cloudwatch.csv)
- **Report:** [report.md](../../docs/report.md) · **Slides:** [the deck](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/) · **Code:** [ca1_chart_data.py](../../scripts/ca1_chart_data.py) · **Evidence:** [20261109-191012-laptop-elasticity-1to2-cpu30-200users](../../test-results/20261109-191012-laptop-elasticity-1to2-cpu30-200users/)
- This page was made by [csv_markdown.py](../../scripts/csv_markdown.py)

## Columns

| Column     | Meaning                                                                                                                                             |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `time_utc` | Start of the 1-minute period (UTC)                                                                                                                  |
| `panel`    | The chart panel: cpu (Product CPU), response (load balancer response time), capacity (desired and healthy instances), database (RDS and Coupon CPU) |
| `series`   | The line in that panel; Product instances by their EC2 instance ID                                                                                  |
| `value`    | CPU in %, response time in milliseconds, or capacity as a number of instances                                                                       |

## Data

| time_utc             | panel    | series                      | value |
|----------------------|----------|-----------------------------|------:|
| 2026-11-09T19:08:00Z | cpu      | Product i-0007d1151053f0a2c |   0.7 |
| 2026-11-09T19:15:00Z | cpu      | Product i-08437e89e24c1a4e5 |   0.1 |
| 2026-11-09T19:16:00Z | cpu      | Product i-08437e89e24c1a4e5 |  73.7 |
| 2026-11-09T19:17:00Z | cpu      | Product i-08437e89e24c1a4e5 |  53.2 |
| 2026-11-09T19:18:00Z | cpu      | Product i-08437e89e24c1a4e5 |  34.1 |
| 2026-11-09T19:19:00Z | cpu      | Product i-08437e89e24c1a4e5 |  34.5 |
| 2026-11-09T19:20:00Z | cpu      | Product i-08437e89e24c1a4e5 |  31.3 |
| 2026-11-09T19:21:00Z | cpu      | Product i-08437e89e24c1a4e5 |  34.1 |
| 2026-11-09T19:22:00Z | cpu      | Product i-08437e89e24c1a4e5 |  33.5 |
| 2026-11-09T19:23:00Z | cpu      | Product i-08437e89e24c1a4e5 |  33.8 |
| 2026-11-09T19:24:00Z | cpu      | Product i-08437e89e24c1a4e5 |  22.5 |
| 2026-11-09T19:25:00Z | cpu      | Product i-08437e89e24c1a4e5 |   0.4 |
| 2026-11-09T19:08:00Z | cpu      | Product i-0ca229ce39b54ac77 |   0.6 |
| 2026-11-09T19:09:00Z | cpu      | Product i-0ca229ce39b54ac77 |   0.4 |
| 2026-11-09T19:10:00Z | cpu      | Product i-0ca229ce39b54ac77 |   1.7 |
| 2026-11-09T19:11:00Z | cpu      | Product i-0ca229ce39b54ac77 |  55.8 |
| 2026-11-09T19:12:00Z | cpu      | Product i-0ca229ce39b54ac77 |  61.6 |
| 2026-11-09T19:13:00Z | cpu      | Product i-0ca229ce39b54ac77 |  64.0 |
| 2026-11-09T19:14:00Z | cpu      | Product i-0ca229ce39b54ac77 |  62.4 |
| 2026-11-09T19:15:00Z | cpu      | Product i-0ca229ce39b54ac77 |  57.0 |
| 2026-11-09T19:16:00Z | cpu      | Product i-0ca229ce39b54ac77 |  57.0 |
| 2026-11-09T19:17:00Z | cpu      | Product i-0ca229ce39b54ac77 |  32.9 |
| 2026-11-09T19:18:00Z | cpu      | Product i-0ca229ce39b54ac77 |  36.5 |
| 2026-11-09T19:19:00Z | cpu      | Product i-0ca229ce39b54ac77 |  35.2 |
| 2026-11-09T19:20:00Z | cpu      | Product i-0ca229ce39b54ac77 |  33.3 |
| 2026-11-09T19:21:00Z | cpu      | Product i-0ca229ce39b54ac77 |  34.4 |
| 2026-11-09T19:22:00Z | cpu      | Product i-0ca229ce39b54ac77 |  36.1 |
| 2026-11-09T19:23:00Z | cpu      | Product i-0ca229ce39b54ac77 |  35.6 |
| 2026-11-09T19:24:00Z | cpu      | Product i-0ca229ce39b54ac77 |  36.5 |
| 2026-11-09T19:25:00Z | cpu      | Product i-0ca229ce39b54ac77 |   4.0 |
| 2026-11-09T19:26:00Z | cpu      | Product i-0ca229ce39b54ac77 |   0.5 |
| 2026-11-09T19:10:00Z | response | Load balancer, average      |  13.2 |
| 2026-11-09T19:11:00Z | response | Load balancer, average      |  22.7 |
| 2026-11-09T19:12:00Z | response | Load balancer, average      |  27.1 |
| 2026-11-09T19:13:00Z | response | Load balancer, average      |  26.3 |
| 2026-11-09T19:14:00Z | response | Load balancer, average      |  24.2 |
| 2026-11-09T19:15:00Z | response | Load balancer, average      |  27.3 |
| 2026-11-09T19:16:00Z | response | Load balancer, average      |  51.0 |
| 2026-11-09T19:17:00Z | response | Load balancer, average      |  11.6 |
| 2026-11-09T19:18:00Z | response | Load balancer, average      |  13.1 |
| 2026-11-09T19:19:00Z | response | Load balancer, average      |  11.0 |
| 2026-11-09T19:20:00Z | response | Load balancer, average      |  11.9 |
| 2026-11-09T19:21:00Z | response | Load balancer, average      |  10.5 |
| 2026-11-09T19:22:00Z | response | Load balancer, average      |  11.2 |
| 2026-11-09T19:23:00Z | response | Load balancer, average      |  11.2 |
| 2026-11-09T19:24:00Z | response | Load balancer, average      |  17.1 |
| 2026-11-09T19:10:00Z | response | Load balancer, p95          |  31.8 |
| 2026-11-09T19:11:00Z | response | Load balancer, p95          |  55.8 |
| 2026-11-09T19:12:00Z | response | Load balancer, p95          |  66.4 |
| 2026-11-09T19:13:00Z | response | Load balancer, p95          |  62.2 |
| 2026-11-09T19:14:00Z | response | Load balancer, p95          |  57.4 |
| 2026-11-09T19:15:00Z | response | Load balancer, p95          |  66.1 |
| 2026-11-09T19:16:00Z | response | Load balancer, p95          | 131.5 |
| 2026-11-09T19:17:00Z | response | Load balancer, p95          |  29.8 |
| 2026-11-09T19:18:00Z | response | Load balancer, p95          |  27.7 |
| 2026-11-09T19:19:00Z | response | Load balancer, p95          |  27.7 |
| 2026-11-09T19:20:00Z | response | Load balancer, p95          |  24.3 |
| 2026-11-09T19:21:00Z | response | Load balancer, p95          |  25.5 |
| 2026-11-09T19:22:00Z | response | Load balancer, p95          |  27.3 |
| 2026-11-09T19:23:00Z | response | Load balancer, p95          |  27.1 |
| 2026-11-09T19:24:00Z | response | Load balancer, p95          |  29.8 |
| 2026-11-09T19:08:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:09:00Z | capacity | Healthy targets             |   1.0 |
| 2026-11-09T19:10:00Z | capacity | Healthy targets             |   1.0 |
| 2026-11-09T19:11:00Z | capacity | Healthy targets             |   1.0 |
| 2026-11-09T19:12:00Z | capacity | Healthy targets             |   1.0 |
| 2026-11-09T19:13:00Z | capacity | Healthy targets             |   1.0 |
| 2026-11-09T19:14:00Z | capacity | Healthy targets             |   1.0 |
| 2026-11-09T19:15:00Z | capacity | Healthy targets             |   1.0 |
| 2026-11-09T19:16:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:17:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:18:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:19:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:20:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:21:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:22:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:23:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:24:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:25:00Z | capacity | Healthy targets             |   2.0 |
| 2026-11-09T19:08:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:09:00Z | capacity | Desired capacity            |   1.0 |
| 2026-11-09T19:10:00Z | capacity | Desired capacity            |   1.0 |
| 2026-11-09T19:11:00Z | capacity | Desired capacity            |   1.0 |
| 2026-11-09T19:12:00Z | capacity | Desired capacity            |   1.0 |
| 2026-11-09T19:13:00Z | capacity | Desired capacity            |   1.0 |
| 2026-11-09T19:14:00Z | capacity | Desired capacity            |   1.0 |
| 2026-11-09T19:15:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:16:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:17:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:18:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:19:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:20:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:21:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:22:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:23:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:24:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:25:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:26:00Z | capacity | Desired capacity            |   2.0 |
| 2026-11-09T19:08:00Z | database | RDS CPU                     |   5.2 |
| 2026-11-09T19:09:00Z | database | RDS CPU                     |   4.0 |
| 2026-11-09T19:10:00Z | database | RDS CPU                     |  10.7 |
| 2026-11-09T19:11:00Z | database | RDS CPU                     |  45.7 |
| 2026-11-09T19:12:00Z | database | RDS CPU                     |  44.0 |
| 2026-11-09T19:13:00Z | database | RDS CPU                     |  47.8 |
| 2026-11-09T19:14:00Z | database | RDS CPU                     |  43.8 |
| 2026-11-09T19:15:00Z | database | RDS CPU                     |  43.8 |
| 2026-11-09T19:16:00Z | database | RDS CPU                     |  40.1 |
| 2026-11-09T19:17:00Z | database | RDS CPU                     |  46.3 |
| 2026-11-09T19:18:00Z | database | RDS CPU                     |  45.9 |
| 2026-11-09T19:19:00Z | database | RDS CPU                     |  42.9 |
| 2026-11-09T19:20:00Z | database | RDS CPU                     |  41.1 |
| 2026-11-09T19:21:00Z | database | RDS CPU                     |  43.8 |
| 2026-11-09T19:22:00Z | database | RDS CPU                     |  44.5 |
| 2026-11-09T19:23:00Z | database | RDS CPU                     |  45.9 |
| 2026-11-09T19:24:00Z | database | RDS CPU                     |  39.1 |
| 2026-11-09T19:08:00Z | database | Coupon CPU                  |   0.4 |
| 2026-11-09T19:09:00Z | database | Coupon CPU                  |   0.3 |
| 2026-11-09T19:10:00Z | database | Coupon CPU                  |   0.5 |
| 2026-11-09T19:11:00Z | database | Coupon CPU                  |   0.3 |
| 2026-11-09T19:12:00Z | database | Coupon CPU                  |   0.5 |
| 2026-11-09T19:13:00Z | database | Coupon CPU                  |   0.4 |
| 2026-11-09T19:14:00Z | database | Coupon CPU                  |   0.5 |
| 2026-11-09T19:15:00Z | database | Coupon CPU                  |   0.4 |
| 2026-11-09T19:16:00Z | database | Coupon CPU                  |   0.4 |
| 2026-11-09T19:17:00Z | database | Coupon CPU                  |   0.3 |
| 2026-11-09T19:18:00Z | database | Coupon CPU                  |   0.5 |
| 2026-11-09T19:19:00Z | database | Coupon CPU                  |   0.3 |
| 2026-11-09T19:20:00Z | database | Coupon CPU                  |   0.5 |
| 2026-11-09T19:21:00Z | database | Coupon CPU                  |   0.3 |
| 2026-11-09T19:22:00Z | database | Coupon CPU                  |   0.4 |
| 2026-11-09T19:23:00Z | database | Coupon CPU                  |   0.3 |
| 2026-11-09T19:24:00Z | database | Coupon CPU                  |   0.5 |
| 2026-11-09T19:25:00Z | database | Coupon CPU                  |   0.3 |
| 2026-11-09T19:26:00Z | database | Coupon CPU                  |   0.4 |
