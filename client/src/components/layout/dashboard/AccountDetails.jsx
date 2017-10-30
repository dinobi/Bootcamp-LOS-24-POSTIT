import React from 'react';
import { DashHeader, SideMenu, Copyright } from '../../views';
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
              <div className="dashboard-content dashboard-account">
                <div className="bot-msg">
                  <h3>Account Information</h3>
                  <p>View, edit or update your account information</p>
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

export default AccountDetails;

