"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Euro, Edit, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TagBadge } from "@/components/tag-badge";
import { RatingStars } from "@/components/rating-stars";
import { ShoppingListModal } from "@/components/shopping-list-modal";
import ReactMarkdown from "react-markdown";
import type { Recipe } from "@/lib/types";

type RecipeDetailClientProps = {
  recipe: Recipe;
};

export function RecipeDetailClient({ recipe }: RecipeDetailClientProps) {
  const [shoppingListOpen, setShoppingListOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-4 mt-0">
          <div>
            <h1 className="text-4xl font-bold text-teal-700">{recipe.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {recipe.subtitle}
            </p>
          </div>
          <Link href={`/recipe/${recipe.slug}/edit`}>
            <Button variant="outline">
              <Edit size={16} className="mr-2" />
              Edit receptić
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
          {/* Left Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="sidebar-title mb-3 font-semibold bg-teal-50 pl-3 pr-5 py-1 rounded">
                    Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.id} className="text-sm">
                        <span className="font-medium">{ingredient.label}</span>
                        {ingredient.quantity && (
                          <span className="text-muted-foreground">
                            {" "}
                            - {ingredient.quantity}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setShoppingListOpen(true)}
                >
                  <ShoppingBasket size={16} className="mr-2" />
                  Shopping list
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="sidebar-title mb-2 font-semibold bg-teal-50 pl-3 pr-5 py-1 rounded">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {recipe.tags.map((tag) => (
                      <TagBadge key={tag.id} tag={tag.name} />
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="sidebar-title mb-3 font-semibold bg-teal-50 pl-3 pr-5 py-1 rounded">
                    Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-teal-600" />
                      <span>
                        {recipe.duration != null
                          ? `${recipe.duration} minutes`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Euro size={16} className="text-teal-600" />
                      <span>
                        {recipe.price != null
                          ? `${recipe.price
                              .toFixed(2)
                              .replace(".", ",")} EUR per portion`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={recipe.rating ?? 0} size={18} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card>
            <CardContent>
              <h2 className="cooking-title mb-4">Cooking instruction</h2>
              <div className="recipe-markdown">
                <ReactMarkdown>{recipe.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ShoppingListModal
        open={shoppingListOpen}
        onOpenChange={setShoppingListOpen}
        ingredients={recipe.ingredients}
      />

      <style jsx>{`
        :global(.recipe-markdown h1) {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #0f766e;
        }
        :global(.recipe-markdown h3) {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.75rem;
          color: #0f766e;
        }
        :global(.recipe-markdown h4) {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 0.875rem;
          margin-bottom: 0.625rem;
          color: #0f766e;
        }
        :global(.recipe-markdown p) {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        :global(.recipe-markdown ul),
        :global(.recipe-markdown ol) {
          margin-left: 2rem;
          margin-bottom: 1rem;
        }
        :global(.recipe-markdown li) {
          margin-bottom: 0.375rem;
        }
        :global(.recipe-markdown ul) {
          list-style-type: disc;
        }
        :global(.recipe-markdown ol) {
          list-style-type: decimal;
        }

        :global(.recipe-markdown ol li::marker) {
          color: #0f766e;
          font-size: 0.75rem;
          font-weight: 600;
        }
        :global(.recipe-markdown strong) {
          font-weight: 600;
        }
        :global(.recipe-markdown em) {
          font-style: italic;
        }
        :global(.sidebar-title) {
          display: inline-block;
          color: #0f766e;
          font-size: 0.875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 4px;
        }
        :global(.cooking-title) {
          font-size: 1.25rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #0f766e;
        }
      `}</style>
    </div>
  );
}
