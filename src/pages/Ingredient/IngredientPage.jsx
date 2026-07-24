import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

import ingredients from "../../data/ingredients";
import cocktails from "../../data/cocktails";

import "./IngredientPage.css";

function IngredientPage() {

  const { slug } = useParams();

  const ingredient = ingredients.find(

    item => item.id === slug

  );

  if (!ingredient) {

    return (

      <Layout
        title="Ingredient Not Found"
        description="The ingredient could not be found."
      />

    );

  }

  const relatedCocktails = cocktails.filter(

    cocktail =>

      cocktail.ingredients.includes(
        ingredient.name
      )

  );

  return (

    <Layout

      title={ingredient.name}

      description={ingredient.category}

    >

      <section className="ingredient-card">

        <h2>Information</h2>

        <p>

          <strong>Category:</strong>

          {" "}

          {ingredient.category}

        </p>

        <p>

          <strong>ABV:</strong>

          {" "}

          {ingredient.abv}

        </p>

        <p>

          <strong>Origin:</strong>

          {" "}

          {ingredient.origin}

        </p>

      </section>

      <section className="ingredient-card">

        <h2>

          Cocktails Using {ingredient.name}

        </h2>

        {

          relatedCocktails.length === 0 ? (

            <p>

              No cocktails available.

            </p>

          ) : (

            <ul>

              {

                relatedCocktails.map(

                  cocktail => (

                    <li key={cocktail.id}>

                      {cocktail.name}

                    </li>

                  )

                )

              }

            </ul>

          )

        }

      </section>

    </Layout>

  );

}

export default IngredientPage;