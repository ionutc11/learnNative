import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {
  const navigation = useNavigation();
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding!
        </Text>
      </View>
    );
  }

  const handleItemPress = (id) => {
      navigation.navigate("PlaceDetails", {
        placeId: id,
      });
    
  }

  return (
    <FlatList
      data={places}
      style={styles.list}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <PlaceItem
            onPress={handleItemPress}
            place={itemData.item}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});

export default PlacesList;
