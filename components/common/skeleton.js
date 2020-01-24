import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Skeleton extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'grid-text', 'grid-button', 'button', 'text-block']),
    text: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className={`skeleton sk-${this.props.type}`}>{this.props.text}</span>
    );
  }
}
