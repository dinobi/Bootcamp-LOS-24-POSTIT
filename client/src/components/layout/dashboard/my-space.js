import React from 'react';
import { DashHeader, SideMenu, FeatureCard } from '../../views';

class MySpace extends React.Component {
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
                        <img className="activator" src={ FeatureCard.post.imgDesc } alt={ FeatureCard.post.imgAlt }/>
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{ FeatureCard.post.title }<i className="material-icons right">more_vert</i></span>
                        <p><a href= { FeatureCard.post.link }>{ FeatureCard.post.linkTitle }</a></p>
                      </div>
                      <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Write Post<i className="material-icons right">close</i></span>
                        <p>{ FeatureCard.post.description }</p>
                      </div>
                      </div>
                    </div>
                      <div className="col s12 m4">
                        <div className="card small">
                          <div className="card-image waves-effect waves-block waves-light">
                          <img className="activator" src={ FeatureCard.createGroup.imgDesc } alt={ FeatureCard.createGroup.imgAlt }/>
                        </div>
                        <div className="card-content">
                          <span className="card-title activator grey-text text-darken-4">{ FeatureCard.createGroup.title }<i className="material-icons right">more_vert</i></span>
                          <p><a href= { FeatureCard.createGroup.link }>{ FeatureCard.createGroup.linkTitle }</a></p>
                        </div>
                        <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Write Post<i className="material-icons right">close</i></span>
                          <p>{ FeatureCard.createGroup.description }</p>
                        </div>
                        </div>
                      </div>
                    <div className="col s12 m4">
                      <div className="card small">
                          <div className="card-image waves-effect waves-block waves-light">
                          <img className="activator" src={ FeatureCard.addMember.imgDesc } alt={ FeatureCard.addMember.imgAlt }/>
                        </div>
                        <div className="card-content">
                          <span className="card-title activator grey-text text-darken-4">{ FeatureCard.addMember.title }<i className="material-icons right">more_vert</i></span>
                          <p><a href= { FeatureCard.addMember.link }>{ FeatureCard.addMember.linkTitle }</a></p>
                        </div>
                        <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Write Post<i className="material-icons right">close</i></span>
                          <p>{ FeatureCard.addMember.description }</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 m4">
                      <div className="card small">
                          <div className="card-image waves-effect waves-block waves-light">
                          <img className="activator" src={ FeatureCard.viewMessages.imgDesc } alt={ FeatureCard.viewMessages.imgAlt }/>
                        </div>
                        <div className="card-content">
                          <span className="card-title activator grey-text text-darken-4">{ FeatureCard.viewMessages.title }<i className="material-icons right">more_vert</i></span>
                          <p><a href= { FeatureCard.viewMessages.link }>{ FeatureCard.viewMessages.linkTitle }</a></p>
                        </div>
                        <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Write Post<i className="material-icons right">close</i></span>
                          <p>{ FeatureCard.viewMessages.description }</p>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m4">
                      <div className="card small">
                          <div className="card-image waves-effect waves-block waves-light">
                          <img className="activator" src={ FeatureCard.search.imgDesc[0] } alt={ FeatureCard.search.imgAlt[0] }/>
                        </div>
                        <div className="card-content">
                          <span className="card-title activator grey-text text-darken-4">{ FeatureCard.search.title[0] }<i className="material-icons right">more_vert</i></span>
                          <p><a href= { FeatureCard.search.link[0] }>{ FeatureCard.search.linkTitle[0] }</a></p>
                        </div>
                        <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Write Post<i className="material-icons right">close</i></span>
                          <p>{ FeatureCard.search.description[0] }</p>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m4">
                      <div className="card small">
                          <div className="card-image waves-effect waves-block waves-light">
                          <img className="activator" src={ FeatureCard.search.imgDesc[1] } alt={ FeatureCard.search.imgAlt[1] }/>
                        </div>
                        <div className="card-content">
                          <span className="card-title activator grey-text text-darken-4">{ FeatureCard.search.title[1] }<i className="material-icons right">more_vert</i></span>
                          <p><a href= { FeatureCard.search.link[1] }>{ FeatureCard.search.linkTitle[1] }</a></p>
                        </div>
                        <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Write Post<i className="material-icons right">close</i></span>
                          <p>{ FeatureCard.search.description[1] }</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default MySpace;
