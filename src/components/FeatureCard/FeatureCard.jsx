import "./FeatureCard.css";

function FeatureCard({ title, image }) {
  return (
    <article
      className="feature-card"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="overlay">

        <h2>{title}</h2>

      </div>
    </article>
  );
}

export default FeatureCard;