import React from 'react';
import { DashHeader, SideMenu, Copyright, FeatureCards } from '../../views';

class MySpace extends React.Component {
  render() {
    return (
      <div>
        <DashHeader/>
        <main className="dashboard-ui">
          <div className="row">
				    <aside className="col s12 m3 l2">
              <SideMenu/>
            </aside>
            <FeatureCards/>
          </div>
          <Copyright/>
        </main>
      </div>
    );
  }
}

export default MySpace;
