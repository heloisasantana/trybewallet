import React from 'react';

class Login extends React.Component {
  constructor() {
  super();
  this.state = {
    validEmail: false,
    validPassword: false,
    disabled: true,
  }
  }
  
  handleEmail = (event) => {
    if (event.target.type === 'email') {
      const email = event.target.value;
      // Referência utilizada para uso do regex: https://stackoverflow.com/questions/35788383/regex-validation-in-javascript-email;
      const rule = /\S+@\S+\.\S+/;
      console.log(rule.test(email)); 
      this.setState({ validEmail: rule.test(email) });
      return rule.test(email);
    }
  }

  handlePassword = (event) => {
    if (event.target.type === 'password') {
    const { validPassword } = this.state;
    const password = event.target.value;
    const min = 6; 
    if (password.length >= min) { this.setState({ validPassword: true })}
    console.log(validPassword); 
    return validPassword;
  }
}
 
  validateButton = (event) => {
    console.log('validateButton funcionando');
    this.handleEmail(event);
    this.handlePassword(event);
    const { validEmail, validPassword } = this.state;
    console.log(validEmail);
    console.log(validPassword);
    console.log(validEmail && validPassword);
    if (validEmail && validPassword === true) {
      this.setState({ disabled: false })
    }
    else { this.setState({ disabled: true }) }
  }

  render() {
    const { disabled } = this.state;
    return (
    <div>
      <input type="email" data-testid="email-input" onChange={ this.validateButton } />
      <input type="password" data-testid="password-input" onChange={ this.validateButton } />
      <input type="button" value="Entrar" disabled={ disabled } />
    </div>
    );
  }
}

export default Login;
