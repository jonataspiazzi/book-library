import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
      className: PropTypes.string,
      selfClose: PropTypes.bool,
      onClick: PropTypes.func,
      text: PropTypes.string,
      disabled: PropTypes.bool
    }))
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { isOpen, buttons, title, onClose } = this.props;

    buttons = buttons || [{
      type: 'default',
      className: 'pull-right',
      selfClose: true,
      onClick: null,
      text: 'Ok'
    }];

    return (
      <div className={`modal fade ${isOpen ? 'in' : ''}`} style={{ display: isOpen ? 'block' : 'none'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={() => onClose()}>
                <span>×</span>
              </button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              { buttons.map((b, index) => (
                <button
                  key={`modal-button-${index}`}
                  type="button"
                  disabled={b.disabled}
                  className={`btn btn-${b.type || 'default'} ${b.className}`}
                  onClick={e => b.selfClose ?  onClose() : true && b.onClick && b.onClick(e)}
                >
                  {b.text}
                </button>))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
