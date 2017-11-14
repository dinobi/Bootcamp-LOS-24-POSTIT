import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false
    };
    this.modalToggle = this.modalToggle.bind(this);
  }
  /**
   *
   * @memberof Modal
   * @returns {Object} - new state
   */
  modalToggle() {
    this.setState({
      modalOpened: !this.state.modalOpened
    });
  }
  /**
   *
   *
   * @returns { jsx } jsx - modal composition
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
    return (
      <div>
        <a onClick={this.modalToggle}>
          {this.props.action}
        </a>
        <div className={containerClass}>
          <div className='modal-header'>
            <h5 className="black-text left">
              {this.props.modalTitle}
            </h5>
            <i className="fa fa-times black-text right" onClick={this.modalToggle}>
            </i>
          </div>
          <div className='modal-body'>
            {this.props.children}
          </div>
          <div className='modal-footer'></div>
        </div>
        <div className={coverClass}></div>
      </div>
    );
  }
}

export default Modal;
