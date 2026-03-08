import { notFound } from "next/navigation";
import { getRecipeBySlug, getRecipeSlugs } from "@/lib/queries";
import { RecipeDetailClient } from "./recipe-detail-client";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getRecipeSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { slug } = await params;

  // ako slug ne postoji ili nije string, odmah 404
  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetailClient recipe={recipe} />;
}
