import { useState } from "react";
import { Link } from "react-router-dom";

import "./CocktailCard.css";

import {
  isFavourite,
  toggleFavourite,
} from "../../utils/favourites";

function CocktailCard({ cocktail }) {

  const id =
    cocktail.id || cocktail.idDrink;

  const name =
    cocktail.name || cocktail.strDrink;

  const image =
    cocktail.image || cocktail.strDrinkThumb;

  const tagline =
    cocktail.tagline ||
    cocktail.strCategory ||
    "";

  const spirit =
    cocktail.spirit || "";

  const glass =
    cocktail.glass || "";

  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-");

  const [liked, setLiked] = useState(
    isFavourite(id)
  );

  function handleFavourite(e) {

    e.preventDefault();
    e.stopPropagation();

    setLiked(toggleFavourite(id));

  }

  return (

    <Link
      className="cocktail-card"
      to={`/cocktail/${slug}`}
    >

      <button
        className="heart"
        onClick={handleFavourite}
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {image && (

        <img
          className="cocktail-image"
          src={image}
          alt={name}
        />

      )}

      <div className="cocktail-card-content">

        <h3>{name}</h3>

        {tagline && (
          <p>{tagline}</p>
        )}

        {(spirit || glass) && (

          <div className="cocktail-meta">

            {spirit && (
              <span>{spirit}</span>
            )}

            {glass && (
              <span>{glass}</span>
            )}

          </div>

        )}

      </div>

    </Link>

  );

}

export default CocktailCard;