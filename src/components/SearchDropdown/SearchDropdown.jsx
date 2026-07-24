import "./SearchDropdown.css";

function SearchDropdown({
  results,
  onSelect,
}) {
  if (results.length === 0) return null;

  return (
    <div className="search-dropdown">

      {results.map((item) => (

        <button
          key={`${item.type}-${item.name}`}
          className="search-result"
          onClick={() => onSelect(item)}
        >

          <div>

            <strong>{item.name}</strong>

            <small>{item.type}</small>

          </div>

        </button>

      ))}

    </div>
  );
}

export default SearchDropdown;