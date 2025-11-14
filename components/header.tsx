"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Dices, Hamburger } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const router = useRouter();

  const handleRandomRecipe = async () => {
    try {
      const res = await fetch("/api/recipes/random", { cache: "no-store" });
      if (!res.ok) {
        console.error("Failed to fetch random recipe", await res.text());
        alert("Failed to find a random recipe. Please try again.");
        return;
      }

      const data = await res.json();
      if (!data?.slug) {
        alert("No recipes found. Please add a recipe first.");
        return;
      }

      router.push(`/recipe/${data.slug}`);
    } catch (error) {
      console.error("Error fetching random recipe", error);
      alert("Unexpected error while loading a random recipe.");
    }
  };

  return (
    <header className="border-b border-teal-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <Hamburger size={24} />
            <span>Receptići</span>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRandomRecipe}
              className="hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 bg-transparent"
            >
              <Dices size={18} className="md:mr-2" />
              <span className="hidden md:inline">Random receptić</span>
            </Button>
            <Button
              onClick={() => router.push("/recipe/new")}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Plus size={18} className="md:mr-2" />
              <span className="hidden md:inline">New receptić</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
