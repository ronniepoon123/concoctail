import {
  useEffect,
  useState,
} from "react";

import "./BottleSearch.css";

import {
  searchCocktails,
} from "../../services/cocktailService";

const CATEGORY_MAP = {
  spirit: "Spirits",
  liqueur: "Liqueurs",
  aperitif: "Aperitifs",
  vermouth: "Fortified Wine",
  bitters: "Bitters",
};

function BottleSearch({
  search,
  setSearch,
  ownedBottles,
  onAddBottle,
}) {
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const trimmedSearch =
      search.trim();

    if (!trimmedSearch) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const timeout = setTimeout(
      async () => {
        try {
          setLoading(true);

          const response =
            await searchCocktails(
              trimmedSearch
            );

          if (cancelled) {
            return;
          }

const mappedSpirits = (
  response.spirits || []
)
  .filter((item) => item?.name)
  .map((item) => {
    const type =
      item.type || "spirit";

    return {
      id: `${type}-${item.name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),

      name: item.name,

      type,

      category:
        CATEGORY_MAP[type] || "Spirits",
    };
  });

          const uniqueResults =
            mappedSpirits.filter(
              (item, index, array) =>
                array.findIndex(
                  (otherItem) =>
                    otherItem.name
                      .toLowerCase() ===
                    item.name
                      .toLowerCase()
                ) === index
            );

          setResults(
            uniqueResults.slice(0, 12)
          );
        } catch (error) {
          if (!cancelled) {
            console.error(
              "Bottle search failed:",
              error
            );

            setResults([]);
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      },
      250
    );

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <div className="bottle-search">
      <input
        type="search"
        placeholder="Search spirits, liqueurs, aperitifs, vermouths or bitters..."
        value={search}
        autoComplete="off"
        onChange={(event) =>
          setSearch(
            event.target.value
          )
        }
      />

      {loading && (
        <div className="bottle-search-status">
          Searching...
        </div>
      )}

      {!loading &&
        results.length > 0 && (
          <div className="search-results">
            {results.map((ingredient) => {
              const owned =
                ownedBottles.some(
                  (bottle) =>
                    bottle.name
                      .toLowerCase() ===
                    ingredient.name
                      .toLowerCase()
                );

              return (
                <button
                  type="button"
                  key={ingredient.id}
                  disabled={owned}
                  onClick={() =>
                    onAddBottle(
                      ingredient
                    )
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

      {!loading &&
        search.trim() &&
        results.length === 0 && (
          <div className="no-bottle-results">
            No matching bottles found.
          </div>
        )}
    </div>
  );
}

export default BottleSearch;