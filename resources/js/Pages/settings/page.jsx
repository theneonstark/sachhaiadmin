"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Save } from "lucide-react"
import AdminLayout from "../layout"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Sachhai News",
    siteUrl: "https://sachhai.news",
    tagline: "Truth First, Always",
    email: "contact@sachhai.com",
    phone: "+91 XXXXXXXXXX",
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem("sachhai-settings", JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your site settings</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <Input
              value={settings.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              placeholder="Enter site name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site URL</label>
            <Input
              value={settings.siteUrl}
              onChange={(e) => handleChange("siteUrl", e.target.value)}
              placeholder="Enter site URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
            <Input
              value={settings.tagline}
              onChange={(e) => handleChange("tagline", e.target.value)}
              placeholder="Enter site tagline"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter contact email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <Input
              value={settings.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          {saved && (
            <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">Settings saved successfully!</div>
          )}

          <Button onClick={handleSave} className="gap-2 w-full">
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
    </AdminLayout>
  )
}
