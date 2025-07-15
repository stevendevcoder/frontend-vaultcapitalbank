import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Admin from '../pages/Admin'
import ProtectedLayout from '../components/ProtectedLayout'
import AdminProtectedLayout from '../components/AdminProtectedLayout'
import Transactions from '../pages/Transactions'
import AccountInfo from '../pages/AccountInfo'
import DocumentVerification from '../pages/DocumentVerification'
import Support from '../pages/Support'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas para usuarios normales */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/account" element={<AccountInfo />} />
        <Route path="/verification" element={<DocumentVerification />} />
        <Route path="/support" element={<Support />} />
      </Route>

      {/* Rutas protegidas solo para administradores */}
      <Route element={<AdminProtectedLayout />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}
