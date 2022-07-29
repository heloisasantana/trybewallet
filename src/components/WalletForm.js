import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrencies } from '../redux/actions';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
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

  render() {
    const { currencies } = this.state;
    return (
      <div>
        <p>Despesa</p>
        <span> Valor </span>
        <input type="text" placeholder="Digite aqui" data-testid="value-input" />
        <span> Descrição </span>
        <input type="text" placeholder="Digite aqui" data-testid="description-input" />
        <label htmlFor="moeda">
          <span> Moeda </span>
          <select id="moeda" data-testid="currency-input">
            { currencies.map((item) => <option key={ item }>{ item }</option>) }
          </select>
        </label>
        <label htmlFor="pagamento">
          <span> Forma de Pagamento </span>
          <select id="pagamento" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          <span> Categoria </span>
          <select id="categoria" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatchCurrencies: (currencies) => dispatch(requestCurrencies(currencies)) };
}

WalletForm.propTypes = {
  dispatchCurrencies: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(WalletForm);
