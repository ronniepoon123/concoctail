import {
  fetchRandomCocktail,
  fetchCocktailByName,
  fetchCocktailById,
  fetchGlobalSearch,
  fetchCocktailsByIngredient,
  fetchCocktailsBySpirit,
  fetchCocktailsByCategory,
  fetchCategories,
  fetchGlasses,
  fetchLatestCocktails,
  fetchPopularCocktails,
} from "../services/cocktailService.js";

import mapCocktail from "../utils/mapCocktail.js";

/* ===========================================
   RANDOM
=========================================== */

export async function getRandomCocktail(
  req,
  res
) {

  try {

    const cocktail =
      await fetchRandomCocktail();

    res.json(cocktail);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch random cocktail",
    });

  }

}

/* ===========================================
   COCKTAIL
=========================================== */

export async function getCocktailByName(
  req,
  res
) {

  try {

    const drink =
      await fetchCocktailByName(
        req.params.name
      );

    if (!drink) {

      return res.status(404).json({
        error: "Cocktail not found",
      });

    }

    res.json(
      mapCocktail(drink)
    );

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch cocktail",
    });

  }

}

/* ===========================================
   COCKTAIL BY ID
=========================================== */

export async function getCocktailById(
  req,
  res
) {

  try {

    const drink =
      await fetchCocktailById(
        req.params.id
      );

    if (!drink) {

      return res.status(404).json({
        message: "Cocktail not found",
      });

    }

    res.json(
      mapCocktail(drink)
    );

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

}

/* ===========================================
   INTELLIGENT SEARCH
=========================================== */

export async function searchCocktails(
  req,
  res
) {

  try {

    const results =
      await fetchGlobalSearch(
        req.query.q || ""
      );

    res.json(results);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Search failed",
    });

  }

}

/* ===========================================
   INGREDIENT
=========================================== */

export async function getCocktailsByIngredient(
  req,
  res
) {

  try {

    const cocktails =
      await fetchCocktailsByIngredient(
        req.params.ingredient
      );

    res.json(cocktails);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Ingredient search failed",
    });

  }

}

/* ===========================================
   CATEGORY
=========================================== */

export async function getCocktailsByCategory(
  req,
  res
) {

  try {

    const cocktails =
      await fetchCocktailsByCategory(
        req.params.category
      );

    res.json(cocktails);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Category search failed",
    });

  }

}

/* ===========================================
   CATEGORY LIST
=========================================== */

export async function getCategories(
  req,
  res
) {

  try {

    const categories =
      await fetchCategories();

    res.json(categories);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch categories",
    });

  }

}

/* ===========================================
   GLASSES
=========================================== */

export async function getGlasses(
  req,
  res
) {

  try {

    const glasses =
      await fetchGlasses();

    res.json(glasses);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch glasses",
    });

  }

}

/* ===========================================
   LATEST
=========================================== */

export async function getLatestCocktails(
  req,
  res
) {

  try {

    const cocktails =
      await fetchLatestCocktails();

    res.json(cocktails);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch latest cocktails",
    });

  }

}

/* ===========================================
   SPIRIT
=========================================== */

export async function getCocktailsBySpirit(
  req,
  res
) {

  try {

    const cocktails =
      await fetchCocktailsBySpirit(
        req.params.spirit
      );

    res.json(cocktails);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch cocktails",
    });

  }

}

/* ===========================================
   POPULAR
=========================================== */

export async function getPopularCocktails(
  req,
  res
) {

  try {

    const cocktails =
      await fetchPopularCocktails();

    res.json(cocktails);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch popular cocktails",
    });

  }

}

/* ===========================================
   AUTOCOMPLETE
=========================================== */

export async function autocomplete(req, res) {

  try {

    const query =
      req.query.q ?? "";

    const results =
      await fetchGlobalSearch(query);

    res.json(results);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      error: "Autocomplete failed"

    });

  }

}