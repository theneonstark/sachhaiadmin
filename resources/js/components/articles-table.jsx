"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Eye, MessageSquare } from "lucide-react"

export default function ArticlesTable({ articles, onDelete, onEdit }) {
  console.log(articles);
  
  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700"
      case "draft":
        return "bg-yellow-100 text-yellow-700"
      case "scheduled":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Views</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Engagement</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {articles.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No articles found
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{article.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{article.type.type}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{article.author || "Admin"}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(article.status)}>{article.status || "Published"}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.views || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {article.likes || 0}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => onEdit(article)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(article.id)}
                      className="gap-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
