import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageLog from './MessageLog.jsx';
import {
  DashHeader, SideMenu, Copyright,
  Select, Button, Form, Textarea,
  IconButton
}
from '../../../commonViews';
import { onSendMessage } from '../../../../actions';

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
    document.getElementById('send-message').reset();
  }
  /**
   *
   *
   * @returns {jsx} react component
   * @memberof MessageBoard
   */
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
        <Form
          formClass="message-box"
          id="send-message"
          onSubmit={this.handleSend}
        >
          <Textarea
            textRef={(input) => { this.message = input; }}
            textClass="compose"
            placeholder="always be nice..."
          />
          <Select
            id="priority"
            selectRef={(input) => { this.priority = input; }}
            selectClass="browser-default action-btn select"
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
            <option value="Critical">Critical</option>
          </Select>
          <Button
            type="submit"
            btnClass="browser-default action-btn send"
            name={
              <IconButton
                iconClass="fa fa-send tooltipped"
                dataPosition="top"
                dataDelay="50"
                dataTooltip="send message"
              />}
          />
        </Form>
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
