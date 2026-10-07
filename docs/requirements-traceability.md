# Matriz de requisitos y trazabilidad

## Objetivo

Esta matriz conecta cada necesidad funcional con:

- Requisito.
- Componente responsable.
- Datos implicados.
- Automatización.
- Caso de prueba.
- Criterio de aceptación.

El objetivo es demostrar trazabilidad entre análisis funcional, diseño técnico e implementación.

## 1. Requisitos funcionales

| ID | Requisito | Componente | Datos | Automatización | Test |
|---|---|---|---|---|---|
| FR-001 | Crear solicitud | Canvas App | Request | Submit Request | TC-001 |
| FR-002 | Seleccionar tipo | Canvas App | RequestType | Submit Request | TC-002 |
| FR-003 | Validar fechas | Canvas App / Flow | StartDate, EndDate | Validation | TC-003 |
| FR-004 | Consultar solicitudes propias | Canvas App | Request | — | TC-004 |
| FR-005 | Filtrar solicitudes | Canvas App | Request | — | TC-005 |
| FR-006 | Consultar detalle | Canvas App | Request + History | — | TC-006 |
| FR-007 | Enviar a aprobación | Power Automate | Request | Approval Processor | TC-007 |
| FR-008 | Aprobar solicitud | Power Automate | Request | Approval Processor | TC-008 |
| FR-009 | Rechazar con motivo | Power Automate | Request + History | Approval Processor | TC-009 |
| FR-010 | Cancelar solicitud | Canvas App / Flow | Request | Cancellation | TC-010 |
| FR-011 | Registrar auditoría | Power Automate | RequestHistory | Todos los flows | TC-011 |
| FR-012 | Notificar decisión | Power Automate | Request | Notification | TC-012 |
| FR-013 | Evitar duplicados | App / Flow | Request | Validation | TC-013 |
| FR-014 | Controlar reintentos | Power Automate | CorrelationId | Recovery | TC-014 |
| FR-015 | Mostrar KPIs | Canvas App / BI | Request | — | TC-015 |

## 2. Requisitos no funcionales

| ID | Requisito | Diseño |
|---|---|---|
| NFR-001 | Seguridad | Identidad + permisos de datos + validación de workflow |
| NFR-002 | Auditabilidad | RequestHistory |
| NFR-003 | Idempotencia | Validación de estado + CorrelationId |
| NFR-004 | Mantenibilidad | Flujos desacoplados |
| NFR-005 | Portabilidad | Environment Variables + Connection References |
| NFR-006 | Escalabilidad | Separación App / Workflow / Datos |
| NFR-007 | Observabilidad | RequestId + CorrelationId + eventos |
| NFR-008 | Testabilidad | Casos de prueba por transición |
| NFR-009 | Accesibilidad | UX clara y controles comprensibles |
| NFR-010 | Responsive | Diseño adaptable a escritorio y móvil |

## 3. Trazabilidad por caso de uso

### Cambio de turno

~~~text
Necesidad
   |
   v
FR-001 Crear solicitud
   |
   +--> Canvas App
   |
   +--> Request
   |
   v
FR-003 Validar fechas
   |
   v
FR-007 Enviar a aprobación
   |
   v
FR-008 / FR-009 Decisión
   |
   v
FR-011 Auditoría
   |
   v
FR-012 Notificación
~~~

### Teletrabajo

~~~text
Necesidad
   |
   v
FR-001
   |
   v
Validación temporal
   |
   +--> solapamiento
   +--> rango válido
   |
   v
Approval
   |
   +--> APPROVED
   +--> REJECTED
   |
   v
History + Notification
~~~

### Vacaciones

~~~text
Necesidad
   |
   v
FR-001
   |
   v
Validación de intervalo
   |
   v
Control de solapamiento
   |
   v
Approval
   |
   v
Auditoría
~~~

## 4. Matriz de estados

| Estado | Crear | Editar | Cancelar | Aprobar | Rechazar |
|---|---:|---:|---:|---:|---:|
| DRAFT | Sí | Sí | Sí | No | No |
| SUBMITTED | No | No | Sí | No | No |
| PENDING_APPROVAL | No | No | Según política | Sí | Sí |
| APPROVED | No | No | No | No | No |
| REJECTED | No | No | No | No | No |
| CANCELLED | No | No | No | No | No |
| ERROR | No | No | Según recuperación | No | No |

