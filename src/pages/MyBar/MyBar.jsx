import { useEffect, useState } from "react";
import "./MyBar.css";

import Layout from "../../components/Layout/Layout";
import BottleSearch from "../../components/BottleSearch/BottleSearch";
import BottleCard from "../../components/BottleCard/BottleCard";
import CocktailMatch from "../../components/CocktailMatch/CocktailMatch";

import defaultBottles from "../../data/bottles";
import cocktails from "../../data/cocktails";

function MyBar() {
  const [bottles, setBottles] = useState([]);
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState([]);

  // Load saved bottles
  useEffect(() => {
    const saved = localStorage.getItem("myBar");

    if (saved) {
      setBottles(JSON.parse(saved));
    } else {
      setBottles(defaultBottles);
    }
  }, []);

  // Save whenever bottles change
  useEffect(() => {
    localStorage.setItem(
      "myBar",
      JSON.stringify(bottles)
    );
  }, [bottles]);

  // Automatically build cocktail matches
  useEffect(() => {
    const owned = bottles
      .filter((bottle) => bottle.owned)
      .map((bottle) => bottle.name);

    const results = cocktails.map((cocktail) => {
      const missing = cocktail.ingredients.filter(
        (ingredient) => !owned.includes(ingredient)
      );

      let status = "missing";

      if (missing.length === 0) {
        status = "can-make";
      } else if (missing.length === 1) {
        status = "almost";
      }

      return {
        cocktail,
        status,
        missing,
      };
    });

    results.sort((a, b) => {
      const order = {
        "can-make": 0,
        almost: 1,
        missing: 2,
      };

      return order[a.status] - order[b.status];
    });

    setMatches(results);
  }, [bottles]);

function addBottle(ingredient) {
  const exists = bottles.some(
    (bottle) =>
      bottle.name.toLowerCase() ===
      ingredient.name.toLowerCase()
  );

  if (exists) {
    setSearch("");
    return;
  }

  setBottles([
    ...bottles,
    {
      id: Date.now(),
      name: ingredient.name,
      category: ingredient.category,
      owned: true,
    },
  ]);

  setSearch("");
}

  function toggleOwned(id) {
    setBottles(
      bottles.map((bottle) =>
        bottle.id === id
          ? {
              ...bottle,
              owned: !bottle.owned,
            }
          : bottle
      )
    );
  }

  function removeBottle(id) {
    setBottles(
      bottles.filter(
        (bottle) => bottle.id !== id
      )
    );
  }

  return (
    <Layout
      title="My Bar"
      description="Manage the bottles you currently own."
    >
      <BottleSearch
        search={search}
        setSearch={setSearch}
        bottles={bottles}
        onAddBottle={addBottle}
      />

      <div className="bottle-grid">
        {bottles.map((bottle) => (
          <BottleCard
            key={bottle.id}
            bottle={bottle}
            onToggle={toggleOwned}
            onDelete={removeBottle}
          />
        ))}
      </div>

      {matches.length > 0 && (
        <section className="matches">
          <h2>Cocktails You Can Make</h2>

          {matches.map((match) => (
            <CocktailMatch
              key={match.cocktail.id}
              cocktail={match.cocktail}
              status={match.status}
              missing={match.missing}
            />
          ))}
        </section>
      )}
    </Layout>
  );
}

export default MyBar;