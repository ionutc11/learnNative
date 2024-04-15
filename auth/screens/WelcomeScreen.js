import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [ex, setEx] = useState("");
  const authCtx = useContext(AuthContext);
  
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `https://expensesapp-50155-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${authCtx.token}`
        );
        // console.log(res);
        setEx(res.data);
      } catch (err) {
        // console.log(err);
      }
    }

    getData();
  }, [authCtx.token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      {ex && <Text>{ex}</Text>}
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
