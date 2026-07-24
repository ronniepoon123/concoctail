import "./RecommendationCard.css";

function RecommendationCard({
  recommendation,
  onAdd,
}) {
  return (
    <article className="recommendation-card">

      <div>

        <h3>

          ⭐ {recommendation.ingredient}

        </h3>

        <p>

          Unlocks{" "}
          {recommendation.score} cocktails

        </p>

        <ul>

          {recommendation.cocktails.map(
            (cocktail) => (
              <li key={cocktail}>
                {cocktail}
              </li>
            )
          )}

        </ul>

      </div>

      <button
        onClick={() =>
          onAdd(recommendation.ingredient)
        }
      >
        Add
      </button>

    </article>
  );
}

export default RecommendationCard;