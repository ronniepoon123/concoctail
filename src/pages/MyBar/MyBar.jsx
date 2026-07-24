import { useEffect, useState } from "react";
import "./MyBar.css";

import Layout from "../../components/Layout/Layout";
import BottleSearch from "../../components/BottleSearch/BottleSearch";
import BottleSection from "../../components/BottleSection/BottleSection";
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

  // Group bottles by category
  const spirits = bottles.filter(
    (bottle) => bottle.category === "Spirits"
  );

  const liqueurs = bottles.filter(
    (bottle) => bottle.category === "Liqueurs"
  );

  const fortified = bottles.filter(
    (bottle) => bottle.category === "Fortified Wine"
  );

  const mixers = bottles.filter(
    (bottle) => bottle.category === "Mixers"
  );

  const bitters = bottles.filter(
    (bottle) => bottle.category === "Bitters"
  );

  const sparkling = bottles.filter(
    (bottle) => bottle.category === "Sparkling Wine"
  );

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

      <BottleSection
        title="🥃 Spirits"
        bottles={spirits}
        onToggle={toggleOwned}
        onDelete={removeBottle}
      />

      <BottleSection
        title="🍷 Liqueurs"
        bottles={liqueurs}
        onToggle={toggleOwned}
        onDelete={removeBottle}
      />

      <BottleSection
        title="🍾 Fortified Wine"
        bottles={fortified}
        onToggle={toggleOwned}
        onDelete={removeBottle}
      />

      <BottleSection
        title="🍋 Mixers"
        bottles={mixers}
        onToggle={toggleOwned}
        onDelete={removeBottle}
      />

      <BottleSection
        title="🌿 Bitters"
        bottles={bitters}
        onToggle={toggleOwned}
        onDelete={removeBottle}
      />

      <BottleSection
        title="🥂 Sparkling Wine"
        bottles={sparkling}
        onToggle={toggleOwned}
        onDelete={removeBottle}
      />

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