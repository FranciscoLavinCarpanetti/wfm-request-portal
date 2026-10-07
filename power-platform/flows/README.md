# Flujos de Power Automate

La arquitectura de portfolio modela los siguientes cloud flows.

## 01 — Enviar solicitud

**Trigger:** nueva solicitud enviada.

Responsabilidades:

1. Validar la solicitud.
2. Cambiar el estado a `PENDING_APPROVAL`.
3. Crear la transacción de aprobación.
4. Persistir metadatos de procesamiento.

## 02 — Procesar aprobación

**Trigger:** recepción de una decisión.

Responsabilidades:

1. Validar que la solicitud continúa pendiente.
2. Persistir la decisión.
3. Establecer `APPROVED` o `REJECTED`.
4. Registrar aprobador y fecha/hora.
5. Lanzar la notificación.

## 03 — Notificación

Responsabilidades:

- Informar al solicitante de la decisión final.
- Mantener la generación de mensajes separada de las transiciones de estado.

## Fiabilidad

Los flujos deben incorporar:

- Políticas de reintento para fallos transitorios.
- Ramas explícitas de error.
- Identificadores de correlación/solicitud.
- Comprobaciones de idempotencia.
- Logging operativo.

## Nota de producción

Las referencias de conexión y valores dependientes del entorno deben configurarse mediante una Power Platform Solution y no mediante valores hard-coded.
