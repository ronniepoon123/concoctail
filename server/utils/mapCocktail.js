const ML_PER_US_FLUID_OUNCE = 29.5735;

/* ===========================================
   PARSE NUMBER OR FRACTION
=========================================== */

function parseNumber(value) {
  const cleanedValue =
    String(value).trim();

  /*
    Mixed fraction:

    1 1/2
  */

  if (
    /^\d+\s+\d+\/\d+$/.test(
      cleanedValue
    )
  ) {
    const [
      wholeNumber,
      fraction,
    ] = cleanedValue.split(/\s+/);

    const [
      numerator,
      denominator,
    ] = fraction.split("/");

    return (
      Number(wholeNumber) +
      Number(numerator) /
        Number(denominator)
    );
  }

  /*
    Simple fraction:

    1/2
  */

  if (
    /^\d+\/\d+$/.test(
      cleanedValue
    )
  ) {
    const [
      numerator,
      denominator,
    ] = cleanedValue.split("/");

    return (
      Number(numerator) /
      Number(denominator)
    );
  }

  /*
    Whole number or decimal:

    1
    0.75
  */

  return Number(cleanedValue);
}

/* ===========================================
   FORMAT MILLILITRES
=========================================== */

function formatMillilitres(value) {
  const rounded =
    Math.round(value / 2.5) * 2.5;

  return Number.isInteger(rounded)
    ? `${rounded} ml`
    : `${rounded.toFixed(1)} ml`;
}

/* ===========================================
   CONVERT OUNCES TO MILLILITRES
=========================================== */

function convertOuncesToMillilitres(
  measure = ""
) {
  if (!measure) {
    return "";
  }

  const cleanedMeasure =
    String(measure)
      .replace(/½/g, "1/2")
      .replace(/¼/g, "1/4")
      .replace(/¾/g, "3/4")
      .trim();

  /*
    Matches:

    1 oz
    1/2 oz
    1 1/2 oz
    0.75 oz
    1 fl oz
    1 fl. oz
  */

  const ouncePattern =
    /(\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+)\s*(?:fl\.?\s*)?oz\b/i;

  const match =
    cleanedMeasure.match(
      ouncePattern
    );

  /*
    Keep non-ounce measurements unchanged.
  */

  if (!match) {
    return cleanedMeasure;
  }

  const ounces =
    parseNumber(match[1]);

  if (!Number.isFinite(ounces)) {
    return cleanedMeasure;
  }

  const millilitres =
    ounces *
    ML_PER_US_FLUID_OUNCE;

  const converted =
    formatMillilitres(
      millilitres
    );

  return cleanedMeasure.replace(
    ouncePattern,
    converted
  );
}

/* ===========================================
   BUILD INGREDIENT DETAILS
=========================================== */

function getIngredientDetails(drink) {
  const ingredientDetails = [];

  for (
    let index = 1;
    index <= 15;
    index += 1
  ) {
    const name =
      drink[
        `strIngredient${index}`
      ]?.trim();

    const originalMeasure =
      drink[
        `strMeasure${index}`
      ]?.trim() || "";

    if (!name) {
      continue;
    }

    ingredientDetails.push({
      name,

      measure:
        convertOuncesToMillilitres(
          originalMeasure
        ),

      originalMeasure,
    });
  }

  return ingredientDetails;
}

/* ===========================================
   MAP COCKTAIL
=========================================== */

export default function mapCocktail(
  drink
) {
  if (!drink) {
    return null;
  }

  const ingredientDetails =
    getIngredientDetails(drink);

  const ingredients =
    ingredientDetails.map(
      (ingredient) =>
        ingredient.name
    );

  const instructions =
    drink.strInstructions
      ? drink.strInstructions
          .split(/\.\s+/)
          .map((step) =>
            step.trim()
          )
          .filter(Boolean)
          .map((step) =>
            step.endsWith(".")
              ? step
              : `${step}.`
          )
      : [];

  return {
    id: drink.idDrink,

    name:
      drink.strDrink || "",

    tagline:
      drink.strCategory ||
      "Cocktail recipe",

    category:
      drink.strCategory || "",

    /*
      strAlcoholic is not the spirit name.

      It contains values such as:
      "Alcoholic"
      "Non alcoholic"
  */

    spirit: "",

    alcoholic:
      drink.strAlcoholic || "",

    strength: "",

    difficulty: "",

    glass:
      drink.strGlass || "",

    garnish: "",

    image:
      drink.strDrinkThumb || "",

    /*
      Plain names remain available for My Bar
      and the shopping list.
    */

    ingredients,

    /*
      Names and measurements are used on the
      cocktail detail page.
    */

    ingredientDetails,

    instructions,
  };
}