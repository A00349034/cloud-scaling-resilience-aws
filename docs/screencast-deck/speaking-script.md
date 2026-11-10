# CA1 narration draft

Results from November 9, 2026. Read at a measured pace; about five and a quarter minutes, inside the six-minute limit. Each section is one slide: its label (1, 2a, 5a ...) is the slide's `data-note` in slides.md, and one voice recording (see recording/readme.md).

## 1. Question - about 25 seconds

The Product-Coupon application works, but that does not tell us its capacity or how it behaves when an instance fails. I investigated whether adding Product instances improves scalability and resilience, and which limits remain elsewhere in the application. I measured the system under a defined workload, compared one Product instance with two, and then examined automatic scaling and recovery.

## 2a. About the author - about 10 seconds

I'm Mark Crowe, a student on the TUS MSc in Software Design with Cloud Computing. The code, the scripts and every result are on my GitHub, linked on this slide.

## 2. Architecture - about 30 seconds

Clients use one Application Load Balancer endpoint. It distributes requests across Product instances. Product stores persistent data in a shared MySQL database, so the Product instances can be replaced. Product writes also call the single Coupon service. I deliberately kept those shared dependencies, because the investigation asks what scaling Product improves and what it leaves unchanged. The architecture diagram shows the service relationships.

## 3. Method - about 30 seconds

The workload was the product list, GET products, run with k6 from my laptop. I used a step load of 10, 25, 50, 100, 200 and 400 users, one minute each, with a short warm-up first. The database held the same 20 products for every run. I recorded requests per second, p95 response time, meaning 95% of requests finished faster than that, and errors on the client, and CPU and the load balancer's own response time in CloudWatch. Only one thing changed between the two comparisons: the number of Product instances. One change during testing: CPU credits were running out at 100 users, so I switched to unlimited credits before the higher levels.

## 4. Baseline and scaling - about 50 seconds

With one Product instance at 200 users I measured 1,020 requests per second, a client p95 of 295 milliseconds and 0.27% errors. With two instances it was 1,014 requests per second, 366 milliseconds and 0.26%. At 400 users it was identical: 1,170 and 1,171. So, from the client's side, the second instance changed nothing. But on the server side it did: CPU per instance halved, from 43% to about 21%, and the load balancer's p95 fell from 45 to 29 milliseconds. The server answered in tens of milliseconds while my laptop waited hundreds. The limit in this test was my client and its network, not Product. To find Product's own limit, the load generator needs to run inside AWS.

## 5. Elasticity - about 30 seconds

For automatic scaling I used target tracking on average CPU at 30%, with a minimum of one instance and a maximum of two. I chose 30% because one instance reached about 45% at 200 users. I started 200 users at 19:10. CPU went over the target within a minute, but the alarm only fired after 4 minutes 19 seconds. The new instance was healthy 1 minute 31 seconds later, so useful capacity arrived almost 6 minutes after the load.

## 5a. What CloudWatch saw - about 20 seconds

These are the CloudWatch panels for the same run. In the minute the new instance joined, server response time spiked, because a cold JVM got traffic straight away. Then the server p95 fell by more than half. Scale-in was not observed, because I deleted the stack after the run.

## 6. Failure and recovery - about 25 seconds

With two instances and 100 users, I terminated one instance. In the first 10 seconds, there were 4,180 failed requests, because the load balancer still sent traffic to the dead instance until its health checks failed, 27 seconds later. After about 30 seconds the remaining instance carried the whole load without errors.

## 6a. The failure events in order - about 25 seconds

Auto Scaling noticed after 57 seconds and launched a replacement, but it took 6 minutes 53 seconds to become healthy. The metrics show why: the new instance started in standard credit mode with no credits, so its CPU was held at 10% while Java and Spring Boot started. So the client recovered in seconds, but full capacity took almost 7 minutes.

## 7. Whole-system limits - about 35 seconds

Three limits remain. First, the database: its CPU rose to 34% at 400 users and over 40% during the failure test, and every Product instance shares this single database in one Availability Zone. Second, Coupon: it is a single instance on the write path. I did not load-test writes, but locally, with Coupon stopped, reads still worked and writes failed. Third, start-up time: new capacity takes three to seven minutes. And for this test, my own laptop and network were the main limit on what I could measure.

## 8. Conclusion - about 25 seconds

So, to answer the question. For scalability, a second Product instance halved the CPU per instance and cut the server's response time, but my client saw no gain, because my laptop and its network were the limit. For resilience, two instances meant the service survived losing one, after about 30 seconds of errors, but full capacity took almost 7 minutes to come back. The next improvement I would make is a three-tier design across two Availability Zones: instances in private subnets behind the load balancer, a Multi-AZ database, Coupon in each zone, and at least two Product instances started from a pre-built image, so the single points of failure and the slow start-up both go. The price is NAT gateways and more configuration. And I would rerun the comparison from inside AWS. More instances help, but only where the bottleneck actually is.

## 9. Finish - about 10 seconds

Thanks for watching. The full report and all the evidence are linked from these slides. If you have any questions, email me at the address on screen.

## Recording checklist

- Values, units, client environment and event times match the report.
- Replace alternatives with one account of the actual outcome.
- Remove every bracketed placeholder from the final narration.
- Keep true elapsed times visible if a wait is shown at increased speed.
- Narrate in Mark's own voice and export the final recording as MP4.
- Confirm the Moodle duration limit; the brief says six minutes and older overview notes say five.
