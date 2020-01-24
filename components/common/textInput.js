import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextBlock from './textBlock';
import Skeleton from './skeleton';

export default class TextInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    type: PropTypes.oneOf(['email', 'password', 'search', 'tel', 'text', 'url']),
    rows: PropTypes.number,
    readonly: PropTypes.bool,
    skeleton: PropTypes.bool,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  onChange(event) {
    if (this.props.readonly) return;

    if (typeof this.props.onChange === 'function') {
      try {
        this.props.onChange(event.target.value);
      } catch (e) { }
    }
  }

  render() {
    return (this.props.skeleton
      ? <Skeleton type="text-block" />
      : ( this.props.readonly
        ? <TextBlock text={this.props.value} />
        : (this.props.rows > 1
            ? <textarea
                className="form-control"
                onChange={e => this.onChange(e)}
                value={this.props.value}
                rows={this.props.rows}></textarea>
            : <input
                type={this.props.type || 'text'}
                value={this.props.value}
                className="form-control"
                onChange={e => this.onChange(e)} />))
    );
  }
}
