import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageLog // eslint-disable-line no-unused-vars
  from './MessageLog.jsx';
import {
  DashHeader, SideMenu, // eslint-disable-line no-unused-vars
  Copyright, IconButton, // eslint-disable-line no-unused-vars
  Select, Button, // eslint-disable-line no-unused-vars
  Form, Textarea // eslint-disable-line no-unused-vars
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
    document.getElementById('send-message').reset();
    this.handleScroll();
  }
  /**
   * @returns {void} access dom elements when they
   * become available
   * @memberof Group
   */
  componentDidMount() {
    this.handleScroll();
  }
  /**
   * @returns {void}
   * This method handles smooth scroll to the latest message in
   * the message log
   * messages
   */
  // handleScroll() {
  //   scrollToElement('.last', {
  //     offset: 10,
  //     ease: 'in-expo',
  //     duration: 1000
  //   });
  // }
  /**
   *
   *
   * @returns {jsx} jsx component for message board
   * @memberof MessageBoard
   */
  render() {
    return (
      <div className="message-board">
        <div className="postlogs">
          {
            this.props.posts.map(post =>
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

MessageBoard.defaultProps = {
  onSendMessage: () => { },
  posts: []
};
MessageBoard.propTypes = {
  posts: PropTypes.array.isRequired,
  onSendMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages.groupMessages,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ onSendMessage }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
