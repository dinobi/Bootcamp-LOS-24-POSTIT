import React from 'react';
import {
  Card, Button, DashboardContent
} from '../../../commonViews';
import cardIcons from '../../../../images/cardStuff.png';

const Features = () =>
  <section className="col s12 m9 l10">
    <DashboardContent
      wrapperClass="dashboard-content dashboard-myspace"
      iconClass="fa fa-home"
      title="Welcome to your dashboard"
      subtitle="What would you like to do?"
    >
      <div className="features">
        <div className="row">
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator"
                    src={cardIcons}
                    alt="write post illustration"
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    Write Post
                    <i className="material-icons right"
                  >
                    more_vert
                    </i>
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Write Message
                    <i className="material-icons right">
                      close
                    </i>
                  </span>
                  <p>Compose a message and send as broadcast to group members.</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator"
                    src={cardIcons}
                    alt="create group illustration"
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    Create Group
                    <i className="material-icons right">
                      more_vert
                    </i>
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Create Group
                    <i className="material-icons right">
                      close
                    </i>
                  </span>
                  <p>Create a new group, add members and start posting.</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator"
                  src={cardIcons}
                  alt="add member illustration"
                />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    Add Member
                    <i className="material-icons right">
                      more_vert
                    </i>
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Add Member
                    <i className="material-icons right">
                      close
                    </i>
                  </span>
                  <p>
                    Add a new member to your created group for them to start sending
                    and receiving posts within the group.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator"
                    src={cardIcons}
                    alt="view messages illustration"
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    View Messages
                    <i className="material-icons right">
                      more_vert
                    </i>
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    View Messages
                    <i className="material-icons right">
                      close
                    </i>
                  </span>
                  <p>View what your group members are writing about and stay in the know.</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator"
                    src={cardIcons}
                    alt="postit search illustration"
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    Search Member
                    <i className="material-icons right">
                      more_vert
                    </i>
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Search Member
                    <i className="material-icons right">
                      close
                    </i>
                  </span>
                  <p>
                    Search for a user who has registered with postit,
                    or any group to see if they exist on postit.
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator"
                    src={cardIcons}
                    alt="wikipedia search illustration"
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    Search Wikipedia
                    <i className="material-icons right">
                      more_vert
                    </i>
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Search Wikipedia
                    <i className="material-icons right">
                      close
                    </i>
                  </span>
                  <p>
                    Search wikipedia right from your inbox and start posting
                    messages backed by fact.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </DashboardContent>
  </section>;


export default Features;
