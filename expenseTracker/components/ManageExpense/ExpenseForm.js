import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({ cancel, onSubmit, submitButtonLabel, expense }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: expense?.amount?.toString() ?? "",
      isValid: true,
    },
    date: {
      value: expense?.date ? getFormattedDate(expense.date) : "",
      isValid: true,
    },
    description: {
      value: expense?.description ?? "",
      isValid: true,
    },
  });

  function handleInputChange(inputIdentifier, enteredVal) {
    setInputs((curInputVal) => {
      return {
        ...curInputVal,
        [inputIdentifier]: { value: enteredVal, isValid: true },
      };
    });
  }

  const confirmHandler = () => {
    const expenseData = {
      description: inputs.description.value,
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const formIsValid = amountIsValid && dateIsValid && descriptionIsValid;

    if (!formIsValid) {
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid = Object.keys(inputs).some((key) => !inputs[key].isValid);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInputStyle}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (val) => handleInputChange("amount", val),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInputStyle}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            onChangeText: (val) => handleInputChange("date", val),
            maxLength: 10,
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
          invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: (val) => handleInputChange("description", val),
          value: inputs.description.value,
          multiline: true,
          //   autocorrect: false,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid inputs</Text>}
      <View style={styles.buttons}>
        <Button
          style={{ minWidth: 120, marginHorizontal: 8 }}
          mode={"flat"}
          onPress={cancel}
        >
          Cancel
        </Button>
        <Button
          style={{ minWidth: 120, marginHorizontal: 8 }}
          onPress={confirmHandler}
        >
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInputStyle: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExpenseForm;
