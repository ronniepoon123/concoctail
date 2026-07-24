export function getShoppingList() {

  return JSON.parse(
    localStorage.getItem("shoppingList") || "[]"
  );

}

export function saveShoppingList(list) {

  localStorage.setItem(
    "shoppingList",
    JSON.stringify(list)
  );

}

export function addIngredientsToShoppingList(
  ingredients
) {

  const list = getShoppingList();

  ingredients.forEach((ingredient) => {

    if (!list.includes(ingredient)) {

      list.push(ingredient);

    }

  });

  saveShoppingList(list);

}