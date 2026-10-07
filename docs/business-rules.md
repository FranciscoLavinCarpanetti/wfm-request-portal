# Reglas de negocio

Las reglas son genéricas y forman parte del modelo funcional.

| ID | Regla |
|---|---|
| BR-001 | El tipo de solicitud es obligatorio. |
| BR-002 | El solicitante es obligatorio. |
| BR-003 | La fecha final no puede ser anterior a la inicial. |
| BR-004 | No debe existir una solicitud activa equivalente cuando la regla del tipo lo impida. |
| BR-005 | Solo una solicitud válida puede pasar a SUBMITTED. |
| BR-006 | Solo PENDING_APPROVAL puede aprobarse. |
| BR-007 | Solo PENDING_APPROVAL puede rechazarse. |
| BR-008 | APPROVED y REJECTED son estados de decisión única. |
| BR-009 | Solo estados configurados como cancelables pueden pasar a CANCELLED. |
| BR-010 | En cambio de turno, el turno solicitado debe ser distinto del actual. |
| BR-011 | Un cambio de turno puede requerir evaluación de cobertura. |
| BR-012 | Teletrabajo no implica automáticamente pérdida de capacidad. |
| BR-013 | Vacaciones pueden reducir capacidad en intervalos afectados. |
| BR-014 | Scenario Capacity = max(0, Baseline Capacity + Capacity Delta). |
| BR-015 | Deficit = max(0, Required Capacity - Capacity). |
| BR-016 | Si Required Capacity > 0, Coverage = Capacity / Required Capacity. |

Los umbrales de riesgo de la demo son demostrativos y deben parametrizarse en una operación real.