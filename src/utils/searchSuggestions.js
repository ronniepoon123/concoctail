export default function searchSuggestions(
  query,
  cocktails,
  ingredients,
  collections
) {

  if (!query.trim()) return [];

  const text = query.toLowerCase();

  const results = [];

  cocktails.forEach((cocktail) => {

    if (
      cocktail.name
        .toLowerCase()
        .includes(text)
    ) {

      results.push({

        type:"Cocktail",

        name:cocktail.name,

        data:cocktail,

      });

    }

  });

  ingredients.forEach((ingredient)=>{

    if(

      ingredient.name

      .toLowerCase()

      .includes(text)

    ){

      results.push({

        type:"Ingredient",

        name:ingredient.name,

        data:ingredient,

      });

    }

  });

  collections.forEach((collection)=>{

    if(

      collection.name

      .toLowerCase()

      .includes(text)

    ){

      results.push({

        type:"Collection",

        name:collection.name,

        data:collection,

      });

    }

  });

  return results.slice(0,8);

}