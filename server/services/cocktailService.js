import axios from "axios";

import {
  isAlcoholicDrink,
} from "../utils/isAlcoholicDrink.js";

import {
  searchSpirits,
  isSpirit,
  getSearchTerms,
} from "./spiritLibrary.js";

const API =
  "https://www.thecocktaildb.com/api/json/v1/1";

function isExcludedIngredient(value = "") {
  const ingredient =
    normalise(value);

  const excludedIngredients = [
    "chocolate",
    "chocolate ice-cream",
    "chocolate syrup",
    "hot chocolate",
    "cocoa",
    "cacao",
  ];

  return excludedIngredients.some(
    (excluded) =>
      ingredient === excluded ||
      ingredient.includes(excluded)
  );
}

/* ===========================================
   NORMALISE
=========================================== */

function normalise(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/* ===========================================
   INGREDIENT LIST CACHE
=========================================== */

let ingredientListPromise = null;

async function fetchIngredientList() {
  if (!ingredientListPromise) {
    ingredientListPromise = axios
      .get(`${API}/list.php?i=list`)
      .then(({ data }) => {
        if (!Array.isArray(data.drinks)) {
          return [];
        }

        return data.drinks
          .map((item) =>
            item.strIngredient1?.trim()
          )
          .filter(Boolean);
      })
      .catch((error) => {
        /*
          Clear the rejected promise so a later
          request can try again.
        */

        ingredientListPromise = null;

        throw error;
      });
  }

  return ingredientListPromise;
}

/* ===========================================
   COMPLETE COCKTAIL CATALOGUE CACHE
=========================================== */

const CATALOGUE_LETTERS =
  "abcdefghijklmnopqrstuvwxyz".split("");

const CATALOGUE_BATCH_SIZE = 5;

let cocktailCataloguePromise = null;

/* ===========================================
   EXTRACT INGREDIENTS FROM COCKTAIL
=========================================== */

function getCocktailIngredients(drink) {
  const ingredients = [];

  for (
    let index = 1;
    index <= 15;
    index += 1
  ) {
    const ingredient =
      drink[`strIngredient${index}`];

    if (!ingredient) {
      continue;
    }

    ingredients.push(
      normalise(ingredient)
    );
  }

  return ingredients;
}

/* ===========================================
   MATCH INGREDIENT TO SEARCH TERM
=========================================== */

function ingredientMatchesTerm(
  ingredient,
  searchTerm
) {
  if (
    !ingredient ||
    !searchTerm
  ) {
    return false;
  }

  /*
    Exact match:

    Gin -> Gin
    Cointreau -> Cointreau
  */

  if (ingredient === searchTerm) {
    return true;
  }

  /*
    Category match:

    Rum -> Dark rum
    Rum -> Light rum
    Gin -> Sloe gin
    Whiskey -> Irish whiskey

    Spaces are checked so "rum" does not match
    an unrelated word containing those letters.
  */

  return (
    ingredient.startsWith(
      `${searchTerm} `
    ) ||
    ingredient.endsWith(
      ` ${searchTerm}`
    ) ||
    ingredient.includes(
      ` ${searchTerm} `
    )
  );
}

/* ===========================================
   GET CACHED COCKTAIL CATALOGUE
=========================================== */

async function fetchCocktailCatalogue() {
  if (!cocktailCataloguePromise) {
    cocktailCataloguePromise =
      buildCocktailCatalogue()
        .catch((error) => {
          /*
            Clear a failed cache so the next
            request may try rebuilding it.
          */

          cocktailCataloguePromise = null;

          throw error;
        });
  }

  return cocktailCataloguePromise;
}

/* ===========================================
   BUILD COMPLETE COCKTAIL CATALOGUE
=========================================== */

async function buildCocktailCatalogue() {
  const uniqueCocktails =
    new Map();

  /*
    TheCocktailDB's ingredient-filter endpoint
    may return limited records.

    Load cocktails by first letter instead, then
    filter their ingredients locally.
  */

  for (
    let start = 0;
    start < CATALOGUE_LETTERS.length;
    start += CATALOGUE_BATCH_SIZE
  ) {
    const batch =
      CATALOGUE_LETTERS.slice(
        start,
        start + CATALOGUE_BATCH_SIZE
      );

    const responses =
      await Promise.allSettled(
        batch.map((letter) =>
          axios.get(
            `${API}/search.php?f=${letter}`
          )
        )
      );

    for (const response of responses) {
      if (
        response.status !== "fulfilled"
      ) {
        console.error(
          "Catalogue request failed:",
          response.reason?.message
        );

        continue;
      }

      const drinks =
        response.value.data?.drinks;

      if (!Array.isArray(drinks)) {
        continue;
      }

      for (const drink of drinks) {
        if (
          !drink?.idDrink ||
          !isAlcoholicDrink(drink)
        ) {
          continue;
        }

        uniqueCocktails.set(
          drink.idDrink,
          drink
        );
      }
    }
  }

  const catalogue = [
    ...uniqueCocktails.values(),
  ].sort((first, second) =>
    String(first.strDrink || "")
      .localeCompare(
        String(second.strDrink || "")
      )
  );

  if (catalogue.length === 0) {
    throw new Error(
      "Cocktail catalogue returned no records."
    );
  }

  console.log(
    "Cocktail catalogue loaded:",
    catalogue.length
  );

  return catalogue;
}

/* ===========================================
   RANDOM
=========================================== */

export async function fetchRandomCocktail() {
  const maxAttempts = 15;

  for (
    let attempt = 0;
    attempt < maxAttempts;
    attempt += 1
  ) {
    const { data } = await axios.get(
      `${API}/random.php`
    );

    const drink =
      data.drinks?.[0] ?? null;

    if (isAlcoholicDrink(drink)) {
      return drink;
    }
  }

  throw new Error(
    "Unable to find an alcoholic cocktail."
  );
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

  const drink =
    data.drinks?.[0] ?? null;

  return isAlcoholicDrink(drink)
    ? drink
    : null;
}

/* ===========================================
   COCKTAIL BY ID
=========================================== */

export async function fetchCocktailById(
  id
) {
  const { data } = await axios.get(
    `${API}/lookup.php?i=${encodeURIComponent(
      id
    )}`
  );

  const drink =
    data.drinks?.[0] ?? null;

  return isAlcoholicDrink(drink)
    ? drink
    : null;
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
    ? data.drinks.filter(
        isAlcoholicDrink
      )
    : [];
}

/* ===========================================
   SEARCH BY INGREDIENT
=========================================== */

export async function fetchCocktailsByIngredient(
  ingredient
) {
  const catalogue =
    await fetchCocktailCatalogue();

  const searchTerms = [
    ...new Set(
      getSearchTerms(ingredient)
        .filter(Boolean)
        .map((term) =>
          normalise(term)
        )
    ),
  ];

  return catalogue.filter((cocktail) => {
    const ingredients =
      getCocktailIngredients(
        cocktail
      );

    return ingredients.some(
      (cocktailIngredient) =>
        searchTerms.some(
          (searchTerm) =>
            ingredientMatchesTerm(
              cocktailIngredient,
              searchTerm
            )
        )
    );
  });
}

/* ===========================================
   BASE SPIRIT OR MODIFIER
=========================================== */

export async function fetchCocktailsBySpirit(
  spirit
) {
  /*
    Keep the original spelling for API requests.

    Examples:

    Gin
    Irish Whiskey
    Cointreau
  */

  const searchTerms = [
    ...new Set(
      getSearchTerms(spirit)
        .filter(Boolean)
        .map((term) =>
          String(term).trim()
        )
    ),
  ];

  /*
    Use normalised versions for local matching.
  */

  const normalisedSearchTerms =
    searchTerms.map((term) =>
      normalise(term)
    );

  console.log("Spirit:", spirit);

  console.log(
    "Search terms:",
    searchTerms
  );

  /*
    Keep direct ingredient searches as a
    fallback. These may catch drinks beginning
    with numbers that are not loaded through
    the A-Z catalogue.
  */

  const directResultsPromise =
    Promise.allSettled(
      searchTerms.map((term) =>
        fetchCocktailsByIngredient(
          term
        )
      )
    );

  const [
    directResultsOutcome,
    catalogueOutcome,
  ] = await Promise.allSettled([
    directResultsPromise,
    fetchCocktailCatalogue(),
  ]);

  const directResults =
    directResultsOutcome.status ===
    "fulfilled"
      ? directResultsOutcome.value
      : [];

  const catalogue =
    catalogueOutcome.status ===
    "fulfilled"
      ? catalogueOutcome.value
      : [];

  if (
    catalogueOutcome.status ===
    "rejected"
  ) {
    console.error(
      "Cocktail catalogue failed:",
      catalogueOutcome.reason?.message
    );
  }

  const uniqueCocktails =
    new Map();

  /* -----------------------------------------
     FILTER FULL CATALOGUE
  ----------------------------------------- */

  for (const cocktail of catalogue) {
    if (!isAlcoholicDrink(cocktail)) {
      continue;
    }

    const ingredients =
      getCocktailIngredients(
        cocktail
      );

    const matched =
      ingredients.some(
        (ingredient) =>
          normalisedSearchTerms.some(
            (searchTerm) =>
              ingredientMatchesTerm(
                ingredient,
                searchTerm
              )
          )
      );

    if (!matched) {
      continue;
    }

    uniqueCocktails.set(
      cocktail.idDrink,
      cocktail
    );
  }

  /* -----------------------------------------
     ADD DIRECT API RESULTS

     Do not overwrite complete catalogue records
     with abbreviated filter.php records.
  ----------------------------------------- */

  for (const result of directResults) {
    if (
      result.status !== "fulfilled"
    ) {
      console.error(
        "Direct ingredient search failed:",
        result.reason?.message
      );

      continue;
    }

    for (const cocktail of result.value) {
      if (
        !cocktail?.idDrink ||
        !isAlcoholicDrink(cocktail)
      ) {
        continue;
      }

      if (
        !uniqueCocktails.has(
          cocktail.idDrink
        )
      ) {
        uniqueCocktails.set(
          cocktail.idDrink,
          cocktail
        );
      }
    }
  }

  console.log(
    "Matched cocktails:",
    uniqueCocktails.size
  );

  return [
    ...uniqueCocktails.values(),
  ];
}

/* ===========================================
   INTELLIGENT SEARCH
=========================================== */

export async function fetchGlobalSearch(
  query
) {
  const search =
    String(query ?? "").trim();

  if (!search) {
    return {
      cocktails: [],
      spirits: [],
      ingredients: [],
    };
  }

  const normalisedSearch =
    normalise(search);

  /*
    Cocktail-name search and ingredient-list
    loading can happen simultaneously.
  */

  const [
    cocktailsResult,
    ingredientListResult,
  ] = await Promise.allSettled([
    fetchCocktailsBySearch(search),
    fetchIngredientList(),
  ]);

  const cocktails =
    cocktailsResult.status ===
    "fulfilled"
      ? cocktailsResult.value
      : [];

  const ingredientList =
    ingredientListResult.status ===
    "fulfilled"
      ? ingredientListResult.value
      : [];

  if (
    cocktailsResult.status ===
    "rejected"
  ) {
    console.error(
      "Cocktail search failed:",
      cocktailsResult.reason?.message
    );
  }

  if (
    ingredientListResult.status ===
    "rejected"
  ) {
    console.error(
      "Ingredient-list search failed:",
      ingredientListResult.reason
        ?.message
    );
  }

  /* -----------------------------------------
     SPIRITS, LIQUEURS AND MODIFIERS
  ----------------------------------------- */

  const spirits =
    searchSpirits(search);

  /* -----------------------------------------
     ORDINARY INGREDIENT RESULTS

     These are allowed to be non-alcoholic
     because they can still be used in an
     alcoholic cocktail.
  ----------------------------------------- */

  const seenIngredients =
    new Set();

  const ingredients =
  ingredientList
    .filter((ingredient) =>
      normalise(
        ingredient
      ).includes(
        normalisedSearch
      )
    )
    .filter(
      (ingredient) =>
        !isExcludedIngredient(
          ingredient
        )
    )
    .filter(
      (ingredient) =>
        !isSpirit(ingredient)
    )
      .filter((ingredient) => {
        const key =
          normalise(ingredient);

        if (
          seenIngredients.has(key)
        ) {
          return false;
        }

        seenIngredients.add(key);

        return true;
      })
      .map((name) => ({
        name,
      }));

  return {
    cocktails,
    spirits,
    ingredients,
  };
}

/* ===========================================
   CATEGORY
=========================================== */

export async function fetchCocktailsByCategory(
  category
) {
  const catalogue =
    await fetchCocktailCatalogue();

  const normalisedCategory =
    normalise(category);

  return catalogue.filter(
    (drink) =>
      normalise(
        drink.strCategory
      ) === normalisedCategory
  );
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
    ? data.drinks.filter(
        isAlcoholicDrink
      )
    : [];
}

/* ===========================================
   POPULAR
=========================================== */

export async function fetchPopularCocktails() {
  return fetchLatestCocktails();
}