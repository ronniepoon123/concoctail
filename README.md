# Concoctail

Concoctail is a full-stack cocktail discovery and home-bar web application built with React, JavaScript, Node.js, and Express.

The application helps users discover cocktails, search ingredients and drink-related products, save favourites, manage a personal bottle inventory, build a shopping list, and learn cocktail-making fundamentals through a dedicated Cocktail 101 section.

## Live Application

- Frontend: https://concoctail.vercel.app
- Backend: https://concoctail.onrender.com

> The backend may take some time to respond after inactivity (as it is hosted on a free-tier Render service.)

---

## Project Overview

Concoctail combines a React frontend with an Express backend.

The frontend handles the user interface, routing, browser state, local persistence, and presentation of cocktail data. The backend provides REST API routes, communicates with external cocktail data sources, searches a consolidated ingredient and alcohol library, normalises responses, and returns consistent JSON to the frontend.

### Main goals

- Make cocktail discovery simple and visually clear
- Provide useful search across cocktails, spirits, modifiers, and ingredients
- Help users track bottles and ingredients they already own
- Show which cocktails can be made from the user's inventory
- Allow users to save favourites and shopping-list items
- Provide beginner-friendly cocktail education
- Demonstrate full-stack development, API integration, routing, state management, deployment, and responsive design

---

## Features

### Intelligent Search

Users can search for:

- Cocktails
- Spirits
- Liqueurs
- Aperitifs
- Vermouths
- Bitters
- Ingredients
- Non-alcoholic ingredients and drinks where available

Results are grouped by type and sorted by relevance. The search system can also support aliases and common brand-related terms where mappings exist.

### Cocktail Detail Pages

Each cocktail page can display:

- Cocktail name
- Image
- Description or tagline
- Category
- Base spirit
- Strength
- Difficulty
- Glassware
- Ingredient measurements
- Preparation instructions
- Garnish
- Owned and missing ingredients

Cocktails can be opened using either a numeric cocktail ID or a name-based URL slug.

### Surprise Me

The Surprise Me page retrieves a random cocktail from the backend rather than choosing only from the smaller local `cocktails.js` dataset.

Users can request another random cocktail without leaving the page.

### Cocktail of the Day

The Cocktail of the Day feature:

- Retrieves a random cocktail
- Saves it in `localStorage`
- Keeps the same cocktail for the current date
- Selects a new cocktail on a new day

### Favourites

Users can save or remove cocktails from their favourites. Favourite data is stored in `localStorage`, so it remains available after refreshing the browser.

### My Bar

My Bar lets users:

- Search for bottles and ingredients
- Add owned bottles
- Group bottles by category
- Mark bottles as owned or not owned
- Remove bottles
- Store inventory in `localStorage`
- Compare owned ingredients with cocktail recipes
- See which cocktails can be made
- See which cocktails are almost possible
- Add missing ingredients to the shopping list

Typical categories include:

- Spirits
- Liqueurs
- Aperitifs
- Fortified Wine
- Bitters
- Mixers
- Sparkling Wine
- Other

The application does not assume every result is alcoholic. Non-alcoholic results, such as chocolate milk, may also exist in the available data.

### Shopping List

Users can:

- Add missing cocktail ingredients
- Mark items as completed
- Remove or clear items
- Store the list in `localStorage`

When an ingredient becomes owned in My Bar, matching shopping-list items can be removed automatically.

### Spirit of Choice

Users can select a spirit or alcohol-related ingredient and view cocktails containing it.

### Ingredient Results

Search results can open a dynamic ingredient page showing cocktails that contain the selected ingredient.

### Collections

The application includes curated cocktail collections for easier browsing.

### Cocktail 101

Cocktail 101 is a reusable, data-driven learning section covering topics such as:

- Spirits
- Liqueurs
- Fortified wines
- Mixers
- Glassware
- Garnishes
- Techniques
- Measurements

A dynamic route is used instead of creating a separate React component for every topic.

Example routes:

```text
/learn/glassware
/learn/techniques
/learn/measurements
```

---

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- JSX
- CSS
- React Router
- Fetch API
- Browser `localStorage`

### Backend

- Node.js
- Express.js
- REST API routes
- CORS
- External cocktail data integration
- Local JSON-based search libraries
- Environment variables

### Deployment and Version Control

