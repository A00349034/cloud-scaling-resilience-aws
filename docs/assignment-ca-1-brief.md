
# Container Design & Deployment

**Assignment 1: Cloud Scalability & Resilience Investigation**  

|                      |                                                                    |
|----------------------|--------------------------------------------------------------------|
| **Weighting**        | 20%                                                                |
| **Submission**       | 27th October 2026                                                  |
| **Primary workload** | Product Service                                                    |
| **Deliverables**     | Technical report + engineering evidence screencast (max 6 minutes) |

**Engineering Question: To what extent does horizontally scaling the Product Service improve the scalability and resilience of the application, and what limitations remain elsewhere in the architecture?**  

---

- [1. Purpose of the Assignment](#1-purpose-of-the-assignment)
- [2. Scenario](#2-scenario)
- [3. Architectural Constraints and Scope](#3-architectural-constraints-and-scope)
- [4. Investigation Requirements](#4-investigation-requirements)
  - [A. Establish a Baseline](#a-establish-a-baseline)
  - [B. Design for Horizontal Scalability](#b-design-for-horizontal-scalability)
  - [C. Evaluate the Effect of Scaling](#c-evaluate-the-effect-of-scaling)
  - [D. Investigate Elasticity](#d-investigate-elasticity)
  - [E. Investigate Failure and Recovery](#e-investigate-failure-and-recovery)
  - [F. Evaluate the Whole System](#f-evaluate-the-whole-system)
- [5. Evidence Expectations](#5-evidence-expectations)
- [6. What to Submit](#6-what-to-submit)
  - [A. Technical Report](#a-technical-report)
  - [B. Engineering Evidence Screencast - Maximum 6 Minutes](#b-engineering-evidence-screencast---maximum-6-minutes)
- [7. Assessment Criteria - Report and Screencast](#7-assessment-criteria---report-and-screencast)
- [8. Expectations and Academic Practice](#8-expectations-and-academic-practice)

---

## 1. Purpose of the Assignment

This assessment is an engineering investigation rather than a sequence of configuration tasks. You will design, deploy, test and evaluate a cloud architecture for the Product and Coupon application using evidence collected from controlled experiments.

The aim is not simply to demonstrate that AWS Auto Scaling works. You must use measurements and observations to explain how the application behaves under load and during failure, and determine what problems are solved - and what limitations remain.

---

## 2. Scenario

The Product and Coupon application has been demonstrated successfully in a local development environment and can be deployed to AWS. The organisation expects demand to increase and become less predictable. There is also concern that failure of an individual application instance could reduce or remove service availability.

You have been asked to investigate whether the application can be deployed in a way that improves scalability and resilience while remaining operationally reasonable in terms of cost, complexity and security.

The Product Service is the primary workload under investigation. Coupon and the database remain dependencies of the wider application and must be considered when evaluating the behaviour of the complete system.

---

## 3. Architectural Constraints and Scope

- The Product Service must be deployed as a stateless service capable of running as multiple equivalent instances.
- Persistent state must be external to the Product EC2 instances. RDS is the preferred database platform for this assessment.
- Clients should access the Product tier through a single endpoint rather than targeting individual Product instances directly.
- Your design should use AWS mechanisms appropriate to load distribution, health checking, repeatable instance creation, monitoring and capacity adjustment.
- You are not required to remove every bottleneck or single point of failure. You are required to identify and evaluate those that remain.

---

## 4. Investigation Requirements

### A. Establish a Baseline

Deploy a working baseline version of the application and define a repeatable workload. Collect sufficient evidence to describe how the system behaves before additional Product capacity is introduced.

- Verify that Product can communicate with its required dependencies.
- Define the workload you will use and explain why it is suitable.
- Record relevant measures such as CPU utilisation, response time, throughput, error rate and dependency behaviour.
- State the conditions of the test clearly enough that the experiment could be repeated.

---

### B. Design for Horizontal Scalability

Redesign the Product tier so that it can operate across multiple equivalent instances. Your architecture should provide a single client-facing endpoint, distribute requests to healthy instances and support repeatable creation of Product instances.

You must justify the main design decisions. A successful AWS configuration without an engineering rationale is not sufficient.

---

### C. Evaluate the Effect of Scaling

Repeat the workload using the scaled Product architecture and compare the results with the baseline. Use evidence to determine whether additional Product capacity improved the observed behaviour of the application.

It is acceptable to conclude that scaling Product produced limited improvement, provided that conclusion is supported by evidence and you identify a plausible limiting component or behaviour.

---

### D. Investigate Elasticity

Configure the Product tier so that capacity can change automatically in response to workload. Justify the minimum, desired and maximum capacity, the metric used for scaling, and the chosen target or threshold.

- Demonstrate at least one scale-out event under increased workload.
- Observe the time between increased demand, metric response, scaling activity and useful new capacity.
- Observe scale-in or return toward baseline capacity when demand reduces, where practical.
- Use CloudWatch and AWS scaling activity to support your explanation.

---

### E. Investigate Failure and Recovery

Introduce a controlled Product-instance failure while requests are being made. Observe and record how the architecture responds.

- What did the client experience?
- How did target health change?
- Did traffic continue to reach healthy capacity?
- Was replacement capacity created, and how long did recovery take?

---

### F. Evaluate the Whole System

Use the collected evidence to identify remaining limitations. Consider whether the Coupon Service, database, startup time, scaling policy, network design or another component becomes a bottleneck or single point of failure.

Your evaluation should also discuss relevant trade-offs in security, cost, sustainability and operational complexity. Propose one realistic next improvement and justify why it should be prioritised.

---

## 5. Evidence Expectations

**Marks are awarded for the quality of the engineering evidence and its interpretation - not for the number of AWS screenshots included.**

Screenshots, graphs, configuration extracts and monitoring output should be selected because they support a claim. Every important item of evidence should be accompanied by an explanation of what it shows and why it matters.

| Experiment            | Question                                              | Indicative Evidence                                         |
|-----------------------|-------------------------------------------------------|-------------------------------------------------------------|
| Baseline              | How does one Product instance behave under load?      | CPU, latency, throughput, errors                            |
| Horizontal scaling    | Does additional Product capacity improve behaviour?   | Same metrics + instance count + target health               |
| Elasticity            | How quickly does capacity respond to changing demand? | CloudWatch timeline, scaling activity, warm-up delay        |
| Failure               | What happens if a Product instance disappears?        | Client outcome, target health, errors, recovery time        |
| Whole-system analysis | Where is the next constraint?                         | Product/Coupon/database observations and supporting metrics |

**Example of stronger evidence:** rather than stating that 'Auto Scaling worked', compare measured behaviour before and after scaling, identify the timing of the scaling response, and explain whether the added capacity improved the application outcome.

---

## 6. What to Submit

### A. Technical Report

The report should be concise, evidence-led and organised around the investigation rather than around AWS console steps.

| Section                        | Focus                                                                                                                       | Assessment Connection                     |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| 1. Problem & Architecture      | Define the problem, present the deployed architecture and justify the main design decisions.                                | Architecture & Engineering Rationale      |
| 2. Experimental Method         | Define workload, baseline, metrics, assumptions and how fair/repeatable comparisons were achieved.                          | Experimental Design & Method              |
| 3. Technical Implementation    | Show that the required cloud architecture was implemented correctly, with selected configuration evidence.                  | Technical Implementation                  |
| 4. Results & Evidence          | Present and interpret the baseline, scaling, elasticity and failure evidence.                                               | Results & Quality of Evidence             |
| 5. Engineering Evaluation      | Answer the engineering question; identify bottlenecks, residual SPOFs and trade-offs; propose a justified next improvement. | Critical Engineering Evaluation           |
| 6. Communication & Referencing | Clear structure, appropriate diagrams, referenced sources and transparent use of AI tools where applicable.                 | Communication & Professional Presentation |

Avoid a screenshot-by-screenshot diary of the AWS configuration process. Include configuration details only where they help explain or justify the architecture, experiment or result.

---

### B. Engineering Evidence Screencast - Maximum 6 Minutes

The screencast should communicate the engineering argument using selected evidence from the same investigation presented in the report. It is not intended to be a complete replay of the deployment process or a duplicate of the written report.

| Approx. Time | Content                                                                                                    |
|--------------|------------------------------------------------------------------------------------------------------------|
| 0:00-0:45    | Problem and architecture: what was investigated, what was deployed, and the key design rationale.          |
| 0:45-1:35    | Baseline evidence: how the initial Product deployment behaved under the defined workload.                  |
| 1:35-2:40    | Scaling evidence: what changed when Product capacity increased and whether application behaviour improved. |

---

| Approx. Time | Content                                                                                                                     |
|--------------|-----------------------------------------------------------------------------------------------------------------------------|
| 2:40-3:45    | Elasticity evidence: relationship between workload, monitoring metric, scaling activity and useful new capacity.            |
| 3:45-4:45    | Failure experiment: what happened when a Product instance failed, including target health and recovery.                     |
| 4:45-6:00    | Engineering conclusion: answer the investigation question, identify remaining limitations and justify the next improvement. |

The screencast may use architecture diagrams, short screen captures, monitoring graphs and annotations. Use the six minutes to present the strongest evidence and interpretation rather than attempting to show every configuration step.

---

## 7. Assessment Criteria - Report and Screencast

The report and screencast are assessed together as evidence of one engineering investigation. Both deliverables are mandatory. The report should provide the depth, data and analysis; the screencast should select and communicate the strongest evidence.  

| Criterion                                 | Weight |
|-------------------------------------------|-------:|
| Architecture & Engineering Rationale      |    15% |
| Experimental Design & Method              |    15% |
| Technical Implementation                  |    15% |
| Results & Quality of Evidence             |    20% |
| Critical Engineering Evaluation           |    25% |
| Communication & Professional Presentation |    10% |

---

## 8. Expectations and Academic Practice

- All external sources must be referenced appropriately.
- If generative AI tools are used to support the work, their use must be declared.
- Evidence must come from your own deployment and experiments.
- A technically working solution without analysis will not receive the same credit as a well-evidenced investigation that explains system behaviour and limitations.
- A negative or unexpected experimental result is acceptable when the method is sound and the result is interpreted critically.

**Investigation sequence: BASELINE -> HYPOTHESISE -> DESIGN -> EXPERIMENT -> BREAK - > MEASURE -> COMPARE -> EXPLAIN**  

**The objective is not to prove that scaling always works; it is to produce evidence that explains how this system behaves.**
CA1 - Cloud Scalability & Resilience Investigation

---
