import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { safeFetch } from './safeFetch';

export default class SelectInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ]),
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.string
    ]),
    optionKey: PropTypes.string,
    optionValue: PropTypes.string,
    onChange: PropTypes.func,
    readonly: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      options: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const options = typeof props.options === 'string'
      ? (state.options || [])
      : props.options;

    return { options };
  }

  async componentDidMount() {
    if (typeof this.props.options === 'string') {
      await new Promise(async (resolve) => {
        const options = (await safeFetch(this.props.options)).data;
  
        this.setState({ options }, () => resolve());
      });
    }

    if (!this.hasValidValue()) {
      setTimeout(() => {
        this.onChange({ target: { value: this.getKey(this.state.options[0]) } });  
      }, 1);
    }
  }

  onChange(event) {
    if (typeof this.props.onChange === 'function') {
      try {
        const newValue = this.state.options.filter(o => this.getKey(o) == event.target.value).pop();
        this.props.onChange(newValue);
      } catch (ex) { }
    }
  }

  getKey(option) {
    return typeof option === 'object' ? option[this.props.optionKey || 'value'] : option;
  }
  
  getValue(option) {
    return typeof option === 'object' ? option[this.props.optionValue || 'label'] : option;
  }

  hasValidValue() {
    const key = this.getKey(this.props.value);
    return this.state.options.filter(o => this.getKey(o) == key).length > 0;
  }

  render() {
    return (this.props.readonly
      ? <span className="form-control">
          {this.getValue(this.props.value)}
        </span>
      : <select value={this.getKey(this.props.value)} onChange={e => this.onChange(e)} className='form-control'>
          {this.state.options.map(o => 
            <option
              key={`option${this.getKey(o)}`}
              value={this.getKey(o)}>
              {this.getValue(o)}
            </option>)}
        </select>
    );
  }
}
