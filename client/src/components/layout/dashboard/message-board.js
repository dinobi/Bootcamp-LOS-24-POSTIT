import React from 'react';
import { DashHeader, SideMenu, Message, MessageBox } from '../../views';

class MessageBoard extends React.Component {

  render() {
    const backToGroup = <li><a href="#group"><i className="fa fa-chevron-left"></i>&nbsp;&nbsp;Back</a></li>
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
		  <small className="dashboard-copy">&copy;Bootcamp24, Andela Nigeria. All rights reserved.</small>
		</main>
      </div>
    );
  }
}

export default MessageBoard;