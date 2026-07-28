import { Link } from "react-router-dom";

import "./LearnCard.css";

function LearnCard({ topic }) {
  const {
    title,
    description,
    icon,
    route,
  } = topic;

  return (
    <Link
      to={route}
      className="learn-card"
    >
      <div
        className="learn-icon"
        aria-hidden="true"
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </Link>
  );
}

export default LearnCard;