import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpensesScreen = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (e) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  function errorHandler() {
    setError(null);
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if(error && !isFetching) {
    return <ErrorOverlay  message={error} onConfirm={errorHandler} />
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 days"}
      fallbackText={"No expenses registered for the last 7 days"}
    />
  );
};

export default RecentExpensesScreen;
