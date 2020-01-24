import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { safeFetch } from '../common/safeFetch';
import { signOutUrl } from '../common/urls';
import { withRouter } from 'react-router-dom';
import { withUser } from '../authentication/withUser';
import { appStorage } from '../common/appStorage';

class UserControl extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      boxOpen: false,
      user: null
    };
  }

  static getDerivedStateFromProps(props) {
    const { user } = props;

    if (user) {
      if (user.firstName && user.lastName) {
        user.initials = user.firstName.substr(0, 1) + user.lastName.substr(0, 1);
      }
    }

    return { user };
  }

  toggle() {
    this.setState({
      boxOpen: !this.state.boxOpen
    });
  }

  async signOut() {
    await safeFetch(signOutUrl());
    appStorage.setUser(null);
    this.props.history.push('/signin');
  }

  render() {
    const { boxOpen, user } = this.state;

    return (user
      ? <li className={`dropdown user user-menu ${boxOpen ? 'open' : null}`}>
          <a href="javascript:" className="dropdown-toggle" aria-expanded="true" onClick={() => this.toggle()}>
            <span className="user-image">{user.initials}</span>
            <span className="hidden-xs">{user.firstName} {user.lastName}</span>
          </a>
          <ul className="dropdown-menu">
            <li className="user-header">
              <div className="image-box">
                <span className="image-circle">{user.initials}</span>
              </div>
              <p>{user.firstName} {user.lastName}</p>
            </li>
            <li className="user-footer">
              <a href="javascript:" className="btn btn-default btn-flat" onClick={() => this.signOut()}>
                Sair
              </a>
            </li>
          </ul>
        </li>
      : null
    );
  }
}

export default withUser(withRouter(UserControl));