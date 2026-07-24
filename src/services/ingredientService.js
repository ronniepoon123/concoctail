import ingredients from "../data/ingredients";

export async function getIngredients() {
  return ingredients;
}

export async function getIngredientBySlug(slug) {
  return ingredients.find(
    (ingredient) =>
      ingredient.id === slug
  );
}