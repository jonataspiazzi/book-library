import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { safeFetch } from '../common/safeFetch';

export default class ChecklistInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object)
    ]),
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
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

    this.state = { options: [] };
  }

  static getDerivedStateFromProps(props, state) {
    const options = typeof props.options === 'string'
      ? (state.options || [])
      : props.options;

    return { options };
  }

  async componentDidMount() {
    if (typeof this.props.options === 'string') {
      const options = await safeFetch(this.props.options);

      this.setState({ options });
    }
  }

  onChange(key, event) {
    if (!(typeof this.props.onChange === 'function')) return;
    
    const item = this.state.options.filter(o => this.getKey(o) == key).pop();
    const newValue = [...this.props.value];

    if (event.target.checked) {
      newValue.push(item);
    } else {
      const key = this.getKey(item);
      const index = newValue.reduce((ac, curr, i) => this.getKey(curr) == key ?  i : ac, -1);
      newValue.splice(index, 1);
    }

    try {
      this.props.onChange(newValue);
    } catch (ex) { }
  }

  getKey(option) {
    return this.props.optionKey ? option[this.props.optionKey] : option;
  }
  
  getValue(option) {
    return this.props.optionValue ? option[this.props.optionValue] : option;
  }

  hasValidValue(option) {
    const key = this.getKey(option);
    return this.props.value.filter(v => this.getKey(v) == key).length > 0;
  }

  render() {
    return (
      <Fragment>
        {this.state.options
          .filter(o => !this.props.readonly || this.hasValidValue(o))
          .map(o => 
            <div className="checkbox" key={`option${this.getKey(o)}`}>
              <label>
                <input type="checkbox"
                  checked={this.hasValidValue(o)}
                  onChange={e => this.onChange(this.getKey(o), e)}
                  disabled={this.props.readonly} />
                {this.getValue(o)}
              </label>
            </div>)}
      </Fragment>
    );
  }
}
