import CocktailCard from "../CocktailCard/CocktailCard";
import "./CocktailMatch.css";

function CocktailMatch({
  cocktail,
  status,
  missing,
}) {
  return (
    <div>

      <CocktailCard cocktail={cocktail} />

      <div className={`status ${status}`}>

        {status === "can-make" &&
          "✓ Can Make"}

        {status === "almost" &&
          `Missing: ${missing.join(", ")}`}

        {status === "missing" &&
          `${missing.length} ingredients missing`}

      </div>

    </div>
  );
}

export default CocktailMatch;