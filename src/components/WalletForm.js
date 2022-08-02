import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrencies, saveExpenses, refreshExpenses } from '../redux/actions';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    const requestAPI = async () => {
      const resolvedAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
      await resolvedAPI.json()
        .then((response) => {
          const filtered = Object.keys(response).filter((item) => item !== 'USDT');
          dispatchCurrencies(filtered);
          const listCurrencies = dispatchCurrencies(filtered).currencies;
          this.setState({ currencies: listCurrencies });
        });
    };
    requestAPI();
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  saveOrEditInfos = () => {
    const { value, description, currency, method, tag } = this.state;
    const { editor, expenses, dispatchExpenses, idToEdit, dispatchRefresh } = this.props;
    if (editor === false) {
      const generateExpenses = async () => {
        const resolvedAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
        await resolvedAPI.json()
          .then((response) => {
            const expensesToSave = {
              id: expenses.length,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates: response,
            };
            dispatchExpenses(expensesToSave);
          });
      };
      generateExpenses();
    }
    if (editor === true) {
      const editedExpense = {
        id: idToEdit,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: expenses[idToEdit].exchangeRates,
      };
      dispatchRefresh(editedExpense);
    }
    this.setState({ value: '', description: '' });
  }

  render() {
    const { currencies, value, description, currency, method, tag } = this.state;
    const { editor } = this.props;
    return (
      <div>
        <p>Despesa</p>
        <span> Valor </span>
        <input
          type="text"
          placeholder="Digite aqui"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <span> Descrição </span>
        <input
          type="text"
          placeholder="Digite aqui"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <label htmlFor="currency">
          <span> Moeda </span>
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((item) => <option key={ item }>{ item }</option>) }
          </select>
        </label>
        <label htmlFor="method">
          <span> Forma de Pagamento </span>
          <select
            id="method"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <span> Categoria </span>
          <select
            id="tag"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.saveOrEditInfos }>
          { editor === false ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
    editor: state.wallet.editor,
    idToEdit: state.wallet.idToEdit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchCurrencies: (currencies) => dispatch(requestCurrencies(currencies)),
    dispatchExpenses: (expenses) => dispatch(saveExpenses(expenses)),
    dispatchRefresh: (editedExpense) => dispatch(refreshExpenses(editedExpense)),
  };
}

WalletForm.propTypes = {
  // Referência para utilizar o any para receber um objeto com qualquer tipo de dado: https://www.codegrepper.com/code-examples/whatever/proptypes.any;
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  dispatchCurrencies: PropTypes.func.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  dispatchRefresh: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
