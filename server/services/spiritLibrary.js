import fs from "fs";
import path from "path";

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

for (const spirit of spirits) {

  lookup.set(
    normalise(spirit.name),
    spirit
  );

  for (const alias of spirit.aliases) {

    lookup.set(
      normalise(alias),
      spirit
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

  const search =
    normalise(query);

  return spirits.filter(spirit => {

    if (
      normalise(spirit.name)
        .includes(search)
    ) {

      return true;

    }

    return spirit.aliases.some(alias =>

      normalise(alias)
        .includes(search)

    );

  });

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
   GET SEARCH TERMS
=========================================== */

export function getSearchTerms(name) {

  const spirit =
    findSpirit(name);

  if (!spirit) {

    return [name];

  }

  const descendants =
    getDescendants(spirit.name);

  return [

    spirit.name,

    ...descendants.map(
      child => child.name
    )

  ];

}