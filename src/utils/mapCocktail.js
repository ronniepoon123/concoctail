export default function mapCocktail(drink) {
  if (!drink) return null;

  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];

    if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  return {
    id: drink.idDrink,

    name: drink.strDrink,

    tagline: drink.strCategory,

    category: drink.strCategory,

    spirit: drink.strAlcoholic,

    strength: "",

    difficulty: "",

    glass: drink.strGlass,

    garnish: "",

    image: drink.strDrinkThumb,

    ingredients,

    instructions: drink.strInstructions
      ? drink.strInstructions
          .split(". ")
          .filter(Boolean)
      : [],
  };
}