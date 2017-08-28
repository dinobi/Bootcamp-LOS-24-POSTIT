import React from "react";
import { DashHeader, SideMenu, Copyright, FeatureCards } from "../../views";

/**
 * MySpace layout component that provides access to every feature on postit
 */
class MySpace extends React.Component {
/**
 * MySpace renders the following UI components
 * 
 * @component <DashHeader/> - The dashboard header navigation.
 * @component <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
 * @component <FeatureCard/> - Card that contains quick link to post features.
 * @component <Copyright/> - The dashboard footer copyright information.
 */
  render() {
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2 hide-on-small-and-down">
              <SideMenu active="dashboard" />
            </aside>
            <FeatureCards />
          </div>
          <Copyright />
        </main>
      </div>
    );
  }
}

export default MySpace;
