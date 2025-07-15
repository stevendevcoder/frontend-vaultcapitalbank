import { useAuth } from '../hooks/useAuth'
import { AccountInfoPage } from '../components/account/AccountInfoPage'

export default function AccountInfo() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="p-6 px-4 lg:px-12 xl:px-24 2xl:px-38">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-xl font-semibold text-white mb-2">Cargando...</h2>
          <p className="text-gray-400">Obteniendo información de la cuenta</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 px-4 lg:px-12 xl:px-24 2xl:px-38">
      <AccountInfoPage user={user} />
    </div>
  )
}