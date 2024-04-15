import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpensesScreen = () => {
  const { expenses } = useContext(ExpensesContext);

  return <ExpensesOutput expenses={expenses} expensesPeriod="Total" fallbackText={"No registers found"} />;
};

export default AllExpensesScreen;
