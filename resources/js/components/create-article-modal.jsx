"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CreateArticleModal({ open, onOpenChange, onAdd, categories, initial }) {
  // initial can be used for edit (if provided)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Admin",
    publishDate: new Date().toISOString().split("T")[0],
    status: "draft",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initial) {
      setFormData({
        title: initial.title || "",
        excerpt: initial.excerpt || "",
        content: initial.description || "",
        category: initial.type_id ? String(initial.type_id) : "",
        author: initial.author || "Admin",
        publishDate: initial.publish_date ? initial.publish_date.split('T')[0] : new Date().toISOString().split("T")[0],
        status: initial.status || "draft",
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
      });
      setImageFile(null);
    }
  }, [initial, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category) {
      alert("Please fill required fields");
      return;
    }

    // Build FormData for file uploads
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.content);
    payload.append('type_id', formData.category);
    payload.append('author', formData.author);
    payload.append('status', formData.status);
    payload.append('publish_date', formData.publishDate);
    payload.append('excerpt', formData.excerpt || "");
    payload.append('featured', formData.status === 'published' ? 1 : 0);
    if (imageFile) payload.append('image', imageFile);

    // if editing, parent should call articleUpdate, else articleAdd
    onAdd(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Article" : "Create New Article"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <Input value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <Select value={formData.category} onValueChange={(val)=>setFormData({...formData,category:val})}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat.id} value={String(cat.id)}>{cat.type}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select value={formData.status} onValueChange={(val)=>setFormData({...formData,status:val})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <Textarea value={formData.excerpt} onChange={(e)=>setFormData({...formData,excerpt:e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Content *</label>
            <div className="bg-white border rounded">
              <CKEditor
                editor={ClassicEditor}
                data={formData.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData(prev => ({...prev, content: data}));
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Featured Image</label>
              <input type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files[0])} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Publish Date
              </label>
              <Input type="date" value={formData.publishDate} onChange={(e)=>setFormData({...formData,publishDate:e.target.value})} />
            </div>
          </div>

          {/* SEO fields could be toggled; include quick inputs */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Meta Title</label>
            <Input value={formData.meta_title||''} onChange={(e)=>setFormData({...formData,meta_title:e.target.value})} placeholder="Optional meta title" />
            <label className="text-sm font-medium">Meta Description</label>
            <Textarea value={formData.meta_description||''} onChange={(e)=>setFormData({...formData,meta_description:e.target.value})} placeholder="Optional meta description" />
            <label className="text-sm font-medium">Meta Keywords</label>
            <Input value={formData.meta_keywords||''} onChange={(e)=>setFormData({...formData,meta_keywords:e.target.value})} placeholder="comma,separated,keywords" />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={()=>onOpenChange(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">{initial ? "Update Article" : "Create Article"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}