import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(tags);
  } catch (err) {
    console.error("GET /api/tags error:", err);
    return Response.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}
