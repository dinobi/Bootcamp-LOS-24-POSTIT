import React from 'react';
import PropTypes from 'prop-types';

/**
 * Modal Component
 * Displays a modal when triggered
 *
 * @class Modal
 * @extends {React.Component}
 */
class Modal extends React.Component {
  /**
   * Creates an instance of Modal.
   *
   * @param {any} props
   * @memberof Modal
   */
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
    this.modalToggle = this.modalToggle.bind(this);
  }
  /**
   * This method is called when a modal needs to
   * be opened or closed
   *
   * @memberof Modal
   * @returns {void}
   */
  modalToggle() {
    this.setState({
      modalOpened: !this.state.modalOpened
    });
  }
  /**
   *
   *
   * @returns {jsx} jsx - modal composition
   * @memberof Modal
   */
  render() {
    const coverClass =
      this.state.modalOpened ?
        'modal-cover modal-cover-active' :
        'modal-cover';
    const containerClass =
      this.state.modalOpened ?
        'modal-container modal-container-active' :
        'modal-container';
    const { action, modalTitle, children } = this.props;
    return (
      <div>
        <a onClick={this.modalToggle}>
          {action}
        </a>
        <div className={containerClass}>
          <div className='modal-header'>
            <h5 className="black-text left">
              {modalTitle}
            </h5>
            <i
              className="fa fa-times black-text hang-top"
              onClick={this.modalToggle}
            >
            </i>
          </div>
          <div className='modal-body'>
            {children}
          </div>
          <div className='modal-footer'></div>
        </div>
        <div className={coverClass}></div>
      </div>
    );
  }
}

Modal.defaultProps = {
  modalTtitle: '',
  action: []
};
Modal.propTypes = {
  modalTitle: PropTypes.string.isRequired
};

export default Modal;
