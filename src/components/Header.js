import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email === '' ? 'Usuário não logado' : email }</p>
        <span data-testid="total-field">
          { expenses.length === 0 ? ('0') : (
            expenses
              .reduce((acc, curr) => acc
            + (Number(curr.value) * curr.exchangeRates[curr.currency].ask), 0)
              .toFixed(2)
          )}
        </span>
        <span data-testid="header-currency-field"> BRL</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
  };
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // Referência para utilizar o any para receber um objeto com qualquer tipo de dado: https://www.codegrepper.com/code-examples/whatever/proptypes.any;
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default connect(mapStateToProps, null)(Header);
