import Layout from "../../components/Layout/Layout";
import CocktailGrid from "../../components/CocktailGrid/CocktailGrid";

import cocktails from "../../data/cocktails";

import { getFavourites } from "../../utils/favourites";

function Favourites() {

  const favourites = getFavourites();

  const favouriteCocktails = cocktails.filter(

    cocktail =>

      favourites.includes(cocktail.id)

  );

  return (

    <Layout

      title="Favourites"

      description="Your saved cocktails."

    >

      <CocktailGrid

        cocktails={favouriteCocktails}

      />

    </Layout>

  );

}

export default Favourites;