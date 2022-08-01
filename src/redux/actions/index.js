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
