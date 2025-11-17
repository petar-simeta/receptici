"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MarkdownEditor } from "./markdown-editor";

type FormIngredient = {
  label: string;
  quantity: string;
};

interface RecipeFormProps {
  recipe?: any;
  onSubmit: (recipe: any) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export function RecipeForm({
  recipe,
  onSubmit,
  onCancel,
  onDelete,
}: RecipeFormProps) {
  const initialSelectedTags: string[] =
    recipe?.tags && Array.isArray(recipe.tags)
      ? recipe.tags
          .map((t: any) => (typeof t === "string" ? t : t?.name ?? ""))
          .filter((t: string) => t.length > 0)
      : [];

  const initialIngredients: FormIngredient[] =
    recipe?.ingredients &&
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.length > 0
      ? recipe.ingredients.map((ing: any) => ({
          label: ing.label ?? "",
          quantity: ing.quantity ?? "",
        }))
      : [{ label: "", quantity: "" }];

  const [title, setTitle] = useState(recipe?.title || "");
  const [subtitle, setSubtitle] = useState(recipe?.subtitle || "");
  const [ingredients, setIngredients] =
    useState<FormIngredient[]>(initialIngredients);
  const [selectedTags, setSelectedTags] =
    useState<string[]>(initialSelectedTags);
  const [allTags, setAllTags] = useState<string[]>(() =>
    Array.from(new Set([...initialSelectedTags]))
  );
  const [newTag, setNewTag] = useState("");
  const [duration, setDuration] = useState(recipe?.duration || 30);
  const [pricePerPortion, setPricePerPortion] = useState(
    recipe?.pricePerPortion ?? 5
  );
  const [rating, setRating] = useState(recipe?.rating ?? 3.5);
  const [calories, setCalories] = useState(recipe?.calories ?? 500);
  const [content, setContent] = useState(recipe?.content || "");
  const [contentError, setContentError] = useState<string | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("/api/tags");
        if (!res.ok) {
          return;
        }
        const data = await res.json();

        if (!Array.isArray(data)) {
          return;
        }

        const tagNames = Array.from(
          new Set(
            data.map((t: any) => (typeof t === "string" ? t : t?.name ?? ""))
          )
        ).filter((t) => t.length > 0);

        if (tagNames.length) {
          setAllTags((prev) => Array.from(new Set([...prev, ...tagNames])));
        }
      } catch (error) {
        console.error("Failed to load tags", error);
      }
    }

    fetchTags();
  }, []);

  const addIngredient = () => {
    setIngredients([...ingredients, { label: "", quantity: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleDrop = (to: number) => {
    setIngredients((prev) => {
      if (draggingIndex === null || draggingIndex === to) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(draggingIndex, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
    setDraggingIndex(null);
  };

  const updateIngredient = (
    index: number,
    field: "label" | "quantity",
    value: string
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;

    setAllTags((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    setSelectedTags((prev) =>
      prev.includes(trimmed) ? prev : [...prev, trimmed]
    );
    setNewTag("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setContentError(
        "Please add instructions for the recipe (this field is required)."
      );
      return;
    }

    setContentError(null);

    onSubmit({
      title,
      subtitle,
      tags: selectedTags,
      duration,
      pricePerPortion,
      rating,
      calories,
      ingredients: ingredients
        .filter((ing) => ing.label.trim().length > 0)
        .map((ing) => ({
          label: ing.label.trim(),
          quantity: ing.quantity.trim(),
        })),
      content: trimmedContent,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title<span className="text-red-500 -ml-2">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Recipe title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">
              Subtitle<span className="text-red-500 -ml-2">*</span>
            </Label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Short description"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Ingredients</Label>
            </div>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 ${
                  draggingIndex === index ? "opacity-70" : ""
                }`}
                draggable
                onDragStart={() => setDraggingIndex(index)}
                onDragEnd={() => setDraggingIndex(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
              >
                <button
                  type="button"
                  className="cursor-grab text-gray-400 hover:text-gray-600"
                >
                  <GripVertical size={16} />
                </button>
                <Input
                  placeholder="Label (e.g., Tomatoes)"
                  value={ingredient.label}
                  onChange={(e) =>
                    updateIngredient(index, "label", e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  placeholder="Quantity (e.g., 500g)"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    updateIngredient(index, "quantity", e.target.value)
                  }
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeIngredient(index)}
                  disabled={ingredients.length === 1}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
            <div className="pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addIngredient}
              >
                <Plus size={16} className="mr-1" />
                Add ingredient
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="Add new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="max-w-xs"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={!newTag.trim()}
              >
                Add tag
              </Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="duration">
                Duration (minutes)<span className="text-red-500 -ml-2">*</span>
              </Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                onFocus={(e) => e.target.select()}
                min={1}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">
                Price per portion (€)
                <span className="text-red-500 -ml-2">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={pricePerPortion}
                onChange={(e) =>
                  setPricePerPortion(Number(e.target.value.replace(",", ".")))
                }
                onFocus={(e) => e.target.select()}
                min={0}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">
                Rating (0-5)<span className="text-red-500 -ml-2">*</span>
              </Label>
              <Input
                id="rating"
                type="number"
                step="0.01"
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value.replace(",", ".")))
                }
                onFocus={(e) => e.target.select()}
                min={0}
                max={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories">Calories per portion (kcal)</Label>
              <Input
                id="calories"
                type="number"
                step="1"
                value={calories}
                onChange={(e) =>
                  setCalories(Number(e.target.value.replace(",", ".")))
                }
                onFocus={(e) => e.target.select()}
                min={0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Instructions (Markdown)
              <span className="text-red-500 -ml-2">*</span>
            </Label>
            <MarkdownEditor
              value={content}
              onChange={(value) => {
                setContent(value);
                if (contentError) {
                  setContentError(null);
                }
              }}
            />
            {contentError && (
              <p className="text-sm text-red-600">{contentError}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-3">
        {onDelete && recipe && (
          <Button type="button" variant="destructive" onClick={onDelete}>
            Delete recipe
          </Button>
        )}
        <div className="flex gap-3 justify-end flex-1">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
            {recipe ? "Save changes" : "Save recipe"}
          </Button>
        </div>
      </div>
    </form>
  );
}
