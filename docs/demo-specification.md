# Especificación de la demo

## Objetivo

Proporcionar una representación accesible desde navegador del WFM Request Portal para que un revisor pueda comprender la solución sin acceso a Microsoft Power Platform.

## Roles

### Empleado

Puede:

- Crear solicitudes.
- Consultar solicitudes.
- Ver estados.
- Cancelar solicitudes elegibles.

### Aprobador

Puede:

- Consultar solicitudes pendientes.
- Aprobar.
- Rechazar.
- Añadir comentarios de decisión.

## Panel

Métricas:

- Total de solicitudes.
- Pendientes de aprobación.
- Aprobadas.
- Rechazadas.
- Canceladas.

## Formulario

Campos:

- Tipo de solicitud.
- Fecha de inicio.
- Fecha de fin.
- Turno opcional.
- Comentarios.

## Validación de negocio

Como mínimo:

- El tipo es obligatorio.
- La fecha de inicio es obligatoria.
- La fecha de fin es obligatoria.
- La fecha de fin no puede ser anterior a la de inicio.
- Una solicitud no puede aprobarse dos veces.
- Las solicitudes aprobadas o rechazadas no pueden editarse.

## Máquina de estados

```text
BORRADOR ──► ENVIADA ──► PENDIENTE DE APROBACIÓN
                              │
                       ┌──────┴──────┐
                       ▼             ▼
                    APROBADA      RECHAZADA
```

Los identificadores internos permanecen en inglés en el código.

## UX

La interfaz debe comunicar el estado con claridad sin exponer detalles de implementación innecesarios.
