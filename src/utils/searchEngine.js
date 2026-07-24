export function searchAll(
  query,
  cocktails,
  ingredients,
  collections
) {
  const text = query.trim().toLowerCase();

  if (!text) return null;

  // Cocktail
  const cocktail = cocktails.find(
    (item) =>
      item.name.toLowerCase() === text
  );

  if (cocktail) {
    return {
      type: "cocktail",
      data: cocktail,
    };
  }

  // Ingredient
  const ingredient = ingredients.find(
    (item) =>
      item.name.toLowerCase() === text
  );

  if (ingredient) {
    return {
      type: "ingredient",
      data: ingredient,
    };
  }

  // Collection
  const collection = collections.find(
    (item) =>
      item.name.toLowerCase() === text
  );

  if (collection) {
    return {
      type: "collection",
      data: collection,
    };
  }

  return {
    type: "none",
  };
}