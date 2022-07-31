// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  ask: 0,
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
      expenses: [...state.expenses, action.expenses]
    };
  case 'ASK':
    return {
      ...state,
      ask: (Number(state.ask) + Number(action.ask)).toFixed(2),
    };
  default:
    return state;
  }
};

export default wallet;
