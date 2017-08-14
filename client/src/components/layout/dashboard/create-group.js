import React from 'react';
<<<<<<< HEAD
import { DashHeader, SideMenu, Copyright } from '../../views';
=======
import { DashHeader, SideMenu } from '../../views';
>>>>>>> d278e7235a2af234eeebac54cd5d9e74c4bba712

class NewGroup extends React.Component {
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
			  <div className="dashboard-content">
                <div className="bot-msg">
                  <h3>Create a new group</h3>
                </div>
                <div className="features">
                  <form id="create-group-form">
                    <fieldset className="input-field">				
                      <input placeholder="Enter a group name" id="group_name" type="text" className="validate"/>						
                      <textarea placeholder="Enter group description" id="group-description" className="validate"/>
                    </fieldset>
					<button type="submit" className="btn btn-create">Submit</button>
				  </form>
                </div>
              </div>			
			</section>
          </div>
<<<<<<< HEAD
		  <Copyright/>
=======
		  <small className="dashboard-copy">&copy;Bootcamp24, Andela Nigeria. All rights reserved.</small>
>>>>>>> d278e7235a2af234eeebac54cd5d9e74c4bba712
		</main>
      </div>
    );
  }
}

export default NewGroup;