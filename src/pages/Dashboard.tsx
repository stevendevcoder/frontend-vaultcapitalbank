import { useAuth } from '../hooks/useAuth'
import { FiDollarSign, FiCreditCard, FiActivity, FiAlertTriangle } from 'react-icons/fi'
import { TransactionTable } from '../components/dashboard/TransactionTable'
import { NewsSlider } from '../components/dashboard/NewsSlider'
import { CryptoCharts } from '../components/dashboard/CryptoCharts'

export default function Dashboard() {
  const { user } = useAuth()

  const handleQuickAction = (action: string) => {
    alert(`⚠️ No fue posible realizar la acción: ${action}\n\nPor favor, contacta con soporte para obtener ayuda.`)
  }

  if (!user) {
    return (
      <div className="p-6 px-4 lg:px-12 xl:px-24 2xl:px-38">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-xl font-semibold text-white mb-2">Cargando...</h2>
          <p className="text-gray-400">Obteniendo información de tu cuenta</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 px-4 lg:px-12 xl:px-24 2xl:px-38">
      {/* Header del Dashboard */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Bienvenido, {user.name}
        </h1>
        <p className="text-gray-400">
          Aquí tienes un resumen de tu actividad financiera
        </p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Saldo actual */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#22D3EE] text-sm font-medium">Saldo Actual</p>
              <p className="text-2xl font-bold text-white">
                ${(user?.balance || 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#22D3EE]/20 rounded-full flex items-center justify-center">
              <FiDollarSign size={24} className="text-[#22D3EE]" />
            </div>
          </div>
        </div>

        {/* Total transacciones */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#22D3EE] text-sm font-medium">Transacciones</p>
              <p className="text-2xl font-bold text-white">
                {user.transactions?.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#22D3EE]/20 rounded-full flex items-center justify-center">
              <FiActivity size={24} className="text-[#22D3EE]" />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Transacciones recientes */}
        <div className="lg:col-span-2">
          <TransactionTable transactions={user.transactions || []} />
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Estado de la cuenta */}
          <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
            <h3 className="text-lg font-semibold text-white mb-4">Estado de la Cuenta</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Tipo de cuenta:</span>
                <span className="text-white font-medium">
                  {user.accountType || 'Corriente'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Estado:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  user.accountStatus === 'Activa' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {user.accountStatus || 'Activa'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Número:</span>
                <span className="text-white font-medium">
                  {user.accountNumber ? `****-****-${user.accountNumber.slice(-4)}` : '****-****-****'}
                </span>
              </div>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
            <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <button 
                onClick={() => handleQuickAction('Nueva Transferencia')}
                className="w-full bg-[#22D3EE] text-white py-2 px-4 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-200 font-medium flex items-center justify-center gap-2"
              >
                <FiCreditCard size={16} />
                Nueva Transferencia
              </button>
              <button 
                onClick={() => handleQuickAction('Solicitar Tarjeta')}
                className="w-full bg-[#1E3A8A] text-white py-2 px-4 rounded-lg hover:bg-[#22D3EE] transition-colors duration-200 font-medium flex items-center justify-center gap-2"
              >
                <FiCreditCard size={16} />
                Solicitar Tarjeta
              </button>
              <button 
                onClick={() => handleQuickAction('Ver Reportes')}
                className="w-full bg-[#0A2540] text-white py-2 px-4 rounded-lg hover:bg-[#22D3EE] transition-colors duration-200 font-medium flex items-center justify-center gap-2"
              >
                <FiActivity size={16} />
                Ver Reportes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de noticias y mercados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Slider de noticias */}
        <div>
          <NewsSlider />
        </div>

        {/* Gráficas de criptomonedas */}
        <div>
          <CryptoCharts />
        </div>
      </div>
    </div>
  )
}
