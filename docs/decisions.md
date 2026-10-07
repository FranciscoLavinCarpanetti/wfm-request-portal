# Technical Decisions

## Power Apps

Chosen for the request-facing application because the workflow is form-driven and integrates naturally with Microsoft 365 / Power Platform services.

## Power Automate

Chosen for orchestration because approvals, notifications and asynchronous processing are workflow-oriented concerns.

## SharePoint vs Dataverse

SharePoint is suitable for a lightweight implementation where structured lists are sufficient.

Dataverse becomes preferable when the solution requires:

- Strong relational modelling
- Complex security
- Larger transactional workloads
- Enterprise ALM
- Rich business rules

The portfolio architecture keeps the data layer replaceable.

## Why separate workflow responsibilities?

Keeping validation, approval processing and notification concerns separate improves:

- Maintainability
- Observability
- Retry behaviour
- Testing
- Change isolation

## Why explicit states?

A finite state model makes business transitions predictable and prevents arbitrary UI-driven status changes.
