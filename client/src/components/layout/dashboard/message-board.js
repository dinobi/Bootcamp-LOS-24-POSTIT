import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

      <div className="message-box" id="send-message">
        <textarea className="compose" placeholder="Type your message - always be nice...">
        </textarea>
        <select id="priority" className="btn btn-create"
          ref= {(input) => { this.priority = input; }}>
          <option value="normal">normal</option>
          <option value="Urgent">urgent</option>
          <option value="critical">critical</option>
        </select>
      </div>
  </div>
    );
  }
}


export default MessageBoard;
