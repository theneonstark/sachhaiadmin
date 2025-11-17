"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateArticleModal({ open, onOpenChange, onAdd, categories, initial }) {

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Admin",
    publishDate: new Date().toISOString().split("T")[0],
    status: "draft",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    slug: "",
  });

  const [imageFile, setImageFile] = useState(null);

  // Load edit mode data
  useEffect(() => {
    if (initial) {
      setFormData({
        title: initial.title || "",
        excerpt: initial.excerpt || "",
        content: initial.description || "",
        category: initial.type_id ? String(initial.type_id) : "",
        author: initial.author || "Admin",
        publishDate: initial.publish_date
          ? initial.publish_date.split("T")[0]
          : new Date().toISOString().split("T")[0],
        status: initial.status || "draft",
        meta_title: initial.meta_title || "",
        meta_description: initial.meta_description || "",
        meta_keywords: initial.meta_keywords || "",
        slug: initial.slug || "",
      });
      setImageFile(null);
    } else {
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        author: "Admin",
        publishDate: new Date().toISOString().split("T")[0],
        status: "draft",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        slug: "",
      });
      setImageFile(null);
    }
  }, [initial, open]);

  // Auto slug
  const slugify = (str) =>
    str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      title: value,
      slug: slugify(value),
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      alert("Please fill required fields");
      return;
    }

    const payload = new FormData();

    payload.append("title", formData.title);
    payload.append("description", formData.content); // HTML from Quill
    payload.append("type_id", formData.category);
    payload.append("author", formData.author);
    payload.append("status", formData.status);
    payload.append("publish_date", formData.publishDate);
    payload.append("excerpt", formData.excerpt || "");
    payload.append("featured", formData.status === "published" ? 1 : 0);

    payload.append("meta_title", formData.meta_title || "");
    payload.append("meta_description", formData.meta_description || "");
    payload.append("meta_keywords", formData.meta_keywords || "");
    payload.append("slug", formData.slug || "");

    const selectedCat = categories.find((c) => String(c.id) === formData.category);
    payload.append("type", selectedCat?.type || "");

    if (imageFile) {
      payload.append("image", imageFile);
    } else if (initial?.image) {
      payload.append("old_image", initial.image);
    }

    onAdd(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Article" : "Create Article"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <Input value={formData.title} onChange={handleTitleChange} required />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
          </div>

          {/* Category + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <Select
                value={formData.category}
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select
                value={formData.status}
                onValueChange={(val) => setFormData({ ...formData, status: val })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>

          {/* 🔥 React Quill Editor */}
          <div>
            <label className="block text-sm font-medium mb-1">Content *</label>
            <div className="bg-white border rounded">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                style={{ height: "200px" }}
              />
            </div>
          </div>

          {/* Image + Date */}
          <div className="grid grid-cols-2 gap-4 pt-10">
            <div>
              <label className="block text-sm font-medium mb-1">Featured Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
              {initial?.image && <p className="text-xs mt-1">Current: {initial.image}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Publish Date
              </label>
              <Input
                type="date"
                value={formData.publishDate}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              />
            </div>
          </div>

          {/* SEO */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Meta Title</label>
            <Input
              value={formData.meta_title}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            />

            <label className="text-sm font-medium">Meta Description</label>
            <Textarea
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            />

            <label className="text-sm font-medium">Meta Keywords</label>
            <Input
              value={formData.meta_keywords}
              onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {initial ? "Update Article" : "Create Article"}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}