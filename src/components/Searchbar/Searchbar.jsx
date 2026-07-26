import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.css";

import SearchDropdown from "../SearchDropdown/SearchDropdown";

import { searchCocktails } from "../../services/cocktailService";

function SearchBar() {

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (!query.trim()) {

      setResults([]);

      return;

    }

    const timeout = setTimeout(async () => {

      try {

        setLoading(true);

        const response =
          await searchCocktails(query);
          console.log(response);

        const dropdown = [];

        /* ==========================
           COCKTAILS
        ========================== */

        if (response.cocktails.length > 0) {

          dropdown.push({

            type: "header",

            title: "Cocktails",

          });

          response.cocktails.forEach(

            drink => {

              dropdown.push({

                type: "cocktail",

                id: drink.idDrink,

                name: drink.strDrink,

                image: drink.strDrinkThumb,

              });

            }

          );

        }

        /* ==========================
           SPIRITS
        ========================== */

        if (response.spirits.length > 0) {

          dropdown.push({

            type: "header",

            title: "Spirits",

          });

          response.spirits.forEach(

  spirit => {

    dropdown.push({

      type: "spirit",

      name: spirit.name,

    });

  }

);

        }

        /* ==========================
           INGREDIENTS
        ========================== */

        if (response.ingredients.length > 0) {

          dropdown.push({

            type: "header",

            title: "Ingredients",

          });

          response.ingredients.forEach(

            ingredient => {

              dropdown.push({

                type: "ingredient",

                name: ingredient.name,

              });

            }

          );

        }

        setResults(dropdown);

      }

      catch (error) {

        console.error(error);

        setResults([]);

      }

      finally {

        setLoading(false);

      }

    }, 250);

    return () => clearTimeout(timeout);

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
          )}`

        );

        break;

      case "ingredient":

        navigate(

          `/ingredient/${item.name
            .toLowerCase()
            .replace(/\s+/g, "-")}`

        );

        break;

      default:

        break;

    }

  }

  return (

    <div className="search-wrapper">

      <button
        className="search-icon"
      >
        🔍
      </button>

      <input

        type="text"

        placeholder="Search cocktails, spirits or ingredients..."

        value={query}

        onChange={(e) =>
          setQuery(e.target.value)
        }

      />

      <SearchDropdown

        loading={loading}

        results={results}

        onSelect={handleSelect}

      />

    </div>

  );

}

export default SearchBar;