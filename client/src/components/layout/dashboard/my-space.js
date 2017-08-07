import React from 'react';
import { DashHeader, SideMenu } from '../../views';
import DashContent from './dashboard-content';

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
            <section className="col s12 m9 l10">
              <DashContent/>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default MySpace;
