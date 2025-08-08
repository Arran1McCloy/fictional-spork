# Migration Map (Appsmith → Code)

- `appsmith.store.currentUser` → `Zustand.user`
- `appsmith.store.defectFilter` → `Zustand.defectFilter` (`{ field, op, vals }`)
- `navigateTo('Route')` → React Router `useNavigate()`
- Queries in widgets → Express routes executing parameterized SQL
- Appsmith ECharts widget → React ECharts with the same `option` object
- `FilePickerN` → `<input type="file">` + Base64 encoder + `/defects/{id}/photos`

