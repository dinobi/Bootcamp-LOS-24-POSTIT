import React from 'react';

class DashContent extends React.Component {
    render() {
        return (
            <div class="dashboard-content dashboard-myspace">
              <div class="bot-msg">
                <h3>Welcome to your dashboard</h3>
                <p>What would you like to do?</p>
              </div>
              <div class="features">
                <div class="row">
                  <div class="col s12 m4">
                    <FeaturesCard />
                  </div>
                    <div class="col s12 m4">
                      <FeaturesCard />
                    </div>
                  <div class="col s12 m4">
                    <FeaturesCard />
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 m4">
                    <FeaturesCard />
                  </div>
                  <div class="col s12 m4">
                    <FeaturesCard />
                  </div>
                  <div class="col s12 m4">
                    <FeaturesCard />
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default MySpace;
