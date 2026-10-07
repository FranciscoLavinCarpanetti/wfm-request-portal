# Pruebas del motor de impacto WFM

## Objetivo

Validar el cálculo sintético de impacto de capacidad utilizado por la demo pública.

La función principal es `calculateWfmImpact()`.

## Casos

| ID | Required | Baseline | Delta | Resultado esperado |
|---|---:|---:|---:|---|
| WFM-001 | 12 | 12 | 0 | LOW, déficit 0 |
| WFM-002 | 12 | 12 | -1 | MEDIUM, déficit 1 |
| WFM-003 | 12 | 12 | -2 | HIGH, déficit 2 |
| WFM-004 | 12 | 12 | -3 | CRITICAL, déficit 3 |
| WFM-005 | 10 | 12 | -1 | LOW, déficit 0 |
| WFM-006 | 12 | 10 | 0 | HIGH, déficit 2 |
| WFM-007 | 0 | 0 | 0 | LOW, cobertura 100% |
| WFM-008 | 12 | 10 | +2 | LOW, déficit 0 |

## Invariantes

El motor debe mantener:

- `Scenario Capacity = Baseline Capacity + Delta`.
- `Deficit >= 0`.
- Si `Scenario Capacity >= Required Capacity`, entonces `Deficit After = 0`.
- Si `Required Capacity > 0`, Coverage = Capacity / Required.
- La simulación no modifica los datos de solicitudes.

## Casos límite

### Capacidad requerida cero

No existe una división válida por cero. El motor utiliza cobertura 100% como representación neutral del caso sin demanda requerida.

### Delta positivo

Representa una incorporación de capacidad. Puede eliminar un déficit existente.

### Delta negativo

Representa pérdida de capacidad por ausencia, cambio de turno u otro impacto.

### Déficit preexistente

El motor diferencia entre el déficit antes y después de la solicitud para medir el impacto incremental.

## Limitación

Los niveles LOW/MEDIUM/HIGH/CRITICAL son umbrales demostrativos para el portfolio. Una implementación productiva debería parametrizarlos según objetivos de servicio y metodología WFM de la operación.
