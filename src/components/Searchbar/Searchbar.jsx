import "./SearchBar.css";

function SearchBar() {
  return (
    <section className="search-section">

      <div className="search-box">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search cocktails, spirits or ingredients..."
        />

      </div>

    </section>
  );
}

export default SearchBar;