- Git
- GitHub
- Vercel
- Render

---

## Project Structure

A simplified project structure is shown below:

```text
concoctail/
├── public/
├── server/
│   ├── data/
│   │   └── spirits.json
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── ...
├── src/
│   ├── assets/
│   │   └── glassware/
│   ├── components/
│   │   ├── BottleSearch/
│   │   ├── BottleSection/
│   │   ├── CocktailCard/
│   │   ├── CocktailGrid/
│   │   ├── CocktailMatch/
│   │   ├── Layout/
│   │   ├── Navbar/
│   │   └── Searchbar/
│   ├── data/
│   │   ├── cocktails.js
│   │   ├── ingredients.js
│   │   ├── lessonContent.js
│   │   └── ...
│   ├── pages/
│   │   ├── Cocktail101/
│   │   ├── CocktailDay/
│   │   ├── CocktailPage/
│   │   ├── Collections/
│   │   ├── Favourites/
│   │   ├── Home/
│   │   ├── IngredientResults/
│   │   ├── LearnTopic/
│   │   ├── MyBar/
│   │   ├── ShoppingList/
│   │   ├── SpiritOfChoice/
│   │   └── Surprise/
│   ├── services/
│   │   └── cocktailService.js
│   ├── utils/
│   │   ├── favourites.js
│   │   ├── mapCocktail.js
│   │   └── shoppingList.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

The exact filenames may change as the project develops.

---

## Frontend Architecture

### Pages

Pages represent full routes in the application, such as:

- Home
- Cocktail detail
- Surprise Me
- Cocktail of the Day
- My Bar
- Shopping List
- Cocktail 101
- Ingredient results
- Spirit of Choice

### Components

Components are reusable parts of the interface, such as:

- `Navbar`
- `SearchBar`
- `CocktailCard`
- `CocktailGrid`
- `CocktailMatch`
- `BottleSearch`
- `BottleSection`
- `Layout`

### Service Layer

The frontend service layer contains functions that communicate with the backend.

```js
const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3001/api";

export async function getRandomCocktail() {
  const response = await fetch(
    `${API}/random`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch random cocktail"
    );
  }

  return await response.json();
}
```

This keeps request logic separate from page components.

### Utility Functions

Utility files handle reusable browser-side logic such as:

- Saving favourites
- Managing shopping-list items
- Mapping cocktail data
- Converting measurements
- Normalising values

---

## Backend Architecture

The Express backend acts as the application's API layer.

Its responsibilities include:

- Receiving requests from the React frontend
- Fetching cocktail data
- Searching local libraries
- Mapping external data into a consistent format
- Returning JSON
- Managing CORS
- Reading environment variables
- Keeping third-party integration details out of React components

### Example request flow

```text
User action
→ React component
→ frontend service function
→ Express route
→ backend service or external data source
→ mapped JSON response
→ React state update
→ interface re-render
```

---

## API Endpoints

The backend currently supports routes similar to the following:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/random` | Return a random cocktail |
| GET | `/api/search?q=gin` | Search cocktails, spirits, and ingredients |
| GET | `/api/cocktail/:name` | Return a cocktail by name |
| GET | `/api/cocktail/id/:id` | Return a cocktail by numeric ID |
| GET | `/api/ingredient/:ingredient` | Return cocktails containing an ingredient |
| GET | `/api/base-spirit/:spirit` | Return cocktails matching a spirit or alcohol ingredient |
| GET | `/api/category/:category` | Return cocktails by category |
| GET | `/api/categories` | Return the category list |
| GET | `/api/glasses` | Return the glassware list |
| GET | `/api/latest` | Return recently added cocktails where supported |
| GET | `/api/popular` | Return popular cocktails where supported |

Actual route availability depends on the current backend implementation and external data-source support.

---

## Cocktail Data Mapping

External cocktail APIs may return fields such as:

```text
idDrink
strDrink
strCategory
strAlcoholic
strGlass
strInstructions
strDrinkThumb
strIngredient1
strMeasure1
```

The application maps these into a cleaner frontend model:

```js
{
  id,
  name,
  category,
  alcoholic,
  glass,
  instructions,
  image,
  ingredients,
  ingredientDetails
}
```

This prevents React components from needing to understand every external field name.

### Measurement handling

