# Observabilidad

## Objetivo

Reconstruir el recorrido completo de una solicitud.

## Identificadores

- RequestId
- CorrelationId
- WorkflowRunId, cuando exista
- Timestamp

## Evento de auditoría

| Campo | Finalidad |
|---|---|
| RequestId | Solicitud afectada |
| CorrelationId | Agrupación de ejecución |
| EventType | Tipo de evento |
| PreviousStatus | Estado anterior |
| NewStatus | Estado nuevo |
| Actor | Usuario/proceso |
| Timestamp | Momento |
| Result | Resultado |
| ErrorCode | Error, si existe |
| Comments | Contexto |

No registrar secretos ni credenciales. Minimizar datos personales y mantener la correlación entre capas.
