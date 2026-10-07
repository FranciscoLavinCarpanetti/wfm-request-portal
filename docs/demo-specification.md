# Demo Specification

## Purpose

Provide a browser-accessible representation of the WFM Request Portal so a reviewer can understand the solution without access to Microsoft Power Platform.

## Roles

### Employee

Can:

- Create requests
- View own requests
- View status
- Cancel eligible requests

### Approver

Can:

- View pending requests
- Approve requests
- Reject requests
- Add decision comments

## Dashboard

Metrics:

- Total requests
- Pending approval
- Approved
- Rejected

## Request form

Fields:

- Request type
- Start date
- End date
- Optional shift
- Comments

## Business validation

At minimum:

- Request type is required.
- Start date is required.
- End date is required.
- End date cannot precede start date.
- A request cannot be approved twice.
- Rejected/approved requests cannot be edited.

## Status machine

```text
DRAFT ──► SUBMITTED ──► PENDING_APPROVAL
                              │
                       ┌──────┴──────┐
                       ▼             ▼
                    APPROVED      REJECTED
```

## UX

The interface should communicate state clearly without exposing implementation details to the user.
