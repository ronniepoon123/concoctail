import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.css";

import SearchDropdown from "../SearchDropdown/SearchDropdown";

import cocktails from "../../data/cocktails";
import ingredients from "../../data/ingredients";
import collections from "../../data/collections";

import searchSuggestions from "../../utils/searchSuggestions";

function SearchBar() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    return searchSuggestions(
      query,
      cocktails,
      ingredients,
      collections
    );
  }, [query]);

  function handleSelect(item) {
    setQuery("");

    switch (item.type) {
      case "Cocktail":
        navigate(
          `/cocktail/${item.name
            .toLowerCase()
            .replace(/\s+/g, "-")}`
        );
        break;

      case "Ingredient":
        navigate(`/ingredient/${item.data.id}`);
        break;

      case "Collection":
        navigate(
          `/collections/${item.name
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
      <input
        type="text"
        placeholder="Search cocktails, spirits or ingredients..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <SearchDropdown
        results={suggestions}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default SearchBar;