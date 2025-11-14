import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", views: 4000, articles: 24 },
  { day: "Tue", views: 3000, articles: 13 },
  { day: "Wed", views: 2000, articles: 9 },
  { day: "Thu", views: 2780, articles: 39 },
  { day: "Fri", views: 1890, articles: 23 },
  { day: "Sat", views: 2390, articles: 22 },
  { day: "Sun", views: 3490, articles: 11 },
]

export default function AdminChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#C62828" name="Views" />
          <Line type="monotone" dataKey="articles" stroke="#1565C0" name="Articles" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
