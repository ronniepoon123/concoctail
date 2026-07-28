import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import FeatureGrid from "../../components/FeatureGrid/FeatureGrid";
import featureCards from "../../data/featureCards";

function Home() {
  return (
    <main className="home">
      <Navbar />

      <Hero />

      <FeatureGrid
        cards={featureCards}
      />
    </main>
  );
}

export default Home;