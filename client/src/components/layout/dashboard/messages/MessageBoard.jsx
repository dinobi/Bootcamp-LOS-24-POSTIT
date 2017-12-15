import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageLog
  from './MessageLog.jsx';
import {
  DashHeader, SideMenu,
  Copyright, IconButton,
  Select, Button,
  Form, Textarea
}
  from '../../../commonViews';
import { onSendMessage } from '../../../../actions';

/**
 * MessageBoard class
 * Displays a message board of messages in a group
 *
 * @class MessageBoard
 * @extends {React.Component}
 */
export class MessageBoard extends React.Component {
  /**
   * Creates an instance of MessageBoard.
   * @param {any} props
   * @memberof MessageBoard
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSend = this.handleSend.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  /**
   * Handles scrolling to specified dom element
   *
   * @memberof Group
   * @returns {void}
   */
  handleScroll() {
    const messages = $('.postlogs');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    messages.scrollTop(scrollHeight);
  }
  /**
   * Access available DOM elements
   *
   * @memberof Group
   * @return {void}
   */
  componentDidMount() {
    this.handleScroll();
  }
  /**
   * handleSend()
   *
   * This method is called when a user hits
   * the send message button
   *
   * @param {any} event
   * @memberof MessageBoard
   * @return {void}
   */
  handleSend(event) {
    event.preventDefault();
    const groupname =
      location.href.split('/')[location.href.split('/').length - 1];
    let { message, priority } = this;
    message = message.value.trim();
    priority = priority.value.trim();
    const messageData = { message, priority };
    this.props.onSendMessage(messageData, groupname);
    this.handleScroll();
    document.getElementById('send-message').reset();
  }
  /**
   *
   *
   * @returns {jsx} jsx component for message board
   * @memberof MessageBoard
   */
  render() {
    const { posts, sending } = this.props;
    return (
      <div className="message-board">
        <div className="postlogs">
          {
            posts.map(post =>
              <MessageLog message={post} key={post.id} />
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
            btnClass="browser-default send"
            name={
              <IconButton
                iconClass= {
                  sending ?
                  'fa fa-ellipsis-h' :
                  'fa fa-send tooltipped'
                }
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

MessageBoard.defaultProps = {
  onSendMessage: () => { },
  posts: [],
  sending: false
};
MessageBoard.propTypes = {
  posts: PropTypes.array.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  sending: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages.groupMessages,
  sending: state.messages.sendMessageIsLoading
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ onSendMessage }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
