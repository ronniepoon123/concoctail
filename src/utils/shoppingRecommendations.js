export default function buildShoppingRecommendations(
  bottles,
  cocktails
) {
  const owned = bottles
    .filter((bottle) => bottle.owned)
    .map((bottle) => bottle.name);

  const unlockMap = {};

  cocktails.forEach((cocktail) => {
    const missing = cocktail.ingredients.filter(
      (ingredient) => !owned.includes(ingredient)
    );

    if (missing.length === 1) {
      const ingredient = missing[0];

      if (!unlockMap[ingredient]) {
        unlockMap[ingredient] = [];
      }

      unlockMap[ingredient].push(cocktail.name);
    }
  });

  return Object.entries(unlockMap)
    .map(([ingredient, cocktails]) => ({
      ingredient,
      cocktails,
      score: cocktails.length,
    }))
    .sort((a, b) => b.score - a.score);
}