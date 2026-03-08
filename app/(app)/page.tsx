import { getRecipes } from "@/lib/queries";
import { RecipesExplorer } from "@/components/recipes-explorer";

export default async function HomePage() {
  const recipes = await getRecipes();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl p-6 space-y-6">
        <RecipesExplorer initialRecipes={recipes} />
      </div>
    </div>
  );
}
