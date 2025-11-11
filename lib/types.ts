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

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  content: string;
  duration: number | null;
  price: number | null;
  rating: number | null;
  ingredients: Ingredient[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
};
