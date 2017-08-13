import React from 'react';
import { DashHeader, SideMenu, Copyright } from '../../views';

class Group extends React.Component {
  render() {
    const backToGroup = <li><a href="#groups"><i className="fa fa-chevron-left"></i>&nbsp;&nbsp;Back</a></li>
    return (
      <div>
        <DashHeader/>
        <main className="dashboard-ui">
          <div className="row">
			<aside className="col s12 m3 l2">
              <SideMenu back= { backToGroup }/>
            </aside>
            <section className="col s12 m9 l10">
            <div className="dashboard-content dashboard-myspace">
              <div className="bot-msg">
                <h3>{this.props.groupName}</h3>
                <p>What would you like to do?</p>
              </div>
              <div className="features">
                <div className="row">
                  <div className="col s12 m6">
                    <div className="card small">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/group.jpg" alt="group illustration" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Message Board<i className="material-icons right">more_vert</i></span>
                        <p><a href="#message-board">Compose</a></p>
                      </div>
                      <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Message Board<i className="material-icons right">close</i></span>
                        <p>
                          This is your message board where you can see messages that have been 
                          posted to this group and where you can also post your message.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col s12 m6">
                    <div className="card small">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/members.jpg" alt="create group illustration" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Members<i className="material-icons right">more_vert</i></span>
                        <p><a href="#create-group">View members</a></p>
                      </div>
                      <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Members<i className="material-icons right">close</i></span>
                        <p>
                          This is the members panel where you can see all members in this group, delete members
                          or add new ones.
                        </p>
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

export default Group;
