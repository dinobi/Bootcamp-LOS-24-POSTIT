import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onSendMessage from '../../../actions/send-message';
import { DashHeader, SideMenu, Copyright, MessageLog, MessageBox } from '../../views';

/**
 * MessageBoard layout component that provides access to a user's message board
 * 
 * 
 */
class MessageBoard extends React.Component {
  /**
   * @param {props} - props
  */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
    this.handleSend = this.handleSend.bind(this);
  }

  handleSend(e) {
    e.preventDefault();
    
    onSendMessage()

  }

  /** */
  render() {
    const { posts } = this.props;
    return (
      <div className="message-board">
        <div className="postlogs">
          {
            posts.map((post, index) =>
              <MessageLog message={ post } key={index} />
            )
          }
      </div>

      <form className="message-box" id="send-message" onSubmit={ this.handleSend }>
        <textarea className="compose" placeholder="always be nice..."></textarea>
        <select id="priority" className="btn btn-create">
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="Critical">Critical</option>
        </select>
    </form>
  </div>
    );
  }
}


export default MessageBoard;
