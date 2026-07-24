import "./FeatureCard.css";
import { Link } from "react-router-dom";

function FeatureCard({
  title,
  description,
  image,
  route,
}) {
  return (
    <Link
      to={route}
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

    </Link>
  );
}

export default FeatureCard;