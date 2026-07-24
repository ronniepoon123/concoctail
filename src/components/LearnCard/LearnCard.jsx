import { Link } from "react-router-dom";

import "./LearnCard.css";

function LearnCard({ topic }) {

  return (

    <Link
      to={topic.route}
      className="learn-card"
    >

      <div className="learn-icon">
        {topic.icon}
      </div>

      <h3>{topic.title}</h3>

      <p>{topic.description}</p>

    </Link>

  );

}

export default LearnCard;