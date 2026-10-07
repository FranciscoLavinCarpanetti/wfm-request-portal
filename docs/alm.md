# Application Lifecycle Management

The target architecture is:

```text
DEV
 │
 ▼
Source control
 │
 ▼
Validation / Pull Request
 │
 ▼
TEST
 │
 ▼
Approval
 │
 ▼
PROD
```

## Power Platform components

A production-ready Solution should package:

- Canvas App
- Cloud Flows
- Connection References
- Environment Variables
- Dataverse components when applicable
- Custom connectors when applicable

## Environment configuration

Do not hard-code:

- Site URLs
- List identifiers
- Environment-specific email addresses
- Connector configuration
- Secrets

Use environment variables and connection references instead.

## Git strategy

Recommended branches:

```text
main
└── feature/*
```

For a larger implementation:

```text
main
develop
feature/*
hotfix/*
```

Pull Requests should describe the business change, technical impact, test evidence and deployment considerations.
