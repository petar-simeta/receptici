// app/api/recipes/[slug]/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getRecipeBySlug } from "@/lib/queries";
import { recipeInputSchema } from "@/lib/recipe-schema";
import { generateSlug } from "@/lib/slug";
import type { RecipeRouteParams } from "@/lib/types";

type RecipeRouteContext = {
  params: Promise<RecipeRouteParams>;
};

async function getSlugFromContext(context: RecipeRouteContext) {
  const { slug } = await context.params;
  return slug;
}

// GET /api/recipes/:slug
export async function GET(_req: Request, context: RecipeRouteContext) {
  const slug = await getSlugFromContext(context);

  if (!slug || typeof slug !== "string") {
    return Response.json({ error: "Missing or invalid slug" }, { status: 400 });
  }

  try {
    const recipe = await getRecipeBySlug(slug);

    if (!recipe) {
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    }

    return Response.json(recipe);
  } catch (err) {
    console.error("GET /api/recipes/[slug] error:", err);
    const detail = err instanceof Error ? err.message : String(err);

    return Response.json(
      { error: "Failed to fetch recipe", detail },
      { status: 500 }
    );
  }
}

// PUT /api/recipes/:slug
export async function PUT(req: Request, context: RecipeRouteContext) {
  const slug = await getSlugFromContext(context);

  if (!slug || typeof slug !== "string") {
    return Response.json({ error: "Missing or invalid slug" }, { status: 400 });
  }

  try {
    const json = await req.json();
    const parsed = recipeInputSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json(
        { error: "Validation error", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const existing = await prisma.recipe.findUnique({ where: { slug } });
    if (!existing) {
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    }

    const newSlug = generateSlug(data.title);

    const updated = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
      // upsert tagova
        const tags = await Promise.all(
          (data.tags ?? []).map((name) =>
            tx.tag.upsert({
              where: { name },
              update: {},
              create: { name },
            })
          )
        );

        // pobriši stare sastojke
        await tx.ingredient.deleteMany({
          where: { recipeId: existing.id },
        });

        // update recepta
        const recipe = await tx.recipe.update({
          where: { id: existing.id },
          data: {
            title: data.title,
            slug: newSlug,
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
            tags: {
              set: tags.map((tag) => ({ id: tag.id })),
            },
          },
          include: {
            ingredients: true,
            tags: true,
          },
        });

        return recipe;
      }
    );

    revalidateTag("recipes", "max");
    revalidatePath("/");
    revalidatePath(`/recipe/${slug}`);
    revalidatePath(`/recipe/${updated.slug}`);

    return Response.json(updated);
  } catch (err) {
    console.error("PUT /api/recipes/[slug] error:", err);
    return Response.json({ error: "Failed to update recipe" }, { status: 500 });
  }
}

// DELETE /api/recipes/:slug
export async function DELETE(_req: Request, context: RecipeRouteContext) {
  const slug = await getSlugFromContext(context);

  if (!slug || typeof slug !== "string") {
    return Response.json({ error: "Missing or invalid slug" }, { status: 400 });
  }

  try {
    const existing = await prisma.recipe.findUnique({ where: { slug } });
    if (!existing) {
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    }

    await prisma.recipe.delete({
      where: { id: existing.id },
    });

    revalidateTag("recipes", "max");
    revalidatePath("/");
    revalidatePath(`/recipe/${slug}`);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/recipes/[slug] error:", err);
    return Response.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}
