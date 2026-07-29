import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Layout from "../../components/Layout/Layout";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

import {
  getRandomCocktail,
} from "../../services/cocktailService";

import "./Surprise.css";

function Surprise() {
  const [cocktail, setCocktail] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadRandomCocktail =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getRandomCocktail();

        setCocktail(result);
      } catch (requestError) {
        console.error(
          "Failed to load random cocktail:",
          requestError
        );

        setError(
          "Unable to load a cocktail."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadRandomCocktail();
  }, [loadRandomCocktail]);

  return (
    <Layout
      title="Surprise Me"
      description="Can't decide? Let us choose for you."
    >
      <div className="surprise-page">

        {loading && (
          <p className="surprise-status">
            Choosing a cocktail...
          </p>
        )}

        {!loading && error && (
          <div className="surprise-status">

            <p>{error}</p>

            <button
              type="button"
              className="surprise-btn"
              onClick={loadRandomCocktail}
            >
              Try Again
            </button>

          </div>
        )}

        {!loading &&
          !error &&
          cocktail && (
            <>

              <CocktailCard
                cocktail={cocktail}
              />

              <button
                type="button"
                className="surprise-btn"
                onClick={loadRandomCocktail}
              >
                🎲 Another Surprise
              </button>

            </>
          )}

      </div>
    </Layout>
  );
}

export default Surprise;