import React from "react";
import { DashHeader, SideMenu, MessageBox, Copyright } from "../../views";

class MessageBoard extends React.Component {
/**
 * MessageBoard layout component that provides access to a user's message board
 * 
 * @param {component} <DashHeader/> - The dashboard header navigation.
 * @param {component} <SideMenu/> - The dashboard side menu for navigation to other dashboard gui.
 * @param {component} <MessageBox/> - Gui that enables a user compose a new post.
 * @param {component} <Message/> - Gui that enables a user to messages posted to the group message board
 * @param {component} <Copyright/> - The dashboard footer copyright information.
 */
  render() {
    const backToGroup = (
      <li>
        <a href="#groups">
          <i className="fa fa-chevron-left" />&nbsp;&nbsp;Back
        </a>
      </li>
    );
    return (
      <div>
        <DashHeader />
        <main className="dashboard-ui">
          <div className="row">
            <aside className="col s12 m3 l2">
              <SideMenu back={backToGroup} />
            </aside>
            <section className="col s12 m9 l10">
              <div className="dashboard-content messages">
              <div className="action-ribbon" />
              <div className="message-board">
                <div className="postlogs" id="view-message" />
                <MessageBox />
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

export default MessageBoard;
