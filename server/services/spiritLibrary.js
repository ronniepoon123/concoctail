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

function normalise(text = "") {
  return String(text)
    .toLowerCase()
    .trim();
}

/* ===========================================
   GET CANONICAL NAME
=========================================== */

function getCanonicalName(spirit) {
  if (!spirit) {
    return null;
  }

  /*
    Base spirits and spirit brands should
    canonicalise to their normalised parent.

    Examples:
    Bombay Sapphire -> Gin
    Jack Daniel's -> Whisky

    Liqueurs and other modifiers should keep
    their own names.

    Examples:
    Cointreau -> Cointreau
    Campari -> Campari
    Dry Vermouth -> Dry Vermouth
  */

  if (spirit.type !== "spirit") {
    return spirit.name;
  }

  const normalisedParent =
    parentNormalisation[
      normalise(spirit.parent)
    ];

  return (
    normalisedParent ||
    spirit.parent ||
    spirit.name
  );
}

/* ===========================================
   LOOKUP
=========================================== */

const lookup = new Map();
const canonicalLookup = new Map();

for (const spirit of spirits) {
  const canonical =
    getCanonicalName(spirit);

  lookup.set(
    normalise(spirit.name),
    spirit
  );

  canonicalLookup.set(
    normalise(spirit.name),
    canonical
  );

  for (const alias of spirit.aliases || []) {
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
  if (!name) {
    return null;
  }

  return (
    lookup.get(normalise(name)) ??
    null
  );
}

/* ===========================================
   IS SPIRIT
=========================================== */

export function isSpirit(name) {
  if (!name) {
    return false;
  }

  return lookup.has(
    normalise(name)
  );
}

/* ===========================================
   SEARCH
=========================================== */

export function searchSpirits(query) {
  const search =
    normalise(query);

  if (!search) {
    return [];
  }

  const canonicalResults =
    new Map();

  for (const spirit of spirits) {
    const searchable = [
      spirit.name,
      ...(spirit.aliases || []),
      ...(spirit.search || [])
    ];

    const matched =
      searchable.some((item) =>
        normalise(item).includes(search)
      );

    if (!matched) {
      continue;
    }

    const canonical =
      getCanonicalName(spirit);

    if (!canonical) {
      continue;
    }

    const resultKey =
      normalise(canonical);

    if (!canonicalResults.has(resultKey)) {
      canonicalResults.set(
        resultKey,
        {
          name: canonical,
          type: spirit.type || "spirit"
        }
      );
    }
  }

  return [
    ...canonicalResults.values()
  ];
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
    (spirit) =>
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

  const visited =
    new Set();

  function walk(parent) {
    const parentKey =
      normalise(parent);

    if (visited.has(parentKey)) {
      return;
    }

    visited.add(parentKey);

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

const SEARCH_TERM_MAPPING = {
  gin: [
    "Gin"
  ],

  vodka: [
    "Vodka"
  ],

  rum: [
    "Rum"
  ],

  tequila: [
    "Tequila"
  ],

  mezcal: [
    "Mezcal"
  ],

  brandy: [
    "Brandy"
  ],

  cognac: [
    "Cognac",
    "Brandy"
  ],

  whisky: [
    "Whisky",
    "Whiskey",
    "Scotch",
    "Bourbon",
    "Rye Whiskey",
    "Irish Whiskey"
  ],

  whiskey: [
    "Whiskey",
    "Whisky",
    "Scotch",
    "Bourbon",
    "Rye Whiskey",
    "Irish Whiskey"
  ],

  bourbon: [
    "Bourbon"
  ],

  scotch: [
    "Scotch"
  ],

  "irish whiskey": [
    "Irish Whiskey"
  ],

  "rye whiskey": [
    "Rye Whiskey"
  ],

  cachaca: [
    "Cachaca"
  ],

  cachaça: [
    "Cachaca"
  ]
};

export function getSearchTerms(
  spiritName
) {
  if (!spiritName) {
    return [];
  }

  const requestedName =
    normalise(spiritName);

  /*
    Check direct base-spirit names first.

    This prevents:

    Gin -> liquor
    Whisky -> liquor

    The page tabs already contain canonical
    categories, so they should be searched
    directly.
  */

  if (
    SEARCH_TERM_MAPPING[
      requestedName
    ]
  ) {
    return (
      SEARCH_TERM_MAPPING[
        requestedName
      ]
    );
  }

  const spirit =
    findSpirit(spiritName);

  if (!spirit) {
    return [spiritName];
  }

  /*
    Liqueurs, aperitifs, vermouths and bitters
    are searched using their own ingredient
    names.

    Cointreau -> Cointreau
    Aperol -> Aperol
  */

  if (spirit.type !== "spirit") {
    return [spirit.name];
  }

  /*
    Brands and specific spirit products resolve
    to their canonical parent.

    Bombay Sapphire -> Gin
    Jack Daniel's -> Whisky
  */

  const canonical =
    getCanonicalName(spirit);

  const canonicalKey =
    normalise(canonical);

  return (
    SEARCH_TERM_MAPPING[
      canonicalKey
    ] ?? [canonical]
  );
}

/* ===========================================
   GET CANONICAL SPIRIT
=========================================== */

export function getCanonicalSpirit(name) {
  if (!name) {
    return null;
  }

  return (
    canonicalLookup.get(
      normalise(name)
    ) ?? null
  );
}