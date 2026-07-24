import { useEffect, useState } from "react";
import "./ShoppingList.css";

import Layout from "../../components/Layout/Layout";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("shoppingList");

    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "shoppingList",
      JSON.stringify(items)
    );
  }, [items]);

  function addItem() {
    if (!newItem.trim()) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        name: newItem,
        bought: false,
      },
    ]);

    setNewItem("");
  }

  function toggleBought(id) {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              bought: !item.bought,
            }
          : item
      )
    );
  }

  function removeItem(id) {
    setItems(
      items.filter((item) => item.id !== id)
    );
  }

  return (
    <Layout
      title="Shopping List"
      description="Keep track of ingredients you need to buy."
    >
      <div className="shopping-input">

        <input
          type="text"
          placeholder="Add ingredient..."
          value={newItem}
          onChange={(e) =>
            setNewItem(e.target.value)
          }
        />

        <button onClick={addItem}>
          Add
        </button>

      </div>

      <div className="shopping-list">

        {items.length === 0 && (
          <p className="empty">
            Your shopping list is empty.
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className={`shopping-item ${
              item.bought ? "bought" : ""
            }`}
          >
            <label>

              <input
                type="checkbox"
                checked={item.bought}
                onChange={() =>
                  toggleBought(item.id)
                }
              />

              <span>{item.name}</span>

            </label>

            <button
              onClick={() =>
                removeItem(item.id)
              }
            >
              Remove
            </button>

          </div>
        ))}

      </div>
    </Layout>
  );
}

export default ShoppingList;