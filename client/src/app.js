import React from 'react';
import Base from './css/base.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to PostIt</h1>
          <h3>Communicate Group Messages Instantly</h3>
        </div>
        <p className="App-intro">
          PostIt is built to allow family, friends and colleagues meetup in groups to share
           messages in a fun way whenever they want.
        </p>
      </div>
    );
  }
}

export default App;