La matriz representa el comportamiento conceptual. Una implementación concreta puede ampliar las transiciones mediante una política de reapertura.

## 5. Criterios de aceptación

### AC-001 — Crear solicitud

**Dado** un usuario autenticado  
**Cuando** introduce todos los datos obligatorios válidos  
**Entonces** la solicitud se crea y queda registrada.

### AC-002 — Fechas inválidas

**Dado** una solicitud con fecha final anterior a la inicial  
**Cuando** se intenta enviar  
**Entonces** la operación se bloquea y se muestra un mensaje de validación.

### AC-003 — Aprobación

**Dado** una solicitud en PENDING_APPROVAL  
**Cuando** un aprobador autorizado la aprueba  
**Entonces** el estado pasa a APPROVED y se registra la decisión.

### AC-004 — Rechazo

**Dado** una solicitud en PENDING_APPROVAL  
**Cuando** el aprobador selecciona rechazar sin motivo  
**Entonces** la operación se bloquea.

**Cuando** introduce un motivo válido  
**Entonces** el estado pasa a REJECTED y el motivo queda auditado.

### AC-005 — Idempotencia

**Dado** una solicitud ya procesada  
**Cuando** se recibe un segundo intento de decisión  
**Entonces** no se modifica nuevamente la solicitud ni se genera una segunda notificación.

### AC-006 — Auditoría

**Dado** cualquier transición relevante  
**Cuando** se completa la operación  
**Entonces** existe un evento correspondiente en RequestHistory.

## 6. Matriz de cobertura

| Área | Requisitos | Demo | Documentación | Tests |
|---|---|---|---|---|
| Solicitudes | FR-001–006 | Sí | Sí | Sí |
| Aprobaciones | FR-007–009 | Sí | Sí | Sí |
| Cancelación | FR-010 | Sí | Sí | Sí |
| Auditoría | FR-011 | Sí | Sí | Sí |
| Notificaciones | FR-012 | Simulada | Sí | Sí |
| Duplicados | FR-013 | Conceptual | Sí | Sí |
| Recuperación | FR-014 | Conceptual | Sí | Sí |
| KPIs | FR-015 | Sí | Sí | Sí |
| Seguridad | NFR-001 | Conceptual | Sí | — |
| ALM | NFR-005 | Conceptual | Sí | — |

## 7. Trazabilidad hacia Power Platform

~~~text
Business Requirement
        |
        v
Functional Requirement
        |
        +-------------------+
        |                   |
        v                   v
Canvas App            Power Automate
        |                   |
        +---------+---------+
                  |
                  v
              Data Layer
                  |
                  v
             Audit / BI
                  |
                  v
                 Test
~~~

Este enfoque evita implementar funcionalidades sin un criterio claro de negocio y facilita evaluar el impacto de cualquier cambio.

## 8. Gestión de cambios

Una modificación debe analizar:

1. Requisito afectado.
2. Pantalla afectada.
3. Fórmulas Power Fx.
4. Flujos.
5. Modelo de datos.
6. Reglas de seguridad.
7. Casos de prueba.
8. Documentación.
9. Impacto sobre reporting.
10. Necesidad de migración de datos.

Ejemplo:

**Cambio:** añadir un nuevo tipo de solicitud.

Impacto potencial:

~~~text
RequestType
   |
   +--> Canvas App
   +--> Validation
   +--> Approval routing
   +--> Reporting
   +--> Tests
   +--> Documentation
~~~

## 9. Definición de terminado

Una funcionalidad se considera terminada cuando:

- El requisito está definido.
- La lógica está implementada.
- Las validaciones existen.
- Las transiciones de estado están controladas.
- La auditoría está contemplada.
- Los casos de prueba están definidos.
- La documentación está actualizada.
- El cambio es revisable mediante Git.
- No existen secretos ni datos corporativos en el repositorio.

## 10. Valor profesional

La trazabilidad demuestra una práctica de ingeniería especialmente útil en soluciones low-code:

**requisito → diseño → implementación → datos → workflow → prueba → auditoría**

Esto permite mantener la solución cuando aumenta el número de usuarios, reglas, tipos de solicitud o integraciones.
