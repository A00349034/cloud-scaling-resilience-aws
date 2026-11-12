# CA1 narration draft

Results from November 9-11, 2026: set 0 (first design), set A (three-tier design, standard CPU credits) and set B (three-tier design, unlimited CPU credits). Read at a measured pace; about five and a half minutes, inside the six-minute limit. Each section is one slide: its label (1, 2a, 5a ...) is the slide's `data-note` in slides.md, and one voice recording (see recording/readme.md).

## 1. Question - about 20 seconds

The Product-Coupon application works, but that does not tell us its capacity, or how it behaves when something fails. I investigated whether adding Product instances improves scalability and resilience, and which limits remain elsewhere in the application.

## 2a. About the author - about 10 seconds

I'm Mark Crowe, a student on the TUS MSc in Software Design with Cloud Computing. The code, the scripts and every result are on my GitHub, linked on this slide.

## 2. Architecture - about 35 seconds

Clients reach one Application Load Balancer, the only public part. Behind it, Product runs in an Auto Scaling group in private subnets across two Availability Zones. Product writes call a single Coupon service, and everything uses one MySQL database, which has a standby copy in the second zone. The database subnets have no internet route at all. I built this three-tier design after feedback on my first design, which used AWS's default network with public instance addresses. Only the Product tier changes between tests.

## 3. Method - about 35 seconds

I ran the same tests three times. Set 0 on the first design. Then set A and set B on the new design, set A with standard CPU credits and set B with unlimited credits. A t3.micro earns CPU credits while it is idle; with standard credits and none left, its CPU is held at ten percent. The workload was the product list, from k6 on my laptop, at 10 to 400 users, with the same 20 products. I measured requests per second, errors and p95, the time 95% of requests beat.

## 4. Capacity - about 35 seconds

At 400 users, set 0 showed no gain from a second instance: 1,170 against 1,171 requests per second. Set A, with no credits, was flat at about 430 on one instance, because its CPU was capped, and two capped instances simply doubled that. Set B is the real answer. One instance served 1,438 requests per second; two served 2,483, 1.7 times as many, and p95 fell by 41 percent.

## 4a. Capacity by number of users - about 15 seconds

This chart shows sets 0 and B from 10 to 400 users. Dashed is set 0, solid is set B. The same laptop reached more than twice the set 0 ceiling, so on November 9 my laptop was not the whole limit.

## 5. Elasticity - about 35 seconds

For automatic scaling I used target tracking on average CPU at 30 percent, one to two instances, with 200 users for 14 minutes. In set B the group decided to scale out after 3 minutes 20 seconds, and the new instance was healthy at 4 minutes 55. Set 0 took almost 6 minutes. Set A never scaled out at all: its CPU was held at 10 percent, below the target, so the policy saw nothing to act on, while users waited five and a half seconds.

## 5a. Elasticity events, set 0 - about 15 seconds

This is set 0 in order. CPU was over the target within a minute, but the alarm fired only after 4 minutes 19 seconds. The new instance then took 1 minute 31 seconds to become healthy.

## 5b. What CloudWatch saw, set 0 - about 15 seconds

These are the CloudWatch panels for that run. When the new instance joined, response time spiked, because a cold JVM got traffic straight away; then the server's p95 fell by more than half.

## 6. Failure and recovery - about 30 seconds

With two instances and 100 users, I terminated one instance. In every set, 1.3 percent of requests failed, because the load balancer kept sending traffic to the dead instance for 21 to 28 seconds, until its health checks failed. Then the remaining instance carried the load. The replacement was healthy after 2 minutes 15 with unlimited credits, but took about 7 minutes with standard credits.

## 6a. The failure events in order, set 0 - about 15 seconds

Here is set 0 in order. Errors stopped after about 30 seconds. Auto Scaling launched a replacement after 57 seconds, but its CPU was held at 10 percent, so it took 6 minutes 53 to become healthy.

## 7. Dependencies - about 35 seconds

Then I failed the shared dependencies. With Coupon stopped, reads carried on, but all 20 writes failed, in every set. Product stayed healthy, so the load balancer kept sending writes to it; more Product instances cannot help here. With the new design I could also fail over the database. Reads hardly noticed, one write timed out, and writes were working again after 20 seconds. Product reconnected without a restart.

## 8. Whole-system limits - about 30 seconds

Four limits remain. First, CPU credits: with none left, one instance served 433 requests per second instead of 1,438, and scaling never started. Second, the database: every instance shares it, and its CPU rose from 41 to 70 percent with two instances. Third, Coupon: a single instance on the write path. Fourth, start-up: about 2 minutes with unlimited credits, about 7 with standard.

## 9. Conclusion - about 30 seconds

So, to answer the question. Horizontal scaling works: with unlimited credits, two instances served 1.7 times as many requests, and losing one cost 1.3 percent of requests. But only if each instance really has its CPU; with credits used up, nothing scaled. The single Coupon still breaks every write, and the database is the next limit. Next, I would keep a minimum of two Product instances from a pre-built image, put Coupon in each zone, page the product list, and run the load from inside AWS.

## 10. Finish - about 10 seconds

Thanks for watching. The full report and all the evidence are linked from these slides. If you have any questions, email me at the address on screen.

## Recording checklist

- Values, units, client environment and event times match the report.
- Replace alternatives with one account of the actual outcome.
- Remove every bracketed placeholder from the final narration.
- Keep true elapsed times visible if a wait is shown at increased speed.
- Narrate in Mark's own voice and export the final recording as MP4.
- Confirm the Moodle duration limit; the brief says six minutes and older overview notes say five.
