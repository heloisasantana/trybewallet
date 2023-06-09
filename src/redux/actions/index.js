// Coloque aqui suas actions
export const userEmail = (email) => ({
  type: 'EMAIL',
  email,
});

export const requestCurrencies = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});

export const saveExpenses = (expenses) => ({
  type: 'EXPENSES',
  expenses,
});

export const removeFromExpenses = (expenseID) => ({
  type: 'REMOVING',
  expenseID,
});

export const sendExpenseToEdit = (expenseID) => ({
  type: 'EDITING',
  expenseID,
});

export const refreshExpenses = (editedExpense) => ({
  type: 'REFRESH',
  editedExpense,
});
