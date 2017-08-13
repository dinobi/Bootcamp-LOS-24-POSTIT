import React from 'react';

class MessageBox extends React.Component {
  render() {
    return (
      <div className="message-box" id="send-message">
		    <textarea className="compose" placeholder="always be nice..."></textarea>
		    <select id="priority" className="btn btn-create">
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="Critical">Critical</option>
        </select>
	    </div>
    );
  }
}

export default MessageBox;