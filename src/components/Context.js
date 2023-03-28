import React from "react";
import { useState } from "react";

export const FoodCartContent = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  emptyCart: () => {},
});

const FoodCartProvider = (props) => {
  const [foodItems, addFoodItems] = useState({ items: [], amount: 0 });
  return (
    <FoodCartContent.Provider
      value={{
        items: foodItems.items,
        totalAmount: foodItems.amount,
        addItem: (item) => {
          addFoodItems((prev) => {
            const total = prev.amount + item.amount;
            const idx = prev.items.findIndex((it) => {
              return it.id === item.id;
            });
            if (idx === -1) {
              return { items: [...prev.items, item], amount: total };
            } else {
              let newItems = prev.items;
              newItems[idx].amount = newItems[idx].amount + item.amount;
              return { items: newItems, amount: total };
            }
          });
        },
        removeItem: (id) => {
          addFoodItems((prev) => {
            const idx = prev.items.findIndex((it) => {
              return it.id === id;
            });
            if (idx !== -1) {
              const total = prev.amount - 1;
              let newItems = prev.items;
              if (newItems[idx].amount > 1) newItems[idx].amount--;
              else {
                newItems.splice(idx, 1);
              }
              return { items: newItems, amount: total };
            }
          });
        },
        emptyCart: () => {
          addFoodItems({ items: [], amount: 0 });
        },
      }}
    >
      {props.children}
    </FoodCartContent.Provider>
  );
};

export default FoodCartProvider;
