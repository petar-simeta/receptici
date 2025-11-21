export const revalidate = 0;
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Recipe } from "@/lib/types";
import { RecipeDetailClient } from "./recipe-detail-client";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { slug } = await params;

  // ako slug ne postoji ili nije string, odmah 404
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const recipeFromDb = await prisma.recipe.findUnique({
    where: { slug },
    include: {
      ingredients: true,
      tags: true,
    },
  });

  if (!recipeFromDb) {
    notFound();
  }

  const recipe: Recipe = {
    ...recipeFromDb,
    createdAt: recipeFromDb.createdAt.toISOString(),
    updatedAt: recipeFromDb.updatedAt.toISOString(),
  };

  return <RecipeDetailClient recipe={recipe} />;
}
