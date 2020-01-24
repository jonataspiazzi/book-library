import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { imageUrl } from './urls';
import ImagePicker from './imagePicker';

export default class ImageInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    readonly: PropTypes.bool,
    multiple: PropTypes.bool,
    aspect: PropTypes.number.isRequired,
    onChange: PropTypes.func
  };
  
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }

  static getDerivedStateFromProps(props) {
    const images = props.multiple ? props.value : (props.value ? [props.value] : []);
    return { images };
  }

  onChange(newValue) {
    if (typeof this.props.onChange === 'function') {
      try {
        this.props.onChange(newValue);
      } catch (ex) { }
    }
  }

  removeImage(imageName) {
    if (this.props.readonly) return;

    let newValue;

    if (this.props.multiple) {
      newValue = [...this.props.value];

      const index = newValue.indexOf(imageName);
      newValue.splice(index, 1);
    } else {
      newValue = this.props.value == imageName ? null : this.props.value;
    }

    this.onChange(newValue);
  }

  async onImagesPicked(urls) {
    if (urls.length <= 0) return;

    const newImages = urls.map(url => url.split('/').splice(-1).pop());
    let newValue;

    if (this.props.multiple) {
      newValue = [...this.props.value];
      newValue.push(...newImages);
    } else {
      newValue = newImages[0];
    }

    this.onChange(newValue);
  }

  render() {
    return (
      <div className="image-collection">
        {this.state.images.map(imageName =>
          <div
            key={`image-${imageName}`}
            className={`image-box ${this.props.readonly ? '' : 'removable'}`}
            style={{ height: 160 / this.props.aspect }}
            onClick={() => this.removeImage(imageName)}
          >
            <img src={imageUrl(imageName)} />
          </div>
        )}
        {this.props.readonly || !this.props.multiple && this.props.value ? '' :
          <ImagePicker
            aspect={this.props.aspect}
            onChange={urls => this.onImagesPicked(urls)}
            multiple={this.props.multiple}
            labelClassName="image-box button-add"
            labelStyle={{ height: 160 / this.props.aspect }} />
        }
      </div>
    );
  }
}
