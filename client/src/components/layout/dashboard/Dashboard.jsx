import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DashHeader, Copyright, Features, SideMenu} from '../../views';
import { onLogoutUser } from '../../../actions';

/**
 * MySpace layout component that provides access to every feature on postit
 */
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

/**
 * 
 * 
 * @returns {*} - react elements
 * @memberof Dashboard
 */
  render() {
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
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ onLogoutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
