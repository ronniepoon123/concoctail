import oldFashionedImage from "../assets/glassware/old-fashioned.jpg";
import highballImage from "../assets/glassware/highball.jpg";
import coupeImage from "../assets/glassware/coupe.jpg";
import martiniImage from "../assets/glassware/martini.jpg";
import collinsImage from "../assets/glassware/collins.jpg";
import wineImage from "../assets/glassware/wine.jpg";
import champagneFluteImage from "../assets/glassware/champagne-flute.jpg";

const lessonContent = {
  spirits: {
    title: "Spirits",

    description:
      "Learn the major base spirits and how they shape a cocktail.",

    sections: [
      {
        title: "What is a spirit?",

        content:
          "A spirit is an alcoholic drink produced by distilling a fermented liquid. Spirits form the main alcoholic base of many cocktails.",
      },

      {
        title: "Common base spirits",

        items: [
          "Gin",
          "Vodka",
          "Rum",
          "Whisky",
          "Tequila",
          "Brandy",
          "Cognac",
          "Mezcal",
        ],
      },

      {
        title: "How spirits affect cocktails",

        content:
          "Each spirit brings a different aroma, flavour, texture, and strength. Gin is often botanical, rum can be sweet or rich, and whisky commonly adds grain, spice, oak, and smoke.",
      },
    ],
  },

  liqueurs: {
    title: "Liqueurs",

    description:
      "Understand sweetened and flavoured alcoholic ingredients.",

    sections: [
      {
        title: "What is a liqueur?",

        content:
          "A liqueur is a sweetened alcoholic drink flavoured with ingredients such as fruit, herbs, spices, nuts, chocolate, or coffee.",
      },

      {
        title: "Common examples",

        items: [
          "Cointreau",
          "Amaretto",
          "Kahlua",
          "Baileys Irish Cream",
          "Grand Marnier",
          "Frangelico",
          "Chartreuse",
          "Campari",
        ],
      },

      {
        title: "Role in cocktails",

        content:
          "Liqueurs usually add sweetness and a concentrated flavour. They are normally used in smaller amounts than the base spirit.",
      },
    ],
  },

  "fortified-wines": {
    title: "Fortified Wines",

    description:
      "Explore vermouth, sherry, port, and other wine-based modifiers.",

    sections: [
      {
        title: "What is fortified wine?",

        content:
          "Fortified wine is wine strengthened with a distilled spirit. Some varieties are also aromatised with herbs, spices, or botanicals.",
      },

      {
        title: "Common examples",

        items: [
          "Dry Vermouth",
          "Sweet Vermouth",
          "Sherry",
          "Port",
          "Madeira",
          "Dubonnet",
        ],
      },

      {
        title: "Storage",

        content:
          "Most opened fortified wines should be refrigerated. Vermouth in particular loses freshness when left open at room temperature for long periods.",
      },
    ],
  },

  mixers: {
    title: "Mixers",

    description:
      "Learn how juices, soda, tonic, and syrups balance a drink.",

    sections: [
      {
        title: "What mixers do",

        content:
          "Mixers alter sweetness, acidity, bitterness, carbonation, dilution, and overall volume.",
      },

      {
        title: "Common mixers",

        items: [
          "Lemon juice",
          "Lime juice",
          "Orange juice",
          "Soda water",
          "Tonic water",
          "Ginger beer",
          "Cola",
          "Simple syrup",
          "Grenadine",
        ],
      },

      {
        title: "Fresh citrus",

        content:
          "Fresh lemon and lime juice usually provide a brighter flavour than bottled juice. Citrus is commonly balanced with sugar or syrup.",
      },
    ],
  },

  glassware: {
    title: "Glassware",

    description:
      "Choose the right glass for temperature, aroma, serving style, and presentation.",

    sections: [
      {
        title: "Why glassware matters",

        content:
          "The shape and size of a glass can affect a cocktail’s aroma, temperature, carbonation, serving volume, and presentation.",
      },

      {
        title: "Common cocktail glasses",

        cards: [
          {
            name: "Old Fashioned Glass",

            image: oldFashionedImage,

            description:
              "A short, wide, heavy-bottomed glass designed for spirit-forward cocktails served over ice. Its broad opening allows space for a large ice cube, makes the drink easier to stir, and helps release the aroma of the spirit and garnish.",

            examples: [
              "Old Fashioned",
              "Negroni",
              "Whiskey Sour",
            ],
          },

          {
            name: "Highball Glass",

            image: highballImage,

            description:
              "A tall, straight-sided glass used for cocktails that combine a spirit with a larger amount of mixer. Its narrow shape helps retain carbonation, accommodates plenty of ice, and keeps long drinks cold.",

            examples: [
              "Gin and Tonic",
              "Whisky Highball",
              "Dark and Stormy",
            ],
          },

          {
            name: "Coupe Glass",

            image: coupeImage,

            description:
              "A shallow, rounded, stemmed glass used for chilled cocktails served without ice. The stem keeps your hand away from the bowl, while its curved shape makes it more stable and less prone to spilling than a Martini glass.",

            examples: [
              "Daiquiri",
              "Sidecar",
              "Aviation",
            ],
          },

          {
            name: "Martini Glass",

            image: martiniImage,

            description:
              "A V-shaped stemmed glass intended for chilled cocktails served straight up. Its wide rim exposes more of the drink’s surface, enhancing aroma and presentation, although the open design allows the drink to warm and spill more easily.",

            examples: [
              "Martini",
              "Cosmopolitan",
              "Espresso Martini",
            ],
          },

          {
            name: "Collins Glass",

            image: collinsImage,

            description:
              "A tall, narrow glass designed for long cocktails containing ice, citrus, and carbonated mixers. It is usually slimmer and taller than a Highball glass, helping preserve fizz while providing enough volume for a larger drink.",

            examples: [
              "Tom Collins",
              "Mojito",
              "John Collins",
            ],
          },

          {
            name: "Wine Glass",

            image: wineImage,

            description:
              "A stemmed glass with a broad bowl that provides room for ice, fruit, herbs, and sparkling mixers. The bowl allows aromas to gather above the drink, making it especially suitable for spritzes and aromatic cocktails.",

            examples: [
              "Aperol Spritz",
              "Sangria",
              "Hugo Spritz",
            ],
          },

          {
            name: "Champagne Flute",

            image: champagneFluteImage,

            description:
              "A tall, narrow stemmed glass designed for sparkling drinks. Its reduced surface area slows the escape of carbonation, while the elongated shape displays rising bubbles and keeps the drink chilled.",

            examples: [
              "Mimosa",
              "Bellini",
              "French 75",
            ],
          },
        ],
      },

      {
        title: "Practical rule",

        content:
          "Short, spirit-forward cocktails are usually served in smaller glasses, while cocktails containing more mixer, ice, or carbonation generally use taller glasses.",
      },
    ],
  },

  garnishes: {
    title: "Garnishes",

    description:
      "Use citrus, herbs, fruit, and other finishing touches properly.",

    sections: [
      {
        title: "Purpose of a garnish",

        content:
          "A garnish can improve aroma, appearance, and flavour. It should complement the drink rather than exist only as decoration.",
      },

      {
        title: "Common garnishes",

        items: [
          "Lemon twist",
          "Orange peel",
          "Lime wheel",
          "Mint sprig",
          "Cocktail cherry",
          "Olive",
          "Pineapple wedge",
        ],
      },

      {
        title: "Citrus oils",

        content:
          "Twisting citrus peel over a drink releases aromatic oils. The peel may then be placed in the glass or discarded.",
      },
    ],
  },

  techniques: {
    title: "Techniques",

    description:
      "Learn when to shake, stir, build, muddle, strain, and layer.",

    sections: [
      {
        title: "Shake",

        content:
          "Shaking is used when ingredients need vigorous mixing, chilling, dilution, or aeration.",
      },

      {
        title: "Stir",

        content:
          "Stirring provides controlled chilling and dilution while keeping the drink clear and smooth.",
      },

      {
        title: "Build",

        content:
          "Building means adding ingredients directly into the serving glass. This is common for highballs and simple mixed drinks.",
      },

      {
        title: "Other techniques",

        items: [
          "Muddle",
          "Double strain",
          "Dry shake",
          "Layer",
          "Roll",
        ],
      },
    ],
  },

  measurements: {
    title: "Measurements",

    description:
      "Understand ratios, millilitres, dashes, and bar-spoon measures.",

    sections: [
      {
        title: "Common conversions",

        items: [
          "1 oz ≈ 30 ml",
          "3/4 oz ≈ 22.5 ml",
          "1/2 oz ≈ 15 ml",
          "1/4 oz ≈ 7.5 ml",
        ],
      },

      {
        title: "Other measurements",

        items: [
          "1 bar spoon is roughly 5 ml",
          "1 teaspoon is roughly 5 ml",
          "A dash varies depending on the bottle",
        ],
      },

      {
        title: "Why ratios matter",

        content:
          "Ratios help explain how sweetness, acidity, dilution, and other flavours are balanced consistently.",
      },
    ],
  },
};

export default lessonContent;