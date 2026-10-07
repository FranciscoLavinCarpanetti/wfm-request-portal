# Test Cases

## Request creation

| ID | Scenario | Expected result |
|---|---|---|
| TC-001 | Valid shift change | Request submitted |
| TC-002 | End date before start date | Validation error |
| TC-003 | Missing request type | Validation error |
| TC-004 | Valid leave request | Request submitted |
| TC-005 | Valid remote-work request | Request submitted |

## Approval

| ID | Scenario | Expected result |
|---|---|---|
| TC-101 | Approve pending request | Status becomes APPROVED |
| TC-102 | Reject pending request | Status becomes REJECTED |
| TC-103 | Decision on already processed request | No duplicate transition |
| TC-104 | Approval connector transient failure | Retry / recoverable failure |

## Notifications

| ID | Scenario | Expected result |
|---|---|---|
| TC-201 | Approved request | Requester receives approval notification |
| TC-202 | Rejected request | Requester receives rejection notification |
| TC-203 | Notification failure | Request remains auditable and failure is logged |
