const FAVOURITES_KEY = "cocktail-favourites";

export function getFavourites() {
  const favourites = localStorage.getItem(FAVOURITES_KEY);

  return favourites
    ? JSON.parse(favourites)
    : [];
}


export function isFavourite(id) {
  const favourites = getFavourites();

  return favourites.includes(id);
}


export function toggleFavourite(id) {

  let favourites = getFavourites();

  if (favourites.includes(id)) {

    favourites = favourites.filter(
      (favouriteId) => favouriteId !== id
    );

  } else {

    favourites.push(id);

  }

  localStorage.setItem(
    FAVOURITES_KEY,
    JSON.stringify(favourites)
  );

  return favourites.includes(id);
}