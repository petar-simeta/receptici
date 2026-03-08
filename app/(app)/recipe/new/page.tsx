"use client";

import { useRouter } from "next/navigation";
import { RecipeForm } from "@/components/recipe-form";
import type { RecipeInput } from "@/lib/recipe-schema";
import type { RecipeFormValues } from "@/lib/types";

function toRecipePayload(recipe: RecipeFormValues): RecipeInput {
  return {
    title: recipe.title,
    subtitle: recipe.subtitle || null,
    content: recipe.content,
    duration: recipe.duration,
    price: recipe.pricePerPortion,
    rating: recipe.rating,
    calories: recipe.calories,
    tags: recipe.tags,
    ingredients: recipe.ingredients.map((ingredient) => ({
      label: ingredient.label,
      quantity: ingredient.quantity || null,
    })),
  };
}

export default function NewRecipePage() {
  const router = useRouter();

  const handleSubmit = async (recipe: RecipeFormValues) => {
    try {
      const payload = toRecipePayload(recipe);

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

      const created: { slug?: string } = await res.json();

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
