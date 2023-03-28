import MealImg from "../assets/meals.jpg";
import classes from "./Header.module.css";
import { FoodCartButton } from "./FoodCartButton";
export const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h2>ReactMeals</h2>
        <FoodCartButton onClick={props.onCartClick}></FoodCartButton>
      </header>
      <img
        src={MealImg}
        alt="react meal"
        className={classes["main-image"]}
      ></img>
    </>
  );
};
