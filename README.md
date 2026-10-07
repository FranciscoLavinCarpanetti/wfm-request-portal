# WFM Request Portal

Repositorio de referencia para documentar y evolucionar una solución de **Workforce Management (WFM)** orientada a la gestión estructurada de solicitudes operativas.

El objetivo de este repositorio es mantener un registro técnico y funcional de lo que se va construyendo: decisiones, arquitectura, reglas, modelos de datos, workflows, pruebas, simulaciones y evolución futura de la solución.

> **Proyecto independiente:** el repositorio utiliza conceptos y patrones generales de WFM, automatización y desarrollo de software. No contiene datos reales, credenciales, configuraciones privadas ni activos pertenecientes a terceros.

## Objetivo

Transformar la gestión de solicitudes operativas en un proceso estructurado, trazable y preparado para evolucionar hacia capacidades más avanzadas de WFM.

La solución parte de tres tipos de solicitud:

- Cambio de turno.
- Teletrabajo.
- Vacaciones.

Y contempla su recorrido desde la creación hasta la decisión:

```text
Solicitud
   ↓
Validación
   ↓
Enviada
   ↓
Pendiente de aprobación
   ↓
Aprobada / Rechazada
   ↓
Historial y auditoría
```

La intención no es limitar la solución a la gestión administrativa de solicitudes. El proyecto está diseñado para evolucionar hacia el análisis de cómo cada solicitud puede modificar la **capacidad operativa y la cobertura WFM**.

## Qué estamos construyendo

### Gestión de solicitudes

- Creación de solicitudes.
- Validación de datos.
- Consulta de solicitudes.
- Búsqueda y filtrado.
- Detalle de cada solicitud.
- Cancelación cuando corresponda.
- Aprobación y rechazo.
- Registro del motivo de rechazo.
- Historial de eventos.

### Impacto WFM

La solución incorpora un primer motor determinista para relacionar:

```text
Solicitud
   ↓
Variación de capacidad
   ↓
Capacidad antes / después
   ↓
Déficit
   ↓
Cobertura
   ↓
Nivel de impacto
```

Esta primera versión es deliberadamente sencilla. Su finalidad es establecer una base sobre la que posteriormente puedan incorporarse forecast, AHT, volumen, intervalos, occupancy, service level, shrinkage, Erlang C y dimensionamiento.

## Arquitectura de referencia

La arquitectura funcional se organiza en capas:

```text
                 ┌─────────────────────┐
                 │      Usuario         │
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │    Presentación     │
                 │    Power Apps       │
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │      Workflow       │
                 │   Power Automate    │
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │        Datos        │
                 │ SharePoint/Dataverse│
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │      Motor WFM      │
                 │ Demanda / Capacidad │
                 │ Cobertura / Impacto │
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │ Reporting / Análisis│
                 └─────────────────────┘
```

La aplicación web incluida en `demo/` representa de forma independiente la experiencia funcional y permite probar el concepto sin necesidad de disponer de un entorno Power Platform.

## Ciclo de vida de una solicitud

Los identificadores internos se mantienen estables para facilitar la implementación y las pruebas:

```text
DRAFT
  │
  ▼
SUBMITTED
  │
  ▼
PENDING_APPROVAL
  │
  ├──────────────► APPROVED
  │
  └──────────────► REJECTED

DRAFT / SUBMITTED
  │
  ▼
CANCELLED
```

La interfaz presenta estos estados en español.

## Demo

La carpeta [`demo/`](./demo/) contiene una aplicación web independiente con datos sintéticos.

Permite:

- Crear solicitudes.
- Validar fechas.
- Buscar y filtrar.
- Cambiar entre Empleado y Aprobador.
- Consultar el detalle.
- Aprobar solicitudes.
- Rechazar solicitudes indicando un motivo.
- Cancelar solicitudes.
- Consultar el historial.
- Simular impacto de capacidad.

### Motor WFM

El archivo [`demo/wfm-engine.js`](./demo/wfm-engine.js) contiene el motor inicial de impacto WFM.

Calcula:

- Capacidad requerida.
- Capacidad planificada.
- Variación de capacidad.
- Capacidad resultante.
- Déficit antes.
- Déficit después.
- Cobertura antes.
- Cobertura después.
- Nivel de riesgo.

La lógica es determinista y está cubierta mediante pruebas automatizadas.

## Pruebas

Las pruebas del motor están en:

[`tests/wfm-engine.test.js`](./tests/wfm-engine.test.js)

Se ejecutan con Node.js:

```bash
node --test tests/wfm-engine.test.js
```

