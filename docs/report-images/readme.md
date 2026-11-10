# Report images

Save the selected screenshots and charts here with the filenames below so [../report.md](../report.md) can link them. Use PNG and crop to the part that supports the claim. Save full terminal output, k6 results and exported AWS data as files under `test-results/`. The table is a menu of possible figures.

Every CloudWatch graph: set the time range to the run, keep the time zone, axis and units visible, and use an appropriate period. CPU can use one-minute detailed metrics; CPU credit samples have five-minute granularity. Missing/unpublished samples are not zeros. See the [experiment guide](../ca1-experiment-guide.md) for the current capture and interpretation instructions.

## Capture once, after the next rebuild (before the baseline)

| File                             | What                                                                                                      | Where                     |
|----------------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------|
| `fig-02-checks-24.png`           | Optional screenshot of the actual check summary. The transcript is the main record.                       | PowerShell window         |
| `fig-03-alb-listener.png`        | ALB **Listeners** tab: port 80 forwarding to the target group                                             | EC2 > Load balancers      |
| `fig-04-target-group-health.png` | Target group **Health checks** tab (path, interval, thresholds) and **Targets** tab with 1 healthy target | EC2 > Target groups       |
| `fig-05-asg-details.png`         | Auto Scaling group **Details**: min, desired, max, launch template, AZs                                   | EC2 > Auto Scaling groups |
| `fig-06-rds.png`                 | RDS **Connectivity & security**: not publicly accessible, single-AZ, security group                       | RDS > Databases           |

## Capture during or right after each experiment

| File                               | Experiment | What                                                                                                                                                      |
|------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fig-10-baseline-cloudwatch.png`   | A          | Product CPU + ALB `TargetResponseTime` + `RequestCount` during the step load                                                                              |
| `fig-11-scaled-targets.png`        | C          | Target group with 2 healthy targets. Individual request distribution needs application evidence/access logs; ALB RequestCountPerTarget is a group average |
| `fig-07-scaling-policy.png`        | D          | ASG **Automatic scaling** tab showing the policy, metric and target                                                                                       |
| `fig-12-elasticity-timeline.png`   | D          | One graph: scaling metric, `GroupDesiredCapacity`, `GroupInServiceInstances`, `TargetResponseTime`                                                        |
| `fig-13-asg-activity.png`          | D and E    | ASG **Activity** tab: launch and terminate entries with times                                                                                             |
| `fig-14-failure-target-health.png` | E          | Targets tab while the terminated instance is unhealthy or draining                                                                                        |
| `fig-15-failure-client.png`        | E          | k6 output, or CloudWatch 5XX count and `HealthyHostCount`, around the termination time                                                                    |

The k6 JSON summaries go in `test-results/`, not here.

## Mermaid diagrams (November 10)

The source is in [mermaid/](mermaid/) (`.mmd`, Mermaid 12.3 with AWS icons). The PNGs beside this file are made from it, for Word and PDF, where Mermaid is not drawn. After changing a `.mmd` file, run:

```powershell
cd C:\Users\user\GitHub\tus-msc-sdev\coupon-product-java
Get-Location
pwsh -File scripts/render-mermaid.ps1
# all done

```

| File                                                         | Report section                                             |
|--------------------------------------------------------------|------------------------------------------------------------|
| [fig-01-as-deployed.png](fig-01-as-deployed.png)             | 1.2 architecture as deployed                               |
| [fig-02-target-design.png](fig-02-target-design.png)         | 5.4 next improvement (three tiers, two Availability Zones) |
| [fig-19-elasticity-events.png](fig-19-elasticity-events.png) | 4.3 elasticity events                                      |
| [fig-20-failure-events.png](fig-20-failure-events.png)       | 4.4 failure events                                         |

The first run installs mermaid-cli and a headless Chrome into `%LOCALAPPDATA%\mermaid-cli` (about 150 MB). `fig-01-architecture-mermaid.md` is the abandoned architecture-beta attempt and can be deleted.
