import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goal, setGoal] = useState("");
  const [goalList, setGoalList] = useState([]);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);

  function goalInputHandler(enteredText) {
    setGoal(enteredText);
  }

  function addGoal() {
    setGoalList((prevState) => [
      { text: goal, id: Math.random().toString() },
      ...prevState,
    ]);
    // setGoal("");
    setShowAddGoalModal(false);
  }

  function deleteGoal(goalId) {
    setGoalList((prevState) => prevState.filter((goal) => goal.id !== goalId));
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add new goal"
          color={"purple"}
          onPress={() => setShowAddGoalModal(true)}
        />
        <GoalInput
          goal={goal}
          addGoal={addGoal}
          goalInputHandler={goalInputHandler}
          visible={showAddGoalModal}
          close={() => setShowAddGoalModal(false)}
        />
        <View style={styles.goalsContainer}>
          <Text>List of goals!</Text>
          <FlatList
            alwaysBounceVertical={false}
            data={goalList}
            renderItem={({ item: goal, index, separators }) => (
              <GoalItem text={goal.text} deleteGoal={deleteGoal} id={goal.id} />
            )}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
