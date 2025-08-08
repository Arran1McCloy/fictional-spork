# RBAC Matrix (v1)

| Capability                                   | General | Supervisor | HSE | Other |
|---------------------------------------------|:-------:|:----------:|:---:|:-----:|
| Login                                        |   ✓     |     ✓      |  ✓  |   ✓   |
| Create defect (`POST /defects`)              |   ✓     |     ✓      |  ✓  |   ✓   |
| List defects (`GET /defects`)                |   ✗     |     ✓      |  ✓  |   ✓   |
| View defect by id (`GET /defects/{id}`)      |   ✗     |     ✓      |  ✓  |   ✓   |
| Edit defect (`PATCH /defects/{id}`)          |   ✗     |     ✓      |  ✗* |   ✗   |
| Get enums (`GET /meta/enums`)                |   ✓     |     ✓      |  ✓  |   ✓   |
| Dashboard endpoints (`/dashboard/*`)         |   ✓     |     ✓      |  ✓  |   ✓   |

\* HSE edit could be enabled later if needed.

> Frontend should also enforce route visibility based on role.

