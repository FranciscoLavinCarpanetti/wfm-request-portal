# WFM Request Portal

Plataforma de portfolio para la gestión de solicitudes de **Workforce Management (WFM)**, diseñada alrededor de patrones de Microsoft Power Platform y principios de ingeniería de software.

> **Proyecto independiente de portfolio:** esta implementación se ha construido de forma independiente a partir de patrones operativos transferibles. No contiene código fuente de Telpark, datos de producción, credenciales, URLs privadas ni configuración corporativa.

## Qué demuestra

El proyecto muestra cómo transformar un proceso manual de solicitudes WFM en un workflow estructurado con:

- Solicitudes de cambio de turno.
- Solicitudes de teletrabajo.
- Solicitudes de vacaciones.
- Validaciones.
- Aprobaciones y rechazos.
- Historial y auditoría.
- Automatización.
- Evaluación sintética de impacto WFM.
- Trazabilidad de requisitos.
- Diseño orientado a ALM y mantenibilidad.

## Arquitectura

~~~text
Usuario
   |
   v
Power Apps
   |
   v
Datos
SharePoint / Dataverse
   |
   v
Power Automate
   |
   +---- Validación
   +---- Aprobación
   +---- Notificación
   +---- Auditoría
   |
   v
Reporting / WFM
   |
   +---- Demanda
   +---- Capacidad
   +---- Cobertura
   +---- Impacto
~~~

La demo pública reproduce la lógica funcional mediante una aplicación web independiente con datos sintéticos.

## Ciclo de vida

~~~text
DRAFT
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

DRAFT / SUBMITTED
  |
  v
CANCELLED
~~~

## Demo interactiva

La carpeta [`demo/`](./demo/) contiene una demo web independiente y reproducible.

Permite:

- Crear solicitudes.
- Validar fechas.
- Buscar y filtrar.
- Cambiar entre vista de Empleado y Aprobador.
- Consultar detalle.
- Aprobar y rechazar.
- Registrar motivos de rechazo.
- Cancelar solicitudes.
- Visualizar historial.
- Simular impacto de capacidad.
- Comparar capacidad antes y después de una solicitud.

La demo también incorpora un pequeño **motor WFM sintético** que calcula déficit, cobertura, variación de capacidad y nivel de impacto.

## Documentación técnica

### Arquitectura

- [Arquitectura general](./docs/architecture.md)
- [Arquitectura de referencia](./docs/reference-architecture.md)
- [Mapeo técnico de la demo](./docs/demo-technical-mapping.md)

### Funcionalidad WFM

- [Casos de uso](./docs/use-cases.md)
- [Evaluación de impacto WFM](./docs/wfm-impact-assessment.md)
- [Simulación WFM](./docs/wfm-simulation.md)

### Ingeniería

- [Modelo de datos](./docs/data-model.md)
- [Workflow](./docs/workflow.md)
- [Power Apps](./docs/power-app.md)
- [Power Fx](./power-platform/powerfx/examples.md)
- [ALM](./docs/alm.md)
- [Decisiones arquitectónicas](./docs/decisions.md)
- [Trazabilidad de requisitos](./docs/requirements-traceability.md)
- [Casos de prueba](./tests/test-cases.md)
- [Pruebas del motor WFM](./tests/wfm-impact-test-cases.md)

### Seguridad y portfolio

- [Límites del portfolio](./docs/portfolio-boundaries.md)
- [Política de seguridad](./SECURITY.md)
- [Changelog](./CHANGELOG.md)

## Tecnologías y conceptos

- Microsoft Power Apps.
- Power Automate.
- SharePoint / Dataverse.
- Power Fx.
- Git / GitHub.
- Power Platform ALM.
- Modelado de datos.
- Workflows.
- Aprobaciones.
- Idempotencia.
- Auditoría.
- Observabilidad.
- Workforce Management.
- Forecast y capacidad.
- Cobertura operativa.

## Objetivos técnicos

- Separar presentación, datos y workflow.
- Evitar lógica de negocio innecesariamente acoplada a la interfaz.
- Utilizar configuración en lugar de valores hard-coded.
- Evitar ejecuciones duplicadas.
- Mantener trazabilidad de las transiciones.
- Facilitar pruebas.
- Diseñar para evolución y mantenibilidad.
- Aplicar principios de ALM a soluciones low-code.

## Estructura

~~~text
wfm-request-portal/
├── README.md
├── SECURITY.md
├── CHANGELOG.md
├── docs/
│   ├── architecture.md
│   ├── business-case.md
│   ├── data-model.md
│   ├── workflow.md
│   ├── power-app.md
│   ├── alm.md
│   ├── decisions.md
│   ├── demo-specification.md
│   ├── demo-technical-mapping.md
│   ├── reference-architecture.md
│   ├── use-cases.md
│   ├── requirements-traceability.md
│   ├── wfm-impact-assessment.md
│   └── wfm-simulation.md
├── power-platform/
│   ├── powerfx/
│   └── flows/
├── sample-data/
├── tests/
└── demo/
    ├── index.html
    ├── styles.css
    ├── app.js
    └── wfm-engine.js
~~~

## Alcance del portfolio

El proyecto separa deliberadamente los patrones de ingeniería transferibles de cualquier implementación empresarial concreta.

No se publican:

- Datos reales.
- Información personal de empleados.
- Credenciales.
- Secretos.
- URLs privadas.
- Configuración de tenants.
- Exportaciones de soluciones corporativas.
- Reglas internas confidenciales.

Los datos de la demo son sintéticos.

## Evolución prevista

El proyecto puede evolucionar hacia:

~~~text
Solicitudes
    |
    v
Impacto WFM
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

El objetivo es demostrar cómo combinar **WFM + automatización + low-code + ingeniería de software** en una solución mantenible y escalable.
