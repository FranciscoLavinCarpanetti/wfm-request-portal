# WFM Request Portal

> Registro técnico y funcional de una solución de **Workforce Management (WFM)** orientada a solicitudes operativas, trazabilidad y análisis de impacto sobre la capacidad.

## Demo en vivo

<p align="center">
  <a href="https://franciscolavincarpanetti.github.io/wfm-request-portal/">
    <strong>▶ ABRIR DEMO INTERACTIVA</strong>
  </a>
</p>

**Prueba directamente en el navegador:** creación de solicitudes, cambio de turno, validaciones, filtros, aprobación/rechazo, historial y simulación de impacto WFM.

| Puedes probar | Código que lo controla |
|---|---|
| Nueva solicitud | [demo/index.html](./demo/index.html) · [demo/app.js](./demo/app.js) |
| Cambio de turno | [demo/app.js](./demo/app.js) |
| Aprobar / rechazar | [demo/app.js](./demo/app.js) |
| Impacto de capacidad | [demo/wfm-engine.js](./demo/wfm-engine.js) |
| Pruebas automáticas | [tests/wfm-engine.test.js](./tests/wfm-engine.test.js) |

---

## Qué estamos construyendo

La solución parte de tres tipos de solicitud:

- Cambio de turno.
- Teletrabajo.
- Vacaciones.

El flujo funcional es:

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
   ↓
Impacto sobre capacidad WFM
```

La aplicación no se limita a registrar solicitudes: el objetivo es relacionar cada cambio con su posible efecto sobre la **capacidad, cobertura y riesgo operativo**.

## Experiencia funcional

**1. Solicitudes**

- Crear y validar solicitudes.
- Buscar y filtrar.
- Consultar detalle.
- Cancelar cuando corresponda.
- Aprobar o rechazar.
- Registrar motivo de rechazo.
- Consultar historial.

**2. Simulación WFM**

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

El motor actual es determinista y constituye la base para incorporar posteriormente forecast, AHT, volumen, intervalos, occupancy, service level, shrinkage, Erlang C y dimensionamiento.

---

## Arquitectura

```text
┌──────────────┐
│    Usuario   │
└──────┬───────┘
       ↓
┌──────────────┐
│ Presentación │  Power Apps / Demo web
└──────┬───────┘
       ↓
┌──────────────┐
│   Workflow   │  Power Automate
└──────┬───────┘
       ↓
┌──────────────┐
│    Datos     │  SharePoint / Dataverse
└──────┬───────┘
       ↓
┌──────────────┐
│   Motor WFM  │  Demanda · Capacidad · Cobertura
└──────┬───────┘
       ↓
┌──────────────┐
│   Análisis   │
└──────────────┘
```

La carpeta `demo/` permite explorar la experiencia funcional sin necesidad de un entorno Power Platform.

---

## Aprende el código viendo la demo

La demo está separada en cuatro piezas:

| Archivo | Responsabilidad |
|---|---|
| [index.html](./demo/index.html) | Estructura de la interfaz |
| [styles.css](./demo/styles.css) | Apariencia y responsive |
| [app.js](./demo/app.js) | Eventos, validaciones, filtros y flujo |
| [wfm-engine.js](./demo/wfm-engine.js) | Cálculos WFM |

Ejemplo:

```text
Cambias "Tipo de solicitud"
        ↓
       app.js
        ↓
updateTypeFields()
        ↓
Aparecen los campos de turno
```

Y para el impacto:

```text
app.js
   ↓
calculateWfmImpact()
   ↓
wfm-engine.js
   ↓
Capacidad · Déficit · Cobertura · Riesgo
```

Esto permite utilizar la propia demo como referencia para estudiar cómo una interfaz web conecta eventos, lógica de aplicación y reglas WFM.

---

## Estado actual

| Área | Estado |
|---|---|
| Demo web | **Funcional** |
| Solicitudes | **Funcional** |
| Validaciones | **Funcional** |
| Aprobación / rechazo | **Funcional** |
| Historial | **Funcional en demo** |
| Motor de impacto WFM | **Funcional** |
| Datos persistentes | Pendiente |
| Impacto por intervalo | Siguiente evolución |
| Forecast | Roadmap |
| Dimensionamiento / Erlang C | Roadmap |
| Optimización de turnos | Roadmap |

Consulta el [estado detallado de implementación](./docs/implementation-status.md).

---

## Datos WFM sintéticos

La carpeta [sample-data](./sample-data/) contiene datasets sintéticos para evolucionar el motor:

- [requests.csv](./sample-data/requests.csv)
- [wfm-intervals.csv](./sample-data/wfm-intervals.csv)
- [wfm-forecast.csv](./sample-data/wfm-forecast.csv)
- [wfm-schedule.csv](./sample-data/wfm-schedule.csv)

No se utilizan datos reales, credenciales, configuraciones privadas ni activos pertenecientes a terceros.

---

## Documentación técnica

<details>
<summary><strong>Arquitectura y dominio</strong></summary>

- [Modelo de dominio](./docs/domain-model.md)
- [Reglas de negocio](./docs/business-rules.md)
- [Máquina de estados](./docs/state-machine.md)
- [Contrato de datos](./docs/data-contract.md)
- [Arquitectura](./docs/architecture.md)
- [Arquitectura de referencia](./docs/reference-architecture.md)
- [Mapeo técnico de la demo](./docs/demo-technical-mapping.md)
- [Modelo de datos](./docs/data-model.md)

</details>

<details>
<summary><strong>Funcionalidad y Power Platform</strong></summary>

- [Casos de uso](./docs/use-cases.md)
- [Especificación de la demo](./docs/demo-specification.md)
- [Workflow](./docs/workflow.md)
- [Diseño de Power Apps](./docs/power-app.md)
- [Flujos de Power Automate](./power-platform/flows/README.md)

</details>

<details>
<summary><strong>WFM</strong></summary>

- [Evaluación de impacto WFM](./docs/wfm-impact-assessment.md)
- [Simulación WFM](./docs/wfm-simulation.md)
- [Roadmap](./docs/roadmap.md)

</details>

<details>
<summary><strong>Ingeniería, pruebas y operación</strong></summary>

- [Backlog técnico](./docs/backlog.md)
- [Decisiones pendientes](./docs/open-decisions.md)
- [Catálogo de errores](./docs/error-catalog.md)
- [Observabilidad](./docs/observability.md)
- [Trazabilidad de requisitos](./docs/requirements-traceability.md)
- [Casos de prueba](./tests/test-cases.md)
- [Pruebas del motor WFM](./tests/wfm-impact-test-cases.md)
- [ALM](./docs/alm.md)
- [Changelog](./CHANGELOG.md)

</details>

---

## Estructura

```text
wfm-request-portal/
├── demo/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── wfm-engine.js
├── docs/
├── power-platform/
├── sample-data/
├── tests/
├── README.md
├── SECURITY.md
└── CHANGELOG.md
```

## Principios

- Separación entre interfaz, workflow, datos y lógica WFM.
- Identificadores y estados explícitos.
- Validaciones deterministas.
- Trazabilidad.
- Pruebas automatizadas.
- Configuración frente a valores hard-coded.
- Evolución incremental.
- Documentación de decisiones.
- Datos sintéticos para los ejemplos públicos.

## Evolución

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

Consulta el [roadmap](./docs/roadmap.md) para el detalle de las siguientes fases.
