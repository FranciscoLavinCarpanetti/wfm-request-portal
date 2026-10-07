# Demo técnica y correspondencia con Power Platform

## Objetivo

La carpeta `demo/` contiene una implementación web independiente y autocontenida que reproduce, con datos sintéticos, el comportamiento funcional de un portal de solicitudes WFM.

Su finalidad es demostrar el diseño de producto y la lógica funcional sin requerir acceso a un tenant de Microsoft Power Platform.

> Esta demo no es una exportación de una aplicación corporativa ni contiene código, datos o configuración privada de ningún entorno empresarial.

## Flujo funcional

```text
Empleado
   │
   ▼
Nueva solicitud
   │
   ├── Validación de campos
   ├── Validación de fechas
   └── Identificación de tipo
   │
   ▼
SUBMITTED
   │
   ▼
PENDING_APPROVAL
   │
   ├───────────────┐
   ▼               ▼
APPROVED        REJECTED
   │               │
   └───────┬───────┘
           ▼
     Historial / auditoría
```

El usuario puede cambiar entre los roles **Empleado** y **Aprobador** para visualizar las distintas capacidades del proceso.

## Funcionalidades demostradas

| Funcionalidad | Demo | Implementación Power Platform equivalente |
|---|---|---|
| Alta de solicitud | Sí | Canvas App |
| Validación de fechas | Sí | Power Fx |
| Tipología de solicitud | Sí | Choice / configuración |
| Estado de solicitud | Sí | SharePoint / Dataverse |
| Bandeja de solicitudes | Sí | Canvas App + consulta de datos |
| Búsqueda y filtros | Sí | Power Fx / delegación |
| Detalle | Sí | Canvas App |
| Aprobación | Sí | Power Automate Approvals |
| Rechazo con comentario | Sí | Power Automate + campo de decisión |
| Cancelación | Sí | Power Fx + flujo de actualización |
| Historial | Sí | Tabla/lista de auditoría |
| Métricas | Sí | Power Apps / Power BI |
| Configuración | Conceptual | Environment Variables |
| Seguridad | Conceptual | Roles + permisos de datos |
| ALM | Documentado | Solutions + pipelines/GitHub |

## Modelo de estados

Los estados internos utilizan identificadores estables en inglés:

- `DRAFT`
- `SUBMITTED`
- `PENDING_APPROVAL`
- `APPROVED`
- `REJECTED`
- `CANCELLED`
- `ERROR`

La interfaz presenta estos estados en español.

Esta separación evita que el texto visible de la aplicación forme parte de la lógica de negocio.

## Separación de responsabilidades

### Canvas App

Responsabilidades:

- Captura de solicitudes.
- Validación inmediata de datos.
- Presentación de estados.
- Consulta de solicitudes.
- Navegación y experiencia de usuario.
- Acciones permitidas según rol/estado.

La aplicación no debería ser la única capa de seguridad.

### Power Automate

Responsabilidades:

- Orquestación.
- Creación y gestión de aprobaciones.
- Actualización de estados.
- Notificaciones.
- Control de errores.
- Reintentos.
- Registro de eventos.
- Idempotencia.

### Capa de datos

Para una implementación ligera:

- SharePoint Lists.

Para una solución empresarial con mayor complejidad:

- Dataverse.

La elección debe depender de volumen, seguridad, relaciones, gobierno, ALM y necesidades de reporting.

## Idempotencia

Una aprobación no debe poder procesarse dos veces.

Antes de aplicar una decisión, el flujo debe comprobar que la solicitud continúa en:

`PENDING_APPROVAL`.

Conceptualmente:

```text
IF Status != PENDING_APPROVAL
    STOP
ELSE
    persist decision
    update status
    notify
```

Esto evita decisiones duplicadas y notificaciones repetidas ante reintentos.

## Auditoría

Una implementación real debería separar el registro principal de la solicitud de su historial.

### Request

Contiene el estado actual:

- RequestId
- RequestType
- Requester
- StartDate
- EndDate
- Status
- Comments
- SubmittedAt
- DecisionAt
- DecisionBy

### RequestHistory

Registra eventos:

- HistoryId
- RequestId
- EventType
- PreviousStatus
- NewStatus
- Actor
- Timestamp
- Comments
- CorrelationId

Esto permite reconstruir el ciclo de vida de una solicitud.

## Gestión de errores

Los errores deben diferenciarse por naturaleza:

### Error de validación

El usuario puede corregirlo.

Ejemplo:

`EndDate < StartDate`

### Error de negocio

La solicitud no cumple una regla.

Ejemplo:

- solicitud incompatible con una condición operativa.

### Error de integración

Falla un conector o servicio externo.

Debe existir reintento controlado.

### Error de workflow

Una aprobación queda pendiente, expira o falla.

Debe quedar trazabilidad para recuperación.

### Error inesperado

Debe conservarse el identificador de solicitud y el contexto de ejecución para facilitar diagnóstico.

## ALM

Una implementación profesional debería utilizar una Solution y separar entornos:

```text
DEV
 │
 ├── desarrollo
 ├── pruebas unitarias
 │
 ▼
TEST
 │
 ├── validación funcional
 ├── pruebas de integración
 │
 ▼
PROD
```

Los elementos dependientes del entorno no deberían quedar hard-coded.

Ejemplos:

- URLs.
- IDs de listas.
- buzones.
- grupos de aprobación.
- parámetros de configuración.
- referencias de conexión.

La configuración debería resolverse mediante **Environment Variables** y **Connection References**.

## Relación con GitHub

GitHub representa la capa de ingeniería y gobierno del proyecto:

```text
Power Platform
      │
      ▼
Solution / artefactos
      │
      ▼
Control de versiones
      │
      ▼
Pull Request
      │
      ▼
Validación
      │
      ▼
Despliegue
```

La demo web del repositorio no pretende sustituir Power Platform. Sirve como representación pública y reproducible de la arquitectura funcional.

## Qué demuestra este proyecto

Este proyecto permite evaluar competencias en:

- Workforce Management.
- Análisis y diseño de procesos.
- Modelado de datos.
- Power Apps.
- Power Automate.
- Power Fx.
- Automatización de workflows.
- Diseño de estados.
- Aprobaciones.
- Auditoría.
- Idempotencia.
- Gestión de errores.
- ALM.
- Git/GitHub.
- Diseño orientado a mantenibilidad y escalabilidad.

## Limitaciones deliberadas de la demo

La demo utiliza almacenamiento en memoria del navegador.

Por tanto:

- No existe backend persistente.
- No existen usuarios reales.
- No existe autenticación.
- No existen conectores.
- No existe ejecución real de Power Automate.
- No existe persistencia entre sesiones.

Estas limitaciones son deliberadas para que el proyecto pueda ejecutarse públicamente sin infraestructura privada.

La arquitectura documentada muestra cómo trasladar el comportamiento a una implementación real.
