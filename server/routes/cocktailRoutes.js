import express from "express";

import {
  getRandomCocktail,
  getCocktailByName,
  getCocktailById,
  searchCocktails,
  getCocktailsByIngredient,
  getCocktailsBySpirit,
  getCocktailsByCategory,
  getCategories,
  getGlasses,
  getLatestCocktails,
  getPopularCocktails,
  autocomplete
} from "../controllers/cocktailController.js";

const router = express.Router();

/* ===========================================
   RANDOM
=========================================== */

router.get(
  "/random",
  getRandomCocktail
);

/* ===========================================
   COCKTAIL
=========================================== */

router.get(
  "/cocktail/id/:id",
  getCocktailById
);

router.get(
  "/cocktail/:name",
  getCocktailByName
);

/* ===========================================
   SEARCH
=========================================== */

router.get(
  "/search",
  searchCocktails
);

/* ===========================================
   INGREDIENT
=========================================== */

router.get(
  "/ingredient/:ingredient",
  getCocktailsByIngredient
);

/* ===========================================
   BASE SPIRIT
=========================================== */

router.get(
  "/base-spirit/:spirit",
  getCocktailsBySpirit
);

/* ===========================================
   CATEGORY
=========================================== */

router.get(
  "/category/:category",
  getCocktailsByCategory
);

/* ===========================================
   CATEGORY LIST
=========================================== */

router.get(
  "/categories",
  getCategories
);

/* ===========================================
   GLASSES
=========================================== */

router.get(
  "/glasses",
  getGlasses
);

/* ===========================================
   LATEST
=========================================== */

router.get(
  "/latest",
  getLatestCocktails
);

/* ===========================================
   POPULAR
=========================================== */

router.get(
  "/popular",
  getPopularCocktails
);

router.get(
  "/autocomplete",
  autocomplete
);

export default router;