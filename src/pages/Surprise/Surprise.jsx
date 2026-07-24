import { useState } from "react";

import Layout from "../../components/Layout/Layout";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

import cocktails from "../../data/cocktails";

import "./Surprise.css";

function Surprise() {

  function getRandomCocktail() {
    return cocktails[
      Math.floor(Math.random() * cocktails.length)
    ];
  }

  const [cocktail, setCocktail] = useState(
    getRandomCocktail()
  );

  function anotherSurprise() {
    setCocktail(getRandomCocktail());
  }

  return (
    <Layout
      title="Surprise Me"
      description="Can't decide? Let us choose for you."
    >
      <div className="surprise-page">

        <CocktailCard cocktail={cocktail} />

        <button
          className="surprise-btn"
          onClick={anotherSurprise}
        >
          🎲 Another Surprise
        </button>

      </div>
    </Layout>
  );
}

export default Surprise;