import { StyleSheet, Text, Platform } from "react-native";
import Colors from "../../constants/colors";

const Title = (props) => {
  return <Text style={styles.title}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    // borderWidth: Platform.select({
    //   ios: 0,
    //   android: 2,
    // }),
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
    maxWidth: "80%",
    width: 300,
    textAlignVertical: "center",
  },
});

export default Title;
