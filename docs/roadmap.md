# Roadmap

## Fase 1 — Base funcional

Estado: Completada

- Demo web independiente.
- Datos sintéticos.
- Gestión de solicitudes.
- Roles Empleado / Aprobador.
- Estados.
- Aprobación y rechazo.
- Auditoría simulada.
- Simulador WFM.
- Documentación funcional y técnica.
- Trazabilidad.
- Casos de prueba.
- GitHub Pages.

## Fase 2 — Consolidación de ingeniería

Estado: Completada

- Motor WFM determinista.
- Pruebas automatizadas.
- CI con validación de sintaxis.
- Accesibilidad básica.
- Modelo de dominio.
- Reglas de negocio.
- Máquina de estados.
- Contrato de datos.
- Catálogo de errores.
- Observabilidad.
- Backlog técnico.
- Decisiones pendientes.
- Datos WFM sintéticos.

## Fase 3 — Evolución funcional

Estado: Siguiente

- Formulario dinámico por tipo.
- Turno actual y turno solicitado.
- Reglas ejecutables.
- Auditoría estructurada.
- Mayor cobertura de pruebas.
- Matriz requisito → implementación → prueba.

## Fase 4 — Motor WFM por intervalos

- Forecast por intervalo.
- Capacidad requerida.
- Capacidad planificada.
- Baseline vs Scenario.
- Impacto de solicitudes por intervalo.
- Déficit/superávit.
- Intervalos críticos.
- Escenarios.

## Fase 5 — Dimensionamiento avanzado

- Volumen.
- AHT.
- Arrival Rate.
- Service Level.
- Occupancy.
- Shrinkage.
- Erlang C.
- Sensibilidad por escenario.

## Fase 6 — Optimización

- Restricciones laborales.
- Skills.
- Coste.
- Redistribución de capacidad.
- Optimización multiobjetivo.

## Principio

La evolución mantiene separadas las capas:

~~~text
UI
 ↓
Workflow
 ↓
Datos
 ↓
Motor WFM
 ↓
Reporting
~~~

Esto permite evolucionar cada componente sin reconstruir toda la solución.
