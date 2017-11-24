import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GroupCard from './GroupCard.jsx'; // eslint-disable-line no-unused-vars
import DashHeader // eslint-disable-line no-unused-vars
  from '../DashHeader.jsx';
import {
  SideMenu, Card, Form, // eslint-disable-line no-unused-vars
  Copyright, InputField, // eslint-disable-line no-unused-vars
  IconButton, DashboardContent // eslint-disable-line no-unused-vars
} from '../../../commonViews';
import {
  onCreateGroup, onLoadGroups,
  onArchiveGroup
} from '../../../../actions';

/**
 * Groups class component
 *
 * This displays all group a user has created
 * or belong to
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
   * onFocus()
   * This method is called when the user focuses on an input field,
   * which clear any error messages afterwards.
   *
   * @memberof Groups
   * @returns {void}
   */
  onFocus() {
    this.setState({
      errorMessage: '',
    });
  }
  /**
   * handleCreate()
   * This method is called when a user hit the
   * create group button
   *
   * @returns {void}
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
   * handleArchive()
   * This method is called when a user hits
   * the archive group button
   *
   * @param {string} groupname
   * @returns {object} actionCreator
   * @memberof Groups
   */
  handleArchive(groupname) {
    groupname = groupname.trim();
    if (groupname === '') {
      return '';
    }
    const groupData = { groupname };
    this.props.onArchiveGroup(groupData);
  }

  /**
   * @return {void}
   * */
  componentWillMount() {
    this.props.onLoadGroups();
  }
  /**
   * @return {jsx} -  of groups components
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
                              iconClass=
                              "fa fa-archive fa-1x grey-text right tooltipped"
                              dataPosition="bottom"
                              dataDelay="50"
                              dataTooltip={`Archive ${group.groupname}`}
                              onClick=
                              {() => this.handleArchive(group.groupname)}
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
        </main>
      </div>
    );
  }
}

Groups.defaultProps = {
  groups: {},
  onCreateGroup: () => { },
  onLoadGroup: () => { },
  onArchiveGroup: () => { }
};

Groups.propTypes = {
  groups: PropTypes.object.isRequired,
  onCreateGroup: PropTypes.func.isRequired,
  onLoadGroups: PropTypes.func.isRequired,
  onArchiveGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groups: state.groups
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    onCreateGroup,
    onLoadGroups,
    onArchiveGroup,
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Groups);
