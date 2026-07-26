import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import CocktailGrid from "../../components/CocktailGrid/CocktailGrid";

import cocktails from "../../data/cocktails";

import "./SpiritOfChoice.css";

function SpiritOfChoice() {

  const [searchParams] =
    useSearchParams();

  const spirits = useMemo(() => {

    return [

      ...new Set(

        cocktails.map(
          cocktail => cocktail.spirit
        )

      ),

    ].sort();

  }, []);

  const initialSpirit =
    searchParams.get("spirit") || "Gin";

  const [selectedSpirit, setSelectedSpirit] =
    useState(initialSpirit);

  useEffect(() => {

    const spirit =
      searchParams.get("spirit");

    if (

      spirit &&
      spirits.includes(spirit)

    ) {

      setSelectedSpirit(spirit);

    }

  }, [searchParams, spirits]);

  const filteredCocktails = useMemo(() => {

    return cocktails.filter(

      cocktail =>

        cocktail.spirit ===
        selectedSpirit

    );

  }, [selectedSpirit]);

  return (

    <Layout

      title="Spirit of Choice"

      description="Browse cocktails by base spirit."

    >

      <div className="spirit-tabs">

        {spirits.map((spirit) => (

          <button

            key={spirit}

            className={
              spirit === selectedSpirit
                ? "active"
                : ""
            }

            onClick={() =>
              setSelectedSpirit(spirit)
            }

          >

            {spirit}

          </button>

        ))}

      </div>

      <CocktailGrid
        cocktails={filteredCocktails}
      />

    </Layout>

  );

}

export default SpiritOfChoice;