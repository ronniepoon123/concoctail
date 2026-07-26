export function mapCocktail(drink) {

  const ingredients = [];

  for (let i = 1; i <= 15; i++) {

    if (drink[`strIngredient${i}`]) {

      ingredients.push(

        drink[`strIngredient${i}`]

      );

    }

  }

  return {

    id: drink.idDrink,

    name: drink.strDrink,

    image: drink.strDrinkThumb,

    tagline: drink.strCategory,

    category: drink.strCategory,

    spirit: drink.strAlcoholic,

    glass: drink.strGlass,

    garnish: "",

    strength: "",

    difficulty: "",

    ingredients,

    instructions: drink.strInstructions

      ? drink.strInstructions

          .split(". ")

          .filter(Boolean)

      : [],

  };

}