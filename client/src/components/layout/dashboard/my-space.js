import React from 'react';
import { DashHeader, SideMenu, FeatureCard } from '../../views';

const featureCards = {
    post: {
        imgDesc: '../../../images/write-post.png',
        imgAlt: 'post message image',
        title: 'Write Post',
        description: 'Compose a post and send as broadcast to group members',
        link: '#messages',
        linkTitle: 'Compose'        
    },
    createGroup: {
        imgDesc: '../../../images/create-group.png',
        imgAlt: 'create group image',
        title: 'Create Group',
        description: 'Create a new group, add members and start posting',
        link: '#Groups',
        linkTitle: 'New Group'        
    },
    addMember: {
        imgDesc: '../../../images/add-member.png',
        imgAlt: 'Add member image',
        title: 'Add Member',
        description: 'Add a new member to your created group for them to start sending and receiving posts within the group',
        link: '#Group',
        linkTitle: 'Add'        
    },
    viewMessages: {
        imgDesc: '../../../images/view-messages.png',
        imgAlt: 'View messages image',
        title: 'View Messages',
        description: 'View what your group members are writing about and stay in the know',
        link: '#Messages',
        linkTitle: 'Message'        
    },
    search: {
        imgDesc: ['../../../images/search-postit.png', '../../images/search-wikipedia.png'],
        imgAlt: ['Search postit image', 'Search wikipedia image'],
        title: ['Search Postit', 'Search Wikipedia'],
        description: ['Search for a user who has registered with postit, or any group to see if they exist on postit.',
        'Search wikipedia right from your inbox and start posting messages backed by fact.'],
        link: ['#Search', '#Search-Wiki'],
        linkTitle: 'Start'        
    }
}

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
                      { 
                        FeatureCard(
                          featureCards.post.imgDesc,
                          featureCards.post.imgAlt,
                          featureCards.post.title,
                          featureCards.post.link,
                          featureCards.post.linkTitle,
                          featureCards.post.description
                        ) 
                      }
                    </div>
                      <div className="col s12 m4">
                        { 
                        FeatureCard(
                          featureCards.createGroup.imgDesc,
                          featureCards.createGroup.imgAlt,
                          featureCards.createGroup.title,
                          featureCards.createGroup.link,
                          featureCards.createGroup.linkTitle,
                          featureCards.createGroup.description
                        ) 
                      }
                      </div>
                    <div className="col s12 m4">
                      { 
                        FeatureCard(
                          featureCards.addMember.imgDesc,
                          featureCards.addMember.imgAlt,
                          featureCards.addMember.title,
                          featureCards.addMember.link,
                          featureCards.addMember.linkTitle,
                          featureCards.addMember.description
                        ) 
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 m4">
                      { 
                        FeatureCard(
                          featureCards.viewMessages.imgDesc,
                          featureCards.viewMessages.imgAlt,
                          featureCards.viewMessages.title,
                          featureCards.viewMessages.link,
                          featureCards.viewMessages.linkTitle,
                          featureCards.viewMessages.description
                        ) 
                      }
                    </div>
                    <div className="col s12 m4">
                      { 
                        FeatureCard(
                          featureCards.search.imgDesc,
                          featureCards.search.imgAlt,
                          featureCards.search.title,
                          featureCards.search.link,
                          featureCards.search.linkTitle,
                          featureCards.search.description
                        ) 
                      }
                    </div>
                    <div className="col s12 m4">
                      { 
                        FeatureCard(
                          featureCards.search.imgDesc[1],
                          featureCards.search.imgAlt[1],
                          featureCards.search.title[1],
                          featureCards.search.link,
                          featureCards.search.linkTitle[1],
                          featureCards.search.description[1]
                        ) 
                      }
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
