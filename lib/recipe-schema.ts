// lib/recipe-schema.ts
import { z } from "zod";

export const ingredientInputSchema = z.object({
  label: z.string().min(1, "Ingredient label is required"),
  quantity: z.string().optional().nullable(),
});

export const recipeInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional().nullable(),
  content: z.string().min(1, "Content is required"), // markdown
  duration: z.number().int().min(0).max(600).optional().nullable(), // u minutama
  price: z.number().min(0).max(100).optional().nullable(), // €/porcija
  rating: z.number().min(0).max(5).optional().nullable(), // 0–5, float
  tags: z.array(z.string().min(1)).optional().default([]),
  ingredients: z.array(ingredientInputSchema).optional().default([]),
});

export type RecipeInput = z.infer<typeof recipeInputSchema>;
