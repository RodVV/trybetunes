import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameInput: '',
      loading: false,
    };

    this.loginButtonClick = this.loginButtonClick.bind(this);
  }

  handleChange(value) {
    this.setState({
      userNameInput: value,
    });
  }

  async loginButtonClick() {
    const { history } = this.props;
    const { userNameInput } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userNameInput });
    history.push('/search');
    // https://v5.reactrouter.com/web/api/Hooks
  }

  render() {
    const { userNameInput, loading } = this.state;
    const minLength = 3;
    return (
      <div data-testid="page-login">
        <label htmlFor="login-input">
          <input
            type="text"
            data-testid="login-name-input"
            value={ userNameInput }
            onChange={ (e) => this.handleChange(e.target.value) }
          />
        </label>
        <label htmlFor="login-button">
          <input
            type="button"
            data-testid="login-submit-button"
            value="Entrar"
            disabled={ userNameInput.length < minLength }
            onClick={ this.loginButtonClick }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func,
  loginButtonClick: PropTypes.func,
}.isRequired;

export default Login;
