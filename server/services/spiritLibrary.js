import fs from "fs";
import path from "path";
import { parentNormalisation } from "../data/Normalization.js";
const spirits = JSON.parse(

  fs.readFileSync(

    path.join(
      process.cwd(),
      "server",
      "data",
      "spirits.json"
    ),

    "utf8"

  )

);

/* ===========================================
   NORMALISE
=========================================== */

function normalise(text) {

  return text
    .toLowerCase()
    .trim();

}

/* ===========================================
   LOOKUP
=========================================== */

const lookup = new Map();
const canonicalLookup = new Map();
for (const spirit of spirits) {

  lookup.set(
    normalise(spirit.name),
    spirit
  );

const canonical =

  parentNormalisation[
    normalise(spirit.parent || "")
  ] ||

  spirit.name;
  canonicalLookup.set(
    normalise(spirit.name),
    canonical
  );

  for (const alias of spirit.aliases) {

    lookup.set(
      normalise(alias),
      spirit
    );

    canonicalLookup.set(
      normalise(alias),
      canonical
    );

  }

}

/* ===========================================
   FIND SPIRIT
=========================================== */

export function findSpirit(name) {

  return lookup.get(
    normalise(name)
  ) ?? null;

}

/* ===========================================
   IS SPIRIT
=========================================== */

export function isSpirit(name) {

  return lookup.has(
    normalise(name)
  );

}

/* ===========================================
   SEARCH
=========================================== */

export function searchSpirits(query) {

  const search = normalise(query);

  const canonicalResults = new Set();

  for (const spirit of spirits) {

    const searchable = [

      spirit.name,

      ...(spirit.aliases || []),

      ...(spirit.search || [])

    ];

    const matched = searchable.some(item =>

      normalise(item).includes(search)

    );

    if (!matched) continue;

    const canonical =
      parentNormalisation[
        normalise(spirit.parent || "")
      ] || spirit.name;

    canonicalResults.add(canonical);

  }

  return [...canonicalResults].map(name => ({
    name
  }));

}

/* ===========================================
   GET PARENT
=========================================== */

export function getParent(name) {

  const spirit =
    findSpirit(name);

  return spirit?.parent ?? null;

}

/* ===========================================
   GET CHILDREN
=========================================== */

export function getChildren(parentName) {

  return spirits.filter(

    spirit =>

      spirit.parent &&

      normalise(spirit.parent) ===
      normalise(parentName)

  );

}

/* ===========================================
   GET DESCENDANTS
=========================================== */

export function getDescendants(parentName) {

  const descendants = [];

  function walk(parent) {

    const children =
      getChildren(parent);

    for (const child of children) {

      descendants.push(child);

      walk(child.name);

    }

  }

  walk(parentName);

  return descendants;

}


/* ===========================================
   SEARCH TERM NORMALISATION
=========================================== */

export function getSearchTerms(spiritName) {

  const spirit = findSpirit(spiritName);

  if (!spirit) {
    return [spiritName];
  }

  const parent =
    spirit.parent?.toLowerCase() ?? "";

  const mapping = {

    "gin": ["Gin"],

    "vodka": ["Vodka"],

    "rum": ["Rum"],

    "tequila": ["Tequila"],

    "mezcal": ["Mezcal"],

    "brandy": ["Brandy"],

    "cognac": ["Cognac", "Brandy"],

    "whisky": [
      "Whisky",
      "Whiskey",
      "Scotch",
      "Bourbon",
      "Rye Whiskey",
      "Irish Whiskey"
    ],

    "blended whiskey": [
      "Whiskey",
      "Whisky"
    ],

    "liqueur": [
      "Liqueur"
    ]

  };

  return mapping[parent] ?? [spiritName];


}

export function getCanonicalSpirit(name) {

  return (
    canonicalLookup.get(
      normalise(name)
    ) ?? null
  );

}