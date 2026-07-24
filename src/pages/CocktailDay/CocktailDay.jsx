import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import { getRandomCocktail } from "../../services/cocktailService";
import mapCocktail from "../../utils/mapCocktail";

function CocktailDay() {

  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {

    async function loadCocktail() {

      try {

        const today =
          new Date().toDateString();

        const savedCocktail =
          localStorage.getItem(
            "cocktailOfTheDay"
          );


        if (savedCocktail) {

          const parsed =
            JSON.parse(savedCocktail);


          if (parsed.date === today) {

            setCocktail(
              mapCocktail(parsed.cocktail)
            );

            return;

          }

        }


        const drink =
          await getRandomCocktail();


        localStorage.setItem(
          "cocktailOfTheDay",
          JSON.stringify({
            date: today,
            cocktail: drink
          })
        );


        setCocktail(
          mapCocktail(drink)
        );

      }

      catch (error) {

        console.error(error);

      }

    }


    loadCocktail();

  }, []);


  if (!cocktail) {

    return (

      <Layout
        title="Cocktail of the Day"
        description="Loading..."
      />

    );

  }


  return (

    <Layout
      title="Cocktail of the Day"
      description="Today's featured cocktail."
    >

      <CocktailCard
        cocktail={cocktail}
      />

    </Layout>

  );

}

export default CocktailDay;