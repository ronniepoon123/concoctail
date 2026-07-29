import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./BackButton.css";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  /*
    Do not display the button on the home page.
  */

  if (location.pathname === "/") {
    return null;
  }

  function handleBack() {
    /*
      When the user has browser history,
      return to the previous page.

      When the page was opened directly,
      return to the home page instead.
    */

    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleBack}
      aria-label="Go back"
    >
      <span
        className="back-button-icon"
        aria-hidden="true"
      >
        ←
      </span>

      <span>Back</span>
    </button>
  );
}

export default BackButton;