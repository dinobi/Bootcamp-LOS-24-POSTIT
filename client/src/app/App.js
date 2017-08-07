import React from 'react';
import MySpace from '../components/layout'

class App extends React.Component {
  render() {
    console.log('this.props: ',this.props);
    return (
      <div>
        <MySpace/>
      </div>
    );
  }
}

export default App;
