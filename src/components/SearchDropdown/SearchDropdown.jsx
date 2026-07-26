import "./SearchDropdown.css";

function SearchDropdown({

  loading,

  results,

  onSelect,

}) {

  if (loading) {

    return (

      <div className="search-dropdown">

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

    <div className="search-dropdown">

      {results.map((item, index) => {

        /* ==========================
           SECTION HEADER
        ========================== */

        if (item.type === "header") {

          return (

            <div

              key={`header-${index}`}

              className="search-section"

            >

              {item.title}

            </div>

          );

        }

        /* ==========================
           COCKTAIL
        ========================== */

        if (item.type === "cocktail") {

          return (

            <button

              key={item.id}

              className="search-item"

              onClick={() =>
                onSelect(item)
              }

            >

              <img

                src={item.image}

                alt={item.name}

              />

              <span>

                {item.name}

              </span>

            </button>

          );

        }

        /* ==========================
           SPIRIT
        ========================== */

        if (item.type === "spirit") {

          return (

            <button

              key={`spirit-${item.name}`}

              className="search-item"

              onClick={() =>
                onSelect(item)
              }

            >

              <span className="search-icon-small">

                🥃

              </span>

              <span>

                {item.name}

              </span>

            </button>

          );

        }

        /* ==========================
           INGREDIENT
        ========================== */

        if (item.type === "ingredient") {

          return (

            <button

              key={`ingredient-${item.name}`}

              className="search-item"

              onClick={() =>
                onSelect(item)
              }

            >

              <span className="search-icon-small">

                🍋

              </span>

              <span>

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