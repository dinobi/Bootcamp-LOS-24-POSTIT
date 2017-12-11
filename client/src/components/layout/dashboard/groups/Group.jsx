import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import authUser from '../../../helpers/authUser';
import MessageBoard from '../messages/MessageBoard.jsx';
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
  onAddMember, onRemoveMember, onLogoutUser
}
  from '../../../../actions';

/**
 * Group class component
 *
 * @class Group
 * @extends {React.Component}
 */
export class Group extends React.Component {
  /**
   * Creates an instance of Group.
   * @param {any} props
   * @memberof Group
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @return {void} make resources available
   * before page loads
   * @memberof Group
   * */
  componentWillMount() {
    if (authUser() === false) {
      return this.props.onLogoutUser();
    }
  }
  /**
   * @return {object} set new state based on user
   * authentication status
   *
   * @memberof Group
   * */
  componentDidMount() {
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
   * @returns {JSX} for Group component
   */
  render() {
    const { username } = this.state;
    const { messages, members } = this.props;
    const posts = messages;
    const newMessageBoard = [{
      id: 0,
      createdAt: Date.now(),
      priority: 'normal',
      fromUser: 'Postit',
      message: 'Welcome to your new message board.'
    }];
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
                  {
                    !this.props.loading ? '' :
                    <div class="progress">
                      <div class="indeterminate"></div>
                    </div>
                  }
                  <div className="col s8 m9">
                    {
                      posts.length > 0 ?
                      <MessageBoard posts={posts} /> :
                      <MessageBoard posts={newMessageBoard} />
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
                      username={username}
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
  onLogoutUser: () => { },
  loading: false
};

Group.propTypes = {
  user: PropTypes.object,
  members: PropTypes.array,
  loadGroupMessages: PropTypes.func.isRequired,
  loadGroupMembers: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onAddMember: PropTypes.func.isRequired,
  onRemoveMember: PropTypes.func.isRequired,
  onLogoutUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  messages: state.messages.groupMessages,
  members: state.members.groupMembers,
  loading: state.messages.groupMessagesIsLoading
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadGroupMessages,
    loadGroupMembers,
    onSendMessage,
    onAddMember,
    onRemoveMember,
    onLogoutUser
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Group);
