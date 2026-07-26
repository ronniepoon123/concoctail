import axios from "axios";

import {
  searchSpirits,
  isSpirit,
  getSearchTerms
} from "./spiritLibrary.js";

const API =
  "https://www.thecocktaildb.com/api/json/v1/1";

/* ===========================================
   RANDOM
=========================================== */

export async function fetchRandomCocktail() {

  const { data } = await axios.get(
    `${API}/random.php`
  );

  return data.drinks?.[0] ?? null;

}

/* ===========================================
   COCKTAIL BY NAME
=========================================== */

export async function fetchCocktailByName(
  name
) {

  const { data } = await axios.get(
    `${API}/search.php?s=${encodeURIComponent(
      name
    )}`
  );

  return data.drinks?.[0] ?? null;

}

/* ===========================================
   COCKTAIL BY ID
=========================================== */

export async function fetchCocktailById(
  id
) {

  const { data } = await axios.get(
    `${API}/lookup.php?i=${id}`
  );

  return data.drinks?.[0] ?? null;

}

/* ===========================================
   SEARCH BY COCKTAIL NAME
=========================================== */

export async function fetchCocktailsBySearch(
  query
) {

  const { data } = await axios.get(
    `${API}/search.php?s=${encodeURIComponent(
      query
    )}`
  );

  return Array.isArray(data.drinks)
    ? data.drinks
    : [];

}

/* ===========================================
   SEARCH BY INGREDIENT
=========================================== */

export async function fetchCocktailsByIngredient(
  ingredient
) {

  const { data } = await axios.get(
    `${API}/filter.php?i=${encodeURIComponent(
      ingredient
    )}`
  );

  return Array.isArray(data.drinks)
    ? data.drinks
    : [];

}

/* ===========================================
   BASE SPIRIT
=========================================== */

export async function fetchCocktailsBySpirit(
  spirit
) {

  const searchTerms =
    getSearchTerms(spirit);

  const results =
    await Promise.all(

      searchTerms.map(term =>
        fetchCocktailsByIngredient(term)
      )

    );

  const cocktails =
    results.flat();

  const unique =
    new Map();

  for (const cocktail of cocktails) {

    unique.set(
      cocktail.idDrink,
      cocktail
    );

  }

  return [...unique.values()];

}

/* ===========================================
   INTELLIGENT SEARCH
=========================================== */

export async function fetchGlobalSearch(
  query
) {

  const search = query.trim();

  if (!search) {

    return {
      cocktails: [],
      spirits: [],
      ingredients: [],
    };

  }

  /* ------------------------------------------
     Cocktail search
  ------------------------------------------ */

  const cocktails =
    await fetchCocktailsBySearch(
      search
    );

/* ------------------------------------------
   Ingredient list
------------------------------------------ */

const { data } = await axios.get(
  `${API}/list.php?i=list`
);

const ingredientList =
  Array.isArray(data.drinks)
    ? data.drinks
    : [];

const ingredients = ingredientList

  .map(i => i.strIngredient1)

  .filter(Boolean)

  .filter(name =>
    name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

/* ------------------------------------------
   Spirits from Wikidata
------------------------------------------ */

const spiritResults =
  searchSpirits(search);

const spiritNames =
  new Set(
    spiritResults.map(
      s => s.name
    )
  );

/* ------------------------------------------
   Ingredients
------------------------------------------ */

const otherIngredients =
  ingredients

    .filter(
      ingredient =>
        !isSpirit(ingredient)
    )

    .map(name => ({
      name
    }));

return {

  cocktails,

  spirits:

    [...spiritNames]

      .map(name => ({
        name
      })),

  ingredients:
    otherIngredients,

};

}

/* ===========================================
   CATEGORY
=========================================== */

export async function fetchCocktailsByCategory(
  category
) {

  const { data } = await axios.get(
    `${API}/filter.php?c=${encodeURIComponent(
      category
    )}`
  );

  return Array.isArray(data.drinks)
    ? data.drinks
    : [];

}

/* ===========================================
   CATEGORY LIST
=========================================== */

export async function fetchCategories() {

  const { data } = await axios.get(
    `${API}/list.php?c=list`
  );

  return Array.isArray(data.drinks)
    ? data.drinks
    : [];

}

/* ===========================================
   GLASSES
=========================================== */

export async function fetchGlasses() {

  const { data } = await axios.get(
    `${API}/list.php?g=list`
  );

  return Array.isArray(data.drinks)
    ? data.drinks
    : [];

}

/* ===========================================
   LATEST
=========================================== */

export async function fetchLatestCocktails() {

  const { data } = await axios.get(
    `${API}/latest.php`
  );

  return Array.isArray(data.drinks)
    ? data.drinks
    : [];

}

/* ===========================================
   POPULAR
=========================================== */

export async function fetchPopularCocktails() {

  return fetchLatestCocktails();

}