import { prisma } from "@/lib/prisma";
import type { Recipe } from "@/lib/types";
import { RecipesExplorer } from "@/components/recipes-explorer";

function mapRecipeFromDb(r: any): Recipe {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    subtitle: r.subtitle,
    content: r.content,
    duration: r.duration,
    price: r.price,
    rating: r.rating,
    calories: r.calories,
    ingredients: r.ingredients.map((ing: any) => ({
      id: ing.id,
      label: ing.label,
      quantity: ing.quantity,
      recipeId: ing.recipeId,
    })),
    tags: r.tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
    })),
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export default async function HomePage() {
  const recipesFromDb = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      tags: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  const recipes: Recipe[] = recipesFromDb.map(mapRecipeFromDb);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl p-6 space-y-6">
        <RecipesExplorer initialRecipes={recipes} />
      </div>
    </div>
  );
}
