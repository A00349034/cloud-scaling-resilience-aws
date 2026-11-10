# Dataset 2: Elasticity: the events in order

200 users, CPU target 30%, minimum 1 and maximum 2 instances. Times from k6, the Auto Scaling activity history and CloudWatch.

| Dataset | File                                                  | Rows | Figure                                                                                                               |
|--------:|-------------------------------------------------------|-----:|----------------------------------------------------------------------------------------------------------------------|
|       2 | [elasticity-events.csv](../csv/elasticity-events.csv) |    6 | [Figure 4 of the slides](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/#/elasticity) |

- **Download:** [elasticity-events.csv](../csv/elasticity-events.csv)
- **Report:** [report.md](../../docs/report.md) · **Slides:** [the deck](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/) · **Code:** [ca1_chart_data.py](../../scripts/ca1_chart_data.py) · **Evidence:** [20261109-191012-laptop-elasticity-1to2-cpu30-200users](../../test-results/20261109-191012-laptop-elasticity-1to2-cpu30-200users/)
- This page was made by [csv_markdown.py](../../scripts/csv_markdown.py)

## Columns

| Column     | Meaning                                   |
|------------|-------------------------------------------|
| `time_utc` | Time of the event (UTC)                   |
| `stage`    | The stage of the run the event belongs to |
| `event`    | What happened                             |

## Data

| time_utc             | stage                               | event                                                    |
|----------------------|-------------------------------------|----------------------------------------------------------|
| 2026-11-09T19:10:29Z | One instance, waiting for the alarm | 200 users start                                          |
| 2026-11-09T19:11:00Z | One instance, waiting for the alarm | CPU over the 30% target (1-minute CloudWatch point)      |
| 2026-11-09T19:14:48Z | Second instance starting            | Alarm: desired capacity 1 to 2                           |
| 2026-11-09T19:16:20Z | Two instances serving               | New instance healthy                                     |
| 2026-11-09T19:17:00Z | Two instances serving               | Server p95 down by about 55% (1-minute CloudWatch point) |
| 2026-11-09T19:24:32Z | Two instances serving               | Load ends                                                |
