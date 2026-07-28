import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import MyBar from "./pages/MyBar/MyBar";

import CocktailPage from "./pages/Cocktail/CocktailPage";
import IngredientPage from "./pages/Ingredient/IngredientPage";

import SpiritResults from "./pages/SpiritResults/SpiritResults";
import IngredientResults from "./pages/IngredientResults/IngredientResults";

import LearnTopic from "./pages/LearnTopic/LearnTopic";

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
        {/* ===========================================
            HOME
        =========================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ===========================================
            MY BAR
        =========================================== */}

        <Route
          path="/my-bar"
          element={<MyBar />}
        />

        {/* ===========================================
            COCKTAIL
        =========================================== */}

        <Route
          path="/cocktail/:id"
          element={<CocktailPage />}
        />

        {/* ===========================================
            INGREDIENT
        =========================================== */}

        <Route
          path="/ingredient/:slug"
          element={<IngredientPage />}
        />

        {/* ===========================================
            INTELLIGENT SEARCH PAGES
        =========================================== */}

        <Route
          path="/spirit/:spirit"
          element={<SpiritResults />}
        />

        <Route
          path="/ingredient-search/:ingredient"
          element={<IngredientResults />}
        />

        {/* ===========================================
            SHOPPING LIST
        =========================================== */}

        <Route
          path="/shopping-list"
          element={<ShoppingList />}
        />

        {/* ===========================================
            LEARN
        =========================================== */}

        <Route
          path="/learn/:topic"
          element={<LearnTopic />}
        />

        {/* ===========================================
            COLLECTIONS
        =========================================== */}

        <Route
          path="/collections"
          element={<Collections />}
        />

        {/* ===========================================
            FAVOURITES
        =========================================== */}

        <Route
          path="/favourites"
          element={<Favourites />}
        />

        {/* ===========================================
            COCKTAIL OF THE DAY
        =========================================== */}

        <Route
          path="/cocktail-of-the-day"
          element={<CocktailDay />}
        />

        {/* ===========================================
            SURPRISE
        =========================================== */}

        <Route
          path="/surprise"
          element={<Surprise />}
        />

        {/* ===========================================
            SPIRIT OF CHOICE
        =========================================== */}

        <Route
          path="/spirit-of-choice"
          element={<SpiritOfChoice />}
        />

        {/* ===========================================
            COCKTAIL 101
        =========================================== */}

        <Route
          path="/cocktail-101"
          element={<Cocktail101 />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;