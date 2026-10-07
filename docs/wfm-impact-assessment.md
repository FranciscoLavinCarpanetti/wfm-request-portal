# Impacto WFM de solicitudes

## Objetivo

Una solicitud administrativa puede tener un impacto directo sobre la capacidad operativa.

El objetivo es transformar la pregunta '¿Se puede aprobar esta solicitud?' en '¿Qué impacto tiene esta solicitud sobre la cobertura planificada?'

La implementación pública utiliza datos sintéticos y no representa una planificación empresarial real.

## 1. Flujo

Solicitud → intervalo afectado → demanda prevista + capacidad planificada → simulación → impacto → decisión.

## 2. Variables principales

### Demanda
La demanda representa la carga esperada en un intervalo: llamadas, chats, tickets o transacciones.

### Capacidad
La capacidad representa los recursos disponibles. Conceptualmente:

Capacity = Available Agents × Productive Time

Para una evaluación más precisa pueden incorporarse AHT, Occupancy, Shrinkage, Adherence, Skills e intervalo temporal.

## 3. Cobertura

Coverage Ratio = Planned Capacity / Required Capacity

| Ratio | Interpretación |
|---:|---|
| > 1.00 | Capacidad superior a necesidad |
| = 1.00 | Equilibrio |
| < 1.00 | Déficit |

Los umbrales reales deben ser configurables.

## 4. Déficit

Deficit = Required Capacity - Planned Capacity

Ejemplo sintético: Required = 12, Planned = 11, Deficit = 1.

Si una solicitud retira un agente del intervalo, Planned podría pasar a 10 y el déficit a 2.

## 5. Simulación

Se comparan dos escenarios:

- Baseline: planificación original.
- Scenario: planificación después de aplicar la solicitud.

Delta Capacity = Scenario Capacity - Baseline Capacity

## 6. Cambio de turno

Un cambio puede afectar varios intervalos. El motor debe evaluar cada intervalo afectado y detectar cambios de capacidad.

## 7. Teletrabajo

El teletrabajo no implica necesariamente una reducción de capacidad. Debe distinguirse entre agente que continúa operativo y agente que deja de estar disponible.

## 8. Vacaciones

Las vacaciones representan normalmente una reducción planificada de disponibilidad. El impacto puede calcularse como Capacity Before - Capacity After.

## 9. Métricas de decisión

| Métrica | Descripción |
|---|---|
| Required | Capacidad requerida |
| Baseline | Capacidad actual |
| Scenario | Capacidad simulada |
| Deficit Before | Déficit antes |
| Deficit After | Déficit después |
| Delta | Variación |
| Affected Intervals | Intervalos afectados |
| Risk Level | Nivel de impacto |

## 10. Nivel de impacto

- LOW: no genera déficit.
- MEDIUM: aumenta el déficit dentro de un margen operativo aceptable.
- HIGH: genera déficit relevante.
- CRITICAL: compromete significativamente el nivel de servicio previsto.

Los umbrales deben ser configurables y no deben asumirse como universales.

## 11. Integración con aprobación

Solicitud → validación administrativa → simulación WFM → evaluación de riesgo → aprobación, revisión o rechazo.

La automatización debe proporcionar información para decidir. La decisión automática solo debería utilizarse cuando las reglas estén formalmente definidas.

## 12. Separación entre motor y UI

El cálculo no debería vivir directamente en la interfaz.

Canvas App → Impact Assessment → Demand + Capacity + Schedule + Rules → Assessment Result

Resultado conceptual:

riskLevel: MEDIUM
requiredCapacity: 12
baselineCapacity: 12
scenarioCapacity: 11
deficitBefore: 0
deficitAfter: 1
deltaCapacity: -1

## 13. Evolución hacia Erlang C

En operaciones de contact center, la capacidad requerida puede evolucionar desde una aproximación simple hacia Erlang C utilizando Arrival Rate, AHT, Interval Length, Target Service Level, Target Answer Time, Occupancy y Shrinkage.

## 14. Conexión con Forecast

Historical Data → Forecast → Required Capacity → Schedule → Request Impact → Coverage

Esto conecta la gestión de solicitudes con el ciclo WFM completo.

## 15. Conexión con planificación

Una evolución posterior puede evaluar Headcount, Turnos, Skills, Descansos, Disponibilidad, Adherence y cobertura por intervalo.

El resultado puede ser:

- Approve
- Approve with alternative shift
- Review
- Reject

## 16. Principio clave

Una solicitud WFM no debe evaluarse únicamente como un registro administrativo. Debe poder analizarse como una modificación potencial de la capacidad operacional:

Employee Request → Schedule Change → Capacity Change → Coverage Impact → Operational Risk → Decision

## 17. Límites de la demo pública

La demo actual no calcula cobertura real ni utiliza datos de producción. No se incluyen horarios corporativos, empleados reales, forecasts reales, SLAs internos, reglas privadas ni datos de sistemas empresariales.

El módulo documenta la arquitectura y metodología que podría implementarse con datos autorizados.