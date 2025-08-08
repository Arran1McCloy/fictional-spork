# Filtering Grammar

Object shape (stored in state):  
```ts
{ field?: 'status'|'urgency'|'relevant_dept', op?: '='|'not in', vals?: string[] }
```

SQL WHERE builder rules:
- If missing/invalid → `true` (no filter).
- `op: '='` → `${field} = '${vals[0]}'`
- `op: 'not in'` → `${field} NOT IN ('v1','v2',...)`

Examples:
- `{field:'status', op:'=', vals:['active']}` → `status='active'`
- `{field:'status', op:'not in', vals:['resolved (fixed)','resolved (irreparable)']}` → `status NOT IN('resolved (fixed)','resolved (irreparable)')`

