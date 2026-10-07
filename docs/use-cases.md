# Casos de uso WFM

## Objetivo

Este documento define los principales casos de uso funcionales del portal:

1. Cambio de turno.
2. Teletrabajo.
3. Vacaciones.

Las reglas son genéricas y forman parte de una implementación independiente de portfolio. No representan políticas internas de una empresa concreta.

## 1. Cambio de turno

### Objetivo

Permitir que un empleado solicite una modificación de turno para una fecha determinada.

### Datos

- Solicitante.
- Fecha.
- Turno actual.
- Turno solicitado.
- Comentarios.
- Estado.

### Validaciones

Antes de enviar:

- Solicitante obligatorio.
- Fecha obligatoria.
- Turno actual obligatorio.
- Turno solicitado obligatorio.
- El turno solicitado debe ser diferente al actual.
- La fecha debe ser válida.
- No debe existir una solicitud duplicada activa para la misma fecha y solicitante.

### Flujo

~~~text
Empleado
   |
   v
Completa solicitud
   |
   v
Validación
   |
   +---- inválida ----> Mostrar error
   |
   v
SUBMITTED
   |
   v
PENDING_APPROVAL
   |
   +---- aprobar ----> APPROVED
   |
   +---- rechazar ---> REJECTED
~~~

### Riesgo operativo

Un cambio de turno puede afectar cobertura, descansos y distribución de capacidad. Por ello, una implementación WFM real debería poder integrar una validación adicional contra la planificación.

## 2. Teletrabajo

### Objetivo

Permitir solicitar teletrabajo para uno o varios días.

### Datos

- Solicitante.
- Fecha inicial.
- Fecha final.
- Comentarios.
- Estado.

### Validaciones

- Solicitante obligatorio.
- Fecha inicial obligatoria.
- Fecha final obligatoria.
- Fecha final >= fecha inicial.
- No solapar solicitudes activas equivalentes.
- Validar que el intervalo sea compatible con la política aplicable.

### Flujo

~~~text
Nueva solicitud
      |
      v
Validación
      |
      v
SUBMITTED
      |
      v
PENDING_APPROVAL
      |
      +----> APPROVED
      |
      +----> REJECTED
~~~

### Evolución posible

La solución puede incorporar reglas parametrizadas sin modificar la interfaz:

~~~text
Configuration
   |
   +-- MaxDays
   +-- AllowedDays
   +-- ApprovalGroup
   +-- AdvanceNoticeDays
~~~

Esto permite cambiar reglas de negocio mediante configuración.

## 3. Vacaciones

### Objetivo

Permitir solicitar un intervalo de vacaciones.

### Datos

- Solicitante.
- Fecha inicial.
- Fecha final.
- Comentarios.
- Estado.

### Validaciones

- Fechas obligatorias.
- Fecha final >= fecha inicial.
- No solapamiento con otra solicitud aprobada.
- Intervalo válido según configuración.
- La solicitud debe pasar por el workflow correspondiente.

### Cálculo del intervalo

Para un intervalo inclusivo:

~~~text
Days = DateDiff(StartDate, EndDate) + 1
~~~

Ejemplo:

~~~text
01/12/2026 → 03/12/2026
= 3 días naturales
~~~

La aplicación debe mostrar claramente el resultado para evitar errores de interpretación.

## 4. Reglas comunes

Todos los tipos de solicitud comparten una capa común.

### Identidad

La solicitud debe asociarse al usuario autenticado.

### Estado

Solo se permiten determinadas transiciones.

### Duplicados

Debe evitarse crear solicitudes equivalentes activas.

### Auditoría

Cada cambio relevante genera un evento de historial.

### Correlación

Cada proceso debe poder relacionarse mediante RequestId y CorrelationId.

## 5. Motor de reglas

En una implementación más avanzada, las reglas pueden separarse de la UI.

~~~text
Request
   |
   v
