import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Modal,
  Image,
} from "react-native";

const GoalInput = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={require("../assets/adaptive-icon.png")} />
        <TextInput
          onChangeText={props.goalInputHandler}
          style={styles.textInputStyle}
          placeholder="My Goal!"
          value={props.goal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button onPress={props.addGoal} title="Add GOAL" color={"#5e0acc"} />
          </View>
          <View style={styles.button}>
            <Button onPress={props.close} color={"#f312"} title="Cancel" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#311b6b'
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    borderRadius: 6,
    backgroundColor: "#e4d0ff",
    color: '#120438',
    width: "100%",
    padding: 16,
  },

  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  }
});
export default GoalInput;
