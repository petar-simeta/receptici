export const dynamic = "force-dynamic";

import { getRecipeSlugs } from "@/lib/queries";

export async function GET() {
  try {
    const slugs = await getRecipeSlugs();

    if (slugs.length === 0) {
      return Response.json({ error: "No recipes" }, { status: 404 });
    }

    const randomSlug = slugs[Math.floor(Math.random() * slugs.length)];

    return Response.json({ slug: randomSlug });
  } catch (error) {
    console.error("GET /api/recipes/random error:", error);
    return Response.json(
      { error: "Failed to fetch random recipe" },
      { status: 500 }
    );
  }
}
