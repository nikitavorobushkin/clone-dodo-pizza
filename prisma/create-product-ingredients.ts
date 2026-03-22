import { IngredientRole } from '@prisma/client';

export function createProductIngredients(
  ingredientIds: number[],
  role: IngredientRole,
) {
  return ingredientIds.map((id) => ({
    ingredient: {
      connect: { id },
    },
    role,
  }));
}
