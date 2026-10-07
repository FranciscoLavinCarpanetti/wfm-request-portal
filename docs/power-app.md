# Power Apps Design

## Screens

The public implementation is designed around the following Canvas App screens.

### Home

Purpose:

- Show the user's open requests
- Start a new request
- Display summary counters
- Provide navigation

### New Request

Common fields:

- Request type
- Start date
- End date
- Shift / schedule when applicable
- Comments

Validation occurs before submission.

### My Requests

Provides:

- Request ID
- Type
- Date range
- Current status
- Submission date
- Last update

### Request Detail

Provides the complete request and its lifecycle information.

Editing is disabled after the request enters the approval process.

### Approval

Approvers can:

- Review request details
- Approve
- Reject
- Add comments

## UX principles

- Mobile-first layout
- Clear status indicators
- Minimal data entry
- Immediate validation feedback
- Accessible labels
- Consistent navigation

## Power Fx

Reusable formulas are stored under:

power-platform/powerfx/
