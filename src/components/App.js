import React, { Component } from 'react';
import Header from './layout/Header';
import Routes from './navigation/Routes';
import { FlexFillContainer } from './layout/FlexComponents';

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
