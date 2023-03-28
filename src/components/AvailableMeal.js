import { useEffect, useState } from "react";
import classes from "./AvailableMeal.module.css";
import { Card } from "./Card";
import useHttp from "../hooks/use-http";
import { MealItem } from "./MealItem";
import { LoadingSpinner } from "./LoadingSpinner";

export const AvailableMeal = () => {
  const { error, isLoading, httpRequest } = useHttp();
  const [availableMeals, setMeals] = useState([]);
  useEffect(() => {
    httpRequest(
      {
        url: "https://food-order-1b58a-default-rtdb.firebaseio.com/Meals.json",
      },
      (data) => {
        let fetchedMeals = [];
        for (let key in data) {
          fetchedMeals.push({
            id: key,
            ...data[key],
          });
        }
        setMeals(fetchedMeals);
      }
    );
  }, [httpRequest, setMeals]);
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <LoadingSpinner></LoadingSpinner>}
        {error && <p>{error}</p>}
        {!error && !isLoading && availableMeals.length > 0 && (
          <ul>
            {availableMeals.map((meal) => {
              return <MealItem key={meal.id} {...meal}></MealItem>;
            })}
          </ul>
        )}
      </Card>
    </section>
  );
};
