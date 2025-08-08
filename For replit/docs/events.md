# Events & Notifications (Phase 2)

## Triggers
- defect.created
- defect.updated (status change, urgency change)
- photo.updated

## Payload (example)
```json
{
  "event": "defect.updated",
  "job_id": 123,
  "changed": { "status": ["pending", "active"] },
  "by": "full_name",
  "at": "2025-01-01T12:00:00Z"
}
```

## Webhook (stub)
- URL: (to be provided)
- Method: POST
- Headers: `Content-Type: application/json`
- Retries: 3 with exponential backoff
