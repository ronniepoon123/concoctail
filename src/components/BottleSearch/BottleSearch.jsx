import "./BottleSearch.css";

function BottleSearch({
  search,
  setSearch,
  availableBottles,
  ownedBottles,
  onAddBottle,
}) {
  const normalisedSearch = search
    .trim()
    .toLowerCase();

  const filteredIngredients = availableBottles.filter(
    (ingredient) => {
      if (!normalisedSearch) {
        return false;
      }

      return ingredient.name
        .toLowerCase()
        .includes(normalisedSearch);
    }
  );

  return (
    <div className="bottle-search">
      <input
        type="text"
        placeholder="Search spirits, liqueurs or mixers..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      {filteredIngredients.length > 0 && (
        <div className="search-results">
          {filteredIngredients.map((ingredient) => {
            const owned = ownedBottles.some(
              (bottle) =>
                bottle.name.toLowerCase() ===
                ingredient.name.toLowerCase()
            );

            return (
              <button
                type="button"
                key={ingredient.id}
                disabled={owned}
                onClick={() =>
                  onAddBottle(ingredient)
                }
              >
                <div className="ingredient-info">
                  <strong>
                    {ingredient.name}
                  </strong>

                  <small>
                    {ingredient.category}
                  </small>
                </div>

                <span
                  className={
                    owned
                      ? "owned-tag"
                      : "add-tag"
                  }
                >
                  {owned
                    ? "✓ Owned"
                    : "+ Add"}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {normalisedSearch &&
        filteredIngredients.length === 0 && (
          <div className="no-bottle-results">
            No matching bottles found.
          </div>
        )}
    </div>
  );
}

export default BottleSearch;