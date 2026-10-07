# Modelo de datos

La implementación de portfolio utiliza un modelo genérico de solicitudes.

## Solicitud

```text
Request
├── RequestId
├── RequestType
├── RequesterId
├── RequesterDisplayName
├── StartDate
├── EndDate
├── CurrentStatus
├── SubmittedAt
├── DecisionAt
├── DecisionBy
├── DecisionComments
└── CreatedAt
```

## Tipos de solicitud

```text
SHIFT_CHANGE
REMOTE_WORK
LEAVE
```

Los identificadores internos se mantienen en inglés porque representan valores técnicos estables; la interfaz pública los presenta en español.

## Estados

```text
DRAFT
SUBMITTED
PENDING_APPROVAL
APPROVED
REJECTED
CANCELLED
ERROR
```

## Consideraciones

Una implementación productiva debe utilizar identificadores estables en lugar de nombres visibles para usuarios y entidades relacionadas.

Las fechas deben almacenarse con una estrategia de zona horaria consistente y convertirse únicamente en la frontera de presentación.

Los cambios de estado deben validarse contra la máquina de estados permitida.
