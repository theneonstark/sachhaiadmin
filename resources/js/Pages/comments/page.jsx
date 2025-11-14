"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Trash2, CheckCircle, XCircle } from "lucide-react"

export default function CommentsPage() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      email: "john@example.com",
      article: "Breaking: Major Political Reform",
      status: "pending",
      comment: "Great article! Very informative.",
    },
    {
      id: 2,
      author: "Jane Smith",
      email: "jane@example.com",
      article: "AI Medical Breakthrough",
      status: "approved",
      comment: "This is groundbreaking research. Looking forward to more updates.",
    },
    {
      id: 3,
      author: "Bob Wilson",
      email: "bob@example.com",
      article: "Breaking: Major Political Reform",
      status: "rejected",
      comment: "Spam comment removed",
    },
  ])

  const handleApprove = (id) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, status: "approved" } : c)))
  }

  const handleReject = (id) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, status: "rejected" } : c)))
  }

  const handleDelete = (id) => {
    setComments(comments.filter((c) => c.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const pendingCount = comments.filter((c) => c.status === "pending").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Comments</h1>
        <p className="text-gray-600 mt-1">Moderate and manage reader comments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Comments</p>
              <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-yellow-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {comments.filter((c) => c.status === "approved").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500 opacity-20" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-gray-900">{comment.author}</p>
                  <Badge className={getStatusColor(comment.status)}>{comment.status}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{comment.email}</p>
                <p className="text-sm text-gray-700 mb-2">{comment.comment}</p>
                <p className="text-xs text-gray-500">On: {comment.article}</p>
              </div>
              <div className="flex gap-2">
                {comment.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 bg-transparent"
                      onClick={() => handleApprove(comment.id)}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-red-600 bg-transparent"
                      onClick={() => handleReject(comment.id)}
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1 text-red-600"
                  onClick={() => handleDelete(comment.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
