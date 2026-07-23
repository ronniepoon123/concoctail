import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import FeatureGrid from "../../components/FeatureGrid/FeatureGrid";

import hero from "../../assets/hero.png";

const cards = [
  {
    title: "My Bar",
    image: hero,
  },
  {
    title: "Collections",
    image: hero,
  },
  {
    title: "Favorites",
    image: hero,
  },
  {
    title: "Cocktail of the Day",
    image: hero,
  },
  {
    title: "Surprise Me",
    image: hero,
  },
  {
    title: "Cocktail 101",
    image: hero,
  },
  {
    title: "Shopping List",
    image: hero,
  },
];

function Home() {
  return (
    <main className="home">

      <Navbar />

      <Hero />

      <SearchBar />

      <FeatureGrid cards={cards} />

    </main>
  );
}

export default Home;