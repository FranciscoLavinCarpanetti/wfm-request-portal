# Demo

Esta carpeta contiene la demo web pública e interactiva del **WFM Request Portal**.

La demo utiliza exclusivamente datos sintéticos y funciona de forma independiente de cualquier entorno empresarial.

## Capacidades

- Panel de solicitudes.
- Creación de solicitudes.
- Validación de fechas.
- Consulta de detalle.
- Aprobación y rechazo.
- Transiciones de estado.
- Búsqueda y filtrado.
- Historial de auditoría simulado.
- Simulación sintética de impacto WFM.

## Flujo

```text
Panel
  ↓
Nueva solicitud
  ↓
Validación
  ↓
Enviada
  ↓
Pendiente de aprobación
  ↓
Aprobada / Rechazada
  ↓
Historial
```

## Nota técnica

La demo reproduce en navegador el comportamiento funcional descrito en la arquitectura de referencia. No utiliza Power Apps, Power Automate ni un backend real; estos componentes se documentan como arquitectura objetivo.

El motor WFM incluido es determinista y sintético. Sirve para demostrar la relación entre capacidad, déficit, cobertura y riesgo, no para dimensionamiento operativo real.
