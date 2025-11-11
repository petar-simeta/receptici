import { prisma } from "@/lib/prisma";
import type { Recipe } from "@/lib/types";
import { RecipesExplorer } from "@/components/recipes-explorer";

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

  const recipes: Recipe[] = recipesFromDb.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl p-6 space-y-6">
        <RecipesExplorer initialRecipes={recipes} />
      </div>
    </div>
  );
}
