import React from 'react';
import { DashHeader, SideMenu, GroupCard, Copyright } from '../../views';

class Groups extends React.Component {
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
			        <div className="dashboard-content dashboard-myspace">
                <div className="bot-msg">
                  <h3>Select a group to start messaging</h3>
                </div>
                <div className="features dashboard-group">
                  <div className="row">
                    <GroupCard />
                    <div className="col s12 m4">
                      <div className="card">
                        <div className="card-content">
                          <a href="#create-group">
                            <span className="card-title activator grey-text text-darken-4 truncate">Create Group
                              <i className="material-icons right">add</i>
                            </span>
                          </a>
                        </div>											
                      </div>
                    </div>                  
                  </div>
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



export default Groups;