# Case Study — WFM Request Portal

## Resumen
WFM Request Portal es una solución independiente de portfolio que demuestra cómo transformar un proceso operativo de Workforce Management en una aplicación estructurada con workflow, aprobación, auditoría y evaluación de impacto sobre capacidad.

El proyecto combina:
1. WFM: planificación, capacidad y cobertura.
2. Low-code: Power Apps y Power Automate.
3. Software engineering: arquitectura, datos, testing, Git y ALM.

## Problema
Los procesos de solicitud gestionados mediante correo electrónico, hojas de cálculo o mensajes dispersos presentan problemas habituales: falta de trazabilidad, seguimiento manual, validaciones inconsistentes, dificultad para conocer el estado, aprobaciones poco estructuradas, información difícil de explotar y escasa conexión entre una solicitud individual y el impacto sobre la operación.

## Solución
Se diseñó un ciclo de vida explícito: Solicitud → Validación → Aprobación → Decisión → Auditoría.

Posteriormente se añadió una segunda dimensión: Solicitud → Impacto de capacidad → Cobertura → Riesgo operativo.

Esto permite evolucionar desde una herramienta administrativa hacia una solución WFM.

## Decisiones técnicas
### Power Apps
Capa de presentación para interacción y formularios.

### Power Automate
Capa de orquestación para aprobaciones, notificaciones y procesos asíncronos.

### SharePoint / Dataverse
Alternativas según volumen, relaciones, seguridad y necesidades de ALM.

### GitHub
Documentación, versionado, revisión de cambios y portfolio público.

## Diseño de estados
El ciclo de vida utiliza estados explícitos: DRAFT → SUBMITTED → PENDING_APPROVAL → APPROVED / REJECTED.

Esto evita transiciones arbitrarias.

## Fiabilidad
Se aplican principios de ingeniería: idempotencia, Correlation IDs, auditoría, separación de responsabilidades, gestión de errores, reintentos controlados, configuración externa y trazabilidad de requisitos.

## WFM
El elemento diferencial es la evaluación de impacto. Una solicitud puede modificar la capacidad disponible.

Ejemplo sintético: Required = 12, Baseline = 12, Scenario = 11, Deficit = 1.

La solicitud no se evalúa solamente como un cambio administrativo; puede representar un cambio en la capacidad operacional.

## Demo pública
La demo web utiliza únicamente datos sintéticos y permite crear solicitudes, filtrar, consultar detalles, aprobar, rechazar, cancelar, consultar auditoría y simular impacto de capacidad.

No necesita acceso a Power Platform para ejecutarse.

## Seguridad y propiedad intelectual
El repositorio no contiene datos reales, datos personales de empleados, credenciales, secretos, URLs privadas, configuración de tenant, exportaciones corporativas ni documentación confidencial.

La solución es una reconstrucción independiente de patrones técnicos transferibles.

## Resultado
El proyecto demuestra una cadena completa: Requisito → arquitectura → implementación → workflow → datos → pruebas → auditoría → ALM.

Además conecta workflows administrativos con conceptos cuantitativos de WFM: Forecast → capacidad → planificación → solicitud → impacto → cobertura.

## Competencias demostradas
- Workforce Management.
- Análisis funcional.
- Diseño de workflows.
- Power Apps.
- Power Automate.
- Power Fx.
- SharePoint / Dataverse.
- Modelado de datos.
- Automatización.
- Testing.
- Git/GitHub.
- ALM.
- Arquitectura de software.
- Evaluación de capacidad.
- Diseño orientado a mantenibilidad.