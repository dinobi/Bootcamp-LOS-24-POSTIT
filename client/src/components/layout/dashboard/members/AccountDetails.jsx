import React from 'react';
import {
  DashHeader, SideMenu, Copyright,
  DashboardContent
} from '../../../commonViews';
/**
 *
 * @class AccountDetails
 * @extends {React.Component}
 */
class AccountDetails extends React.Component {
  /**
   *
   *
   * @returns {*} - react elements
   * @memberof AccountDetails
   */
  render() {
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu active="account-details" />
            </aside>
            <section className="col s12 m9 l10">
              <DashboardContent
                wrapperClass="dashboard-content dashboard-account"
                iconClass="fa fa-cog"
                title="Account Information"
                subtitle="View, edit or update your account information"
              >
              </DashboardContent>
            </section>
          </div>
          <Copyright />
        </main>
      </div>
    );
  }
}

export default AccountDetails;

