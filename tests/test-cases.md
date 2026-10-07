# Casos de prueba

## Creación

| ID | Escenario | Resultado esperado |
|---|---|---|
| TC-001 | Cambio de turno válido | Solicitud enviada |
| TC-002 | Fecha final anterior a inicial | Error de validación |
| TC-003 | Tipo de solicitud vacío | Error de validación |
| TC-004 | Vacaciones válidas | Solicitud enviada |
| TC-005 | Teletrabajo válido | Solicitud enviada |

## Aprobación

| ID | Escenario | Resultado esperado |
|---|---|---|
| TC-101 | Aprobar pendiente | Estado APPROVED |
| TC-102 | Rechazar pendiente | Estado REJECTED |
| TC-103 | Decidir solicitud procesada | Sin transición duplicada |
| TC-104 | Fallo transitorio de aprobación | Reintento o recuperación |

## Notificaciones

| ID | Escenario | Resultado esperado |
|---|---|---|
| TC-201 | Solicitud aprobada | Notificación de aprobación |
| TC-202 | Solicitud rechazada | Notificación de rechazo |
| TC-203 | Fallo de notificación | Solicitud auditable y error registrado |