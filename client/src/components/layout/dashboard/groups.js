import React from "react";
import { DashHeader, SideMenu, GroupCard, Copyright } from "../../views";

/**
 * Groups layout component that provides access to groups a user belongs to
 * 
 * @param {component} <DashHeader/> - The dashboard header navigation.
 * @param {component} <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
 * @param {component} <GroupCard/> - Card representing individual group a user belong to
 * @param {component} <Copyright/> - The dashboard footer copyright information.
 */
class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    }
  }
  render() {
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2">
              <SideMenu active="groups" />
            </aside>
            <section className="col s12 m9 l10">
              <div className="dashboard-content dashboard-myspace">
                <div className="bot-msg">
                  <h3>Select a group to start messaging</h3>
                </div>
                <div className="features dashboard-group">
                  <div className="row">
                    {this.state.groups}
                    <div className="col s12 m4">
                      <div className="card">
                        <div className="card-content">
                          <a href="#create-group">
                            <span className="card-title activator grey-text text-darken-4 truncate">
                              Create Group
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
          <Copyright />
        </main>
      </div>
    );
  }
}


export default Groups;
