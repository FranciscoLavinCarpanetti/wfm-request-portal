# Arquitectura

## Principios de diseño

1. **Separación de responsabilidades** — Canvas App gestiona presentación e interacción; Power Automate orquesta el workflow; la persistencia pertenece a la capa de datos.
2. **Configuración frente a valores hard-coded** — los valores dependientes del entorno no deben estar embebidos en fórmulas o flujos.
3. **Transiciones de estado explícitas** — el estado de una solicitud se controla mediante reglas de workflow.
4. **Idempotencia** — un reintento no debe generar aprobaciones ni notificaciones duplicadas.
5. **Auditabilidad** — los eventos relevantes del ciclo de vida deben conservarse.

## Componentes lógicos

### Presentación

Responsabilidades de Canvas App:

- Crear solicitudes.
- Validar datos en cliente.
- Listar solicitudes.
- Visualizar estados.
- Informar al usuario.

### Datos

Como mínimo, una solicitud debe contemplar:

| Campo | Finalidad |
|---|---|
| RequestId | Identificador único |
| RequestType | Tipo de solicitud WFM |
| Requester | Propietario de la solicitud |
| StartDate | Inicio de vigencia |
| EndDate | Fin de vigencia |
| Status | Estado del ciclo de vida |
| SubmittedAt | Fecha/hora de envío |
| DecisionAt | Fecha/hora de decisión |
| DecisionBy | Responsable de la decisión |
| Comments | Contexto legible |

### Workflow

Responsabilidades de Power Automate:

- Validar solicitudes enviadas.
- Iniciar aprobación.
- Persistir la decisión.
- Enviar notificaciones.
- Registrar errores.
- Evitar procesamiento duplicado.

## Gestión de errores

El workflow debe distinguir entre:

- Error de validación.
- Rechazo por regla de negocio.
- Error de conector.
- Timeout de aprobación.
- Error inesperado de ejecución.

Los fallos transitorios de conectores deben poder reintentarse. Los fallos de reglas de negocio deben ser deterministas y comprensibles para el usuario.

## Frontera de seguridad

La aplicación no debe depender únicamente de Canvas App para autorización. Los permisos críticos y las transiciones de estado deben reforzarse en la capa de datos/workflow.
