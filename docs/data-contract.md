# Contrato de datos

## Solicitud

~~~json
{
  "requestId": "REQ-0001",
  "requestType": "SHIFT_CHANGE",
  "requesterId": "USER-001",
  "requesterDisplayName": "Usuario Demo",
  "startDate": "2026-11-03",
  "endDate": "2026-11-03",
  "status": "PENDING_APPROVAL",
  "comments": "Ajuste solicitado",
  "correlationId": "CORR-0001"
}
~~~

## Impacto WFM

~~~json
{
  "requiredCapacity": 12,
  "baselineCapacity": 12,
  "scenarioCapacity": 11,
  "deltaCapacity": -1,
  "deficitBefore": 0,
  "deficitAfter": 1,
  "coverageBefore": 1,
  "coverageAfter": 0.9167,
  "riskLevel": "MEDIUM"
}
~~~

Los identificadores técnicos son estables, las fechas usan ISO y la traducción pertenece a la interfaz.