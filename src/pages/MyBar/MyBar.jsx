import {
  useEffect,
  useState,
} from "react";

import "./MyBar.css";

import Layout from "../../components/Layout/Layout";
import BottleSearch from "../../components/BottleSearch/BottleSearch";
import BottleSection from "../../components/BottleSection/BottleSection";
import CocktailMatch from "../../components/CocktailMatch/CocktailMatch";

import defaultBottles from "../../data/bottles";
import cocktails from "../../data/cocktails";

function normaliseIngredientName(value = "") {
  return value
    .toLowerCase()
    .trim();
}

function MyBar() {
  const [bottles, setBottles] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [matches, setMatches] =
    useState([]);

  const [barLoaded, setBarLoaded] =
    useState(false);

  /* ===========================================
     LOAD SAVED BOTTLES
  =========================================== */

  useEffect(() => {
    const saved =
      localStorage.getItem("myBar");

    if (saved) {
      try {
        const parsedBottles =
          JSON.parse(saved);

        setBottles(
          Array.isArray(parsedBottles)
            ? parsedBottles
            : defaultBottles
        );
      } catch (error) {
        console.error(
          "Failed to load My Bar:",
          error
        );

        setBottles(defaultBottles);
      }
    } else {
      setBottles(defaultBottles);
    }

    setBarLoaded(true);
  }, []);

  /* ===========================================
     SAVE BOTTLES

     Also remove owned bottles from the
     Shopping List.
  =========================================== */

  useEffect(() => {
    if (!barLoaded) {
      return;
    }

    localStorage.setItem(
      "myBar",
      JSON.stringify(bottles)
    );

    const ownedNames = bottles
      .filter(
        (bottle) => bottle.owned
      )
      .map((bottle) =>
        normaliseIngredientName(
          bottle.name
        )
      );

    let shoppingList = [];

    try {
      const savedShopping =
        localStorage.getItem(
          "shoppingList"
        );

      shoppingList = savedShopping
        ? JSON.parse(savedShopping)
        : [];
    } catch (error) {
      console.error(
        "Failed to load Shopping List:",
        error
      );
    }

    const updatedShopping =
      shoppingList.filter(
        (item) =>
          !ownedNames.includes(
            normaliseIngredientName(
              item.name
            )
          )
      );

    localStorage.setItem(
      "shoppingList",
      JSON.stringify(
        updatedShopping
      )
    );
  }, [bottles, barLoaded]);

  /* ===========================================
     BUILD COCKTAIL MATCHES
  =========================================== */

  useEffect(() => {
    const ownedNames = bottles
      .filter(
        (bottle) => bottle.owned
      )
      .map((bottle) =>
        normaliseIngredientName(
          bottle.name
        )
      );

    const results = cocktails.map(
      (cocktail) => {
        const missing =
          cocktail.ingredients.filter(
            (ingredient) =>
              !ownedNames.includes(
                normaliseIngredientName(
                  ingredient
                )
              )
          );

        let status = "missing";

        if (missing.length === 0) {
          status = "can-make";
        } else if (
          missing.length === 1
        ) {
          status = "almost";
        }

        return {
          cocktail,
          status,
          missing,
        };
      }
    );

    const statusOrder = {
      "can-make": 0,
      almost: 1,
      missing: 2,
    };

    results.sort((a, b) => {
      const statusDifference =
        statusOrder[a.status] -
        statusOrder[b.status];

      if (statusDifference !== 0) {
        return statusDifference;
      }

      return (
        a.missing.length -
        b.missing.length
      );
    });

    setMatches(results);
  }, [bottles]);

  /* ===========================================
     ADD BOTTLE
  =========================================== */

  function addBottle(ingredient) {
    const exists = bottles.some(
      (bottle) =>
        normaliseIngredientName(
          bottle.name
        ) ===
        normaliseIngredientName(
          ingredient.name
        )
    );

    if (exists) {
      setSearch("");
      return;
    }

    const newBottle = {
      id:
        ingredient.id ||
        `${Date.now()}-${Math.random()}`,

      name: ingredient.name,

      category:
        ingredient.category ||
        "Other",

      owned: true,
    };

    setBottles((currentBottles) => [
      ...currentBottles,
      newBottle,
    ]);

    setSearch("");
  }

  /* ===========================================
     TOGGLE OWNED
  =========================================== */

  function toggleOwned(id) {
    setBottles((currentBottles) =>
      currentBottles.map(
        (bottle) =>
          bottle.id === id
            ? {
                ...bottle,
                owned:
                  !bottle.owned,
              }
            : bottle
      )
    );
  }

  /* ===========================================
     REMOVE BOTTLE
  =========================================== */

  function removeBottle(id) {
    setBottles((currentBottles) =>
      currentBottles.filter(
        (bottle) =>
          bottle.id !== id
      )
    );
  }

  /* ===========================================
     ADD MISSING INGREDIENTS TO SHOPPING LIST
  =========================================== */

  function addToShoppingList(
    missingIngredients
  ) {
    let savedShopping = [];

    try {
      const storedShopping =
        localStorage.getItem(
          "shoppingList"
        );

      savedShopping = storedShopping
        ? JSON.parse(storedShopping)
        : [];
    } catch (error) {
      console.error(
        "Failed to load Shopping List:",
        error
      );
    }

    const existingNames =
      savedShopping.map((item) =>
        normaliseIngredientName(
          item.name
        )
      );

    const newItems =
      missingIngredients
        .filter(
          (ingredient) =>
            !existingNames.includes(
              normaliseIngredientName(
                ingredient
              )
            )
        )
        .map((ingredient) => ({
          id:
            `${Date.now()}-${Math.random()}`,

          name: ingredient,

          bought: false,
        }));

    localStorage.setItem(
      "shoppingList",
      JSON.stringify([
        ...savedShopping,
        ...newItems,
      ])
    );

    alert(
      "Added to Shopping List"
    );
  }

  /* ===========================================
     GROUP BOTTLES
  =========================================== */

  const spirits = bottles.filter(
    (bottle) =>
      bottle.category ===
      "Spirits"
  );

  const liqueurs = bottles.filter(
    (bottle) =>
      bottle.category ===
      "Liqueurs"
  );

  const aperitifs = bottles.filter(
    (bottle) =>
      bottle.category ===
      "Aperitifs"
  );

  const fortified = bottles.filter(
    (bottle) =>
      bottle.category ===
      "Fortified Wine"
  );

  const mixers = bottles.filter(
    (bottle) =>
      bottle.category ===
      "Mixers"
  );

  const bitters = bottles.filter(
    (bottle) =>
      bottle.category ===
      "Bitters"
  );

  const sparkling = bottles.filter(
    (bottle) =>
      bottle.category ===
      "Sparkling Wine"
  );

  const otherBottles =
    bottles.filter(
      (bottle) =>
        ![
          "Spirits",
          "Liqueurs",
          "Aperitifs",
          "Fortified Wine",
          "Mixers",
          "Bitters",
          "Sparkling Wine",
        ].includes(
          bottle.category
        )
    );

  return (
    <Layout
      title="My Bar"
      description="Manage the bottles you currently own."
    >
      <BottleSearch
        search={search}
        setSearch={setSearch}
        ownedBottles={bottles}
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
        title="🍹 Aperitifs"
        bottles={aperitifs}
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

      <BottleSection
        title="📦 Other"
        bottles={otherBottles}
        onToggle={toggleOwned}
        onDelete={removeBottle}
      />

      {matches.length > 0 && (
        <section className="matches">
          <h2>
            Cocktails You Can Make
          </h2>

          {matches.map(
            (match) => (
              <CocktailMatch
                key={
                  match.cocktail.id
                }
                cocktail={
                  match.cocktail
                }
                status={
                  match.status
                }
                missing={
                  match.missing
                }
                onAddMissing={
                  addToShoppingList
                }
              />
            )
          )}
        </section>
      )}
    </Layout>
  );
}

export default MyBar;