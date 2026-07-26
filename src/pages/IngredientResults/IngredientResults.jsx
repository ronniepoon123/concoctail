import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import CocktailGrid from "../../components/CocktailGrid/CocktailGrid";

import { getCocktailsByIngredient } from "../../services/cocktailService";

function IngredientResults() {

  const { ingredient } = useParams();

  const [cocktails, setCocktails] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getCocktailsByIngredient(
            ingredient
          );

        setCocktails(data);

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    }

    load();

  }, [ingredient]);

  return (

    <Layout

      title={`${ingredient} Cocktails`}

      description={`Cocktails containing ${ingredient}.`}

    >

      {loading ? (

        <p>Loading...</p>

      ) : (

        <CocktailGrid
          cocktails={cocktails}
        />

      )}

    </Layout>

  );

}

export default IngredientResults;