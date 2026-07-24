import { useState } from "react";
import { Link } from "react-router-dom";

import "./CocktailCard.css";

import {
  isFavourite,
  toggleFavourite,
} from "../../utils/favourites";

function CocktailCard({ cocktail }) {

  const [liked, setLiked] = useState(
    isFavourite(cocktail.id)
  );

  function handleFavourite(e) {

    e.preventDefault();
    e.stopPropagation();

    setLiked(
      toggleFavourite(cocktail.id)
    );

  }

  return (

    <Link
      className="cocktail-card"
      to={`/cocktail/${cocktail.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >

      <button
        className="heart"
        onClick={handleFavourite}
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {cocktail.image && (

        <img
          className="cocktail-image"
          src={cocktail.image}
          alt={cocktail.name}
        />

      )}

      <div className="cocktail-card-content">

        <h3>{cocktail.name}</h3>

        <p>{cocktail.tagline}</p>

        <div className="cocktail-meta">

          <span>{cocktail.spirit}</span>

          <span>{cocktail.glass}</span>

        </div>

      </div>

    </Link>

  );

}

export default CocktailCard;