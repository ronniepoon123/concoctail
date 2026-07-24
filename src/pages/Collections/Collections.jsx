import { useMemo, useState } from "react";

import Layout from "../../components/Layout/Layout";
import CocktailGrid from "../../components/CocktailGrid/CocktailGrid";

import cocktails from "../../data/cocktails";
import collections from "../../data/collections";

import "./Collections.css";

function Collections() {

  const [selected, setSelected] = useState(
    collections[0]
  );

  const filteredCocktails = useMemo(() => {

    return cocktails.filter(

      cocktail =>

        cocktail.category === selected.category

    );

  }, [selected]);

  return (

    <Layout

      title="Collections"

      description="Browse curated cocktail collections."

    >

      <div className="collection-tabs">

        {

          collections.map(collection => (

            <button

              key={collection.id}

              className={

                selected.id === collection.id

                  ? "active"

                  : ""

              }

              onClick={() =>

                setSelected(collection)

              }

            >

              {collection.name}

            </button>

          ))

        }

      </div>

      <p className="collection-description">

        {selected.description}

      </p>

      <CocktailGrid

        cocktails={filteredCocktails}

      />

    </Layout>

  );

}

export default Collections;