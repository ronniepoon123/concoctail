import "./BottleSearch.css";
import ingredients from "../../data/ingredients";

function BottleSearch({
  search,
  setSearch,
  bottles,
  onAddBottle,
}) {
  const filteredIngredients = ingredients.filter((ingredient) => {
    if (!search.trim()) return false;

    return ingredient.name
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div className="bottle-search">
      <input
        type="text"
        placeholder="Search spirits, liqueurs or mixers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredIngredients.length > 0 && (
        <div className="search-results">
          {filteredIngredients.map((ingredient) => {
            const owned = bottles.some(
              (bottle) =>
                bottle.name.toLowerCase() ===
                ingredient.name.toLowerCase()
            );

            return (
              <button
                key={ingredient.name}
                disabled={owned}
                onClick={() => onAddBottle(ingredient)}
              >
                <div className="ingredient-info">
                  <strong>{ingredient.name}</strong>

                  <small>
                    {ingredient.category}
                  </small>
                </div>

                {owned && (
                  <span className="owned-tag">
                    ✓ Owned
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BottleSearch;