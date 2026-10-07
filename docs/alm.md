# Application Lifecycle Management

La arquitectura objetivo es:

```text
DEV
 │
 ▼
Control de código fuente
 │
 ▼
Validación / Pull Request
 │
 ▼
TEST
 │
 ▼
Aprobación
 │
 ▼
PROD
```

## Componentes de Power Platform

Una Solution preparada para producción debería empaquetar:

- Canvas App.
- Cloud Flows.
- Connection References.
- Environment Variables.
- Componentes Dataverse cuando correspondan.
- Custom Connectors cuando correspondan.

## Configuración por entorno

No se deben hard-codear:

- URLs de sitios.
- Identificadores de listas.
- Direcciones de correo dependientes del entorno.
- Configuración de conectores.
- Secretos.

Deben utilizarse variables de entorno y referencias de conexión.

## Estrategia Git

Ramas recomendadas:

```text
main
└── feature/*
```

Para una implementación mayor:

```text
main
develop
feature/*
hotfix/*
```

Los Pull Requests deben describir el cambio funcional, impacto técnico, evidencia de pruebas y consideraciones de despliegue.
