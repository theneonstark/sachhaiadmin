"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditCategoryModal({ open, onOpenChange, category, onUpdate }) {
  const [type, setType] = useState("");
  const [slug, setSlug] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (category) {
      setType(category.type);
      setSlug(category.slug);
      setColor(category.color || "#000000");
    }
  }, [category]);

  const handleSubmit = () => {
    onUpdate({
      ...category,
      type,
      slug,
      color,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm">Category Name</label>
            <Input value={type} onChange={(e) => setType(e.target.value)} />
          </div>

          <div>
            <label className="text-sm">Slug</label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>

          <div>
            <label className="text-sm">Color</label>
            <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
