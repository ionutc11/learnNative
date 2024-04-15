import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ onPress, icon, color }) => {
  return (
    <Pressable
      style={({ pressed }) => [pressed ? styles.pressed : null]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.55,
  },
});

export default IconButton;
