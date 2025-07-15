import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi'

export function CryptoCharts() {
  return (
    <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Mercados Financieros</h2>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-[#22D3EE]/20 text-[#22D3EE] text-xs font-semibold rounded-full">
            En desarrollo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Criptomonedas */}
        <div className="bg-[#0A0F1C] p-6 rounded-lg border border-[#22D3EE]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <FiDollarSign size={20} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Criptomonedas</h3>
              <p className="text-gray-400 text-sm">Bitcoin, Ethereum, etc.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[#1F2937] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <FiDollarSign size={16} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Bitcoin</p>
                  <p className="text-gray-400 text-sm">BTC</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">$43,250.00</p>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <FiTrendingUp size={12} />
                  +2.45%
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#1F2937] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <FiDollarSign size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Ethereum</p>
                  <p className="text-gray-400 text-sm">ETH</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">$2,680.50</p>
                <div className="flex items-center gap-1 text-red-400 text-sm">
                  <FiTrendingDown size={12} />
                  -1.23%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#22D3EE]/10 rounded-lg border border-[#22D3EE]/20">
            <p className="text-[#22D3EE] text-sm text-center">
              📊 Gráficas interactivas próximamente
            </p>
          </div>
        </div>

        {/* Divisas */}
        <div className="bg-[#0A0F1C] p-6 rounded-lg border border-[#22D3EE]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <FiDollarSign size={20} className="text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Divisas</h3>
              <p className="text-gray-400 text-sm">USD, EUR, GBP, etc.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[#1F2937] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <FiDollarSign size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Dólar USD</p>
                  <p className="text-gray-400 text-sm">USD/EUR</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">0.85</p>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <FiTrendingUp size={12} />
                  +0.12%
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-[#1F2937] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <FiDollarSign size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Euro EUR</p>
                  <p className="text-gray-400 text-sm">EUR/USD</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">1.18</p>
                <div className="flex items-center gap-1 text-red-400 text-sm">
                  <FiTrendingDown size={12} />
                  -0.08%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#22D3EE]/10 rounded-lg border border-[#22D3EE]/20">
            <p className="text-[#22D3EE] text-sm text-center">
              📈 Análisis técnico próximamente
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-[#0A0F1C] rounded-lg border border-[#22D3EE]/20">
        <div className="text-center">
          <div className="text-4xl mb-2">🚀</div>
          <h3 className="text-lg font-semibold text-white mb-2">Funcionalidad en Desarrollo</h3>
          <p className="text-gray-400 text-sm">
            Próximamente podrás ver gráficas en tiempo real, análisis técnico y alertas de mercado
          </p>
        </div>
      </div>
    </div>
  )
} 