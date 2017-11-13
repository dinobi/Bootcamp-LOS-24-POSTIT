import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import requireAuth from '../../../helpers/requireAuth';
import GroupCard from './GroupCard.jsx';
import {
  DashHeader, SideMenu, Card, Form,
  Copyright, InputField, IconButton,
  DashboardContent
} from '../../../commonViews';
import {
  onCreateGroup, onLoadGroups,
  loadGroupMessages, loadGroupMembers,
  onDeleteGroup
} from '../../../../actions';

/**
 *
 *
 * @class Groups
 * @extends {React.Component}
 */
class Groups extends React.Component {
  /**
   * Creates an instance of Groups.
   * @param {any} props - state properties
   * @memberof Groups
   */
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      renderChild: true
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /**
   *
   * @memberof Groups
   * @returns {Object} - new state
   */
  onFocus() {
    this.setState({
      errorMessage: '',
    });
  }
  /**
   * handleLogin()
   * @returns {Object} - new group
   */
  handleCreate() {
    let { groupname, description } = this;
    groupname = groupname.value.trim();
    description = description.value.trim();
    if (groupname === '' || description === '') {
      return '';
    }
    const groupData = { groupname, description };
    this.props.onCreateGroup(groupData);
  }
  /**
   *
   *
   * @param {string} groupname
   * @returns {object} actionCreator
   * @memberof Groups
   */
  handleDelete(groupname) {
    groupname = groupname.trim();
    if (groupname === '') {
      return '';
    }
    const groupData = { groupname };
    this.props.onDeleteGroup(groupData);
  }

  /**
   * @return {undefined} - Returns action creators.
   * */
  componentWillMount() {
    requireAuth();
    this.props.onLoadGroups();
  }
  /**
   * @return {presentationals} - some presentational components
   */
  render() {
    let { groups } = this.props;
    groups = groups.groups;
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu active="groups" />
            </aside>
            <section className="col s12 m9 l10">
              <DashboardContent
                wrapperClass="dashboard-content dashboard-myspace"
                iconClass="fa fa-group"
                title="My Groups"
                subtitle="Create or select a group to start messaging"
              >
                <div className="features dashboard-group">
                  <Card cardControl="card card-control">
                    <Form id="group-control">
                      <div className="row">
                        <InputField
                          inputClass="col s12 m5 input-field"
                          onFocus={this.onFocus}
                          type="text"
                          id="groupname"
                          inputRef={(input) => { this.groupname = input; }}
                          label="Groupname"
                        />
                        <InputField
                          inputClass="col s12 m6 input-field"
                          onFocus={this.onFocus}
                          type="text"
                          id="description"
                          inputRef={(input) => { this.description = input; }}
                          label="Description"
                        />
                        <div className="col s12 m1">
                          <IconButton
                            iconClass="fa fa-plus grey-text tooltipped"
                            dataPosition="bottom"
                            dataDelay="50"
                            dataTooltip="Create group"
                            onClick={() => this.handleCreate()}
                          />
                        </div>
                      </div>
                    </Form>
                  </Card>

                  <div className="row">
                    {groups.length > 0 ?
                      groups.map((group, index) =>
                        <GroupCard
                          key={index}
                          groupName={group.groupname}
                          location={
                            <a href={`#groups/${group.groupname}`}>
                              <i className="fa fa-folder"></i>
                              &nbsp;{group.groupname}
                            </a>
                          }
                          description={group.description}
                          archive={
                            <IconButton
                              iconClass="fa fa-archive fa-1x grey-text right tooltipped"
                              dataPosition="bottom"
                              dataDelay="50"
                              dataTooltip={`Archive ${group.groupname}`}
                              onClick={() => this.handleDelete(group.groupname)}
                            />
                          }
                        />
                      ) :
                      <div className="col s12 m4">
                        <Card cardControl="card">
                          <span className="card-title activator text-darken-4">
                            Pls join or create a group
                        </span>
                        </Card>
                      </div>
                    }
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
  groups: state.groups,
  // messages: state.messages
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    onCreateGroup,
    onLoadGroups,
    loadGroupMessages,
    loadGroupMembers,
    onDeleteGroup,
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Groups);
