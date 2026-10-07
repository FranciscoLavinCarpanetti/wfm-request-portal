# Roadmap

## Fase 1 — Portfolio público
Estado: Completada

- Demo web independiente.
- Datos sintéticos.
- Gestión de solicitudes.
- Roles Empleado / Aprobador.
- Estados.
- Aprobación y rechazo.
- Auditoría.
- Simulador WFM.
- Documentación funcional y técnica.
- Trazabilidad.
- Casos de prueba.
- GitHub Pages workflow.

## Fase 2 — Calidad de ingeniería
Estado: En progreso

- Validación estática de JavaScript.
- Tests automatizados del motor WFM.
- Mejora de accesibilidad.
- Gestión de errores de UI.
- Refuerzo de sanitización.
- Documentación de decisiones.

## Fase 3 — Power Platform de referencia
Objetivo: definir Solution architecture, Canvas App, Cloud Flows, Connection References, Environment Variables, modelo SharePoint/Dataverse, Approval workflow y Audit History.

La implementación debe realizarse en un entorno personal o de demostración autorizado.

## Fase 4 — Motor WFM
Objetivo: datos sintéticos por intervalo, Forecast, Required Capacity, Scheduled Capacity, Coverage, Deficit/Surplus e Impact Assessment.

## Fase 5 — Dimensionamiento avanzado
Objetivo: AHT, Arrival Rate, Service Level, Occupancy, Shrinkage, Erlang C y sensibilidad por escenario.

## Fase 6 — Optimización
Objetivo: evaluación de alternativas, cambios de turno, redistribución de capacidad, restricciones laborales, Skills, coste y optimización multiobjetivo.

## Principio del roadmap
La evolución debe mantener separadas las capas UI → Workflow → Datos → Motor WFM → Reporting. Esto permite sustituir una capa sin reconstruir toda la solución.