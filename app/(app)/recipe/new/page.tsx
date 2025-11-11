"use client";

import { useRouter } from "next/navigation";
import { RecipeForm } from "@/components/recipe-form";
// import type { Recipe } from "@/lib/types";

export default function NewRecipePage() {
  const router = useRouter();

  const handleSubmit = async (recipe: any) => {
    try {
      // adapt RecipeForm values to API input shape
      const payload = {
        title: recipe.title ?? "",
        subtitle: recipe.subtitle ?? null,
        content: recipe.content ?? recipe.markdown ?? "",
        duration: recipe.duration ?? recipe.durationMinutes ?? null,
        price: recipe.price ?? recipe.pricePerPortion ?? null,
        rating: recipe.rating ?? null,
        tags: recipe.tags ?? [],
        ingredients: Array.isArray(recipe.ingredients)
          ? recipe.ingredients.map((ing: any) => ({
              label: ing.label ?? "",
              quantity: ing.quantity ?? null,
            }))
          : [],
      };

      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Failed to create recipe", await res.text());
        alert("Failed to create recipe. Please try again.");
        return;
      }

      const created = await res.json();

      if (created?.slug) {
        router.push(`/recipe/${created.slug}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating recipe", error);
      alert("Unexpected error while creating recipe.");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl p-6 space-y-6">
        <h1 className="text-4xl font-bold text-teal-700">Create New Recipe</h1>
        <RecipeForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
