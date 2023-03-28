import { useContext } from "react";
import { FoodCartContent } from "./Context";

export const OrderConfirmation = (props) => {
  const cxt = useContext(FoodCartContent);
  const total = cxt.items.reduce((prev, curr) => {
    return prev + curr.price * curr.amount;
  }, 0.0);
  const onCloseHandler = () => {
    props.onClose();
    cxt.emptyCart();
  };
  return (
    <>
      <p>Your order is placed</p>
      <p>Order number is : 1234567</p>
      <p> total cost is ${total.toFixed(2)}</p>
      <button onClick={onCloseHandler}>OK</button>
    </>
  );
};
