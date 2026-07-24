import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";

import cocktails from "../../data/cocktails";

import "./ShoppingList.css";

function ShoppingList() {

  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("shoppingList")
      ) || [];

    setShoppingList(saved);

  }, []);

  function toggleBought(id) {

    const updated = shoppingList.map((item)=>

      item.id === id

        ? {

            ...item,

            bought: !item.bought,

          }

        : item

    );

    setShoppingList(updated);

    localStorage.setItem(

      "shoppingList",

      JSON.stringify(updated)

    );

  }

  function removeItem(id) {

    const updated = shoppingList.filter(

      (item)=>item.id !== id

    );

    setShoppingList(updated);

    localStorage.setItem(

      "shoppingList",

      JSON.stringify(updated)

    );

  }

  return (

    <Layout

      title="Shopping List"

      description="Ingredients you still need."

    >

      {shoppingList.length === 0 ? (

        <p>Your shopping list is empty.</p>

      ) : (

        <div className="shopping-list">

          {shoppingList.map((item)=>{

            const usedIn = cocktails.filter(

              (cocktail)=>

                cocktail.ingredients.includes(

                  item.name

                )

            );

            return (

              <article

                key={item.id}

                className="shopping-card"

              >

                <div>

                  <h3>{item.name}</h3>

                  <small>

                    Needed for:

                  </small>

                  <ul>

                    {usedIn.map((cocktail)=>(

                      <li key={cocktail.id}>

                        {cocktail.name}

                      </li>

                    ))}

                  </ul>

                </div>

                <div className="shopping-actions">

                  <button

                    onClick={()=>toggleBought(item.id)}

                  >

                    {item.bought

                      ? "✓ Bought"

                      : "Mark Bought"}

                  </button>

                  <button

                    className="delete"

                    onClick={()=>removeItem(item.id)}

                  >

                    Remove

                  </button>

                </div>

              </article>

            );

          })}

        </div>

      )}

    </Layout>

  );

}

export default ShoppingList;