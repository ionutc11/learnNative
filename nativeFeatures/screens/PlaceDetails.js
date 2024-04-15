import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../util/database";

const PlaceDetails = ({ route, navigation }) => {
  const selectedPlaceId = route.params?.placeId;
  const [place, setPlace] = useState(null);

  function showOnMap() {
    if (!place) {
      return;
    }

    navigation.navigate("SmallMap", {
      place: {
        latitude: place.lat,
        longitude: place.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  }

  useEffect(() => {
    if (selectedPlaceId) {
      fetchPlaceById(selectedPlaceId)
        .then((res) => setPlace(res))
        .catch(console.log);
    }
  }, [selectedPlaceId]);

  return (
    <ScrollView styles={styles.screen}>
      <Image source={{ uri: place?.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{place?.title}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMap}>
          View on map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default PlaceDetails;
