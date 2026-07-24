import "./CocktailMatch.css";

function CocktailMatch({ cocktail, status, missing }) {
  return (
    <article className="cocktail-match">

      <div>

        <h3>{cocktail.name}</h3>

        <p>

          {cocktail.ingredients.join(", ")}

        </p>

      </div>

      <div className={`status ${status}`}>

        {status === "can-make" && "✓ Can Make"}

        {status === "almost" && `Missing: ${missing.join(", ")}`}

        {status === "missing" &&
          `${missing.length} ingredients missing`}

      </div>

    </article>
  );
}

export default CocktailMatch;