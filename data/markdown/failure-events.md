# Dataset 5: Failure: the events in order

Times from k6, the target group's health checks and the Auto Scaling activity history.

| Dataset | File                                            | Rows | Figure                                                                                                                   |
|--------:|-------------------------------------------------|-----:|--------------------------------------------------------------------------------------------------------------------------|
|       5 | [failure-events.csv](../csv/failure-events.csv) |    6 | [Figure 7 of the slides](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/#/failure-events) |

- **Download:** [failure-events.csv](../csv/failure-events.csv)
- **Report:** [report.md](../../docs/report.md) · **Slides:** [the deck](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/) · **Code:** [ca1_chart_data.py](../../scripts/ca1_chart_data.py) · **Evidence:** [20261109-185653-laptop-failure-2product-100users](../../test-results/20261109-185653-laptop-failure-2product-100users/)
- This page was made by [csv_markdown.py](../../scripts/csv_markdown.py)

## Columns

| Column     | Meaning                                   |
|------------|-------------------------------------------|
| `time_utc` | Time of the event (UTC)                   |
| `stage`    | The stage of the run the event belongs to |
| `event`    | What happened                             |

## Data

| time_utc             | stage                         | event                                             |
|----------------------|-------------------------------|---------------------------------------------------|
| 2026-11-09T18:59:20Z | Errors                        | Instance terminated; 4,180 failed requests in 10s |
| 2026-11-09T18:59:47Z | Errors                        | Dead target removed, 27s later                    |
| 2026-11-09T18:59:50Z | One instance carries the load | Errors stop                                       |
| 2026-11-09T19:00:17Z | One instance carries the load | Auto Scaling notices, 57s                         |
| 2026-11-09T19:00:30Z | One instance carries the load | Replacement starts; CPU held at 10%               |
| 2026-11-09T19:06:13Z | Two instances again           | Replacement healthy, 6m 53s                       |
