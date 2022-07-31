// Coloque aqui suas actions
export const userEmail = (email) => ({
  type: 'EMAIL',
  email,
});

export const requestCurrencies = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});

export const submitExpenses = (expenses) => ({
  type: 'EXPENSES',
  expenses,
});

export const requestAsk = (ask) => ({
  type: 'ASK',
  ask,
});
