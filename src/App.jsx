import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spirits from "./pages/Learn/Spirits";
import Home from "./pages/Home/Home";
import MyBar from "./pages/MyBar/MyBar";
import CocktailPage from "./pages/Cocktail/CocktailPage";
import IngredientPage from "./pages/Ingredient/IngredientPage";
import Collections from "./pages/Collections/Collections";
import Favourites from "./pages/Favourites/Favourites";
import CocktailDay from "./pages/CocktailDay/CocktailDay";
import Cocktail101 from "./pages/Cocktail101/Cocktail101";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import SpiritOfChoice from "./pages/SpiritOfChoice/SpiritOfChoice";
import Surprise from "./pages/Surprise/Surprise";


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
          path="/cocktail/:slug"
          element={<CocktailPage />}
        />

        <Route
          path="/ingredient/:slug"
          element={<IngredientPage />}
        />

        <Route
          path="/shopping-list"
          element={<ShoppingList />}
        />

<Route

  path="/learn/spirits"

  element={<Spirits />}

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
          path="/surprise"
          element={<Surprise />}
        />

        <Route
          path="/spirit-of-choice"
          element={<SpiritOfChoice />}
        />

        <Route
          path="/cocktail-101"
          element={<Cocktail101 />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;