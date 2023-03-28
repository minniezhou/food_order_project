import classes from "./MealItem.module.css";
import { MealItemForm } from "./MealItemForm";
import { FoodCartContent } from "./Context";
import { useContext } from "react";
export const MealItem = (props) => {
  const cxt = useContext(FoodCartContent);
  return (
    <li className={classes.meal} key={props.id}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}> {props.description} </div>
        <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm
          onSubmit={(amount) => {
            cxt.addItem({
              ...props,
              amount: amount,
            });
          }}
        />
      </div>
    </li>
  );
};
