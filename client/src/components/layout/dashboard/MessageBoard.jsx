import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashHeader, SideMenu,
  Copyright, MessageLog, MessageBox }
from '../../views';
import { onSendMessage } from '../../../actions';

/**
 * MessageBoard class
 *
 * @class MessageBoard
 * @extends {React.Component}
 */
class MessageBoard extends React.Component {
  /**
   * Creates an instance of MessageBoard.
   * @param {any} props
   * @memberof MessageBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      // posts: this.props.posts
    };
    this.handleSend = this.handleSend.bind(this);
  }
  /**
   *
   *
   * @param {any} event
   * @memberof MessageBoard
   * @return {function} - action creator
   */
	handleSend(event) {
		event.preventDefault();
		let { message, priority } = this;
    message = message.value.trim();
    priority = priority.value.trim();
    const messageData = { message, priority };
    this.props.onSendMessage(messageData);
    this.refs.messageBox.reset();
	}
  /** */
  render() {
    return (
      <div className="message-board">
        <div className="postlogs">
          {
            this.props.posts.map((post, index) =>
              <MessageLog message={ post } key={index} />
            )
          }
        </div>

        <form ref="messageBox" className="message-box" id="send-message"
          onSubmit = { this.handleSend }
        >
          <textarea
            ref={(input) => { this.message = input; }}
            className="compose"
            placeholder="always be nice...">
          </textarea>
          <select id="priority"
            ref={(input) => { this.priority = input; }}
            className="browser-default action-btn select"
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
            <option value="Critical">Critical</option>
          </select>
          <button type="submit" className="action-btn send" title="send">
            <i className="fa fa-send"></i>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages.groupMessages,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ onSendMessage }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
