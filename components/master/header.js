import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserControl from './userControl';
import { appStorage } from '../common/appStorage';

export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  constructor(props) {
    super(props);

    appStorage.refreshSideMenuIsCollapsed();
  }

  sideBarToggle() {
    appStorage.setSideMenuIsCollapsed(!appStorage.getSideMenuIsCollapsed());
  }

  render() {
    return (
      <header className="main-header">
        <a href="javascript:" className="logo">
          <span className="logo-mini"><b>B</b>T</span>
          <span className="logo-lg"><b>Biblio</b>teca</span>
        </a>
        <nav className="navbar navbar-static-top">
          <a href="javascript:" className="sidebar-toggle" data-toggle="push-menu" role="button" onClick={() => this.sideBarToggle()}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <UserControl user={this.props.user} />
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}