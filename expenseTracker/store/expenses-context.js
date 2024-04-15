import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: ({ id, description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

function expesesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const expenseIdx = state.findIndex(
        (expese) => expese.id === action.payload.id
      );
      const updatableExpense = state[expenseIdx];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIdx] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "SET":
      return action.payload.reverse();
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expesesReducer, []);

  function addExpense(expenseData) {
    dispatch({
      type: "ADD",
      payload: expenseData,
    });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(expenseId) {
    dispatch({
      type: "DELETE",
      payload: expenseId,
    });
  }

  function updateExpense(expenseId, expenseData) {
    dispatch({
      type: "UPDATE",
      payload: { id: expenseId, data: expenseData },
    });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses: setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
