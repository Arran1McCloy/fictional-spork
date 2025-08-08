import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import DefectLog from './pages/DefectLog'
import Login from './pages/Login'
import NewReport from './pages/NewReport'
import EditDefect from './pages/EditDefect'
import ViewDefect from './pages/ViewDefect'
import Success from './pages/Success'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/defects" element={<DefectLog />} />
      <Route path="/defects/:id" element={<ViewDefect />} />
      <Route path="/defects/:id/edit" element={<EditDefect />} />
      <Route path="/new" element={<NewReport />} />
      <Route path="/login" element={<Login />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  )
}
