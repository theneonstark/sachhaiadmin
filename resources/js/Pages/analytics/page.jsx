"use client"

import { Card } from "@/components/ui/card"
import { Eye, Heart, MessageSquare, BarChart3 } from "lucide-react"

export default function AnalyticsPage() {
  const stats = [
    { label: "Total Page Views", value: "24,856", change: "+12.5%", icon: Eye, color: "blue" },
    { label: "Total Likes", value: "3,642", change: "+8.2%", icon: Heart, color: "red" },
    { label: "Total Comments", value: "1,284", change: "+15.3%", icon: MessageSquare, color: "purple" },
    { label: "Avg. Read Time", value: "4:32", change: "+2.1 min", icon: BarChart3, color: "green" },
  ]

  const topArticles = [
    { title: "Breaking: Major Political Reform", views: "8,234", likes: "892", category: "Politics" },
    { title: "AI Technology Reaches New Milestone", views: "7,891", likes: "756", category: "Tech" },
    { title: "Celebrity Exclusive Interview", views: "6,543", likes: "1,203", category: "Entertainment" },
    { title: "Market Analysis Report", views: "5,267", likes: "421", category: "Business" },
    { title: "Fitness Trends 2025", views: "4,892", likes: "643", category: "Lifestyle" },
  ]

  const categoryStats = [
    { name: "Politics", articles: 12, views: "45,234", engagement: "23.5%" },
    { name: "Technology", articles: 18, views: "52,891", engagement: "28.7%" },
    { name: "Entertainment", articles: 15, views: "38,234", engagement: "31.2%" },
    { name: "Business", articles: 10, views: "28,564", engagement: "18.4%" },
    { name: "Lifestyle", articles: 14, views: "35,892", engagement: "22.1%" },
  ]

  const colorMap = { blue: "text-blue-500", red: "text-red-500", purple: "text-purple-500", green: "text-green-500" }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your site performance and engagement metrics</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <Icon className={`w-5 h-5 ${colorMap[stat.color]} opacity-50`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-green-600">↑ {stat.change} vs last month</p>
            </Card>
          )
        })}
      </div>

      {/* Top Articles */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Articles</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Article</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Views</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Likes</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {topArticles.map((article, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{article.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{article.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{article.views}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{article.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Category Performance */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Category Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Articles</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Views</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Engagement Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categoryStats.map((cat, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{cat.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cat.articles}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cat.views}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">{cat.engagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
