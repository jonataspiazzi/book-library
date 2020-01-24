import React, { Component } from 'react';

export default class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      type: null,
      visible: false,
      currentCloseTimeout: 0
    };
  }

  removeCloseTimeout() {
    if (this.state.currentCloseTimeout) {
      clearTimeout(this.state.currentCloseTimeout);
    }
  }

  componentWillUnmount() {
    this.removeCloseTimeout();
  }

  setMessage(message, type = 'success', timeout = 5000) {
    this.removeCloseTimeout();

    const closeTimeout = setTimeout(() => {
      this.setState({
        visible: false
      });
    }, timeout);

    this.setState({
      message,
      type,
      visible: true,
      currentCloseTimeout: closeTimeout
    });
  }

  onCloseClick() {
    this.removeCloseTimeout();

    this.setState({
      visible: false
    });
  }

  getAlertType() {
    const { type } = this.state;

    switch(type) {
      case 'success':
      case 'warning':
      case 'danger':
        return type;
      case 'info':
      default: return 'info';
    }
  }

  getIcon() {
    const { type } = this.state;

    switch(type) {
      case 'success': return 'fas fa-check';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'danger': return 'fas fa-ban';
      case 'info':
      default: return 'fas fa-info';
    }
  }

  render() {
    const { visible, message } = this.state;

    return (visible
      ? <div className="row">
          <div className="col-md-12">
            <div className={`alert alert-${this.getAlertType()} alert-dismissible`}>
              <button type="button" className="close" onClick={() => this.onCloseClick()}>×</button>
              <h4><i className={this.getIcon()}></i> Mensagem!</h4>
              <span>{message}</span>
            </div>
          </div>
        </div>
      : null
    );
  }
}