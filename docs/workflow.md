# Workflow

## Envío

1. El usuario completa una solicitud.
2. Se ejecuta la validación en cliente.
3. La solicitud se persiste.
4. El estado pasa a `SUBMITTED`.
5. Se inicia el workflow.

## Aprobación

1. El workflow valida la solicitud.
2. El estado pasa a `PENDING_APPROVAL`.
3. El aprobador recibe la solicitud.
4. Se persiste la decisión.
5. El estado pasa a `APPROVED` o `REJECTED`.
6. El solicitante recibe una notificación.
7. Se conserva la información de auditoría.

## Idempotencia

El workflow debe comprobar si ya existe un proceso de aprobación para la solicitud antes de crear otro.

Un patrón útil es utilizar una clave de negocio única:

```text
RequestId + WorkflowVersion
```

También puede utilizarse un estado o indicador de procesamiento controlado transaccionalmente.

## Estrategia ante fallos

Una automatización fallida debe:

- conservar la solicitud;
- registrar el fallo;
- evitar perder silenciosamente la transacción;
- proporcionar una vía de recuperación operativa;
- evitar notificaciones duplicadas después de un reintento.
