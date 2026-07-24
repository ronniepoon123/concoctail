import "./BottleCard.css";

function BottleCard({
  bottle,
  onToggle,
  onDelete,
}) {
  return (
    <article className="bottle-card">
      <div className="bottle-header">
        <h3>{bottle.name}</h3>

        <span className="category">
          {bottle.category}
        </span>
      </div>

      <div className="bottle-actions">
        <button
          onClick={() => onToggle(bottle.id)}
        >
          {bottle.owned
            ? "✓ Owned"
            : "Not Owned"}
        </button>

        <button
          className="delete"
          onClick={() => onDelete(bottle.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default BottleCard;