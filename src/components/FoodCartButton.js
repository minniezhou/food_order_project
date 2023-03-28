import classes from "./FoodCartButton.module.css";
import React, { useContext, useEffect, useState } from "react";
import { FoodCartContent } from "./Context";

export const FoodCartButton = (props) => {
  const ctx = useContext(FoodCartContent);
  // const totalAmount = ctx.items.reduce((prev, curr) => {
  //   return prev + curr.amount;
  // }, 0);

  const [addBump, setAddBump] = useState(false);
  useEffect(() => {
    if (ctx.totalAmount > 0) {
      setAddBump(true);
    }
    const timer = setTimeout(() => {
      console.log("setting time out");
      setAddBump(false);
    }, 300);
    return () => {
      console.log("cleanup");
      clearTimeout(timer);
    };
  }, [ctx.totalAmount]);
  return (
    <button
      className={`${classes.button} + ${addBump ? classes.bump : ""}`}
      onClick={props.onClick}
    >
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart </span>
      <span className={classes.badge}>{ctx.totalAmount}</span>
    </button>
  );
};

const CartIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
};
