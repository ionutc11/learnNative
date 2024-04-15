import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

const OutlinedButton = ({ children, onPress, icon }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={styles.icon}>
        <Ionicons name={icon} size={18} color={Colors.primary500} />
      </View>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: { opacity: 0.5 },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});

export default OutlinedButton;
