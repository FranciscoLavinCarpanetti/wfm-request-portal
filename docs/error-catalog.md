# Catálogo de errores

| Código | Categoría | Descripción | Recuperable |
|---|---|---|---|
| VAL-001 | Validación | Tipo obligatorio | Sí |
| VAL-002 | Validación | Fecha final anterior a inicial | Sí |
| VAL-003 | Validación | Solicitud duplicada | Sí |
| WF-001 | Workflow | Workflow no iniciado | Sí |
| WF-002 | Workflow | Timeout de aprobación | Sí |
| WF-003 | Workflow | Error de actualización | Sí |
| NOT-001 | Notificación | Error de envío | Sí |
| WFM-001 | WFM | Datos insuficientes | Sí |
| AUTH-001 | Seguridad | Actor no autorizado | No hasta corregir permisos |
| SYS-001 | Sistema | Error inesperado | Según diagnóstico |

Los códigos deben permanecer estables para logging, soporte y reporting.