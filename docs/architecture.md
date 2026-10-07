# Architecture

## Design principles

1. **Separation of concerns** — the Canvas App handles presentation and user interaction; workflow orchestration belongs to Power Automate; persistence belongs to the data layer.
2. **Configuration over hard-coding** — environment-specific values should not be embedded in formulas or flows.
3. **Explicit state transitions** — request status is controlled by workflow rules rather than arbitrary UI changes.
4. **Idempotency** — a request should not generate duplicate approval or notification actions when a flow is retried.
5. **Auditability** — relevant lifecycle events should be persisted.

## Logical components

### Presentation

Canvas App responsibilities:

- Request creation
- Client-side validation
- Request listing
- Status visualization
- User feedback

### Data

A request record should contain at minimum:

| Field | Purpose |
|---|---|
| RequestId | Unique identifier |
| RequestType | Type of WFM request |
| Requester | Request owner |
| StartDate | Effective start |
| EndDate | Effective end |
| Status | Lifecycle state |
| SubmittedAt | Submission timestamp |
| DecisionAt | Approval/rejection timestamp |
| DecisionBy | Decision maker |
| Comments | Human-readable context |

### Workflow

Power Automate responsibilities:

- Validate submitted requests
- Start approval
- Persist decision
- Send notifications
- Record failures
- Prevent duplicate processing

## Error handling

Flows should distinguish:

- Validation failure
- Business-rule rejection
- Connector failure
- Approval timeout
- Unexpected runtime failure

Transient connector failures should be retryable. Business-rule failures should be deterministic and user-readable.

## Security boundary

The application must never rely on the Canvas App alone for authorization. Critical permissions and state transitions should be enforced by the data/workflow layer.
