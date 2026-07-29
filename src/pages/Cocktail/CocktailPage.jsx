import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Layout from "../../components/Layout/Layout";

import {
  getCocktailById,
  getCocktailByName,
} from "../../services/cocktailService";

import {
  addIngredientsToShoppingList,
} from "../../utils/shoppingList";

import "./CocktailPage.css";

function CocktailPage() {
  const { id } = useParams();

  const [cocktail, setCocktail] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCocktail() {
      try {
        setLoading(true);
        setError("");
        setCocktail(null);

        /*
          Numerical values are TheCocktailDB IDs.

          Example:
          /cocktail/11007
        */

        const isNumericId =
          /^\d+$/.test(id);

        let result;

        if (isNumericId) {
          result =
            await getCocktailById(id);
        } else {
          /*
            Name-based URLs contain slugs.

            Example:
            alabama-slammer
            becomes:
            alabama slammer
          */

          const cocktailName =
            decodeURIComponent(id)
              .replace(/-/g, " ");

          result =
            await getCocktailByName(
              cocktailName
            );
        }

        console.log(
          "Cocktail loaded:",
          result
        );

        if (!cancelled) {
          setCocktail(result);
        }
      } catch (requestError) {
        console.error(
          "Failed to load cocktail:",
          requestError
        );

        if (!cancelled) {
          setCocktail(null);

          setError(
            "Unable to load this cocktail."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadCocktail();
    } else {
      setLoading(false);

      setError(
        "No cocktail was specified."
      );
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Layout
        title="Loading..."
        description="Loading cocktail..."
      />
    );
  }

  if (error) {
    return (
      <Layout
        title="Cocktail unavailable"
        description={error}
      />
    );
  }

  if (!cocktail) {
    return (
      <Layout
        title="Cocktail not found"
        description="No cocktail data was returned."
      />
    );
  }

  let myBar = [];

  try {
    myBar = JSON.parse(
      localStorage.getItem("myBar") ||
        "[]"
    );
  } catch {
    myBar = [];
  }

  const owned = myBar
    .filter(
      (bottle) => bottle.owned
    )
    .map(
      (bottle) => bottle.name
    );

  const ingredients =
    Array.isArray(
      cocktail.ingredients
    )
      ? cocktail.ingredients
      : [];

  const ingredientDetails =
  Array.isArray(
    cocktail.ingredientDetails
  )
    ? cocktail.ingredientDetails
    : ingredients.map((name) => ({
        name,
        measure: "",
        originalMeasure: "",
      }));    

const instructions =
  Array.isArray(
    cocktail.instructions
  )
    ? cocktail.instructions
    : [];

const category =
  cocktail.category || "";

const tagline =
  cocktail.tagline || "";

const showCategory =
  category
    .trim()
    .toLowerCase() !==
  "ordinary drink";

const showTagline =
  tagline
    .trim()
    .toLowerCase() !==
  "ordinary drink";

  const missingIngredients =
    ingredients.filter(
      (ingredient) =>
        !owned.includes(ingredient)
    );

  function addMissingIngredients() {
    addIngredientsToShoppingList(
      missingIngredients
    );

    alert(
      "Missing ingredients added to Shopping List."
    );
  }

  return (
 <Layout
  title={cocktail.name}
  description={
    showTagline
      ? tagline
      : ""
  }
>
      <section className="cocktail-page">
        <div className="cocktail-hero">
          <div className="cocktail-summary">
          {showCategory && (
  <span className="pill">
    {category}
  </span>
)}

            {cocktail.spirit && (
              <span className="pill">
                {cocktail.spirit}
              </span>
            )}
          </div>

          <div className="cocktail-details">
            {cocktail.spirit && (
              <span>
                🥃 {cocktail.spirit}
              </span>
            )}

            {cocktail.strength && (
              <span>
                💪 {cocktail.strength}
              </span>
            )}

            {cocktail.difficulty && (
              <span>
                ⭐ {cocktail.difficulty}
              </span>
            )}

            {cocktail.glass && (
              <span>
                🍸 {cocktail.glass}
              </span>
            )}
          </div>
        </div>

        <section className="cocktail-section">
          <h2>Ingredients</h2>

{ingredientDetails.length > 0 ? (
  <ul>
    {ingredientDetails.map(
      (
        {
          name,
          measure,
        },
        index
      ) => {
        const ownedIngredient =
          owned.includes(name);

        return (
          <li
            key={`${name}-${index}`}
          >
            {ownedIngredient
              ? "✅"
              : "❌"}{" "}

            {measure && (
              <strong>
                {measure}{" "}
              </strong>
            )}

            {name}
          </li>
        );
      }
    )}
  </ul>
) : (
  <p>
    No ingredients available.
  </p>
)}

          {missingIngredients.length >
            0 && (
            <button
              type="button"
              className="shopping-btn"
              onClick={
                addMissingIngredients
              }
            >
              🛒 Add Missing Ingredients
            </button>
          )}
        </section>

        <section className="cocktail-section">
          <h2>Instructions</h2>

          {instructions.length > 0 ? (
            <ol>
              {instructions.map(
                (step, index) => (
                  <li
                    key={`${index}-${step}`}
                  >
                    {step}
                  </li>
                )
              )}
            </ol>
          ) : (
            <p>
              No instructions available.
            </p>
          )}
        </section>

        <section className="cocktail-section">
          <h2>Garnish</h2>

          <p>
            {cocktail.garnish ||
              "No garnish specified."}
          </p>
        </section>
      </section>
    </Layout>
  );
}

export default CocktailPage;