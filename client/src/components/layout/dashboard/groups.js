import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashHeader, SideMenu, GroupCard, Copyright } from '../../views';
import
  onLoadGroups
  from '../../../actions/load-groups';
import { loadGroupMessages, loadGroupMembers }
from '../../../actions';

/**
 * 
 * @class {container} - provides access to groups a user belongs to
 */
class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                          criticalCount={ group.unreadCritical }
                          urgentCount={ group.unreadUrgent }
                          normalCount={ group.unreadNormal }
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
  bindActionCreators({ onLoadGroups, loadGroupMessages, loadGroupMembers }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(Groups);
