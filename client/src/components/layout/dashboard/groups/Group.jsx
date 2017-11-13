import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageBoard from '../messages/MessageBoard.jsx';
import WelcomeCard from './WelcomeCard.jsx';
import Members from '../members/Members.jsx';
import AddMemberModal from '../members/AddMemberModal.jsx';
import {
  DashHeader, SideMenu, Button,
  Copyright, ListItem, Textarea,
  Select, Form, DashboardContent,
  IconButton
} from '../../../commonViews';
import { loadGroupMessages, loadGroupMembers, onSendMessage,
  onAddMember, onRemoveMember
}
from '../../../../actions';

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
  }
  /**
   * @return {undefined} - Returns action creators.
   * */
  componentWillMount() {
    this.props.loadGroupMessages();
    this.props.loadGroupMembers();
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
    document.getElementById('send-message').reset();
  }

  /**
   * @return {undefined} - returns presentational components.
   * */
  render() {
    const { user } = this.props;
    const { messages, members } = this.props;
    const posts = messages;
    const groupName =
    location.href.split('/')[location.href.split('/').length - 1];

    const backToGroup =
      <ListItem
        url="#groups"
        iconClass="fa fa-chevron-left"
        name="Back"
      />;

    const addMemberModal = {
      modalTitle: `Add New Member to ${groupName}`,
      addMemberButton: <IconButton
        iconClass="fa fa-user-plus tooltipped"
        dataPosition="top"
        dataDelay="50"
        dataTooltip="add member"
      />,
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
              <DashboardContent
                wrapperClass="dashboard-content group-gui"
                iconClass="fa fa-folder-open"
                title={ `${groupName} - message Board` }
              >
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
                  <div className="col s12 m3 hide-on-small-and-down">
                    <div className="member-list-title">
                      <h6>
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
          <Copyright />
        </main>
      </div>
    );
  }
}

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
