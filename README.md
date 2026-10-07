# WFM Request Portal

A portfolio-grade Workforce Management request and approval platform designed around Microsoft Power Platform patterns.

> **Portfolio project:** this repository is an independent implementation inspired by common WFM operational workflows. It does not contain Telpark source code, production data, credentials, private URLs or corporate configuration.

## Overview

The portal centralizes workforce requests such as:

- Shift changes
- Remote-work requests
- Leave requests
- Approval and rejection
- Request history and status tracking
- Automated notifications
- Auditability

The project demonstrates how a manual, email-driven operational process can be transformed into a structured workflow.

## Architecture

```text
                    ┌──────────────────────┐
                    │      End User        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Power Apps      │
                    │   Canvas interface   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Data / Requests    │
                    │ SharePoint or Dataverse│
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Power Automate    │
                    │ Workflow orchestration│
                    └──────────┬───────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
             Validation     Approval      Notification
                 │             │             │
                 └─────────────┼─────────────┘
                               ▼
                    ┌──────────────────────┐
                    │   Audit / History    │
                    └──────────────────────┘
```

## Technical objectives

- Model a reliable request lifecycle.
- Separate UI, data and workflow responsibilities.
- Make environment-specific configuration replaceable.
- Prevent duplicate workflow execution.
- Provide traceability for every state transition.
- Keep the solution portable between development and production environments.
- Apply ALM principles to a low-code solution.

## Request lifecycle

```text
Draft
  │
  ▼
Submitted
  │
  ├──────────────► Rejected
  │
  ▼
Pending approval
  │
  ├──────────────► Rejected
  │
  ▼
Approved
```

## Repository structure

```text
wfm-request-portal/
├── README.md
├── SECURITY.md
├── CHANGELOG.md
├── docs/
│   ├── architecture.md
│   ├── data-model.md
│   ├── workflow.md
│   └── alm.md
└── power-platform/
    └── powerfx/
        └── examples.md
```

## Technology

- Microsoft Power Apps
- Power Automate
- SharePoint / Dataverse patterns
- Power Fx
- Git / GitHub
- Power Platform ALM concepts

## Portfolio scope

This repository intentionally separates transferable engineering patterns from any employer-specific implementation. Sample data and configuration are synthetic.

See [SECURITY.md](SECURITY.md) for the public-repository boundary.
