"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ArticlesTable from "@/components/articles-table"
import CreateArticleModal from "@/components/create-article-modal"
import { Plus, Search, TrendingUp, BarChart3 } from "lucide-react"
import AdminLayout from "../layout"

export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sachhai-articles") || "[]")
    setArticles(stored)
  }, [])

  const handleAddArticle = (newArticle) => {
    const updated = [...articles, { ...newArticle, id: Date.now() }]
    setArticles(updated)
    localStorage.setItem("sachhai-articles", JSON.stringify(updated))
    setIsModalOpen(false)
  }

  const handleDeleteArticle = (id) => {
    const updated = articles.filter((a) => a.id !== id)
    setArticles(updated)
    localStorage.setItem("sachhai-articles", JSON.stringify(updated))
  }

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" || a.status === filter
    return matchesSearch && matchesFilter
  })

  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0)
  const totalEngagement = articles.reduce((sum, a) => sum + (a.likes || 0), 0)
  const publishedCount = articles.filter((a) => a.status === "published").length

  return (
    <AdminLayout>
      <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Articles</p>
              <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{totalEngagement.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500 opacity-20" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="w-auto">
            <TabsList className="grid grid-cols-3 h-10">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="published" className="text-xs">
                Published
              </TabsTrigger>
              <TabsTrigger value="draft" className="text-xs">
                Draft
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ArticlesTable articles={filteredArticles} onDelete={handleDeleteArticle} />
      </div>

      <CreateArticleModal open={isModalOpen} onOpenChange={setIsModalOpen} onAdd={handleAddArticle} />
    </div>
    </AdminLayout>
  )
}
