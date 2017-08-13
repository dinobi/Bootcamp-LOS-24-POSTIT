import React from 'react';
import { DashHeader, SideMenu, MessageBox, Copyright } from '../../views';

class MessageBoard extends React.Component {

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
			        <div className="dashboard-content messages">
                <div className="action-ribbon"></div>
                <div className="message-board">
                  <div className="postlogs" id="view-message">
                  
                  </div>
                  <MessageBox/>
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

export default MessageBoard;