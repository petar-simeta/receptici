import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const scaledQuantity = z.object({
  value: z.number().positive(),
  unit: z.string().default(""),
  oneUnit: z.string().min(1).optional(),
  fewUnit: z.string().min(1).optional(),
  rounding: z.enum(["smart", "whole", "half", "tenth"]).default("smart"),
});

const timeRange = z.object({
  min: z.number().int().positive(),
  max: z.number().int().positive(),
}).refine(({ min, max }) => max >= min, {
  message: "Najdulje vrijeme mora biti veće ili jednako najkraćem.",
});

const timeValue = z.union([z.number().int().positive(), timeRange]);

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/recipes" }),
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    image: z.string().min(1),
    imageAlt: z.string(),
    category: z.enum(["meal", "dessert"]),
    prepTime: timeValue,
    cookTime: timeValue,
    restTime: timeValue.optional(),
    chillTime: timeValue.optional(),
    totalTime: timeValue,
    price: z.number().nonnegative(),
    calories: z.number().nonnegative(),
    yield: z.object({
      amount: z.number().positive(),
      unit: z.string().min(1),
      oneUnit: z.string().min(1).optional(),
      fewUnit: z.string().min(1).optional(),
    }),
    tags: z.array(z.string().min(1)).default([]),
    ingredients: z.array(
      z.object({
        name: z.string().min(1),
        quantity: z.string().default(""),
        scaled: scaledQuantity.optional(),
      }),
    ),
    scaling: z
      .object({
        label: z.string().default("Količina mesa"),
        baseGrams: z.number().int().positive(),
        defaultGrams: z.number().int().positive().optional(),
        options: z.array(z.number().int().positive()).min(2),
      })
      .optional(),
  }),
});

export const collections = { recipes };
