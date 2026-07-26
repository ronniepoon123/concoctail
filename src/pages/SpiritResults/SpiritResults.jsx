import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import CocktailGrid from "../../components/CocktailGrid/CocktailGrid";

import { getCocktailsBySpirit } from "../../services/cocktailService";

function SpiritResults() {

  const { spirit } = useParams();

  const [cocktails, setCocktails] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getCocktailsBySpirit(
            spirit
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

  }, [spirit]);

  return (

    <Layout

      title={`${spirit} Cocktails`}

      description={`Cocktails made with ${spirit}.`}

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

export default SpiritResults;