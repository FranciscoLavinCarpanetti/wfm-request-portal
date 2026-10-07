# Diseño de Power Apps

## Pantallas

La arquitectura objetivo de Canvas App se organiza en las siguientes pantallas.

### Inicio

- Mostrar solicitudes abiertas.
- Crear una nueva solicitud.
- Mostrar contadores resumen.
- Proporcionar navegación.

### Nueva solicitud

Campos habituales:

- Tipo de solicitud.
- Fecha de inicio.
- Fecha de fin.
- Turno/horario cuando aplique.
- Comentarios.

La validación se ejecuta antes del envío.

### Mis solicitudes

Incluye:

- ID de solicitud.
- Tipo.
- Rango de fechas.
- Estado actual.
- Fecha de envío.
- Última actualización.

### Detalle

Muestra la solicitud completa y su ciclo de vida.

La edición se deshabilita cuando la solicitud entra en el proceso de aprobación.

### Aprobación

Los aprobadores pueden:

- Revisar los datos.
- Aprobar.
- Rechazar.
- Añadir comentarios.

## Principios UX

- Diseño mobile-first.
- Estados claros.
- Entrada de datos mínima.
- Feedback inmediato de validación.
- Etiquetas accesibles.
- Navegación consistente.

## Power Fx

Las fórmulas reutilizables se mantienen en:

`power-platform/powerfx/`
