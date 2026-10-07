# Modelo de dominio

~~~text
Employee
   │
   │ crea
   ▼
Request
   │
   ├── Shift Change
   ├── Remote Work
   └── Leave
   │
   ▼
Request History
   │
   ▼
WFM Impact
   ├── Required Capacity
   ├── Baseline Capacity
   ├── Scenario Capacity
   ├── Coverage
   └── Risk
~~~

## Entidades

**Employee:** usuario que crea o gestiona una solicitud.

**Request:** solicitud operativa con tipo, solicitante, fechas, estado, comentarios y trazabilidad.

**RequestHistory:** eventos del ciclo de vida con estado anterior/nuevo, actor, fecha y correlación.

**WFM Impact:** efecto sobre capacidad, déficit, cobertura y riesgo.

## Relaciones

~~~text
Employee 1 ──── N Request
Request  1 ──── N RequestHistory
Request  1 ──── N WfmImpact
~~~

La evolución por intervalos sustituirá el impacto agregado por resultados temporales.