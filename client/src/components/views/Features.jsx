import React from 'react';

const Features = (props) => {
  return (
    <section className="col s12 m9 l10">
      <div className="dashboard-content dashboard-myspace">
          <div className="bot-msg">
            <h3>Welcome to your dashboard</h3>
              <p>What would you like to do?</p>
          </div>
          <div className="features">
            <div className="row">
              <div className="col s12 m4">
                <div className="card small">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="images/office.jpg" alt="write post illustration" />
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">Write Post<i className="material-icons right">more_vert</i></span>
                    <p><a href="#messages">Compose</a></p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Write Post<i className="material-icons right">close</i></span>
                    <p>Compose a post and send as broadcast to group members.</p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card small">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="images/office.jpg" alt="create group illustration" />
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">Create Group<i className="material-icons right">more_vert</i></span>
                    <p><a href="#create-group">New Group</a></p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Create Group<i className="material-icons right">close</i></span>
                    <p>Create a new group, add members and start posting.</p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card small">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="images/office.jpg" alt="add member illustration" />
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">Add Member<i className="material-icons right">more_vert</i></span>
                    <p><a href="#Group">Add</a></p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Add Member<i className="material-icons right">close</i></span>
                    <p>Add a new member to your created group for them to start sending and receiving posts within the group.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col s12 m4">
                <div className="card small">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="images/office.jpg" alt="view messages illustration" />
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">View Messages<i className="material-icons right">more_vert</i></span>
                    <p><a href="#Group">Go to Messages</a></p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">View Messages<i className="material-icons right">close</i></span>
                    <p>View what your group members are writing about and stay in the know.</p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card small">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="images/office.jpg" alt="postit search illustration" />
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">Search Member<i className="material-icons right">more_vert</i></span>
                    <p><a href="#search">Start</a></p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Search Member<i className="material-icons right">close</i></span>
                    <p>Search for a user who has registered with postit, or any group to see if they exist on postit.</p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card small">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src="images/office.jpg" alt="wikipedia search illustration"/>
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">Search Wikipedia<i className="material-icons right">more_vert</i></span>
                    <p><a href="#search-wiki">start</a></p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Search Wikipedia<i className="material-icons right">close</i></span>
                    <p>Search wikipedia right from your inbox and start posting messages backed by fact.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
      </div>					
    </section>
  );
}

export default Features;