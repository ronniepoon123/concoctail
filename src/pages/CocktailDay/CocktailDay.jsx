import {
  useEffect,
  useState,
} from "react";

import Layout from "../../components/Layout/Layout";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import "./CocktailDay.css";
import {
  getRandomCocktail,
} from "../../services/cocktailService";

const STORAGE_KEY =
  "cocktailOfTheDay";

const MAX_RANDOM_ATTEMPTS = 10;

/* ===========================================
   CHECK WHETHER DRINK IS ALCOHOLIC
=========================================== */

function isAlcoholicCocktail(cocktail) {
  if (!cocktail) {
    return false;
  }

  return (
    cocktail.strAlcoholic ===
      "Alcoholic" ||
    cocktail.alcoholic === true ||
    cocktail.alcoholic ===
      "Alcoholic"
  );
}

/* ===========================================
   FETCH RANDOM ALCOHOLIC COCKTAIL
=========================================== */

async function getRandomAlcoholicCocktail() {
  for (
    let attempt = 1;
    attempt <= MAX_RANDOM_ATTEMPTS;
    attempt += 1
  ) {
    const cocktail =
      await getRandomCocktail();

    if (
      isAlcoholicCocktail(cocktail)
    ) {
      return cocktail;
    }
  }

  throw new Error(
    "Unable to find an alcoholic cocktail."
  );
}

function CocktailDay() {
  const [
    cocktail,
    setCocktail,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCocktail() {
      try {
        setLoading(true);
        setError("");

        const today =
          new Date().toDateString();

        const savedCocktail =
          localStorage.getItem(
            STORAGE_KEY
          );

        /* -----------------------------------
           USE VALID SAVED COCKTAIL
        ----------------------------------- */

        if (savedCocktail) {
          try {
            const parsed =
              JSON.parse(
                savedCocktail
              );

            const isToday =
              parsed.date === today;

            const isAlcoholic =
              isAlcoholicCocktail(
                parsed.cocktail
              );

            if (
              isToday &&
              isAlcoholic
            ) {
              if (!cancelled) {
                setCocktail(
                  parsed.cocktail
                );
              }

              return;
            }

            /*
              Remove stale or non-alcoholic
              saved drinks.
            */

            localStorage.removeItem(
              STORAGE_KEY
            );
          } catch {
            /*
              Remove malformed saved JSON rather
              than allowing it to break the page.
            */

            localStorage.removeItem(
              STORAGE_KEY
            );
          }
        }

        /* -----------------------------------
           FETCH NEW ALCOHOLIC COCKTAIL
        ----------------------------------- */

        const drink =
          await getRandomAlcoholicCocktail();

        if (cancelled) {
          return;
        }

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            date: today,
            cocktail: drink,
          })
        );

        setCocktail(drink);
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load cocktail of the day:",
          requestError
        );

        setCocktail(null);

        setError(
          "Unable to load today's cocktail."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCocktail();

    return () => {
      cancelled = true;
    };
  }, []);

return (
  <Layout
    title="Cocktail of the Day"
    description={
      loading
        ? "Selecting today's cocktail..."
        : "Today's featured cocktail."
    }
  >
    {loading && (
      <p className="empty-message">
        Loading cocktail...
      </p>
    )}

    {!loading && error && (
      <p className="empty-message">
        {error}
      </p>
    )}

    {!loading &&
      !error &&
      cocktail && (
        <div className="cocktail-day">
          <CocktailCard
            cocktail={cocktail}
          />
        </div>
      )}
  </Layout>
);
}

export default CocktailDay;