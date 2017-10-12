import React from 'react';
import bindActionCreators from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ToastMessage from '../views';
import { deleteToastMessage } from '../../actions/display-toast';

class ToastMessageList extends React.Component {
  render() {
    const messages = this.props.messages.map(message =>
      <ToastMessage key={message.id} message={message} deleteToastMessage = {this.props.deleteToastMessage}/>
    );
    return (
      <div>
        { messages }
      </div>
    );
  }
}

ToastMessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteToastMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.toasts
});

const mapDispatchToProps = dispatch => ({
  bindActionCreators: ({deleteToastMessage}, dispatch)
})

export default connect(null, mapStateToProps, mapDispatchToProps)(ToastMessageList);