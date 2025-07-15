import { useState } from 'react'
import { FiUpload, FiCamera, FiFileText, FiCheck, FiX, FiEye } from 'react-icons/fi'

interface DocumentFile {
  id: string
  name: string
  type: 'selfie' | 'identification'
  file: File
  preview?: string
  status: 'pending' | 'uploading' | 'uploaded' | 'error'
}

export function DocumentVerificationPage() {
  const [documents, setDocuments] = useState<DocumentFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = (files: FileList, type: 'selfie' | 'identification') => {
    Array.from(files).forEach(file => {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('❌ Solo se permiten archivos de imagen (JPG, PNG, etc.)')
        return
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ El archivo es demasiado grande. Máximo 5MB')
        return
      }

      const newDocument: DocumentFile = {
        id: `${type}-${Date.now()}-${Math.random()}`,
        name: file.name,
        type,
        file,
        status: 'pending'
      }

      // Crear preview para imágenes
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          newDocument.preview = e.target?.result as string
          setDocuments(prev => [...prev, newDocument])
        }
        reader.readAsDataURL(file)
      } else {
        setDocuments(prev => [...prev, newDocument])
      }
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent, type: 'selfie' | 'identification') => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files, type)
    }
  }

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  const uploadDocument = async (document: DocumentFile) => {
    // Simular upload
    setDocuments(prev => prev.map(doc => 
      doc.id === document.id ? { ...doc, status: 'uploading' } : doc
    ))

    // Simular delay de upload
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.id === document.id ? { ...doc, status: 'uploaded' } : doc
      ))
    }, 2000)
  }

  const getStatusIcon = (status: DocumentFile['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
      case 'uploading':
        return <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
      case 'uploaded':
        return <FiCheck className="w-4 h-4 text-green-400" />
      case 'error':
        return <FiX className="w-4 h-4 text-red-400" />
    }
  }

  const getStatusText = (status: DocumentFile['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendiente'
      case 'uploading':
        return 'Subiendo...'
      case 'uploaded':
        return 'Subido'
      case 'error':
        return 'Error'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Verificación de Documentos</h1>
        <p className="text-gray-400">
          Sube los documentos necesarios para verificar tu identidad
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selfie */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#22D3EE]/20 rounded-full flex items-center justify-center">
              <FiCamera size={20} className="text-[#22D3EE]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Selfie</h2>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
              dragActive ? 'border-[#22D3EE] bg-[#22D3EE]/10' : 'border-[#22D3EE]/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, 'selfie')}
          >
            <FiCamera size={48} className="mx-auto text-[#22D3EE] mb-4" />
            <p className="text-white font-medium mb-2">Sube tu selfie</p>
            <p className="text-gray-400 text-sm mb-4">
              Asegúrate de que tu rostro esté bien iluminado y visible
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'selfie')}
              className="hidden"
              id="selfie-upload"
            />
            <label
              htmlFor="selfie-upload"
              className="bg-[#22D3EE] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <FiUpload size={16} />
              Seleccionar archivo
            </label>
          </div>
        </div>

        {/* Documento de identificación */}
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#22D3EE]/20 rounded-full flex items-center justify-center">
              <FiFileText size={20} className="text-[#22D3EE]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Documento de Identificación</h2>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
              dragActive ? 'border-[#22D3EE] bg-[#22D3EE]/10' : 'border-[#22D3EE]/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, 'identification')}
          >
            <FiFileText size={48} className="mx-auto text-[#22D3EE] mb-4" />
            <p className="text-white font-medium mb-2">Sube tu documento</p>
            <p className="text-gray-400 text-sm mb-4">
              Cédula, pasaporte o licencia de conducir
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'identification')}
              className="hidden"
              id="identification-upload"
            />
            <label
              htmlFor="identification-upload"
              className="bg-[#22D3EE] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <FiUpload size={16} />
              Seleccionar archivo
            </label>
          </div>
        </div>
      </div>

      {/* Lista de documentos */}
      {documents.length > 0 && (
        <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
          <h3 className="text-lg font-semibold text-white mb-4">Documentos Subidos</h3>
          <div className="space-y-3">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 bg-[#0A0F1C] rounded-lg border border-[#22D3EE]/20">
                <div className="flex items-center gap-4">
                  {document.preview && (
                    <div className="relative">
                      <img
                        src={document.preview}
                        alt={document.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => window.open(document.preview, '_blank')}
                        className="absolute -top-1 -right-1 bg-[#22D3EE] text-white p-1 rounded-full hover:bg-[#1E3A8A] transition-colors duration-200"
                      >
                        <FiEye size={12} />
                      </button>
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">{document.name}</p>
                    <p className="text-gray-400 text-sm">
                      {document.type === 'selfie' ? 'Selfie' : 'Documento de identificación'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(document.status)}
                    <span className="text-sm text-gray-300">
                      {getStatusText(document.status)}
                    </span>
                  </div>
                  {document.status === 'pending' && (
                    <button
                      onClick={() => uploadDocument(document)}
                      className="bg-[#22D3EE] text-white px-3 py-1 rounded-lg hover:bg-[#1E3A8A] transition-colors duration-200 text-sm"
                    >
                      Subir
                    </button>
                  )}
                  <button
                    onClick={() => removeDocument(document.id)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
        <h3 className="text-lg font-semibold text-white mb-4">Información Importante</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-[#22D3EE] font-medium mb-2">Requisitos para la selfie:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Rostro completamente visible</li>
              <li>• Buena iluminación</li>
              <li>• Sin gafas oscuras</li>
              <li>• Fondo neutro</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#22D3EE] font-medium mb-2">Requisitos para el documento:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Documento válido y vigente</li>
              <li>• Información legible</li>
              <li>• Foto completa del documento</li>
              <li>• Sin reflejos ni sombras</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 