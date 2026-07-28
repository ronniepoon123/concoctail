import myBarImage from "../assets/feature-cards/my-bar.jpg";
import spiritImage from "../assets/feature-cards/spirit-of-choice.jpg";
import collectionsImage from "../assets/feature-cards/collections.jpg";
import favouritesImage from "../assets/feature-cards/favourites.jpg";
import cocktailDayImage from "../assets/feature-cards/cocktail-day.jpg";
import surpriseImage from "../assets/feature-cards/surprise.jpg";
import cocktail101Image from "../assets/feature-cards/cocktail-101.jpg";
import shoppingListImage from "../assets/feature-cards/shopping-list.jpg";

const featureCards = [
  {
    id: 1,
    title: "My Bar",
    description: "Manage your ingredients",
    image: myBarImage,
    route: "/my-bar",
  },

  {
    id: 2,
    title: "Spirit of Choice",
    description: "Choose your base spirit",
    image: spiritImage,
    route: "/spirit-of-choice",
  },

  {
    id: 3,
    title: "Collections",
    description: "Browse curated cocktails",
    image: collectionsImage,
    route: "/collections",
  },

  {
    id: 4,
    title: "Favourites",
    description: "Your saved recipes",
    image: favouritesImage,
    route: "/favourites",
  },

  {
    id: 5,
    title: "Cocktail of the Day (or Night)",
    description: "Today's featured drink",
    image: cocktailDayImage,
    route: "/cocktail-of-the-day",
  },

  {
    id: 6,
    title: "Surprise Me",
    description: "Discover a random cocktail",
    image: surpriseImage,
    route: "/surprise",
  },

  {
    id: 7,
    title: "Cocktail 101",
    description: "Learn the fundamentals",
    image: cocktail101Image,
    route: "/cocktail-101",
  },

  {
    id: 8,
    title: "Shopping List",
    description: "Never forget an ingredient",
    image: shoppingListImage,
    route: "/shopping-list",
  },
];

export default featureCards;