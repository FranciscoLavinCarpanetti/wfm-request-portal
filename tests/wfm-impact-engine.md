# Pruebas del motor de impacto WFM

## Objetivo

Validar el comportamiento determinista de `calculateWfmImpact`.

## Casos

| ID | Required | Baseline | Delta | Scenario | Deficit After | Risk |
|---|---:|---:|---:|---:|---:|---|
| WFM-001 | 12 | 12 | 0 | 12 | 0 | LOW |
| WFM-002 | 12 | 12 | -1 | 11 | 1 | MEDIUM |
| WFM-003 | 12 | 12 | -2 | 10 | 2 | HIGH |
| WFM-004 | 12 | 12 | -3 | 9 | 3 | CRITICAL |
| WFM-005 | 12 | 10 | 1 | 11 | 1 | MEDIUM |
| WFM-006 | 12 | 10 | 3 | 13 | 0 | LOW |

## Criterios

- El escenario debe ser igual a Baseline + Delta.
- El déficit nunca puede ser negativo.
- La cobertura se calcula como Capacity / Required.
- El nivel de riesgo depende del déficit posterior.
- El motor no debe modificar los datos de entrada.
- El resultado debe ser determinista para la misma entrada.

## Casos límite

- Required = 0.
- Baseline = 0.
- Delta positivo.
- Delta negativo superior a la capacidad disponible.
- Valores decimales.
- Valores no numéricos.

La implementación productiva debe definir explícitamente cómo tratar valores inválidos antes de ejecutar el cálculo.
