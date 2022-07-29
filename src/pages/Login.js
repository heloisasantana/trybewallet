import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  validateEmail(email) {
    // Referência utilizada para uso do regex: https://stackoverflow.com/questions/35788383/regex-validation-in-javascript-email;
    const rule = /\S+@\S+\.\S+/;
    return rule.test(email);
  }

  handleChange(event) {
    const { type, value } = event.target;
    this.setState({ [type]: value });
  }

  handleButton() {
    const { email } = this.state;
    const { dispatchUserEmail } = this.props;
    this.setState({ redirect: true });
    dispatchUserEmail(email);
  }

  render() {
    const { email, password, redirect } = this.state;
    const min = 6;
    const bothBoolean = this.validateEmail(email) && password.length >= min;
    return (
      <div>
        <input
          type="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ !bothBoolean }
          onClick={ this.handleButton }
        >
          Entrar
        </button>
        { redirect && (<Redirect to="/carteira" />) }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatchUserEmail: (email) => dispatch(userEmail(email)) };
}

Login.propTypes = {
  dispatchUserEmail: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
