# CA1 screencast plan

Use the [experiment guide](ca1-experiment-guide.md), [draft Reveal.js slides](screencast-deck/index.html), [editable result fields](screencast-deck/results.js), and [speaking script](screencast-deck/speaking-script.md). Fill the marked fields from the measured results before recording. Use graphs or console captures wherever they make the evidence easier to read.

Notes for the engineering evidence screencast. Started October 19, 2026.

## Production preference recorded November 3, 2026

Mark proposes using Reveal.js for the presentation visuals, recording their own narration and exporting the finished screencast as MP4. Audio playback and slide-advance plugins may be useful; the exact recording workflow remains to be checked. The written report stays in Markdown for later PDF export. Train the Trainer is the current priority; this records the AWS screencast idea for the later production session. Keep the report and narration based on the same measured results and confirm the applicable duration limit before recording.

## Rules from the brief

- **Maximum 6 minutes.** Mandatory, and marked together with [report.md](report.md).
- It presents the **engineering argument** using the strongest evidence. It is not a replay of the deployment and not the report read aloud.
- Same investigation and same numbers as the report. The report has the depth; the screencast picks the best evidence and says what it means.
- Diagrams, short screen captures, monitoring graphs and annotations are all allowed.

Discrepancy to confirm on Moodle: the module overview says "5-minute engineering demonstration" and upload "28th Oct"; the CA1 brief says "max 6 minutes" and October 27, 2026. Plan for the brief, and check which applies.

## How it gets made

1. Save terminal output as text, k6 results as JSON, and AWS metric and event data with the run's UTC time window. Record the load increase, scaling event and first observation of the new healthy target.
2. Use the results to fill the slides with the architecture diagram, comparison table and event timelines. Add a console capture if it makes an event clearer.
3. Record the narration over the slides and any selected clips. Keep the finished screencast within six minutes.

Tools on Windows: OBS Studio, or Xbox Game Bar (Win+Alt+R) for quick clips. Editing: Clipchamp (built into Windows 11) or any editor that can cut and speed up clips.

## Optional console clips during the experiments

| Clip | When | What to show |
| --- | --- | --- |
| `clip-d-scale-out` | When the new instance appears and again when it is healthy | In the AWS console, open EC2 → Auto Scaling Groups → Product group → **Activity** for the launch. Open EC2 → Target Groups → Product target group → **Targets** for the second healthy target. |
| `clip-e-failure` | Around the disruption and when the replacement becomes healthy | Show the old and replacement target states on **Targets**. Pair the clip with the measured client error and recovery timeline. |

Take a short capture or still when the relevant state appears. Use the recorded timestamps to show the actual delay. An annotated timeline from the exported measurements can cover both events in the final video.

## Segment plan

| Time | Segment | Show | Say (key points) | Source |
| --- | --- | --- | --- | --- |
| 0:00-0:45 | Problem and architecture | Architecture diagram | The question; what was deployed (ALB, Auto Scaling group, Coupon, RDS); 2-3 key design decisions and why (stateless Product, health check, launch template) | report 1.2, 1.3 |
| 0:45-1:35 | Baseline | Baseline table, fig-10 | Workload and why; test conditions; where one instance saturated and what the evidence was | report 2, 4.1 |
| 1:35-2:40 | Scaling | Baseline vs 2-instance table, fig-11 | What changed and by how much; did the client outcome improve; what limited it | report 4.2 |
| 2:40-3:45 | Elasticity | fig-12 timeline and optional scale-out clip | Explain the policy, delay until useful capacity and effect on latency | report 4.3 |
| 3:45-4:45 | Failure | Client outcome timeline and optional target capture | Explain the effect on the client and when service and capacity recovered | report 4.4 |
| 4:45-6:00 | Conclusion | Summary slide | Answer the question (scalability and resilience separately); remaining bottlenecks and single points of failure (Coupon, RDS, start-up time); one justified next improvement | report 5 |

## Before recording

- [ ] Report sections 4 and 5 written, so the numbers and conclusion are final
- [ ] Screen resolution 1920x1080, browser and terminal zoomed so text is readable
- [ ] Close email, chat and notifications; hide anything private (billing details, email address, access keys)
- [ ] Each graph has its time range and labels visible
- [ ] Script or bullet notes per segment, timed to the table above

## After recording

- [ ] Length under 6 minutes (and under 5 if Moodle confirms the shorter limit)
- [ ] Audio clear; every number said matches the report
- [ ] Export as MP4 and upload to Moodle with the report
