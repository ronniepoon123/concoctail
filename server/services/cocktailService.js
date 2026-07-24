import axios from "axios";

const API =
  "https://www.thecocktaildb.com/api/json/v1/1";

export async function fetchRandomCocktail() {
  const response = await axios.get(
    `${API}/random.php`
  );

  return response.data.drinks[0];
}

export async function fetchCocktailByName(name) {
  const response = await axios.get(
    `${API}/search.php?s=${name}`
  );

  return response.data.drinks?.[0] || null;
}

export async function fetchCocktailsBySearch(query) {
  const response = await axios.get(
    `${API}/search.php?s=${query}`
  );

  return response.data.drinks || [];
}

export async function fetchCocktailsByIngredient(
  ingredient
) {
  const response = await axios.get(
    `${API}/filter.php?i=${ingredient}`
  );

  return response.data.drinks || [];
}