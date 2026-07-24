import { Link } from "react-router-dom";
import "./Layout.css";

function Layout({ title, description, children }) {
  return (
    <main className="page-layout">
      <header className="page-header">
        <Link to="/" className="brand-link">
          <h2>Concoctail</h2>
        </Link>

        <p>Cocktails made simple.</p>
      </header>

      <section className="page-intro">
        <h1>{title}</h1>

        <p>{description}</p>
      </section>

      <section className="page-content">
        {children}
      </section>
    </main>
  );
}

export default Layout;