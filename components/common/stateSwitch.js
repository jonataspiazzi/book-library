import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextBlock from './textBlock';
import Skeleton from './skeleton';

class StateSwitch extends Component {
  static propTypes = {
    value: PropTypes.bool,
    valueNames: PropTypes.arrayOf(PropTypes.string),
    actionNames: PropTypes.arrayOf(PropTypes.string),
    readonly: PropTypes.bool,
    skeleton: PropTypes.bool,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);
  }
  
  onChange() {
    if (this.props.readonly) return;

    if (typeof this.props.onChange === 'function') {
      try {
        this.props.onChange(!this.props.value);
      } catch (e) { }
    }
  }

  render() {
    return (this.props.skeleton
      ? <Skeleton type="text-block" />
      : ( this.props.readonly
        ? <TextBlock text={this.props.value ? this.props.valueNames[0] : this.props.valueNames[1]} />
        : <div className="input-group">    
            <TextBlock text={this.props.value ? this.props.valueNames[0] : this.props.valueNames[1]} />
            <span className="input-group-btn">
              <button type="button" className="btn btn-primary btn-flat" onClick={() => this.onChange()}>
                {this.props.value ? this.props.actionNames[1] : this.props.actionNames[0]}
              </button>
            </span>
          </div>)
    );
  }
}

export default withRouter(StateSwitch);