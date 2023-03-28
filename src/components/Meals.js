import { MealSummary } from "./MealSummary";
import { Header } from "./Header";
import { AvailableMeal } from "./AvailableMeal";
import { Cart } from "./Cart";
import { useState } from "react";
import FoodCartProvider from "./Context";
import { OrderConfirmation } from "./OrderConfirmation";
export const Meals = () => {
  const [showCart, setShowCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  return (
    <FoodCartProvider>
      {
        <>
          {showCart && (
            <Cart
              onClose={(event) => {
                setShowCart(false);
              }}
            ></Cart>
          )}
          {showConfirmation && (
            <OrderConfirmation
              onClose={() => {
                setShowConfirmation(false);
              }}
            />
          )}
          <Header
            onCartClick={(e) => {
              setShowCart(true);
            }}
          ></Header>
          <MealSummary></MealSummary>
          <AvailableMeal></AvailableMeal>
        </>
      }
    </FoodCartProvider>
  );
};
