import { Card } from "@/components/ui/card"
import { FileText, Eye, MessageSquare, TrendingUp } from "lucide-react"

export default function DashboardStats({ stats }) {
  const statCards = [
    { icon: FileText, label: "Total Articles", value: stats.totalArticles, color: "bg-blue-100 text-blue-600" },
    { icon: Eye, label: "Total Views", value: stats.totalViews.toLocaleString(), color: "bg-green-100 text-green-600" },
    { icon: MessageSquare, label: "Comments", value: stats.totalComments, color: "bg-yellow-100 text-yellow-600" },
    { icon: TrendingUp, label: "Published Today", value: stats.publishedToday, color: "bg-red-100 text-red-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
