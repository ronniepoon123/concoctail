import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";

import {
  getCategories,
  getCocktailsByCategory,
} from "../../services/cocktailService";

import "./Collections.css";

function Collections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCollections() {
      try {
        const categories = await getCategories();

        const firstSix = categories.slice(0, 6);

        const data = await Promise.all(
          firstSix.map(async (category) => {
            const cocktails =
              await getCocktailsByCategory(
                category.strCategory
              );

            return {
              title: category.strCategory,
              cocktails,
            };
          })
        );

        setSections(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCollections();
  }, []);

  if (loading) {
    return (
      <Layout
        title="Collections"
        description="Loading collections..."
      />
    );
  }

  return (
    <Layout
      title="Collections"
      description="Browse cocktails by category."
    >
      {sections.map((section) => (
        <section
          key={section.title}
          className="collection-section"
        >
          <h2>{section.title}</h2>

          <div className="collection-grid">
            {section.cocktails.map((cocktail) => (
              <a
                key={cocktail.idDrink}
                className="collection-card"
                href={`/cocktail/${cocktail.strDrink
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                />

                <h3>{cocktail.strDrink}</h3>
              </a>
            ))}
          </div>
        </section>
      ))}
    </Layout>
  );
}

export default Collections;