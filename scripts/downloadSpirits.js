import fs from "fs/promises";

const ENDPOINT =
  "https://query.wikidata.org/sparql";

const query = `
SELECT
  ?item
  ?itemLabel
  ?itemDescription
  (GROUP_CONCAT(DISTINCT ?alias; separator="|") AS ?aliases)
WHERE {

  # CHANGE THIS ROOT ITEM IF NEEDED
  ?item wdt:P279* wd:Q1505778.

  OPTIONAL {
    ?item skos:altLabel ?alias.
    FILTER(LANG(?alias)="en")
  }

  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en".
  }

}
GROUP BY
  ?item
  ?itemLabel
  ?itemDescription
ORDER BY ?itemLabel
`;

async function download() {

  console.log("Querying Wikidata...");

  const response = await fetch(

    ENDPOINT +
      "?format=json&query=" +
      encodeURIComponent(query),

    {
      headers: {
        Accept: "application/sparql-results+json",
        "User-Agent":
          "Concoctail/1.0"
      }
    }

  );

  if (!response.ok) {

    throw new Error(
      `HTTP ${response.status}`
    );

  }

  const data = await response.json();

  const spirits = data.results.bindings.map(

    row => ({

      id:
        row.item.value.split("/").pop(),

      name:
        row.itemLabel?.value ?? "",

      description:
        row.itemDescription?.value ?? "",

      aliases:
        row.aliases?.value
          ? row.aliases.value
              .split("|")
              .filter(Boolean)
          : []

    })

  );

  await fs.mkdir("./data", { recursive: true });

await fs.writeFile(
  "./data/spirits.json",
  JSON.stringify(spirits, null, 2)
);

  console.log(
    `Downloaded ${spirits.length} spirits`
  );

}

download().catch(console.error);