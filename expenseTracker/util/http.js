import axios from "axios";

const ROOT_API_PATH =
  "https://expensesapp-50155-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    ROOT_API_PATH + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(ROOT_API_PATH + "/expenses.json");
  
  const expenses = Object.keys(response.data).map((key) => ({
    id: key,
    ...response.data[key],
    date: new Date(response.data[key].date),
  }));

  return expenses;
}

export function updateExpense(id, updatedExpenseData) {
  return axios.put(ROOT_API_PATH + `/expenses/${id}.json`, updatedExpenseData);
}

export function deleteExpense(id) {
  return axios.delete(ROOT_API_PATH + `/expenses/${id}.json`);
}
