import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import checkAuthUser from '../../../helpers/checkAuthUser';
import MessageBoard from '../messages/MessageBoard.jsx';
import WelcomeCard from './WelcomeCard.jsx';
import Members from '../members/Members.jsx';
import AddMemberModal from '../members/AddMemberModal.jsx';
import DashHeader from '../DashHeader.jsx';
import {
  SideMenu, Button, IconButton,
  Copyright, ListItem, Textarea,
  Select, Form, DashboardContent
} from '../../../commonViews';
import {
  loadGroupMessages, loadGroupMembers, onSendMessage,
  onAddMember, onRemoveMember
}
  from '../../../../actions';

/**
 * Group class component
 *
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
  }

  /**
   * @return {void} make resources available
   * before page loads
   * @memberof Group
   * */
  componentWillMount() {
    const token = localStorage.getItem('userAuth');
    if (checkAuthUser(token) === 'invalid') {
      localStorage.clear();
      location.hash = '#login';
      return;
    }
    const groupname =
      location.href.split('/')[location.href.split('/').length - 1];
    this.props.loadGroupMessages(groupname);
    this.props.loadGroupMembers(groupname);
  }
  /**
   * @return {void} make resources available
   * when changes to properties occur
   * @memberof Group
   * @param {props} nextProps - next available props
   */
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.groupname !== this.props.match.params.groupname
    ) {
      const groupname =
        location.href.split('/')[location.href.split('/').length - 1];
      this.props.loadGroupMessages(groupname);
      this.props.loadGroupMembers(groupname);
    }
  }
  /**
   * handleSend()
   *
   * This method is called when the user clicks
   * the "send" button for messages
   * @param {any} event
   * @memberof Group
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
  }

  /**
   * @returns {JSX} for Group component
   */
  render() {
    const { user } = this.props;
    const { messages, members } = this.props;
    const posts = messages;
    const groupName =
      location.href.split('/')[location.href.split('/').length - 1];
    const backToGroup =
      <ListItem
        listClass="dashboard-menu-item"
        url="#groups"
        iconClass="fa fa-chevron-left"
        name="Back"
      />;
    const addMemberModal = {
      modalTitle: 'Search and add members by username',
      addMemberButton: <IconButton
        iconClass="fa fa-user-plus tooltipped"
        dataPosition="top"
        dataDelay="50"
        dataTooltip="add member"
      />,
      onAddMember: this.props.onAddMember
    };
    const toggleOn = 'fa fa-toggle-on side-icon';

    return (
      <div>
        <DashHeader back={backToGroup} active="groups" />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu back={backToGroup} active="groups" toggle={toggleOn} />
            </aside>
            <section className="col s12 m9 l10">
              <DashboardContent
                wrapperClass="dashboard-content group-gui"
                iconClass="fa fa-folder-open"
                title={`${groupName} - message board`}
              >
                <div className="row">
                  <div className="col s8 m9">
                    {
                      posts.length > 0 ?
                        <MessageBoard posts={posts} /> :
                        <div className="message-board">
                          <div className="postlogs">
                            <WelcomeCard
                              emptyBoard={posts.message}
                            />
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
                    }
                  </div>
                  <div className="col s4 m3">
                    <div className="member-list-title">
                      <h6 className="white-text">
                        Members
                        <span className="addButton">
                          <AddMemberModal addMemberModal={addMemberModal} />
                        </span>
                      </h6>
                    </div>
                    <Members
                      members={members}
                      onRemoveMember={this.props.onRemoveMember}
                      user={user}
                    />
                  </div>
                </div>
              </DashboardContent>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Group.defaultProps = {
  user: {},
  messages: [],
  members: [],
  description: 'No description',
  loadGroupMessages: () => { },
  loadGroupMembers: () => { },
  onSendMessage: () => { },
  onAddMember: () => { },
  onRemoveMember: () => { },
};

Group.propTypes = {
  user: PropTypes.object,
  members: PropTypes.array,
  loadGroupMessages: PropTypes.func.isRequired,
  loadGroupMembers: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onAddMember: PropTypes.func.isRequired,
  onRemoveMember: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  messages: state.messages.groupMessages,
  members: state.members.groupMembers,
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
