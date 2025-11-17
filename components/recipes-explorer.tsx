"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RecipeCard } from "@/components/recipe-card";
import type { Recipe } from "@/lib/types";

type RecipesExplorerProps = {
  initialRecipes: Recipe[];
};

export function RecipesExplorer({ initialRecipes }: RecipesExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [showFilters, setShowFilters] = useState(false);

  const { durationMax, priceMax, caloriesMax } = useMemo(() => {
    if (!initialRecipes.length) {
      return { durationMax: 60, priceMax: 5, caloriesMax: 800 };
    }

    let maxDur = 0;
    let maxPrice = 0;
    let maxCalories = 0;

    for (const r of initialRecipes) {
      if (r.duration != null && r.duration > maxDur) {
        maxDur = r.duration;
      }
      if (r.price != null && r.price > maxPrice) {
        maxPrice = r.price;
      }
      if (r.calories != null && r.calories > maxCalories) {
        maxCalories = r.calories;
      }
    }

    return {
      durationMax: Math.max(maxDur, 60),
      priceMax: Math.max(maxPrice, 5),
      caloriesMax: Math.max(maxCalories, 800),
    };
  }, [initialRecipes]);

  const [maxDuration, setMaxDuration] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [maxCalories, setMaxCalories] = useState<number | null>(null);

  const effectiveMaxDuration = maxDuration ?? durationMax;
  const effectiveMaxPrice = maxPrice ?? priceMax;
  const effectiveMaxCalories = maxCalories ?? caloriesMax;

  const allTags = useMemo(
    () =>
      Array.from(
        new Set(initialRecipes.flatMap((r) => r.tags.map((t) => t.name)))
      ).sort((a, b) => a.localeCompare(b)),
    [initialRecipes]
  );

  const filteredAndSortedRecipes = useMemo(() => {
    const filtered = initialRecipes.filter((recipe) => {
      const searchLower = search.toLowerCase().trim();

      const matchesSearch =
        searchLower.length === 0 ||
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some((ing) =>
          ing.label.toLowerCase().includes(searchLower)
        );

      const matchesTags =
        selectedTags.length === 0 ||
        recipe.tags.some((tag) => selectedTags.includes(tag.name));

      const matchesDuration =
        recipe.duration == null || recipe.duration <= effectiveMaxDuration;

      const matchesPrice =
        recipe.price == null || recipe.price <= effectiveMaxPrice;

      const matchesCalories =
        recipe.calories == null || recipe.calories <= effectiveMaxCalories;

      return (
        matchesSearch &&
        matchesTags &&
        matchesDuration &&
        matchesPrice &&
        matchesCalories
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "time-asc": {
          const ad = a.duration ?? Infinity;
          const bd = b.duration ?? Infinity;
          return ad - bd;
        }
        case "price-asc": {
          const ap = a.price ?? Infinity;
          const bp = b.price ?? Infinity;
          return ap - bp;
        }
        case "calories-asc": {
          const ac = a.calories ?? Infinity;
          const bc = b.calories ?? Infinity;
          return ac - bc;
        }
        case "rating-desc": {
          const ar = a.rating ?? 0;
          const br = b.rating ?? 0;
          return br - ar;
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    initialRecipes,
    search,
    selectedTags,
    effectiveMaxDuration,
    effectiveMaxPrice,
    effectiveMaxCalories,
    sortBy,
  ]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-lg border border-teal-200 bg-white p-4 shadow-sm">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or ingredient"
                className="pl-9 border-teal-200 focus-visible:ring-teal-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-teal-300 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
            >
              <SlidersHorizontal size={18} className="mr-2" />
              {showFilters ? "Hide" : "More"}
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="space-y-4 rounded-lg border border-teal-200 bg-linear-to-br from-teal-50 to-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label className="text-teal-900">Sort by</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-teal-300 focus:ring-teal-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating-desc">
                      Rating (best first)
                    </SelectItem>
                    <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                    <SelectItem value="time-asc">
                      Time (fastest first)
                    </SelectItem>
                    <SelectItem value="price-asc">
                      Price (cheapest first)
                    </SelectItem>
                    <SelectItem value="calories-asc">
                      Calories (lowest first)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-teal-900">
                  Max duration: {effectiveMaxDuration} min
                </Label>
                <Slider
                  value={[effectiveMaxDuration]}
                  onValueChange={(values) => setMaxDuration(values[0])}
                  min={5}
                  max={durationMax}
                  step={5}
                  className="pt-2 **:[[role=slider]]:bg-teal-600 **:[[role=slider]]:border-teal-600"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-teal-900">
                  Max price: €{effectiveMaxPrice.toFixed(1)}
                </Label>
                <Slider
                  value={[effectiveMaxPrice]}
                  onValueChange={(values) => setMaxPrice(values[0])}
                  min={1}
                  max={priceMax}
                  step={0.5}
                  className="pt-2 **:[[role=slider]]:bg-teal-600 **:[[role=slider]]:border-teal-600"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-teal-900">
                  Max calories: {Math.round(effectiveMaxCalories)} kcal
                </Label>
                <Slider
                  value={[effectiveMaxCalories]}
                  onValueChange={(values) => setMaxCalories(values[0])}
                  min={100}
                  max={caloriesMax}
                  step={50}
                  className="pt-2 **:[[role=slider]]:bg-teal-600 **:[[role=slider]]:border-teal-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-teal-900">Tags</Label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-white text-teal-700 border border-teal-300 hover:bg-teal-100"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 text-sm">
              <Button
                type="button"
                variant="ghost"
                className="text-teal-700 hover:bg-teal-50 hover:text-teal-900"
                onClick={() => {
                  setSearch("");
                  setSelectedTags([]);
                  setMaxDuration(null);
                  setMaxPrice(null);
                  setMaxCalories(null);
                  setSortBy("rating-desc");
                }}
              >
                Clear filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <div>
        <p className="mb-4 text-sm text-teal-700">
          Showing {filteredAndSortedRecipes.length} receptića
        </p>
        {filteredAndSortedRecipes.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-teal-200 bg-white p-12 text-center">
            <p className="text-teal-600">No recipes match your filters</p>
          </div>
        )}
      </div>
    </>
  );
}
