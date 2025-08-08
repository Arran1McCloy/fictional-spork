# Golden SQL Outputs

These must be returned by the dashboard endpoints when seeded with `sql/seed.sql`.

- **Active count**: 7
- **Pending count**: 3
- **High priority (open)**: 4

## Urgency distribution (active only)
| urgency | count |
|--------:|------:|
| high    | 3     |
| low     | 2     |
| medium  | 2     |

## Status distribution (excluding 'resolved (fixed)')
| status                 | count |
|------------------------|------:|
| active                 | 7     |
| pending                | 3     |
| resolved (irreparable) | 1     |

## Work hours (first 10 ordered by hours_left ASC)
1) job 3: -1  
2) jobs 2,4,6,7,12: 0  
3) jobs 8,10: 1  
4) jobs 5,9: 2
