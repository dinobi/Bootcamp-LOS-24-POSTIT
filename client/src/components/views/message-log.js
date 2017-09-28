import React from 'react';

class MessageLog extends React.Component {
 
  render() {
    const { post } = this.props;
    return (      
      <div className="post">
        <aside className="avatar">{ post.fromUser.subStr(0, 1).toUpperCase() }</aside>
        <section className="post-message">
          <div className="message-details">
            <h6 className="sender">{ post.fromUser }</h6> &nbsp;
            <small className="time">{ post.createdAt }</small>
          </div>
          <p className="message">{ post.message }</p>
        </section>
      </div>
    );
  }
}

export default MessageLog;
