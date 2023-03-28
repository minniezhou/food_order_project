import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import { FoodCartContent } from "./Context";
import { Modal } from "./Modal";
import CartItem from "./CartItem";
import { Checkout } from "./Checkout";
import useHttp from "../hooks/use-http";
import { LoadingSpinner } from "./LoadingSpinner";
import { OrderConfirmation } from "./OrderConfirmation";
export const Cart = (props) => {
  const [isSubmitted, setSubmitted] = useState(false);
  const ctx = useContext(FoodCartContent);
  const totalprice = ctx.items.reduce((pre, curr) => {
    return pre + curr.amount * curr.price;
  }, 0.0);
  const [showCheckout, setShowCheckout] = useState(false);
  const {
    error: submitError,
    isLoading: isSubmitting,
    httpRequest: SubmitRequest,
  } = useHttp();
  return (
    <Modal
      onClick={() => {
        props.onClose();
        if (isSubmitted) ctx.emptyCart();
      }}
    >
      {isSubmitting && <LoadingSpinner></LoadingSpinner>}
      {submitError && <p>System Error!</p>}
      {isSubmitted && (
        <OrderConfirmation onClose={props.onClose}></OrderConfirmation>
      )}
      {!submitError && !isSubmitting && !isSubmitted && (
        <>
          <ul className={classes["cart-items"]}>
            {ctx.items.map((meal) => {
              return (
                <CartItem
                  {...meal}
                  onRemove={(id) => {
                    ctx.removeItem(id);
                  }}
                  onAdd={(item) => {
                    ctx.addItem({ ...item, amount: 1 });
                  }}
                ></CartItem>
              );
            })}
          </ul>
          <div className={classes.total}>
            <span>Total: </span>
            <span>${totalprice.toFixed(2)}</span>
          </div>
          {!showCheckout && (
            <div className={classes.actions}>
              <button
                className={classes["button--alt"]}
                onClick={props.onClose}
              >
                Close
              </button>
              {ctx.items.length > 0 && (
                <button
                  className={classes.button}
                  onClick={() => {
                    setShowCheckout(true);
                  }}
                >
                  Order
                </button>
              )}
            </div>
          )}
          {showCheckout && (
            <Checkout
              onClose={props.onClose}
              httpRequest={SubmitRequest}
              setSubmitted={setSubmitted}
            ></Checkout>
          )}
        </>
      )}
    </Modal>
  );
};
