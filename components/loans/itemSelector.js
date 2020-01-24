import React, { Component } from "react";
import PropTypes from 'prop-types';
import AutoSelect from '../common/autoSelect';
import { nc } from '../common/nullConditional';
import { safeFetch } from '../common/safeFetch';

export default class ItemSelector extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    optionsUrl: PropTypes.string.isRequired,
    optionsFormater: PropTypes.func.isRequired,
    onChange: PropTypes.func
  }

  async loadOptions(text) {
    const { optionsUrl, optionsFormater } = this.props;

    const res = await safeFetch(`${optionsUrl}?search=${text}`);

    return res.data.map(optionsFormater);
  }

  render() {
    const { name, onChange } = this.props;
    return (
      <div className="small-box bg-gray">
        <div className="inner">
          <AutoSelect
            placeholder={`Selecione um ${name}`}
            loadOptions={text => this.loadOptions(text)}
            onChange={item => nc(() => onChange(item.value))} />
        </div>
      </div> 
    );
  }
}