import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Admin from '../pages/Admin'
import ProtectedLayout from '../components/ProtectedLayout'
import Transactions from '../pages/Transactions'
import AccountInfo from '../pages/AccountInfo'
import DocumentVerification from '../pages/DocumentVerification'
import Support from '../pages/Support'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas con layout que incluye Navbar */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/account" element={<AccountInfo />} />
        <Route path="/verification" element={<DocumentVerification />} />
        <Route path="/support" element={<Support />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}
