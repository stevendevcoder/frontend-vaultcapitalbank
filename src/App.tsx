import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import Admin from './pages/Admin'
import AppRoutes from './router/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
