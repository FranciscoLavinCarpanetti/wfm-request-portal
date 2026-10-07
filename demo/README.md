# Demo

This directory defines the public interactive demo planned for the WFM Request Portal.

The demo intentionally uses synthetic data and runs independently from any employer environment.

## Demo capabilities

- Dashboard
- Request list
- Request creation
- Request detail
- Approval / rejection
- Status transitions
- Search and filtering
- Synthetic persistence

## Target flow

```text
Dashboard
   ↓
Create request
   ↓
Validation
   ↓
Submitted
   ↓
Pending approval
   ↓
Approved / Rejected
   ↓
History
```

The demo is the user-facing representation of the architecture described in the documentation.
