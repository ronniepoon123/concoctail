import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import "./Searchbar.css";

import SearchDropdown from "../SearchDropdown/SearchDropdown";

import {
  searchCocktails,
} from "../../services/cocktailService";

const TYPE_LABELS = {
  spirit: "Spirits",
  liqueur: "Liqueurs",
  aperitif: "Aperitifs",
  vermouth: "Vermouths",
  bitters: "Bitters",
};

const TYPE_ORDER = [
  "spirit",
  "liqueur",
  "aperitif",
  "vermouth",
  "bitters",
];

function normaliseText(value = "") {
  return value
    .toLowerCase()
    .trim();
}

function sortByRelevance(
  items,
  query,
  getName
) {
  const normalisedQuery =
    normaliseText(query);

  return [...items].sort((a, b) => {
    const aName = normaliseText(
      getName(a)
    );

    const bName = normaliseText(
      getName(b)
    );

    const aExact =
      aName === normalisedQuery;

    const bExact =
      bName === normalisedQuery;

    if (aExact !== bExact) {
      return (
        Number(bExact) -
        Number(aExact)
      );
    }

    const aStarts =
      aName.startsWith(
        normalisedQuery
      );

    const bStarts =
      bName.startsWith(
        normalisedQuery
      );

    if (aStarts !== bStarts) {
      return (
        Number(bStarts) -
        Number(aStarts)
      );
    }

    return aName.localeCompare(bName);
  });
}

function SearchBar() {
  const navigate = useNavigate();

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const trimmedQuery =
      query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setLoading(false);
      return;
    }

    let requestCancelled = false;

    const timeout = setTimeout(
      async () => {
        try {
          setLoading(true);

          const response =
            await searchCocktails(
              trimmedQuery
            );

          if (requestCancelled) {
            return;
          }

          const normalisedQuery =
            normaliseText(
              trimmedQuery
            );

          const dropdown = [];

          /* ===================================
             FILTER ALCOHOL RESULTS
          =================================== */

          const alcoholResults =
  response.spirits || [];

const sortedAlcohol =
  sortByRelevance(
    alcoholResults,
    normalisedQuery,
    (item) =>
      item.matchedName ||
      item.name
  );

          const alcoholGroups =
            sortedAlcohol.reduce(
              (groups, item) => {
                const alcoholType =
                  item.type ||
                  "spirit";

                if (
                  !groups[
                    alcoholType
                  ]
                ) {
                  groups[
                    alcoholType
                  ] = [];
                }

                groups[
                  alcoholType
                ].push(item);

                return groups;
              },
              {}
            );

          TYPE_ORDER.forEach(
            (alcoholType) => {
              const items =
                alcoholGroups[
                  alcoholType
                ];

              if (!items?.length) {
                return;
              }

              dropdown.push({
                type: "header",

                title:
                  TYPE_LABELS[
                    alcoholType
                  ] || "Alcohol",
              });

              items
                .slice(0, 6)
                .forEach((item) => {
                  dropdown.push({
                    type: "spirit",

                    name: item.name,

                    alcoholType,
                  });
                });
            }
          );

          Object.entries(
            alcoholGroups
          )
            .filter(
              ([alcoholType]) =>
                !TYPE_ORDER.includes(
                  alcoholType
                )
            )
            .forEach(
              ([
                alcoholType,
                items,
              ]) => {
                if (!items.length) {
                  return;
                }

                dropdown.push({
                  type: "header",

                  title:
                    TYPE_LABELS[
                      alcoholType
                    ] || "Alcohol",
                });

                items
                  .slice(0, 6)
                  .forEach((item) => {
                    dropdown.push({
                      type: "spirit",

                      name:
                        item.name,

                      alcoholType,
                    });
                  });
              }
            );

          /* ===================================
             FILTER COCKTAIL RESULTS
          =================================== */

          const matchingCocktails =
            (
              response.cocktails || []
            ).filter((drink) =>
              normaliseText(
                drink.strDrink
              ).includes(
                normalisedQuery
              )
            );

          const sortedCocktails =
            sortByRelevance(
              matchingCocktails,
              normalisedQuery,
              (drink) =>
                drink.strDrink
            );

          if (
            sortedCocktails.length > 0
          ) {
            dropdown.push({
              type: "header",
              title: "Cocktails",
            });

            sortedCocktails
              .slice(0, 8)
              .forEach((drink) => {
                dropdown.push({
                  type: "cocktail",

                  id:
                    drink.idDrink,

                  name:
                    drink.strDrink,

                  image:
                    drink
                      .strDrinkThumb,
                });
              });
          }

          /* ===================================
             FILTER INGREDIENT RESULTS
          =================================== */

          const matchingIngredients =
            (
              response.ingredients ||
              []
            ).filter((ingredient) =>
              normaliseText(
                ingredient.name
              ).includes(
                normalisedQuery
              )
            );

          const sortedIngredients =
            sortByRelevance(
              matchingIngredients,
              normalisedQuery,
              (ingredient) =>
                ingredient.name
            );

          if (
            sortedIngredients.length >
            0
          ) {
            dropdown.push({
              type: "header",
              title: "Ingredients",
            });

            sortedIngredients
              .slice(0, 6)
              .forEach(
                (ingredient) => {
                  dropdown.push({
                    type:
                      "ingredient",

                    name:
                      ingredient.name,
                  });
                }
              );
          }

          setResults(dropdown);
        } catch (error) {
          if (!requestCancelled) {
            console.error(
              "Search failed:",
              error
            );

            setResults([]);
          }
        } finally {
          if (!requestCancelled) {
            setLoading(false);
          }
        }
      },
      250
    );

    return () => {
      requestCancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  function handleSelect(item) {
    setQuery("");
    setResults([]);

    switch (item.type) {
      case "cocktail":
        navigate(
          `/cocktail/${item.id}`
        );
        break;

      case "spirit":
        navigate(
          `/spirit-of-choice?spirit=${encodeURIComponent(
            item.name
          )}&type=${encodeURIComponent(
            item.alcoholType ||
              "spirit"
          )}`
        );
        break;

      case "ingredient":
        navigate(
          `/ingredient-search/${encodeURIComponent(
            item.name
          )}`
        );
        break;

      default:
        break;
    }
  }

  return (
    <div className="search-wrapper">
      <span
        className="search-icon"
        aria-hidden="true"
      >
        🔍
      </span>

      <input
        type="search"
        placeholder="Search cocktails, spirits, liqueurs or ingredients..."
        value={query}
        autoComplete="off"
        aria-label="Search cocktails and ingredients"
        onChange={(event) =>
          setQuery(
            event.target.value
          )
        }
      />

      {(loading ||
        results.length > 0) && (
        <SearchDropdown
          loading={loading}
          results={results}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

export default SearchBar;