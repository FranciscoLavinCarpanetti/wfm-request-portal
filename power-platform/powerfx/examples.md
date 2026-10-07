# Power Fx Examples

These examples are generic and intentionally independent of any corporate environment.

## Request type routing

```powerfx
Switch(
    varRequestType,
    "ShiftChange", Navigate(scrShiftChange),
    "RemoteWork", Navigate(scrRemoteWork),
    "Leave", Navigate(scrLeave),
    Notify("Unknown request type", NotificationType.Error)
)
```

## Inclusive date calculation

```powerfx
DateDiff(
    dpStart.SelectedDate,
    dpEnd.SelectedDate,
    TimeUnit.Days
) + 1
```

## Date validation

```powerfx
If(
    dpEnd.SelectedDate < dpStart.SelectedDate,
    Notify(
        "The end date cannot precede the start date.",
        NotificationType.Error
    ),
    SubmitForm(frmRequest)
)
```

## Status-aware UI

```powerfx
If(
    ThisItem.Status = "PENDING_APPROVAL",
    DisplayMode.View,
    DisplayMode.Edit
)
```

These snippets demonstrate transferable Power Fx patterns rather than reproducing an employer application.
