import React from 'react';

class Message extends React.Component {
  render() {
    return (      
      <div className="post">
        <aside className="avatar">{this.props.userImage}</aside>
        <section className="post-message">
          <div className="message-details">
            <h6 className="sender">{ this.props.sender }</h6> &nbsp;
            <small className="time">{ this.props.time }</small>
          </div>
          <p className="message">{ this.props.message }</p>
        </section>
      </div>
    );
  }
}

export default Message;