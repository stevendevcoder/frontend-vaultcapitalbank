import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi'

interface NewsItem {
  id: number
  title: string
  summary: string
  category: string
  date: string
  url: string
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Nuevas regulaciones bancarias entran en vigor",
    summary: "El Banco Central implementa nuevas medidas para fortalecer la seguridad financiera del país.",
    category: "Regulaciones",
    date: "2024-01-15",
    url: "#"
  },
  {
    id: 2,
    title: "Incremento en las tasas de interés para cuentas de ahorro",
    summary: "Los bancos ofrecen mejores rendimientos para incentivar el ahorro de los clientes.",
    category: "Tasas",
    date: "2024-01-14",
    url: "#"
  },
  {
    id: 3,
    title: "Nueva funcionalidad de transferencias instantáneas",
    summary: "Vault Financial Bank lanza transferencias 24/7 con confirmación inmediata.",
    category: "Tecnología",
    date: "2024-01-13",
    url: "#"
  },
  {
    id: 4,
    title: "Guía de seguridad para transacciones digitales",
    summary: "Consejos importantes para proteger tu información financiera en línea.",
    category: "Seguridad",
    date: "2024-01-12",
    url: "#"
  }
]

export function NewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockNews.length)
    }, 5000) // Cambiar cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockNews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockNews.length) % mockNews.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Noticias Financieras</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 text-[#22D3EE] hover:text-white hover:bg-[#22D3EE]/20 rounded-lg transition-colors duration-200"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 text-[#22D3EE] hover:text-white hover:bg-[#22D3EE]/20 rounded-lg transition-colors duration-200"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mockNews.map((news) => (
            <div key={news.id} className="w-full flex-shrink-0">
              <div className="bg-[#0A0F1C] p-6 rounded-lg border border-[#22D3EE]/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-[#22D3EE]/20 text-[#22D3EE] text-xs font-semibold rounded-full">
                        {news.category}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {new Date(news.date).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                  <button className="ml-4 p-2 text-[#22D3EE] hover:text-white hover:bg-[#22D3EE]/20 rounded-lg transition-colors duration-200">
                    <FiExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center gap-2 mt-6">
        {mockNews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-[#22D3EE] w-6' 
                : 'bg-[#22D3EE]/30 hover:bg-[#22D3EE]/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 