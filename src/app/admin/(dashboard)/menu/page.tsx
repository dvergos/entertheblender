'use client';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit2, Trash2, Save, X, ChevronUp, ChevronDown } from "lucide-react";

interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: string;
  sort_order: number;
}

interface MenuCategory {
  id: string;
  slug: string;
  label: string;
  sort_order: number;
  menu_items: MenuItem[];
}

export default function AdminMenu() {
  const supabase = createClient();

  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Category form
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryLabel, setCategoryLabel] = useState("");

  // Item form
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState({ name: "", description: "", price: "" });

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  // ── Load data ─────────────────────────────────────────────────────────────
  const loadMenu = async () => {
    const { data, error } = await supabase
      .from("menu_categories")
      .select("*, menu_items(*)")
      .order("sort_order", { ascending: true });

    if (error) {
      showFeedback("error", "Failed to load menu: " + error.message);
      setLoading(false);
      return;
    }

    const sorted = (data ?? []).map((cat) => ({
      ...cat,
      menu_items: (cat.menu_items ?? []).sort(
        (a: MenuItem, b: MenuItem) => a.sort_order - b.sort_order
      ),
    }));

    setCategories(sorted);
    if (!activeCategoryId && sorted.length > 0) {
      setActiveCategoryId(sorted[0].id);
    }
    setLoading(false);
  };

  useEffect(() => { loadMenu(); }, []);

  const activeCategory = categories.find((c) => c.id === activeCategoryId);

  // ── Category actions ──────────────────────────────────────────────────────
  const handleAddCategory = async () => {
    const label = categoryLabel.trim();
    if (!label) return;

    const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const maxOrder = Math.max(0, ...categories.map((c) => c.sort_order));

    const { data, error } = await supabase
      .from("menu_categories")
      .insert({ slug, label, sort_order: maxOrder + 1 })
      .select()
      .single();

    if (error) { showFeedback("error", "Failed to add category: " + error.message); return; }

    const newCat: MenuCategory = { ...data, menu_items: [] };
    setCategories([...categories, newCat]);
    setActiveCategoryId(newCat.id);
    setCategoryLabel("");
    setShowCategoryForm(false);
    showFeedback("success", `Category "${label}" added.`);
  };

  const handleUpdateCategory = async () => {
    const label = categoryLabel.trim();
    if (!label || !editingCategoryId) return;

    const { error } = await supabase
      .from("menu_categories")
      .update({ label })
      .eq("id", editingCategoryId);

    if (error) { showFeedback("error", "Failed to update category: " + error.message); return; }

    setCategories(categories.map((c) => c.id === editingCategoryId ? { ...c, label } : c));
    setCategoryLabel("");
    setEditingCategoryId(null);
    setShowCategoryForm(false);
    showFeedback("success", "Category updated.");
  };

  const handleDeleteCategory = async (id: string, label: string) => {
    if (!confirm(`Delete "${label}" and all its items?`)) return;

    const { error } = await supabase.from("menu_categories").delete().eq("id", id);
    if (error) { showFeedback("error", "Failed to delete category: " + error.message); return; }

    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    if (activeCategoryId === id) setActiveCategoryId(updated[0]?.id ?? "");
    showFeedback("success", `"${label}" deleted.`);
  };

  const moveCategoryUp = async (index: number) => {
    if (index === 0) return;
    const a = categories[index];
    const b = categories[index - 1];

    await Promise.all([
      supabase.from("menu_categories").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("menu_categories").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);

    const updated = [...categories];
    updated[index] = { ...a, sort_order: b.sort_order };
    updated[index - 1] = { ...b, sort_order: a.sort_order };
    updated.sort((x, y) => x.sort_order - y.sort_order);
    setCategories(updated);
  };

  const moveCategoryDown = async (index: number) => {
    if (index === categories.length - 1) return;
    const a = categories[index];
    const b = categories[index + 1];

    await Promise.all([
      supabase.from("menu_categories").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("menu_categories").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);

    const updated = [...categories];
    updated[index] = { ...a, sort_order: b.sort_order };
    updated[index + 1] = { ...b, sort_order: a.sort_order };
    updated.sort((x, y) => x.sort_order - y.sort_order);
    setCategories(updated);
  };

  // ── Item actions ──────────────────────────────────────────────────────────
  const resetItemForm = () => {
    setEditingItemId(null);
    setItemForm({ name: "", description: "", price: "" });
  };

  const handleAddItem = async () => {
    if (!itemForm.name.trim() || !itemForm.price.trim()) {
      showFeedback("error", "Item name and price are required.");
      return;
    }

    const currentItems = activeCategory?.menu_items ?? [];
    const maxOrder = Math.max(0, ...currentItems.map((i) => i.sort_order));

    const { data, error } = await supabase
      .from("menu_items")
      .insert({
        category_id: activeCategoryId,
        name: itemForm.name.trim(),
        description: itemForm.description.trim() || null,
        price: itemForm.price.trim(),
        sort_order: maxOrder + 1,
      })
      .select()
      .single();

    if (error) { showFeedback("error", "Failed to add item: " + error.message); return; }

    setCategories(categories.map((c) =>
      c.id === activeCategoryId
        ? { ...c, menu_items: [...c.menu_items, data] }
        : c
    ));
    resetItemForm();
    showFeedback("success", "Item added.");
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItemId(item.id);
    setItemForm({ name: item.name, description: item.description ?? "", price: item.price });
  };

  const handleUpdateItem = async () => {
    if (!itemForm.name.trim() || !itemForm.price.trim() || !editingItemId) return;

    const { error } = await supabase
      .from("menu_items")
      .update({
        name: itemForm.name.trim(),
        description: itemForm.description.trim() || null,
        price: itemForm.price.trim(),
      })
      .eq("id", editingItemId);

    if (error) { showFeedback("error", "Failed to update item: " + error.message); return; }

    setCategories(categories.map((c) =>
      c.id === activeCategoryId
        ? {
            ...c,
            menu_items: c.menu_items.map((it) =>
              it.id === editingItemId
                ? { ...it, name: itemForm.name.trim(), description: itemForm.description.trim() || null, price: itemForm.price.trim() }
                : it
            ),
          }
        : c
    ));
    resetItemForm();
    showFeedback("success", "Item updated.");
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Delete this item?")) return;

    const { error } = await supabase.from("menu_items").delete().eq("id", itemId);
    if (error) { showFeedback("error", "Failed to delete item: " + error.message); return; }

    setCategories(categories.map((c) =>
      c.id === activeCategoryId
        ? { ...c, menu_items: c.menu_items.filter((it) => it.id !== itemId) }
        : c
    ));
    showFeedback("success", "Item deleted.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="font-inter text-neutral-400 text-sm">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 border-b border-neutral-900 pb-6">
          <h1 className="font-oswald text-4xl md:text-6xl uppercase mb-1">Basket Menu Manager</h1>
          <p className="text-sm text-neutral-500 font-inter">Manage menu categories and items</p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-6 px-5 py-3 text-sm font-inter border-l-4 ${
            feedback.type === "success"
              ? "bg-green-50 border-green-600 text-green-800"
              : "bg-red-50 border-red-600 text-red-700"
          }`}>
            {feedback.message}
          </div>
        )}

        {/* Two-panel layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* ── LEFT SIDEBAR ─────────────────────────────────────────────── */}
          <div className="w-full md:w-72 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-oswald text-sm uppercase tracking-widest text-neutral-500">Categories</h2>
              <button
                onClick={() => { setEditingCategoryId(null); setCategoryLabel(""); setShowCategoryForm(true); }}
                className="w-7 h-7 flex items-center justify-center border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                title="Add category"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category form */}
            {showCategoryForm && (
              <div className="mb-4 border border-neutral-300 bg-white p-4">
                <input
                  type="text"
                  value={categoryLabel}
                  onChange={(e) => setCategoryLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") editingCategoryId ? handleUpdateCategory() : handleAddCategory();
                    if (e.key === "Escape") { setShowCategoryForm(false); setCategoryLabel(""); setEditingCategoryId(null); }
                  }}
                  placeholder="Category name"
                  autoFocus
                  className="w-full border border-neutral-300 px-3 py-2 text-sm font-inter focus:outline-none focus:border-neutral-900 mb-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={editingCategoryId ? handleUpdateCategory : handleAddCategory}
                    className="flex-1 bg-neutral-900 text-white text-xs font-oswald uppercase tracking-widest py-2 hover:bg-neutral-800 transition-colors"
                  >
                    {editingCategoryId ? "Update" : "Add"}
                  </button>
                  <button
                    onClick={() => { setShowCategoryForm(false); setCategoryLabel(""); setEditingCategoryId(null); }}
                    className="flex-1 border border-neutral-300 text-xs font-oswald uppercase tracking-widest py-2 hover:border-neutral-900 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Category list */}
            <div className="space-y-1">
              {categories.map((cat, index) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <div
                    key={cat.id}
                    className={`group flex items-center gap-1 px-3 py-3 border cursor-pointer transition-colors ${
                      isActive ? "border-neutral-900 bg-white" : "border-transparent hover:border-neutral-200 hover:bg-white"
                    }`}
                    onClick={() => setActiveCategoryId(cat.id)}
                  >
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button onClick={(e) => { e.stopPropagation(); moveCategoryUp(index); }} className="text-neutral-400 hover:text-neutral-900">
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); moveCategoryDown(index); }} className="text-neutral-400 hover:text-neutral-900">
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-oswald text-sm uppercase truncate block">{cat.label}</span>
                      <span className="text-xs text-neutral-400 font-inter">{cat.menu_items.length} items</span>
                    </div>
                    {isActive && (
                      <div className="flex gap-1 shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); setEditingCategoryId(cat.id); setCategoryLabel(cat.label); setShowCategoryForm(true); }} className="p-1 hover:bg-neutral-100">
                          <Edit2 className="w-3 h-3 text-neutral-500" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id, cat.label); }} className="p-1 hover:bg-red-50">
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT PANEL ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {activeCategory ? (
              <>
                <h2 className="font-oswald text-2xl uppercase mb-6">
                  {activeCategory.label} ({activeCategory.menu_items.length})
                </h2>

                {/* Item form */}
                <div className="bg-white border border-neutral-200 p-6 mb-6">
                  <h3 className="font-oswald text-sm uppercase tracking-widest mb-4 text-neutral-700">
                    {editingItemId ? "Edit Item" : "Add New Item"}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-oswald mb-1.5 text-neutral-600">Item Name *</label>
                      <input
                        type="text"
                        value={itemForm.name}
                        onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                        placeholder="e.g. Espresso"
                        className="w-full border border-neutral-300 px-4 py-2.5 text-sm font-inter focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-oswald mb-1.5 text-neutral-600">
                        Description <span className="normal-case text-neutral-400">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={itemForm.description}
                        onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                        placeholder="e.g. 500ml Bottle"
                        className="w-full border border-neutral-300 px-4 py-2.5 text-sm font-inter focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-oswald mb-1.5 text-neutral-600">Price *</label>
                      <input
                        type="text"
                        value={itemForm.price}
                        onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                        placeholder="e.g. €2.50"
                        className="w-full border border-neutral-300 px-4 py-2.5 text-sm font-inter focus:outline-none focus:border-neutral-900 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={editingItemId ? handleUpdateItem : handleAddItem}
                      className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-2.5 font-oswald uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {editingItemId ? "Update Item" : "Add Item"}
                    </button>
                    {editingItemId && (
                      <button
                        onClick={resetItemForm}
                        className="border border-neutral-300 px-6 py-2.5 font-oswald uppercase tracking-widest text-xs hover:border-neutral-900 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Items list */}
                {activeCategory.menu_items.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-neutral-300">
                    <p className="text-neutral-400 font-inter text-sm">No items yet. Add the first item above.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activeCategory.menu_items.map((item) => (
                      <div
                        key={item.id}
                        className={`bg-white border px-5 py-4 flex items-start justify-between gap-4 transition-colors ${
                          editingItemId === item.id ? "border-neutral-900" : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-oswald text-base">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-neutral-400 font-inter mt-0.5">{item.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-inter text-sm text-neutral-900 whitespace-nowrap">{item.price}</span>
                          <button onClick={() => handleEditItem(item)} className="p-1.5 hover:bg-neutral-100 transition-colors">
                            <Edit2 className="w-3.5 h-3.5 text-neutral-500" />
                          </button>
                          <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 hover:bg-red-50 transition-colors">
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24 border border-dashed border-neutral-300">
                <p className="text-neutral-400 font-inter text-sm">Select a category to manage its items.</p>
              </div>
            )}
          </div>
        </div>

        {/* Info note */}
        <div className="mt-12 border-l-2 border-neutral-900 pl-6 py-4 bg-neutral-100">
          <p className="text-sm font-inter text-neutral-700">
            <strong className="font-oswald uppercase tracking-wider">Live data.</strong>{' '}
            All changes save directly to the database and appear immediately on the{' '}
            <a href="/basket" target="_blank" className="underline hover:text-neutral-900">/basket</a> page.
          </p>
        </div>
      </div>
    </div>
  );
}
