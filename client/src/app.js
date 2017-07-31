import React from 'react';
import Base from './css/base.css';

class App extends React.Component {
  render() {
    let myText = this.props.myText;
    return (      
      <h1>{myText}</h1>
    );
  }
}

export default App;
