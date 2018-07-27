import React, { Component } from 'react';
import Header from './Header';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
        <div>
          <Header />
          <div id="main-container">
            <Routes />
          </div>
        </div>
    );
  }
}

export default App;
