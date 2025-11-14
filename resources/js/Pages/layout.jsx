import AdminNav from "@/components/admin-nav"
import Sidebar from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"
import AdminDashboard from "./Welcome"

export const metadata = {
  title: "Sachhai Admin",
  description: "Admin dashboard for Sachhai news website",
}

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNav />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
