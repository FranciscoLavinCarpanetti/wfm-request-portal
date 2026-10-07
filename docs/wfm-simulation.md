# Simulador de impacto WFM

## Objetivo

La demo incorpora un pequeño motor determinista para ilustrar cómo una solicitud puede modificar la capacidad disponible y cómo ese cambio puede afectar a la cobertura.

El motor utiliza únicamente datos introducidos por el usuario de la demo. No consulta sistemas externos ni datos corporativos.

## Modelo

El escenario compara:

- Capacidad requerida.
- Capacidad planificada antes de la solicitud.
- Variación de capacidad provocada por la solicitud.
- Capacidad resultante.
- Déficit antes y después.
- Cobertura antes y después.
- Nivel de riesgo.

### Fórmulas

`Scenario Capacity = Baseline Capacity + Capacity Delta`

`Deficit = max(0, Required Capacity - Capacity)`

`Coverage = Capacity / Required Capacity`

El nivel de riesgo de la demo utiliza umbrales deliberadamente simples:

| Déficit posterior | Riesgo |
|---:|---|
| 0 | LOW |
| 1 | MEDIUM |
| 2 | HIGH |
| > 2 | CRITICAL |

Estos umbrales son únicamente demostrativos y deben parametrizarse en una implementación real.

## Ejemplo

Entrada:

- Required Capacity = 12
- Baseline Capacity = 12
- Capacity Delta = -1

Resultado:

- Scenario Capacity = 11
- Deficit Before = 0
- Deficit After = 1
- Coverage Before = 100%
- Coverage After = 92%
- Risk = MEDIUM

## Evolución

El mismo contrato puede sustituir la entrada manual por datos provenientes de:

1. Forecast.
2. Dimensionamiento.
3. Planificación.
4. Schedule.
5. Skills.
6. Adherence.
7. Reglas de negocio.

El motor se mantiene separado de la interfaz para facilitar pruebas y sustitución de la fuente de datos.

## Limitación

No es un motor de Erlang C ni un modelo de dimensionamiento productivo. Es una demostración de arquitectura y razonamiento WFM.
