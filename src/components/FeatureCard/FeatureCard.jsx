import "./FeatureCard.css";

function FeatureCard({
  title,
  description,
  image,
  route,
}) {
  return (
    <article
      className="feature-card"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="overlay">

        <div className="card-content">

          <h2>{title}</h2>

          <p>{description}</p>

        </div>

      </div>
    </article>
  );
}

export default FeatureCard;