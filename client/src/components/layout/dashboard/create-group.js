import React from "react";
import { DashHeader, SideMenu, Copyright } from "../../views";

class NewGroup extends React.Component {
/**
 * Dashboard layout component that enables users create new a new group.
 * 
 * @param {component} <DashHeader/> - The dashboard header navigation.
 * @param {component} <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
 * @param {component} <Copyright/> - The dashboard footer copyright information.
 */
  render() {
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu active="groups"/>
            </aside>
            <section className="col s12 m9 l10">
              <div className="dashboard-content">
                <div className="bot-msg">
                <h3>Create a new group</h3>
                </div>
                <div className="features">
                  <form id="create-group-form">
                    <fieldset className="input-field">
                      <input
                        placeholder="Enter a group name"
                        id="group_name"
                        type="text"
                        className="validate"
                      />
                      <textarea
                        placeholder="Enter group description"
                        id="group-description"
                        className="validate"
                      />
                    </fieldset>
                    <button type="submit" className="btn btn-create">
                      Submit
                    </button>
                  </form>
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

export default NewGroup;

