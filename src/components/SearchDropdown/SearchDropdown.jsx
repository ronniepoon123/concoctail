import "./SearchDropdown.css";

function SearchDropdown({
  loading,
  results,
  onSelect,
}) {
  if (loading) {
    return (
      <div
        className="search-dropdown"
        role="status"
      >
        <div className="search-status">
          Searching...
        </div>
      </div>
    );
  }

  if (!results.length) {
    return null;
  }

  return (
    <div
      className="search-dropdown"
      role="listbox"
    >
      {results.map((item, index) => {
        /* ===================================
           SECTION HEADER
        =================================== */

        if (item.type === "header") {
          return (
            <div
              key={`header-${item.title}-${index}`}
              className="search-section"
            >
              {item.title}
            </div>
          );
        }

        /* ===================================
           COCKTAIL
        =================================== */

        if (item.type === "cocktail") {
          return (
            <button
              type="button"
              key={`cocktail-${item.id}`}
              className="search-item"
              role="option"
              onClick={() => onSelect(item)}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className="search-item-image"
                />
              ) : (
                <span
                  className="search-icon-small"
                  aria-hidden="true"
                >
                  🍸
                </span>
              )}

              <span className="search-item-name">
                {item.name}
              </span>
            </button>
          );
        }

        /* ===================================
           SPIRIT
        =================================== */

        if (item.type === "spirit") {
          return (
            <button
              type="button"
              key={`spirit-${item.alcoholType}-${item.name}`}
              className="search-item"
              role="option"
              onClick={() => onSelect(item)}
            >
              <span
                className="search-icon-small"
                aria-hidden="true"
              >
                🥃
              </span>

              <span className="search-item-name">
                {item.name}
              </span>
            </button>
          );
        }

        /* ===================================
           INGREDIENT
        =================================== */

        if (item.type === "ingredient") {
          return (
            <button
              type="button"
              key={`ingredient-${item.name}`}
              className="search-item"
              role="option"
              onClick={() => onSelect(item)}
            >
              <span
                className="search-icon-small"
                aria-hidden="true"
              >
                🍋
              </span>

              <span className="search-item-name">
                {item.name}
              </span>
            </button>
          );
        }

        return null;
      })}
    </div>
  );
}

export default SearchDropdown;