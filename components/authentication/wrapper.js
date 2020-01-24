import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuthenticationSignIn from './signIn';
import { safeFetch } from '../common/safeFetch';
import { userAuthenticated } from '../common/urls';
import { appStorage } from '../common/appStorage';

class AuthenticationWrapper extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { isAuthenticated: false };

    this.unlistenRouter = null;
  }

  async componentDidMount() {
    await this.checkAuthentication(this.props.location);

    this.unlistenRouter = this.props.history.listen((location) => {
      this.checkAuthentication(location);
    });
  }

  componentWillUnmount() {
    if (this.unlistenRouter) this.unlistenRouter();
  }

  async checkAuthentication(location) {
    // bypass by router
    if (location.pathname === '/signin') {
      appStorage.setUser(null);
      this.setState({ isAuthenticated: false });
      return;
    }
    
    // found in appStorage
    const user = appStorage.getUser();
    if (user) {
      this.setState({ isAuthenticated: true });
      return;
    }
    
    // get from server
    const result = await fetch(userAuthenticated());
    let auth = {};
    
    try {
      auth = await result.json() || {};
    } catch {}

    if (auth.isAuthenticated) {
      appStorage.setUser(auth.user);
      this.setState({ isAuthenticated: true });
      return;
    }

    // fail in all attempts of authentication
    appStorage.setUser(null);
    this.setState({ isAuthenticated: false });
  }

  render() {
    return (this.state.isAuthenticated ? this.props.children : <AuthenticationSignIn />);
  }
}

export default withRouter(AuthenticationWrapper);