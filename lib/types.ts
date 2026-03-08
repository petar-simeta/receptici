// lib/types.ts

export type Ingredient = {
  id: string;
  label: string;
  quantity: string | null;
  recipeId: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type RecipeRouteParams = {
  slug: string;
};

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  content: string;
  duration: number | null;
  price: number | null;
  rating: number | null;
  calories: number | null;
  ingredients: Ingredient[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
};

export type RecipeFormIngredient = {
  label: string;
  quantity: string;
};

export type RecipeFormValues = {
  title: string;
  subtitle: string;
  tags: string[];
  duration: number;
  pricePerPortion: number;
  rating: number;
  calories: number;
  ingredients: RecipeFormIngredient[];
  content: string;
};
