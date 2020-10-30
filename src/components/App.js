import React, { Component } from 'react';

import Sessions from './Sessions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: 12
    }
  }
  render() {
    const { currUser } = this.state;
    return (
      <div>
        <Sessions currUser={currUser}/>
      </div>

    );
  }
}

export default App;