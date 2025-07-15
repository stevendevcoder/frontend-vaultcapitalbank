// components/dashboard/OverviewCards.tsx
import { useAuth } from '../../hooks/useAuth'

export default function OverviewCards() {
  const { user } = useAuth()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
        <h3 className="text-[#22D3EE] font-semibold mb-2">Saldo Actual</h3>
        <p className="text-3xl font-bold">${}</p>
      </div>
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
        <h3 className="text-[#22D3EE] font-semibold mb-2">Transacciones</h3>
        <p className="text-3xl font-bold">{0}</p>
      </div>
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
        <h3 className="text-[#22D3EE] font-semibold mb-2">Estado</h3>
        <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm">
          {"Activa"}
        </span>
      </div>
    </div>
  )
}
