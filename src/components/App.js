import React, { Component } from 'react';
import Header from './Header';
import Routes from './Routes';
import { FlexFillContainer } from './FlexComponents';

import Media from 'react-media';
import { LayoutCompact, LayoutFull } from './Layout';

class App extends Component {
  render() {
    // return (
    //     <React.Fragment>
    //       <Header />
    //       <FlexFillContainer addClasses="container">
    //         <Routes />
    //       </FlexFillContainer>
    //     </React.Fragment>

    // sm: 768px,
    // md: 992px,
    // lg: 1140px,
    // xl: 1140px

    // When it's small, render:
      // view for route
      // bottom navigation
    // When it's > small, render:
      // view for route
      // left panel w/ main nav
      // header w/ sub nav
      return (
        // Bootstrap default, "xs"
        <React.Fragment>
          <Media query="(max-width: 576px)">
            { matches =>
              matches ? <LayoutCompact /> : <LayoutFull />
            }
          </Media>
          <Routes />
        </React.Fragment>
    );
  }
}

export default App;
