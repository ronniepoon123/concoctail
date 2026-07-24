import CocktailCard from "../CocktailCard/CocktailCard";
import "./CocktailGrid.css";

function CocktailGrid({ cocktails }) {
  if (!cocktails || cocktails.length === 0) {
    return (
      <p className="empty-message">
        No cocktails found.
      </p>
    );
  }

  return (
    <div className="cocktail-grid">
      {cocktails.map((cocktail) => (
        <CocktailCard
          key={cocktail.id}
          cocktail={cocktail}
        />
      ))}
    </div>
  );
}

export default CocktailGrid;