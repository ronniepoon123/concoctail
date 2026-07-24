import "./SearchBar.css";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <section className="search-section">
      <div className="search-box">
        <Search
          size={20}
          strokeWidth={2}
          className="search-icon"
        />

        <input
          type="text"
          placeholder="Search cocktails, spirits or ingredients..."
        />
      </div>
    </section>
  );
}

export default SearchBar;