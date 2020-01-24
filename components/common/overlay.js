import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Overlay extends Component {
  static propTypes = {
    enabled: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (this.props.enabled
      ? <div className="overlay">
          <div className="overlay-progress">
            <div className="overlay-cut">
              <div className="overlay-bar">
              </div>
            </div>
          </div>
        </div>
      : null
    );
  }
}