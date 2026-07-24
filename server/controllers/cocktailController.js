import {
  fetchRandomCocktail,
  fetchCocktailByName,
  fetchCocktailsBySearch,
  fetchCocktailsByIngredient,
} from "../services/cocktailService.js";

export async function getRandomCocktail(req, res) {
  try {
    res.json(
      await fetchRandomCocktail()
    );
  } catch {
    res.status(500).json({
      message: "Unable to fetch cocktail.",
    });
  }
}

export async function getCocktailByName(req, res) {
  try {
    res.json(
      await fetchCocktailByName(
        req.params.name
      )
    );
  } catch {
    res.status(500).json({
      message: "Unable to fetch cocktail.",
    });
  }
}

export async function searchCocktails(req, res) {
  try {
    res.json(
      await fetchCocktailsBySearch(
        req.query.q
      )
    );
  } catch {
    res.status(500).json({
      message: "Search failed.",
    });
  }
}

export async function getCocktailsByIngredient(
  req,
  res
) {
  try {
    res.json(
      await fetchCocktailsByIngredient(
        req.params.ingredient
      )
    );
  } catch {
    res.status(500).json({
      message: "Ingredient search failed.",
    });
  }
}