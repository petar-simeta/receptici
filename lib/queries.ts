import { unstable_cache } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Recipe, Tag } from "@/lib/types";

const recipeInclude = {
  ingredients: true,
  tags: true,
} satisfies Prisma.RecipeInclude;

type RecipeWithRelations = Prisma.RecipeGetPayload<{
  include: typeof recipeInclude;
}>;

function mapRecipeFromDb(recipe: RecipeWithRelations): Recipe {
  return {
    id: recipe.id,
    slug: recipe.slug,
    title: recipe.title,
    subtitle: recipe.subtitle,
    content: recipe.content,
    duration: recipe.duration,
    price: recipe.price,
    rating: recipe.rating,
    calories: recipe.calories,
    ingredients: recipe.ingredients.map((ingredient) => ({
      id: ingredient.id,
      label: ingredient.label,
      quantity: ingredient.quantity,
      recipeId: ingredient.recipeId,
    })),
    tags: recipe.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
    createdAt: recipe.createdAt.toISOString(),
    updatedAt: recipe.updatedAt.toISOString(),
  };
}

export const getRecipes = unstable_cache(
  async (): Promise<Recipe[]> => {
    const recipes = await prisma.recipe.findMany({
      include: recipeInclude,
      orderBy: {
        title: "asc",
      },
    });

    return recipes.map(mapRecipeFromDb);
  },
  ["recipes-list"],
  {
    tags: ["recipes"],
  }
);

export const getRecipeBySlug = unstable_cache(
  async (slug: string): Promise<Recipe | null> => {
    const recipe = await prisma.recipe.findUnique({
      where: { slug },
      include: recipeInclude,
    });

    return recipe ? mapRecipeFromDb(recipe) : null;
  },
  ["recipe-by-slug"],
  {
    tags: ["recipes"],
  }
);

export const getRecipeSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        title: "asc",
      },
      select: {
        slug: true,
      },
    });

    return recipes.map((recipe) => recipe.slug);
  },
  ["recipe-slugs"],
  {
    tags: ["recipes"],
  }
);

export const getTags = unstable_cache(
  async (): Promise<Tag[]> => {
    return prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    });
  },
  ["tags"],
  {
    tags: ["recipes"],
  }
);
