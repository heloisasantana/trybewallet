import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { requestCurrencies, submitExpenses, requestAsk } from '../redux/actions';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      valor: '',
      descricao: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      categoria: 'Alimentação',
      expensesTemporary: [],
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

  saveInfos = () => {
    const { valor, descricao, moeda, pagamento, categoria, expensesTemporary } = this.state;
    const { dispatchAsk, dispatchExpenses } = this.props;
    this.setState((prev) => ({
      expensesTemporary: [...prev.expensesTemporary, { valor, descricao, moeda, pagamento, categoria }],
    }));
    const gerandoExpenses = async () => {
      const resolvedAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
      await resolvedAPI.json()
        .then((response) => {
          const expenses = {
            id: expensesTemporary.length,
            value: valor,
            description: descricao,
            currency: moeda,
            method: pagamento,
            tag: categoria,
            exchangeRates: response,
          };
          dispatchExpenses(expenses);
          const especificCoin = async () => {
            const fetchCoin = await fetch(`https://economia.awesomeapi.com.br/json/${expenses.currency}`);
            await fetchCoin.json()
              .then((data) => {
                dispatchAsk(data[0].ask);
              });
          };
          especificCoin();
        });
    };
    gerandoExpenses();
    this.setState({ valor: '', descricao: '' });
  }

  render() {
    const { currencies, valor, descricao, moeda, pagamento, categoria } = this.state;
    return (
      <div>
        <p>Despesa</p>
        <span> Valor </span>
        <input
          type="text"
          placeholder="Digite aqui"
          data-testid="value-input"
          name="valor"
          value={ valor }
          onChange={ this.handleChange }
        />
        <span> Descrição </span>
        <input
          type="text"
          placeholder="Digite aqui"
          data-testid="description-input"
          name="descricao"
          value={ descricao }
          onChange={ this.handleChange }
        />
        <label htmlFor="moeda">
          <span> Moeda </span>
          <select
            id="moeda"
            data-testid="currency-input"
            value={ moeda }
            name="moeda"
            onChange={ this.handleChange }
          >
            { currencies.map((item) => <option key={ item }>{ item }</option>) }
          </select>
        </label>
        <label htmlFor="pagamento">
          <span> Forma de Pagamento </span>
          <select
            id="pagamento"
            data-testid="method-input"
            name="pagamento"
            value={ pagamento }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          <span> Categoria </span>
          <select
            id="categoria"
            data-testid="tag-input"
            name="categoria"
            value={ categoria }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.saveInfos }>Adicionar despesa</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchCurrencies: (currencies) => dispatch(requestCurrencies(currencies)),
    dispatchExpenses: (expenses) => dispatch(submitExpenses(expenses)),
    dispatchAsk: (ask) => dispatch(requestAsk(ask)),
  };
}

// WalletForm.propTypes = {
//   dispatchCurrencies: PropTypes.shape({
//     currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
//   }).isRequired,
//   dispatchExpenses:
//   dispatchAsk:
// };

export default connect(null, mapDispatchToProps)(WalletForm);
