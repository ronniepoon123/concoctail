import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import MyBar from "./pages/MyBar/MyBar";
import Collections from "./pages/Collections/Collections";
import Favourites from "./pages/Favourites/Favourites";
import CocktailDay from "./pages/CocktailDay/CocktailDay";
import Cocktail101 from "./pages/Cocktail101/Cocktail101";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import SpiritOfChoice from "./pages/SpiritOfChoice/SpiritOfChoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/my-bar"
          element={<MyBar />}
        />

        <Route
          path="/collections"
          element={<Collections />}
        />

        <Route
          path="/favourites"
          element={<Favourites />}
        />

        <Route
          path="/cocktail-of-the-day"
          element={<CocktailDay />}
        />

        <Route
          path="/spirit-of-choice"
          element={<SpiritOfChoice />}
        />

        <Route
          path="/learn"
          element={<Cocktail101 />}
        />

        <Route
          path="/shopping-list"
          element={<ShoppingList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;