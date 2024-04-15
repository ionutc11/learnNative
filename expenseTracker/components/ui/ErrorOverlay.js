import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={[styles.text]}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

export default ErrorOverlay;
