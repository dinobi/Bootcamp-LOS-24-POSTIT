import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashHeader, SideMenu,
  Copyright, MessageLog, MessageBox }
from '../../views';
import onSendMessage from '../../../actions/send-message';

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
      posts: this.props.posts
    };
    this.handleSend = this.handleSend.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.newMessage) {
      this.setState({
        posts: [...this.props.posts, this.props.newMessage]
      });
    }
  }
  /** handleSend {e} */
	handleSend(e) {
		e.preventDefault();
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
            this.state.posts.map((post, index) =>
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
          className="btn btn-create"
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="Critical">Critical</option>
        </select>
        <button type="submit" className="btn btn-create">
        Submit
      </button>
    </form>
  </div>
    );
  }
}

const mapStateToProps = state => ({
  newMessage: state.newMessage.message,
  // messages: state.messages
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ onSendMessage }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
