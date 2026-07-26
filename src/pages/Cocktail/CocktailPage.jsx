import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";

import {
  getCocktailById,
} from "../../services/cocktailService";

import { addIngredientsToShoppingList } from "../../utils/shoppingList";

import "./CocktailPage.css";

function CocktailPage() {
  const { id } = useParams();

  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    async function loadCocktail() {
      const result =
        await getCocktailById(id);
        console.log(result);

      setCocktail(result);
    }

    loadCocktail();
  }, [id]);

  if (!cocktail) {
    return (
      <Layout
        title="Loading..."
        description="Loading cocktail..."
      />
    );
  }

  const owned = JSON.parse(
    localStorage.getItem("myBar") || "[]"
  )
    .filter((bottle) => bottle.owned)
    .map((bottle) => bottle.name);

  const missingIngredients =
    cocktail.ingredients.filter(
      (ingredient) => !owned.includes(ingredient)
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
      description={cocktail.tagline}
    >
      <section className="cocktail-page">

        <div className="cocktail-hero">

          <div className="cocktail-summary">

            <span className="pill">
              {cocktail.category}
            </span>

            <span className="pill">
              {cocktail.spirit}
            </span>

          </div>

          <div className="cocktail-details">

            <span>
              🥃 {cocktail.spirit}
            </span>

            <span>
              💪 {cocktail.strength}
            </span>

            <span>
              ⭐ {cocktail.difficulty}
            </span>

            <span>
              🍸 {cocktail.glass}
            </span>

          </div>

        </div>

        <section className="cocktail-section">

          <h2>Ingredients</h2>

          <ul>

            {cocktail.ingredients.map((ingredient) => {

              const ownedIngredient =
                owned.includes(ingredient);

              return (
                <li key={ingredient}>
                  {ownedIngredient ? "✅" : "❌"}{" "}
                  {ingredient}
                </li>
              );

            })}

          </ul>

          {missingIngredients.length > 0 && (

            <button
              className="shopping-btn"
              onClick={addMissingIngredients}
            >
              🛒 Add Missing Ingredients
            </button>

          )}

        </section>

        <section className="cocktail-section">

          <h2>Instructions</h2>

          <ol>

            {cocktail.instructions.map(
              (step, index) => (
                <li key={index}>
                  {step}
                </li>
              )
            )}

          </ol>

        </section>

        <section className="cocktail-section">

          <h2>Garnish</h2>

          <p>{cocktail.garnish}</p>

        </section>

      </section>
    </Layout>
  );
}

export default CocktailPage;