Además, GitHub Actions ejecuta automáticamente estas pruebas cuando se modifican el motor, las pruebas o la demo.

## Documentación

### Arquitectura y diseño

- [Estado de implementación](./docs/implementation-status.md)
- [Modelo de dominio](./docs/domain-model.md)
- [Reglas de negocio](./docs/business-rules.md)
- [Máquina de estados](./docs/state-machine.md)
- [Contrato de datos](./docs/data-contract.md)
- [Arquitectura](./docs/architecture.md)
- [Arquitectura de referencia](./docs/reference-architecture.md)
- [Mapeo técnico de la demo](./docs/demo-technical-mapping.md)
- [Decisiones técnicas](./docs/decisions.md)
- [Modelo de datos](./docs/data-model.md)

### Funcionalidad

- [Casos de uso](./docs/use-cases.md)
- [Especificación de la demo](./docs/demo-specification.md)
- [Workflow](./docs/workflow.md)
- [Diseño de Power Apps](./docs/power-app.md)
- [Flujos de Power Automate](./power-platform/flows/README.md)

### WFM

- [Evaluación de impacto WFM](./docs/wfm-impact-assessment.md)
- [Simulación WFM](./docs/wfm-simulation.md)

### Ingeniería

- [Backlog técnico](./docs/backlog.md)
- [Decisiones pendientes](./docs/open-decisions.md)
- [Catálogo de errores](./docs/error-catalog.md)
- [Observabilidad](./docs/observability.md)
- [Trazabilidad de requisitos](./docs/requirements-traceability.md)
- [Casos de prueba](./tests/test-cases.md)
- [Pruebas del motor WFM](./tests/wfm-impact-test-cases.md)
- [ALM](./docs/alm.md)
- [Roadmap](./docs/roadmap.md)
- [Caso de estudio](./docs/case-study.md)

### Seguridad y alcance

- [Límites del proyecto](./docs/portfolio-boundaries.md)
- [Política de seguridad](./SECURITY.md)
- [Changelog](./CHANGELOG.md)

## Estructura

```text
wfm-request-portal/
├── README.md
├── SECURITY.md
├── CHANGELOG.md
│
├── demo/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── wfm-engine.js
│   └── README.md
│
├── docs/
│   ├── architecture.md
│   ├── reference-architecture.md
│   ├── demo-technical-mapping.md
│   ├── business-case.md
│   ├── data-model.md
│   ├── workflow.md
│   ├── power-app.md
│   ├── alm.md
│   ├── decisions.md
│   ├── use-cases.md
│   ├── requirements-traceability.md
│   ├── wfm-impact-assessment.md
│   ├── wfm-simulation.md
│   ├── case-study.md
│   └── roadmap.md
│
├── power-platform/
│   ├── powerfx/
│   └── flows/
│
├── sample-data/
│
└── tests/
    ├── test-cases.md
    ├── wfm-impact-test-cases.md
    └── wfm-engine.test.js
```

## Principios de desarrollo

El proyecto se mantiene con estos criterios:

- Separación entre interfaz, workflow, datos y lógica WFM.
- Identificadores y estados explícitos.
- Validaciones deterministas.
- Idempotencia.
- Trazabilidad.
- Pruebas automatizadas.
- Configuración frente a valores hard-coded.
- Diseño preparado para evolución.
- Documentación de decisiones.
- Datos sintéticos para los ejemplos públicos.

## Datos WFM sintéticos

La carpeta [`sample-data/`](./sample-data/) incluye ahora datasets sintéticos por intervalo para comenzar a evolucionar el motor hacia forecast, capacidad, cobertura y escenarios temporales.

- [`wfm-intervals.csv`](./sample-data/wfm-intervals.csv)
- [`wfm-forecast.csv`](./sample-data/wfm-forecast.csv)
- [`wfm-schedule.csv`](./sample-data/wfm-schedule.csv)

## Evolución prevista

La evolución funcional se plantea por capas:

```text
Solicitudes
    ↓
Impacto WFM
    ↓
Cobertura
    ↓
Forecast
    ↓
Dimensionamiento
    ↓
Optimización
    ↓
Reporting avanzado
```

El siguiente nivel del motor deberá incorporar progresivamente variables reales de WFM como:

- Volumen de contactos.
- Intervalos de planificación.
- AHT.
- Service Level.
- Occupancy.
- Shrinkage.
- Capacidad disponible.
- Necesidad de agentes.
- Déficit/superávit.
- Escenarios.
- Forecast frente a realidad.
- Optimización de turnos.

La evolución se realizará manteniendo separadas la lógica de negocio, la interfaz y las integraciones.
