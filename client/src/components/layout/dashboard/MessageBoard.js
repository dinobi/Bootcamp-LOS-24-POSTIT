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
      newPost: '',
    };
    this.handleSend = this.handleSend.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      newPost: e.target.value
    });
  }
  /** handleSend {e} */
	handleSend(e) {
		e.preventDefault();
		let { fromUser, message, priority } = this;
    groupname = groupname.value.trim();
    description = description.value.trim();
		 if (groupname === '' || description === '') {
			this.setState({ errorMessage: 'Error. All field are required to create a new group' });
    } else {
      const groupData = { groupname, description };
      this.props.onCreateGroup(groupData);
		}
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

      <form className="message-box" id="send-message" onSubmit = { this.handleSend }>
        <textarea
          value={ this.state.newPost }
          className="compose"
          placeholder="always be nice...">
        </textarea>
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
