import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormGroup extends Component {
  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired
  };
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        {this.props.children}
      </div>
    );
  }
}
