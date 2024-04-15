import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";

const Map = ({ region, navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const baseRegion = {
    latitude: 45.44078,
    longitude: 28.04118,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function handleMapPress(event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  }

  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "You have to pick a location by tapping on the map first"
      );

      return;
    }

    navigation.navigate("AddPlace", {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          icon={"save"}
          onPress={savePickedLocation}
          size={24}
        />
      ),
    });
  }, [navigation, savePickedLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region || baseRegion}
      onPress={handleMapPress}
    >
      {selectedLocation && (
        <Marker title="Picked location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1, width: "100%", height: "100%" },
});

export default Map;
