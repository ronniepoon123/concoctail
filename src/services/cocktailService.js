import axios from "axios";

const API =
  "https://www.thecocktaildb.com/api/json/v1/1";


export async function getRandomCocktail() {

  const response = await axios.get(
    `${API}/random.php`
  );

  return response.data.drinks[0];

}


export async function getCocktailBySlug(slug) {

  const response = await axios.get(
    `${API}/search.php?s=${slug}`
  );

  return response.data.drinks?.[0] || null;

}


export async function searchCocktails(query) {

  const response = await axios.get(
    `${API}/search.php?s=${query}`
  );

  return response.data.drinks || [];

}


export async function getCocktailsBySpirit(spirit) {

  const response = await axios.get(
    `${API}/filter.php?i=${spirit}`
  );

  return response.data.drinks || [];

}