import myBar from "../assets/cards/mybar.jpg";
import collections from "../assets/cards/collections.jpg";
import favourites from "../assets/cards/favourites.jpg";
import cocktailDay from "../assets/cards/cocktailday.jpg";
import surprise from "../assets/cards/surprise.jpg";
import cocktail101 from "../assets/cards/cocktail101.jpg";
import shopping from "../assets/cards/shopping.jpg";

const featureCards = [
  {
    id: 1,
    title: "My Bar",
    description: "Manage your ingredients",
    image: myBar,
    route: "/my-bar",
  },
  {
    id: 2,
    title: "Collections",
    description: "Browse curated cocktails",
    image: collections,
    route: "/collections",
  },
  {
    id: 3,
    title: "Favorites",
    description: "Your saved recipes",
    image: favourites,
    route: "/favorites",
  },
  {
    id: 4,
    title: "Cocktail of the Day",
    description: "Today's featured drink",
    image: cocktailDay,
    route: "/cocktail-of-the-day",
  },
  {
    id: 5,
    title: "Surprise Me",
    description: "Find something unexpected",
    image: surprise,
    route: "/random",
  },
  {
    id: 6,
    title: "Cocktail 101",
    description: "Learn the fundamentals",
    image: cocktail101,
    route: "/learn",
  },
  {
    id: 7,
    title: "Shopping List",
    description: "Never forget an ingredient",
    image: shopping,
    route: "/shopping-list",
  },
];

export default featureCards;