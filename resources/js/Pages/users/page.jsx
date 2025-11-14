"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UsersTable from "@/components/users-table"
import CreateUserModal from "@/components/create-user-modal"
import { Plus, Search } from "lucide-react"
import AdminLayout from "../layout"

const DEFAULT_USERS = [
  { id: 1, name: "Admin User", email: "admin@sachhai.com", role: "admin", status: "active" },
  { id: 2, name: "Editor", email: "editor@sachhai.com", role: "editor", status: "active" },
]

export default function UsersPage() {
  const [users, setUsers] = useState(DEFAULT_USERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sachhai-users") || "[]")
    if (stored.length === 0) {
      localStorage.setItem("sachhai-users", JSON.stringify(DEFAULT_USERS))
    } else {
      setUsers(stored)
    }
  }, [])

  const handleAddUser = (newUser) => {
    const updated = [...users, { ...newUser, id: Date.now() }]
    setUsers(updated)
    localStorage.setItem("sachhai-users", JSON.stringify(updated))
    setIsModalOpen(false)
  }

  const handleDeleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id)
    setUsers(updated)
    localStorage.setItem("sachhai-users", JSON.stringify(updated))
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New User
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <UsersTable users={filteredUsers} onDelete={handleDeleteUser} />

      <CreateUserModal open={isModalOpen} onOpenChange={setIsModalOpen} onAdd={handleAddUser} />
    </div>
    </AdminLayout>
  )
}
