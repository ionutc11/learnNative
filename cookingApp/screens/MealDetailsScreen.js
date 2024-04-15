import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites-slice";

const MealDetailsScreen = ({ route, navigation }) => {
  // const favMealsContext = useContext(FavoritesContext);
  const mealId = route.params.mealId;
  const meal = MEALS.find((meal) => meal.id === mealId);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();
  // const mealIsFavorite = favMealsContext.ids.includes(mealId);
  const mealIsFavorite = favoriteMealIds.includes(mealId);
  
  function handlePress() {
    //context way
    // if (!mealIsFavorite) {
    //   favMealsContext.addFavorite(mealId);
    // } else {
    //   favMealsContext.removeFavorite(mealId);
    // }

    if (!mealIsFavorite) {
      dispatch(addFavorite({id: mealId}));
    } else {
      dispatch(removeFavorite({id: mealId}));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          color={"white"}
          icon={mealIsFavorite ? "star" : "star-outline"}
          onPress={handlePress}
        />
      ),
    });
  }, [mealIsFavorite]);

  return (
    <ScrollView style={styles.root}>
      <Image style={styles.image} source={{ uri: meal.imageUrl }} />
      <Text style={styles.title}>{meal.title}</Text>
      <MealDetails
        affordability={meal.affordability}
        complexity={meal.complexity}
        duration={meal.duration}
        textStyle={styles.detailText}
      />
      <View style={{ alignItems: "center" }}>
        <View style={{ width: "80%" }}>
          <Subtitle>Ingredients</Subtitle>
          <List data={meal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={meal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  root: {
    marginBottom: 30,
  },
});

export default MealDetailsScreen;
