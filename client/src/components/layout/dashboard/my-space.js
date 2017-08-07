import React from 'react';
import { DashHeader, SideMenu } from '../../views'

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
          </div>
        </main>
      </div>
    );
  }
}

export default MySpace;
