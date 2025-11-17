"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArticlesTable from "@/components/articles-table"
import CreateArticleModal from "@/components/create-article-modal"
import { Plus, Search, TrendingUp, BarChart3 } from "lucide-react"
import AdminLayout from "../layout"
import { Article, articleAdd, articleRemove, articleUpdate, Category } from "@/lib/apis"

export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  // Create Modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await Category()
        setCategories(res.data.categories)
      } catch (error) {
        console.log("Error loading categories:", error)
      }
    }
    fetchCategories()
  }, [])

  // Load articles
  const loadArticles = async () => {
    try {
      const res = await Article()
      setArticles(res.data.articles)
    } catch (error) {
      console.log("Error fetching articles:", error)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  // Add Article
  const handleAddArticle = async (formData) => {
    try {
      await articleAdd(formData)
      await loadArticles()
      setIsModalOpen(false)
    } catch (err) {
      console.error(err)
      alert("Add failed")
    }
  }

  // Open Edit Modal
  const openEdit = (article) => {
    setEditingArticle(article)
    setEditModalOpen(true)
  }

  // Update Article
  const handleUpdateArticle = async (id, formData) => {
    try {
      await articleUpdate(id, formData)
      await loadArticles()
      setEditModalOpen(false)
      setEditingArticle(null)
    } catch (err) {
      console.error(err)
      alert("Update failed")
    }
  }

  // Delete article
  const handleDeleteArticle = async (id) => {
    try {
      await articleRemove(id)
      await loadArticles()
    } catch (error) {
      console.log("Error deleting article:", error)
    }
  }

  // Filters + Search
  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filter === "all" || a.status === filter
    return matchesSearch && matchesFilter
  })

  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0)
  const totalEngagement = articles.reduce((sum, a) => sum + (a.likes || 0), 0)

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
            <p className="text-gray-600 mt-1">Manage all published articles</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Article
          </Button>
        </div>

        {/* TABLE */}
        <ArticlesTable
          articles={filteredArticles}
          onDelete={handleDeleteArticle}
          onEdit={openEdit}
        />

        {/* CREATE MODAL */}
        <CreateArticleModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          categories={categories}
          onAdd={handleAddArticle}
        />

        {/* EDIT MODAL */}
        {editingArticle && (
          <CreateArticleModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            categories={categories}
            initial={editingArticle}
            onAdd={(formData) => handleUpdateArticle(editingArticle.id, formData)}
          />
        )}

      </div>
    </AdminLayout>
  )
}
