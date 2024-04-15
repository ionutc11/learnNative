import { Alert, Image, StyleSheet, View } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { getMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import SmallMap from "./SmallMap";

const LocationPicker = ({ onTakeLocation }) => {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const [location, setLocation] = useState(null);
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app"
      );

      return false;
    }

    return true;
  }

  async function getLocation() {
    const permissionGranted = await verifyPermissions();

    if (!permissionGranted) {
      return;
    }

    const location = await getCurrentPositionAsync();
    const locationObj = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    setLocation(locationObj);
    onTakeLocation(locationObj);
  }

  function pickOnMap() {
    navigation.navigate("Map");
  }

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params?.pickedLocation;
      const locationObj = {
        lat: mapPickedLocation.latitude,
        lng: mapPickedLocation.longitude,
      };
      setLocation(locationObj);
      onTakeLocation(locationObj);
    }
  }, [route, isFocused]);

  return (
    <View>
      <View style={styles.mapPreview}>
        {/* {location && (
          <Image source={{ uri: getMapPreview(location.lat, location.lng) }} />
        )} */}
        {location && (
          <SmallMap
            region={{
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocation}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"map"} onPress={pickOnMap}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default LocationPicker;
