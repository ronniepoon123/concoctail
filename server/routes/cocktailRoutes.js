import express from "express";

import {
  getRandomCocktail,
  getCocktailByName,
  searchCocktails,
  getCocktailsByIngredient,
} from "../controllers/cocktailController.js";

const router = express.Router();

router.get("/random", getRandomCocktail);

router.get("/cocktail/:name", getCocktailByName);

router.get("/search", searchCocktails);

router.get("/ingredient/:ingredient", getCocktailsByIngredient);

export default router;