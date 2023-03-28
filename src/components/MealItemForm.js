import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";

export const MealItemForm = (props) => {
  const addButtonRef = useRef();
  return (
    <form
      className={classes.form}
      onSubmit={(event) => {
        event.preventDefault();
        const amount = +addButtonRef.current.value;
        props.onSubmit(amount);
      }}
    >
      <div className={classes.input}>
        <label htmlFor={props.id}> Amount </label>
        <input
          ref={addButtonRef}
          id={props.id}
          type="number"
          min="1"
          max="5"
          step="1"
          defaultValue={1}
        ></input>
      </div>
      <button>+ Add</button>
    </form>
  );
};
