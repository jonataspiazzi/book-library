import React, { Component } from "react";
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { nc } from './nullConditional';

export default class AutoSelect extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    loadOptions: PropTypes.func.isRequired,
    onChange: PropTypes.func
  };

  render() {
    const { placeholder, loadOptions, onChange } = this.props;

    return (
      <AsyncSelect
        defaultOptions
        placeholder={placeholder}
        loadOptions={loadOptions}
        onChange={(item, action) => nc(() => onChange(item, action))}
        styles={{
          control: styles => ({ ...styles, backgroundColor: '#fff' }),
          option: (styles, { isFocused, isSelected }) => {
            return {
              ...styles,
              backgroundColor: isFocused ? '#2684ff' : (isSelected ? '#ddd' : '#fff'),
              color: isFocused ? '#fff' : (isSelected ? '#444' : '#000')
            };
          }
        }} />
    );
  }
}