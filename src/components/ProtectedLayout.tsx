import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function ProtectedLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] to-[#1F2937] text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
