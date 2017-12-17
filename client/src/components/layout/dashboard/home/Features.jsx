import React from 'react';
import {
  Card, Button, DashboardContent
} from '../../../commonViews';
import cardIcons from '../../../../images/cardStuff.png';

/**
 * Features Component
 *
 * @method Features
 *
 * @returns {Object} JSX
 *
 * @param {Object} props
 */
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
                <div
                  className="card-image waves-effect waves-block waves-light"
                >
                  <img className="activator"
                    src={cardIcons}
                    alt="create group illustration"
                  />
                </div>
                <div className="card-content">
                  <span
                    className="card-title activator grey-text text-darken-4"
                  >
                    Create Group
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Create Group
                    <i className="material-icons right">
                      close
                    </i>
                  </span>
                  <p>
                    Create group with a unique name and add a
                    brief description for the group.
                  </p>
                  <a href="#groups" className="btn btn-create white-text">
                    Get Started
                  </a>
                </div>
              </div>
            </Card>
          </div>
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div
                  className="card-image waves-effect waves-block waves-light"
                >
                  <img className="activator"
                    src={cardIcons}
                    alt="add member illustration"
                  />
                </div>
                <div className="card-content">
                  <span
                    className="card-title activator grey-text text-darken-4"
                  >
                    Add Member
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
                    Add other registered users to your created group, and
                    get connected through the group message board
                  </p>
                  <a href="#groups" className="btn btn-create white-text">
                    Get Started
                  </a>
                </div>
              </div>
            </Card>
          </div>
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div
                  className="card-image waves-effect waves-block waves-light"
                >
                  <img className="activator"
                    src={cardIcons}
                    alt="write post illustration"
                  />
                </div>
                <div className="card-content">
                  <span
                    className="card-title activator grey-text text-darken-4"
                  >
                    Write Post
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Write Message
                    <i className="material-icons right">
                      close
                    </i>
                  </span>
                  <p>
                    Compose messages and send as broadcasts to group members.
                  </p>
                  <a href="#groups" className="btn btn-create white-text">
                    Get Started
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div
                  className="card-image waves-effect waves-block waves-light"
                >
                  <img className="activator"
                    src={cardIcons}
                    alt="view messages illustration"
                  />
                </div>
                <div className="card-content">
                  <span
                    className="card-title activator grey-text text-darken-4"
                  >
                    View Messages
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    View Messages
                    <i className="material-icons right">
                      close
                    </i>
                  </span>
                  <p>
                    View what your group members are writing about
                    and stay in the know.
                  </p>
                  <a href="#groups" className="btn btn-create white-text">
                    Get Started
                  </a>
                </div>
              </div>
            </Card>
          </div>
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div
                  className="card-image waves-effect waves-block waves-light"
                >
                  <img className="activator"
                    src={cardIcons}
                    alt="postit search illustration"
                  />
                </div>
                <div className="card-content">
                  <span
                    className="card-title activator grey-text text-darken-4"
                  >
                    Search Member
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
                    Search for other users that own a postit account, and
                    add them to your group.
                  </p>
                  <a href="#groups" className="btn btn-create white-text">
                    Get Started
                  </a>
                </div>
              </div>
            </Card>
          </div>
          <div className="col s12 m4">
            <Card>
              <div className="card small">
                <div
                  className="card-image waves-effect waves-block waves-light"
                >
                  <img className="activator"
                    src={cardIcons}
                    alt="wikipedia search illustration"
                  />
                </div>
                <div className="card-content">
                  <span
                    className="card-title activator grey-text text-darken-4"
                  >
                    Search Wikipedia
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
                    Search wikipedia right from your dashboard and start posting
                    messages backed by fact.
                  </p>
                  <a href="#search-wiki" className="btn btn-create white-text">
                    Get Started
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </DashboardContent>
  </section>;


export default Features;
