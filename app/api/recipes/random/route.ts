export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.recipe.count();

    if (count === 0) {
      return Response.json({ error: "No recipes" }, { status: 404 });
    }

    const skip = Math.floor(Math.random() * count);

    const recipe = await prisma.recipe.findFirst({
      skip,
      orderBy: { createdAt: "asc" },
      select: { slug: true },
    });

    if (!recipe) {
      return Response.json({ error: "No recipes" }, { status: 404 });
    }

    return Response.json({ slug: recipe.slug });
  } catch (error) {
    console.error("GET /api/recipes/random error:", error);
    return Response.json(
      { error: "Failed to fetch random recipe" },
      { status: 500 }
    );
  }
}
