import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import CocktailGrid from "../../components/CocktailGrid/CocktailGrid";

import {
  getCocktailsBySpirit,
} from "../../services/cocktailService";

import "./SpiritOfChoice.css";

/* ===========================================
   MAIN BASE-SPIRIT TABS
=========================================== */

const BASE_ALCOHOL_OPTIONS = [
  {
    name: "Gin",
    type: "spirit",
  },
  {
    name: "Vodka",
    type: "spirit",
  },
  {
    name: "Rum",
    type: "spirit",
  },
  {
    name: "Tequila",
    type: "spirit",
  },
  {
    name: "Whisky",
    type: "spirit",
  },
  {
    name: "Brandy",
    type: "spirit",
  },
  {
    name: "Cognac",
    type: "spirit",
  },
  {
    name: "Mezcal",
    type: "spirit",
  },
];

/* ===========================================
   PAGE TEXT
=========================================== */

const PAGE_COPY = {
  spirit: {
    title: "Spirit of Choice",
    description:
      "Browse cocktails by base spirit.",
  },

  liqueur: {
    title: "Liqueur of Choice",
    description:
      "Browse cocktails by liqueur.",
  },

  aperitif: {
    title: "Aperitif of Choice",
    description:
      "Browse cocktails by aperitif.",
  },

  vermouth: {
    title: "Vermouth of Choice",
    description:
      "Browse cocktails by vermouth.",
  },

  bitters: {
    title: "Cocktails with Bitters",
    description:
      "Browse cocktails containing bitters.",
  },
};

/* ===========================================
   MAP API COCKTAIL
=========================================== */

function mapSpiritCocktail(
  drink,
  selectedAlcohol
) {
  return {
    id: drink.idDrink,

    name: drink.strDrink,

    image: drink.strDrinkThumb,

    tagline:
      `Cocktail with ${selectedAlcohol}`,

    category: "",

    spirit: selectedAlcohol,

    strength: "",

    difficulty: "",

    glass: "",

    garnish: "",

    ingredients: [],

    instructions: [],
  };
}

function SpiritOfChoice() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const selectedAlcohol =
    searchParams.get("spirit") ||
    "Gin";

  const selectedType =
    searchParams.get("type") ||
    "spirit";

  const [cocktails, setCocktails] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ===========================================
     VISIBLE TABS
  =========================================== */

  const visibleOptions = useMemo(() => {
    const selectedAlreadyExists =
      BASE_ALCOHOL_OPTIONS.some(
        (option) =>
          option.name.toLowerCase() ===
          selectedAlcohol.toLowerCase()
      );

    if (selectedAlreadyExists) {
      return BASE_ALCOHOL_OPTIONS;
    }

    /*
      Search results such as Cointreau,
      Aperol or Dry Vermouth are temporarily
      added as a tab.
    */

    return [
      {
        name: selectedAlcohol,
        type: selectedType,
      },

      ...BASE_ALCOHOL_OPTIONS,
    ];
  }, [
    selectedAlcohol,
    selectedType,
  ]);

  /* ===========================================
     FETCH COCKTAILS
  =========================================== */

  useEffect(() => {
    let cancelled = false;

    async function loadCocktails() {
      try {
        setLoading(true);
        setError("");
        setCocktails([]);

        const drinks =
          await getCocktailsBySpirit(
            selectedAlcohol
          );

          console.log(
  `${selectedAlcohol} drinks received:`,
  drinks.length,
  drinks
);

        if (cancelled) {
          return;
        }

        const mappedCocktails =
          drinks.map((drink) =>
            mapSpiritCocktail(
              drink,
              selectedAlcohol
            )
          );

        setCocktails(
          mappedCocktails
        );
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load cocktails:",
          requestError
        );

        setCocktails([]);

        setError(
          `Unable to load cocktails for ${selectedAlcohol}.`
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCocktails();

    return () => {
      cancelled = true;
    };
  }, [selectedAlcohol]);

  /* ===========================================
     PAGE HEADING
  =========================================== */

  const pageCopy =
    PAGE_COPY[selectedType] ||
    PAGE_COPY.spirit;

  /* ===========================================
     SELECT TAB
  =========================================== */

  function handleAlcoholSelect(option) {
    setSearchParams({
      spirit: option.name,
      type: option.type,
    });
  }

  return (
    <Layout
      title={pageCopy.title}
      description={
        pageCopy.description
      }
    >
      <div className="spirit-tabs">
        {visibleOptions.map(
          (option) => (
            <button
              type="button"
              key={`${option.type}-${option.name}`}
              className={
                option.name.toLowerCase() ===
                selectedAlcohol.toLowerCase()
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleAlcoholSelect(
                  option
                )
              }
            >
              {option.name}
            </button>
          )
        )}
      </div>

      {loading && (
        <p className="empty-message">
          Loading {selectedAlcohol} cocktails...
        </p>
      )}

      {!loading && error && (
        <p className="empty-message">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        cocktails.length === 0 && (
          <p className="empty-message">
            No cocktails found for{" "}
            {selectedAlcohol}.
          </p>
        )}

      {!loading &&
        !error &&
        cocktails.length > 0 && (
          <CocktailGrid
            cocktails={cocktails}
          />
        )}
    </Layout>
  );
}

export default SpiritOfChoice;