# Arquitectura de referencia — WFM Request Portal

## 1. Visión general

La solución se plantea como una arquitectura desacoplada en cuatro capas:

~~~text
PRESENTACIÓN
Power Apps Canvas App
  - Dashboard
  - Nueva solicitud
  - Mis solicitudes
  - Detalle / historial
  - Bandeja de aprobación
          |
          v
ORQUESTACIÓN
Power Automate
  - Validación
  - Approval
  - Actualización de estados
  - Notificaciones
  - Reintentos / errores
  - Auditoría
          |
          v
DATOS
SharePoint Lists / Dataverse
  - Requests
  - RequestHistory
  - Configuration
          |
          v
ANALÍTICA
Power BI / reporting
~~~

La implementación pública reproduce esta lógica con una demo web estática y datos sintéticos.

## 2. Componentes

### Canvas App

Responsabilidades: captura de solicitudes, validación inmediata, presentación de estados, consulta, navegación y acciones según rol/estado.

Pantallas recomendadas:

| Pantalla | Responsabilidad |
|---|---|
| Inicio | KPIs y accesos |
| Nueva solicitud | Captura y validación |
| Mis solicitudes | Seguimiento |
| Detalle | Información y auditoría |
| Aprobaciones | Bandeja del aprobador |
| Configuración | Administración |

La interfaz no debe considerarse una frontera de seguridad.

### Power Automate

Responsabilidades: orquestación, aprobaciones, actualización de estados, notificaciones, reintentos, errores y auditoría.

Se recomienda separar:

1. Submit Request.
2. Approval Processor.
3. Notification.
4. Recovery / Error Handler.

### Capa de datos

Para una implementación ligera: SharePoint Lists.

Para mayor complejidad, relaciones, seguridad y ALM: Dataverse.

## 3. Modelo de datos

### Request

Representa el estado actual:

| Campo | Propósito |
|---|---|
| RequestId | Identificador estable |
| RequestType | Tipo |
| RequesterId | Solicitante |
| StartDate | Inicio |
| EndDate | Fin |
| Status | Estado |
| Comments | Comentarios |
| SubmittedAt | Envío |
| DecisionAt | Decisión |
| DecisionBy | Aprobador |
| CorrelationId | Trazabilidad |

### RequestHistory

Registra los eventos:

| Campo | Propósito |
|---|---|
| HistoryId | Identificador |
| RequestId | Relación |
| EventType | Tipo de evento |
| PreviousStatus | Estado anterior |
| NewStatus | Nuevo estado |
| Actor | Usuario o proceso |
| Timestamp | Fecha/hora |
| Comments | Contexto |
| CorrelationId | Correlación |

Separar estado actual e historial permite consultar rápidamente la situación de una solicitud sin perder trazabilidad.

## 4. Máquina de estados

~~~text
DRAFT
  |
  v
SUBMITTED
  |
  v
PENDING_APPROVAL
  |              |
  v              v
APPROVED       REJECTED

DRAFT / SUBMITTED
  |
  v
CANCELLED

Procesamiento con fallo
  |
  v
ERROR
~~~

Las transiciones deben estar controladas. Por ejemplo, PENDING_APPROVAL puede pasar a APPROVED o REJECTED, pero una solicitud APPROVED no debería volver arbitrariamente a PENDING_APPROVAL.

## 5. Idempotencia

Antes de procesar una decisión:

~~~text
IF currentStatus != PENDING_APPROVAL
    STOP
ELSE
    persist decision
    update status
    create history event
    notify
~~~

Esto evita decisiones, notificaciones o eventos duplicados cuando existen reintentos.

## 6. Seguridad

La seguridad debe existir en varias capas:

- Identidad mediante Microsoft Entra ID.
- Experiencia y acciones controladas en Canvas App.
- Permisos sobre SharePoint o Dataverse.
- Validación del contexto y estado dentro de los workflows.

Ocultar un botón de la interfaz no constituye autorización suficiente.

## 7. Configuración

No se deberían hard-codear valores específicos del entorno.

Ejemplos:

- URL de sitio.
- IDs de listas.
- Grupos de aprobación.
- Buzones.
- Parámetros SLA.
- Feature flags.

Power Platform debe utilizar Environment Variables y Connection References para permitir promoción entre entornos sin modificar la lógica.

## 8. Observabilidad

Una solución profesional debe poder responder:

- Qué solicitud falló.
- En qué paso.
- Cuándo ocurrió.
- Quién la inició.
- Qué flujo la procesó.
- Qué decisión se tomó.
- Si se reintentó.
- Si se notificó al usuario.

Se recomienda conservar RequestId, CorrelationId, Timestamp, operación, estado, tipo de error, mensaje y actor.

## 9. Reporting

Request y RequestHistory permiten calcular:

- Volumen por día.
- Volumen por tipo.
- Distribución de estados.
- Aging.
- Tiempo de resolución.
- Tasa de aprobación/rechazo.
- Solicitudes pendientes.

Tiempo de resolución:

~~~text
DecisionAt - SubmittedAt
~~~

Esto permite evolucionar desde una herramienta administrativa hacia una solución WFM con capacidad analítica.

## 10. ALM

Propuesta:

~~~text
Git / Repository
      |
      v
    DEV
      |
  Validation
      |
      v
    TEST
      |
 Functional Tests
      |
      v
    PROD
~~~

Cada entorno debe disponer de sus propias Connection References, Environment Variables, permisos y datos de prueba.

La promoción debe transportar la solución, evitando reconstrucciones manuales.

## 11. GitHub

El repositorio público contiene documentación, ejemplos Power Fx, workflows, modelo de datos, pruebas, demo y decisiones arquitectónicas.

No contiene exportaciones corporativas, credenciales, datos reales, URLs privadas, configuración de tenants ni secretos.

## 12. Principios de diseño

- Separación de responsabilidades.
- Configuración sobre hard-coding.
- Estados explícitos.
- Idempotencia.
- Auditoría.
- Observabilidad.
- Portabilidad.
- Mantenibilidad.
- Seguridad por capas.

## 13. Valor para el portfolio

Este proyecto combina:

~~~text
WFM
 |
 +-- Procesos operativos
 +-- Reglas de negocio
 +-- Planificación
 |
 v
Low-Code Engineering
 |
 +-- Power Apps
 +-- Power Automate
 +-- Power Fx
 |
 v
Software Engineering
 |
 +-- Arquitectura
 +-- Datos
 +-- Testing
 +-- Git
 +-- ALM
 +-- Observabilidad
~~~

La propuesta presenta Power Platform como parte de una solución de ingeniería orientada a procesos WFM, no como una herramienta aislada.
