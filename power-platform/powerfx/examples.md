# Ejemplos de Power Fx

Estos ejemplos son genéricos e independientes de cualquier entorno corporativo.

## Enrutamiento por tipo

~~~powerfx
Switch(
    varRequestType,
    "ShiftChange", Navigate(scrShiftChange),
    "RemoteWork", Navigate(scrRemoteWork),
    "Leave", Navigate(scrLeave),
    Notify("Tipo de solicitud desconocido", NotificationType.Error)
)
~~~

## Cálculo inclusivo de fechas

~~~powerfx
DateDiff(
    dpStart.SelectedDate,
    dpEnd.SelectedDate,
    TimeUnit.Days
) + 1
~~~

## Validación de fechas

~~~powerfx
If(
    dpEnd.SelectedDate < dpStart.SelectedDate,
    Notify(
        "La fecha de fin no puede ser anterior a la fecha de inicio.",
        NotificationType.Error
    ),
    SubmitForm(frmRequest)
)
~~~

## UI dependiente del estado

~~~powerfx
If(
    ThisItem.Status = "PENDING_APPROVAL",
    DisplayMode.View,
    DisplayMode.Edit
)
~~~

Los fragmentos muestran patrones transferibles de Power Fx y no reproducen una aplicación empresarial concreta.