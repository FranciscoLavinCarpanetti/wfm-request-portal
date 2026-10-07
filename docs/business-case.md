# Caso de negocio

## Problema

Los equipos de Workforce Management suelen gestionar solicitudes operativas mediante correo electrónico, hojas de cálculo y pasos de aprobación desconectados. Esto genera:

- Visibilidad limitada del estado.
- Seguimiento manual con aprobadores.
- Validaciones inconsistentes.
- Entrada repetida de información.
- Trazabilidad débil.
- Reporting más complejo.

## Solución propuesta

WFM Request Portal estructura el ciclo de vida de las solicitudes:

```text
Empleado
   │
   ▼
Portal de solicitudes
   │
   ├── Cambio de turno
   ├── Teletrabajo
   └── Vacaciones
   │
   ▼
Validación
   │
   ▼
Workflow de aprobación
   │
   ├── Aprobada
   └── Rechazada
   │
   ▼
Notificación + auditoría
```

## Beneficios esperados

- Gestión centralizada.
- Menor coordinación manual.
- Responsabilidad clara en las aprobaciones.
- Estados consistentes.
- Mejor trazabilidad operativa.
- Base para analítica WFM.

## Alcance del portfolio

Es una implementación independiente de portfolio. Utiliza datos sintéticos y reglas de negocio genéricas; no debe interpretarse como copia o exportación de un sistema empresarial.
