import React from 'react';
/**
 * MessageLog - displays message from a group member.
 * @returns {*} message.
 */
const MessageLog = (props) => {
/**
 * Renders DOM elements.
 * @returns {*} message.
 */
  const { message } = props;
  const date = new Date(message.createdAt).toUTCString();
  return (
    <div className="post">
      <aside className="avatar">{ message.fromUser.substr(0, 1).toUpperCase() }</aside>
      <section className="post-message">
        <div className="message-details">
          <h6 className="sender">{ message.fromUser }</h6> &nbsp;
          <small className="time">{ date }</small>
        </div>
        <p className="message">{ message.message }</p>
      </section>
    </div>
  );
};

export default MessageLog;
