import "./BottleSection.css";
import BottleCard from "../BottleCard/BottleCard";

function BottleSection({
  title,
  bottles,
  onToggle,
  onDelete,
}) {
  if (bottles.length === 0) return null;

  return (
    <section className="bottle-section">
      <h2 className="section-title">
        {title}
        <span>{bottles.length}</span>
      </h2>

      <div className="bottle-grid">
        {bottles.map((bottle) => (
          <BottleCard
            key={bottle.id}
            bottle={bottle}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default BottleSection;