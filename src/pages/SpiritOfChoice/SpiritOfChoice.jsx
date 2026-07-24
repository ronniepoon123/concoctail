import { useMemo, useState } from "react";

import Layout from "../../components/Layout/Layout";
import CocktailGrid from "../../components/CocktailGrid/CocktailGrid";

import cocktails from "../../data/cocktails";

import "./SpiritOfChoice.css";

function SpiritOfChoice() {
  const [selectedSpirit, setSelectedSpirit] = useState("Gin");

  const spirits = useMemo(() => {
    return [...new Set(cocktails.map((c) => c.spirit))].sort();
  }, []);

  const filteredCocktails = useMemo(() => {
    return cocktails.filter(
      (cocktail) => cocktail.spirit === selectedSpirit
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
            onClick={() => setSelectedSpirit(spirit)}
          >
            {spirit}
          </button>
        ))}
      </div>

      <CocktailGrid cocktails={filteredCocktails} />
    </Layout>
  );
}

export default SpiritOfChoice;