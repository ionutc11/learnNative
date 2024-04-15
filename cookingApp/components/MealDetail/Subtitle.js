import { StyleSheet, Text } from "react-native";

const Subtitle = ({ children }) => {
  return <Text style={styles.subtitle}>{children}</Text>;
};

const styles = StyleSheet.create({
  subtitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 12,
    textAlign: "center",
    padding: 6,

    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
  },
});

export default Subtitle;
