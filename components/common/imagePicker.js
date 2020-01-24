import React, { Component } from "react";
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from './modal';
import PromiseList from './promiseList';
import {
  dataUrlFromFile,
  imageFromDataUrl,
  getInitialPixelCrop,
  cropFromPixelCrop,
  fileFromImageCrop,
  uploadImage } from './imageHelper';

const defaultState = (aspect) => ({
  isModalOpen: false,
  files: [],
  imageSrc: '',
  image: '',
  aspect: aspect || 1,
  pixelCrop: {},
  crop: {},
  currentIndex: 0,
  isLastStep: false
});

export default class ImagePicker extends Component {
  static propTypes = {
    aspect: PropTypes.number,
    onChange: PropTypes.func,
    multiple: PropTypes.bool,
    labelClassName: PropTypes.string,
    labelText: PropTypes.string,
    labelStyle: PropTypes.object,
    inputFileClassName: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = defaultState(this.props.aspect);
    this.state.result = new PromiseList();

    this.id = `id-${uuidv4()}`;
  }

  async onFilePicked() {
    if (this.inputFile.files.length <= 0) {
      return;
    }

    const newState = defaultState(this.state.aspect);

    newState.isModalOpen = true;
    newState.files = [...this.inputFile.files];
    newState.imageSrc = await dataUrlFromFile(newState.files[0]);
    newState.image = await imageFromDataUrl(newState.imageSrc);
    newState.pixelCrop = getInitialPixelCrop(newState.image, newState.aspect);
    newState.crop = cropFromPixelCrop(newState.image, newState.pixelCrop, newState.aspect);
    newState.currentIndex = 0;
    newState.isLastStep = newState.files.length <= 1;
    newState.result = new PromiseList();

    this.inputFile.value = '';

    this.setState(newState);
  }

  onModalClose() {
    this.setState({
      isModalOpen: false
    });
  }

  onCropChanged(crop) {
    this.setState({
      crop
    });
  }

  onFinishedCrop(crop, pixelCrop) {
    this.setState({
      pixelCrop
    });
  }

  async onNextImageCrop() {
    const newIndex = this.state.currentIndex + 1;

    this.state.result.push((async () => {
      const file = await fileFromImageCrop(this.state.image, this.state.pixelCrop);
      return await uploadImage(file);
    })());

    if (newIndex >= this.state.files.length) {
      this.finishCrops();
      return;
    }

    const newState = { ...this.state };

    newState.imageSrc = await dataUrlFromFile(newState.files[newIndex]);
    newState.image = await imageFromDataUrl(newState.imageSrc);
    newState.pixelCrop = getInitialPixelCrop(newState.image, newState.aspect);
    newState.crop = cropFromPixelCrop(newState.image, newState.pixelCrop, newState.aspect);
    newState.currentIndex = newIndex;
    newState.isLastStep = newIndex + 1 >= newState.files.length;

    this.setState(newState);
  }

  async finishCrops() {
    if (this.props.onChange) {
      var urls = await this.state.result.toArray();
      this.props.onChange(urls);
    }

    this.onModalClose();
  }

  render() {
    return (
      <div>
        <label htmlFor={this.id} className={this.props.labelClassName} style={this.props.labelStyle}>
          {this.props.labelText}
        </label>
        <input type="file"
          id={this.id}
          ref={r => this.inputFile = r}
          className={this.props.inputFileClassName}
          onChange={() => this.onFilePicked()}
          multiple={this.props.multiple} />
        <Modal
          title="Crop Image"
          isOpen={this.state.isModalOpen}
          onClose={() => this.onModalClose()}
          buttons={[
            { text: 'Fechar', type: 'default', className: 'pull-left', selfClose: true },
            { text: `Aceitar Corte${this.state.isLastStep ? '' : ' e Ir para Próxima'}`,
              type: 'primary',
              onClick: () => this.onNextImageCrop() }
          ]}
        >
          <ReactCrop
            crop={this.state.crop}
            src={this.state.imageSrc}
            onChange={c => this.onCropChanged(c)}
            onComplete={(crop, pixelCrop) => this.onFinishedCrop(crop, pixelCrop)} />
        </Modal>
      </div>
    );
  }
}
