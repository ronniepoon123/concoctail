import {
  findSpirit,
  getCanonicalSpirit,
  getSearchTerms,
  searchSpirits
} from "../server/services/spiritLibrary.js";

const tests = [
  "Bombay Sapphire",
  "Cointreau",
  "Campari",
  "Dry Vermouth",
  "Galliano",
  "Kahlua"
];

for (const name of tests) {
  const entry = findSpirit(name);

  console.log("\n==============================");
  console.log("Search:", name);
  console.log("Entry:", entry?.name ?? null);
  console.log("Type:", entry?.type ?? null);
  console.log(
    "Canonical:",
    getCanonicalSpirit(name)
  );
  console.log(
    "CocktailDB terms:",
    getSearchTerms(name)
  );
}

console.log("\n==============================");
console.log('Results for "orange liqueur":');
console.log(
  searchSpirits("orange liqueur")
);