Ingredient measurements can be converted from fluid ounces into millilitres. The mapper may preserve both the converted display value and the original API measurement.

Non-standard measurements such as `shot`, `dash`, or `splash` may remain unchanged.

---

## React Concepts Demonstrated

### `useState`

`useState` stores values that change while the user interacts with the application.

Examples:

- Search text
- Search results
- Loading state
- Error messages
- Selected cocktail
- Favourite status
- Owned bottles
- Shopping-list items

```js
const [cocktail, setCocktail] =
  useState(null);
```

`cocktail` stores the current value. `setCocktail` updates it and causes React to render the component again.

### `useEffect`

`useEffect` runs side-effect logic when a component loads or when a dependency changes.

Examples:

- Fetching a cocktail when the route ID changes
- Running a search when the query changes
- Loading saved `localStorage` data
- Saving My Bar after inventory changes
- Updating cocktail matches after owned bottles change

### Props

Props pass data and functions from a parent component to a child component.

```jsx
<CocktailCard cocktail={cocktail} />
```

The `cocktail` object is passed into `CocktailCard`.

### Conditional Rendering

```jsx
{loading && (
  <p>Loading...</p>
)}

{error && (
  <p>{error}</p>
)}

{cocktail && (
  <CocktailCard cocktail={cocktail} />
)}
```

### React Router

React Router handles navigation without fully reloading the browser.

Example routes:

```text
/cocktail/11007
/cocktail/margarita
/ingredient-search/gin
/learn/glassware
```

---

## Local Storage

Concoctail uses `localStorage` for browser-based persistence.

Stored information may include:

- Favourites
- My Bar inventory
- Shopping-list items
- Cocktail of the Day
- Date of the current daily cocktail

```js
localStorage.setItem(
  "myBar",
  JSON.stringify(bottles)
);
```

Because this data is stored only in the browser:

- It remains after refreshing
- It is tied to that browser and device
- It is not shared automatically across devices
- Clearing browser data removes it

A future account system and database could support cross-device persistence.

---

## Responsive Design

The application contains mobile-specific CSS using media queries.

```css
@media (max-width: 650px) {
  .back-button {
    top: calc(
      env(safe-area-inset-top, 0px) +
      12px
    );
  }
}
```

This rule applies when the browser viewport is 650 pixels wide or narrower.

Responsive improvements include:

- Stacked mobile navigation
- Smaller padding and text
- Mobile-friendly cards
- Sticky back buttons
- Safe-area spacing for mobile Safari
- Full-width mobile buttons
- Resized cocktail images

---

## CORS

The frontend and backend are deployed on different domains. The backend therefore uses CORS to allow approved frontend origins.

```js
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);
```

Production environment variable:

```text
FRONTEND_URL=https://concoctail.vercel.app
```

This allows the Vercel frontend to communicate with the Render backend.

---

## Environment Variables

### Frontend `.env`

```env
VITE_API_URL=http://localhost:3001/api
```

For Vercel:

```env
VITE_API_URL=https://concoctail.onrender.com/api
```

Vite exposes only environment variables beginning with `VITE_` to frontend code.

Never place private API keys in frontend environment variables because users can inspect frontend code in the browser.

### Backend `.env`

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
```

For Render:

```env
FRONTEND_URL=https://concoctail.vercel.app
```

Any private external API key should remain in the backend environment only.

### `.gitignore`

```gitignore
.env
.env.local
node_modules
dist
```

Do not commit private keys or production secrets to GitHub.

---

## Local Development

### Requirements

Install:

- Node.js
- npm
- Git

### Clone the repository

```bash
git clone <your-repository-url>
cd concoctail
```

### Install dependencies

```bash
npm install
```

### Start the frontend

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

### Start the backend

Depending on the scripts configured in `package.json`, use one of the following:

```bash
node server/server.js
```

or:

```bash
npm run server
```

The backend normally runs at:

```text
http://localhost:3001
```

Both frontend and backend should be running during local development when a page requires backend data.

---

## Deployment

### Frontend deployment with Vercel

The frontend is connected to GitHub. After changes are pushed to the `main` branch, Vercel automatically starts a new deployment.

A `vercel.json` rewrite is used so React Router routes work when opened or refreshed directly:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Without this rewrite, a route such as `/cocktail/11007` may return a Vercel 404 after a browser refresh.

### Backend deployment with Render

The Express backend is deployed separately on Render.

Render should be configured with:

- The backend start command
- Required environment variables
- Automatic deployment from GitHub where enabled

After Vercel provides the frontend production URL, set this in Render:

```env
FRONTEND_URL=https://concoctail.vercel.app
```

Then redeploy the backend so the CORS allowlist accepts the production frontend.

---

## Git Workflow

```bash
git status
git add .
git commit -m "Describe the change"
git push origin main
```

### What each stage updates

```text
Save file
→ updates local code and localhost

