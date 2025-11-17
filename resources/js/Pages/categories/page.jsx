"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import CategoriesTable from "@/components/categories-table"
import CreateCategoryModal from "@/components/create-category-modal"
import { Plus } from "lucide-react"
import AdminLayout from "../layout"
import { Category, categoryAdd, categoryRemove, categoryUpdate } from "@/lib/apis"
import EditCategoryModal from "@/components/edit-category-modal"

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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --------------------------
  // 🔥 Fetch Categories from Backend
  // --------------------------
  const loadCategories = async () => {
    try {
      const res = await Category();
      setCategories(res.data.categories)
    } catch (error) {
      console.log("Error fetching categories:", error)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  // --------------------------
  // 🔥 Add Category to Backend
  // --------------------------
  const handleAddCategory = async (newCategory) => {
    try {
      const res = await categoryAdd(newCategory)
      setCategories((prev) => [...prev, res.data.category])
      setIsModalOpen(false)
    } catch (error) {
      console.log("Error adding category:", error)
    }
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleUpdateCategory = async (updated) => {
    try {
      const res = await categoryUpdate(updated.id, updated);

      setCategories(categories.map((cat) => 
        cat.id === updated.id ? res.data.category : cat
      ));

      setEditModalOpen(false);
    } catch (error) {
      console.log("Error updating:", error);
    }
  };

  // --------------------------
  // 🔥 Delete Category from Backend
  // --------------------------
  const handleDeleteCategory = async (id) => {
    try {
      await categoryRemove(id)
      setCategories(categories.filter((c) => c.id !== id))
    } catch (error) {
      console.log("Error deleting category:", error)
    }
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

      <CategoriesTable categories={categories} onDelete={handleDeleteCategory} onEdit={handleEditCategory}/>

      <CreateCategoryModal open={isModalOpen} onOpenChange={setIsModalOpen} onAdd={handleAddCategory} />
    </div>

    <EditCategoryModal
      open={editModalOpen}
      onOpenChange={setEditModalOpen}
      category={selectedCategory}
      onUpdate={handleUpdateCategory}
    />
    </AdminLayout>
  )
}
