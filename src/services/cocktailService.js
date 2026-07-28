const API = 
import.meta.env.VITE_API_URL ||
"http://localhost:3001/api";

/* ===========================================
   RANDOM COCKTAIL
=========================================== */

export async function getRandomCocktail() {

  const response = await fetch(
    `${API}/random`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch random cocktail"
    );

  }

  return await response.json();

}

/* ===========================================
   COCKTAIL BY NAME
=========================================== */

export async function getCocktailByName(
  name
) {
  const cocktailName = decodeURIComponent(
    name
  ).replace(/-/g, " ");

  const response = await fetch(
    `${API}/cocktail/${encodeURIComponent(
      cocktailName
    )}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch cocktail: ${cocktailName}`
    );
  }

  return await response.json();
}

/* ===========================================
   COCKTAIL BY ID
=========================================== */

export async function getCocktailById(
  id
) {

  const response = await fetch(
    `${API}/cocktail/id/${id}`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch cocktail"
    );

  }

  return await response.json();

}

/* ===========================================
   INTELLIGENT SEARCH
=========================================== */

export async function searchCocktails(
  query
) {

  if (!query.trim()) {

    return {

      cocktails: [],
      spirits: [],
      ingredients: [],

    };

  }

  const response = await fetch(

    `${API}/search?q=${encodeURIComponent(
      query
    )}`

  );

  if (!response.ok) {

    throw new Error(
      "Search failed"
    );

  }

  return await response.json();

}

/* ===========================================
   INGREDIENT
=========================================== */

export async function getCocktailsByIngredient(
  ingredient
) {

  const response = await fetch(

    `${API}/ingredient/${encodeURIComponent(
      ingredient
    )}`

  );

  if (!response.ok) {

    throw new Error(
      "Ingredient search failed"
    );

  }

  return await response.json();

}

/* ===========================================
   SPIRIT OR ALCOHOL INGREDIENT
=========================================== */

export async function getCocktailsBySpirit(
  spirit
) {
  const response = await fetch(
    `${API}/base-spirit/${encodeURIComponent(
      spirit
    )}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch cocktails for ${spirit}`
    );
  }

  const data =
    await response.json();

  return Array.isArray(data)
    ? data
    : [];
}

/* ===========================================
   CATEGORY
=========================================== */

export async function getCocktailsByCategory(
  category
) {

  const response = await fetch(

    `${API}/category/${encodeURIComponent(
      category
    )}`

  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch category"
    );

  }

  return await response.json();

}

/* ===========================================
   CATEGORY LIST
=========================================== */

export async function getCategories() {

  const response = await fetch(
    `${API}/categories`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch categories"
    );

  }

  return await response.json();

}

/* ===========================================
   GLASSES
=========================================== */

export async function getGlasses() {

  const response = await fetch(
    `${API}/glasses`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch glasses"
    );

  }

  return await response.json();

}

/* ===========================================
   LATEST
=========================================== */

export async function getLatestCocktails() {

  const response = await fetch(
    `${API}/latest`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch latest cocktails"
    );

  }

  return await response.json();

}

/* ===========================================
   POPULAR
=========================================== */

export async function getPopularCocktails() {

  const response = await fetch(
    `${API}/popular`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch popular cocktails"
    );

  }

  return await response.json();

}