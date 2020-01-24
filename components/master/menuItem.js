import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class MenuItem extends Component {
  static propTypes = {
    route: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      route: '',
      icon: '',
      name: '',
      active: false
    }
  }

  static getDerivedStateFromProps(props) {
    const { route, icon, name } = props;

    const active = route === '/'
      ? document.location.pathname === '/'
      : document.location.pathname.startsWith(route);

    return { route, icon, name, active };
  }

  onClick() {
    this.props.history.push(this.state.route);
  }

  render() {
    const { icon, name, active } = this.state;
    return (
      <li className={`treeview ${active ? 'active' : ''}`}>
        <a href="javascript:" onClick={() => this.onClick()}>
          <i className={icon}></i> <span>{name}</span>
        </a>
      </li>
    );
  }
}

export default withRouter(MenuItem);