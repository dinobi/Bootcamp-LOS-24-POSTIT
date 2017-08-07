import React from 'react';
import { DashHeader, footer } from '../components/views'

let greeting = 'Yeah right'
class App extends React.Component {
  render() {
    console.log('this.props: ',this.props);
    return (
      <div>
        <DashHeader/>
        <FullName
          firstName = { this.props.userData.firstName }
          lastName = { this.props.userData.lastName }
        />
        <Groups
          group = { this.props.userData.group }
        />
        and now: {greeting}
      </div>
    );
  }
}

class FullName extends React.Component {
  render() {
    return (
      <div>
        <h3>Names:</h3>
        <h5>
          { this.props.firstName } { this.props.lastName }
        </h5>
      </div>
    );
  }
}

class Groups extends React.Component {
  render() {
    return (
      <div>
        <h3>My Groups:</h3>
        <h5>
          <ul>
              { 
                this.props.group.map((group, index) => {
                return <li key={index}>{group}</li>
                }) 
              }

          </ul>
        </h5>
      </div>
    );
  }
}

export default App;
