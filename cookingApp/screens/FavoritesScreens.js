import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-context";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

const FavoritesScreens = () => {
  // const favMealsContext = useContext(FavoritesContext);

  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  // const favMeals = MEALS.filter((meal) =>
  //   favMealsContext.ids.includes(meal.id)
  // );
  
  const favMeals = MEALS.filter((meal) => favoriteMealIds.includes(meal.id));

  return <MealsList items={favMeals} />;
};

export default FavoritesScreens;
