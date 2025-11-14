import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RecentArticles() {
  const recentArticles = [
    { id: 1, title: "Breaking: Market Rally", category: "Business", date: "Today" },
    { id: 2, title: "New Tech Innovation", category: "Technology", date: "Yesterday" },
    { id: 3, title: "Sports Update", category: "Sports", date: "2 days ago" },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Articles</h3>
      <div className="space-y-3">
        {recentArticles.map((article) => (
          <div key={article.id} className="pb-3 border-b last:border-0">
            <p className="font-medium text-gray-900 text-sm">{article.title}</p>
            <div className="flex justify-between items-center mt-2">
              <Badge variant="secondary">{article.category}</Badge>
              <span className="text-xs text-gray-500">{article.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
