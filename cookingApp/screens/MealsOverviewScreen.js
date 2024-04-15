import { CATEGORIES, MEALS } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

const MealsOverviewScreen = ({ route, navigation }) => {
  const categoryId = route?.params?.categoryId;

  const displayedMeals = MEALS.filter((mealItem) =>
    mealItem.categoryIds.includes(categoryId)
  );

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (categ) => categ.id == categoryId
    ).title;

    if (categoryTitle) {
      navigation.setOptions({
        title: categoryTitle,
      });
    }
  }, [navigation, categoryId]);

  return <MealsList items={displayedMeals} />;
};

export default MealsOverviewScreen;
