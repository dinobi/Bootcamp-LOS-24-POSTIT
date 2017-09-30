import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashHeader, Copyright, Features, SideMenu} from '../../views';
import onLogoutUser from '../../../actions/logout-user';

//import ToastMessageList from '../toast-message-list';

/**
 * MySpace layout component that provides access to every feature on postit
 */
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

/**
 * MySpace renders the following UI components
 * 
 * @component <DashHeader/> - The dashboard header navigation.
 * @component <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
 * @component <Copyright/> - The dashboard footer copyright information.
 */
  render() {
    const { username, firstname } = this.props;
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          {/* <ToastMessageList /> */}
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
            <SideMenu active="dashboard" />
            </aside>
            <Features/>
          </div>
          <Copyright />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  // groups: state.groups,
  // search: state.search,
  // messages: state.messages,
  // users: state.users,
  // members: state.members
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ onLogoutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
