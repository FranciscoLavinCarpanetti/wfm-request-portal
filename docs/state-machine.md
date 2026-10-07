# Máquina de estados

| Estado | Descripción |
|---|---|
| DRAFT | Solicitud en preparación |
| SUBMITTED | Solicitud enviada |
| PENDING_APPROVAL | Pendiente de decisión |
| APPROVED | Aprobada |
| REJECTED | Rechazada |
| CANCELLED | Cancelada |
| ERROR | Error operativo recuperable |

## Transiciones

| Desde | Acción | Hacia | Actor |
|---|---|---|---|
| DRAFT | Enviar | SUBMITTED | Empleado |
| DRAFT | Cancelar | CANCELLED | Empleado |
| SUBMITTED | Procesar | PENDING_APPROVAL | Workflow |
| SUBMITTED | Cancelar | CANCELLED | Empleado |
| PENDING_APPROVAL | Aprobar | APPROVED | Aprobador |
| PENDING_APPROVAL | Rechazar | REJECTED | Aprobador |
| Estado procesable | Error recuperable | ERROR | Workflow |

APPROVED, REJECTED y CANCELLED son estados terminales.

Workflow y capa de datos deben validar cada transición.