# Power Automate Flows

The portfolio implementation models the following cloud flows.

## 01 — Submit Request

Trigger:

- New request submitted.

Responsibilities:

1. Validate request.
2. Set status to PENDING_APPROVAL.
3. Create approval transaction.
4. Persist processing metadata.

## 02 — Process Approval

Trigger:

- Approval decision received.

Responsibilities:

1. Validate the request is still pending.
2. Persist decision.
3. Set APPROVED or REJECTED.
4. Record approver and timestamp.
5. Trigger notification.

## 03 — Notification

Responsibilities:

- Notify requester about the final decision.
- Keep message generation separate from business-state transitions.

## Reliability

Flows should be designed with:

- Retry policies for transient failures.
- Explicit failure branches.
- Correlation/request identifiers.
- Idempotency checks.
- Operational logging.

## Production note

Connection references and environment-specific values should be configured through a Power Platform Solution rather than hard-coded.
