import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import NumberContainer from "../components/game/NumberContainer";
import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";

const GameScreen = (props) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [guessRounds, setGuessRounds] = useState([]);
  const initialGuess = useMemo(
    () => generateRandomNumberBetween(min, max, props.userNumber),
    [props.userNumber]
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === props.userNumber) {
      props.onGameOver(guessRounds.length);
    }
  }, [currentGuess, props.userNumber]);

  function generateRandomNumberBetween(providedMin, providedMax, exclude) {
    // props.increaseGuesses();
    const rdnNum =
      Math.floor(Math.random() * (providedMax - providedMin)) + providedMin;
    if (rdnNum === exclude) {
      return generateRandomNumberBetween(providedMin, providedMax, exclude);
    } else {
      return rdnNum;
    }
  }

  function nextGuess(isHigher) {
    if (
      (!isHigher && currentGuess < props.userNumber) ||
      (isHigher && currentGuess > props.userNumber)
    ) {
      Alert.alert("Don't lie!", "This is so wrong man..", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (isHigher) {
      setMin(currentGuess + 1);
      const newRandomNr = generateRandomNumberBetween(
        currentGuess + 1,
        max,
        currentGuess
      );
      setCurrentGuess(newRandomNr);
      setGuessRounds((prev) => [newRandomNr, ...prev]);
    } else {
      setMax(currentGuess);
      const newRandomNr = generateRandomNumberBetween(
        min,
        currentGuess,
        currentGuess
      );
      setCurrentGuess(newRandomNr);
      setGuessRounds((prev) => [newRandomNr, ...prev]);
    }
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuess(true)}>
              <Ionicons name="add" size={24} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuess()}>
              <Ionicons name="remove" size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonsContainerWide}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuess(true)}>
                <Ionicons name="add" size={24} />
              </PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuess()}>
                <Ionicons name="remove" size={24} />
              </PrimaryButton>
            </View>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <View style={styles.listItem}>
              <Text style={styles.itemText}>
                # {guessRoundsListLength - itemData.index}
              </Text>
              <Text style={styles.itemText}>
                Opponent's guess:{itemData.item}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    // marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 5,
  },

  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemText: {
    fontFamily: "open-sans",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default GameScreen;
