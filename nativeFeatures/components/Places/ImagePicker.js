import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

const ImagePicker = ({ onTakeImage }) => {
  const [cameraPermissionInfo, requestPermision] = useCameraPermissions();
  const [image, setImage] = useState(null);

  async function verifyPermissions() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermision();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app"
      );

      return false;
    }

    return true;
  }

  async function handleTakeImage() {
    const permissionGranted = await verifyPermissions();

    if (!permissionGranted) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImage(image.assets[0]);
    onTakeImage(image.assets[0].uri)
  }

  let imagePreview = <Text>No image selected.</Text>;

  if (image) {
    imagePreview = <Image source={{ uri: image.uri }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={handleTakeImage} icon={"camera"}>
        Take photo
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
