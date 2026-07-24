import "./FeatureGrid.css";
import FeatureCard from "../FeatureCard/FeatureCard";

function FeatureGrid({ cards }) {
  return (
    <section className="feature-grid">
      {cards.map((card) => (
        <FeatureCard
          key={card.title}
          title={card.title}
          description={card.description}
          image={card.image}
          route={card.route}
        />
      ))}
    </section>
  );
}

export default FeatureGrid;