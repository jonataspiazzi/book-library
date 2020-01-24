import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { signInUrl } from '../common/urls';
import Overlay from "../common/overlay";
import { safeFetch } from '../common/safeFetch';

class AuthenticationSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      loginError: '',
      password: '',
      passwordError: '',
      loading: false
    };
  }

  async onSignIn() {
    this.setState({ loading: true, loginError: null, passwordError: null });

    const { login, password } = this.state;

    const data = await safeFetch(signInUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    });

    if (data.status) {
      this.props.history.push('/');
    } else {
      this.setState({
        loginError: data.fieldError.login,
        passwordError: data.fieldError.password,
        loading: false
      });
    }
  }

  onInputChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  onKeyPress(event) {
    if (event.key == 'Enter') {
      this.onSignIn();
    }
  }

  render() {
    const { login, loginError, password, passwordError, loading } = this.state;

    return (
      <div className="signin-wrapper">
        <div className="signin-box">
          <div className="signin-header">
            <span className="logo-lg"><b>Biblio</b>teca</span>
            <h1>Entre</h1>
            <h2>para ir a Biblioteca</h2>
          </div>

          <div className="signin-body">
            <form role="form">
              <div className={`form-group ${loginError ? 'has-error' : ''}`}>
                <input
                  type="text" className="form-control" placeholder="Nome de usuário" value={login} disabled={loading}
                  onChange={e => this.onInputChange('login', e)}
                  onKeyPress={e => this.onKeyPress(e)} />
                <span className="help-block" hidden={!loginError}>{loginError}</span>
              </div>
              <div className={`form-group ${passwordError ? 'has-error' : ''}`}>
                <input
                  type="password" className="form-control" placeholder="Senha" value={password} disabled={loading}
                  onChange={e => this.onInputChange('password', e)}
                  onKeyPress={e => this.onKeyPress(e)} />
                <span className="help-block" hidden={!passwordError}>{passwordError}</span>
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-default" onClick={() => this.onSignIn()} disabled={loading}>
                  Entrar
                  { loading ? <span>&nbsp;&nbsp;<i className="fas fa-spinner fa-spin" /></span> : null }
                </button>
              </div>
            </form>
          </div>

          <div className="signin-footer">
            Copyright &copy;2019 <a href="javascript:">Jônatas Piazzi</a>. All rights reserved.
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AuthenticationSignIn);