import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextBlock extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="form-control">
        {this.props.text}
      </span>
    );
  }
}
