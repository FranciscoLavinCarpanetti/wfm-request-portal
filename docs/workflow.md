# Workflow

## Submission

1. User completes a request.
2. Client-side validation executes.
3. Request is persisted.
4. Status changes to `SUBMITTED`.
5. Workflow starts.

## Approval

1. Workflow validates the request.
2. Status becomes `PENDING_APPROVAL`.
3. Approver receives the approval request.
4. Decision is persisted.
5. Status becomes `APPROVED` or `REJECTED`.
6. Requester receives a notification.
7. Audit information is retained.

## Idempotency

The workflow should verify whether an approval process already exists for the request before creating another one.

A useful pattern is a unique business key:

```text
RequestId + WorkflowVersion
```

or an explicit processing flag/state controlled transactionally.

## Failure strategy

A failed automation should:

- preserve the request;
- record the failure;
- avoid silently losing the transaction;
- provide an operational recovery path;
- avoid sending duplicate notifications after retry.