Rule Engine
   |
   +-- Validación estructural
   +-- Validación temporal
   +-- Duplicados
   +-- Reglas de negocio
   +-- Cobertura WFM
   |
   v
Decision
~~~

Esto evita convertir Canvas App en un conjunto difícil de mantener de fórmulas de negocio.

## 6. Validación WFM avanzada

El cambio de turno puede evolucionar hacia una validación de cobertura.

Conceptualmente:

~~~text
Solicitud de cambio
        |
        v
Obtener planificación
        |
        v
Calcular impacto
        |
        +-- Cobertura suficiente --> continuar
        |
        +-- Cobertura insuficiente -> revisión / rechazo
~~~

Las métricas posibles incluyen:

- Headcount requerido.
- Headcount planificado.
- Déficit.
- Exceso.
- Intervalos afectados.
- Impacto sobre SLA.

La implementación pública no utiliza datos reales de planificación.

## 7. Aprobación

La aprobación debe tratarse como una operación controlada.

Antes de aprobar:

1. Verificar que la solicitud existe.
2. Verificar que está en PENDING_APPROVAL.
3. Verificar que el aprobador tiene autorización.
4. Registrar la decisión.
5. Actualizar el estado.
6. Crear evento de auditoría.
7. Notificar al solicitante.

## 8. Rechazo

El rechazo debe exigir una justificación.

~~~text
REJECT
   |
   v
Reason required
   |
   v
Persist decision
   |
   v
REJECTED
   |
   v
Notify requester
~~~

El motivo permite:

- Trazabilidad.
- Análisis posterior.
- Identificación de problemas recurrentes.
- Mejora del proceso.

## 9. Cancelación

La cancelación debe estar restringida a estados compatibles.

Ejemplo:

~~~text
DRAFT --------> CANCELLED
SUBMITTED -----> CANCELLED
PENDING_APPROVAL -> CANCELLED
APPROVED -------> no cancelar directamente
REJECTED -------> no cancelar
~~~

Las reglas exactas deben depender del modelo funcional adoptado.

## 10. Casos de prueba

### Cambio de turno

| Caso | Resultado |
|---|---|
| Datos válidos | Solicitud creada |
| Fecha vacía | Error |
| Mismo turno | Error |
| Solicitud duplicada | Error |
| Aprobación válida | APPROVED |
| Rechazo sin motivo | Error |
| Rechazo con motivo | REJECTED |

### Teletrabajo

| Caso | Resultado |
|---|---|
| Un día válido | Solicitud creada |
| Intervalo válido | Solicitud creada |
| Fin anterior al inicio | Error |
| Solapamiento | Error |
| Aprobación | APPROVED |
| Rechazo | REJECTED |

### Vacaciones

| Caso | Resultado |
|---|---|
| Intervalo válido | Solicitud creada |
| Fin anterior al inicio | Error |
| Solapamiento | Error |
| Cálculo inclusivo | Correcto |
| Aprobación | APPROVED |
| Rechazo | REJECTED |

## 11. Evolución hacia WFM avanzado

El portal puede evolucionar desde una herramienta de solicitudes hacia una plataforma operativa:

~~~text
Solicitudes
    |
    v
Planificación
    |
    v
Cobertura
    |
    v
Forecast
    |
    v
Dimensionamiento
    |
    v
Optimización
~~~

En una arquitectura más avanzada, una solicitud podría generar automáticamente una evaluación de impacto sobre la capacidad planificada.

Esto conecta directamente la gestión administrativa de solicitudes con el objetivo principal de WFM: disponer de la capacidad adecuada en el momento adecuado.

## 12. Valor profesional

Los casos de uso demuestran competencias en:

- Análisis funcional.
- Diseño de reglas.
- Modelado de procesos.
- Workforce Management.
- Automatización.
- Power Apps.
- Power Automate.
- Control de estados.
- Auditoría.
- Testing.
- Diseño evolutivo.

La clave del proyecto es separar **la necesidad operativa** de **la herramienta tecnológica utilizada para resolverla**.
