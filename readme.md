# Product and Coupon REST Services

This repository contains the Product and Coupon Spring Boot services.

Both services use MySQL. Product also calls Coupon.

## Start here

There are two separate setups.

### Run the application locally with Docker

Start here when developing/testing on the Windows computer:

[Local Docker setup](docker-local/readme.md)

That setup starts:

```text
MySQL + Coupon + Product
```

with Docker Desktop. It does not require AWS.

The normal local command, after creating `docker-local/local.env` from the supplied example, is:

```powershell
cd docker-local
Copy-Item local.env.example local.env
docker compose --env-file local.env up --build
```

Read [docker-local/readme.md](docker-local/readme.md) for the complete instructions, checking, logs, stopping and database reset procedure.

### CA1 progress

Where the assignment stands, the to-do checklist, hypotheses and experiment log: [docs/ca1-progress.md](docs/ca1-progress.md)

### AWS deployment and CA1 experiments

Only after the application works locally, use:

[AWS setup](aws-setup/readme.md)

That area contains AWS configuration, scripts, EC2/RDS/load-balancing work, Auto Scaling experiments, DWD documentation and the development journal.

Do not use `aws-setup/deployment.env` merely to run the application locally.

## Repository layout

```text
coupon-product-java/
|-- docker-local/
|   |-- readme.md
|   |-- docker-compose.yml
|   |-- local.env.example
|   `-- test-local.ps1
|
|-- aws-setup/
|   |-- readme.md
|   |-- deployment.env.example
|   |-- scripts/
|   `-- docs/
|
|-- coupon-rest-service-java-spring/
|   `-- Dockerfile
|
|-- product-rest-service-java-spring/
|   `-- Dockerfile
|
|-- test-results/
|   `-- readme.md
|
|-- sql/
|   `-- tables.sql
|
|-- scripts/
|   `-- publish-release.ps1
|
`-- CHANGELOG.md
```

## Services

Coupon runs on port `9091`.

Product runs on port `9090` and calls Coupon.

Each service remains a separate Spring Boot application and has its own Dockerfile so Product can later be deployed and horizontally scaled independently from Coupon.

## Releases

Build locally and publish the two JARs as a versioned GitHub Release using [scripts/publish-release.ps1](scripts/publish-release.ps1). Run it manually when ready; documentation pushes do not publish releases.

See [release instructions](docs/releases.md) and [CHANGELOG.md](CHANGELOG.md) for versions, release notes and download URLs.

## Documentation

Local Docker:

- [Run locally with Docker](docker-local/readme.md)

AWS:

- [AWS setup](aws-setup/readme.md)
- [DWD documentation index](aws-setup/docs/dwd.md)
- [Development journal](aws-setup/docs/development-journal.md)
- [Recording PowerShell sessions](aws-setup/docs/recording-powershell-sessions.md)

Do not commit passwords, AWS credentials, database secrets, tokens or unsanitised terminal transcripts.

