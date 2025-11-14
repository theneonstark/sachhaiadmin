import { useState, useEffect } from "react"
import DashboardStats from "@/components/dashboard-stats"
import RecentArticles from "@/components/recent-articles"
import AdminChart from "@/components/admin-chart"
import AdminLayout from "./layout"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    totalComments: 0,
    publishedToday: 0,
  })

  useEffect(() => {
    // Fetch stats from localStorage (mock data)
    const articles = JSON.parse(localStorage.getItem("sachhai-articles") || "[]")
    setStats({
      totalArticles: articles.length,
      totalViews: Math.floor(Math.random() * 50000) + 10000,
      totalComments: Math.floor(Math.random() * 1000) + 100,
      publishedToday: articles.filter((a) => {
        const today = new Date().toDateString()
        return new Date(a.createdAt).toDateString() === today
      }).length,
    })
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to Sachhai Admin</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AdminChart />
        </div>
        <RecentArticles />
      </div>
    </div>
    </AdminLayout>
  )
}
