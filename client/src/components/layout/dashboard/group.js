import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import MessageBoard from './MessageBoard';
import {
  DashHeader, SideMenu, WelcomeCard, Copyright, ModalMain
} from '../../views';
import { loadGroupMessages, loadGroupMembers, onSendMessage,
  onAddMember, onRemoveMember
}
from '../../../actions';

/**
 * Group class component
 * @class Group
 * @extends {React.Component}
 */
class Group extends React.Component {
  /**
   * Creates an instance of Group.
   * @param {any} props 
   * @memberof Group
   */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
    this.handleSend = this.handleSend.bind(this);
    // this.handleAddMember = this.handleAddMember.bind(this);
  }
  /**
   * @return {undefined} - Returns action creators.
   * */
  componentWillMount() {
    this.props.loadGroupMessages();
    this.props.loadGroupMembers();
  }
  /**
   *
   * @param {any} nextProps
   * @memberof Group
   * @returns {newState} - new state
   */
  componentWillUpdate(nextProps) {
    if (nextProps.members) {
      return true;
    }
  }
  /**
   * Handles the sending of messages
   * @param {any} event
   * @memberof Group
   * @return {*} - action
   */
	handleSend(event) {
		event.preventDefault();
		let { message, priority } = this;
    message = message.value.trim();
    priority = priority.value.trim();
    const messageData = { message, priority };
    this.props.onSendMessage(messageData);
    this.refs.messageBox.reset();
  }

  /**
   *
   * @param {event} event
   * @memberof Group
   * @returns {*} - react elements
   */
  // handleAddMember(event) {
  //   event.preventDefault();
  //   let { username } = this;
  //   username = username.value.trim();
  //   if (username === '') {
  //     this.setState({
  //       errorMessage: 'Error. All field are required to add member'
  //     });
  //   } else {
  //     this.props.onAddMember(username);
  //   }
  // }

  /**
   * @return {undefined} - returns presentationals.
   * */
  render() {
    const authUser = localStorage.getItem('userAuth');
    const userData = jwtDecode(authUser);
    const { username } = userData.data;
    const { messages, members } = this.props;
    const posts = messages;
    const groupName =
    location.href.split('/')[location.href.split('/').length - 1];

    const backToGroup = (
      <li>
        <a href="#groups">
          <i className="fa fa-chevron-left" />&nbsp;&nbsp;Back
        </a>
      </li>
    );
    const addMemberModal = {
      modalTitle: `Add New Member to ${groupName}`,
      addMemberButton: <i className="fa fa-user-plus"></i>,
      // handleAddMember: this.handleAddMember
      onAddMember: this.props.onAddMember
    };
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu back={ backToGroup } active="groups"/>
            </aside>
            <section className="col s12 m9 l10">
              <div className="dashboard-content group-gui">
                <div className="bot-msg">
                  <h3>
                    <i className="fa fa-folder-open"></i>
                    &nbsp;{ groupName } - Message Board
                  </h3>
                </div>
                <div>
                  <div className="row">
                    <div className="col s12 m9">
                      {
                        posts.length > 0 ?
                        <MessageBoard posts={ posts } /> :
                        <div className="message-board">
                          <div className="postlogs">
                            <WelcomeCard
                              emptyBoard={ posts.message }
                            />
                          </div>
                            <form
                              ref="messageBox" className="message-box"
                              id="send-message" onSubmit = { this.handleSend }
                            >
                              <textarea
                                ref={(input) => { this.message = input; }}
                                className="compose"
                                placeholder="always be nice...">
                              </textarea>
                              <select id="priority"
                                ref={(input) => { this.priority = input; }}
                                className="browser-default action-btn select"
                              >
                                <option value="Normal">Normal</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Critical">Critical</option>
                              </select>
                              <button type="submit"
                                className="browser-default action-btn send"
                                title="send"
                              >
                              <i className="fa fa-send"></i>
                            </button>
                          </form>
                        </div>
                      }
                    </div>
                    <div className="col s12 m3 members-list hide-on-small-and-down">
                      <div className="member-list-title">
                        <h6>
                          Members
                          <span className="addButton">
                            <ModalMain addMemberModal={addMemberModal} />
                          </span>
                        </h6>
                      </div>
                      {
                        members.map((member, index) => {
                          return (
                            members[0].username === username ?
                              <li key={index}>
                                <i className="fa fa-hashtag"></i>
                                &nbsp;&nbsp;{member.username}
                                <i
                                  className="fa fa-user-times removeButton"
                                  onClick={() =>
                                  this.props.onRemoveMember({
                                    username: member.username
                                  })}
                                  title="delete this member"
                                >
                                </i>
                              </li>
                              :
                              <li key={index}>
                              <i className="fa fa-hashtag"></i>
                              &nbsp;&nbsp;{member.username}
                            </li>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Copyright />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages.groupMessages,
  members: state.members.groupMembers
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadGroupMessages,
    loadGroupMembers,
    onSendMessage,
    onAddMember,
    onRemoveMember
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Group);
