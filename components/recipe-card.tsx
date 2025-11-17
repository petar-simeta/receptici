import Link from "next/link";
import { Clock, Euro, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TagBadge } from "./tag-badge";
import { RatingStars } from "./rating-stars";
import type { Recipe } from "@/lib/types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">{recipe.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{recipe.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag.name} />
            ))}
          </div>
          <div className="grid grid-cols-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-teal-600" />
              <span>{recipe.duration} min</span>
            </div>

            <div className="flex items-center justify-center gap-1.5">
              <Euro size={16} className="text-teal-600" />
              <span>
                {recipe.price != null ? recipe.price.toFixed(2) : "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-end gap-1.5">
              <Flame size={16} className="text-teal-600" />
              <span>
                {recipe.calories != null
                  ? `${recipe.calories.toFixed(0)} kcal`
                  : "N/A"}
              </span>
            </div>
          </div>
          <RatingStars rating={recipe.rating ?? 0} />
        </CardContent>
      </Card>
    </Link>
  );
}
