# Data Model

The portfolio implementation uses a generic request model.

## Request

```text
Request
├── RequestId
├── RequestType
├── RequesterId
├── RequesterDisplayName
├── StartDate
├── EndDate
├── CurrentStatus
├── SubmittedAt
├── DecisionAt
├── DecisionBy
├── DecisionComments
└── CreatedAt
```

## Request types

```text
SHIFT_CHANGE
REMOTE_WORK
LEAVE
```

## Statuses

```text
DRAFT
SUBMITTED
PENDING_APPROVAL
APPROVED
REJECTED
CANCELLED
ERROR
```

## Design considerations

A production implementation should use stable identifiers rather than display names for users and related entities.

Dates should be stored in a consistent timezone strategy and converted only at the presentation boundary.

Status changes should be validated against the allowed state machine.
