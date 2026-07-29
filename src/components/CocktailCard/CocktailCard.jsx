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
    cocktail.description ||
    "";

  const category =
  cocktail.category ||
  cocktail.strCategory ||
  "";

  const spirit =
    cocktail.spirit || "";

  const glass =
    cocktail.glass || "";

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const [liked, setLiked] = useState(
    isFavourite(id)
  );

  function handleFavourite(event) {
    event.preventDefault();
    event.stopPropagation();

    const updatedFavouriteState =
      toggleFavourite(cocktail);

    setLiked(updatedFavouriteState);
  }

  return (
    <Link
      className="cocktail-card"
      to={`/cocktail/${id || slug}`}
    >
      <button
        type="button"
        className={`heart ${
          liked ? "heart-active" : ""
        }`}
        onClick={handleFavourite}
        aria-label={
          liked
            ? `Remove ${name} from favourites`
            : `Add ${name} to favourites`
        }
        aria-pressed={liked}
      >
        {liked ? "♥" : "♡"}
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

 {(spirit || category || glass) && (
  <div className="cocktail-meta">
    {spirit && (
      <span>{spirit}</span>
    )}

    {category && (
      <span>{category}</span>
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