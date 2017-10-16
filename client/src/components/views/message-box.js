import React from 'react';

const MessageBox = (props) => {
  return (
    <form className="message-box" id="send-message">
      <textarea className="compose" placeholder="always be nice..."></textarea>
      <select id="priority">
        <option value="Normal">Normal</option>
        <option value="Urgent">Urgent</option>
        <option value="Critical">Critical</option>
      </select>
    </form>
  );
};

export default MessageBox;
