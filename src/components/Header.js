import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, ask } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email === '' ? 'Usuário não logado' : email }</p>
        <span data-testid="total-field">{ ask }</span>
        <span data-testid="header-currency-field"> BRL</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    ask: state.wallet.ask,
  };
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  ask: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
