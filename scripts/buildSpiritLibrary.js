import axios from "axios";
import fs from "fs";
import path from "path";

const SPARQL_ENDPOINT =
  "https://query.wikidata.org/sparql";

const QUERY = `
SELECT DISTINCT
  ?item
  ?itemLabel
  ?itemDescription
  ?parent
  ?parentLabel
  ?alias
WHERE {

  {
    ?item wdt:P279+ wd:Q56139.
    ?item wdt:P279 ?parent.
  }

  UNION {

    ?item wdt:P31 ?parent.
    ?parent wdt:P279* wd:Q56139.

  }

  OPTIONAL {
    ?item skos:altLabel ?alias.
    FILTER(LANG(?alias)="en")
  }

  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en".
  }

}
ORDER BY ?itemLabel
`;

async function buildLibrary() {

  console.log("Downloading spirit library...");

  const { data } = await axios.get(

    SPARQL_ENDPOINT,

    {
      headers: {

        Accept:
          "application/sparql-results+json",

        "User-Agent":
          "CONCOCTail Spirit Builder",

      },

      params: {

        query: QUERY,

        format: "json",

      },

    }

  );

  const map = new Map();

  for (const row of data.results.bindings) {

    const id =
      row.item.value.split("/").pop();

    const name =
      row.itemLabel?.value ?? "";

    const description =
      row.itemDescription?.value ?? "";

    const parent =
        row.parentLabel?.value ?? null;

    const alias =
      row.alias?.value;

    if (!map.has(id)) {

      map.set(id, {

        id,

        name,

        description,

        parent,

        aliases: [],

      });

    }

    if (
      alias &&
      !map.get(id).aliases.includes(alias)
    ) {

      map.get(id).aliases.push(alias);

    }

  }

  const spirits =
    [...map.values()]

      .sort((a, b) =>
        a.name.localeCompare(b.name)
      );

  const outputDir =
    path.join(
      process.cwd(),
      "server",
      "data"
    );

  fs.mkdirSync(
    outputDir,
    { recursive: true }
  );

  fs.writeFileSync(

    path.join(
      outputDir,
      "spirits.json"
    ),

    JSON.stringify(
      spirits,
      null,
      2
    )

  );

  console.log(
    `Saved ${spirits.length} spirits.`
  );

}

buildLibrary().catch(console.error);