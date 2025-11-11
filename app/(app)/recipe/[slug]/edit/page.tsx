"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RecipeForm } from "@/components/recipe-form";

export default function EditRecipePage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes/${slug}`);
        if (!res.ok) {
          console.error("Failed to fetch recipe", await res.text());
          setError("Failed to load recipe.");
          return;
        }
        const data = await res.json();
        setRecipe(data);
      } catch (e) {
        console.error("Error fetching recipe", e);
        setError("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [slug]);

  if (!slug) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-muted-foreground">
            Invalid recipe URL
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-muted-foreground">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-muted-foreground">Recipe not found</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (updatedRecipe: any) => {
    try {
      const tags: string[] = Array.isArray(updatedRecipe.tags)
        ? updatedRecipe.tags
            .map((tag: any) =>
              typeof tag === "string" ? tag : tag?.name ?? ""
            )
            .filter((t: string) => t.length > 0)
        : [];

      const payload = {
        title: updatedRecipe.title ?? "",
        subtitle: updatedRecipe.subtitle ?? null,
        content: updatedRecipe.content ?? updatedRecipe.markdown ?? "",
        duration:
          updatedRecipe.duration ?? updatedRecipe.durationMinutes ?? null,
        price: updatedRecipe.price ?? updatedRecipe.pricePerPortion ?? null,
        rating: updatedRecipe.rating ?? null,
        tags,
        ingredients: Array.isArray(updatedRecipe.ingredients)
          ? updatedRecipe.ingredients.map((ing: any) => ({
              label: ing.label ?? "",
              quantity: ing.quantity ?? null,
            }))
          : [],
      };

      const res = await fetch(`/api/recipes/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Failed to update recipe", await res.text());
        alert("Failed to update recipe. Please try again.");
        return;
      }

      const updated = await res.json();
      const nextSlug = updated?.slug ?? slug;
      router.push(`/recipe/${nextSlug}`);
    } catch (error) {
      console.error("Error updating recipe", error);
      alert("Unexpected error while updating recipe.");
    }
  };

  const handleCancel = () => {
    router.push(`/recipe/${slug}`);
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this recipe?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/recipes/${slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const msg = await res.text();
        console.error("Failed to delete recipe:", msg);
        alert("Failed to delete recipe. Please try again.");
        return;
      }

      alert("Recipe deleted successfully.");
      router.push("/");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Unexpected error while deleting recipe.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl p-6 space-y-6">
        <h1 className="text-4xl font-bold text-teal-700">Edit Recipe</h1>
        <RecipeForm
          recipe={recipe}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
