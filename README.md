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

## Demo interactiva

La carpeta [`demo/`](./demo/) contiene una demo web independiente y reproducible del portal WFM. Permite crear solicitudes, filtrarlas, consultar su detalle, simular aprobaciones/rechazos y visualizar la trazabilidad del proceso.

La demo también incluye un simulador sintético de impacto WFM para comparar capacidad antes/después de una solicitud. La correspondencia con una implementación real está documentada en [`docs/demo-technical-mapping.md`](./docs/demo-technical-mapping.md) y [`docs/wfm-simulation.md`](./docs/wfm-simulation.md).

## Documentación técnica destacada

- [Arquitectura de referencia](./docs/reference-architecture.md)
- [Casos de uso WFM](./docs/use-cases.md)
- [Trazabilidad de requisitos](./docs/requirements-traceability.md)
- [Evaluación de impacto WFM](./docs/wfm-impact-assessment.md)
- [Simulador WFM](./docs/wfm-simulation.md)
- [Mapeo técnico de la demo](./docs/demo-technical-mapping.md)

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
