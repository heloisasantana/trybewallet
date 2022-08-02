import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromExpenses } from '../redux/actions';

class Table extends React.Component {
  removeExpense = (expenseID) => {
    const { dispatchRemoveFromExpenses } = this.props;
    dispatchRemoveFromExpenses(expenseID);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          { expenses.map((e) => (
            <tbody key={ e.id }>
              <tr key={ e.id }>
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method }</td>
                <td>{ Number(e.value).toFixed(2) }</td>
                <td>{ e.exchangeRates[e.currency].name }</td>
                <td>{ Number(e.exchangeRates[e.currency].ask).toFixed(2) }</td>
                <td>
                  { (Number(e.value) * Number(e.exchangeRates[e.currency].ask))
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeExpense(e.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchRemoveFromExpenses: (expenseID) => dispatch(removeFromExpenses(expenseID)),
  };
}

Table.propTypes = {
  // Referência para utilizar o any para receber um objeto com qualquer tipo de dado: https://www.codegrepper.com/code-examples/whatever/proptypes.any;
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  dispatchRemoveFromExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