Git commit
→ records the change in local Git history

Git push
→ sends the commit to GitHub

Vercel deployment
→ updates the live frontend

Render deployment
→ updates the live backend
```

A frontend-only change normally requires Vercel to redeploy. A backend-only change normally requires Render to redeploy. A change involving both requires both deployments.

---

## Frontend, Backend, or Both?

### Frontend changes

Examples:

- CSS
- Mobile layout
- Button text
- React components
- Page structure
- Loading messages
- Displaying fields already returned by the backend
- Client-side routing
- Browser `localStorage` logic

### Backend changes

Examples:

- New Express routes
- Changed API response logic
- External API calls
- Data mapping
- Search aliases
- CORS configuration
- API keys
- Server-side filtering

### Both

Examples:

- Adding a new backend endpoint and displaying its results
- Returning a new data field and adding it to a React component
- Introducing a new search category
- Adding user accounts and database-backed favourites

---

## Problems Solved During Development

### CORS errors

The frontend and backend were running on different origins. The backend was updated to allow approved origins through CORS configuration.

### Vercel refresh 404

Directly opening or refreshing a React Router route returned a 404. This was fixed with a Vercel rewrite to `index.html`.

### Limited Surprise Me results

The original Surprise Me page selected cocktails from the small local `cocktails.js` array. It was changed to call the backend `/api/random` route so it could use a wider catalogue.

### Search aliases being removed

The backend could return alias-related matches, but an additional frontend `includes()` filter removed them. The frontend was adjusted to trust the backend result list and sort it by relevance instead.

### LocalStorage being overwritten

An initial empty React state could overwrite saved My Bar data before loading completed. A loaded-state guard was introduced so saved inventory is loaded before later updates are written.

### Inconsistent API data

External API fields and measurements were inconsistent. A mapping layer was introduced to provide a predictable object structure to React components.

### Mobile layout issues

Responsive CSS was added for:

- Navbar content
- Tagline visibility
- Sticky back-button spacing
- Mobile safe areas
- Card widths
- Images
- Button sizing

### Generic category labels

The external dataset sometimes labels cocktails as `Ordinary Drink`. The UI can hide this label where it does not add useful information while preserving more meaningful categories.

---

## Current Limitations

- Some features use local cocktail data while others use remote backend data
- My Bar matching may not yet use the complete remote cocktail catalogue
- Ingredient aliases are not fully normalised
- Equivalent ingredient names may not always match correctly
- Favourites stored from remote results may require additional fetching or full-object storage
- Data is stored only in `localStorage`
- There are no user accounts
- Data is not synchronised across devices
- Automated tests are not yet implemented
- External API availability and rate limits may affect results
- Non-alcoholic classification can be improved
- Render free-tier cold starts may delay the first request

---

## Future Improvements

- Add a shared ingredient-normalisation utility
- Support whisky and whiskey aliases consistently
- Treat equivalent ingredients as matches
- Expand My Bar matching to the complete backend catalogue
- Add alcoholic and non-alcoholic filters
- Improve non-alcoholic ingredient categorisation
- Add user authentication
- Add a database
- Synchronise favourites and inventory across devices
- Add unit and integration tests
- Add React Testing Library tests
- Add backend route tests
- Improve keyboard accessibility
- Add ARIA behaviour to search dropdowns
- Add pagination or lazy loading
- Improve loading skeletons
- Add ingredient substitution suggestions
- Add personal cocktail notes
- Add custom cocktail creation
- Add sharing features
- Add offline-friendly support

---

## Author

Developed as a full-stack web development project focused on practical React, JavaScript, Express, API integration, responsive design, and deployment experience.

---

## Acknowledgements

Cocktail information and images are retrieved from external cocktail data sources where available.

Any third-party data, images, trademarks, or brand names remain the property of their respective owners.
