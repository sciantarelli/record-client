import React, { Component } from 'react';
import Header from './Header';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Header />
          <div id="main-container">
            <Routes />
          </div>
        </React.Fragment>
    );
  }
}

export default App;
