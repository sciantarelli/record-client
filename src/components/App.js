import React, { Component } from 'react';
import Header from './Header';
import Routes from './Routes';
import { FlexFillContainer } from './FlexComponents';

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Header />
          <FlexFillContainer addClasses="container">
            <Routes />
          </FlexFillContainer>
        </React.Fragment>
    );
  }
}

export default App;
