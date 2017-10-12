import React from 'react';
import PropTypes from 'prop-types';

/** ToastMessage class*/
class ToastMessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.deleteToastMessage(this.props.message.id);

  }
  render() {
		const { id, type, text } = this.props.message;
		return (
			<div className="toast">
				<div className="toast-content">
        { type === 'success' ?
          <p className="alert success-alert">
            <i className="fa fa-check"></i>
            &nbsp;{text}
          </p> :
          ''
        }
        <button onClick={this.handleClose} className="close"><span>&times;</span></button>
				</div>
			</div>
		);
  }
}

ToastMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteToastMessage: PropTypes.func.isRequired
};

export default ToastMessage;