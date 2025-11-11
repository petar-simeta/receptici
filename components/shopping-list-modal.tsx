"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import type { Ingredient } from "@/lib/types";

interface ShoppingListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ingredients: Ingredient[];
}

export function ShoppingListModal({
  open,
  onOpenChange,
  ingredients,
}: ShoppingListModalProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const copyMissingIngredients = async () => {
    const missingIngredients = ingredients
      .filter((_, index) => !checkedItems.has(index))
      .map((ing) => `${ing.label} - ${ing.quantity}`)
      .join("\n");

    try {
      await navigator.clipboard.writeText(missingIngredients);
      toast({
        title: "Copied to clipboard!",
        description: "Missing ingredients have been copied.",
      });
      onOpenChange(false);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Shopping List</DialogTitle>
          <DialogDescription>
            Check what you already have at home
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-3">
              <Checkbox
                id={`ingredient-${index}`}
                checked={checkedItems.has(index)}
                onCheckedChange={() => toggleItem(index)}
              />
              <label
                htmlFor={`ingredient-${index}`}
                className="flex-1 cursor-pointer text-sm"
              >
                <span className={checkedItems.has(index) ? "line-through" : ""}>
                  {ingredient.label} - {ingredient.quantity}
                </span>
              </label>
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={copyMissingIngredients}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Check size={16} className="mr-2" />
            Copy missing ingredients
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
