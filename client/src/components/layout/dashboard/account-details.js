import React from 'react';
import { DashHeader, SideMenu, Copyright } from '../../views';

class AccountDetails extends React.Component {
  render() {
    return (
      <div>
        <DashHeader/>
        <main className="dashboard-ui">
          <div className="row">
			<aside className="col s12 m3 l2">
              <SideMenu active="active"/>
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
          <Copyright/>
        </main>
      </div>
    );
  }
}

export default AccountDetails;