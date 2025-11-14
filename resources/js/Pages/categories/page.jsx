"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import CategoriesTable from "@/components/categories-table"
import CreateCategoryModal from "@/components/create-category-modal"
import { Plus } from "lucide-react"
import AdminLayout from "../layout"

const DEFAULT_CATEGORIES = [
  { id: 1, name: "Breaking News", slug: "breaking-news", color: "#C62828" },
  { id: 2, name: "Politics", slug: "politics", color: "#1565C0" },
  { id: 3, name: "Technology", slug: "technology", color: "#00796B" },
  { id: 4, name: "Entertainment", slug: "entertainment", color: "#6A1B9A" },
  { id: 5, name: "Lifestyle", slug: "lifestyle", color: "#F57C00" },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sachhai-categories") || "[]")
    if (stored.length === 0) {
      localStorage.setItem("sachhai-categories", JSON.stringify(DEFAULT_CATEGORIES))
    } else {
      setCategories(stored)
    }
  }, [])

  const handleAddCategory = (newCategory) => {
    const updated = [...categories, { ...newCategory, id: Date.now() }]
    setCategories(updated)
    localStorage.setItem("sachhai-categories", JSON.stringify(updated))
    setIsModalOpen(false)
  }

  const handleDeleteCategory = (id) => {
    const updated = categories.filter((c) => c.id !== id)
    setCategories(updated)
    localStorage.setItem("sachhai-categories", JSON.stringify(updated))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage article categories</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Category
        </Button>
      </div>

      <CategoriesTable categories={categories} onDelete={handleDeleteCategory} />

      <CreateCategoryModal open={isModalOpen} onOpenChange={setIsModalOpen} onAdd={handleAddCategory} />
    </div>
    </AdminLayout>
  )
}
