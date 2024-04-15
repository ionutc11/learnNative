import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const SmallMap = ({ region, route }) => {

  const routeGivenRegion = route?.params?.place;

  const baseRegion = {
    latitude: 45.44078,
    longitude: 28.04118,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={baseRegion}
      region={routeGivenRegion || region}
    />
  );
};

const styles = StyleSheet.create({
  map: { flex: 1, width: "100%", height: "100%" },
});

export default SmallMap;
