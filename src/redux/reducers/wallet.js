// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case 'REMOVING':
    return {
      ...state,
      expenses: (state.expenses.filter((expense) => expense.id !== action.expenseID)),
    };
  default:
    return state;
  }
};

export default wallet;
