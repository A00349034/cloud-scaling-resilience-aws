# Data sets

The numbers behind the charts and timelines in the slides and the report, taken from the saved results in [test-results](../test-results/). Each data set is a CSV file to download, with a Markdown page that shows it as a table and says what each column means.

| Dataset   | File                                                       | Description                     | Rows | View                                      | Slides                                                                                                            |
|-----------|------------------------------------------------------------|---------------------------------|-----:|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Dataset 1 | [one-vs-two.csv](csv/one-vs-two.csv)                       | One Product instance versus two |   12 | [View](markdown/one-vs-two.md)            | [Figure 3](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/#/one-vs-two)            |
| Dataset 2 | [elasticity-events.csv](csv/elasticity-events.csv)         | Elasticity: the events in order |    6 | [View](markdown/elasticity-events.md)     | [Figure 4](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/#/elasticity)            |
| Dataset 3 | [elasticity-cloudwatch.csv](csv/elasticity-cloudwatch.csv) | Elasticity: what CloudWatch saw |  134 | [View](markdown/elasticity-cloudwatch.md) | [Figure 5](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/#/elasticity-cloudwatch) |
| Dataset 4 | [failure-client-5s.csv](csv/failure-client-5s.csv)         | Failure: what the client saw    |   72 | [View](markdown/failure-client-5s.md)     | [Figure 6](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/#/failure)               |
| Dataset 5 | [failure-events.csv](csv/failure-events.csv)               | Failure: the events in order    |    6 | [View](markdown/failure-events.md)        | [Figure 7](https://a00349034.github.io/cloud-scaling-resilience-aws/docs/screencast-deck/#/failure-events)        |

- [csv](csv/): the CSV files, written by [ca1_chart_data.py](../scripts/ca1_chart_data.py)
- [markdown](markdown/): the same data as tables, written by [csv_markdown.py](../scripts/csv_markdown.py)
- [notebooks](notebooks/): [make_charts.ipynb](notebooks/make_charts.ipynb) loads the saved results, shows the numbers the report quotes and draws every chart

Rebuild: `python scripts/ca1_chart_data.py`, then `python scripts/csv_markdown.py`.
