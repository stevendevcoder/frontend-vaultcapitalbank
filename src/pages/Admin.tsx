import { useEffect, useState } from "react"
import api from "../services/api"
import type { User } from "../types/User"
import UserTable from "../components/admin/UserTable"
import UserFormModal from "../components/admin/UserFormModal"
import UserDrawer from "../components/admin/UserDrawer"
import DeleteConfirmModal from "../components/admin/DeleteConfirmModal"

export default function Admin() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setUsers(res.data)
    } catch (err) {
      alert("Error cargando usuarios")
    }
  }

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
  }

  const confirmDelete = async () => {
    if (!userToDelete) return

    setIsDeleting(true)
    try {
      await api.delete(`/admin/users/${userToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      alert("✅ Usuario eliminado exitosamente")
      setUserToDelete(null)
      fetchUsers()
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Error al eliminar usuario"
      alert(`❌ ${errorMessage}`)
    } finally {
      setIsDeleting(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-6">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto">
        {/* Header del Panel de Administración */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
          <p className="text-[#22D3EE] text-lg">Gestión de Usuarios</p>
        </div>

        {/* Header con estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#0A2540] to-[#1E3A8A] p-6 rounded-xl shadow-lg border border-[#22D3EE]/20">
            <h3 className="text-[#22D3EE] font-semibold mb-2">Total Usuarios</h3>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
        </div>

        {/* Botón crear */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Lista de Usuarios</h2>
          <button
            className="bg-gradient-to-r from-[#22D3EE] to-[#1E3A8A] text-white px-6 py-3 rounded-xl hover:from-[#1E3A8A] hover:to-[#22D3EE] transition-all duration-300 shadow-lg font-semibold flex items-center gap-2"
            onClick={() => setShowCreate(true)}
          >
            <span className="text-xl">+</span>
            Crear Usuario
          </button>
        </div>

        {/* Tabla de usuarios */}
        <div className="bg-[#1F2937] rounded-xl shadow-xl border border-[#22D3EE]/20 overflow-hidden">
          <UserTable users={users} onSelect={setSelectedUser} onDelete={handleDeleteUser} />
        </div>
      </div>

      {/* Panel lateral para editar usuario */}
      {selectedUser && (
        <UserDrawer
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdated={() => {
            setSelectedUser(null)
            fetchUsers()
          }}
          onDelete={handleDeleteUser}
        />
      )}

      {/* Modal de crear usuario */}
      {showCreate && (
        <UserFormModal
          onClose={() => setShowCreate(false)}
          onCreated={fetchUsers}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {userToDelete && (
        <DeleteConfirmModal
          user={userToDelete}
          onClose={() => setUserToDelete(null)}
          onConfirm={confirmDelete}
          isLoading={isDeleting}
        />
      )}
    </div>
  )
}
