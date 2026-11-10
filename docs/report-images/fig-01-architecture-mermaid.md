# Architecture diagrams in Mermaid (architecture-beta)

Mermaid versions of [fig-01-architecture.drawio](fig-01-architecture.drawio). They use the `architecture-beta` diagram type, so they need Mermaid 11.1 or later; GitHub and recent VS Code previews render it.

Limits of `architecture-beta`: edges carry no text labels, and a service can sit in only one group, so the Auto Scaling group (ASG) and the security groups are shown in the service names and in the tables below instead of as boxes.

## 1. Target design (Multi-AZ, private subnets)

Design option for the next improvement. The CA1 experiments ran on the deployed architecture in section 2.

```mermaid
architecture-beta
    service users(internet)[Users and k6 client]

    group region(cloud)[AWS Region eu-west-1]
    service cw(cloud)[CloudWatch and scaling policy] in region
    service lt(disk)[Launch template] in region

    group vpc(cloud)[VPC 10.0.0.0/16] in region
    service igw(internet)[Internet gateway] in vpc

    group aza(cloud)[Availability Zone a] in vpc
    group puba(cloud)[Public subnet 10.0.1.0/24] in aza
    group appa(server)[Private app subnet 10.0.11.0/24] in aza
    group dba(database)[Private DB subnet 10.0.21.0/24] in aza

    group azb(cloud)[Availability Zone b] in vpc
    group pubb(cloud)[Public subnet 10.0.2.0/24] in azb
    group appb(server)[Private app subnet 10.0.12.0/24] in azb
    group dbb(database)[Private DB subnet 10.0.22.0/24] in azb

    service alba(server)[ALB node a] in puba
    service nata(server)[NAT gateway a] in puba
    service proda(server)[Product EC2 in ASG] in appa
    service coupa(server)[Coupon EC2 a] in appa
    service rdsa(database)[RDS MySQL primary] in dba

    service albb(server)[ALB node b] in pubb
    service natb(server)[NAT gateway b] in pubb
    service prodb(server)[Product EC2 in ASG] in appb
    service coupb(server)[Coupon EC2 b] in appb
    service rdsb(database)[RDS MySQL standby] in dbb

    users:B --> T:igw
    igw:L --> R:alba
    igw:R --> L:albb
    alba:B --> T:proda
    albb:B --> T:prodb
    proda:L --> R:coupa
    prodb:R --> L:coupb
    proda:B --> T:rdsa
    prodb:B --> T:rdsb
    rdsa:R <--> L:rdsb
    coupa:T --> B:nata
    coupb:T --> B:natb
    nata:T --> L:igw
    natb:T --> R:igw
    cw:B --> T:lt
    lt:L --> R:prodb
```

Note: Product in AZ b writes to the RDS **primary**; the `prodb -> rdsb` edge stands for "database tier" because the diagram cannot route it across zones cleanly. Clients never use the standby directly.

| Item | Detail |
| --- | --- |
| Region and VPC | eu-west-1, VPC 10.0.0.0/16, two Availability Zones |
| Subnets per AZ | public (ALB node, NAT gateway), private app (Product, Coupon), private DB (RDS) |
| ALB | internet-facing, HTTP 80, target group HTTP 9090, health check `/actuator/health` |
| Auto Scaling group | Product only, both private app subnets, min 2 / desired 2 / max 4, from the launch template |
| RDS | MySQL Multi-AZ: primary in AZ a, standby in AZ b, synchronous replication |
| Outbound | private instances -> NAT gateway in the same AZ -> internet gateway |
| CloudWatch | ALB and CPU metrics; target-tracking policy changes ASG capacity |
| ALB-SG | HTTP 80 from the internet |
| App-SG | 9090 from ALB-SG; 9091 from App-SG (Product to Coupon) |
| DB-SG | 3306 from App-SG |

## 2. As deployed for CA1

```mermaid
architecture-beta
    service client(internet)[k6 client]

    group region(cloud)[AWS Region eu-west-1]
    service cw(cloud)[CloudWatch target tracking CPU 30 pct] in region
    service s3(disk)[S3 bucket with JARs] in region
    service ssm(disk)[Parameter Store DB settings] in region

    group vpc(cloud)[Default VPC 172.31.0.0/16] in region
    service igw(internet)[Internet gateway] in vpc
    service alb(server)[Application Load Balancer] in vpc
    service coupon(server)[Coupon EC2 single instance] in vpc
    service rds(database)[RDS MySQL single AZ] in vpc

    group aza(cloud)[AZ a default public subnet] in vpc
    group azb(cloud)[AZ b default public subnet] in vpc
    group azc(cloud)[AZ c default public subnet] in vpc

    service prod1(server)[Product EC2 1 in ASG] in aza
    service idle(server)[No instance] in azb
    service prod2(server)[Product EC2 2 in ASG] in azc

    client:B --> T:igw
    igw:B --> T:alb
    alb:L --> T:prod1
    alb:R --> T:prod2
    prod1:B --> L:coupon
    prod2:B --> R:coupon
    coupon:B --> T:rds
    prod1:L --> L:rds
    cw:B --> T:s3
    s3:B --> T:ssm
    ssm:L --> R:prod2
```

| Item | Detail |
| --- | --- |
| Network | default VPC, one default public subnet in each of three AZs; no private subnets, no NAT gateway |
| ALB | single endpoint, HTTP 80 from the client address range only (`tus-ca1-alb-sg`) |
| Auto Scaling group | Product, t3.micro, three AZs; fixed runs 1/1/1 and 2/2/2; elasticity run min 1 / desired 1 / max 2, target tracking average CPU 30% |
| Coupon | one t3.micro instance (`tus-ca1-coupon-sg`: 9091 from Product) |
| RDS | MySQL 8.4, db.t3.micro, single-AZ, not public (`tus-ca1-db-sg`: 3306 from Product and Coupon) |
| Boot | instances read the JAR from S3 and DB settings from Parameter Store through the internet gateway |
