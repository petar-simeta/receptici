// app/api/recipes/route.ts
import { prisma } from "@/lib/prisma";
import { recipeInputSchema } from "@/lib/recipe-schema";
import type { Prisma } from "@prisma/client";
import { generateSlug } from "@/lib/slug";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = recipeInputSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json(
        {
          error: "Validation error",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const tagsData: Prisma.RecipeCreateInput["tags"] =
      data.tags && data.tags.length
        ? {
            connectOrCreate: data.tags.map((name) => ({
              where: { name },
              create: { name },
            })),
          }
        : undefined;

    const recipe = await prisma.recipe.create({
      data: {
        title: data.title,
        slug: generateSlug(data.title), // 👈 NOVO
        subtitle: data.subtitle ?? null,
        content: data.content,
        duration: data.duration ?? null,
        price: data.price ?? null,
        rating: data.rating ?? null,
        calories: data.calories ?? null,
        ingredients: {
          create: data.ingredients.map((ing) => ({
            label: ing.label,
            quantity: ing.quantity ?? null,
          })),
        },
        ...(tagsData ? { tags: tagsData } : {}),
      },
      include: {
        ingredients: true,
        tags: true,
      },
    });

    return Response.json(recipe, { status: 201 });
  } catch (err) {
    console.error("POST /api/recipes error:", err);
    return Response.json({ error: "Failed to create recipe" }, { status: 500 });
  }
}
