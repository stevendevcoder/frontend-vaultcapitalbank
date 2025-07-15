import { useAuth } from '../hooks/useAuth'
import { TransactionsPage } from '../components/transactions/TransactionsPage'

export default function Transactions() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="p-6 px-4 lg:px-12 xl:px-24 2xl:px-38">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-xl font-semibold text-white mb-2">Cargando...</h2>
          <p className="text-gray-400">Obteniendo información de transacciones</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 px-4 lg:px-12 xl:px-24 2xl:px-38">
      <TransactionsPage transactions={user.transactions || []} />
    </div>
  )
}