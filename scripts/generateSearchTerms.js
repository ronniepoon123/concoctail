import fs from "fs";
import path from "path";

const file = path.join(
  process.cwd(),
  "server",
  "data",
  "spirits.json"
);

const spirits = JSON.parse(
  fs.readFileSync(file, "utf8")
);

function unique(array) {
  return [...new Set(array.filter(Boolean))];
}

function clean(text) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const stopWords = new Set([
  "gin",
  "whisky",
  "whiskey",
  "vodka",
  "rum",
  "tequila",
  "mezcal",
  "brandy",
  "liqueur",
  "liqueur",
  "liqueur",
  "dry",
  "old",
  "extra",
  "original",
  "reserve",
  "special",
  "straight",
  "blended",
  "kentucky",
  "london"
]);

for (const spirit of spirits) {

  const search = [];

  // full bottle name
  search.push(clean(spirit.name));

  // aliases
  for (const alias of (spirit.aliases || [])) {
    search.push(clean(alias));
  }

  // remove punctuation version
  search.push(
    clean(
      spirit.name.replace(/[’']/g, "")
    )
  );

  // first word (Bombay, Bacardi, Hendrick)
  const words = clean(spirit.name).split(" ");

  if (words.length > 0) {
    search.push(words[0]);
  }

  // first two words
  if (words.length > 1) {
    search.push(words.slice(0, 2).join(" "));
  }

  // add important words
  words.forEach(word => {

    if (
      word.length >= 4 &&
      !stopWords.has(word)
    ) {
      search.push(word);
    }

  });

  spirit.search = unique(search);

}

fs.writeFileSync(
  file,
  JSON.stringify(spirits, null, 2)
);

console.log(
  `Updated ${spirits.length} spirits.`
);