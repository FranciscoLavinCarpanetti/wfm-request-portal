# Decisiones técnicas

## Power Apps

Se selecciona para la aplicación orientada a solicitudes porque el proceso es principalmente formularios y se integra de forma natural con Microsoft 365 y Power Platform.

## Power Automate

Se utiliza para la orquestación porque aprobaciones, notificaciones y procesamiento asíncrono son responsabilidades propias de workflow.

## SharePoint frente a Dataverse

SharePoint es adecuado para una implementación ligera cuando las listas estructuradas son suficientes.

Dataverse resulta preferible cuando se requiere:

- Modelado relacional fuerte.
- Seguridad compleja.
- Mayor carga transaccional.
- ALM empresarial.
- Reglas de negocio más ricas.

La arquitectura de portfolio mantiene la capa de datos sustituible.

## Separación de responsabilidades del workflow

Separar validación, procesamiento de aprobación y notificaciones mejora:

- Mantenibilidad.
- Observabilidad.
- Comportamiento de reintentos.
- Pruebas.
- Aislamiento de cambios.

## Estados explícitos

Una máquina de estados finita hace previsibles las transiciones y evita cambios arbitrarios de estado desde la interfaz.
