import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashHeader, SideMenu, Card, Form, GroupCard,
  Copyright } from '../../views';
import { onCreateGroup, onLoadGroups,
  loadGroupMessages, loadGroupMembers,
  onDeleteGroup }
from '../../../actions';

/**
 * 
 * @class {container} - provides access to groups a user belongs to
 */
class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /**
   *
   * @memberof Modal
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
   * @returns {Object} - new state
   * @memberof Groups
   */
  handleDelete() {
    let { groupname } = this;
    groupname = groupname.value.trim();
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
              <div className="dashboard-content dashboard-myspace">
                <div className="bot-msg">
                  <h3>Select a group to start messaging</h3>
                </div>
                <div className="features dashboard-group">

                  <Card>
                    <Form id="group-control">
                      <div className="row">
                        <div className="col s12 m3 input-field">
                          <input onFocus={this.onFocus}
                          type="text" id="groupname"
                          ref = {(input) => { this.groupname = input; }} />
                          <label for="groupname">Groupname</label>
                        </div>
                        <div className="col s12 m6 input-field">
                          <input onFocus={this.onFocus}
                          type="text" id="description"
                          ref = {(input) => { this.description = input; }} />
                          <label for="description">Description</label>
                        </div>
                        <div className="col s12 m1 input-field">
                          <i className="fa fa-plus grey-text"
                            title="Create a new group"
                            onClick= { () => this.handleCreate() }
                          />
                        </div>
                        <div className="col s12 m1 input-field">
                          <i className="fa fa-archive grey-text"
                            title="Archive group"
                            onClick= { () => this.handleDelete() }
                          />
                        </div>
                        <div className="col s12 m1 input-field">
                          <i className="fa fa-close grey-text"
                            title="Close this panel"
                            onClick= { this.handleClose }
                          />
                        </div>
                      </div>
                    </Form>
                  </Card>

                  <div className="row">
                    { groups.length > 0 ?
                      groups.map((group, index) =>
                        <GroupCard
                          key = { index }
                          groupName = { group.groupname }
                          location = {
                            <a href={`#groups/${group.groupname}`}>
                              <i className="fa fa-folder"></i>
                              &nbsp;{ group.groupname }
                            </a>
                          }
                          description={ group.description }
                        />
                      ) :
                      <div className="col s12 m4">
                      <div className="card">
                        <div className="card-content">
                          <span className="card-title activator text-darken-4">
                            Pls join or create a group
                          </span>
                        </div>
                      </div>
                    </div>
                    }
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
