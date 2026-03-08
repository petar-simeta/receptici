import { getTags } from "@/lib/queries";

export async function GET() {
  try {
    const tags = await getTags();
    return Response.json(tags);
  } catch (err) {
    console.error("GET /api/tags error:", err);
    return Response.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}
