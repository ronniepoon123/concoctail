export function isAlcoholicDrink(drink) {
  if (!drink) {
    return false;
  }

  const classification =
    String(
      drink.strAlcoholic ||
      drink.alcoholic ||
      drink.alcoholType ||
      ""
    )
      .trim()
      .toLowerCase();

  if (classification !== "alcoholic") {
    return false;
  }

  const excludedIngredientTerms = [
    "cocoa",
    "cacao",
    "chocolate",
  ];

  for (
    let index = 1;
    index <= 15;
    index += 1
  ) {
    const ingredient =
      String(
        drink[`strIngredient${index}`] ||
        ""
      )
        .trim()
        .toLowerCase();

    const isExcluded =
      excludedIngredientTerms.some(
        (term) =>
          ingredient.includes(term)
      );

    if (isExcluded) {
      return false;
    }
  }

  return true;
}